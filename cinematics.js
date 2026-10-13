/* Original pixel scenes and silhouettes; no aircraft body or explicit impact. */
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
    poly(c,[[-8,-6],[5,-8],[11,-3],[9,5],[1,8],[-7,3]],'#304f4c');rect(c,-2,5,3,18,'#304f4c');rect(c,-9,19,17,3,'#304f4c');
    const turn=Math.floor(elapsed/180)%4,rotors=[[-29,-2,58,3],[-19,-19,38,3],[-2,-27,3,54],[-19,16,38,3]][turn];rect(c,...rotors,'#355752');
    for(let i=0;i<5;i++){const trail=(elapsed/300+i*.25)%2,sz=3+i;rect(c,-7-i*5,8+i*5-trail*4,sz,sz,i%2?'#78867b':'#5a7066');}c.restore();
    if(b.id==='island'&&elapsed<650){c.fillStyle='rgba(12,24,30,'+(1-elapsed/650)+')';c.fillRect(0,0,w,h);}
  }
  function sky(c,s,sprite){const w=c.canvas.width,h=c.canvas.height,b=O.current(s);rect(c,0,0,w,h,'#b8d5d6');rect(c,0,h*.25,w,h*.3,'#c7ddda');rect(c,0,h*.55,w,h*.45,'#ded1ad');
    for(const [x,y,ww]of [[-10,h*.60,w*.28],[w*.72,h*.64,w*.34]]){rect(c,x,y,ww,h-y,'#a78369');rect(c,x-3,y-4,ww+6,5,'#e0cda5');for(let xx=x+8;xx<x+ww-8;xx+=17){rect(c,xx,y+10,10,20,'#365b66');rect(c,xx+2,y+12,6,15,'#86a8ae');}rect(c,x+2,y-13,ww*.3,9,'#788b89');}
    sprite(c,'memory-child',w*.42,h*.65,'up',0,34);sprite(c,'family-brother',w*.60,h*.65,'up',0,26);
    if(b.id==='bird'){const p=s.memory.opening.elapsed/4200,x=w+48-p*(w+96),y=h*.34+Math.sin(p*Math.PI)*h*.05,flap=Math.round(Math.sin(p*Math.PI*3)*3);poly(c,[[x,y+5],[x-10,y+3],[x-25,y-5-flap],[x-35,y-2-flap],[x-22,y+7],[x-8,y+10],[x-3,y+19],[x,y+15],[x+3,y+19],[x+8,y+10],[x+22,y+7],[x+35,y-2-flap],[x+25,y-5-flap],[x+10,y+3]],'#425c67');if(p<.16){c.fillStyle='rgba(12,24,30,'+(1-p/.16)+')';c.fillRect(0,0,w,h);}}
  }
  function scene(c,s,sprite){const b=O.current(s);if(!b)return false;if(b.scene==='island'){island(c,s);return true;}if(b.scene==='sky'){sky(c,s,sprite);return true;}return false;}
  function overlay(c,s){const b=O.current(s);if(!b)return;let alpha=0;if(['island-fade','island-return','fade-out'].includes(b.id))alpha=s.memory.opening.elapsed/b.duration;if(alpha){c.fillStyle='rgba(12,24,30,'+Math.min(1,alpha)+')';c.fillRect(0,0,c.canvas.width,c.canvas.height);}}
  window.CityCinematics={scene,overlay};
})();
