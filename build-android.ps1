param([string]$JdkHome, [string]$SdkRoot, [string]$SigningKeystore)
$ErrorActionPreference = 'Stop'
$toolsRoot = Join-Path $PSScriptRoot '.android-tools'
if ($JdkHome) { $jdkRoot = $JdkHome } else {
    $jdkRoot = Get-ChildItem "$toolsRoot/jdk" -Directory | Where-Object { Test-Path "$($_.FullName)/bin/javac.exe" } | Select-Object -First 1 -ExpandProperty FullName
}
if ($SdkRoot) {
    $sdkPlatform = Join-Path $SdkRoot 'platforms/android-35'
    $buildTools = Join-Path $SdkRoot 'build-tools/35.0.0'
} else {
    $sdkPlatform = Get-ChildItem "$toolsRoot/platform" -Directory | Where-Object { Test-Path "$($_.FullName)/android.jar" } | Select-Object -First 1 -ExpandProperty FullName
    $buildTools = Get-ChildItem "$toolsRoot/build-tools" -Directory | Where-Object { Test-Path "$($_.FullName)/aapt2.exe" } | Select-Object -First 1 -ExpandProperty FullName
}
if (-not $jdkRoot -or -not $sdkPlatform -or -not $buildTools) { throw 'Run setup-android.ps1 first.' }
$buildRoot = Join-Path $PSScriptRoot 'android/build'
$mainRoot = Join-Path $PSScriptRoot 'android/app/src/main'
$outputRoot = Join-Path $PSScriptRoot 'dist'
foreach ($folder in @($buildRoot, "$buildRoot/classes", "$buildRoot/dex", "$buildRoot/assets", "$buildRoot/generated", "$PSScriptRoot/android/signing", $outputRoot)) {
    New-Item -ItemType Directory -Force $folder | Out-Null
}
function Run-Tool($Executable, [string[]]$Arguments) {
    & $Executable @Arguments
    if ($LASTEXITCODE -ne 0) { throw "Build tool failed: $Executable ($LASTEXITCODE)" }
}
Run-Tool 'node' @("$PSScriptRoot/build.js")
$mobileHtml = [IO.File]::ReadAllText("$outputRoot/stereotype-zero.html").Replace('<head>', '<head><script>window.STEREOTYPE_ZERO_ANDROID=true;document.documentElement.classList.add("android-game");</script>')
[IO.File]::WriteAllText("$buildRoot/assets/stereotype-zero.html", $mobileHtml, [Text.UTF8Encoding]::new($false))
Run-Tool "$buildTools/aapt2.exe" @('compile', '--dir', "$mainRoot/res", '-o', "$buildRoot/resources.zip")
$manifestPath = "$mainRoot/AndroidManifest.xml"
if ($env:GITHUB_RUN_NUMBER) {
    [xml]$manifest = [IO.File]::ReadAllText($manifestPath)
    $manifest.manifest.SetAttribute('versionCode', 'http://schemas.android.com/apk/res/android', [string](1000 + [int]$env:GITHUB_RUN_NUMBER)) | Out-Null
    $manifestPath = "$buildRoot/AndroidManifest.xml"
    $manifest.Save($manifestPath)
}
Run-Tool "$buildTools/aapt2.exe" @('link', '-o', "$buildRoot/resources.apk", '-I', "$sdkPlatform/android.jar", '--manifest', $manifestPath, '--java', "$buildRoot/generated", '-A', "$buildRoot/assets", "$buildRoot/resources.zip")
$sources = @(Get-ChildItem "$mainRoot/java" -Filter '*.java' -Recurse | ForEach-Object { $_.FullName })
Run-Tool "$jdkRoot/bin/javac.exe" (@('-encoding', 'UTF-8', '--release', '8', '-classpath', "$sdkPlatform/android.jar", '-d', "$buildRoot/classes") + $sources)
Run-Tool "$jdkRoot/bin/jar.exe" @('cf', "$buildRoot/classes.jar", '-C', "$buildRoot/classes", '.')
Run-Tool "$jdkRoot/bin/java.exe" @('-cp', "$buildTools/lib/d8.jar", 'com.android.tools.r8.D8', '--lib', "$sdkPlatform/android.jar", '--min-api', '26', '--output', "$buildRoot/dex", "$buildRoot/classes.jar")
Copy-Item "$buildRoot/resources.apk" "$buildRoot/unsigned.apk" -Force
Run-Tool "$jdkRoot/bin/jar.exe" @('uf', "$buildRoot/unsigned.apk", '-C', "$buildRoot/dex", 'classes.dex')
Run-Tool "$buildTools/zipalign.exe" @('-f', '-p', '4', "$buildRoot/unsigned.apk", "$buildRoot/aligned.apk")
$keystore = if ($SigningKeystore) { $SigningKeystore } else { "$PSScriptRoot/android/signing/prototype.keystore" }
if ($SigningKeystore -and -not (Test-Path $SigningKeystore)) { throw 'The supplied signing key does not exist.' }
if (-not (Test-Path $keystore)) {
    Run-Tool "$jdkRoot/bin/keytool.exe" @('-genkeypair', '-keystore', $keystore, '-storepass', 'android', '-keypass', 'android', '-alias', 'prototype', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000', '-dname', 'CN=Stereotype Zero Prototype')
}
$apkPath = "$outputRoot/stereotype-zero-0.12.0.apk"
Run-Tool "$jdkRoot/bin/java.exe" @('-jar', "$buildTools/lib/apksigner.jar", 'sign', '--ks', $keystore, '--ks-key-alias', 'prototype', '--ks-pass', 'pass:android', '--key-pass', 'pass:android', '--out', $apkPath, "$buildRoot/aligned.apk")
Run-Tool "$jdkRoot/bin/java.exe" @('-jar', "$buildTools/lib/apksigner.jar", 'verify', '--verbose', $apkPath)
Run-Tool "$buildTools/zipalign.exe" @('-c', '-p', '4', $apkPath)
Run-Tool "$buildTools/aapt2.exe" @('dump', 'badging', $apkPath)
$hash = (Get-FileHash $apkPath -Algorithm SHA256).Hash.ToLower()
"$hash  stereotype-zero-0.12.0.apk" | Set-Content "$apkPath.sha256" -Encoding ascii
Write-Host "Ready: $apkPath"
