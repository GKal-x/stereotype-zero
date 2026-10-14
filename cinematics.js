/* Original code-native cutscenes. Historical cuts and personal recollections remain separate. */
(function(){
  'use strict';
  const O=window.CityOpening;
  function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  function poly(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.closePath();c.fill();}
  function island(c,s){const w=c.canvas.width,h=c.canvas.height,b=O.current(s),elapsed=b.id==='island-return'?5100:s.memory.opening.elapsed,p=Math.min(1,elapsed/5100);
    rect(c,0,0,w,h,'#4a9198');for(let y=0;y<h;y+=9)for(let x=(y%18?5:0);x<w;x+=27)rect(c,x,y,13,1,'#6daeb0');
    const cx=w*.5,cy=h*.49,rx=w*.39,ry=Math.min(h*.27,w*.48),shore=[[-.99,-.05],[-.83,-.62],[-.42,-.91],[.06,-1],[.69,-.72],[1,-.18],[.83,.46],[.36,.93],[-.27,.82],[-.77,.49]];
    const shape=(scale,color)=>poly(c,shore.map(([x,y])=>[cx+x*rx*scale,cy+y*ry*scale]),color);shape(1.11,'#83bab0');shape(1,'#d9c596');shape(.84,'#6e9565');
    for(const [dx,dy]of [[-.5,-.3],[-.13,-.57],[.48,-.3],[.38,.42],[-.42,.32]]){const x=cx+dx*rx,y=cy+dy*ry;rect(c,x-1,y-6,3,16,'#7e7850');poly(c,[[x,y-13],[x-14,y-8],[x-5,y-7],[x-11,y+1],[x,y-5],[x+12,y],[x+6,y-7],[x+15,y-9]],'#375f55');rect(c,x-2,y-12,5,5,'#668a56');}
    const x=-30+p*(w*.63+30),y=cy-ry*.37+p*ry*.48,scale=1-p*.54;
    c.save();c.translate(Math.round(x),Math.round(y));c.scale(scale,scale);
    // Readable helicopter shadow: cabin, tail boom, stabiliser, skids and rotor.
    c.rotate(-.28+p*.45);
    poly(c,[[-13,-7],[-5,-12],[9,-11],[17,-5],[17,5],[8,10],[-7,9],[-14,3]],'#294b49');
    poly(c,[[-12,-3],[-42,-1],[-47,-8],[-50,-8],[-48,6],[-40,6],[-12,4]],'#294b49');
    rect(c,-45,-12,3,25,'#34534e');rect(c,-51,-2,15,3,'#34534e');
    rect(c,-10,-15,25,2,'#34534e');rect(c,-10,13,25,2,'#34534e');rect(c,-5,-15,2,30,'#34534e');
    const angle=elapsed/110;c.save();c.rotate(angle);rect(c,-38,-1,76,3,'#355752');rect(c,-1,-30,3,60,'#355752');c.restore();
    for(let i=0;i<8;i++){const sz=4+i*1.5;rect(c,-25-i*7,8+i*4-Math.sin(elapsed/500+i)*3,sz,sz,i%2?'#78867b':'#5a7066');}c.restore();
    if(b.id==='island'&&elapsed<650){c.fillStyle='rgba(12,24,30,'+(1-elapsed/650)+')';c.fillRect(0,0,w,h);}
  }
  function sky(c,s,sprite){const w=c.canvas.width,h=c.canvas.height,b=O.current(s);rect(c,0,0,w,h,'#b8d5d6');rect(c,0,h*.25,w,h*.3,'#c7ddda');rect(c,0,h*.55,w,h*.45,'#ded1ad');
    for(const [x,y,ww]of [[-10,h*.60,w*.28],[w*.72,h*.64,w*.34]]){rect(c,x,y,ww,h-y,'#a78369');rect(c,x-3,y-4,ww+6,5,'#e0cda5');for(let xx=x+8;xx<x+ww-8;xx+=17){rect(c,xx,y+10,10,20,'#365b66');rect(c,xx+2,y+12,6,15,'#86a8ae');}rect(c,x+2,y-13,ww*.3,9,'#788b89');}
    sprite(c,'memory-child',w*.42,h*.65,'up',0,34);sprite(c,'family-brother',w*.60,h*.65,'up',0,26);
    if(b.id==='bird'){const p=s.memory.opening.elapsed/4200,x=w+48-p*(w+96),y=h*.34+Math.sin(p*Math.PI)*h*.05,flap=Math.round(Math.sin(p*Math.PI*3)*3);poly(c,[[x,y+5],[x-10,y+3],[x-25,y-5-flap],[x-35,y-2-flap],[x-22,y+7],[x-8,y+10],[x-3,y+19],[x,y+15],[x+3,y+19],[x+8,y+10],[x+22,y+7],[x+35,y-2-flap],[x+25,y-5-flap],[x+10,y+3]],'#425c67');if(p<.16){c.fillStyle='rgba(12,24,30,'+(1-p/.16)+')';c.fillRect(0,0,w,h);}}
  }
  function scene(c,s,sprite){const b=O.current(s);if(!b)return false;if(b.scene==='island'){island(c,s);return true;}if(b.scene==='sky'){sky(c,s,sprite);return true;}return false;}
  function overlay(c,s){const b=O.current(s);if(!b)return;let alpha=0;if(['island-fade','island-return','fade-out'].includes(b.id))alpha=s.memory.opening.elapsed/b.duration;if(alpha){c.fillStyle='rgba(12,24,30,'+Math.min(1,alpha)+')';c.fillRect(0,0,c.canvas.width,c.canvas.height);}}
  function caption(id,t){if(id==='december')return t<2500?'Exarcheia, 6 December 2008. A historical cut, outside your character’s viewpoint.':t<5500?'An officer fires. Fifteen-year-old Alexandros Grigoropoulos is killed.':'Back in Plaka, the news is still travelling. The city will not feel the same.';if(id==='station')return t<2200?'You remember being dragged inside.':t<5500?'They hit you. You were children.':'No player command caused this. Your friend is waiting in the aftermath.';return t<2500?'After Manolis died, the house changed.':t<5500?'Their grief became anger. They hit you.':'You were a child. The anger did not end at the edge of that room.';}
  function film(c,id,t,sprite){const w=c.canvas.width,h=c.canvas.height,p=Math.min(1,t/8000);rect(c,0,0,w,h,id==='december'?'#263842':'#76796f');rect(c,0,120,w,80,'#9c9987');
    if(id==='december'){for(const x of [0,220]){rect(c,x,15,100,105,'#756a62');rect(c,x+10,26,22,37,'#273b43');rect(c,x+54,27,26,43,'#273b43');rect(c,x+4,92,92,4,'#a3947d');}rect(c,0,153,w,2,'#b6ac93');}
    else {rect(c,12,18,w-24,85,id==='family'?'#c3b18e':'#87948f');rect(c,32,30,55,42,'#364b54');rect(c,30,72,59,4,'#d1c2a4');rect(c,210,104,85,12,'#5e5047');rect(c,218,116,6,21,'#3f4140');}
    const victimX=id==='december'?204:181-(t<2200?p*28:8),victimY=158;
    const hit=t>=2800;const fallen=t>=3400;
    if(id==='december'){// Anonymous silhouette: the historical victim never uses the player’s portrait.
      c.save();c.translate(victimX,victimY);if(fallen)c.rotate(-Math.PI/2);rect(c,-7,-35,14,13,'#293239');rect(c,-8,-23,17,18,'#434e55');rect(c,-6,-5,5,8,'#28353f');rect(c,3,-5,5,8,'#28353f');c.restore();
    }else if(fallen){c.save();c.translate(victimX,victimY-12);c.rotate(-Math.PI/2);sprite(c,id==='family'?'memory-child':'memory-teen',0,0,'left',0,id==='family'?33:40);c.restore();}else sprite(c,id==='family'?'memory-child':'memory-teen',victimX,victimY,'left',t<2200?1:0,id==='family'?33:40);
    if(id==='family'){sprite(c,'family-father',125,158,'right',0,42);if(hit&&t<3400)rect(c,137,128,26,4,'#ba936f');sprite(c,'family-mother',58,151,'right',0,40);}
    else {const x=id==='december'?98:143;sprite(c,id==='december'?'police-patrol':'police-riot',x,160,'right',0,46);if(id==='december'){rect(c,x+6,126,25,4,'#ac9171');rect(c,x+26,122,10,4,'#202a30');if(t>=2800&&t<2920)poly(c,[[x+36,121],[x+44,124],[x+36,128]],'#d5ba7a');}else {const rise=hit&&t<3400;poly(c,[[x+5,126],[x+18,rise?111:136],[x+22,rise?113:139],[x+10,132]],'#263b4a');rect(c,x+20,rise?102:135,3,22,'#273239');}}
    if(t>5500){c.fillStyle='rgba(15,24,31,'+Math.min(.88,(t-5500)/4000)+')';c.fillRect(0,0,w,h);}
  }
  window.CityCinematics={scene,overlay,film,caption};
})();
