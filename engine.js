/* Original deterministic game rules. Usable in a browser and Node without a DOM. */
(function(root){
  'use strict';
  const VERSION=1, WIDTH=32, HEIGHT=22;
  const clamp=(n,min=0,max=100)=>Math.min(max,Math.max(min,n));
  const BUILDINGS=[
    {x:1,y:1,w:8,h:5,type:'home'}, {x:11,y:2,w:4,h:4,type:'kiosk'},
    {x:20,y:1,w:11,h:5,type:'work'}, {x:1,y:11,w:6,h:3,type:'cafe'},
    {x:9,y:11,w:6,h:3,type:'flats'}, {x:21,y:11,w:10,h:3,type:'shop'},
    {x:1,y:19,w:11,h:3,type:'venue'}, {x:21,y:19,w:10,h:3,type:'station'}
  ];
  const PLACES=[
    {id:'home',x:5,y:6,name:'Home · Eleni',label:'HOME',icon:'H'},
    {id:'kiosk',x:12,y:6,name:'The kiosk',label:'KIOSK',icon:'K'},
    {id:'employer',x:25,y:6,name:'Stockroom · unpaid shift',label:'SHIFT',icon:'!'},
    {id:'mina',x:20,y:9,name:'Mina · your coworker',label:'MINA',icon:'M'},
    {id:'shop',x:25,y:14,name:'Neighborhood market',label:'MARKET',icon:'€'},
    {id:'dimos',x:14,y:15,name:'Dimos · soundcheck',label:'DIMOS',icon:'D'},
    {id:'bench',x:10,y:14,name:'A little shade',label:'REST',icon:'·'},
    {id:'metro',x:27,y:18,name:'Ilektrikos · beyond this block',label:'LINE 1',icon:'1'},
    {id:'venue',x:7,y:18,name:'The basement gig',label:'GIG',icon:'♪'}
  ];
  const ACTIONS={
    explain:{name:'Explain',hint:'12 pressure · +6 stress',cost:0},
    evidence:{name:'Show the rota',hint:'24 pressure · once',cost:0},
    boundary:{name:'Set a boundary',hint:'16 pressure · −6 energy',cost:6},
    negotiate:{name:'Negotiate',hint:'14 pressure · −4 energy',cost:4},
    breathe:{name:'Breathe',hint:'−18 stress · no reply',cost:0},
    ally:{name:'Call on Mina',hint:'20 pressure · once',cost:0},
    snack:{name:'Eat a snack',hint:'+18 energy · −12 stress',cost:0},
    leave:{name:'Walk away',hint:'No wages · keep your evening',cost:0}
  };
  function fresh(){return {version:VERSION,mode:'intro',x:5,y:8,facing:'down',minutes:1040,money:840,energy:72,stress:18,inventory:{snack:0,groceries:0,rota:0,ticket:0},relations:{eleni:1,mina:0,dimos:1},flags:{started:false,homeTalk:false,minaTalk:false,dimosTalk:false,promised:false,phone:false,wages:false,settlement:false,walkedAway:false,delivered:false,attended:false},battle:null,ending:null,steps:0};}
  function walkable(x,y){return Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&x<WIDTH&&y>=0&&y<HEIGHT&&!BUILDINGS.some(b=>x>=b.x&&x<b.x+b.w&&y>=b.y&&y<b.y+b.h);}
  function nearest(s){let best=null,dist=Infinity;for(const p of PLACES){const d=Math.abs(p.x-s.x)+Math.abs(p.y-s.y);if(d<dist){dist=d;best=p;}}return dist<=2?best:null;}
  function tick(s,minutes,energy=0,stress=0){s.minutes=clamp(s.minutes+minutes,0,1800);s.energy=clamp(s.energy+energy);s.stress=clamp(s.stress+stress);}
  function start(s){s.mode='explore';s.flags.started=true;}
  function move(s,dx,dy){if(s.mode!=='explore'||Math.abs(dx)+Math.abs(dy)!==1)return false;s.facing=dx<0?'left':dx>0?'right':dy<0?'up':'down';if(!walkable(s.x+dx,s.y+dy))return false;s.x+=dx;s.y+=dy;s.steps++;if(s.steps%12===0)tick(s,1);return true;}
  function buy(s,item){const prices={groceries:420,snack:90,ticket:120};if(!(item in prices))return {ok:false,text:'That is not on the shelf.'};if(item!=='snack'&&s.inventory[item])return {ok:false,text:'You already have that.'};if(s.money<prices[item])return {ok:false,text:'Not enough money. Nothing was charged.'};s.money-=prices[item];s.inventory[item]++;tick(s,3);return {ok:true,text:item==='groceries'?'Bread, tomatoes, lentils. A small bag, a real dinner.':item==='snack'?'A sesame bar. For when your head starts buzzing.':'A ticket for another day. The wider city is outside this chapter.'};}
  function home(s,choice){if(choice==='talk'&&!s.flags.homeTalk){s.flags.homeTalk=true;s.relations.eleni++;tick(s,5,0,-4);return 'Eleni: “You don’t have to solve everything tonight. Just tell me if you’ll be late.”';}if(choice==='deliver'&&s.inventory.groceries&&!s.flags.delivered){s.flags.delivered=true;s.inventory.groceries--;s.relations.eleni++;tick(s,5,3,-6);return 'Eleni takes the bag. “I’ll cook. You go hear your friend.”';}if(choice==='rest'){tick(s,15,20,-12);return 'You lie down without taking your shoes off. Fifteen minutes disappear.';}return 'The kitchen light is on. There is still time to talk.';}
  function mina(s,choice){if(s.flags.minaTalk)return 'Mina: “The photo is yours. What you do with it is up to you.”';s.flags.minaTalk=true;tick(s,6);if(choice==='listen'){s.relations.mina+=2;s.inventory.rota=1;s.stress=clamp(s.stress-4);return 'Mina: “They cut my hours too. Here—our rota. Your name is on Thursday. I can back you up.”';}s.inventory.rota=1;return 'Mina: “Fine. Here’s the photo. Just don’t say I sent you.”';}
  function dimos(s,choice){if(s.flags.dimosTalk)return 'Dimos: “Seven o’clock. Even if you’re late, come in.”';s.flags.dimosTalk=true;tick(s,6);if(choice==='promise'){s.flags.promised=true;s.relations.dimos++;return 'Dimos: “Good. I left a space in the set for your demo. No pressure. Okay, some pressure.”';}s.stress=clamp(s.stress-3);return 'Dimos: “Thanks for saying it. I’ll keep the last song for you.”';}
  function phone(s){if(s.flags.phone)return 'Eleni: “Message received. Dinner will survive. So will I.”';s.flags.phone=true;s.relations.eleni++;tick(s,2,0,-5);return 'You text Eleni: “Chasing the shift money. I might be late.” She replies: “Okay. Eat something.”';}
  function beginBattle(s){if(s.flags.wages||s.flags.walkedAway)return false;s.mode='battle';s.battle={pressure:68,turn:0,usedEvidence:false,usedAlly:false,log:'“Accounts are closed. Come back next week.”',result:null};return true;}
  function tell(s){return ['stall','blame','offer'][s.battle.turn%3];}
  function canAct(s,id){if(s.mode!=='battle'||!s.battle||s.battle.result)return false;const a=ACTIONS[id];if(!a||s.energy<a.cost)return false;if(id==='evidence')return !!s.inventory.rota&&!s.battle.usedEvidence;if(id==='ally')return s.relations.mina>=2&&!s.battle.usedAlly;if(id==='snack')return s.inventory.snack>0;return true;}
  function resolveBattle(s,result){s.battle.result=result;s.flags.wages=result!=='left';s.flags.settlement=result==='settled';s.flags.walkedAway=result==='left';if(result==='won'){s.money+=2400;s.stress=clamp(s.stress-10);s.battle.log='The transfer arrives: €24. You earned this before you had to argue for it.';}if(result==='settled'){s.money+=1200;s.stress=65;s.battle.log='You take €12 now. The remaining wages are unresolved. A compromise, not a personal failure.';}if(result==='left'){s.stress=clamp(s.stress-12);s.battle.log='You leave without the wages. Your time belongs to you again.';}}
  function act(s,id){if(!canAct(s,id))return {ok:false};const b=s.battle,t=tell(s);tick(s,2,-ACTIONS[id].cost);let damage=0,reply=true,log='';
    if(id==='leave'){resolveBattle(s,'left');return {ok:true,result:'left'};}
    if(id==='explain'){damage=12;s.stress=clamp(s.stress+6);log='You explain the shift again. Being reasonable takes effort.';}
    if(id==='evidence'){damage=24+(t==='stall'?12:0);b.usedEvidence=true;log='The dated rota makes the missing shift hard to deny.';}
    if(id==='boundary'){damage=16+(t==='blame'?12:0);log='“I worked those hours. I need a payment date.”';}
    if(id==='negotiate'){damage=14+(t==='offer'?12:0);log='You ask for a concrete amount and a transfer today.';}
    if(id==='breathe'){s.stress=clamp(s.stress-18);reply=false;log='You let the silence sit. In. Out. Your next sentence can wait.';}
    if(id==='ally'){damage=20;b.usedAlly=true;s.stress=clamp(s.stress-8);log='Mina confirms the shift. You no longer have to prove it alone.';}
    if(id==='snack'){s.inventory.snack--;s.energy=clamp(s.energy+18);s.stress=clamp(s.stress-12);reply=false;log='A small pause. Something sweet. The argument can wait.';}
    b.pressure=Math.max(0,b.pressure-damage);if(b.pressure===0){resolveBattle(s,'won');return {ok:true,result:'won'};}
    if(reply){const stress=t==='blame'?14:t==='offer'?8:10;s.stress=clamp(s.stress+stress);log+=' '+({stall:'“I have to check with accounts.”',blame:'“You should have reminded me earlier.”',offer:'“Maybe we can settle part of it.”'}[t]);}
    b.turn++;b.log=log;if(s.stress>=100)resolveBattle(s,'settled');return {ok:true,result:b.result};
  }
  function end(s,where){const arrival=s.minutes,late=arrival>1140;s.flags.attended=where==='gig';if(where==='gig'){s.relations.dimos+=late?0:1;if(late&&s.flags.promised)s.relations.dimos=Math.max(0,s.relations.dimos-1);s.minutes=Math.max(s.minutes,1140);}s.ending={where,late,arrival,paid:s.flags.wages,delivered:s.flags.delivered};s.mode='ending';}
  function finishBattle(s){if(s.mode==='battle'&&s.battle?.result){s.mode='explore';return true;}return false;}
  function snapshot(s){return JSON.stringify(s);}
  function restore(raw){try{const p=JSON.parse(raw);if(!p||p.version!==VERSION||!p.flags?.started||!['explore','dialogue','journal','battle','ending'].includes(p.mode)||!walkable(p.x,p.y))return null;for(const k of ['minutes','money','energy','stress','steps'])if(!Number.isFinite(p[k])||p[k]<0)return null;if(p.money>100000||p.minutes>1800||p.energy>100||p.stress>100||!Number.isInteger(p.steps))return null;const base=fresh();for(const k of Object.keys(base.flags))if(typeof p.flags[k]!=='boolean')return null;for(const k of Object.keys(base.inventory))if(!Number.isInteger(p.inventory?.[k])||p.inventory[k]<0||p.inventory[k]>999)return null;for(const k of Object.keys(base.relations))if(!Number.isInteger(p.relations?.[k])||p.relations[k]<0||p.relations[k]>100)return null;if(!['up','down','left','right'].includes(p.facing))return null;if(p.mode==='battle'){const b=p.battle;if(!b||!Number.isInteger(b.turn)||b.turn<0||!Number.isFinite(b.pressure)||b.pressure<0||b.pressure>68||typeof b.log!=='string'||typeof b.usedEvidence!=='boolean'||typeof b.usedAlly!=='boolean'||![null,'won','settled','left'].includes(b.result))return null;}if(p.mode==='ending'&&(!p.ending||!['gig','home'].includes(p.ending.where)||typeof p.ending.late!=='boolean'))return null;const out=Object.assign(base,p);if(['dialogue','journal'].includes(out.mode))out.mode='explore';return out;}catch{return null;}}
  function path(s,target,radius=1){const start=[s.x,s.y],q=[start],seen=new Set([start.join(',')]),parents=new Map();let endPoint=null;while(q.length){const [x,y]=q.shift();if(Math.abs(x-target.x)+Math.abs(y-target.y)<=radius){endPoint=[x,y];break;}for(const [dx,dy]of[[0,1],[1,0],[0,-1],[-1,0]]){const nx=x+dx,ny=y+dy,key=nx+','+ny;if(walkable(nx,ny)&&!seen.has(key)){seen.add(key);parents.set(key,[x,y]);q.push([nx,ny]);}}}if(!endPoint)return [];const route=[];let p=endPoint;while(p[0]!==start[0]||p[1]!==start[1]){route.unshift(p);p=parents.get(p.join(','));}return route;}
  const api={VERSION,WIDTH,HEIGHT,BUILDINGS,PLACES,ACTIONS,fresh,walkable,nearest,tick,start,move,buy,home,mina,dimos,phone,beginBattle,tell,canAct,act,finishBattle,end,snapshot,restore,path};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SZ=api;
})(typeof globalThis!=='undefined'?globalThis:this);
