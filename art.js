/* Original coordinate-drawn pixel artwork on a compressed Athens street map. */
(function(){
  'use strict';
  const E=window.SZ,D=window.CityWorld,T=24,W=E.WIDTH*T,H=E.HEIGHT*T,P=window.CityPixels;
  const cast=new Image(),A=window.CityAtlas;
  const ready=new Promise((resolve,reject)=>{cast.onload=resolve;cast.onerror=()=>reject(new Error('Character art could not load'));cast.src='assets/cast-refined.png';});
  const map=document.createElement('canvas');map.width=W;map.height=H;const g=map.getContext('2d');
  const camera={x:0,y:0,ready:false};
  function box(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  function label(c,s,x,y,size=7,color='#334b5b',align='left'){P.text(c,s,x,y,color,align);}
  const directionRow={down:0,left:1,right:2,up:3};
  function sprite(c,who,x,y,facing='down',frame=0,height=34){
    if(who==='boss')return P.sprite(c,who,x,y,facing,frame,height);
    const column=who==='aris'?frame:({mina:3,eleni:4,dimos:5}[who]??0),r=A.cast[directionRow[facing]??0][column];
    const width=Math.round(r[2]/r[3]*height);c.imageSmoothingEnabled=false;
    c.drawImage(cast,...r,Math.round(x-width/2),Math.round(y-height),width,height);
  }
  function face(c,who='aris',size=64){
    if(who==='boss')return P.face(c,who,size);
    const col={aris:0,mina:3,eleni:4,dimos:5}[who]??0,r=A.cast[0][col];
    box(c,0,0,size,size,'#c1cbb8');c.imageSmoothingEnabled=false;
    c.drawImage(cast,r[0],r[1],r[2],Math.round(r[3]*.48),3,1,size-6,size-2);
  }
  function avatar(who){const c=document.createElement('canvas');c.width=64;c.height=64;c.setAttribute('aria-label',who+' portrait');face(c.getContext('2d'),who);return c;}
  function tree(c,x,y){
    box(c,x-3,y-12,7,19,'#5c4e41');box(c,x,y-9,2,15,'#9d7852');
    box(c,x-17,y-29,34,22,'#3d6657');box(c,x-21,y-22,42,17,'#3d6657');
    box(c,x-14,y-34,28,8,'#3d6657');box(c,x-16,y-27,30,15,'#668654');
    box(c,x-11,y-31,20,7,'#849963');box(c,x-19,y-20,9,9,'#668654');

  }
  const trees=D.TREES.map(p=>({x:p.x*T+12,y:p.y*T+19}));
  function plant(c,x,y){box(c,x-4,y-1,9,7,'#9a5f49');box(c,x-5,y-3,11,3,'#cf8e60');box(c,x-4,y-10,9,9,'#477e55');box(c,x-1,y-13,4,8,'#83af62');}
  function prepare(){
    g.imageSmoothingEnabled=false;box(g,0,0,W,H,'#e1d2ae');
    for(let y=0;y<H;y+=12)for(let x=0;x<W;x+=12){const n=(x*11+y*17)%23;box(g,x+1,y+1,11,11,n<6?'#ebdfbd':n<12?'#e6d8b4':'#dfceaa');box(g,x,y,12,1,'#d2c19c');}
    for(const road of D.STREETS){
      const x=road.x*T,y=road.y*T,w=road.w*T,h=road.h*T;
      box(g,x-3,y-3,w+6,h+6,'#b5b9b1');box(g,x,y,w,h,road.major?'#788997':'#929e9f');
      box(g,x+2,y+2,w-4,h-4,road.major?'#82929d':'#9aa5a4');
      if(road.major){if(w>h)for(let dx=8;dx<w;dx+=40)box(g,x+dx,y+h/2,21,2,'#e8e4c9');else for(let dy=8;dy<h;dy+=40)box(g,x+w/2,y+dy,2,21,'#e8e4c9');}
    }
    // Kato Patisia's station approach is underground. Streets continue above it.
    for(const part of D.RAIL.surface){const y=part.y*T,h=part.h*T;box(g,D.RAIL.x*T,y,D.RAIL.w*T,h,'#53665c');for(let dy=y;dy<y+h;dy+=9)box(g,D.RAIL.x*T+5,dy,D.RAIL.w*T-10,3,'#9e9171');for(const dx of [11,16,32,37])box(g,D.RAIL.x*T+dx,y,2,h,'#bfc6bb');}
    for(const s of D.SQUARES){
      box(g,s.x*T,s.y*T,s.w*T,s.h*T,'#d7c59c');
      for(let y=s.y*T+5;y<(s.y+s.h)*T;y+=12)for(let x=s.x*T+5;x<(s.x+s.w)*T;x+=12)box(g,x,y,7,7,'#eadcba');
      label(g,s.name,(s.x+s.w/2)*T,(s.y+s.h)*T-7,7,'#647663','center');
    }
    // Crossings sit at paths to destinations and at the two arterial roads.
    for(const [x,y,w,h]of [[12,23,3,1],[12,33,3,1],[48,27,4,1],[48,40,4,1]])for(let i=0;i<w*T;i+=7)box(g,x*T+i,y*T,3,h*T,'#f5edcf');
    // Small planted verges make the pavement read as individual places.
    for(const t of trees){box(g,t.x-17,t.y-4,34,16,'#b8bd8e');box(g,t.x-18,t.y+11,36,3,'#b7ad85');}
    for(const b of E.BUILDINGS)P.building(g,b,T);
    // Doorways are pinned to interaction tiles, rather than hidden in the illustration.
    for(const p of E.PLACES.filter(p=>['home','kiosk','employer','shop','metro','venue'].includes(p.id))){
      const x=p.x*T+12,y=p.y*T;
      box(g,x-7,y+3,14,10,'#c9b487');box(g,x-6,y+4,12,7,'#f4e0ad');box(g,x-5,y+10,10,1,'#bda573');
      if(p.id==='venue'||p.id==='metro'){box(g,x-10,y-3,20,15,'#415765');for(let i=0;i<4;i++)box(g,x-8,y+i*3,16,1,'#e0cba1');}
    }
    const bench=E.PLACES.find(p=>p.id==='bench'),bx=bench.x*T,by=bench.y*T;
    box(g,bx-8,by+1,43,5,'#7b5d47');box(g,bx-5,by+10,37,5,'#b0875c');box(g,bx-3,by+15,3,6,'#535a51');box(g,bx+27,by+15,3,6,'#535a51');
    for(const b of E.BUILDINGS){plant(g,(b.x+b.w-.4)*T,(b.y+b.h)*T+6);}
    box(g,31*T,31*T,15,20,'#44766a');box(g,31*T-2,31*T-2,19,4,'#2d5956');
    // Small street blades make intersections legible without covering the sprites.
    for(const road of D.STREETS.filter(r=>r.name)){
      const x=(road.w>road.h?road.x+1:road.x+road.w+.2)*T,y=(road.w>road.h?road.y-.4:road.y+3)*T;
      box(g,x-2,y-9,P.textWidth(road.name)+6,13,'#44667a');label(g,road.name,x+1,y+1,7,'#f3edd6');
    }
    const stop=E.PLACES.find(p=>p.id==='bus');box(g,stop.x*T+12,stop.y*T-25,2,36,'#596c77');box(g,stop.x*T+4,stop.y*T-28,18,13,'#527fa8');label(g,'608',stop.x*T+13,stop.y*T-18,7,'#fff4d7','center');
    box(g,24*T,43*T+6,72,15,'#314956');label(g,'LIVE · 19:00',24*T+3,43*T+16,6,'#edd7a3');
    for(const id of ['north','south']){const p=E.PLACES.find(p=>p.id===id);box(g,p.x*T-32,p.y*T-8,70,13,'#44667a');label(g,id==='north'?'↑ ΑΝΩ ΠΑΤΗΣΙΑ':'↓ ΚΕΝΤΡΟ',p.x*T+3,p.y*T+2,7,'#fff4d7','center');}
  }
  function car(c,x,y,color,vertical=false){
    c.save();c.translate(Math.round(x),Math.round(y));if(vertical)c.rotate(Math.PI/2);
    box(c,-18,-8,37,16,'#344958');box(c,-18,-6,37,13,color);box(c,-8,-8,17,16,color);box(c,-5,-6,11,12,'#b7d8d8');box(c,-4,-5,4,10,'#6f9aab');box(c,-14,-9,7,2,'#263842');box(c,9,-9,7,2,'#263842');box(c,-14,8,7,2,'#263842');box(c,9,8,7,2,'#263842');box(c,17,-4,2,3,'#ffe7a7');box(c,17,3,2,3,'#ffe7a7');c.restore();
  }
  function render(c,s,m,t,dt){
    const vw=c.canvas.width,vh=c.canvas.height;
    const wantX=Math.max(0,Math.min(W-vw,m.x*T+12-vw/2)),wantY=Math.max(0,Math.min(H-vh,m.y*T+12-vh*.55));
    const ease=1-Math.exp(-dt/85);if(!camera.ready){camera.x=wantX;camera.y=wantY;camera.ready=true;}else{camera.x+=(wantX-camera.x)*ease;camera.y+=(wantY-camera.y)*ease;}
    const cx=Math.round(camera.x),cy=Math.round(camera.y);c.imageSmoothingEnabled=false;box(c,0,0,vw,vh,'#e1d2ae');
    c.save();c.translate(-cx,-cy);c.drawImage(map,0,0);
    const still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    car(c,13*T,still?350:(t*.024+300)%(H+70)-35,'#d58e65',true);car(c,49*T,still?660:H+35-(t*.016%(H+70)),'#99b7c6',true);car(c,51*T,still?80:(t*.012+30)%(H+70)-35,'#d6bd7d',true);
    const people=[...['home','mina','dimos'].map(id=>{const p=E.PLACES.find(p=>p.id===id);return {who:id==='home'?'eleni':id,x:p.x*T+12,y:p.y*T+19};}),{who:'mina',x:46*T+12,y:36*T+18,ambient:true},{who:'dimos',x:11*T+12,y:24*T+18,ambient:true},{who:'aris',x:m.x*T+12,y:m.y*T+19,player:true}];
    const objects=[...people,...trees.map(tree=>({tree,y:tree.y}))].sort((a,b)=>a.y-b.y);
    for(const entity of objects){if(entity.tree){tree(c,entity.tree.x,entity.tree.y);continue;}
      const near=!entity.player&&Math.hypot(entity.x-(m.x*T+12),entity.y-(m.y*T+19))<T*2.6;
      const faceDir=entity.player?s.facing:near?(Math.abs(m.x*T+12-entity.x)>Math.abs(m.y*T+19-entity.y)?(m.x*T+12>entity.x?'right':'left'):(m.y*T+19>entity.y?'down':'up')):entity.ambient?'left':'down';
      c.fillStyle='#506b5f40';c.beginPath();c.ellipse(entity.x,entity.y-1,8,3,0,0,Math.PI*2);c.fill();
      sprite(c,entity.who,entity.x,entity.y,faceDir,entity.player?m.frame:0);
    }
    const nearest=E.nearest(s);
    if(nearest&&s.mode==='explore'){
      const x=nearest.x*T+12,y=nearest.y*T-19;
      box(c,x-5,y-8,11,9,'#fff3c9');box(c,x-4,y-7,9,7,'#e5ad53');box(c,x-1,y+1,3,2,'#fff3c9');label(c,'!',x,y,7,'#4c4439','center');
    }
    if(m.target||m.route.length){const target=m.target||{x:m.route[m.route.length-1][0],y:m.route[m.route.length-1][1]};c.strokeStyle='#fff6cf';c.lineWidth=1;c.strokeRect(target.x*T+5,target.y*T+5,14,14);}
    c.restore();
  }
  function battle(c,s,t){
    const w=c.canvas.width,h=c.canvas.height;box(c,0,0,w,h,'#d2c4a7');
    for(let x=0;x<w;x+=24){box(c,x,0,1,h,'#b8b39d');box(c,x+2,0,1,h,'#e8dbb7');}
    box(c,0,h*.3,w,h*.7,'#879a9b');for(let y=h*.3;y<h;y+=16)box(c,0,y,w,1,'#6f898e');
    label(c,'THURSDAY · FOUR HOURS · €24',w/2,19,7,'#304958','center');
    sprite(c,'boss',w*.7,h*.28,'down',0,54);box(c,w*.7-29,h*.28-1,59,7,'#a57750');box(c,w*.7-22,h*.28+6,4,18,'#755b49');box(c,w*.7+22,h*.28+6,4,18,'#755b49');
    sprite(c,'aris',w*.25,h*.4,'up',0,58);
  }
  ready.then(prepare);
  function minimap(c,s){const w=c.canvas.width,h=c.canvas.height,sx=w/E.WIDTH,sy=h/E.HEIGHT;box(c,0,0,w,h,'#e1d2ae');for(const r of D.STREETS)box(c,r.x*sx,r.y*sy,r.w*sx,r.h*sy,'#869696');box(c,D.RAIL.x*sx,0,D.RAIL.w*sx,h,'#45876a');for(const r of D.SQUARES)box(c,r.x*sx,r.y*sy,r.w*sx,r.h*sy,'#acbe8f');for(const b of E.BUILDINGS)box(c,b.x*sx,b.y*sy,b.w*sx,b.h*sy,'#b79c78');for(const p of E.PLACES.filter(p=>['home','employer','shop','venue','metro'].includes(p.id)))box(c,p.x*sx-1,p.y*sy-1,3,3,p.id==='metro'?'#2b7e54':'#5b696f');box(c,s.x*sx-2,s.y*sy-2,5,5,'#bf5c45');}
  window.CityArt={ready,render,battle,avatar,face,sprite,minimap,T,camera,resetCamera:()=>{camera.ready=false;}};
})();
