/* Valid, engine-traversed saves packaged only into the separate instrumentation APK. */
const fs=require('node:fs'),path=require('node:path'),E=require('../engine.js'),{walk,act,storyTo}=require('./walk-memory.js');
const out=path.join(__dirname,'../android/build/smoke/assets');fs.mkdirSync(out,{recursive:true});
const s=E.fresh();E.startMemories(s);storyTo(s,'scouts');for(const id of E.Memories.current(s).required)act(s,id);walk(s,'continue-memory');E.advanceMemory(s);for(const id of ['camp-water','camp-compass','camp-cord'])act(s,id);walk(s,'hyper-ego');
if(!E.restore(E.snapshot(s)))throw Error('Invalid camp fixture');fs.writeFileSync(path.join(out,'camp.json'),E.snapshot(s));
const cast=E.restore(E.snapshot(s));walk(cast,'deer-child-1');fs.writeFileSync(path.join(out,'cast.json'),E.snapshot(cast));
for(const id of E.Memories.current(s).required)act(s,id);walk(s,'continue-memory');E.advanceMemory(s);for(const id of E.Memories.current(s).required)act(s,id);walk(s,'continue-memory');E.advanceMemory(s);walk(s,'cordon-escape');
if(!E.restore(E.snapshot(s)))throw Error('Invalid cordon fixture');fs.writeFileSync(path.join(out,'cordon.json'),E.snapshot(s));
