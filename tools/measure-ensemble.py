"""Measure immutable source PNGs. No image pixels are rewritten."""
from pathlib import Path
import json
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
groups=[('camp-deers-v1.png',['scout-nikos','scout-anna','scout-marios','scout-sotiris']),('camp-neighbours-a-v1.png',['scout-evi','scout-kostas','scout-lefteris','scout-irene']),('camp-neighbours-b-v1.png',['scout-alex','scout-danae','scout-stelios','scout-theo']),('city-ensemble-v1.png',['school-iris','school-yannis','campus-leon','campus-nefeli','town-panos','station-nikitas']),('officials-ensemble-v1.png',['police-patrol','police-riot','town-sofia','boss']),('town-ensemble-v1.png',['town-niki','town-lea','town-manos'])]
atlas={}
ns={'__file__':str(ROOT/'tools/measure-atlas.py')}
exec((ROOT/'tools/measure-atlas.py').read_text(encoding='utf-8').split('cast=sorted(')[0],ns)
for file,ids in groups:
    im=Image.open(ROOT/'assets'/file);w,h=im.size
    alpha=im.getchannel('A').point(lambda a:255 if a>190 else 0)
    # Generated figures are spaced evenly around their baselines, not the sheet edges.
    xs=[0,510,770,1020,w] if file=='camp-neighbours-b-v1.png' else [0,450,770,1080,w]
    ys=[0]+[min(range(round(i*h/len(ids))-30,round(i*h/len(ids))+31),key=lambda y:sum(alpha.crop((0,y,w,y+1)).getdata())) for i in range(1,len(ids))]+[h]
    for row,id in enumerate(ids):
        frames=[]
        for col in range(4):
            x,y=xs[col],ys[row]
            l,t,r,b=alpha.crop((x,y,xs[col+1],ys[row+1])).getbbox()
            frames.append([x+l,y+t,r-l,b-t])
        atlas[id]={'file':file,'frames':frames}
(ROOT/'assets/ensemble-atlas.js').write_text('window.EnsembleAtlas='+json.dumps(atlas,separators=(',',':'))+';\n',encoding='utf-8')
print('Measured',len(atlas),'individual characters, four directions each.')
