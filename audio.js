/* Original four-voice chiptunes. Pulse leads, pulse arpeggios, stepped triangle
   bass and LFSR percussion; the live loops and 8-bit WAVs use the same renderer. */
(function(root){
 'use strict';
 const Opening=typeof module!=='undefined'&&module.exports?require('./opening.js'):root.CityOpening;
 const rest=null,loopSteps=256;
 const scenes={
  street:{title:'Patision after sundown',bpm:116,roots:[40,40,43,38,40,45,43,38],style:'rock',duty:.25,
   melody:[[7,rest,10,rest,12,10,7,rest,5,rest,3,5,7,rest,rest,rest],[7,10,12,rest,15,12,10,rest,7,5,3,rest,2,rest,0,rest]]},
  venue:{title:'Under the pavement',bpm:152,roots:[40,40,43,45,40,38,43,38],style:'garage',duty:.125,
   melody:[[0,rest,0,7,10,rest,7,rest,3,5,7,rest,10,7,3,rest],[12,rest,10,7,12,15,12,rest,10,7,5,3,2,rest,0,rest]]},
  battle:{title:'What the rota says',bpm:128,roots:[38,38,39,36,38,41,39,36],style:'rock',duty:.5,
   melody:[[0,rest,1,rest,7,rest,8,7,5,rest,3,rest,1,rest,0,rest],[12,rest,8,7,5,3,1,rest,0,rest,7,8,7,3,1,rest]]},
  home:{title:'Paint still drying',bpm:76,roots:[45,41,48,43,45,41,40,45],style:'warm',duty:.125,
   melody:[[7,rest,rest,rest,10,rest,12,rest,7,rest,rest,5,3,rest,rest,rest],[12,rest,rest,10,7,rest,5,rest,3,rest,2,rest,0,rest,rest,rest]]},
  childhood:{title:'Ball against the low wall',bpm:108,roots:[48,43,45,41,48,43,41,43],style:'play',duty:.25,
   melody:[[0,rest,4,7,rest,4,2,rest,0,rest,7,rest,9,7,4,rest],[7,rest,9,12,rest,9,7,rest,4,rest,2,0,2,rest,7,rest]]},
  books:{title:'Maps between the pages',bpm:72,roots:[45,43,41,40,45,48,43,45],style:'dream',duty:.125,
   melody:[[0,rest,rest,7,rest,rest,10,rest,12,rest,rest,10,7,rest,rest,rest],[12,rest,rest,14,15,rest,14,rest,12,rest,10,7,5,rest,rest,rest]]},
  scouts:{title:'Deers patrol',bpm:104,roots:[43,43,48,41,43,45,41,43],style:'folk',duty:.25,
   melody:[[0,rest,2,3,7,rest,5,3,2,rest,0,rest,7,5,3,2],[7,rest,10,7,5,3,2,rest,0,2,3,5,3,rest,2,0]]},
  camp:{title:'Canvas and evening light',bpm:112,roots:[43,48,41,43,43,45,41,43],style:'folk',duty:.125,
   melody:[[7,rest,10,12,10,7,5,rest,3,2,0,rest,2,3,5,rest],[12,rest,10,7,5,rest,3,2,0,rest,7,5,3,rest,2,0]]},
  resolve:{title:'Another pair of hands',bpm:100,roots:[43,48,43,41,43,45,41,43],style:'play',duty:.25,
   melody:[[0,rest,3,rest,5,7,5,rest,3,rest,2,rest,0,rest,7,rest],[7,rest,10,rest,12,10,7,rest,5,rest,3,2,0,rest,rest,rest]]},
  school:{title:'Before the bell at Ipitou',bpm:96,roots:[45,41,43,40,45,48,43,40],style:'school',duty:.25,
   melody:[[0,rest,3,rest,7,rest,rest,5,3,rest,2,rest,0,rest,rest,rest],[7,rest,10,12,10,rest,7,rest,5,rest,3,2,0,rest,rest,rest]]},
  shop:{title:'Change at the counter',bpm:120,roots:[45,41,48,43,45,43,41,40],style:'play',duty:.125,
   melody:[[0,rest,3,7,rest,10,7,rest,5,rest,3,rest,2,0,rest,rest],[7,rest,12,10,7,rest,5,3,2,rest,3,5,7,rest,0,rest]]},
  work:{title:'Fluorescent weight',bpm:58,roots:[38,38,39,38,36,36,39,38],style:'doom',duty:.5,
   melody:[[0,rest,rest,rest,1,rest,rest,rest,7,rest,rest,6,5,rest,rest,rest],[12,rest,rest,rest,8,rest,7,rest,6,rest,rest,3,1,rest,0,rest]]},
  station:{title:'Under the green line',bpm:92,roots:[40,43,38,36,40,45,43,38],style:'rail',duty:.25,
   melody:[[7,rest,rest,3,rest,rest,0,rest,2,rest,rest,5,rest,3,rest,rest],[12,rest,10,rest,7,rest,5,rest,3,rest,2,rest,0,rest,rest,rest]]},
  train:{title:'Rail joints northbound',bpm:124,roots:[40,43,38,36,40,45,43,38],style:'rail',duty:.125,
   melody:[[12,rest,rest,7,rest,rest,3,rest,5,rest,rest,10,rest,rest,7,rest],[15,rest,12,rest,10,7,rest,5,7,rest,5,3,2,rest,0,rest]]},
  victoria:{title:'Victoria, people passing',bpm:110,roots:[45,43,41,40,45,48,43,40],style:'rock',duty:.25,
   melody:[[7,rest,10,rest,12,rest,rest,10,7,rest,5,rest,3,rest,2,rest],[12,rest,15,12,10,rest,7,rest,5,rest,3,5,2,rest,0,rest]]},
  omen:{title:'The sky changes',bpm:52,roots:[33,33,38,34,33,29,34,33],style:'dungeon',duty:.125,
   melody:[[0,rest,rest,rest,7,rest,rest,rest,8,rest,rest,7,rest,rest,rest,rest],[12,rest,rest,rest,11,rest,8,rest,7,rest,rest,5,3,rest,1,rest]]},
  silence:{title:'No score over the testimony',bpm:60,roots:[33],style:'silence',melody:[[rest]]}
 };
 const roomScenes={home:'home','memory-shared-home':'home','memory-courtyard':'childhood','memory-scouts':'scouts',shop:'shop',employer:'work',venue:'venue',metro:'station',platform:'station','victoria-platform':'station',train:'train',victoria:'victoria',
  'memory-child-living':'childhood','memory-child-bedroom':'books','memory-child-kitchen':'home','memory-scout-store':'scouts','memory-adult-kitchen':'home','memory-adult-bedroom':'books',
  'memory-camp':'camp','memory-other-camp':'camp','memory-school':'school','memory-classroom':'books','memory-university':'school','memory-lab':'work','memory-december':'omen','memory-march':'omen','memory-station':'silence','memory-aftercare':'home'};
 function sceneFor(s){if(s.memory?.scene==='courtyard'&&Opening){const theme=Opening.music(s);if(theme&&Opening.current(s)?.id!=='explore-home')return theme;}if(s.mode==='memory-battle')return s.memory?.life?.active?.id==='hyper'?'resolve':'battle';if(s.mode==='battle'&&!s.battle?.result)return 'battle';if(s.mode==='ending')return s.ending?.where==='gig'?'venue':'home';return roomScenes[s.room]||(!s.room&&Math.hypot(s.x-27,s.y-43)<6?'venue':'street');}
 const stepSeconds=mode=>15/(scenes[mode]||scenes.street).bpm;
 function events(mode,index){const s=scenes[mode]||scenes.street,out=[];if(s.style==='silence')return out;const i=((index%loopSteps)+loopSteps)%loopSteps,bar=Math.floor(i/16),beat=i%16,rootNote=s.roots[bar%s.roots.length],step=stepSeconds(mode),heavy=['rock','garage','doom'].includes(s.style),sparse=['dream','dungeon'].includes(s.style);
  const add=(channel,note,volume,gate=1,extra={})=>{if(note!==null)out.push({channel,note,volume,duration:step*Math.min(8,gate),type:channel.startsWith('pulse')?'square':channel,...extra});};
  // Two four-bar phrases, with register changes and a final-bar turnaround.
  const motif=s.melody[Math.floor(bar/4)%s.melody.length],lead=bar>=8&&bar<12&&heavy&&beat%2?null:motif[beat%motif.length],lift=(bar===6&&['play','folk','garage'].includes(s.style)||bar>=8&&bar%4===2)?12:0;
  let sustain=1;if(sparse||s.style==='doom'){while(sustain<4&&beat+sustain<16&&motif[(beat+sustain)%motif.length]===null)sustain++;}
  add('pulse1',lead===null?null:rootNote+24+lead+lift,s.style==='garage'?.32:heavy?.25:.18,sustain*.85,{duty:s.duty});
  const arp=heavy?[0,7,12,7,0,7,3,7]:s.style==='dungeon'?[0,7,12,19,12,7,8,7]:[0,7,12,15,12,7,10,7];
  if(s.style==='doom'){if(beat%4===0)add('pulse2',rootNote+12+arp[Math.floor(beat/4)],.24,3.85,{duty:.5});}
  else if(!sparse||beat%2===0)add('pulse2',rootNote+12+arp[Math.floor(beat/(sparse?2:1))%8],heavy?.17:sparse?.09:.10,heavy?.38:sparse?1.8:.72,{duty:heavy?.25:.125});
  const kick=heavy&&(beat===0||beat===8||s.style==='garage'&&beat===10);
  if(kick)add('triangle',48,.42,.9,{kind:'kick',bend:-27});
  else if(sparse){if(beat%8===0)add('triangle',rootNote,.24,7.8);}
  else if(s.style==='doom'){if(beat%4===0)add('triangle',rootNote,.34,3.85);}
  else add('triangle',rootNote+(beat===14&&bar===15?7:0),heavy?.31:.24,.92);
  if(!sparse&&s.style!=='warm'){
   const snare=heavy?(beat===4||beat===12):s.style==='rail'?beat===6||beat===14:beat===4||beat===12;
   const fill=bar===15&&beat>=13&&heavy;
   out.push({channel:'noise',noise:true,kind:snare||fill?'snare':'hat',duration:Math.min(step*.65,snare?.10:.035),volume:snare?.30:fill?.22:.08,period:snare?8:s.style==='rail'?2:1,seed:31+i*97});
  }else if(s.style==='doom'&&beat===12)out.push({channel:'noise',noise:true,kind:'snare',duration:step*.6,volume:.20,period:12,seed:31+i*97});
  return out;
 }
 function voice(event,rate=22050){const length=Math.max(1,Math.ceil(event.duration*rate)),pcm=new Float32Array(length),base=440*Math.pow(2,((event.note??40)-69)/12),increment=base/rate;let phase=0,lfsr=(event.seed||1)&32767||1,noise=0;
  for(let j=0;j<length;j++){const t=j/rate,p=j/length;let wave;
   if(event.noise){if(j%(event.period||1)===0){const bit=(lfsr^(lfsr>>1))&1;lfsr=(lfsr>>1)|(bit<<14);noise=(lfsr&1)?1:-1;}wave=noise;}
   else {phase+=event.bend?increment*Math.pow(2,event.bend*Math.min(1,t/.10)/12):increment;if(phase>=1)phase-=1;const duty=event.duty||.25;wave=event.channel==='triangle'||event.type==='triangle'?1-4*Math.abs(Math.floor(phase*32)/32-.5):phase<duty?1:-duty/(1-duty);}
   const attack=Math.min(1,t/.0015),release=Math.min(1,(length-j)/(rate*.004));
   const envelope=event.noise?Math.pow(1-p,event.kind==='snare'?1.5:3):event.kind==='kick'?Math.pow(1-p,2):1-p*.35;
   pcm[j]=Math.round(wave*attack*release*envelope*127)/127;
  }return pcm;
 }
 function render(mode,rate=22050){const step=stepSeconds(mode),pcm=new Float32Array(Math.ceil(loopSteps*step*rate));for(let i=0;i<loopSteps;i++)for(const event of events(mode,i)){const sound=voice(event,rate),start=Math.round(i*step*rate);for(let j=0;j<sound.length&&start+j<pcm.length;j++)pcm[start+j]+=sound[j]*event.volume*.55;}
  const bytes=new Uint8Array(pcm.length);for(let i=0;i<pcm.length;i++)bytes[i]=Math.round((Math.max(-1,Math.min(1,pcm[i]))+1)*127.5);return bytes;
 }
 class CityAudio{
  constructor(){this.context=null;this.enabled=false;this.mode='street';this.loop=null;this.cache=new Map();}
  buffer(mode){if(this.cache.has(mode))return this.cache.get(mode);const pcm=render(mode),buffer=this.context.createBuffer(1,pcm.length,22050),data=buffer.getChannelData(0);for(let i=0;i<pcm.length;i++)data[i]=(pcm[i]-128)/128;this.cache.set(mode,buffer);if(this.cache.size>4)this.cache.delete(this.cache.keys().next().value);return buffer;}
  startLoop(){if(!this.context)return;const now=this.context.currentTime,old=this.loop;if(old){old.gain.gain.cancelScheduledValues(now);old.gain.gain.setValueAtTime(old.gain.gain.value,now);old.gain.gain.linearRampToValueAtTime(0,now+.35);old.source.stop(now+.36);}
   const source=this.context.createBufferSource(),gain=this.context.createGain();source.buffer=this.buffer(this.mode);source.loop=true;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(1,now+.4);source.connect(gain);gain.connect(this.master);source.onended=()=>{source.disconnect();gain.disconnect();};source.start(now);this.loop={source,gain,mode:this.mode};}
  setScene(mode){if(!scenes[mode])mode='street';if(this.mode===mode)return;this.mode=mode;if(this.context&&this.enabled)this.startLoop();}
  async toggle(){if(!this.context){const AC=root.AudioContext||root.webkitAudioContext;if(!AC)return false;this.context=new AC();this.master=this.context.createGain();this.master.gain.value=0;this.master.connect(this.context.destination);this.startLoop();}if(this.enabled){this.enabled=false;this.master.gain.setTargetAtTime(0,this.context.currentTime,.04);return false;}await this.context.resume();if(this.loop?.mode!==this.mode)this.startLoop();this.enabled=true;this.master.gain.setTargetAtTime(.45,this.context.currentTime,.08);return true;}
  effect(kind='choice'){if(!this.enabled||kind==='step'||this.mode==='silence')return;const pcm=voice({channel:'pulse1',note:kind==='win'?76:kind==='blocked'?38:69,duration:.065,duty:.125},this.context.sampleRate),buffer=this.context.createBuffer(1,pcm.length,this.context.sampleRate);buffer.getChannelData(0).set(pcm);const source=this.context.createBufferSource(),gain=this.context.createGain();source.buffer=buffer;gain.gain.value=.04;source.connect(gain);gain.connect(this.context.destination);source.onended=()=>{source.disconnect();gain.disconnect();};source.start();}
  phrase(){this.effect('win');}
 }
 const api={scenes,events,sceneFor,roomScenes,stepSeconds,loopSteps,voice,render};if(typeof module!=='undefined'&&module.exports)module.exports=api;else{root.CityAudio=CityAudio;root.CityScore=api;}
})(typeof globalThis!=='undefined'?globalThis:this);
