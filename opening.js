/* Authored, ambiguous childhood sequence. No named cause is revealed. */
(function(root){
  'use strict';
  const beats=[
    {id:'explore-home',kind:'explore',goal:'Explore the home at your own pace. Play with Omiros in the living room when you are ready.'},
    {id:'inside-roll',kind:'timed',scene:'home',duration:1000},
    {id:'dad-goodbye',kind:'dialogue',scene:'home',speaker:'Dad',who:'family-father',text:'“I’m off to work. See you later, both of you.”'},
    {id:'dad-leaving',kind:'timed',scene:'home',duration:4200},
    {id:'after-dad-play',kind:'timed',scene:'home',duration:1200},
    {id:'mum-outside',kind:'dialogue',scene:'home',speaker:'Mum',who:'family-mother',text:'“Take the ball outside, both of you. Mind the windows!”'},
    {id:'play-outside',kind:'explore',goal:'Go through the courtyard door with Omiros and play with the ball.'},
    {id:'sky-question',kind:'dialogue',scene:'sky',speaker:'Omiros',who:'family-brother',text:'“What is that?”'},
    {id:'island-fade',kind:'timed',scene:'sky',duration:600},
    {id:'island',kind:'timed',scene:'island',duration:5100},
    {id:'island-return',kind:'timed',scene:'island',duration:600},
    {id:'bird',kind:'timed',scene:'sky',duration:4200},
    {id:'child-excited',kind:'dialogue',scene:'sky',speaker:'You',who:'memory-child',text:'“Did you see it? Right over us!”'},
    {id:'brother-excited',kind:'dialogue',scene:'sky',speaker:'Omiros',who:'family-brother',text:'“Come on! Let’s tell Mum!”'},
    {id:'tell-mum',kind:'explore',goal:'Go back inside with Omiros and tell Mum what you saw.'},
    {id:'mum-listens',kind:'dialogue',scene:'home',speaker:'Mum',who:'family-mother',text:'“Slow down. What did you see?”'},
    {id:'child-tells',kind:'dialogue',scene:'home',speaker:'You',who:'memory-child',text:'“Something huge! Above our heads. We both saw it!”'},
    {id:'dad-returns',kind:'timed',scene:'home',duration:3800},
    {id:'mum-early',kind:'dialogue',scene:'home',speaker:'Mum',who:'family-mother',text:'“You’re early.”'},
    {id:'dad-news',kind:'dialogue',scene:'home',speaker:'Dad',who:'family-father',text:'“Something happened.”'},
    {id:'silence',kind:'timed',scene:'home',duration:1600},
    {id:'fade-out',kind:'timed',scene:'home',duration:1300},
    {id:'done',kind:'complete'}
  ];
  const byId=new Map(beats.map((b,i)=>[b.id,{...b,index:i}]));
  function initial(){return {beat:'explore-home',elapsed:0};}
  function current(s){return s.memory?.scene==='courtyard'?byId.get(s.memory.opening?.beat)||null:null;}
  function valid(o){const b=byId.get(o?.beat);return !!b&&Number.isFinite(o.elapsed)&&o.elapsed>=0&&(b.kind==='timed'?o.elapsed<=b.duration:o.elapsed===0);}
  function advance(s){const b=current(s);if(!b||b.kind==='complete')return false;s.memory.opening={beat:beats[b.index+1].id,elapsed:0};return true;}
  function update(s,dt){const b=current(s);if(b?.kind!=='timed'||s.mode!=='cutscene')return false;s.memory.opening.elapsed+=Math.max(0,Math.min(100,dt));if(s.memory.opening.elapsed>=b.duration)return advance(s);return false;}
  function visible(s,p){const b=current(s);if(!b)return true;
    if(p.id==='continue-memory')return false;
    if(p.id==='father')return b.index<=byId.get('dad-leaving').index||b.index>=byId.get('dad-returns').index;
    if(p.id==='brother')return b.index>=byId.get('play-outside').index&&b.index<=byId.get('tell-mum').index;
    return true;
  }
  const leaving=[[9,5],[9,6],[9,7],[9,8],[8,8],[7,8],[7,9],[7,10]];
  function actorPose(s,id){const b=current(s);if(!b)return null;
    if(id==='mother'&&b.kind!=='explore')return {x:4,y:4,facing:'right',frame:0};
    if(id==='father'&&b.index>=byId.get('mum-early').index)return {x:9,y:5,facing:'left',frame:0};
    if(id==='father'&&['dad-leaving','dad-returns'].includes(b.id)){const route=b.id==='dad-leaving'?leaving:leaving.slice().reverse(),step=Math.min(route.length-1,s.memory.opening.elapsed/b.duration*(route.length-1)),i=Math.min(route.length-2,Math.floor(step)),f=step-i,[x,y]=route[i],[nx,ny]=route[i+1];return {x:x+(nx-x)*f,y:y+(ny-y)*f,facing:nx<x?'left':nx>x?'right':ny<y?'up':'down',frame:[0,1,0,2][Math.floor(s.memory.opening.elapsed/170)%4]};}
    if(b.kind!=='explore'&&(id==='brother'||id==='indoor-play'))return b.scene==='home'?{x:5,y:5,facing:'right',frame:0}:{x:8,y:6,facing:'up',frame:0};
    return null;
  }
  function music(s){const b=current(s);if(!b)return null;if(['dad-news','silence','fade-out'].includes(b.id))return 'silence';if(['sky-question','island-fade','island','island-return','bird','dad-returns','mum-early'].includes(b.id))return 'omen';return 'childhood';}
  const api={beats,initial,current,valid,advance,update,visible,actorPose,music};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityOpening=api;
})(typeof globalThis!=='undefined'?globalThis:this);
