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
const {walk:walkMemory,act:actMemory,storyTo}=require('./walk-memory.js');
{const s=E.fresh();E.startMemories(s);storyTo(s,'play-outside');walkMemory(s,'ball');emitMemory('ball-game',s);}
{const s=E.fresh();E.startMemories(s);walkMemory(s,'father');emitMemory('dad',s);}
for(const q of E.Memories.scenes){emitMemory(q.id,memoryState);if(q.id==='courtyard'){storyTo(memoryState,'scouts');continue;}for(const id of q.required){actMemory(memoryState,id);}if(q.id==='shared-home'){walkMemory(memoryState,'books');E.memoryAct(memoryState,'books','shelf');}walkMemory(memoryState,'continue-memory');if(q.id==='shared-home')emitMemory('handover',memoryState);E.advanceMemory(memoryState);}
for(const [id,r]of Object.entries(E.Memories.extraRooms)){const s=E.fresh();E.startMemories(s);s.memory.scene=r.scene;s.room=id;Object.assign(s,E.Rooms.rooms[id].spawn);emitMemory(id.replace('memory-',''),s);}
{const s=E.fresh();E.startMemories(s);s.room='memory-child-living';s.x=11;s.y=5;s.facing='right';emitMemory('door',s);}
const venue=E.PLACES.find(p=>p.id==='venue');memoryState.x=venue.x;memoryState.y=venue.y;E.enter(memoryState,'venue');walkMemory(memoryState,'older-musician');emitMemory('encounter',memoryState);

for(const beat of ['dad-leaving','island','bird','tell-mum','dad-news','fade-out']){const s=E.fresh();E.startMemories(s);storyTo(s,beat);if(['island','bird'].includes(beat))s.memory.opening.elapsed=2100;emitMemory(beat,s);}
