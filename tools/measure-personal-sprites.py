"""Measure alpha bounds in edited sheets; consume only the narrator's poses."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
ns={'__file__':str(ROOT/'tools/measure-atlas.py')}
exec((ROOT/'tools/measure-atlas.py').read_text(encoding='utf-8').split('cast=sorted(')[0],ns)
groups=[('personal-child-v1.png',16,[(0,'memory-child')]),('personal-scout-v1.png',12,[(0,'memory-scout')]),('personal-youth-v1.png',8,[(0,'memory-teen'),(1,'memory-student')]),('personal-adult-v1.png',8,[(0,'memory-adult')])]
atlas={}
for file,count,rows in groups:
 parts=sorted(ns['components'](file),key=lambda b:b[4],reverse=True)[:count]
 assert len(parts)==count,(file,len(parts))
 parts.sort(key=lambda b:(b[1]+b[3])/2)
 for row,id in rows:
  poses=sorted(parts[row*4:row*4+4],key=lambda b:b[0])
  atlas[id]={'file':file,'frames':[[l,t,r-l,b-t] for l,t,r,b,n in poses]}
(ROOT/'assets/personal-atlas.js').write_text('window.PersonalAtlas='+json.dumps(atlas,separators=(',',':'))+';\n',encoding='utf-8')
print('Measured five narrator age variants; other actors keep their original sheets.')
