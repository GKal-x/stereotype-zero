from pathlib import Path
p=Path(__file__).resolve().parents[1]/'game.js';s=p.read_text(encoding='utf-8')
start=s.index('  function memoryEncounter()');end=s.index('  function memoryFilm(',start)
s=s[:start]+'''  let duelMenu='root',duelAnimation=null;
  function memoryEncounter(){tacticalView();}
  function tacticalView(){const d=E.prepareDuel(state);if(!d)return;const def=E.Combat.definitions[d.id],memory=state.mode==='memory-battle',a=memory?state.memory.life.active:state.battle,done=d.result!=='active'||!!state.battle?.result&&!memory;
    const run=id=>{const before={hp:d.hp,foe:d.foe};const r=E.duelMove(state,id);if(!r.ok)return;duelAnimation={start:performance.now(),before,move:id};save(false);if(r.left&&memory){duelMenu='root';close();return;}duelMenu='root';tacticalView();};
    const all=E.Combat.moves(d,E.duelContext(state)),pick=id=>{const m=all.find(m=>m.id===id);return {label:m.name,hint:m.hint+(m.remaining!==null?' · '+m.remaining+' uses':''),disabled:!m.enabled,run:()=>run(id)};};
    let options=done?[{label:memory?'Return to the scene':'Back to the stockroom',hint:d.result==='lost'?'Rest and retry; equipment stays.':'Continue',run:()=>{duelMenu='root';if(memory){E.finishMemoryEncounter(state);close();}else{E.finishBattle(state);overlay.className='overlay';overlay.replaceChildren();$('location-tag').hidden=false;canvas.focus({preventScroll:true});}save(false);}}]:duelMenu==='fight'?['attack','guard','feint','power'].map(pick):duelMenu==='bag'?['water','rest'].map(pick):duelMenu==='ally'?[pick('ally')]:duelMenu==='leave'?[pick('leave')]:[['fight','FIGHT','Attack · defence · tactic'],['bag','BAG','Item · recover effort'],['ally','ALLY','Support from someone you know'],['leave','LEAVE','Step away from the encounter']].map(([id,label,hint])=>({label,hint,run:()=>{duelMenu=id;tacticalView();}}));
    if(!done&&duelMenu!=='root')options.push({label:'Back',hint:'B · command menu',run:()=>{duelMenu='root';tacticalView();}});
    panel({portrait:false,kicker:done?'ENCOUNTER / '+(d.result==='won'?'COMPLETE':'WITHDRAWN'):'TURN '+(d.turn+1)+' / '+(duelMenu==='root'?'CHOOSE COMMAND':duelMenu.toUpperCase()),title:def.name,className:'tactical-panel',mode:memory?'memory-battle':'battle',extra:p=>{
      const c=document.createElement('canvas');c.width=320;c.height=174;c.className='tactical-arena';c.setAttribute('aria-label','Player seen from behind, facing '+def.foe+'. '+def.bar+' '+d.hp+'/100; opponent '+d.foe+'/68; effort '+d.effort+'/100.');p.append(c);
      const stats=document.createElement('div');stats.className='tactical-accessible';for(const [label,n,max]of [[def.foe,d.foe,68],['Your '+def.bar,d.hp,100],['Effort',d.effort,100]]){const bar=document.createElement('div');bar.setAttribute('role','progressbar');bar.setAttribute('aria-label',label);bar.setAttribute('aria-valuenow',n);bar.setAttribute('aria-valuemin',0);bar.setAttribute('aria-valuemax',max);stats.append(bar);}p.append(stats);
      const log=document.createElement('p');log.className='tactical-log';log.textContent=done&&!memory?a.log:d.log;log.setAttribute('aria-live','polite');p.append(log);
      const cue=document.createElement('p');cue.className='tactical-cue';cue.textContent=done?def.goal:'NEXT: '+E.Combat.intent(d).text;p.append(cue);
      if(duelMenu==='root'&&!done){const goal=document.createElement('small');goal.className='tactical-goal';goal.textContent=def.goal;p.append(goal);}
    },options});
  }
  function drawTactical(c,t){const d=E.prepareDuel(state);if(!d)return;const def=E.Combat.definitions[d.id],anim=duelAnimation,elapsed=anim?t-anim.start:9999,p=Math.min(1,elapsed/800),moving=elapsed<800&&!reduceMotion,attack=anim&&['attack','power','feint'].includes(anim.move),social=!['hyper','cordon'].includes(d.id);
    c.imageSmoothingEnabled=false;c.fillStyle=d.id==='hyper'?'#9ba781':d.id==='cordon'?'#7c8989':'#cec1a3';c.fillRect(0,0,320,174);c.fillStyle=d.id==='hyper'?'#687f62':'#9eaa99';c.fillRect(0,65,320,109);
    const ellipse=(x,y,w,h,color)=>{c.fillStyle=color;c.beginPath();c.ellipse(x,y,w,h,0,0,Math.PI*2);c.fill();};ellipse(245,81,58,10,'#b6c2a9');ellipse(69,158,65,13,'#bac5aa');
    const jump=moving&&attack?Math.sin(p*Math.PI*2)*10:0;Art.sprite(c,E.Memories.current(state)?.avatar||'aris',65+jump,158,'up',0,76);
    if(!(moving&&d.last.dealt&&elapsed>280&&Math.floor(elapsed/85)%2))Art.sprite(c,def.who,245-(moving&&d.last.taken&&elapsed>420?Math.sin(p*Math.PI*2)*8:0),81,'down',0,55);
    function ring(x,y,color){c.strokeStyle=color;c.lineWidth=3;c.beginPath();c.ellipse(x,y,24,31,0,0,Math.PI*2);c.stroke();}
    if(moving&&anim.move==='guard')ring(65,122,'#8fe0e3');if(d.guard)ring(245,56,'#89bcc8');if(d.exposed){c.strokeStyle='#eebc68';c.strokeRect(220,24,50,59);}if(moving&&['ally','water','rest'].includes(anim.move))ring(65,122,'#a6e5a0');
    if(moving&&attack&&p<.6){const x=95+p*230,y=120-p*95;c.fillStyle=social?'#f7efd4':'#efbe71';c.fillRect(x,y,social?13:9,social?9:9);if(social){c.fillStyle='#52696c';c.fillRect(x+3,y+3,7,1);}}
    const text=(txt,x,y,size=9)=>{c.fillStyle='#243a43';c.font='bold '+size+'px monospace';c.fillText(txt,x,y);};
    function card(x,y,w,name,value,max,effort){c.fillStyle='#253b47';c.fillRect(x,y,w,effort===undefined?38:52);c.fillStyle='#f4efd9';c.fillRect(x+2,y+2,w-4,effort===undefined?34:48);text(name,x+7,y+13);c.fillStyle='#526465';c.fillRect(x+7,y+19,w-14,5);c.fillStyle=value<max*.3?'#cf795e':'#63a787';c.fillRect(x+7,y+19,Math.round((w-14)*value/max),5);text(def.bar+' '+Math.round(value)+'/'+max,x+7,y+33,8);if(effort!==undefined)text('EFFORT '+effort+'/100',x+7,y+46,8);}
    card(7,7,155,def.foe,moving?anim.before.foe+(d.foe-anim.before.foe)*p:d.foe,68);card(150,112,163,E.Memories.current(state)?'YOU':'ARIS',moving?anim.before.hp+(d.hp-anim.before.hp)*p:d.hp,100,d.effort);
    if(moving){c.font='bold 14px monospace';c.fillStyle='#ffe6b0';if(d.last.dealt)c.fillText('-'+d.last.dealt,261,30-p*10);if(d.last.taken)c.fillText('-'+d.last.taken,92,104-p*10);}
  }
''' +s[end:]
start=s.index('  function battle(){');end=s.index('  function journal(){',start)
s=s[:start]+"  function battle(){tacticalView();}\n\n"+s[end:]
s=s.replace("const lifeScene=overlay.querySelector('.life-encounter');", "const tactical=overlay.querySelector('.tactical-arena');if(tactical)drawTactical(tactical.getContext('2d'),t);const lifeScene=overlay.querySelector('.life-encounter');")
s=s.replace("if(state.mode==='memory-battle'){if(state.memory.life.active?.result==='won')", "if(['memory-battle','battle'].includes(state.mode)&&duelMenu!=='root'){duelMenu='root';tacticalView();return;}if(state.mode==='memory-battle'){if(['won','lost'].includes(state.memory.life.active?.result))")
s=s.replace("Choose Step away to leave this moment.","Choose LEAVE to step away.")
s=s.replace("Choose Walk away to leave this encounter.","Choose LEAVE to step away.")
p.write_text(s,encoding='utf-8')
print('Installed tactical arena and command menu.')
