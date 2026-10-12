/* Time-based tile movement; the rules stay discrete while the sprite moves continuously. */
(function(root){
  'use strict';
  const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
  class Motion{
    constructor(engine,getState,onStep=()=>{}){this.engine=engine;this.getState=getState;this.onStep=onStep;this.duration=155;this.sync();}
    sync(){const s=this.getState();this.x=s.x;this.y=s.y;this.active=null;this.held=null;this.pending=null;this.route=[];this.target=null;this.walkTime=0;}
    hold(dir){if(!DIRS[dir])return;this.route=[];this.target=null;this.held=dir;if(!this.active)this.pending=dir;}
    release(){this.held=null;}
    tap(dir){if(!DIRS[dir])return;this.route=[];this.target=null;this.pending=dir;}
    stop(){this.held=null;this.pending=null;this.route=[];this.target=null;}
    go(route,target=null){this.stop();this.route=route.slice();this.target=target;}
    get moving(){return !!this.active;}
    update(dt){
      const s=this.getState();if(s.mode!=='explore'){this.stop();return null;}
      dt=Math.max(0,Math.min(100,dt));let carry=0;
      if(this.active){
        const a=this.active;a.elapsed+=dt;this.walkTime+=dt;
        const p=Math.min(1,a.elapsed/this.duration);this.x=a.x+(s.x-a.x)*p;this.y=a.y+(s.y-a.y)*p;
        if(p<1)return null;carry=a.elapsed-this.duration;this.active=null;this.x=s.x;this.y=s.y;
      }
      let dir=this.held||this.pending;this.pending=null;
      if(!dir&&this.route.length){const next=this.route.shift(),dx=next[0]-s.x,dy=next[1]-s.y;dir=dx<0?'left':dx>0?'right':dy<0?'up':'down';}
      if(!dir){const target=this.target;this.target=null;return target;}
      const x=s.x,y=s.y;
      if(this.engine.move(s,...DIRS[dir])){this.active={x,y,elapsed:carry};const p=carry/this.duration;this.x=x+(s.x-x)*p;this.y=y+(s.y-y)*p;this.onStep();}
      else{this.route=[];this.target=null;}
      return null;
    }
    get frame(){return this.active?[0,1,0,2][Math.floor(this.walkTime/95)%4]:0;}
  }
  const api={Motion,DIRS};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityMotion=api;
})(typeof globalThis!=='undefined'?globalThis:this);
