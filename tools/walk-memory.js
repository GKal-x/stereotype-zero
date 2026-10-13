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
function act(s,id){walk(s,id);if(id==='ball'){while(!s.memory.afternoon.finished){const result=E.memoryPlay(s,E.Memories.playRounds[s.memory.afternoon.round].answer);if(!result.ok)throw Error('Could not play');}}else if(!E.memoryAct(s,id,E.Memories.choices[id][0]).ok)throw Error('Could not act '+id);}
module.exports={walk,act};
