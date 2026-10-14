"""One-shot source integration for the individually drawn cast and tactical battles."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def edit(name,old,new):
 p=ROOT/name;s=p.read_text(encoding='utf-8');assert old in s,(name,old[:70]);p.write_text(s.replace(old,new),encoding='utf-8')
edit('engine.js','const api={roomObjects','const api={Combat,prepareDuel,duelContext,duelMove,roomObjects')
edit('engine.js',"Object.hasOwn(ACTIONS,b.lastAction)","(Object.hasOwn(ACTIONS,b.lastAction)||b.duel&&Combat.moves(b.duel).some(m=>m.id===b.lastAction))")
edit('engine.js',"if(p.mode==='ending'&&", "if(p.battle?.duel&&(!Combat.valid(p.battle.duel)||p.battle.duel.id!=='wages'||p.battle.pressure!==p.battle.duel.foe))return null;if(p.mode==='ending'&&")
edit('life-world.js',"const pages=", "const Combat=typeof module!=='undefined'&&module.exports?require('./combat.js'):root.CityCombat;\n const pages=")
edit('life-world.js',"['active','won'].includes(a.result)","['active','won','lost'].includes(a.result)&&(!a.duel||Combat.valid(a.duel)&&a.duel.id===a.id&&a.result===a.duel.result&&a.focus===a.duel.effort&&a.turns===a.duel.turn)")
# Give existing interaction roles their own identities. Family and the protagonist stay unchanged.
edit('life-world.js',"for(let i=0;i<4;i++)camp.places.push(point('deer-child-'+i,'Deer scout '+(i+1),[4,6,8,10][i],9,i%2?'scout-vaggelis':'memory-scout'));", "for(let i=0;i<4;i++)camp.places.push(point('deer-child-'+i,['Nikos','Anna','Marios','Sotiris'][i],[4,6,8,10][i],9,['scout-nikos','scout-anna','scout-marios','scout-sotiris'][i]));")
edit('life-world.js',"'Neighbour scout '+(i+1)","['Evi','Kostas','Lefteris','Irene','Alex','Danae','Stelios'][i]")
edit('life-world.js',"i%3===0?'scout-gerasimos':i%2?'scout-vaggelis':'memory-scout'", "['scout-evi','scout-kostas','scout-lefteris','scout-irene','scout-alex','scout-danae','scout-stelios'][i]")
for old,new in [("7,5,'mina','Classmate'","7,5,'school-iris','Iris · classmate'"),("9,5,'dimos','Classmate'","9,5,'school-yannis','Yannis · classmate'"),("9,5,'dimos','School friend'","9,5,'school-yannis','Yannis'"),("4,7,'dimos','Passer-by'","4,7,'town-sofia','Passer-by'"),("5,5,'mina','School friend'","5,5,'school-yannis','Yannis'"),("11,7),door('march-school'","11,7,'police-patrol','Police officer'),door('march-school'"),("7,5,'mina','DAP spokesperson · composite'","7,5,'campus-leon','Leon · adapted DAP spokesperson'"),("4,5,'dimos','Independent student'","4,5,'campus-nefeli','Nefeli · independent student'"),("who:'mina',scene:'school'","who:'school-iris',scene:'school'"),("who:'mina',scene:'university'","who:'campus-leon',scene:'university'")]:edit('life-world.js',old,new)
edit('life-world.js',"{x:10,y:8,w:2,h:1,type:'police-line'}", "{x:10,y:8,w:1,h:1,type:'barricade'}")
edit('life-world.js',"scenes.splice(2,0,camp,school,december,uni);", """camp.goal='Gather water, compass and cord, then join Gerasimos for a friendly tag bout. Stay for the evening song.';
  encounters.hyper.name='Patrol practice · tag bout';
  encounters.cordon={name:'A route out',who:'police-riot',scene:'december',place:'cordon-escape',needs:[],rounds:encounters.assembly.rounds,plans:encounters.assembly.plans};
  extraRooms['memory-march'].places.push(point('cordon-escape','Look for a way through the cordon',9,8,'police-riot','Riot officer'));
  scenes.splice(2,0,camp,school,december,uni);""")
edit('life-world.js',"for(const e of Object.values(encounters)){items[e.place]", "for(const [id,e] of Object.entries(encounters)){items[e.place]")
edit('life-world.js',"encounter:e===encounters.hyper?'hyper':e===encounters.assembly?'assembly':'campus'", "encounter:id")
edit('life-world.js',"body:e.rounds[0][0],options:['Begin the encounter']", "body:Combat.definitions[id].intro,options:['Begin the encounter']")
edit('rooms.js',"who:'boss'},{...exit,name:'Validate", "who:'station-nikitas'},{...exit,name:'Validate")
edit('rooms.js',"who:'boss'},exit]);", "who:'station-nikitas'},exit]);")
edit('rooms.js',"x:4,y:5,who:'mina'},{id:'line-diagram'", "x:4,y:5,who:'town-niki'},{id:'line-diagram'")
edit('rooms.js',"x:4,y:6,who:'dimos'", "x:4,y:6,who:'town-panos'")
edit('rooms.js',"x:9,y:4,who:'eleni'", "x:9,y:4,who:'town-sofia'")
edit('rooms.js',"x:4,y:5,who:'mina'},{id:'ticket-machine'", "x:4,y:5,who:'town-lea'},{id:'ticket-machine'")
# Art: new atlases are sampled at the target pixel size. All characters share the same walk compositor.
edit('art.js',"const spriteCache=new Map();", "const ensemble=Object.fromEntries([...new Set(Object.values(window.EnsembleAtlas).map(a=>a.file))].map(file=>[file,new Image()]));\n const ensembleReady=Promise.all(Object.entries(ensemble).map(([file,img])=>load(img,'assets/'+file)));\n const spriteCache=new Map();")
edit('art.js',"const ready=Promise.all(","const baseReady=Promise.all(")
edit('art.js',"const ensembleReady=Promise.all", "const ensembleReady=Promise.all")
edit('art.js',"const spriteCache=new Map();", "const ready=Promise.all([baseReady,ensembleReady]);\n const spriteCache=new Map();")
edit('art.js',"const youthRow={'memory-teen':0", "const extra=window.EnsembleAtlas[who];\n    const youthRow={'memory-teen':0")
edit('art.js',"r=youthRow!==undefined?", "r=extra?extra.frames[directionRow[facing]??0]:youthRow!==undefined?")
# Face uses no facing variable.
edit('art.js',"r=extra?extra.frames[directionRow[facing]??0]:youthRow!==undefined?window.YouthAtlas[youthRow][0]", "r=extra?extra.frames[0]:youthRow!==undefined?window.YouthAtlas[youthRow][0]")
edit('art.js',"reduced(youthRow!==undefined?", "reduced(extra?ensemble[extra.file]:youthRow!==undefined?")
edit('art.js',"c.drawImage(youthRow!==undefined?", "c.drawImage(extra?ensemble[extra.file]:youthRow!==undefined?")
edit('art.js',"if((youthRow!==undefined||scoutRow", "if((extra||youthRow!==undefined||scoutRow")
edit('cinematics.js',"rect(c,x-8,119,17,28,'#273b4b');rect(c,x-7,109,15,12,'#ac9171');rect(c,x-9,106,19,5,'#233546');rect(c,x-6,147,5,13,'#233546');rect(c,x+3,147,5,13,'#233546');", "sprite(c,id==='december'?'police-patrol':'police-riot',x,160,'right',0,46);")
# Inline module order and PNG assets.
for name in ['index.html','build.js']:
 if name=='index.html':
  edit(name,'<script src="life-world.js" defer></script>','<script src="combat.js" defer></script>\n<script src="life-world.js" defer></script>')
  edit(name,'<script src="art.js" defer></script>','<script src="assets/ensemble-atlas.js" defer></script>\n<script src="art.js" defer></script>')
 else:
  edit(name,"'opening.js','life-world.js'","'opening.js','combat.js','life-world.js'")
  edit(name,"'props.js','cinematics.js','art.js'", "'props.js','cinematics.js','assets/ensemble-atlas.js','art.js'")
  edit(name,"'scouts-v2.png','youth-v1.png'", "'scouts-v2.png','youth-v1.png','camp-deers-v1.png','camp-neighbours-a-v1.png','camp-neighbours-b-v1.png','city-ensemble-v1.png','officials-ensemble-v1.png','town-ensemble-v1.png'")
# Dynamic ensemble load strings must be replaced by the single-file bundler too.
edit('art.js',"load(img,'assets/'+file)", "load(img,({'camp-deers-v1.png':'assets/camp-deers-v1.png','camp-neighbours-a-v1.png':'assets/camp-neighbours-a-v1.png','camp-neighbours-b-v1.png':'assets/camp-neighbours-b-v1.png','city-ensemble-v1.png':'assets/city-ensemble-v1.png','officials-ensemble-v1.png':'assets/officials-ensemble-v1.png','town-ensemble-v1.png':'assets/town-ensemble-v1.png'})[file])")
edit('tools/publish-github.py',"'world.js', 'opening.js'", "'combat.js', 'combat.test.js', 'world.js', 'opening.js'")
edit('tools/publish-github.py','Prevent Android compatibility clicks from doubling arrow movement','Add individual character identities and contextual turn-based combat')
print('Integrated the ensemble and tactical engine.')
