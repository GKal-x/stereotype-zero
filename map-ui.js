/* Offline neighborhood navigation and an authored north-up Athens district atlas. */
(function(){
  'use strict';
  const D=window.CityWorld,E=window.SZ,NS='http://www.w3.org/2000/svg';
  function svgEl(tag,attrs={},text){const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n;}
  function svgBase(viewBox,label){const s=svgEl('svg',{viewBox,role:'group','aria-label':label});s.classList.add('atlas-map');return s;}
  function txt(s,text,x,y,attrs={}){s.append(svgEl('text',{x,y,fill:'#36515c','font-size':12,'font-family':'system-ui, sans-serif',...attrs},text));}
  function activate(node,fn){node.setAttribute('tabindex','0');node.setAttribute('role','button');node.addEventListener('click',fn);node.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();e.stopPropagation();fn();}});}
  function local(state,go){
    const s=svgBase('0 0 640 480','Kato Patisia neighborhood map. North is up. Choose a destination below to walk there.');
    s.append(svgEl('rect',{width:640,height:480,fill:'#e8dcc0'}));
    for(const r of D.STREETS)s.append(svgEl('rect',{x:r.x*10,y:r.y*10,width:r.w*10,height:r.h*10,fill:r.major?'#94a2a5':'#b3bcba'}));
    s.append(svgEl('rect',{x:D.RAIL.x*10,y:0,width:D.RAIL.w*10,height:480,fill:'#39855f'}));
    for(const r of D.RAIL.crossings)s.append(svgEl('rect',{x:D.RAIL.x*10,y:r.y*10,width:D.RAIL.w*10,height:r.h*10,fill:'#a8b4b5'}));
    for(const r of D.SQUARES)s.append(svgEl('rect',{x:r.x*10,y:r.y*10,width:r.w*10,height:r.h*10,fill:'#b7c99a',rx:5}));
    for(const b of E.BUILDINGS)s.append(svgEl('rect',{x:b.x*10,y:b.y*10,width:b.w*10,height:b.h*10,fill:b.type==='home'?'#c9a372':'#b99d84',stroke:'#f1e4ca','stroke-width':2,rx:2}));
    txt(s,'N ↑',590,25,{'font-size':17,'font-weight':'bold'});
    for(const [name,x,y,rotation]of [['ACHARNON',137,100,-90],['PATISION',505,170,-90],['IAKOVATON',230,137,0],['SKIATHOU',225,257,0],['SIFNOU',225,347,0],['KALLARI',3,217,0],['KOLIATSOU',401,390,0]])txt(s,name,x,y,{'font-size':9,'font-weight':'bold',transform:`rotate(${rotation} ${x} ${y})`});
    for(const [i,p]of E.PLACES.entries()){
      const g=svgEl('g',{'aria-label':'Walk to '+p.name});g.append(svgEl('circle',{cx:p.x*10+5,cy:p.y*10+5,r:12,fill:p.id==='metro'?'#2c855a':'#334f60',stroke:'#fff3d5','stroke-width':2}));txt(g,i+1,p.x*10+5,p.y*10+9,{'text-anchor':'middle','font-size':10,fill:'#fff3d5','font-weight':'bold'});activate(g,()=>go(p));s.append(g);
    }
    s.append(svgEl('circle',{cx:state.x*10+5,cy:state.y*10+5,r:7,fill:'#e97850',stroke:'#fff8df','stroke-width':3}));
    return s;
  }
  function city(select){
    const s=svgBase('0 0 600 725','Athens district overview, north up. Green Line station order and separate neighborhood branches. Schematic, not to scale.');
    s.append(svgEl('rect',{width:600,height:725,fill:'#e8dcc0'}));
    // Street corridor and rail follow different alignments. Dashed branches are
    // chapter connections, never a claim to depict a direct transit service.
    s.append(svgEl('path',{d:'M350 155 L365 240 L390 330 L397 405 L385 465 L300 535',fill:'none',stroke:'#cbad76','stroke-width':14}));
    txt(s,'PATISION',412,292,{'font-size':12,'font-weight':'bold',transform:'rotate(78 412 292)'});
    txt(s,'N ↑',540,30,{'font-size':19,'font-weight':'bold'});
    const points=D.LINE1.map(p=>p.slice(2).join(',')).join(' ');
    s.append(svgEl('polyline',{points,fill:'none',stroke:'#31835c','stroke-width':8,'stroke-linejoin':'round'}));
    for(const [id,name,x,y]of D.LINE1){
      const g=svgEl('g',{'aria-label':name+(id==='kato'?' · playable neighborhood':' · future chapter')});g.append(svgEl('circle',{cx:x,cy:y,r:id==='kato'?12:7,fill:id==='kato'?'#e8b05e':'#faf5df',stroke:'#31835c','stroke-width':3}));
      txt(g,name,x+19,y+5,{'font-size':13,'font-weight':id==='kato'?'bold':'normal'});
      activate(g,()=>select({name,via:'Line 1 · '+(id==='kato'?'your neighborhood':'north–south Athens route'),detail:id==='kato'?'You can explore Kato Patisia in this chapter.':'This station anchors a future district chapter. Travel is not open tonight.'}));s.append(g);
    }
    for(const d of D.DISTRICTS){
      if(d.id!=='zefyri'){
        const from=d.id==='exarcheia'?[263,531]:d.id==='filadelfeia'?[337,120]:d.id==='kypseli'?[390,365]:[397,405];
        s.append(svgEl('line',{x1:from[0],y1:from[1],x2:d.x,y2:d.y,stroke:'#9e8c72','stroke-width':2,'stroke-dasharray':'6 5'}));
      }
      const g=svgEl('g',{'aria-label':d.name+' · future chapter'});g.append(svgEl('circle',{cx:d.x,cy:d.y,r:10,fill:'#ac8b72',stroke:'#fff4da','stroke-width':2}));
      const left=['filadelfeia','zefyri'].includes(d.id);txt(g,d.name,d.x+(left?-12:0),d.y+(d.id==='zefyri'?25:-17),{'font-size':13,'font-weight':'bold','text-anchor':left?'start':'middle'});activate(g,()=>select(d));s.append(g);
    }
    txt(s,'ZEFYRI: SEPARATE JOURNEY',12,65,{'font-size':9});
    txt(s,'Solid green: Line 1 · dashed: district branches',30,713,{'font-size':11});
    return s;
  }
  function mount(host,state,go,initial='Neighborhood'){
    const tabs=document.createElement('div');tabs.className='map-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Map view');
    const content=document.createElement('div');content.className='map-content';const info=document.createElement('div');info.className='map-info';info.setAttribute('aria-live','polite');
    function mapView(visual){const wrap=document.createElement('div'),controls=document.createElement('div');wrap.className='map-viewport';controls.className='map-zoom';for(const [label,zoom]of [['Fit map',1],['Zoom +',1.7]]){const b=document.createElement('button');b.textContent=label;b.setAttribute('aria-pressed',String(zoom===1));b.addEventListener('click',()=>{wrap.classList.toggle('zoomed',zoom>1);for(const other of controls.children)other.setAttribute('aria-pressed',String(other===b));});controls.append(b);}wrap.append(visual);content.append(controls,wrap);}
    const describe=d=>{info.replaceChildren();const title=document.createElement('b'),body=document.createElement('p');title.textContent=d.name;body.textContent=d.via+' '+d.detail;info.append(title,body);};
    const views=[['Neighborhood',()=>{
      mapView(local(state,go));describe({name:'Kato Patisia · tonight',via:'North is up. Orange dot: Aris.',detail:'Choose a destination below to walk there. Zoom + lets you drag across the map. Streets are adapted from OpenStreetMap; distances and buildings are authored for the game.'});
      const list=document.createElement('div');list.className='map-destinations';for(const [i,p]of E.PLACES.entries()){const b=document.createElement('button');b.className='choice';b.textContent=(i+1)+'. '+p.name;b.addEventListener('click',()=>go(p));list.append(b);}content.append(list);
    }],['Athens',()=>{mapView(city(describe));describe({name:'Athens · the wider journey',via:'Petralona → Nea Ionia on Line 1.',detail:'Tap a station or district to read its connection. Kato Patisia is playable; other districts are future chapters. Overview is schematic.'});}],['Real streets',()=>{
      const image=document.createElement('img');image.src='assets/kato-patisia-reference.svg';image.alt='Actual north-up OpenStreetMap street geometry around Kato Patisia and Koliatsou square.';image.className='street-reference';mapView(image);describe({name:'Kato Patisia · street reference',via:'© OpenStreetMap contributors · ODbL 1.0.',detail:'Real street geometry, recorded 12 October 2026. The playable map compresses it and uses fictional addresses.'});
    }]];
    for(const [name,draw]of views){const b=document.createElement('button');b.textContent=name;b.setAttribute('role','tab');b.addEventListener('click',()=>{for(const t of tabs.children)t.setAttribute('aria-selected',String(t===b));content.replaceChildren();draw();});tabs.append(b);}
    host.append(tabs,info,content);[...tabs.children].find(b=>b.textContent===initial)?.click();
  }
  window.CityMap={mount};
})();
