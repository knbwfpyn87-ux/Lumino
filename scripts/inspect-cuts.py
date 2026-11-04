import sys, os
from PIL import Image, ImageDraw
D, out, names, z = sys.argv[1], sys.argv[2], sys.argv[3].split(','), int(sys.argv[4])
tiles=[]
for n in names:
    im=Image.open(f'{D}/{n}.png').convert('RGBA'); im=im.resize((im.width*z, im.height*z), Image.NEAREST)
    row=[]
    for bg in ['checker',(255,255,255,255),(22,24,36,255)]:
        if bg=='checker':
            b=Image.new('RGBA',im.size,(200,200,200,255)); d=ImageDraw.Draw(b)
            for yy in range(0,im.height,12):
                for xx in range(0,im.width,12):
                    if (xx//12+yy//12)%2: d.rectangle([xx,yy,xx+11,yy+11],fill=(245,245,245,255))
        else: b=Image.new('RGBA',im.size,bg)
        b.alpha_composite(im); row.append(b)
    w=sum(r.width for r in row)+20; h=row[0].height+16
    t=Image.new('RGB',(w,h),(120,60,160)); x=0
    for r in row: t.paste(r,(x,16)); x+=r.width+10
    ImageDraw.Draw(t).text((4,2),n,fill=(255,255,255)); tiles.append(t)
W=max(t.width for t in tiles); H=sum(t.height for t in tiles)+4*len(tiles)
s=Image.new('RGB',(W,H),(60,30,80)); y=0
for t in tiles: s.paste(t,(0,y)); y+=t.height+4
s.save(out)
