'use strict';
const fs=require('node:fs'),path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,name),'utf8');
const out=path.join(__dirname,'dist');fs.mkdirSync(out,{recursive:true});
let html=read('index.html').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('style.css')+'</style>');
const scripts=['world.js','opening.js','life-world.js','memories.js','rooms.js','engine.js','motion.js','assets/pixel-art.js','assets/cast-refined.js','assets/supervisor.js','assets/memories-atlas.js','assets/family-atlas.js','assets/adults-atlas.js','assets/scouts-atlas.js','assets/youth-atlas.js','props.js','cinematics.js','art.js','map-ui.js','audio.js','game.js'];
for(const script of scripts)html=html.replace(`<script src="${script}" defer></script>`,'');
html=html.replace('</body>',()=>scripts.map(file=>{let code=read(file);if(file==='art.js')for(const asset of ['cast-refined.png','buildings-source.png','supervisor-v1.png','memories-v1.png','family-v1.png','adults-refined-v1.png','scouts-v2.png','youth-v1.png'])code=code.replace('assets/'+asset,'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,'assets',asset)).toString('base64'));if(file==='map-ui.js')code=code.replace('assets/kato-patisia-reference.svg','data:image/svg+xml;base64,'+fs.readFileSync(path.join(__dirname,'assets/kato-patisia-reference.svg')).toString('base64'));return '<script>'+code.replace(/<\/script/gi,'<\\/script')+'</script>';}).join('\n')+'\n</body>');
fs.writeFileSync(path.join(out,'stereotype-zero.html'),html);
const score=require('./audio.js');
function wav(name,mode){const rate=22050,pcm=score.render(mode,rate),bytes=Buffer.alloc(44+pcm.length);bytes.write('RIFF');bytes.writeUInt32LE(36+pcm.length,4);bytes.write('WAVE',8);bytes.write('fmt ',12);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate,28);bytes.writeUInt16LE(1,32);bytes.writeUInt16LE(8,34);bytes.write('data',36);bytes.writeUInt32LE(pcm.length,40);Buffer.from(pcm).copy(bytes,44);fs.writeFileSync(path.join(out,name),bytes);}
for(const [name,mode]of Object.keys(score.scenes).map(mode=>['score-'+mode,mode]))wav(name+'.wav',mode);
fs.copyFileSync(path.join(__dirname,'research/music-brief-2026-10.md'),path.join(out,'soundtrack-notes.md'));
console.log('Built portable game and original 8-bit PCM score WAVs.');
