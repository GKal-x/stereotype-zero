/* Fictional interiors attached to the authored street doorways. */
(function(root){
  'use strict';
  const exit={id:'exit',name:'Back to the street',x:7,y:10};
  const rooms={
    home:{name:'Home · the kitchen light',width:14,height:12,color:'#c6bba0',spawn:{x:7,y:9},objects:[{x:2,y:3,w:4,h:2,type:'table'},{x:10,y:2,w:2,h:4,type:'bed'},{x:2,y:1,w:4,h:1,type:'desk'},{x:1,y:7,w:3,h:2,type:'kitchen'}],places:[{id:'eleni',name:'Talk to Eleni',x:4,y:5,who:'eleni'},{id:'bed',name:'Rest on your bed',x:9,y:4},{id:'notebook',name:'Eleni’s notes',x:3,y:2},{id:'dinner',name:'Sit at the kitchen table',x:6,y:4},exit]},
    shop:{name:'Market · the last few things',width:14,height:12,color:'#c5c5ac',spawn:{x:7,y:9},objects:[{x:2,y:2,w:10,h:1,type:'shelf'},{x:2,y:4,w:10,h:1,type:'counter'},{x:1,y:7,w:2,h:2,type:'produce'},{x:11,y:7,w:2,h:2,type:'produce'}],places:[{id:'grocer',name:'Shop at the counter',x:7,y:5},{id:'market-board',name:'Read the community board',x:4,y:3},exit]},
    employer:{name:'Stockroom · Thursday’s wages',width:14,height:12,color:'#a9b1ac',spawn:{x:7,y:9},objects:[{x:6,y:2,w:3,h:2,type:'desk'},{x:1,y:2,w:3,h:2,type:'boxes'},{x:10,y:2,w:3,h:2,type:'boxes'},{x:1,y:6,w:3,h:2,type:'boxes'}],places:[{id:'supervisor',name:'Speak to the supervisor',x:7,y:4,who:'boss'},{id:'shift-board',name:'Check the shift board',x:3,y:4},exit]},
    venue:{name:'Basement · before the set',width:14,height:12,color:'#a49d9f',spawn:{x:7,y:9},objects:[{x:5,y:1,w:6,h:2,type:'stage'},{x:10,y:5,w:2,h:2,type:'mixer'},{x:1,y:2,w:2,h:2,type:'speaker'},{x:1,y:7,w:3,h:1,type:'bench'}],places:[{id:'dimos-inside',name:'Talk to Dimos',x:4,y:5,who:'dimos'},{id:'soundcheck',name:'Try your demo on the mixer',x:9,y:5},{id:'set',name:'Stay for the set',x:7,y:3},exit]}
  };
  const topics={
    eleni:[{id:'exam',label:'“How did the exam go?”',text:'“I knew the answer on the bus. Then I sat down and forgot it.” Eleni laughs once. “I’m going back next term. Even if it takes longer.”'},{id:'dream',label:'“Do you still want to leave Athens?”',text:'“Sometimes. Sometimes I just want a room where the window opens.” She looks at your bag. “Leaving shouldn’t be the only dream we’re allowed.”'}],
    mina:[{id:'hours',label:'“What happens with your next shift?”',text:'“No idea. That’s the point, isn’t it? You can’t plan a week if they only give you tomorrow.” Mina saves your number beside the rota.'},{id:'together',label:'“We could keep our hours together.”',text:'“A shared record. Dates, hours, transfers.” She puts her phone away. “Yes. But don’t volunteer me for a fight without asking.”'}],
    dimos:[{id:'music',label:'“What if nobody likes the demo?”',text:'“Then we play another one.” Dimos turns a cable in his hands. “I’m scared every time. That’s different from not wanting it.”'},{id:'distance',label:'“We barely see each other anymore.”',text:'“You work when I’m free. I work when you’re free.” He shrugs. “Text me for coffee sometimes. It doesn’t always have to be a crisis.”'}]
  };
  const api={rooms,topics};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityRooms=api;
})(typeof globalThis!=='undefined'?globalThis:this);
