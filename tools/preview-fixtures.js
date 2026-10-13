'use strict';
// Development-only browser fixtures, emitted into ignored dist, never bundled in APK.
const fs=require('node:fs'),path=require('node:path'),E=require('../engine.js');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'dist/stereotype-zero.html'),'utf8');
function base(room){const s=E.fresh();E.start(s);const door=E.PLACES.find(p=>p.id===(E.TRANSIT_ROOMS.includes(room)?'metro':room));s.x=door.x;s.y=door.y;E.enter(s,door.id);if(room!==door.id){s.room=room;Object.assign(s,E.Rooms.rooms[room].spawn);}if(room.startsWith('victoria'))s.transit.station='victoria';return s;}
for(const id of ['home','employer','metro','platform','train','victoria','battle']){
 const s=base(id==='battle'?'employer':id);
 if(['platform','train'].includes(id))s.transit.validUntil=s.minutes+90;
 if(id==='train')s.transit.ride={from:'kato',to:'victoria'};
 if(id==='metro'){s.x=3;s.y=4;}
 if(id==='platform'){s.x=7;s.y=5;}
 if(id==='battle'){E.mina(s,'listen');E.beginBattle(s);}
 if(!E.restore(E.snapshot(s)))throw Error('Invalid fixture: '+id);
 const seed='<script>localStorage.setItem("stereotype-zero-save",'+JSON.stringify(E.snapshot(s))+');</script>';
 fs.writeFileSync(path.join(root,'dist/qa-'+id+'.html'),html.replace('<head>','<head>'+seed));
}
console.log('Development preview fixtures emitted to dist/qa-*.html.');

const memoryState=E.fresh();E.startMemories(memoryState);
function emitMemory(name,s){if(!E.restore(E.snapshot(s)))throw Error('Invalid memory fixture '+name);const seed='<script>localStorage.setItem("stereotype-zero-save",'+JSON.stringify(E.snapshot(s))+');</script>';fs.writeFileSync(path.join(root,'dist/qa-memory-'+name+'.html'),html.replace('<head>','<head>'+seed));}
function walkMemory(s,id){const p=E.places(s).find(p=>p.id===id);for(const [x,y]of E.path(s,p))E.move(s,x-s.x,y-s.y);}
for(const q of E.Memories.scenes){emitMemory(q.id,memoryState);for(const id of q.required){walkMemory(memoryState,id);E.memoryAct(memoryState,id,E.Memories.choices[id][0]);}if(q.id==='shared-home'){walkMemory(memoryState,'books');E.memoryAct(memoryState,'books','shelf');}walkMemory(memoryState,'continue-memory');if(q.id==='shared-home')emitMemory('handover',memoryState);E.advanceMemory(memoryState);}
const venue=E.PLACES.find(p=>p.id==='venue');memoryState.x=venue.x;memoryState.y=venue.y;E.enter(memoryState,'venue');walkMemory(memoryState,'older-musician');emitMemory('encounter',memoryState);
