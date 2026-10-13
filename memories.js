/* Three playable adaptations for testing the autobiographical handover. */
(function(root){
  'use strict';
  const scenes=[
    {id:'courtyard',room:'memory-courtyard',name:'Patisia · the whole street',age:'AGE 6',avatar:'memory-child',goal:'Play with the ball and spend a moment with Omiros. Then return to the doorway.',intro:'A small courtyard. A ball. Your younger brother wants to join you. For now, the neighbourhood is somewhere to play.',required:['ball','brother'],objects:[{x:1,y:1,w:5,h:2,type:'home-front'},{x:10,y:1,w:3,h:2,type:'planter'},{x:1,y:7,w:2,h:1,type:'bench'},{x:11,y:7,w:2,h:1,type:'planter'}],places:[{id:'ball',name:'Play with the ball',x:8,y:5},{id:'brother',name:'Spend a moment with Omiros',x:4,y:5,who:'memory-child'},{id:'continue-memory',name:'Return to the doorway',x:7,y:2}]},
    {id:'scouts',room:'memory-scouts',name:'22ο Άρεως · getting ready',age:'YEARS LATER',avatar:'memory-scout',goal:'Prepare the shared kit and check the route. Then gather by the door.',intro:'The scout centre is familiar now. This time, others are looking to you to help get the group ready. You can ask for help too.',required:['kit','route'],objects:[{x:1,y:1,w:3,h:3,type:'bookstall'},{x:6,y:2,w:4,h:2,type:'table'},{x:11,y:2,w:2,h:4,type:'shelf'},{x:1,y:7,w:3,h:1,type:'bench'}],places:[{id:'kit',name:'Prepare the shared kit',x:5,y:3},{id:'route',name:'Check the route together',x:8,y:4},{id:'scout-friend',name:'Talk to a fellow leader',x:4,y:6,who:'dimos'},{id:'continue-memory',name:'Gather by the door',x:7,y:10}]},
    {id:'shared-home',room:'memory-shared-home',name:'The shared home · still making room',age:'AGE 35',avatar:'memory-adult',goal:'Talk with Eleftheria and make room for books or music. Then pause by the window.',intro:'Blue walls. Yellow paint. Books waiting for a shelf. There is work left to do, and there is an evening to share.',required:['partner'],objects:[{x:1,y:1,w:3,h:3,type:'bookstall'},{x:8,y:1,w:5,h:2,type:'sofa'},{x:9,y:5,w:4,h:2,type:'desk'},{x:1,y:7,w:2,h:2,type:'amp'},{x:4,y:7,w:3,h:1,type:'bench'}],places:[{id:'partner',name:'Talk with Eleftheria',x:7,y:4,who:'memory-partner'},{id:'books',name:'Make room for the books',x:4,y:3},{id:'guitar',name:'Pick up the guitar',x:3,y:7},{id:'records',name:'Look through the records',x:8,y:6},{id:'continue-memory',name:'Pause by the window',x:6,y:1}]}
  ];
  const choices={ball:['pass','shot'],brother:['together','listen'],kit:['share','check'],route:['together','lead'],partner:['listen','ask'],books:['shelf','leave'],guitar:['play','tune'],records:['choose','remember'],'scout-friend':['talk']};
  choices.ball.push('steady');
  const texts={
    'ball:pass':'You roll the ball to Omiros. He chases it, then sends it back. There is time for another pass.',
    'ball:shot':'The ball taps the wall and comes back across the courtyard. Omiros runs after it.',
    'brother:together':'You make room beside you. For a while, the game belongs to both of you.',
    'brother:listen':'You stop long enough to hear what he is trying to tell you. The afternoon can wait a moment.',
    'kit:share':'One person checks the water. Another takes the spare bag. You check what is still missing. Getting ready becomes a shared task.',
    'kit:check':'You lay out the shared kit, then ask someone else to check it with you. A second pair of eyes helps.',
    'route:together':'You spread the map on the table. The group works through the route together, including where to stop and regroup.',
    'route:lead':'You explain the route, then leave time for questions. Someone spots a point worth checking before you leave.',
    'scout-friend:talk':'A fellow leader makes space on the bench. There is preparation to do, but there is also time to talk. This place holds friendships as well as responsibilities.',
    'partner:listen':'Eleftheria wants the desk space left clear before you unpack another box. You pause and work out what can fit today, together.',
    'partner:ask':'You ask what she would like to finish first. You agree on one small task and leave the rest for another day.',
    'books:shelf':'A few books find a shelf. Some stay in the box. The room is becoming somewhere to live, a little at a time.',
    'books:leave':'You keep a few books within reach and leave the larger box for tomorrow. Finishing everything is not tonight’s task.',
    'guitar:play':'A short phrase fills the room. You try it again, leaving a little more space between the notes.',
    'guitar:tune':'You tune slowly, one string at a time, then play a few familiar chords. There is music in the room again.',
    'records:choose':'You set a record beside the player. It can be the soundtrack to the next small job.',
    'records:remember':'A record brings a gig and a friend to mind. Some stories live in ordinary things.'
  };
  // Connected rooms are authored adaptations, not surveyed floor plans.
  const door=(id,name,x,y,to,arrival,facing)=>({id,name,x,y,to,arrival,facing,door:true});
  const childhood=scenes[0];childhood.name='Patisia · one more game';childhood.startRoom='memory-child-living';childhood.start={x:4,y:5};
  childhood.intro='Mum is getting a bag ready for a family outing. Dad is choosing a record. Outside, Omiros has found the ball. You have enough energy for all three rooms at once—or so you think.';
  childhood.required=['mother','father','child-water','outing-book','outing-bag','brother','ball'];
  scenes[0].places.find(p=>p.id==='continue-memory').x=12;scenes[0].places.find(p=>p.id==='continue-memory').y=9;
  scenes[0].places.find(p=>p.id==='continue-memory').name='Leave this childhood moment';
  scenes[0].goal='Help Mum prepare the outing bag, spend time with Dad, then keep a ball game going with Omiros. Meet at the courtyard gate when everyone is ready.';
  scenes[0].places.push(door('child-home','Enter the family home',4,3,'memory-child-living',{x:7,y:9},'up'));
  scenes[0].places.find(p=>p.id==='brother').speaker='Omiros';
  scenes[0].places.find(p=>p.id==='brother').who='family-brother';
  scenes[0].places.find(p=>p.id==='brother').patrol=[[4,5],[5,5],[5,6],[4,6]];
  const extraRooms={
    'memory-child-living':{name:'Childhood home · living room',scene:'courtyard',objects:[{x:1,y:1,w:3,h:2,type:'tv-console',console:true},{x:7,y:2,w:5,h:2,type:'sofa'},{x:1,y:5,w:2,h:2,type:'record-player'},{x:11,y:6,w:2,h:3,type:'bookstall'},{x:5,y:6,w:3,h:2,type:'table'}],places:[{id:'mother',name:'Talk to Mum',speaker:'Mum',x:4,y:4,who:'eleni'},{id:'father',name:'Talk to Dad',speaker:'Dad',x:9,y:5,who:'boss'},{id:'child-tv',name:'Watch television',x:4,y:2},{id:'playstation',name:'Play the PlayStation',x:3,y:3},{id:'child-records',name:'Choose a record',x:3,y:6},{id:'child-books',name:'Read a book',x:10,y:7},door('courtyard-door','Go out to the courtyard',7,10,'memory-courtyard',{x:4,y:4},'down'),door('child-bedroom-door','Go to your bedroom',12,5,'memory-child-bedroom',{x:7,y:9},'right'),door('child-kitchen-door','Go to the kitchen',1,8,'memory-child-kitchen',{x:7,y:9},'left')]},
    'memory-child-bedroom':{name:'Childhood home · bedroom',scene:'courtyard',objects:[{x:1,y:1,w:4,h:2,type:'desk'},{x:10,y:2,w:2,h:4,type:'bed'},{x:1,y:5,w:2,h:3,type:'bookstall'},{x:6,y:1,w:2,h:2,type:'wardrobe'}],places:[{id:'child-pc',name:'Use the family PC',x:3,y:3},{id:'child-bedroom-books',name:'Read before going out',x:3,y:6},door('child-living-door','Back to the living room',7,10,'memory-child-living',{x:11,y:5},'down')]},
    'memory-child-kitchen':{name:'Childhood home · kitchen',scene:'courtyard',objects:[{x:1,y:1,w:8,h:2,type:'kitchen'},{x:10,y:1,w:2,h:3,type:'fridge'},{x:5,y:5,w:4,h:2,type:'table'}],places:[{id:'child-water',name:'Get a glass of water',x:4,y:3},door('child-kitchen-return','Back to the living room',7,10,'memory-child-living',{x:2,y:8},'down')]},
    'memory-scout-store':{name:'22ο Άρεως · the kit room',scene:'scouts',objects:[{x:2,y:2,w:4,h:3,type:'tent'},{x:9,y:1,w:3,h:4,type:'shelf'},{x:1,y:7,w:2,h:2,type:'backpacks'},{x:6,y:6,w:3,h:2,type:'map-table'}],places:[{id:'tent',name:'Check the tent',x:4,y:5},{id:'compass',name:'Try the compass',x:7,y:8},{id:'packs',name:'Pack the shared equipment',x:3,y:7},door('scout-hall-door','Back to the scout hall',7,10,'memory-scouts',{x:11,y:8},'down')]},
    'memory-adult-kitchen':{name:'Shared home · kitchen',scene:'shared-home',objects:[{x:1,y:1,w:8,h:2,type:'kitchen'},{x:10,y:1,w:2,h:3,type:'fridge'},{x:5,y:5,w:4,h:2,type:'table'}],places:[{id:'kettle',name:'Make tea for two',x:4,y:3},door('adult-kitchen-return','Back to the living room',7,10,'memory-shared-home',{x:11,y:4},'down')]},
    'memory-adult-bedroom':{name:'Shared home · bedroom',scene:'shared-home',objects:[{x:9,y:2,w:3,h:4,type:'bed'},{x:1,y:1,w:3,h:3,type:'wardrobe'},{x:1,y:6,w:2,h:3,type:'bookstall'}],places:[{id:'adult-reading',name:'Read a few pages',x:3,y:7},door('adult-bedroom-return','Back to the living room',7,10,'memory-shared-home',{x:7,y:9},'down')]}
  };
  const living=extraRooms['memory-child-living'];living.places.find(p=>p.id==='mother').who='family-mother';living.places.find(p=>p.id==='father').who='family-father';
  living.objects.find(o=>o.type==='table').album=true;
  living.objects.push({x:8,y:7,w:1,h:1,type:'backpacks'});
  living.places.push({id:'outing-bag',name:'Pack the outing bag',x:8,y:8},{id:'family-album',name:'Look at the family album',x:4,y:7});
  extraRooms['memory-child-bedroom'].places.push({id:'outing-book',name:'Choose a book for the outing',x:3,y:5});
  const scouts=scenes[1];scouts.places=scouts.places.filter(p=>p.id!=='scout-friend');
  scouts.places.push({id:'gerasimos',name:'Talk to Gerasimos',speaker:'Gerasimos',x:4,y:6,who:'memory-scout',patrol:[[4,6],[5,6],[5,7],[4,7]]},{id:'vaggelis',name:'Talk to Vaggelis',speaker:'Vaggelis',x:9,y:7,who:'memory-scout',patrol:[[9,7],[9,8],[8,8],[8,7]]},door('scout-store-door','Enter the kit room',12,8,'memory-scout-store',{x:7,y:9},'right'));
  scouts.objects.find(o=>o.type==='table').type='map-table';
  const home=scenes[2];home.objects=[{x:1,y:1,w:3,h:2,type:'tv-console'},{x:8,y:1,w:5,h:2,type:'sofa'},{x:1,y:5,w:2,h:3,type:'bookstall'},{x:9,y:6,w:4,h:2,type:'desk',laptop:true},{x:1,y:8,w:2,h:1,type:'amp'},{x:4,y:6,w:2,h:2,type:'guitars'},{x:8,y:4,w:3,h:1,type:'record-player'}];
  home.places.find(p=>p.id==='books').x=3;home.places.find(p=>p.id==='books').y=6;
  home.places.find(p=>p.id==='records').x=9;home.places.find(p=>p.id==='records').y=5;
  home.places.find(p=>p.id==='partner').speaker='Eleftheria';
  home.places.push({id:'adult-tv',name:'Watch something together',x:4,y:2},{id:'laptop',name:'Close the laptop for tonight',x:10,y:8},door('adult-kitchen-door','Go to the kitchen',12,4,'memory-adult-kitchen',{x:7,y:9},'right'),door('adult-bedroom-door','Go to the bedroom',7,10,'memory-adult-bedroom',{x:7,y:9},'down'));
  const items={
    'scout-books':{body:'A field guide and a well-used handbook sit on the shelf.',options:['Check the field guide'],choices:['read'],texts:['You compare the guide with the map: landmarks first, then direction and distance. You leave the book where the others can find it.']},
    mother:{speaker:'Mum',body:'“We’re going out later, whirlwind. Can you help? Water from the kitchen, one book from your room, then put them in the bag. And don’t leave your brother behind.”',options:['“I can do all of that!”','“Does the ball count as luggage?”'],choices:['game','outside'],texts:['“One room at a time! I’d like the water to reach the bag, not the carpet.”','“The ball can come. It still doesn’t count as a water bottle.”']},
    father:{speaker:'Dad',body:'“You’ve gone past this room three times already. Come and choose a record with me. We have time for one side before we leave.”',options:['“You choose one.”','“Let me look through them.”'],choices:['choose','browse'],texts:['“Then listen to this bit.” He lowers the needle. For a moment, your feet stop moving.','“Hold it by the edges. You can choose; I’ll put it on.” A small job becomes something you do together.']},
    'outing-book':{body:'The shelf is full of possibilities. There is room for one book in the outing bag.',options:['Choose a book to take'],choices:['take'],texts:['You choose a book and hold it against your chest. Now for the water and the bag in the living room.']},
    'outing-bag':{body:'The bag is waiting by the table. A bottle, a book, and room for a few family things.',options:['Put the bottle and book inside'],choices:['pack'],texts:['The bottle goes upright. The book fits beside it. You call, “Ready!” Mum answers, “The bag is ready. You still need to find your brother.”']},
    'child-tv':{body:'The television sits on a heavy wooden cabinet.',options:['Turn it on','Turn it off'],choices:['on','off'],texts:['The screen lights up. You watch for a while.','The screen goes dark. You can hear the courtyard again.']},
    playstation:{body:'A grey PlayStation and two wired controllers sit beneath the television.',options:['Play a short game','Leave it for later'],choices:['play','leave'],texts:['You sit down for a short game, then put the controller back within reach.','The controller stays beside the console. The afternoon is still outside.']},
    'child-records':{body:'Records stand upright beside the turntable.',options:['Put a record on','Look through the sleeves'],choices:['play','browse'],texts:['You carefully lower the needle. Music fills the room.','The sleeves have their own colours and stories. You leave them in order.']},
    'child-books':{body:'A low shelf keeps a few books within reach.',options:['Read a few pages'],choices:['read'],texts:['You find a familiar book and settle with it for a moment.']},
    'child-bedroom-books':{body:'Books share a shelf with a few little treasures.',options:['Choose a book'],choices:['read'],texts:['You read a few pages before returning to the afternoon.']},
    'child-pc':{body:'A monitor, keyboard and mouse fill the family desk.',options:['Try the computer'],choices:['use'],texts:['The monitor wakes up. You explore a little, then leave the desk clear.']},
    'child-water':{body:'A bottle is waiting beside the kitchen sink.',options:['Fill the bottle for the outing','Have a glass of water'],choices:['fill','drink'],texts:['You fill the bottle and close the cap. This one is for the bag in the living room.','A glass for you. The bottle for the outing still needs filling.']},
    gerasimos:{speaker:'Gerasimos',body:'“I can help with the kit. What still needs doing?”',options:['“Let’s check it together.”'],choices:['help'],texts:['“Good. I’ll take one side; you take the other.”']},
    vaggelis:{speaker:'Vaggelis',body:'“Have we checked the map as well as the bags?”',options:['“Come and have a look.”'],choices:['map'],texts:['“Let’s find where we stop first. Then the rest of the route.”']},
    tent:{body:'A canvas tent is spread out for checking.',options:['Check the poles and pegs'],choices:['check'],texts:['You match the poles and count the pegs. The tent is ready to be packed.']},
    compass:{body:'A compass lies beside the route map.',options:['Find north on the map'],choices:['orient'],texts:['You line the map up with the needle and identify the first direction of travel.']},
    packs:{body:'The shared bags are open on the low shelf.',options:['Distribute the kit'],choices:['pack'],texts:['You divide the equipment between the bags instead of leaving everything to one person.']},
    kettle:{body:'There are two mugs beside the kettle.',options:['Make tea for two'],choices:['tea'],texts:['You put the kettle on and bring two mugs back to the living room.']},
    'adult-tv':{body:'The television is off. The evening can still take several shapes.',options:['Turn it on','Keep it quiet'],choices:['on','off'],texts:['You put something on, leaving room for a conversation too.','You leave the screen off. There is enough happening in the room.']},
    laptop:{body:'A few tabs and unfinished tasks are still open.',options:['Save and close it'],choices:['close'],texts:['You save the work and close the laptop. It can wait until tomorrow.']},
    'adult-reading':{body:'A book waits beside the bed.',options:['Read a few pages'],choices:['read'],texts:['You settle into a few pages. The rest of the house can wait a moment.']}
  };
  scouts.places.push({id:'scout-books',name:'Read the scout field guide',x:4,y:2});
  function propState(s){const c=s.memory?.choices||{},child=s.room?.startsWith('memory-child-');return {screenOn:child?c['courtyard:child-tv']!=='off'&&(c['courtyard:child-tv']==='on'||c['courtyard:playstation']==='play'):c['shared-home:adult-tv']==='on',closed:!!c['shared-home:laptop'],playing:child?c['courtyard:child-records']==='play'||!!c['courtyard:father']:c['shared-home:records']==='choose',packed:!!s.memory?.visited?.['courtyard:outing-bag']};}
  for(const [id,item]of Object.entries(items)){choices[id]=item.choices;item.choices.forEach((choice,i)=>texts[id+':'+choice]=item.texts[i]);}
  for(const q of scenes)q.rooms=[q.room,...Object.keys(extraRooms).filter(id=>extraRooms[id].scene===q.id)];
  function allPlaces(q){return [...q.places,...q.rooms.filter(id=>extraRooms[id]).flatMap(id=>extraRooms[id].places)];}
  const family=[
    {id:'you',name:'You',relation:'The child you play in this opening.'},
    {id:'mother',name:'Mum',relation:'Your mother.'},
    {id:'father',name:'Dad',relation:'Your father.'},
    {id:'brother',name:'Omiros',relation:'Your younger brother, three years younger than you.'},
    {id:'maternal-grandfather',name:'Omiros',relation:'Your mother’s father. Your grandfather, distinct from your brother.'},
    {id:'maternal-grandmother',name:'Tasoula',relation:'Your mother’s mother.'},
    {id:'paternal-grandfather',name:'George',relation:'Your father’s father.'},
    {id:'paternal-grandmother',name:'Vilma',relation:'Your father’s mother.'},
    {id:'maternal-aunt',name:'Io',relation:'Your mother’s sister.'},
    {id:'paternal-uncle',name:'Manolis',relation:'Your father’s brother.'}
  ];
  const playRounds=[
    {cue:'Omiros has stopped running and is waiting with his feet apart.',hint:'He is ready. A gentle pass gives him time.',answer:'pass',text:'He catches the ball between his shoes, then sends it back. “Again!”'},
    {cue:'The ball comes back too quickly and bounces beside your foot.',hint:'Steady the ball before trying anything bigger.',answer:'steady',text:'You stop it under your shoe. Omiros copies you with an invisible ball.'},
    {cue:'Omiros steps aside. The low wall ahead is clear.',hint:'There is room for a gentle shot at the wall.',answer:'shot',text:'The ball taps the wall and rolls back between you. Omiros laughs. “Again! Again!”'}
  ];
  function initial(){return {scene:null,visited:{},choices:{},completed:false,met:false,afternoon:{round:0,attempts:0,finished:false}};}
  function goal(s){const q=current(s);if(q?.id!=='courtyard')return q?.goal||'';const v=s.memory.visited,c=s.memory.choices;
    if(!v['courtyard:mother'])return 'Mum is in the living room. Talk to her about getting ready for the outing.';
    if(!v['courtyard:father'])return 'Spend a moment with Dad by the record player in the living room.';
    if(c['courtyard:child-water']!=='fill'&&!v['courtyard:outing-bag'])return 'Fill the outing bottle at the kitchen sink. The kitchen door is on the left of the living room.';
    if(!v['courtyard:outing-book'])return 'Choose one book from your bedroom. Its door is on the right of the living room.';
    if(!v['courtyard:outing-bag'])return 'Put the bottle and book in the bag beside the living-room table.';
    if(!v['courtyard:brother'])return 'Omiros is in the courtyard. Ask him to play with you.';
    if(!v['courtyard:ball'])return 'Play with the ball in the courtyard. Read each cue and keep the game going together.';
    return 'The bag is ready and you have played together. Meet at the courtyard gate to finish this afternoon.';
  }
  function current(s){return scenes.find(q=>q.id===s.memory?.scene)||null;}
  function complete(s){const q=current(s);return !!q&&q.required.every(id=>s.memory.visited[q.id+':'+id])&&(q.id!=='shared-home'||['books','guitar','records'].some(id=>s.memory.visited[q.id+':'+id]));}
  const api={scenes,extraRooms,items,family,playRounds,goal,propState,allPlaces,choices,texts,initial,current,complete};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityMemories=api;
})(typeof globalThis!=='undefined'?globalThis:this);
