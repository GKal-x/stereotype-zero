/* Original chapter score: one shared motif, arranged for four dramatic spaces.
   Notes/events also feed build.js so downloadable WAVs match the game. */
(function(root){
  'use strict';
  const scenes={street:{bpm:84,bass:[38,34,41,36],lead:[62,null,null,69,null,null,65,null,64,null,null,null,62,null,null,null,60,null,null,65,null,null,64,null,62,null,null,null,null,null,null,null]},battle:{bpm:96,bass:[38,38,39,36],lead:[62,null,63,null,null,null,69,null,65,null,null,null,64,null,63,null]},venue:{bpm:108,bass:[38,34,41,36],lead:[62,null,65,69,null,67,65,null,64,null,62,null,null,60,62,null]},home:{bpm:72,bass:[38,34,41,36],lead:[62,null,null,null,65,null,null,null,64,null,null,null,62,null,null,null]}};
  function events(mode,i){const s=scenes[mode]||scenes.street,beat=30/s.bpm,bar=Math.floor(i/8)%16,chord=Math.floor(bar/4),out=[];
    const add=(note,duration,type,volume)=>{if(note!==null)out.push({note,duration,type,volume});};
    // Street melody leaves every other two-bar phrase empty: space for the city.
    const phrase=Math.floor(i/32)%4,lead=s.lead[i%s.lead.length];
    if(mode!=='street'||phrase%2===0)add(lead,beat*1.6,'triangle',.26);
    if(i%8===0||i%8===3||i%8===6)add(s.bass[chord],beat*(i%8===6?1.5:2.6),'triangle',.36);
    if(i%8===0&&bar%2===0){add(s.bass[chord]+19,beat*5,'triangle',.08);add(s.bass[chord]+24,beat*5,'triangle',.055);}
    if(mode==='battle'&&i%4===2)add(50,beat*.55,'square',.10);
    if(mode==='venue'&&i%2===1){add(s.bass[chord]+24,beat*.5,'square',.11);add(s.bass[chord]+31,beat*.5,'square',.06);}
    if((mode==='venue'&&i%4===2)||(mode==='battle'&&i%8===6))out.push({noise:true,duration:.065,volume:.12});
    return out;
  }
  class CityAudio{
    constructor(){this.context=null;this.enabled=false;this.timer=null;this.step=0;this.next=0;this.mode='street';}
    setScene(mode){if(!scenes[mode])mode='street';if(this.mode===mode)return;this.mode=mode;this.step=0;if(this.context)this.next=this.context.currentTime+.05;}
    async toggle(){if(!this.context){const AC=root.AudioContext||root.webkitAudioContext;if(!AC)return false;this.context=new AC();this.master=this.context.createGain();this.master.gain.value=0;this.master.connect(this.context.destination);const buffer=this.context.createBuffer(1,this.context.sampleRate*.08,this.context.sampleRate);const data=buffer.getChannelData(0);let seed=117;for(let i=0;i<data.length;i++){seed=(seed*16807)%2147483647;data[i]=(seed/2147483647*2-1)*(1-i/data.length);}this.noise=buffer;}
      if(this.enabled){this.enabled=false;clearInterval(this.timer);this.master.gain.setTargetAtTime(0,this.context.currentTime,.08);return false;}await this.context.resume();this.enabled=true;this.master.gain.setTargetAtTime(.14,this.context.currentTime,.12);this.next=this.context.currentTime+.04;this.timer=setInterval(()=>this.schedule(),30);this.schedule();return true;}
    tone(note,t,d=.16,type='triangle',volume=.3){if(!this.context||note===null)return;const o=this.context.createOscillator(),g=this.context.createGain(),filter=this.context.createBiquadFilter();o.type=type;o.frequency.value=440*Math.pow(2,(note-69)/12);filter.type='lowpass';filter.frequency.value=type==='square'?1250:2400;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(volume,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(filter);filter.connect(g);g.connect(this.master);o.start(t);o.stop(t+d+.02);}
    drum(t,volume){const s=this.context.createBufferSource(),g=this.context.createGain(),filter=this.context.createBiquadFilter();s.buffer=this.noise;filter.type='highpass';filter.frequency.value=2500;g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.0001,t+.065);s.connect(filter);filter.connect(g);g.connect(this.master);s.start(t);s.stop(t+.08);}
    schedule(){if(!this.enabled)return;if(document.hidden){this.next=this.context.currentTime+.05;return;}if(this.next<this.context.currentTime-.25)this.next=this.context.currentTime+.04;while(this.next<this.context.currentTime+.12){for(const e of events(this.mode,this.step++)){if(e.noise)this.drum(this.next,e.volume);else this.tone(e.note,this.next,e.duration,e.type,e.volume);}this.next+=30/scenes[this.mode].bpm;}}
    effect(kind='step'){if(!this.enabled||kind==='step')return;this.tone(kind==='choice'?69:kind==='win'?74:kind==='blocked'?38:50,this.context.currentTime,.08,'triangle',.10);}
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={scenes,events};else{root.CityAudio=CityAudio;root.CityScore={scenes,events};}
})(typeof globalThis!=='undefined'?globalThis:this);
