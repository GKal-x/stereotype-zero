'use strict';
const fs=require('node:fs'),path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,name),'utf8');
const out=path.join(__dirname,'dist');fs.mkdirSync(out,{recursive:true});
let html=read('index.html').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('style.css')+'</style>');
const scripts=['world.js','rooms.js','engine.js','motion.js','assets/pixel-art.js','assets/cast-refined.js','art.js','map-ui.js','audio.js','game.js'];
for(const script of scripts)html=html.replace(`<script src="${script}" defer></script>`,'');
html=html.replace('</body>',()=>scripts.map(file=>{let code=read(file);if(file==='art.js')for(const asset of ['cast-refined.png','buildings-source.png'])code=code.replace('assets/'+asset,'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,'assets',asset)).toString('base64'));if(file==='map-ui.js')code=code.replace('assets/kato-patisia-reference.svg','data:image/svg+xml;base64,'+fs.readFileSync(path.join(__dirname,'assets/kato-patisia-reference.svg')).toString('base64'));return '<script>'+code.replace(/<\/script/gi,'<\\/script')+'</script>';}).join('\n')+'\n</body>');
fs.writeFileSync(path.join(out,'stereotype-zero.html'),html);
const score=require('./audio.js');
function wav(name,mode){const rate=22050,step=30/score.scenes[mode].bpm,samples=Math.ceil(128*step*rate),pcm=new Float64Array(samples);let seed=117;
 for(let i=0;i<128;i++)for(const e of score.events(mode,i)){const start=Math.round(i*step*rate),f=440*Math.pow(2,((e.note||40)-69)/12);let smooth=0;
  for(let j=0;j<e.duration*rate&&start+j<samples;j++){const t=j/rate,phase=(t*f)%1;let wave;if(e.noise){seed=seed*16807%2147483647;wave=(seed/2147483647*2-1);}else wave=e.type==='triangle'?1-4*Math.abs(phase-.5):phase<.5?1:-1;smooth+=(wave-smooth)*.25;pcm[start+j]+=smooth*Math.min(1,t/.018)*Math.exp(-t/e.duration*8)*e.volume*.14;}}
 const bytes=Buffer.alloc(44+samples*2);bytes.write('RIFF');bytes.writeUInt32LE(36+samples*2,4);bytes.write('WAVE',8);bytes.write('fmt ',12);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*2,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(samples*2,40);for(let i=0;i<samples;i++)bytes.writeInt16LE(Math.round(Math.max(-1,Math.min(1,pcm[i]))*32767),44+i*2);fs.writeFileSync(path.join(out,name),bytes);}
for(const [name,mode]of [['patisia-evening','street'],['unpaid-shift','battle'],['basement-soundcheck','venue'],['kitchen-light','home']])wav(name+'.wav',mode);
console.log('Built portable game and four original chapter score WAVs.');
