/* Fictional interiors attached to the authored street doorways. */
(function(root){
  'use strict';
  const Memories=typeof module!=='undefined'&&module.exports?require('./memories.js'):root.CityMemories;
  const exit={id:'exit',name:'Back to the street',x:7,y:10};
  const rooms={
    home:{name:'Home · the kitchen light',width:14,height:12,color:'#c6bba0',spawn:{x:7,y:9},objects:[{x:2,y:3,w:4,h:2,type:'table'},{x:10,y:2,w:2,h:4,type:'bed'},{x:2,y:1,w:4,h:1,type:'desk'},{x:1,y:7,w:3,h:2,type:'kitchen'}],places:[{id:'eleni',name:'Talk to Eleni',x:4,y:5,who:'eleni'},{id:'bed',name:'Rest on your bed',x:9,y:4},{id:'notebook',name:'Eleni’s notes',x:3,y:2},{id:'dinner',name:'Sit at the kitchen table',x:6,y:4},exit]},
    shop:{name:'Market · the last few things',width:14,height:12,color:'#c5c5ac',spawn:{x:7,y:9},objects:[{x:2,y:2,w:10,h:1,type:'shelf'},{x:2,y:4,w:10,h:1,type:'counter'},{x:1,y:7,w:2,h:2,type:'produce'},{x:11,y:7,w:2,h:2,type:'produce'}],places:[{id:'grocer',name:'Shop at the counter',x:7,y:5},{id:'market-board',name:'Read the community board',x:4,y:3},exit]},
    employer:{name:'Stockroom · Thursday’s wages',width:14,height:12,color:'#a9b1ac',spawn:{x:7,y:9},objects:[{x:6,y:2,w:3,h:2,type:'desk'},{x:1,y:2,w:3,h:2,type:'boxes'},{x:10,y:2,w:3,h:2,type:'boxes'},{x:1,y:6,w:3,h:2,type:'boxes'}],places:[{id:'supervisor',name:'Speak to the supervisor',x:7,y:4,who:'boss'},{id:'shift-board',name:'Check the shift board',x:3,y:4},exit]},
    venue:{name:'Basement · before the set',width:14,height:12,color:'#a49d9f',spawn:{x:7,y:9},objects:[{x:5,y:1,w:6,h:2,type:'stage'},{x:10,y:5,w:2,h:2,type:'mixer'},{x:1,y:2,w:2,h:2,type:'speaker'},{x:1,y:7,w:3,h:1,type:'bench'}],places:[{id:'dimos-inside',name:'Talk to Dimos',x:4,y:5,who:'dimos'},{id:'soundcheck',name:'Try your demo on the mixer',x:9,y:5},{id:'set',name:'Stay for the set',x:7,y:3},exit]}
  };
  rooms.home.objects.push({x:9,y:7,w:3,h:1,type:'sofa'},{x:1,y:2,w:1,h:3,type:'bookstall'});
  rooms.venue.places.push({id:'older-musician',name:'Talk to the musician by the amp',x:9,y:8,who:'memory-adult'});
  rooms.venue.objects.push({x:11,y:8,w:2,h:1,type:'amp'});
  // Station rooms are compact fictional layouts. Separate rooms enforce the paid boundary.
  const transitRoom=(name,color,objects,places)=>({name,width:14,height:12,color,spawn:{x:7,y:9},objects,places,transit:true});
  rooms.metro=transitRoom('Kato Patisia · ticket hall','#c6c6b5',[
    {x:2,y:1,w:2,h:2,type:'ticket-machine'},{x:5,y:1,w:5,h:2,type:'gates'},{x:10,y:5,w:2,h:2,type:'bench'}
  ],[{id:'ticket-machine',name:'Buy a ticket',x:3,y:3},{id:'gate',name:'Validate at the gates',x:7,y:3},{id:'staff',name:'Ask the station attendant',x:10,y:8,who:'boss'},exit]);
  for(const [id,name]of [['platform','Kato Patisia'],['victoria-platform','Victoria']])rooms[id]=transitRoom(name+' · Line 1 platform','#c9c7ad',[
    {x:1,y:1,w:12,h:3,type:'train-exterior'},{x:2,y:6,w:2,h:1,type:'bench'},{x:10,y:6,w:2,h:1,type:'bench'}
  ],[{id:'board',name:'Board the train',x:7,y:4},{id:'commuter',name:'Talk to the waiting passenger',x:4,y:5,who:'mina'},{id:'line-diagram',name:'Read the Line 1 diagram',x:10,y:4},{...exit,name:id==='platform'?'Back through the gates':'Exit to Victoria square'}]);
  rooms.train=transitRoom('Line 1 · on the train','#b8c3b9',[
    {x:1,y:2,w:3,h:1,type:'train-window'},{x:10,y:2,w:3,h:1,type:'train-window'},{x:1,y:4,w:2,h:4,type:'train-seat'},{x:11,y:4,w:2,h:4,type:'train-seat'}
  ],[{id:'arrival',name:'Continue to your stop',x:7,y:4},{id:'rider',name:'Talk to a fellow passenger',x:4,y:6,who:'dimos'},{id:'line-diagram',name:'Read the Line 1 diagram',x:10,y:3},{...exit,name:'Get off at your destination'}]);
  rooms.victoria=transitRoom('Victoria · a corner of the square','#d1c3a0',[
    {x:1,y:1,w:4,h:3,type:'cafe-front'},{x:9,y:1,w:4,h:3,type:'bookstall'},{x:2,y:7,w:2,h:1,type:'bench'},{x:10,y:7,w:2,h:1,type:'planter'}
  ],[{id:'bookseller',name:'Talk to the bookseller',x:9,y:4,who:'eleni'},{id:'square-friend',name:'Talk to the student',x:4,y:5,who:'mina'},{id:'ticket-machine',name:'Buy a ticket for the return',x:3,y:4},{id:'staff',name:'Ask for travel help',x:10,y:8,who:'boss'},{...exit,name:'Validate and return to the platform'}]);
  for(const q of Memories.scenes)rooms[q.room]={name:q.name,width:14,height:12,color:q.id==='courtyard'?'#dfd0aa':q.id==='scouts'?'#c2b995':'#be9568',spawn:{x:7,y:9},objects:q.objects,places:q.places,memory:true};
  for(const [id,r]of Object.entries(Memories.extraRooms))rooms[id]={...r,width:14,height:12,color:'#beaa88',spawn:{x:7,y:9},memory:true};
  const topics={
    eleni:[{id:'exam',label:'“How did the exam go?”',text:'“I knew the answer on the bus. Then I sat down and forgot it.” Eleni laughs once. “I’m going back next term. Even if it takes longer.”'},{id:'dream',label:'“Do you still want to leave Athens?”',text:'“Sometimes. Sometimes I just want a room where the window opens.” She looks at your bag. “Leaving shouldn’t be the only dream we’re allowed.”'}],
    mina:[{id:'hours',label:'“What happens with your next shift?”',text:'“No idea. That’s the point, isn’t it? You can’t plan a week if they only give you tomorrow.” Mina saves your number beside the rota.'},{id:'together',label:'“We could keep our hours together.”',text:'“A shared record. Dates, hours, transfers.” She puts her phone away. “Yes. But don’t volunteer me for a fight without asking.”'}],
    dimos:[{id:'music',label:'“What if nobody likes the demo?”',text:'“Then we play another one.” Dimos turns a cable in his hands. “I’m scared every time. That’s different from not wanting it.”'},{id:'distance',label:'“We barely see each other anymore.”',text:'“You work when I’m free. I work when you’re free.” He shrugs. “Text me for coffee sometimes. It doesn’t always have to be a crisis.”'}]
  };
  const api={rooms,topics,Memories};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityRooms=api;
})(typeof globalThis!=='undefined'?globalThis:this);
