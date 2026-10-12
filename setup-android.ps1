param([switch]$AcceptAndroidSdkLicense)
$ErrorActionPreference = 'Stop'
if (-not $AcceptAndroidSdkLicense) {
    throw 'Review https://developer.android.com/studio#terms-and-conditions and rerun with -AcceptAndroidSdkLicense to accept the Android SDK license.'
}
$toolsRoot = Join-Path $PSScriptRoot '.android-tools'
New-Item -ItemType Directory -Force -Path $toolsRoot | Out-Null
function Fetch-Archive($Url, $Name, $Hash, $Algorithm) {
    $archivePath = Join-Path $toolsRoot $Name
    if (-not (Test-Path $archivePath) -or (Get-FileHash $archivePath -Algorithm $Algorithm).Hash -ne $Hash) {
        Write-Host "Downloading $Name ..."
        & curl.exe --fail --location --retry 3 --silent --show-error --output $archivePath $Url
        if ($LASTEXITCODE -ne 0) { throw "Download failed: $Name" }
    }
    if ((Get-FileHash $archivePath -Algorithm $Algorithm).Hash -ne $Hash) { throw "Checksum mismatch: $Name" }
    return $archivePath
}
$jdkRoot = Join-Path $toolsRoot 'jdk'
if (-not (Test-Path "$jdkRoot/*/bin/javac.exe")) {
    $jdkInfo = Invoke-RestMethod 'https://api.adoptium.net/v3/assets/latest/17/hotspot?architecture=x64&image_type=jdk&os=windows&vendor=eclipse'
    $jdkPackage = $jdkInfo[0].binary.package
    $archive = Fetch-Archive $jdkPackage.link 'jdk17.zip' $jdkPackage.checksum 'SHA256'
    New-Item -ItemType Directory -Force $jdkRoot | Out-Null
    & tar.exe -xf $archive -C $jdkRoot
    if ($LASTEXITCODE -ne 0) { throw 'JDK extraction failed' }
}
# Read package URLs and their checksums from Google's official repository metadata.
[xml]$repository = (Invoke-WebRequest -UseBasicParsing 'https://dl.google.com/android/repository/repository2-1.xml').Content
$license = $repository.SelectSingleNode('//*[local-name()="license" and @id="android-sdk-license"]')
$license.InnerText | Set-Content (Join-Path $toolsRoot 'ANDROID-SDK-LICENSE.txt')
foreach ($packageSpec in @(
    @{ Id='platforms;android-35'; Dir='platform'; Marker='*/android.jar' },
    @{ Id='build-tools;35.0.0'; Dir='build-tools'; Marker='*/aapt2.exe' }
)) {
    $destination = Join-Path $toolsRoot $packageSpec.Dir
    if (Test-Path (Join-Path $destination $packageSpec.Marker)) { continue }
    $packages = $repository.SelectNodes('//*[local-name()="remotePackage"]') | Where-Object { $_.path -eq $packageSpec.Id }
    $package = $packages | Where-Object { -not $_.'type-details'.'extension-level' } | Select-Object -Last 1
    $archiveInfo = $package.archives.archive | Where-Object { -not $_.'host-os' -or $_.'host-os' -eq 'windows' } | Select-Object -First 1
    $complete = $archiveInfo.complete
    $archive = Fetch-Archive ("https://dl.google.com/android/repository/" + $complete.url) ($packageSpec.Dir + '.zip') $complete.checksum 'SHA1'
    New-Item -ItemType Directory -Force $destination | Out-Null
    & tar.exe -xf $archive -C $destination
    if ($LASTEXITCODE -ne 0) { throw "Extraction failed: $($packageSpec.Id)" }
}
Write-Host 'Local Android build tools ready. No system installation or PATH changes.'
