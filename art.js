/* Original generated character/building atlases, composed on a deterministic tile map. */
(function(){
  'use strict';
  const E=window.SZ,T=24,W=E.WIDTH*T,H=E.HEIGHT*T,A=window.CityAtlas;
  const cast=new Image(),buildings=new Image();
  const load=(image,src)=>new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('Could not load '+src));image.src=src;});
  const ready=Promise.all([load(cast,'assets/cast-source.png'),load(buildings,'assets/buildings-source.png')]);
  const map=document.createElement('canvas');map.width=W;map.height=H;const g=map.getContext('2d');
  const camera={x:0,y:0,ready:false};
  function box(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  function label(c,s,x,y,size=7,color='#334b5b',align='left'){c.fillStyle=color;c.font='bold '+size+'px monospace';c.textAlign=align;c.fillText(s,Math.round(x),Math.round(y));c.textAlign='left';}
  const directionRow={down:0,left:1,right:2,up:3};
  function sprite(c,who,x,y,facing='down',frame=0,height=34){
    const column=who==='aris'?frame:({mina:3,eleni:4,dimos:5,boss:5}[who]??0),r=A.cast[directionRow[facing]??0][column];
    if(!r)return;const width=Math.round(r[2]/r[3]*height);
    c.save();c.imageSmoothingEnabled=false;
    if(who==='boss')c.filter='grayscale(.8)';
    c.drawImage(cast,...r,Math.round(x-width/2),Math.round(y-height),width,height);c.restore();
  }
  function face(c,who='aris',size=64){
    const col={aris:0,mina:3,eleni:4,dimos:5,boss:5}[who]??0,r=A.cast[0][col];c.imageSmoothingEnabled=false;
    box(c,0,0,size,size,'#c1d8c4');
    c.drawImage(cast,r[0],r[1],r[2],Math.round(r[3]*.48),3,1,size-6,size-2);
  }
  function avatar(who){const c=document.createElement('canvas');c.width=64;c.height=64;c.setAttribute('aria-label',who+' portrait');face(c.getContext('2d'),who);return c;}
  function tree(c,x,y){
    box(c,x-3,y-12,7,19,'#5c4e41');box(c,x,y-9,2,15,'#9d7852');
    const colors=['#23594e','#32785d','#56a56b','#7fbd75'];
    for(let py=-40;py<2;py+=2)for(let px=-22;px<24;px+=2){
      const distance=Math.min(Math.hypot(px+7,py+18)/17,Math.hypot(px-6,py+24)/18,Math.hypot(px,py+8)/18);
      if(distance<1){const n=(px*17+py*31+4000)%13;box(c,x+px,y+py,2,2,colors[distance>.88?0:n<3?3:py<-20?2:1]);}
    }
  }
  const trees=[{x:42,y:166},{x:238,y:326},{x:490,y:352},{x:742,y:365},{x:18,y:376}];
  function plant(c,x,y){box(c,x-4,y-1,9,7,'#9a5f49');box(c,x-5,y-3,11,3,'#cf8e60');box(c,x-4,y-10,9,9,'#477e55');box(c,x-1,y-13,4,8,'#83af62');}
  function prepare(){
    g.imageSmoothingEnabled=false;box(g,0,0,W,H,'#e1d2ae');
    for(let y=0;y<H;y+=12)for(let x=0;x<W;x+=12){const n=(x*11+y*17)%23;box(g,x+1,y+1,11,11,n<6?'#ebdfbd':n<12?'#e6d8b4':'#dfceaa');box(g,x,y,12,1,'#d2c19c');}
    for(const road of [{x:0,y:192,w:W,h:48},{x:408,y:0,w:48,h:H},{x:0,y:384,w:W,h:48}]){
      box(g,road.x-3,road.y-3,road.w+6,road.h+6,'#b5b9b1');box(g,road.x,road.y,road.w,road.h,'#788997');
      box(g,road.x+2,road.y+2,road.w-4,road.h-4,'#82929d');
    }
    for(let x=10;x<W;x+=42)for(const y of [215,407])box(g,x,y,23,2,'#e8e4c9');
    for(let y=12;y<H;y+=40)box(g,431,y,2,22,'#e8e4c9');
    for(let i=0;i<6;i++){box(g,365,194+i*7,24,3,'#f5edcf');box(g,410+i*7,360,3,22,'#f5edcf');box(g,140,386+i*7,24,3,'#f5edcf');}
    // Small planted verges make the pavement read as individual places.
    for(const t of trees){box(g,t.x-17,t.y-4,34,16,'#b8bd8e');box(g,t.x-18,t.y+11,36,3,'#b7ad85');}
    const order={home:0,kiosk:1,work:2,cafe:3,flats:4,shop:5,venue:6,station:7};
    for(const b of E.BUILDINGS){
      const x=b.x*T,y=b.y*T,w=b.w*T,h=b.h*T,r=A.buildings[order[b.type]];
      box(g,x+4,y+5,w,h,'#a9ad98');
      g.drawImage(buildings,...r,x,y,w,h);
    }
    // Doorways are pinned to interaction tiles, rather than hidden in the illustration.
    for(const p of E.PLACES.filter(p=>!['mina','dimos','bench'].includes(p.id))){
      const x=p.x*T+12,y=p.y*T;
      box(g,x-7,y+3,14,10,'#c9b487');box(g,x-6,y+4,12,7,'#f4e0ad');box(g,x-5,y+10,10,1,'#bda573');
      if(p.id==='venue'||p.id==='metro'){box(g,x-10,y-3,20,15,'#415765');for(let i=0;i<4;i++)box(g,x-8,y+i*3,16,1,'#e0cba1');}
    }
    box(g,226,342,47,5,'#7b5d47');box(g,229,351,40,5,'#b0875c');box(g,231,356,3,6,'#535a51');box(g,264,356,3,6,'#535a51');
    for(const [x,y]of [[183,149],[356,335],[551,161],[691,447]])plant(g,x,y);
    box(g,492,165,15,20,'#44766a');box(g,490,163,19,4,'#2d5956');box(g,514,165,15,20,'#5c8da1');box(g,512,163,19,4,'#325e78');
    label(g,'ΠΑΤΗΣΙΩΝ',515,232,8,'#d5e1d9');
    label(g,'ΠΕΡΙΠΤΕΡΟ',288,144,6,'#f7e6b4','center');label(g,'MARKET',612,336,6,'#f7efcf','center');
    // Laundry and street posters stay small, avoiding labels over every character.
    box(g,231,253,105,1,'#58696b');for(let i=0;i<6;i++)box(g,236+i*16,254,9,11,['#6f9fc0','#f5edce','#d47d68'][i%3]);
    box(g,32,264,13,18,'#e5af72');box(g,49,264,11,18,'#91b8c2');label(g,'LIVE',34,273,4,'#6a4b48');
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
    car(c,still?350:(t*.024+300)%(W+70)-35,226,'#d58e65');car(c,still?660:W+35-(t*.016%(W+70)),201,'#99b7c6');car(c,440,still?80:(t*.012+30)%(H+70)-35,'#d6bd7d',true);
    const people=[{who:'eleni',x:5*T+12,y:6*T+19},{who:'mina',x:20*T+12,y:9*T+19},{who:'dimos',x:14*T+12,y:15*T+19},{who:'mina',x:29*T+12,y:10*T+18,ambient:true},{who:'dimos',x:2*T+12,y:10*T+18,ambient:true},{who:'aris',x:m.x*T+12,y:m.y*T+19,player:true}];
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
  window.CityArt={ready,render,battle,avatar,face,sprite,T,camera,resetCamera:()=>{camera.ready=false;}};
})();
