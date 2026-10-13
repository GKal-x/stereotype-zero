/* Textured neighbourhood artwork on a compressed Athens street map. */
(function(){
  'use strict';
  const E=window.SZ,D=window.CityWorld,T=24,W=E.WIDTH*T,H=E.HEIGHT*T,P=window.CityPixels;
  const cast=new Image(),buildings=new Image(),supervisor=new Image(),memories=new Image(),A=window.CityAtlas;
  function load(image,src){return new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('Artwork could not load: '+src));image.src=src;});}
  const ready=Promise.all([load(cast,'assets/cast-refined.png'),load(buildings,'assets/buildings-source.png'),load(supervisor,'assets/supervisor-v1.png'),load(memories,'assets/memories-v1.png')]);
  const spriteCache=new Map();
  // Cache crisp samples at the intended pixel size; never blur the pixel clusters.
  function reduced(image,r,width,height){const tile=document.createElement('canvas');tile.width=width;tile.height=height;const ctx=tile.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.drawImage(image,...r,0,0,width,height);return tile;}
  const map=document.createElement('canvas');map.width=W;map.height=H;const g=map.getContext('2d');
  const camera={x:0,y:0,ready:false};
  function box(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  function label(c,s,x,y,size=7,color='#334b5b',align='left'){P.text(c,s,x,y,color,align);}
  const directionRow={down:0,left:1,right:2,up:3};
  function sprite(c,who,x,y,facing='down',frame=0,height=40){

    const memoryRow={'memory-child':0,'memory-scout':1,'memory-adult':2,'memory-partner':3}[who];
    const column=who==='aris'?frame:({mina:3,eleni:4,dimos:5}[who]??0),r=memoryRow!==undefined?window.MemoryAtlas[memoryRow][directionRow[facing]??0]:who==='boss'?window.SupervisorAtlas[directionRow[facing]??0]:A.cast[directionRow[facing]??0][column];
    const width=Math.round(r[2]/r[3]*height);c.imageSmoothingEnabled=false;
    const key=[who,facing,frame,height].join(':');
    if(!spriteCache.has(key))spriteCache.set(key,reduced(memoryRow!==undefined?memories:who==='boss'?supervisor:cast,r,width,height));
    c.drawImage(spriteCache.get(key),Math.round(x-width/2),Math.round(y-height));
  }
  function face(c,who='aris',size=64){

    const memoryRow={'memory-child':0,'memory-scout':1,'memory-adult':2,'memory-partner':3}[who];
    const col={aris:0,mina:3,eleni:4,dimos:5}[who]??0,r=memoryRow!==undefined?window.MemoryAtlas[memoryRow][0]:who==='boss'?window.SupervisorAtlas[0]:A.cast[0][col];
    box(c,0,0,size,size,'#c1cbb8');c.imageSmoothingEnabled=false;
    c.drawImage(memoryRow!==undefined?memories:who==='boss'?supervisor:cast,r[0],r[1],r[2],Math.round(r[3]*.48),3,1,size-6,size-2);
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
    const buildingIndex={home:0,kiosk:1,work:2,cafe:3,flats:4,shop:5,venue:6,station:7};
    for(const b of E.BUILDINGS){
      const r=A.buildings[buildingIndex[b.type]??4],fit=Math.min(b.w*T/r[2],b.h*T/r[3]),w=Math.round(r[2]*fit),h=Math.round(r[3]*fit);
      // Fit each façade to its existing collision footprint and doorway.
      // Preserve original shutters, laundry, plaster, awnings and roof equipment.
      box(g,b.x*T,(b.y+b.h)*T-4,b.w*T,4,'#9a9d89');g.drawImage(reduced(buildings,r,w,h),Math.round(b.x*T+(b.w*T-w)/2),(b.y+b.h)*T-h);
    }
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
    if(s.room)return interior(c,s,m,dt,t);
    const vw=c.canvas.width,vh=c.canvas.height;
    const wantX=Math.max(0,Math.min(W-vw,m.x*T+12-vw/2)),wantY=Math.max(0,Math.min(H-vh,m.y*T+12-vh*.55));
    const ease=1-Math.exp(-dt/85);if(!camera.ready){camera.x=wantX;camera.y=wantY;camera.ready=true;}else{camera.x+=(wantX-camera.x)*ease;camera.y+=(wantY-camera.y)*ease;}
    const cx=Math.round(camera.x),cy=Math.round(camera.y);c.imageSmoothingEnabled=false;box(c,0,0,vw,vh,'#e1d2ae');
    c.save();c.translate(-cx,-cy);c.drawImage(map,0,0);
    const still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    car(c,13*T,still?350:(t*.024+300)%(H+70)-35,'#d58e65',true);car(c,49*T,still?660:H+35-(t*.016%(H+70)),'#99b7c6',true);car(c,51*T,still?80:(t*.012+30)%(H+70)-35,'#d6bd7d',true);
    const people=[...['mina','dimos'].map(id=>{const p=E.PLACES.find(p=>p.id===id);return {who:id,x:p.x*T+12,y:p.y*T+19};}),{who:'mina',x:46*T+12,y:36*T+18,ambient:true},{who:'dimos',x:11*T+12,y:24*T+18,ambient:true},{who:'aris',x:m.x*T+12,y:m.y*T+19,player:true}];
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
  function interior(c,s,m,dt,t){
    const r=E.Rooms.rooms[s.room],w=r.width*T,h=r.height*T,vw=c.canvas.width,vh=c.canvas.height;
    const wx=Math.max(0,Math.min(w-vw,m.x*T+12-vw/2)),wy=Math.max(0,Math.min(h-vh,m.y*T+12-vh*.55)),ease=1-Math.exp(-dt/85);
    if(!camera.ready){camera.x=wx;camera.y=wy;camera.ready=true;}else{camera.x+=(wx-camera.x)*ease;camera.y+=(wy-camera.y)*ease;}
    box(c,0,0,vw,vh,'#293b43');c.save();c.translate(-Math.round(camera.x),-Math.round(camera.y));box(c,0,0,w,h,'#69736c');box(c,T,T,w-2*T,h-2*T,r.color);
    for(let y=T;y<h-T;y+=12)for(let x=T;x<w-T;x+=24){box(c,x,y,24,1,'#a69f8c');box(c,x,y,1,12,'#b3ac99');}
    // Baseboards, wall tiles and lived-in objects give each room a particular use.
    box(c,T,22,w-2*T,3,'#594f45');
    for(let x=T;x<w-T;x+=24){box(c,x,2,22,20,s.room==='venue'?'#51465e':'#d9c9a7');box(c,x+1,4,1,17,'#b6a78c');}
    if(s.room==='home'){
      box(c,5*T,6*T,4*T,2*T,'#9a6855');for(let i=0;i<4;i++)box(c,5*T+3,6*T+4+i*10,4*T-6,2,'#c89975');
      for(const x of [2*T,11*T]){plant(c,x,26);box(c,x-8,7,16,11,'#785a4e');box(c,x-5,9,10,7,'#b9c8a0');}
      box(c,8*T,8,23,12,'#6f655a');label(c,'HOME',8*T+2,18,7,'#f3dfbc');
    }
    if(s.room==='venue'){
      for(const x of [2*T,5*T,9*T]){box(c,x,5,24,17,'#353d49');box(c,x+2,7,20,13,x===5*T?'#b66d5d':'#84989d');label(c,'LIVE',x+3,17,7,'#f9e8bd');}
      for(let x=5*T;x<11*T;x+=14){box(c,x,3*T-4,7,2,'#d9b16b');box(c,x+2,3*T-2,3,3,'#f4d191');}
      for(let x=6*T;x<9*T;x+=10)box(c,x,4*T,6,2,'#4b5054');
    }
    if(s.room==='employer'){
      for(let y=5*T;y<9*T;y+=9){box(c,2*T,y,2*T,1,'#7e8b85');box(c,11*T,y,T,1,'#7e8b85');}
      box(c,4*T,6,36,15,'#5d685e');label(c,'ROTA',4*T+4,17,7,'#e7d8ba');
      box(c,9*T,6,12,12,'#ddd1b3');box(c,9*T+5,8,1,6,'#4f6266');box(c,9*T+5,13,4,1,'#4f6266');
    }
    if(s.room==='shop')for(let x=2*T;x<12*T;x+=20){box(c,x,8,16,10,'#e7d4ad');label(c,x%40?'€2':'€1',x+2,16,7,'#6f5148');}
    if(r.memory)memoryDecor(c,s,w,h,t);
    if(r.transit)stationDecor(c,s,w,h,t);
    // Wall windows and furniture are drawn on the same pixel grid.
    for(const x of [3*T,10*T]){box(c,x,5,28,17,'#243c49');box(c,x+2,7,24,13,s.room==='venue'?'#6e6279':'#a6bfc0');box(c,x+13,7,2,13,'#e0d5b9');}
    for(const o of r.objects){const x=o.x*T,y=o.y*T,ow=o.w*T,oh=o.h*T;box(c,x+2,y+4,ow,oh,'#777b6b');
      const colors={table:'#a78058',desk:'#a78058',bed:'#817c9d',kitchen:'#c6c6ac',counter:'#9c875f',shelf:'#8e805f',boxes:'#b59a71',produce:'#86916c',stage:'#796c7c',mixer:'#496374',speaker:'#34434b',bench:'#956e50','ticket-machine':'#547991',gates:'#9aa9a1','train-exterior':'#aaa88c','train-window':'#688b95','train-seat':'#567963','home-front':'#e1c59b','cafe-front':'#b27d65',bookstall:'#9e8056',planter:'#9e7854',sofa:'#aa7968',amp:'#435460'};
      box(c,x,y,ow,oh,'#35464a');box(c,x+2,y+2,ow-4,oh-4,colors[o.type]);
      if(o.type==='home-front'){for(let dx=6;dx<ow-14;dx+=24){box(c,x+dx,y+7,16,24,'#325e79');box(c,x+dx+2,y+9,12,19,'#84a8b1');box(c,x+dx+7,y+8,2,22,'#e4dab9');}box(c,x+ow/2-9,y+oh-22,18,22,'#2c6076');box(c,x+ow/2+4,y+oh-11,2,3,'#e1b76b');box(c,x,y+2,ow,3,'#a37e5d');}
      if(o.type==='sofa'){for(let dx=5;dx<ow-7;dx+=20){box(c,x+dx,y+4,17,oh-8,s.room==='memory-shared-home'?'#5d7c96':'#c2957c');box(c,x+dx,y+oh-6,17,2,'#745b53');}box(c,x+3,y+3,5,oh-6,'#695142');box(c,x+ow-8,y+3,5,oh-6,'#695142');if(s.room==='memory-shared-home')for(let dx=10;dx<ow-8;dx+=13){box(c,x+dx,y+8,2,2,'#294c68');box(c,x+dx,y,5,3,'#775b40');}}
      if(o.type==='amp'){for(let yy=y+4;yy<y+oh-5;yy+=3)box(c,x+4,yy,ow-8,1,'#7f918f');box(c,x+8,y+3,2,2,'#e3c47d');}
      if(o.type==='train-exterior'){trainSprite(c,x,y,ow,oh);continue;}
      if(o.type==='ticket-machine'){box(c,x+6,y+5,ow-12,18,'#253f50');label(c,'90',x+12,y+17,7,'#c8dbad');box(c,x+6,y+28,16,6,'#e5c56d');box(c,x+26,y+29,8,3,'#263e4c');box(c,x+8,y+39,ow-16,3,'#293b45');}
      if(o.type==='gates')for(let dx=6;dx<ow;dx+=26){box(c,x+dx,y+4,13,oh-8,'#d1d6c7');box(c,x+dx+3,y+7,8,7,'#36618b');box(c,x+dx+13,y+19,10,3,'#77a0a1');}
      if(o.type==='train-window'){box(c,x+3,y+3,ow-6,oh-6,'#2f4854');for(let dx=0;dx<ow-8;dx+=12){const offset=Math.round(t*.025)%12;box(c,x+4+dx-offset,y+6,7,oh-12,'#79938a');}box(c,x+ow/2,y+2,2,oh-4,'#d9d8bd');}
      if(o.type==='train-seat'){for(let yy=y+4;yy<y+oh-4;yy+=22){box(c,x+5,yy,ow-10,17,'#35584b');box(c,x+7,yy+2,ow-14,11,'#81a08a');box(c,x+3,yy+17,ow-6,3,'#c1c2ae');}}
      if(o.type==='bookstall')for(let yy=y+5;yy<y+oh-8;yy+=14)for(let xx=x+5;xx<x+ow-8;xx+=8){box(c,xx,yy,5,10,['#bc6d5d','#c8b579','#5b7a88'][Math.floor(xx/8)%3]);box(c,xx+1,yy+2,3,1,'#e9d5b0');}
      if(o.type==='cafe-front'){for(let dx=3;dx<ow-3;dx+=12)box(c,x+dx,y+3,6,12,'#edd4a0');box(c,x+7,y+20,ow-14,oh-26,'#3c5d66');label(c,'CAFE',x+9,y+32,7,'#e7d5ac');}
      if(o.type==='planter'){plant(c,x+ow/2,y+oh-5);plant(c,x+8,y+oh-9);}
      // Wood grain, raised rims, cabinet doors and little personal objects.
      if(['table','desk','bench'].includes(o.type)){for(let yy=y+6;yy<y+oh-4;yy+=7)box(c,x+5,yy,ow-10,1,'#906c4c');box(c,x+3,y+3,ow-6,2,'#c49a6a');}
      if(o.type==='bed'){box(c,x+4,y+4,ow-8,14,'#e3d9bd');box(c,x+4,y+25,ow-8,oh-29,'#a29ab0');}
      if(o.type==='table'&&s.room==='memory-scouts'){box(c,x+8,y+7,ow-16,oh-14,'#c3cfa9');for(let k=0;k<5;k++){box(c,x+12+k*12,y+10,1,oh-20,'#9cae8e');box(c,x+12+k*10,y+10+k*4,12,2,'#aa7056');}continue;}
      if(o.type==='table'){box(c,x+ow/2,y+8,14,14,'#ece1c3');box(c,x+ow/2+3,y+11,8,8,'#b97855');box(c,x+20,y+oh-15,6,9,'#4f7377');box(c,x+10,y+8,12,10,'#e0d9ba');box(c,x+ow-20,y+10,8,8,'#dbcba6');}
      if(o.type==='desk'){box(c,x+8,y+5,20,12,'#ded9c1');box(c,x+10,y+7,12,1,'#6f8183');box(c,x+ow-16,y+5,7,8,'#596d79');}
      if(['shelf','produce'].includes(o.type))for(let yy=y+5;yy<y+oh-6;yy+=12)for(let xx=x+4;xx<x+ow-6;xx+=10)box(c,xx,yy,7,7,(xx+yy)%3?'#c7b07b':'#a9745d');
      if(o.type==='boxes'){box(c,x+6,y+6,18,10,'#e4d4ad');for(let j=0;j<5;j++)box(c,x+8+j*2,y+8,1,6,'#5b625c');box(c,x+ow/2,y+2,2,oh-4,'#d7c49d');box(c,x+2,y+oh/2,ow-4,2,'#8e795a');}
      if(o.type==='kitchen'){for(let dx=5;dx<ow-6;dx+=20){box(c,x+dx,y+22,17,oh-26,'#a6ad93');box(c,x+dx+12,y+26,2,5,'#596d6a');}box(c,x+4,y+4,17,13,'#5d7780');box(c,x+ow-22,y+5,15,12,'#46595d');box(c,x+ow-19,y+8,9,6,'#c5a575');}
      if(o.type==='stage'){box(c,x+12,y+8,6,27,'#303d46');box(c,x+9,y+5,12,5,'#c6c1ad');box(c,x+ow-23,y+8,14,18,'#414e59');}
      if(o.type==='mixer')for(let j=0;j<4;j++){box(c,x+6+j*9,y+7,2,oh-14,'#a7b1ad');box(c,x+4+j*9,y+12+j*5,6,4,'#d6be85');}
      if(o.type==='speaker'){box(c,x+6,y+6,ow-12,oh-12,'#172f3d');box(c,x+12,y+13,ow-24,oh-26,'#596775');}
    }
    const people=[...E.places(s).filter(p=>p.who).map(p=>({who:p.who,x:p.x*T+12,y:p.y*T+19})),{who:E.Memories.current(s)?.avatar||'aris',x:m.x*T+12,y:m.y*T+19,player:true}].sort((a,b)=>a.y-b.y);
    for(const p of people){const dx=m.x*T+12-p.x,dy=m.y*T+19-p.y,look=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy<0?'up':'down');sprite(c,p.who,p.x,p.y,p.player?s.facing:Math.hypot(dx,dy)<T*3?look:'down',p.player?m.frame:0,p.who==='memory-child'?(p.player?30:23):40);}
    if(!r.memory){box(c,7*T+2,10*T+2,20,20,'#d7c39c');label(c,'↓',7*T+12,10*T+16,7,'#355460','center');}
    const near=E.nearest(s);if(near){if(near.who){const lift=near.who==='memory-child'?14:31;box(c,near.x*T+8,near.y*T-lift,9,10,'#f3dfae');label(c,'!',near.x*T+12,near.y*T-lift+8,7,'#5c5245','center');}else{c.strokeStyle='#e8c379';c.lineWidth=1;c.strokeRect(near.x*T+4,near.y*T+4,16,16);}}
    if(m.route.length){const end=m.route.at(-1);c.strokeStyle='#fff1c2';c.strokeRect(end[0]*T+5,end[1]*T+5,14,14);}
    c.restore();
  }
  let ballEffect=null;
  function memoryReact(choice){ballEffect={choice,start:performance.now()};}
  function memoryDecor(c,s,w,h,t){
    if(s.room==='memory-courtyard'){
      box(c,T,T,w-2*T,10,'#b7ab88');for(let x=T;x<w-T;x+=12)box(c,x,T+9,9,2,'#8c9476');
      box(c,7*T,3*T,4*T,1,'#f6e9c7');box(c,11*T,3*T,1,3*T,'#f6e9c7');
      const age=ballEffect?(t-ballEffect.start)/1000:2,p=age>=0&&age<1?Math.sin(age*Math.PI):0,bx=8*T+12-p*(ballEffect?.choice==='pass'?4*T:0),by=5*T+13-p*(ballEffect?.choice==='shot'?2*T:0);
      box(c,bx-4,by-4,9,9,'#f6edd2');box(c,bx-2,by-2,4,4,'#40515b');box(c,bx+2,by+2,2,2,'#40515b');plant(c,12*T,6*T);
    }
    if(s.room==='memory-scouts'){
      box(c,4*T,4,6*T,17,'#326d68');label(c,'22ο ΑΡΕΩΣ',7*T,16,7,'#f4df9d','center');
      box(c,4*T,6*T+8,16,19,'#5d806b');box(c,4*T+3,6*T+13,10,8,'#aab28c');box(c,4*T+13,6*T+11,5,13,'#425e59');
      for(let i=0;i<3;i++){box(c,5*T+i*18,7*T+12,14,16,'#a47a52');box(c,5*T+i*18+2,7*T+14,10,3,'#d1b782');}
      box(c,5*T,8,18,11,'#cdbb8c');label(c,'MAP',5*T+1,17,7,'#3f5b59');
    }
    if(s.room==='memory-shared-home'){
      for(let y=T;y<h-T;y+=12)for(let x=T;x<w-T;x+=24){box(c,x+1,y+1,22,10,(x/24+y/12)%3?'#b28a5c':'#c39c6b');box(c,x+4,y+4,15,1,'#a78157');}
      box(c,0,0,w,24,'#315f79');for(let x=24;x<w-24;x+=72){box(c,x,2,65,19,'#ddb94e');box(c,x+8,4,12,14,'#805c49');box(c,x+10,6,8,10,'#a2bba6');}box(c,6*T-15,3,30,18,'#f1e2bd');box(c,6*T-12,6,24,12,'#9fbcb7');box(c,6*T,6,2,12,'#e9dcb8');
      box(c,5*T,5*T,3*T,2*T,'#867c6f');for(let k=0;k<5;k++)box(c,5*T+3,5*T+4+k*8,3*T-6,1,'#b8ab93');
      // Original pixel guitar silhouette; musical interests are not diagnostic cues.
      const x=3*T+4,y=7*T+4;box(c,x+4,y-22,3,26,'#76583f');box(c,x+2,y-25,7,6,'#5a4840');box(c,x-2,y-3,15,18,'#a66c45');box(c,x+1,y-7,9,10,'#c08c50');box(c,x+3,y+1,5,5,'#354951');box(c,x+5,y-20,1,31,'#e4cc98');
      box(c,8*T+4,6*T+1,16,13,'#725842');for(let k=0;k<4;k++)box(c,8*T+6+k*3,6*T-2,2,11,['#b36e57','#537b87','#d4b96e','#b7bda8'][k]);
    }
  }
  function trainSprite(c,x,y,w,h){
    box(c,x,y+4,w,h-8,'#293e45');box(c,x+2,y+6,w-4,h-14,'#cfceb2');box(c,x+2,y+h-18,w-4,10,'#3b795a');box(c,x+4,y+2,w-8,5,'#8a9993');
    for(let dx=8;dx<w-12;dx+=40){box(c,x+dx,y+13,29,21,'#294956');box(c,x+dx+2,y+15,25,16,'#8aa7ab');box(c,x+dx+14,y+14,2,19,'#ced3bc');}
    const door=x+w/2-14;box(c,door,y+9,28,h-15,'#dfe0c8');box(c,door+3,y+13,9,18,'#4b747e');box(c,door+16,y+13,9,18,'#4b747e');box(c,door+13,y+9,2,h-16,'#677d74');
    for(const dx of [16,w-28]){box(c,x+dx,y+h-7,20,6,'#34454a');box(c,x+dx+4,y+h-3,4,3,'#1b313b');}label(c,'1',x+5,y+h-10,7,'#f1dd9d');
  }
  function stationDecor(c,s,w,h,t){
    if(['platform','victoria-platform'].includes(s.room)){
      box(c,T,4*T,w-2*T,3,'#e6be63');for(let x=T;x<w-T;x+=8)box(c,x,4*T+4,3,2,'#ad965f');
      box(c,5*T,7,4*T,13,'#337357');label(c,s.room==='platform'?'ΚΑΤΩ ΠΑΤΗΣΙΑ':'VICTORIA',7*T,17,7,'#fff1cf','center');
    }
    if(s.room==='metro'){box(c,4*T,6,6*T,14,'#337357');label(c,'1  ΚΑΤΩ ΠΑΤΗΣΙΑ',7*T,17,7,'#fff1cf','center');}
    if(s.room==='train'){box(c,4*T,6,6*T,14,'#263d48');label(c,s.transit.ride?.to==='victoria'?'→ VICTORIA':'→ KATO PATISIA',7*T,17,7,'#e6d9b5','center');for(let x=4*T;x<=10*T;x+=24){box(c,x,28,2,9*T,'#9aa89e');box(c,x+2,28,1,9*T,'#d6d8bf');}}
    if(s.room==='victoria'){for(const x of [2*T,11*T]){plant(c,x,5*T);box(c,x-1,5*T,2,20,'#536b5b');}box(c,5*T,6,4*T,14,'#337357');label(c,'VICTORIA',7*T,17,7,'#fff1cf','center');}
  }
  let encounterEffect=null;
  function react(id,before,after){encounterEffect={id,before,after,start:performance.now()};}
  function encounter(c,s,t){const w=c.canvas.width,h=c.canvas.height,e=encounterEffect,age=e?Math.max(0,t-e.start):9999,phase=Math.min(1,age/700),pulse=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:Math.sin(phase*Math.PI),recover=e&&['breathe','snack','ally'].includes(e.id);
    c.imageSmoothingEnabled=false;box(c,0,0,w,h,'#9ca99c');for(let y=8;y<h;y+=16)box(c,0,y,w,1,'#88988e');box(c,0,0,w,25,'#d4c8ab');label(c,'THURSDAY · €24 OWED',w/2,16,7,'#304958','center');
    const ax=w*.23+pulse*(recover?0:12),bx=w*.76+pulse*4;sprite(c,'aris',ax,h-15,'right',pulse>.5?1:0,58);sprite(c,'boss',bx,h-15,'left',0,58);
    if(recover&&phase<1){c.strokeStyle='#e9d28c';c.lineWidth=2;c.strokeRect(ax-20-pulse*5,h-75-pulse*5,40+pulse*10,65+pulse*10);}
    if(e&&e.id==='evidence'&&phase<1){box(c,ax+16+pulse*30,h-57,18,23,'#f5e7c5');for(let i=0;i<4;i++)box(c,ax+19+pulse*30,h-52+i*4,12,1,'#556a6a');}
    if(e&&phase<1)label(c,recover?'PAUSE':'−'+Math.max(0,e.before.pressure-e.after.pressure),w/2,h-45-pulse*8,7,recover?'#274d44':'#783e36','center');
    label(c,'ARIS',ax,h-4,7,'#304958','center');label(c,'SUPERVISOR',bx,h-4,7,'#304958','center');
  }
  ready.then(prepare);
  function minimap(c,s){const w=c.canvas.width,h=c.canvas.height,sx=w/E.WIDTH,sy=h/E.HEIGHT;box(c,0,0,w,h,'#e1d2ae');for(const r of D.STREETS)box(c,r.x*sx,r.y*sy,r.w*sx,r.h*sy,'#869696');box(c,D.RAIL.x*sx,0,D.RAIL.w*sx,h,'#45876a');for(const r of D.SQUARES)box(c,r.x*sx,r.y*sy,r.w*sx,r.h*sy,'#acbe8f');for(const b of E.BUILDINGS)box(c,b.x*sx,b.y*sy,b.w*sx,b.h*sy,'#b79c78');for(const p of E.PLACES.filter(p=>['home','employer','shop','venue','metro'].includes(p.id)))box(c,p.x*sx-1,p.y*sy-1,3,3,p.id==='metro'?'#2b7e54':'#5b696f');box(c,s.x*sx-2,s.y*sy-2,5,5,'#bf5c45');}
  window.CityArt={ready,render,battle,memoryReact,encounter,react,avatar,face,sprite,minimap,T,camera,resetCamera:()=>{camera.ready=false;}};
})();
