"""Prepare original Econic artwork and detail crops for the local case study."""
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageDraw, ImageChops
import json
BASE=Path(__file__).resolve().parent
OUT=BASE.parent.parent/'public/work/econic/redesign'
OUT.mkdir(parents=True,exist_ok=True)
manifest={}
def save(name,im):
 im.save(OUT/f'{name}.webp',quality=91,method=6)
 manifest[name]={'width':im.width,'height':im.height}
 return im
def source(n):
 return Image.open(next((BASE/'references').glob(f'{n:02}-*.png'))).convert('RGBA')
def crop(name,n,box):
 im=source(n).crop(box)
 if name=='announcement-sheet':
  mask=Image.new('L',im.size,0)
  draw=ImageDraw.Draw(mask)
  draw.rounded_rectangle((0,0,im.width-1,im.height-1),radius=160,fill=255)
  draw.rectangle((0,160,im.width,im.height),fill=255)
  im.putalpha(mask)
 return save(name,im)
for p in (BASE/'highlights').glob('*.png'):
 save(p.stem,Image.open(p))
for name,n,box in [
 ('announcement-sheet',14,(111,76,862,1206)),
 ('announcement-listing',12,(0,0,750,1570)),
 ('preview-off',15,(0,0,750,1650)),
 ('preview-on',16,(0,0,750,1650)),
 ('cart-preview',19,(0,0,720,1558)),
 ('cart-desktop',20,(190,190,2235,1795)),
 ('amodira-cart',22,(0,0,720,1670)),
 ('sale-cart-item',22,(0,0,720,655)),
 ('fair-pricing',17,(0,0,750,1188)),
 ('fair-pricing-composition',33,(0,0,1806,1372)),
 ('brand-banner',10,(2655,323,3403,775)),
 ('brand-logo',17,(105,76,650,243)),
 ('brand-type-refined',29,(0,0,1138,770)),
 ('countdown-promise',30,(0,0,510,264)),
 ('brand-crowd',27,(4,4,523,783)),
 ('recap-community',26,(570,18,1090,797)),
 ('recap-cities',27,(561,3,1080,781)),
 ('recap-final',28,(5,5,630,630)),
 ('wire-announcement',6,(1514,120,2300,2000)),
 ('wire-presale',5,(1328,465,2130,2100)),
 ('wire-presale-off',31,(0,0,750,3062)),
 ('wire-presale-on',32,(0,0,750,2316)),
 ('wire-sale',7,(2020,155,2745,2090)),
]: crop(name,n,box)
# Product images for the interactive ’25 explainer.
for name,n,box in [
 ('demo-niki',33,(156,356,588,1090)),
 ('demo-astrid',12,(35,980,344,1350)),
]:
 im=source(n).crop(box)
 im.thumbnail((300,450),Image.Resampling.LANCZOS)
 save(name,im)
im=Image.open(BASE.parent.parent/'public/work/amodira/fragrances/raya.webp').crop((115,135,550,590))
im.thumbnail((300,450),Image.Resampling.LANCZOS)
save('demo-raya',im)
im=Image.open(OUT/'preview-toggle-off.webp').convert('RGBA').crop((18,12,143,96))
pixels=im.load()
for y in range(im.height):
 for x in range(im.width):
  r,g,b,a=pixels[x,y]
  if max(r,g,b)<48: pixels[x,y]=(r,g,b,0)
save('demo-logo',im)
# One editorial cover, composed entirely from the supplied screen designs.
canvas=Image.new('RGBA',(1800,1080),'#e5eddf')
def place(name,size,xy,angle):
 im=Image.open(OUT/f'{name}.webp').convert('RGBA')
 im.thumbnail(size,Image.Resampling.LANCZOS)
 mask=Image.new('L',im.size,0)
 ImageDraw.Draw(mask).rounded_rectangle((0,0,im.width-1,im.height-1),radius=20,fill=255)
 im.putalpha(ImageChops.multiply(im.getchannel('A'),mask))
 pad=70
 layer=Image.new('RGBA',(im.width+pad*2,im.height+pad*2))
 shadow=Image.new('RGBA',layer.size)
 shadow.paste((26,60,32,44),(pad,pad+18,pad+im.width,pad+im.height+18))
 shadow=shadow.filter(ImageFilter.GaussianBlur(22))
 layer.alpha_composite(shadow)
 layer.alpha_composite(im,(pad,pad))
 layer=layer.rotate(angle,Image.Resampling.BICUBIC,expand=True)
 canvas.alpha_composite(layer,xy)
place('announcement-sheet',(420,750),(72,110),6)
place('preview-on',(420,930),(610,12),0)
place('amodira-cart',(420,940),(1110,132),-6)
save('cover',canvas.convert('RGB'))
# Crop the relevant trophy only, keeping the award name in the photograph.
award=Image.open(BASE.parent.parent/'public/work/econic/award-retailex.png')
save('award',award.crop((217,240,835,1045)))
(OUT/'dimensions.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Prepared {len(manifest)} web images; total {sum(p.stat().st_size for p in OUT.glob("*.webp"))//1024} KB')
