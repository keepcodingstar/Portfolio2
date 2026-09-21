"""Reproduce Econic portfolio detail crops without changing source artwork."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json

BASE=Path(__file__).resolve().parent
# Coordinates refer to the preserved, full-resolution reference images.
CROPS=[
 ('announcement-date',13,(14,1325,738,1498),'The cost-to-make promise and event dates'),
 ('preview-toggle-off',15,(0,235,750,347),'Current-price mode header'),
 ('preview-toggle-on',16,(0,235,750,347),'Upcoming-price preview header'),
 ('listing-price-off',15,(28,1552,734,1650),'Current prices in the product listing'),
 ('listing-price-on',16,(28,1552,734,1650),'Upcoming prices with today’s price as reference'),
 ('fair-pricing-breakdown',17,(0,452,750,991),'Cost to make, start date and excluded cost groups'),
 ('cart-preview-price',19,(213,320,710,633),'Upcoming price and today’s price on a cart item'),
 ('cart-end-preview',19,(78,900,650,1477),'Preview total, explanation, countdown and End preview'),
 ('desktop-preview-summary',20,(1540,424,2160,1094),'The preview summary on desktop'),
 ('sale-checkout',21,(0,4368,720,4634),'Savings strip and available checkout during the fair'),
 ('amodira-cart-widget',22,(0,655,720,1495),'Amodira discovery and Add actions within the bag'),
 ('amodira-variants',23,(20,247,702,1146),'Three product formats with prices and Add to bag actions'),
 ('non-returnable-choice',24,(40,50,805,229),'Unchecked and checked states explain the non-returnable choice'),
 ('campaign-counters',25,(20,17,832,235),'Campaign counters as interface details, not verified metrics'),
 ('recap-thank-you',26,(610,23,1045,291),'A campaign-wide thank-you after the event'),
 ('recap-new-returning',28,(34,195,605,343),'New and returning customer figures displayed in the recap'),
]
manifest=[]
for name,number,box,caption in CROPS:
 source=next((BASE/'references').glob(f'{number:02}-*.png'))
 im=Image.open(source)
 assert 0<=box[0]<box[2]<=im.width and 0<=box[1]<box[3]<=im.height,(name,im.size)
 crop=im.crop(box)
 target=BASE/'highlights'/f'{name}.png'
 crop.save(target)
 manifest.append(dict(name=name,source=str(source.relative_to(BASE)),image=number,box=box,file=str(target.relative_to(BASE)),caption=caption,width=crop.width,height=crop.height))
(BASE/'highlight-manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
# A contact sheet for crop QA only. Each crop remains separately available.
w,h=1800,0
cw,ch=450,430
sheet=Image.new('RGB',(w,ch*4),'#e8e8e8')
d=ImageDraw.Draw(sheet)
for i,m in enumerate(manifest):
 x=(i%4)*cw;y=(i//4)*ch
 d.text((x+14,y+12),m['name'],fill='#111111')
 im=Image.open(BASE/m['file']).convert('RGBA')
 im.thumbnail((cw-28,ch-52))
 bg=Image.new('RGBA',im.size,'white');bg.alpha_composite(im)
 sheet.paste(bg.convert('RGB'),(x+(cw-im.width)//2,y+42))
sheet.save(BASE/'highlights-contact-sheet.jpg')
print(f'Created {len(manifest)} reproducible detail crops.')
