/* Node-only story traversal shared by fixtures and integration tests. */
const E=require('../engine.js');
function walk(s,id){
  const q=E.Memories.current(s);
  if(!q){const p=E.places(s).find(p=>p.id===id);if(!p)throw Error('No interaction '+id);for(const [x,y]of E.path(s,p))if(!E.move(s,x-s.x,y-s.y))throw Error('Blocked interaction');return;}
  const room=q.rooms.find(room=>E.Rooms.rooms[room].places.some(p=>p.id===id));
  if(!room)throw Error('No memory interaction '+id);
  while(s.room!==room){const queue=[[s.room,[]]],seen=new Set([s.room]);let route;
    while(queue.length){const [current,steps]=queue.shift();if(current===room){route=steps;break;}for(const p of E.Rooms.rooms[current].places.filter(p=>p.to)){if(!seen.has(p.to)){seen.add(p.to);queue.push([p.to,[...steps,p]]);}}}
    if(!route?.length)throw Error('No room route to '+room);const door=E.doors(s).find(p=>p.id===route[0].id);
    for(const [x,y]of E.path(s,door,0))if(!E.move(s,x-s.x,y-s.y))throw Error('Blocked memory door');
    s.facing=door.facing;if(!E.crossDoor(s,door).ok)throw Error('Could not cross '+door.id);
  }
  const p=E.places(s).find(p=>p.id===id);
  for(const [x,y]of E.path(s,p))if(!E.move(s,x-s.x,y-s.y))throw Error('Blocked interaction '+id);
  if(Math.abs(s.x-p.x)+Math.abs(s.y-p.y)>1)throw Error('Unreachable interaction '+id);
}
function act(s,id){const item=E.Memories.items[id];if(item?.encounter){const e=E.Life.encounters[item.encounter];for(const key of e.needs){if(s.memory.life.bag[key])continue;const supply=E.Memories.allPlaces(E.Memories.current(s)).find(p=>E.Memories.items[p.id]?.collect===key);if(!supply)throw Error('Missing supply '+key);act(s,supply.id);}walk(s,id);if(!E.beginMemoryEncounter(s,item.encounter).ok)throw Error('Could not begin '+id);while(s.memory.life.active.result==='active')E.memoryCommand(s,e.rounds[s.memory.life.active.round][1]);E.finishMemoryEncounter(s);return;}walk(s,id);if(id==='ball'){while(!s.memory.afternoon.finished){const result=E.memoryPlay(s,E.Memories.playRounds[s.memory.afternoon.round].answer);if(!result.ok)throw Error('Could not play');}}else if(!E.memoryAct(s,id,E.Memories.choices[id][0]).ok)throw Error('Could not act '+id);}
function completeAll(s){while(E.Memories.current(s)){const q=E.Memories.current(s);if(q.id==='courtyard'){storyTo(s,'scouts');continue;}for(const id of q.required)act(s,id);if(q.id==='shared-home')act(s,'books');walk(s,'continue-memory');if(!E.advanceMemory(s))throw Error('Could not advance '+q.id);}}

function storyTo(s,target){for(let i=0;i<100;i++){if(target==='scouts'&&s.memory.scene==='scouts')return;const b=E.Opening.current(s);if(!b)throw Error('Opening ended before '+target);if(b.id===target)return;
  if(b.kind==='dialogue'){if(!E.storyAdvance(s))throw Error('Dialogue did not advance');}
  else if(b.kind==='timed'){while(E.Opening.current(s)?.id===b.id)E.storyUpdate(s,100);}
  else if(b.id==='explore-home'){walk(s,'indoor-play');if(!E.storyAction(s,'play-inside'))throw Error('Indoor play blocked');}
  else if(b.id==='play-outside'){act(s,'ball');if(!E.storyAction(s,'look-up'))throw Error('Sky action blocked');}
  else if(b.id==='tell-mum'){walk(s,'mother');if(!E.storyAction(s,'report-sky'))throw Error('Report blocked');}
  else throw Error('Unexpected opening beat '+b.id);
}throw Error('Opening route exceeded limit');}
module.exports={walk,act,storyTo,completeAll};
