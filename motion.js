/* Time-based tile movement; the rules stay discrete while the sprite moves continuously. */
(function(root){
  'use strict';
  const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  class Motion{
    constructor(engine,getState,onStep=()=>{}){this.engine=engine;this.getState=getState;this.onStep=onStep;this.duration=720;this.sync();}
    sync(){const s=this.getState();this.x=s.x;this.y=s.y;this.active=null;this.held=null;this.pending=null;this.route=[];this.target=null;this.walkTime=0;}
    hold(dir){if(!DIRS[dir]||this.held===dir)return;const newPress=this.held===null;this.route=[];this.target=null;this.held=dir;if(newPress)this.pending=dir;}
    release(cancel=false){this.held=null;if(cancel)this.pending=null;}
    tap(dir){if(!DIRS[dir])return;this.route=[];this.target=null;this.pending=dir;}
    stop(){this.release(true);this.route=[];this.target=null;}
    go(route,target=null){this.stop();this.route=route.slice();this.target=target;}
    get moving(){return !!this.active;}
    update(dt){
      const s=this.getState();if(s.mode!=='explore'){this.stop();return null;}
      dt=Math.max(0,Math.min(100,dt));let carry=0;
      if(this.active){
        const a=this.active;a.elapsed+=dt;this.walkTime+=dt;
        const p=Math.min(1,a.elapsed/a.duration);this.x=a.x+(s.x-a.x)*p;this.y=a.y+(s.y-a.y)*p;
        if(p<1)return null;carry=a.elapsed-a.duration;this.active=null;this.x=s.x;this.y=s.y;
        const door=this.engine.doors?.(s).find(d=>d.x===s.x&&d.y===s.y&&d.facing===s.facing);
        if(door){this.stop();return {doorCross:door};}
      }
      let dir=this.pending||this.held;this.pending=null;
      if(!dir&&this.route.length){const next=this.route.shift(),dx=next[0]-s.x,dy=next[1]-s.y;dir=dx<0?'left':dx>0?'right':dy<0?'up':'down';}
      if(!dir){const target=this.target;this.target=null;return target;}
      const x=s.x,y=s.y;
      if(this.engine.move(s,...DIRS[dir])){this.active={x,y,elapsed:carry,duration:this.duration};const p=carry/this.duration;this.x=x+(s.x-x)*p;this.y=y+(s.y-y)*p;this.onStep();}
      else{this.route=[];this.target=null;}
      return null;
    }
    get frame(){return this.active?[0,1,0,2][Math.min(3,Math.floor(this.active.elapsed/this.active.duration*4))]:0;}
  }
  // Keep the ankle join fixed. A lifted foot shortens its lower slice by one pixel,
  // instead of translating a whole leg away from the hip. Shared by NPCs and player.
  function walkPose(width,height,frame){const split=Math.floor(height*.82),half=Math.floor(width/2),foot=height-split;
    if(!frame)return [{source:[0,0,width,height],target:[0,0,width,height]}];
    return [{source:[0,0,width,split],target:[0,0,width,split]},
      {source:[0,split,half,foot],target:[0,split,half,foot-(frame===1?1:0)]},
      {source:[half,split,width-half,foot],target:[half,split,width-half,foot-(frame===2?1:0)]}];}
  const api={Motion,DIRS,walkPose};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityMotion=api;
})(typeof globalThis!=='undefined'?globalThis:this);
