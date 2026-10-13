'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),D=require('./world.js'),E=require('./engine.js');
test('all destinations are walkable and reachable from every other destination',()=>{
  for(const a of E.PLACES){assert.equal(E.walkable(a.x,a.y),!a.who&&!D.STREET_PROPS.some(p=>D.contains(p,a.x,a.y)),a.id);for(const b of E.PLACES){const route=E.path(a,b,E.walkable(b.x,b.y)?0:1);if(a!==b&&Math.abs(a.x-b.x)+Math.abs(a.y-b.y)>(E.walkable(b.x,b.y)?0:1))assert.ok(route.length,a.id+' → '+b.id);assert.ok(route.every(([x,y])=>E.walkable(x,y)));}}
});
test('surface railway blocks walking but streets above the station tunnel remain connected',()=>{
  assert.equal(E.walkable(3,10),false);assert.equal(E.walkable(4,40),false);assert.equal(E.walkable(3,21),true);
  const route=E.path(D.SPAWN,{x:1,y:10},0);assert.ok(route.length);assert.ok(route.some(([x,y])=>x===3&&y>=18&&y<29));
});
test('geographical anchors preserve west/east and north/south relationships',()=>{
  const station=D.PLACES.find(p=>p.id==='metro'),ach=D.STREETS.find(p=>p.id==='acharnon'),pat=D.STREETS.find(p=>p.id==='patision'),square=D.SQUARES.find(p=>p.id==='koliatsou');
  assert.ok(station.x<ach.x&&ach.x<pat.x);assert.ok(square.y>station.y);assert.ok(square.x<pat.x);assert.ok(D.STREETS.find(p=>p.id==='iakovaton').y<station.y);assert.ok(D.STREETS.find(p=>p.id==='sifnou').y>station.y);
});
test('Line 1 sequence keeps district branches out of the station list',()=>{
  assert.deepEqual(D.LINE1.map(p=>p[0]),['petralona','thissio','monastiraki','omonia','victoria','attiki','ag-nikolaos','kato','ag-eleftherios','ano','perissos','pefkakia','nea-ionia']);
  for(const id of ['exarcheia','filadelfeia','zefyri'])assert.ok(D.DISTRICTS.some(p=>p.id===id)&&!D.LINE1.some(p=>p[0]===id));
});
test('old saves retain money, relationships and quests while adopting a safe map position',()=>{
  const s=E.fresh();E.start(s);E.mina(s,'listen');E.buy(s,'groceries');s.version=1;s.x=20;s.y=9;
  const restored=E.restore(JSON.stringify(s)),mina=E.PLACES.find(p=>p.id==='mina');assert.ok(restored);assert.equal(restored.version,E.VERSION);assert.equal(Math.abs(restored.x-mina.x)+Math.abs(restored.y-mina.y),1);assert.ok(E.walkable(restored.x,restored.y,restored));assert.equal(restored.money,s.money);assert.deepEqual(restored.flags,s.flags);assert.deepEqual(restored.relations,s.relations);assert.deepEqual(restored.inventory,s.inventory);
  assert.equal(E.restore(JSON.stringify({...s,x:24,y:2})),null);assert.equal(E.restore(JSON.stringify({...s,x:-1})),null);
});
test('main evening route remains short enough for the chapter',()=>{
  const order=['home','mina','employer','shop','home','dimos','venue'];let from=D.SPAWN,total=0;
  for(const id of order){const p=E.PLACES.find(p=>p.id===id),r=E.path(from,p);assert.ok(r.length<=65,id);total+=r.length;from=r.length?{x:r.at(-1)[0],y:r.at(-1)[1]}:from;}
  assert.ok(total<180,'chapter walking should take under 15 game minutes');
});
