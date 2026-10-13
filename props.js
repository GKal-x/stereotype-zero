/* Code-native pixel furniture. Footprints remain collision geometry; raised fronts
   and silhouettes describe the object rather than painting its bounding rectangle. */
(function(root){
  'use strict';
  function draw(c,o,T,room){
    const handled=['table','desk','bed','kitchen','counter','shelf','boxes','produce','stage','mixer','speaker','bench','sofa','amp','bookstall'];
    if(!handled.includes(o.type))return false;
    const x=o.x*T,y=o.y*T,w=o.w*T,h=o.h*T;
    const b=(a,d,e,f,col)=>{c.fillStyle=col;c.fillRect(Math.round(x+a),Math.round(y+d),Math.round(e),Math.round(f));};
    const oval=(a,d,rx,ry,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(Math.round(x+a),Math.round(y+d),rx,ry,0,0,Math.PI*2);c.fill();};
    const wood='#79533e',rim='#d1aa75',dark='#34434a',light='#eadcc0';
    const leg=(a,d)=>{b(a,d,4,9,dark);b(a+1,d,2,7,wood);};
    const book=(a,d,k)=>{b(a,d,4,13-k%3,['#a85f50','#d5b66f','#517782','#65795b'][k%4]);b(a+1,d+3,2,1,light);};
    // Restrained offset shadow, with transparent floor around legs and corners.
    b(4,h-4,w-6,7,'#535c5345');
    if(['table','desk','bench','counter'].includes(o.type)){
      const front=Math.min(9,h*.25),top=h-front-5;
      leg(5,h-9);leg(w-9,h-9);b(1,-3,w-2,top+5,dark);b(3,-2,w-6,top+2,wood);b(4,-2,w-8,top-1,'#b68c60');b(4,-2,w-8,2,rim);b(3,top,w-6,front,'#79583f');b(4,top,w-8,2,'#9c734f');
      if(o.type==='bench'){for(let j=4;j<top;j+=5)b(5,j,w-10,1,wood);return true;}
      if(o.type==='counter'){for(let j=5;j<w-8;j+=28){b(j,top+3,24,front-4,'#aa8860');b(j+10,top+3,5,1,dark);}b(w-43,-12,28,17,dark);b(w-40,-10,22,10,'#abc0ac');b(w-37,1,16,2,'#c9c5a6');b(w-50,8,36,9,'#c7c9b8');for(let j=0;j<4;j++)b(w-47+j*6,10,3,2,dark);return true;}
      if(o.type==='desk'){
        // A monitor with bezel, neck and foot; keyboard and mouse lie on the top.
        b(w*.37,-12,Math.min(35,w*.43),21,dark);b(w*.37+2,-10,Math.min(31,w*.43-4),16,'#638b9b');b(w*.37+4,-8,15,1,'#c5d9ca');b(w*.37+4,-4,22,1,'#b3c9b5');b(w*.54,9,3,5,dark);b(w*.45,13,17,2,dark);
        b(w*.32,17,w*.43,7,'#d2cbb4');for(let j=0;j<6;j++)b(w*.34+j*5,19,3,1,'#697977');oval(w*.83,20,3,4,'#d5d0be');b(7,3,12,16,light);b(9,6,8,1,'#76928d');b(9,10,7,1,'#76928d');return true;
      }
      if(room==='memory-scouts'){b(10,4,w-20,Math.max(12,top-8),'#c7d0a9');for(let j=0;j<4;j++){b(14+j*12,7,1,top-12,'#92a18c');b(14+j*10,8+j*5,12,2,'#aa6952');}return true;}
      oval(w*.28,top*.48,9,5,'#f0e4ca');oval(w*.28,top*.48,6,3,'#c18d67');oval(w*.72,top*.48,9,5,'#f0e4ca');oval(w*.72,top*.48,6,3,'#b47b53');b(w*.49,4,6,9,'#527e83');b(w*.49+6,6,3,4,light);b(w*.17-13,top*.4,1,8,'#d8d4c5');return true;
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
