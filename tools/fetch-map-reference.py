"""Download a small, attributed OSM reference extract for Athens map design.

This is an authoring tool; the Android game never makes network requests.
"""
from pathlib import Path
import json
import xml.etree.ElementTree as ET
import urllib.request

root = Path(__file__).resolve().parents[1]
url = 'https://api.openstreetmap.org/api/0.6/map?bbox=23.724,38.007,23.740,38.018'
request = urllib.request.Request(url, headers={'User-Agent': 'StereotypeZero-map-research/0.3'})
with urllib.request.urlopen(request, timeout=30) as response:
    xml = ET.fromstring(response.read())
nodes = {node.attrib['id']: {'lat':float(node.attrib['lat']), 'lon':float(node.attrib['lon'])} for node in xml.findall('node')}
elements=[]
for feature in xml:
    tags={tag.attrib['k']:tag.attrib['v'] for tag in feature.findall('tag')}
    if not tags or not any(k in tags for k in ['highway','railway','leisure','place']):
        continue
    if feature.tag == 'relation':
        continue
    item={'type':feature.tag,'id':int(feature.attrib['id']),'tags':tags}
    if feature.tag=='node':
        item.update(nodes[feature.attrib['id']])
    else:
        item['geometry']=[nodes[nd.attrib['ref']] for nd in feature.findall('nd') if nd.attrib['ref'] in nodes]
    elements.append(item)
data={'source':url,'attribution':'© OpenStreetMap contributors; ODbL 1.0','elements':elements}
out = root / 'research/maps/osm-reference.json'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(data, ensure_ascii=False), encoding='utf-8')
print('Saved', len(data['elements']), 'OSM features to', out)
for element in data['elements']:
    tags = element.get('tags', {})
    name = tags.get('name', '')
    if tags.get('railway') == 'station' or tags.get('place') or any(n in name for n in ['Αχαρν','Πατησί','Γαλατσ','Κολιάτσ','Στρατηγού Καλλάρη','Σκά','Ιακωβά','Αγίου Μελετίου']):
        geom = element.get('geometry', [])
        print(name, element['type'], element['id'], element.get('center', {'lat':element.get('lat'),'lon':element.get('lon')}),
              [geom[0],geom[-1]] if geom else '')
