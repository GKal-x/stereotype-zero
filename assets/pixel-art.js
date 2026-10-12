/* Original pixel drawings. Coordinates and colors are the source artwork;
   no generated raster, filters, gradients or random texture in the live game. */
(function(root){
  'use strict';
  const ink='#303b43',skin='#cf9c77',light='#e6b992';
  function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
  // Five by seven capitals. Greek street letters share the same integer grid.
  const glyphs={A:'01110/10001/10001/11111/10001/10001/10001',B:'11110/10001/10001/11110/10001/10001/11110',C:'01111/10000/10000/10000/10000/10000/01111',D:'11110/10001/10001/10001/10001/10001/11110',E:'11111/10000/10000/11110/10000/10000/11111',F:'11111/10000/10000/11110/10000/10000/10000',G:'01111/10000/10000/10111/10001/10001/01111',H:'10001/10001/10001/11111/10001/10001/10001',I:'111/010/010/010/010/010/111',J:'00111/00010/00010/00010/10010/10010/01100',K:'10001/10010/10100/11000/10100/10010/10001',L:'10000/10000/10000/10000/10000/10000/11111',M:'10001/11011/10101/10101/10001/10001/10001',N:'10001/11001/11001/10101/10011/10011/10001',O:'01110/10001/10001/10001/10001/10001/01110',P:'11110/10001/10001/11110/10000/10000/10000',Q:'01110/10001/10001/10001/10101/10010/01101',R:'11110/10001/10001/11110/10100/10010/10001',S:'01111/10000/10000/01110/00001/00001/11110',T:'11111/00100/00100/00100/00100/00100/00100',U:'10001/10001/10001/10001/10001/10001/01110',V:'10001/10001/10001/10001/10001/01010/00100',W:'10001/10001/10001/10101/10101/10101/01010',X:'10001/10001/01010/00100/01010/10001/10001',Y:'10001/10001/01010/00100/00100/00100/00100',Z:'11111/00001/00010/00100/01000/10000/11111',0:'01110/10001/10011/10101/11001/10001/01110',1:'010/110/010/010/010/010/111',2:'01110/10001/00001/00010/00100/01000/11111',3:'11110/00001/00001/01110/00001/00001/11110',4:'10010/10010/10010/11111/00010/00010/00010',5:'11111/10000/10000/11110/00001/00001/11110',6:'01110/10000/10000/11110/10001/10001/01110',7:'11111/00001/00010/00100/01000/01000/01000',8:'01110/10001/10001/01110/10001/10001/01110',9:'01110/10001/10001/01111/00001/00001/01110','!':'1/1/1/1/1/0/1',':':'0/1/1/0/1/1/0','·':'0/0/0/1/0/0/0','.':'0/0/0/0/0/0/1','-':'000/000/000/111/000/000/000','↑':'00100/01110/10101/00100/00100/00100/00100','↓':'00100/00100/00100/00100/10101/01110/00100'};
  Object.assign(glyphs,{'Α':glyphs.A,'Β':glyphs.B,'Ε':glyphs.E,'Ζ':glyphs.Z,'Η':glyphs.H,'Ι':glyphs.I,'Κ':glyphs.K,'Μ':glyphs.M,'Ν':glyphs.N,'Ο':glyphs.O,'Ρ':glyphs.P,'Τ':glyphs.T,'Υ':glyphs.Y,'Χ':glyphs.X,'Γ':'11111/10000/10000/10000/10000/10000/10000','Δ':'00100/01010/01010/10001/10001/10001/11111','Θ':'01110/10001/10001/11111/10001/10001/01110','Λ':'00100/01010/01010/10001/10001/10001/10001','Ξ':'11111/00000/00000/01110/00000/00000/11111','Π':'11111/10001/10001/10001/10001/10001/10001','Σ':'11111/10000/01000/00100/01000/10000/11111','Φ':'00100/01110/10101/10101/10101/01110/00100','Ψ':'10101/10101/10101/01110/00100/00100/00100','Ω':'01110/10001/10001/10001/01010/01010/11011','€':'01111/10000/11110/10000/11110/10000/01111'});
  function textWidth(s){return [...s.toUpperCase()].reduce((n,ch)=>n+(glyphs[ch]?.split('/')[0].length||3)+1,0)-1;}
  function text(c,s,x,y,color=ink,align='left'){s=s.toUpperCase();if(align==='center')x-=textWidth(s)/2;else if(align==='right')x-=textWidth(s);x=Math.round(x);y=Math.round(y)-7;for(const ch of s){const rows=glyphs[ch]?.split('/');if(rows){rows.forEach((row,j)=>[...row].forEach((v,i)=>{if(v==='1')rect(c,x+i,y+j,1,1,color);}));x+=rows[0].length+1;}else x+=4;}}
  const cache=new Map();
  function character(who,dir,frame){
    const key=who+dir+frame;if(cache.has(key))return cache.get(key);
    const a=document.createElement('canvas');a.width=20;a.height=28;const c=a.getContext('2d');
    const p={aris:['#c59b49','#8c7040','#473c35'],mina:['#ad6851','#7b4c42','#74483a'],eleni:['#9b8aa5','#6e647f','#473c35'],dimos:['#4f817a','#385e5c','#473c35'],boss:['#8c999b','#626f78','#77716b']}[who]||['#c59b49','#8c7040','#473c35'];
    const side=dir==='left'||dir==='right',back=dir==='up',step=frame===1?-1:frame===2?1:0;
    // Broad clusters, a human-sized head, two jacket tones and a single outline.
    rect(c,6,1,8,2,ink);rect(c,4,3,12,7,ink);rect(c,5,3,10,6,p[2]);rect(c,6,9,8,3,ink);
    if(!back){rect(c,6,6,8,5,skin);rect(c,7,6,6,4,light);rect(c,5,4,10,3,p[2]);if(side){rect(c,dir==='left'?4:14,8,2,2,skin);rect(c,dir==='left'?6:12,7,1,1,ink);}else{rect(c,7,8,1,1,ink);rect(c,12,8,1,1,ink);}}
    if(who==='eleni'){rect(c,side?14:13,4,3,8,p[2]);}
    rect(c,5,12,10,9,ink);rect(c,6,12,8,8,p[0]);rect(c,12,13,2,7,p[1]);
    rect(c,3,13,3,7,ink);rect(c,4,13,2,5,p[0]);rect(c,14,13,3,7,ink);rect(c,14,13,2,5,p[0]);rect(c,4,19,2,2,skin);rect(c,14,19,2,2,skin);
    rect(c,6,20,8,5,ink);rect(c,7,21,2,4+step,'#52606a');rect(c,11,21,2,4-step,'#52606a');rect(c,5,25+step,5,2,ink);rect(c,10,25-step,5,2,ink);rect(c,6,25+step,3,1,'#ded9c5');rect(c,11,25-step,3,1,'#ded9c5');
    if(who==='aris'){for(let i=0;i<7;i++)rect(c,6+i,12+i,1,2,'#655d46');rect(c,11,17,4,4,'#777b59');}
    if(who==='dimos'){rect(c,back?6:15,9,3,14,ink);rect(c,back?7:16,10,1,11,'#786651');}
    if(who==='eleni'&&!back)rect(c,12,17,4,5,'#c9c8ae');
    cache.set(key,a);return a;
  }
  function sprite(c,who,x,y,dir='down',frame=0,height=28){const a=character(who,dir,frame),scale=Math.max(1,Math.round(height/28));c.imageSmoothingEnabled=false;c.drawImage(a,Math.round(x-10*scale),Math.round(y-28*scale),20*scale,28*scale);}
  function face(c,who,size){rect(c,0,0,size,size,'#c1cbb8');const a=character(who,'down',0),scale=Math.max(1,Math.floor(size/16));c.imageSmoothingEnabled=false;c.drawImage(a,3,0,14,13,Math.floor((size-14*scale)/2),Math.floor((size-13*scale)/2),14*scale,13*scale);}
  function building(c,b,T){
    const x=b.x*T,y=b.y*T,w=b.w*T,h=b.h*T,seed=b.x*7+b.y*11;
    const palette=b.type==='venue'?['#b8796a','#966558','#526d81']:[['#c9c0a6','#aaa18d','#557776'],['#d0b59c','#ad907e','#707e68'],['#b9bdb6','#979f9a','#5b7080'],['#d6c9ae','#b4a68d','#637f71'],['#c2a79b','#a18980','#786a61']][seed%5];
    const R=(dx,dy,rw,rh,col)=>rect(c,x+dx,y+dy,rw,rh,col);
    R(3,4,w,h,'#b3ad99');R(0,0,w,h,ink);R(2,2,w-4,h-4,palette[0]);
    const roof=Math.max(15,Math.floor(h*.17));R(3,3,w-6,roof,'#a6aaa0');R(4,roof,w-8,2,ink);R(5,5,w-10,2,'#d9d3be');
    // Flat Athens roof: solar water heater, aerial, a compact AC unit.
    R(w-30,7,17,7,'#647a82');R(w-29,8,15,2,'#91a9ad');R(w-27,15,2,3,ink);R(w-15,15,2,3,ink);R(12,7,12,8,'#d3cdb8');R(14,9,8,1,'#7d8885');R(14,12,8,1,'#7d8885');
    if(seed%3===0){R(w/2,2,1,10,ink);R(w/2-6,4,13,1,ink);}
    const floorY=h-28;
    if(b.type==='kiosk'){R(3,roof+3,w-6,h-roof-6,'#b39459');R(6,roof+7,w-12,9,'#e5d7b8');for(let xx=7;xx<w-8;xx+=10)R(xx,roof+7,4,9,'#788b75');R(9,roof+22,w-18,h-roof-29,ink);R(14,roof+25,w-28,h-roof-35,'#647a7b');for(let yy=roof+28;yy<h-12;yy+=9)for(let xx=12;xx<w-12;xx+=8){R(xx,yy,6,7,(xx+yy)%3?'#d4c6a5':'#aa785f');R(xx+1,yy+2,4,1,ink);}R(6,h-10,w-12,4,'#e3d4ad');return;}
    if(b.type==='station'){R(4,roof+5,w-8,11,'#477666');text(c,'ΗΣΑΠ',x+w/2,y+roof+14,'#f0e4c7','center');R(10,roof+22,w-20,h-roof-27,'#657975');R(16,roof+27,w-32,h-roof-32,'#364a4d');R(w/2-1,roof+27,2,h-roof-32,'#c1c7b2');return;}
    if(b.type==='work'){R(10,roof+8,w-20,h-roof-14,'#707f82');for(let yy=roof+10;yy<h-5;yy+=5)R(12,yy,w-24,1,'#52656c');R(w-20,h-32,13,27,ink);R(w-18,h-30,9,24,'#8b7765');return;}
    if(b.type==='venue'){R(3,roof+2,w-6,h-roof-5,'#b8796a');for(let j=0;j<3;j++){const px=14+j*(w-28)/3;R(px,roof+13,30,38,ink);R(px+2,roof+15,26,34,j===1?'#7a8295':'#72949e');R(px+13,roof+22,2,16,ink);R(px+8,roof+32,12,11,ink);R(px+11,roof+30,6,15,ink);}R(13,roof+5,w-26,2,ink);for(let xx=20;xx<w-10;xx+=31){R(xx,roof+3,7,4,ink);R(xx+2,roof+7,3,2,'#e1c489');}}
    const floors=b.type==='venue'?0:Math.max(1,Math.floor((floorY-roof)/30)),gap=(floorY-roof)/Math.max(1,floors);
    for(let f=0;f<floors;f++){
      const fy=Math.round(roof+5+f*gap),columns=Math.max(1,Math.floor((w-15)/29)),spacing=(w-12)/columns;
      for(let j=0;j<columns;j++){const wx=Math.round(8+j*spacing);R(wx,fy,15,19,ink);R(wx+2,fy+2,11,15,'#536e79');R(wx+8,fy+2,1,15,'#adc0b6');
        if((seed+j+f)%3!==0){R(wx-3,fy,4,19,palette[2]);R(wx+15,fy,4,19,palette[2]);}
        if((seed+j+f)%4===0){R(wx-3,fy-1,23,3,'#d0ccb5');R(wx-3,fy+2,23,3,'#7d8c7c');}
      }
      R(4,fy+20,w-8,4,palette[1]);R(5,fy+20,w-10,1,'#f0e3c7');R(6,fy+14,w-12,1,ink);for(let j=8;j<w-6;j+=7)R(j,fy+14,1,7,ink);
      if((seed+f)%3===0){R(14,fy+13,7,8,'#c9d3cd');R(23,fy+13,6,10,'#74919e');}
      if((seed+f)%2===0){R(w-21,fy+16,7,5,'#a06950');R(w-23,fy+12,10,5,'#667e52');}
    }
    R(3,h-28,w-6,25,palette[1]);
    const storefront=['shop','cafe','kiosk','venue'].includes(b.type);
    if(storefront){const col={shop:'#547b67',cafe:'#ac7957',kiosk:'#b69652',venue:'#716b83'}[b.type];R(7,h-29,w-14,7,col);for(let xx=9;xx<w-9;xx+=12)R(xx,h-29,5,7,'#e2d6b7');R(9,h-20,w-18,17,ink);for(let xx=12;xx<w-12;xx+=20)R(xx,h-18,15,13,'#5d7b80');
      if(b.type==='shop'){for(let xx=10;xx<w-10;xx+=11){R(xx,h-8,9,6,'#7c6848');R(xx+1,h-10,7,3,xx%2?'#b58c52':'#82915b');}}
      if(b.type==='venue'){R(w/2-17,h-20,34,17,'#303b43');for(let i=0;i<3;i++)R(w/2-15,h-7+i*2,30,1,'#a2998c');R(10,h-45,15,13,'#536e79');R(11,h-44,13,11,'#7f92a1');}
    }else{R(w/2-9,h-26,18,23,ink);R(w/2-7,h-24,14,21,palette[2]);R(w/2,h-22,1,16,'#a3b2a2');R(w/2+4,h-14,1,2,'#e5cc88');R(w/2-12,h-3,24,2,'#ddd2b7');}
  }
  root.CityPixels={sprite,face,building,text,textWidth};
})(typeof globalThis!=='undefined'?globalThis:this);
