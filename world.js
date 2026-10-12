/* North-up, compressed Athens geography. Buildings/people are authored fiction. */
(function(root){
  'use strict';
  const WIDTH=64,HEIGHT=48,SPAWN={x:27,y:24};
  const STREETS=[
    {id:'acharnon',name:'ΑΧΑΡΝΩΝ',label:'Acharnon',x:12,y:0,w:3,h:48,major:true},
    {id:'patision',name:'ΠΑΤΗΣΙΩΝ',label:'Patision',x:48,y:0,w:4,h:48,major:true},
    {id:'galatsiou',name:'ΓΑΛΑΤΣΙΟΥ',label:'Galatsiou',x:48,y:5,w:16,h:3,major:true},
    {id:'iakovaton',name:'ΙΑΚΩΒΑΤΩΝ',label:'Iakovaton',x:14,y:12,w:35,h:2},
    {id:'kallari',name:'ΣΤΡ. ΚΑΛΛΑΡΗ',label:'Stratigou Kallari',x:0,y:20,w:14,h:3,major:true},
    {id:'karavia',name:'ΕΥΓ. ΚΑΡΑΒΙΑ',label:'Evgeniou Karavia',x:14,y:20,w:8,h:2},
    {id:'skiathou',name:'ΣΚΙΑΘΟΥ',label:'Skiathou',x:14,y:24,w:22,h:2},
    {id:'promitheos',name:'ΠΡΟΜΗΘΕΩΣ',label:'Promitheos',x:34,y:27,w:15,h:2},
    {id:'sifnou',name:'ΣΙΦΝΟΥ',label:'Sifnou',x:14,y:33,w:21,h:2},
    {id:'kallinikou',name:'ΚΑΛΛΙΝΙΚΟΥ',label:'Kallinikou',x:34,y:40,w:15,h:2},
    {id:'side-west',name:'',label:'Residential lanes',x:20,y:8,w:2,h:40},
    {id:'side-middle',name:'ΑΓ. ΠΑΡΑΣΚΕΥΗΣ',label:'Agias Paraskevis',x:34,y:8,w:2,h:40},
    {id:'side-east',name:'',label:'Residential lanes',x:44,y:9,w:2,h:22},
    {id:'south-lane',name:'',label:'Basement lane',x:14,y:43,w:35,h:2}
  ];
  const SQUARES=[
    {id:'station-square',name:'ΠΛ. ΣΠΑΝΟΥΔΗ',label:'Spanoudi square',x:6,y:20,w:6,h:6},
    {id:'paraskevi',name:'ΑΓ. ΠΑΡΑΣΚΕΥΗ',label:'Agia Paraskevi square',x:29,y:15,w:5,h:5},
    {id:'koliatsou',name:'ΠΛ. ΚΟΛΙΑΤΣΟΥ',label:'Koliatsou square',x:40,y:32,w:8,h:8}
  ];
  const BUILDINGS=[
    {x:23,y:15,w:6,h:7,type:'home'},
    {x:37,y:15,w:7,h:7,type:'work'},
    {x:23,y:27,w:8,h:6,type:'shop'},
    {x:37,y:29,w:3,h:4,type:'kiosk'},
    {x:23,y:37,w:8,h:6,type:'venue'},
    {x:6,y:15,w:5,h:5,type:'station'},
    {x:16,y:15,w:4,h:5,type:'flats'},
    {x:23,y:7,w:10,h:5,type:'flats'},
    {x:37,y:7,w:9,h:5,type:'home'},
    {x:16,y:27,w:4,h:6,type:'cafe'},
    {x:23,y:0,w:9,h:5,type:'home'},
    {x:37,y:0,w:9,h:5,type:'flats'},
    {x:54,y:10,w:8,h:8,type:'flats'},
    {x:54,y:21,w:8,h:6,type:'cafe'},
    {x:54,y:31,w:8,h:8,type:'home'},
    {x:16,y:37,w:4,h:6,type:'home'},
    {x:37,y:43,w:9,h:5,type:'flats'},
    {x:6,y:29,w:5,h:10,type:'flats'},
    {x:6,y:2,w:5,h:9,type:'home'},
    {x:16,y:0,w:4,h:10,type:'flats'},
    {x:37,y:24,w:7,h:3,type:'cafe'},
    {x:37,y:36,w:3,h:4,type:'home'},
    {x:54,y:0,w:8,h:4,type:'flats'},
    {x:54,y:43,w:8,h:5,type:'flats'}
  ];
  const PLACES=[
    {id:'home',x:27,y:22,name:'Home · Eleni',label:'HOME',icon:'H',area:'Skiathou · home block'},
    {id:'kiosk',x:38,y:33,name:'The kiosk',label:'KIOSK',icon:'K',area:'Near Koliatsou square'},
    {id:'employer',x:41,y:22,name:'Stockroom · unpaid shift',label:'SHIFT',icon:'!',area:'East of Agia Paraskevi'},
    {id:'mina',x:37,y:23,name:'Mina · your coworker',label:'MINA',icon:'M',area:'The stockroom corner'},
    {id:'shop',x:27,y:33,name:'Neighborhood market',label:'MARKET',icon:'€',area:'Sifnou · shopping street'},
    {id:'dimos',x:33,y:37,name:'Dimos · soundcheck',label:'DIMOS',icon:'D',area:'The basement lane'},
    {id:'bench',x:43,y:35,name:'Koliatsou square · shade',label:'SQUARE',icon:'·',area:'Koliatsou square'},
    {id:'metro',x:9,y:21,name:'Kato Patisia · Line 1',label:'LINE 1',icon:'1',area:'Acharnon · Spanoudi square'},
    {id:'venue',x:27,y:43,name:'The basement gig',label:'GIG',icon:'♪',area:'South of Sifnou'},
    {id:'bus',x:47,y:29,name:'Patision · bus stop',label:'BUS',icon:'B',area:'Patision corridor'},
    {id:'north',x:47,y:1,name:'North · Ano Patisia',label:'NORTH',icon:'↑',area:'Patision · northbound'},
    {id:'south',x:47,y:46,name:'South · Amerikis / Victoria',label:'SOUTH',icon:'↓',area:'Patision · toward the centre'}
  ];
  const TREES=[{x:7,y:24},{x:10,y:24},{x:30,y:17},{x:32,y:18},{x:41,y:34},{x:46,y:34},{x:41,y:38},{x:46,y:38},{x:55,y:3},{x:60,y:3},{x:17,y:35},{x:31,y:35}];
  const BARRIERS=[{x:3,y:0,w:2,h:18},{x:3,y:29,w:2,h:19}];
  // OSM marks the Line 1 station approach as a tunnel. Surface streets remain
  // traversable above it; exposed railway beyond the approach blocks walking.
  const RAIL={x:3,y:0,w:2,h:48,surface:[{y:0,h:18},{y:29,h:19}],crossings:[{y:18,h:11}]};
  const LINE1=[
    ['petralona','Petralona',170,678],['thissio','Thissio',202,630],['monastiraki','Monastiraki',244,586],
    ['omonia','Omonia',263,531],['victoria','Victoria',245,469],['attiki','Attiki',211,411],
    ['ag-nikolaos','Agios Nikolaos',245,353],['kato','Kato Patisia',265,295],
    ['ag-eleftherios','Agios Eleftherios',272,235],['ano','Ano Patisia',294,179],
    ['perissos','Perissos',337,120],['pefkakia','Pefkakia',357,70],['nea-ionia','Nea Ionia',365,25]
  ];
  const DISTRICTS=[
    {id:'exarcheia',name:'Exarcheia',x:420,y:506,via:'Walk east from Omonia / the museum corridor.',detail:'Side streets, bookshops, music and contested public space. Future chapter.'},
    {id:'kypseli',name:'Kypseli',x:464,y:365,via:'East of Patision, beyond Amerikis and the residential streets.',detail:'A separate neighborhood branch with its own squares and daily routines. Future chapter.'},
    {id:'filadelfeia',name:'Nea Filadelfeia',x:145,y:115,via:'A branch west of the northern Line 1 corridor, via Perissos / Pefkakia approaches.',detail:'Park, residential streets and match-day routes. Future chapter; no station named Nea Filadelfeia on Line 1.'},
    {id:'zefyri',name:'Zefyri',x:65,y:22,via:'A separate northwest journey by the suburban-rail / bus network.',detail:'A separate area, outside the Green Line. Future chapter; no direct Line 1 stop.'},
    {id:'amerikis',name:'Amerikis square',x:393,y:407,via:'Along Patision, south of Koliatsou and east of the railway.',detail:'A walking connection in the Patision corridor. Future chapter.'}
  ];
  const contains=(r,x,y)=>x>=r.x&&x<r.x+r.w&&y>=r.y&&y<r.y+r.h;
  function area(x,y){const square=SQUARES.find(r=>contains(r,x,y));if(square)return square.label;const street=STREETS.find(r=>contains(r,x,y));if(street)return street.label;return x<15?'Kato Patisia · station quarter':y>32?'Sifnou · residential lanes':'Kato Patisia · home quarter';}
  function migrate(p){
    if(p.version!==1)return p;
    // Old positions belonged to a different fictional block. Keep story/resources,
    // and resume at the corresponding destination on this authored map.
    const old=[[5,6,'home'],[12,6,'kiosk'],[25,6,'employer'],[20,9,'mina'],[25,14,'shop'],[14,15,'dimos'],[10,14,'bench'],[27,18,'metro'],[7,18,'venue']];
    const near=old.find(([x,y])=>Math.abs(x-p.x)+Math.abs(y-p.y)<=2);
    const next=near?PLACES.find(t=>t.id===near[2]):SPAWN;
    return {...p,version:2,x:next.x,y:next.y};
  }
  const api={WIDTH,HEIGHT,SPAWN,STREETS,SQUARES,BUILDINGS,PLACES,TREES,BARRIERS,RAIL,LINE1,DISTRICTS,contains,area,migrate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CityWorld=api;
})(typeof globalThis!=='undefined'?globalThis:this);
