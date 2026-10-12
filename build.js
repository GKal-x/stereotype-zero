'use strict';
const fs=require('node:fs'),path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,name),'utf8');
const out=path.join(__dirname,'dist');fs.mkdirSync(out,{recursive:true});
let html=read('index.html').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('style.css')+'</style>');
for(const script of ['engine.js','audio.js','game.js'])html=html.replace(`<script src="${script}" defer></script>`,'');
html=html.replace('</body>',()=>['engine.js','audio.js','game.js'].map(file=>'<script>'+read(file).replace(/<\/script/gi,'<\\/script')+'</script>').join('\n')+'\n</body>');
fs.writeFileSync(path.join(out,'stereotype-zero.html'),html);
function wav(name,seq,step){const rate=22050,seconds=seq.length*step,samples=Math.ceil(seconds*rate),pcm=new Float64Array(samples);const freq=n=>440*Math.pow(2,(n-69)/12);function voice(note,start,duration,volume,type){if(note===null)return;const f=freq(note);for(let j=0;j<duration*rate;j++){const at=Math.round(start*rate)+j;if(at>=samples)break;const t=j/rate,phase=(t*f)%1,wave=type==='triangle'?1-4*Math.abs(phase-.5):phase<.5?1:-1;const envelope=Math.min(1,t/.008)*Math.exp(-t/duration*5);pcm[at]+=wave*envelope*volume;}}for(let i=0;i<seq.length;i++){voice(seq[i],i*step,step*.8,.12,'square');if(i%4===0)voice([45,41,48,43][Math.floor(i/8)%4],i*step,step*3.2,.25,'triangle');}const bytes=Buffer.alloc(44+samples*2);bytes.write('RIFF');bytes.writeUInt32LE(36+samples*2,4);bytes.write('WAVE',8);bytes.write('fmt ',12);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*2,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(samples*2,40);for(let i=0;i<samples;i++)bytes.writeInt16LE(Math.round(Math.max(-1,Math.min(1,pcm[i]))*32767),44+i*2);fs.writeFileSync(path.join(out,name),bytes);}
wav('patisia-evening.wav',[69,null,72,76,74,null,72,69,67,null,64,67,69,null,67,64,65,null,69,72,71,null,69,65,64,null,67,71,69,null,null,null],.205);
wav('unpaid-shift.wav',[64,67,71,76,74,71,67,64,65,69,72,77,76,72,69,65],.15);
console.log('Built dist/stereotype-zero.html and two original WAV sketches.');
