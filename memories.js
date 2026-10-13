/* Three playable adaptations for testing the autobiographical handover. */
(function(root){
  'use strict';
  const scenes=[
    {id:'courtyard',room:'memory-courtyard',name:'Patisia · the whole street',age:'AGE 6',avatar:'memory-child',goal:'Play with the ball and spend a moment with Omiros. Then return to the doorway.',intro:'A small courtyard. A ball. Your younger brother wants to join you. For now, the neighbourhood is somewhere to play.',required:['ball','brother'],objects:[{x:1,y:1,w:5,h:2,type:'home-front'},{x:10,y:1,w:3,h:2,type:'planter'},{x:1,y:7,w:2,h:1,type:'bench'},{x:11,y:7,w:2,h:1,type:'planter'}],places:[{id:'ball',name:'Play with the ball',x:8,y:5},{id:'brother',name:'Spend a moment with Omiros',x:4,y:5,who:'memory-child'},{id:'continue-memory',name:'Return to the doorway',x:7,y:2}]},
    {id:'scouts',room:'memory-scouts',name:'22ο Άρεως · getting ready',age:'YEARS LATER',avatar:'memory-scout',goal:'Prepare the shared kit and check the route. Then gather by the door.',intro:'The scout centre is familiar now. This time, others are looking to you to help get the group ready. You can ask for help too.',required:['kit','route'],objects:[{x:1,y:1,w:3,h:3,type:'bookstall'},{x:6,y:2,w:4,h:2,type:'table'},{x:11,y:2,w:2,h:4,type:'shelf'},{x:1,y:7,w:3,h:1,type:'bench'}],places:[{id:'kit',name:'Prepare the shared kit',x:5,y:3},{id:'route',name:'Check the route together',x:8,y:4},{id:'scout-friend',name:'Talk to a fellow leader',x:4,y:6,who:'dimos'},{id:'continue-memory',name:'Gather by the door',x:7,y:10}]},
    {id:'shared-home',room:'memory-shared-home',name:'The shared home · still making room',age:'AGE 35',avatar:'memory-adult',goal:'Talk with Eleftheria and make room for books or music. Then pause by the window.',intro:'Blue walls. Yellow paint. Books waiting for a shelf. There is work left to do, and there is an evening to share.',required:['partner'],objects:[{x:1,y:1,w:3,h:3,type:'bookstall'},{x:8,y:1,w:5,h:2,type:'sofa'},{x:9,y:5,w:4,h:2,type:'desk'},{x:1,y:7,w:2,h:2,type:'amp'},{x:4,y:7,w:3,h:1,type:'bench'}],places:[{id:'partner',name:'Talk with Eleftheria',x:7,y:4,who:'memory-partner'},{id:'books',name:'Make room for the books',x:4,y:3},{id:'guitar',name:'Pick up the guitar',x:3,y:7},{id:'records',name:'Look through the records',x:8,y:6},{id:'continue-memory',name:'Pause by the window',x:6,y:1}]}
  ];
  const choices={ball:['pass','shot'],brother:['together','listen'],kit:['share','check'],route:['together','lead'],partner:['listen','ask'],books:['shelf','leave'],guitar:['play','tune'],records:['choose','remember'],'scout-friend':['talk']};
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
  function initial(){return {scene:null,visited:{},choices:{},completed:false,met:false};}
  function current(s){return scenes.find(q=>q.id===s.memory?.scene)||null;}
  function complete(s){const q=current(s);return !!q&&q.required.every(id=>s.memory.visited[q.id+':'+id])&&(q.id!=='shared-home'||['books','guitar','records'].some(id=>s.memory.visited[q.id+':'+id]));}
  const api={scenes,choices,texts,initial,current,complete};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityMemories=api;
})(typeof globalThis!=='undefined'?globalThis:this);
