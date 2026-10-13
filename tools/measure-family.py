"""Read sprite alpha geometry; preserve the generated raster unchanged."""
from pathlib import Path
from PIL import Image
import json
script = Path(__file__).with_name('measure-atlas.py')
ns = {'__file__': str(script)}
exec(script.read_text(encoding='utf-8').split('cast=sorted(')[0], ns)
rects = sorted(ns['components']('family-v1.png'), key=lambda b:b[4], reverse=True)[:12]
assert len(rects) == 12
rects.sort(key=lambda b:(b[1]+b[3])/2)
rows=[]
for i in range(3):
    row=sorted(rects[i*4:(i+1)*4],key=lambda b:b[0])
    rows.append([[x,y,right-x,bottom-y] for x,y,right,bottom,_ in row])
root=script.parents[1]
(root/'assets/family-atlas.js').write_text('window.FamilyAtlas='+json.dumps(rows,separators=(',',':'))+';\n',encoding='utf-8')
im=Image.open(root/'assets/family-v1.png')
print(json.dumps({'size':im.size,'alpha_range':im.getchannel('A').getextrema(),'frames':rows}))
