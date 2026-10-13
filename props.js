/* Code-native pixel furniture. Footprints remain collision geometry; raised fronts
   and silhouettes describe the object rather than painting its bounding rectangle. */
(function(root){
  'use strict';
  function draw(c,o,T,room){
    const handled=['table','desk','bed','kitchen','counter','shelf','boxes','produce','stage','mixer','speaker','bench','sofa','amp','bookstall','guitars','record-player','tv-console','fridge','wardrobe','tent','backpacks','map-table'];
    if(!handled.includes(o.type))return false;
    const x=o.x*T,y=o.y*T,w=o.w*T,h=o.h*T;
    const b=(a,d,e,f,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+a),Math.round(y+d),Math.round(e),Math.round(f));};
    const oval=(a,d,rx,ry,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(Math.round(x+a),Math.round(y+d),rx,ry,0,0,Math.PI*2);c.fill();};
    const poly=(points,col)=>{c.fillStyle=col;c.beginPath();points.forEach(([a,d],i)=>i?c.lineTo(x+a,y+d):c.moveTo(x+a,y+d));c.closePath();c.fill();};
    const wood='#79533e',rim='#d1aa75',dark='#34434a',light='#eadcc0';
    const leg=(a,d)=>{b(a,d,4,9,dark);b(a+1,d,2,7,wood);};
    const book=(a,d,k)=>{b(a,d,4,13-k%3,['#a85f50','#d5b66f','#517782','#65795b'][k%4]);b(a+1,d+3,2,1,light);};
    // Restrained offset shadow, with transparent floor around legs and corners.
    b(4,h-4,w-6,7,'#535c5345');
    if(o.type==='guitars'){
      for(const [a,electric]of [[12,false],[w-10,true]]){
        b(a-1,-1,2,h-4,dark);b(a-8,h-3,16,2,dark);
        // Waist, shoulders and lower bout form an instrument, not a rectangular icon.
        if(electric)poly([[a-6,17],[a-7,25],[a-10,30],[a-9,40],[a-5,44],[a+6,44],[a+10,39],[a+9,29],[a+5,23],[a+6,16],[a+3,22],[a,22]],'#ab6145');
        else{oval(a,35,10,11,'#6e4533');oval(a,26,7,8,'#6e4533');oval(a,35,8,9,'#c69c59');oval(a,26,5,6,'#c69c59');}
        b(a-2,1,5,27,'#674c38');b(a-3,-6,7,10,'#8f7049');for(let k=0;k<3;k++){b(a-5,-5+k*3,2,2,'#c7c9b7');b(a+4,-5+k*3,2,2,'#c7c9b7');}
        if(electric){poly([[a+2,25],[a+7,29],[a+6,39],[a+1,40],[a-1,32]],'#ded6b9');b(a-3,29,7,2,dark);b(a-3,35,7,2,dark);}else oval(a,28,3,3,'#352f2b');
        b(a-4,39,9,2,'#634430');for(let k=0;k<3;k++)b(a-1+k,3,1,37,k===1?'#f0d7a0':'#b6a47b');for(let k=6;k<23;k+=4)b(a-2,k,5,1,'#baa87e');
      }return true;
    }
    if(['tv-console','record-player','wardrobe','fridge'].includes(o.type)){
      b(2,1,w-4,h-3,dark);b(4,2,w-8,h-7,o.type==='fridge'?'#d8d9c6':wood);b(4,2,w-8,3,o.type==='fridge'?'#f0edd7':rim);
      if(o.type==='tv-console'){
        b(10,-14,w-20,29,dark);b(13,-11,w-26,22,o.screenOn?'#4e7686':'#20343e');if(o.screenOn){b(15,-9,w-30,2,'#93afb1');b(18,-3,10,7,'#a5b48b');b(w-30,0,12,8,'#b59d75');}b(w/2-7,15,14,3,dark);b(6,23,w-12,2,wood);
        if(o.console){b(10,26,24,11,'#bdc2b8');oval(22,31,6,4,'#e1dfcd');b(12,35,5,1,dark);b(39,29,13,5,'#c5c9bd');b(41,27,3,9,'#c5c9bd');b(48,27,3,9,'#c5c9bd');b(42,29,3,1,dark);b(49,28,1,1,'#ad6558');}
      }else if(o.type==='record-player'){
        b(6,-8,w-12,23,'#a58e65');b(8,-6,w-16,18,'#3a4c51');oval(w*.36,3,10,7,'#1e333b');oval(w*.36,3,3,2,'#d5b775');b(w-17,-4,2,11,'#d6d2bc');b(w-24,6,8,2,'#d6d2bc');b(w-13,9,2,2,o.playing?'#9ecb85':'#ad7656');for(let j=8;j<w-9;j+=5)book(j,Math.max(17,h-19),j);b(5,h-7,w-10,2,rim);
      }else if(o.type==='fridge'){b(5,h*.34,w-10,2,'#8a9c99');b(w-10,10,2,9,dark);b(w-10,h*.34+8,2,12,dark);b(8,8,8,6,'#b5ba93');}
      else{b(w/2,5,1,h-12,'#d7b27d');b(w/2-5,h*.5,2,6,'#e3cb91');b(w/2+4,h*.5,2,6,'#e3cb91');}
      return true;
    }
    if(o.type==='tent'){
      poly([[3,h-5],[w*.33,-3],[w-3,h-5]],dark);poly([[7,h-7],[w*.33,1],[w-7,h-7]],'#b7995d');poly([[w*.33,1],[w*.33,h-7],[w-7,h-7]],'#8b8857');poly([[10,h-7],[w*.33,9],[w*.33+10,h-7]],'#3d554c');b(w*.33-1,5,2,h-13,'#e0c792');b(2,h-4,w-4,2,'#d0b47d');return true;
    }
    if(o.type==='backpacks'){
      for(let j=4;j<w-12;j+=19){b(j+3,2,9,3,dark);b(j,6,15,h-12,'#55776a');b(j+2,8,11,5,o.packed?'#d4c485':'#a1b18a');b(j+2,h-20,11,11,'#809679');b(j+3,17,2,9,'#c1b781');b(j+10,17,2,9,'#c1b781');if(o.packed){b(j+2,1,3,7,'#93b8bb');b(j+8,3,5,5,'#b66c53');}}return true;
    }
    if(o.type==='map-table'){
      draw(c,{...o,type:'table'},T,'memory-scouts');oval(w-17,12,7,7,dark);oval(w-17,12,5,5,'#e4dec2');poly([[w-17,7],[w-20,14],[w-17,12]],'#ba624c');poly([[w-17,17],[w-14,10],[w-17,12]],'#557b85');return true;
    }
    if(['table','desk','bench','counter'].includes(o.type)){
      const front=Math.min(9,h*.25),top=h-front-5;
      leg(5,h-9);leg(w-9,h-9);b(1,-3,w-2,top+5,dark);b(3,-2,w-6,top+2,wood);b(4,-2,w-8,top-1,'#b68c60');b(4,-2,w-8,2,rim);b(3,top,w-6,front,'#79583f');b(4,top,w-8,2,'#9c734f');
      if(o.type==='bench'){for(let j=4;j<top;j+=5)b(5,j,w-10,1,wood);return true;}
      if(o.type==='counter'){for(let j=5;j<w-8;j+=28){b(j,top+3,24,front-4,'#aa8860');b(j+10,top+3,5,1,dark);}b(w-43,-12,28,17,dark);b(w-40,-10,22,10,'#abc0ac');b(w-37,1,16,2,'#c9c5a6');b(w-50,8,36,9,'#c7c9b8');for(let j=0;j<4;j++)b(w-47+j*6,10,3,2,dark);return true;}
      if(o.type==='desk'){
        if(o.laptop&&o.closed){b(w*.24,18,w*.58,11,'#b5c2bc');b(w*.24,27,w*.58,2,dark);b(w*.52,21,5,3,'#dce0cc');b(7,4,10,14,light);return true;}
        if(o.laptop){b(w*.30,1,w*.48,16,dark);b(w*.30+2,3,w*.48-4,12,'#749ba3');poly([[w*.30,18],[w*.78,18],[w*.86,28],[w*.22,28]],'#c9cbbd');for(let j=0;j<5;j++)b(w*.30+j*7,21,4,1,'#546969');b(w*.48,24,10,2,'#929f9a');b(7,4,10,14,light);return true;}
        // A monitor with bezel, neck and foot; keyboard and mouse lie on the top.
        b(w*.37,-12,Math.min(35,w*.43),21,dark);b(w*.37+2,-10,Math.min(31,w*.43-4),16,'#638b9b');b(w*.37+4,-8,15,1,'#c5d9ca');b(w*.37+4,-4,22,1,'#b3c9b5');b(w*.54,9,3,5,dark);b(w*.45,13,17,2,dark);
        b(w*.32,17,w*.43,7,'#d2cbb4');for(let j=0;j<6;j++)b(w*.34+j*5,19,3,1,'#697977');oval(w*.83,20,3,4,'#d5d0be');b(7,3,12,16,light);b(9,6,8,1,'#76928d');b(9,10,7,1,'#76928d');return true;
      }
      if(room==='memory-scouts'){b(10,4,w-20,Math.max(12,top-8),'#c7d0a9');for(let j=0;j<4;j++){b(14+j*12,7,1,top-12,'#92a18c');b(14+j*10,8+j*5,12,2,'#aa6952');}return true;}
      oval(w*.28,top*.48,9,5,'#f0e4ca');oval(w*.28,top*.48,6,3,'#c18d67');oval(w*.72,top*.48,9,5,'#f0e4ca');oval(w*.72,top*.48,6,3,'#b47b53');b(w*.49,4,6,9,'#527e83');b(w*.49+6,6,3,4,light);b(w*.17-13,top*.4,1,8,'#d8d4c5');if(o.album){b(6,top-12,18,13,'#7e5145');b(7,top-11,2,11,'#caac76');b(11,top-9,9,7,'#c5c8a8');}return true;
    }
    if(o.type==='bed'){
      b(2,-6,w-4,h+4,dark);b(4,-4,w-8,h,wood);b(5,-3,w-10,13,'#ad875f');b(5,11,w-10,h-18,'#e3d9be');b(8,14,w-16,14,'#f6ebd2');b(9,15,w-18,2,'#fff4dc');b(6,32,w-12,h-40,'#678b96');b(6,33,w-12,4,'#9db2b1');for(let j=11;j<w-9;j+=9)b(j,38,1,h-47,'#80a0a7');b(5,h-8,w-10,6,'#3e6173');leg(3,h-3);leg(w-7,h-3);return true;
    }
    if(o.type==='sofa'){
      const blue=room==='memory-shared-home',base=blue?'#355f78':'#8f5c4e',seat=blue?'#6c90a6':'#c08d70';
      leg(5,h-8);leg(w-9,h-8);b(3,-6,w-6,h-1,wood);b(7,-11,w-14,4,rim);b(4,-8,w-8,4,wood);b(7,-6,w-14,h-5,base);
      const n=Math.max(2,Math.floor(w/31)),cw=(w-18)/n;
      for(let j=0;j<n;j++){const a=9+j*cw;b(a+1,-5,cw-4,Math.max(10,h*.43),seat);b(a+3,-6,cw-8,2,blue?'#92adbd':'#d6ac87');b(a,Math.max(8,h*.43),cw-2,h*.36,seat);b(a+2,h*.43,cw-6,2,blue?'#92adbd':'#d6ac87');b(a,h-7,cw-2,2,base);for(let k=0;k<2;k++){const bx=a+cw*.33+k*cw*.33;b(bx,2+k*4,1,3,base);b(bx-1,3+k*4,3,1,base);}}
      b(1,8,8,h-11,wood);b(2,4,7,8,seat);b(3,3,5,2,light);b(w-9,8,8,h-11,wood);b(w-9,4,7,8,seat);b(w-8,3,5,2,light);b(8,h-5,w-16,2,rim);return true;
    }
    if(['bookstall','shelf'].includes(o.type)){
      b(1,-8,w-2,h+6,dark);b(3,-7,w-6,h+3,wood);b(5,-5,w-10,h-1,'#54493b');
      for(let yy=0;yy<h-10;yy+=20){for(let xx=7,k=0;xx<w-8;xx+=6,k++){if(o.type==='shelf'){b(xx,yy+3,5,11,['#ad7255','#c3b984','#668f83'][k%3]);b(xx+1,yy+5,3,4,light);}else book(xx,yy+2,k+yy);}b(4,yy+16,w-8,3,'#b28a5f');b(4,yy+16,w-8,1,rim);}b(2,h-3,w-4,3,wood);return true;
    }
    if(o.type==='kitchen'){
      b(1,-3,w-2,h+1,dark);b(3,14,w-6,h-18,'#d7d2b4');b(2,-2,w-4,17,'#c9cec2');b(4,-1,w-8,2,'#f2ebcf');
      b(7,2,21,10,'#5a757d');b(9,3,17,7,'#96acac');b(14,-7,3,11,dark);b(16,-7,6,2,dark);
      b(w-28,1,22,12,'#46535b');for(const a of [w-22,w-12])for(const d of [4,9])oval(a,d,3,2,'#9ba6a0');
      oval(w*.55,7,6,5,'#65858a');b(w*.55-2,0,5,3,'#b9c7b9');b(w*.55+5,5,3,3,light);for(const a of [w*.68,w*.76]){b(a,5,4,6,'#eadfbd');b(a+4,6,2,3,'#a18d67');}
      for(let a=5;a<w-9;a+=22){b(a,18,19,h-24,'#b0b7a1');b(a+2,20,15,h-29,'#d5d1b2');b(a+13,22,2,4,wood);}return true;
    }
    if(o.type==='boxes'){
      for(let row=0;row<2;row++)for(let col=0;col<2;col++){const a=3+col*(w/2-2),d=2+row*(h/2-2),cw=w/2-5,ch=h/2-4;b(a,d,cw,ch,wood);b(a+1,d+1,cw-2,ch-7,'#b99a6c');b(a+1,d+1,cw-2,5,'#d6b98a');b(a+cw/2,d+1,3,ch-2,'#e1cda4');b(a+3,d+9,9,6,light);for(let j=0;j<3;j++)b(a+4+j*2,d+10,1,4,wood);}return true;
    }
    if(o.type==='produce'){
      b(2,0,w-4,h-3,wood);for(let yy=2;yy<h-6;yy+=19){b(4,yy,w-8,15,'#4b6150');for(let xx=8;xx<w-7;xx+=9){oval(xx,yy+5,3,3,yy%3?'#cfaa50':'#9e5543');oval(xx+3,yy+10,3,3,'#8ca45e');}b(3,yy+15,w-6,3,'#c19a69');}return true;
    }
    if(o.type==='stage'){
      b(1,1,w-2,h-2,dark);b(3,2,w-6,h-12,'#725a54');for(let yy=7;yy<h-12;yy+=8)b(4,yy,w-8,1,'#8b6c5b');b(2,h-10,w-4,8,'#4a4145');b(w/2-23,h-7,46,4,'#a88a6d');b(w/2-29,h-3,58,3,'#b59a79');
      // Mic stand and recognisable drum kit rather than one rectangle on a slab.
      b(18,-10,2,34,'#bac2b8');b(15,-12,10,4,dark);b(10,23,18,2,dark);oval(w*.64,17,14,12,dark);oval(w*.64,17,11,9,'#bea77b');oval(w*.64,17,4,4,'#5a5149');for(const a of [w*.52,w*.76]){b(a,-4,1,28,'#b2b9b1');oval(a,-4,11,2,'#d7bb69');}return true;
    }
    if(o.type==='speaker'||o.type==='amp'){
      b(2,-7,w-4,h+4,dark);b(4,-5,w-8,h-1,'#6e716a');b(5,3,w-10,h-11,'#293c46');for(let yy=5;yy<h-8;yy+=3)b(6,yy,w-12,1,'#49606a');
      if(o.type==='speaker'){oval(w/2,h*.55,Math.min(w*.29,12),Math.min(h*.25,12),'#162e38');oval(w/2,h*.55,5,5,'#677e82');oval(w/2,7,4,4,'#142a35');}else{b(w/2-6,-10,12,3,wood);for(let j=8;j<w-7;j+=7)b(j,-2,2,2,'#e9d09b');}return true;
    }
    if(o.type==='mixer'){
      b(1,-3,w-2,h,dark);b(3,-1,w-6,h-9,'#6a7e80');b(3,h-10,w-6,7,'#344d59');for(let j=7;j<w-6;j+=8){for(let k=3;k<13;k+=5)oval(j,k,2,2,'#d7bb78');b(j,17,1,h-31,dark);b(j-2,19+j%11,5,3,'#e5ddbd');b(j-1,h-16,3,3,'#c97957');}return true;
    }
    return true;
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={draw};else root.CityProps={draw};
})(typeof globalThis!=='undefined'?globalThis:this);
