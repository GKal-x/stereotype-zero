"""Measure alpha bounds in generated atlases; never modifies the source images."""
from collections import deque
import json
import sys
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
def components(name):
    image=Image.open(ROOT/'assets'/name).convert('RGBA');width,height=image.size
    mask=bytearray(1 if value>190 else 0 for value in image.getchannel('A').tobytes());found=[]
    for first in range(len(mask)):
        if not mask[first]:continue
        mask[first]=0;queue=deque([first]);left=right=first%width;top=bottom=first//width;count=0
        while queue:
            index=queue.popleft();x,y=index%width,index//width
            left,right,top,bottom=min(left,x),max(right,x),min(top,y),max(bottom,y);count+=1
            for adjacent in (index-width,index+width,index-1 if x else -1,index+1 if x<width-1 else -1):
                if 0<=adjacent<len(mask) and mask[adjacent]:mask[adjacent]=0;queue.append(adjacent)
        if count>2500:found.append((left,top,right+1,bottom+1,count))
    return found
cast=sorted(components(sys.argv[1] if len(sys.argv)>1 else 'cast-source.png'),key=lambda b:b[4],reverse=True)[:24];cast.sort(key=lambda b:(b[1]+b[3])/2)
cast=[sorted(cast[row*6:(row+1)*6],key=lambda b:(b[0]+b[2])/2) for row in range(4)]
buildings=sorted(components('buildings-source.png'),key=lambda b:b[4],reverse=True)[:8];buildings.sort(key=lambda b:(b[1]+b[3])/2)
buildings=[sorted(buildings[row*4:(row+1)*4],key=lambda b:(b[0]+b[2])/2) for row in range(2)]
def rect(b):
    x,y,right,bottom,_=b;return [x,y,right-x,bottom-y]
data={'cast':[[rect(b) for b in row] for row in cast],'buildings':[rect(b) for row in buildings for b in row]}
if any(len(row)!=6 for row in data['cast']) or len(data['buildings'])!=8:raise RuntimeError('Atlas does not contain the expected frames.')
(ROOT/'assets'/(sys.argv[2] if len(sys.argv)>2 else 'atlas.js')).write_text('window.CityAtlas='+json.dumps(data,separators=(',',':'))+';\n',encoding='utf-8')
print(json.dumps(data,indent=2))
