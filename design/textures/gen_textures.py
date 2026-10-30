#!/usr/bin/env python3
"""REAL FISHING WORLD procedural seamless textures (self-made, CC0). Run: python3 gen_textures.py"""
import numpy as np
from PIL import Image
N = 512

def smooth(t): return t*t*t*(t*(t*6-15)+10)

def vnoise(rng, fx, fy, n=N):
    """periodic value noise with fx x fy lattice cells over n x n."""
    g = rng.random((fy, fx))
    xs = np.arange(n)/n*fx; ys = np.arange(n)/n*fy
    x0 = np.floor(xs).astype(int); y0 = np.floor(ys).astype(int)
    tx = smooth(xs-x0)[None, :]; ty = smooth(ys-y0)[:, None]
    x1 = (x0+1) % fx; y1 = (y0+1) % fy
    a = g[y0][:, x0]; b = g[y0][:, x1]; c = g[y1][:, x0]; d = g[y1][:, x1]
    return (a*(1-tx)+b*tx)*(1-ty)+(c*(1-tx)+d*tx)*ty

def fbm(rng, f=4, fy=None, octs=5, gain=0.5):
    fy = fy or f
    out = np.zeros((N, N)); amp = 1; tot = 0
    for o in range(octs):
        out += amp*vnoise(rng, f*2**o, fy*2**o); tot += amp; amp *= gain
    return out/tot

def norm(a): return (a-a.min())/(a.max()-a.min()+1e-9)

def worley(rng, cells, n=N):
    """periodic Worley: returns F1, F2 and cell id."""
    pts = (np.stack(np.meshgrid(np.arange(cells), np.arange(cells)), -1)+rng.random((cells, cells, 2)))/cells
    pts = pts.reshape(-1, 2)
    ys, xs = np.mgrid[0:n, 0:n]/n
    d = []
    for ox in (-1, 0, 1):
        for oy in (-1, 0, 1):
            pass
    best = np.full((n, n), 9.0); second = np.full((n, n), 9.0); idx = np.zeros((n, n), int)
    for i, (px, py) in enumerate(pts):
        dx = np.abs(xs-px); dx = np.minimum(dx, 1-dx)
        dy = np.abs(ys-py); dy = np.minimum(dy, 1-dy)
        dist = np.sqrt(dx*dx+dy*dy)
        m = dist < best
        second = np.where(m, best, np.minimum(second, dist))
        idx = np.where(m, i, idx); best = np.where(m, dist, best)
    return best, second, idx

def to_img(rgb, path, q=80):
    rgb = np.clip(rgb, 0, 1)
    Image.fromarray((rgb*255+0.5).astype(np.uint8), "RGB").save(path, "WEBP", quality=q, method=6)

def lerp3(a, b, t): return np.array(a)[None, None]*(1-t[..., None])+np.array(b)[None, None]*t[..., None]
def c(h): return [int(h[i:i+2], 16)/255 for i in (1, 3, 5)]

def concrete(rng):
    big = fbm(rng, 3, octs=4)
    mid = fbm(rng, 12, octs=4)
    fine = rng.random((N, N))
    t = 0.45+0.35*(norm(big)-0.5)+0.18*(norm(mid)-0.5)+0.16*(fine-0.5)+0.10*(vnoise(rng,256,256)-0.5)
    # pores
    pore = fbm(rng, 48, octs=2)
    t -= 0.16*np.clip((pore-0.62)*9, 0, 1)
    # water stain streaks (vertical, periodic)
    st = norm(vnoise(rng, 6, 2)*0.7+vnoise(rng, 18, 4)*0.3)
    t -= 0.12*np.clip(st-0.55, 0, 1)*2
    rgb = lerp3(c("#6f7173"), c("#b4b3ac"), np.clip(t, 0, 1))
    warm = norm(fbm(rng, 4, octs=3))
    rgb[..., 0] += 0.02*(warm-0.5); rgb[..., 2] -= 0.02*(warm-0.5)
    return rgb

def rock(rng):
    f1, f2, idx = worley(rng, 5)
    w = (fbm(rng, 8, octs=4)-0.5)*0.05
    f1 = f1+w; f2 = f2-w*0.8
    edge = np.clip((f2-f1)*22+ (fbm(rng,24,octs=2)-0.5)*0.5, 0, 1)         # 0 at cell borders (cracks)
    rid = np.random.default_rng(5).random(60)[idx]
    tone = 0.35+0.35*rid + 0.35*(norm(fbm(rng, 5, octs=5))-0.5) + 0.2*(vnoise(rng,200,200)-0.5)+0.25*(fbm(rng,16,octs=4)-0.5)
    # bevel-ish shading from cell distance
    shade = 0.75+0.5*np.clip(f1*5, 0, 1)**0.8*0
    bump = np.clip(1-f1*4.5, 0, 1)
    tone += 0.18*(bump-0.4)
    tone = tone*(0.35+0.65*edge**0.7)
    rgb = lerp3(c("#3e4146"), c("#9a968c"), np.clip(tone, 0, 1))
    tint = norm(fbm(rng, 3, octs=3))[..., None]
    rgb = rgb*(1+0.12*(tint-0.5)*np.array([1, 0.2, -1])[None, None])
    # dark wet / algae near bottom-ish patches
    alg = norm(fbm(rng, 4, octs=4)) > 0.72
    rgb[alg] = rgb[alg]*0.8+np.array(c("#3c4a38"))*0.2
    return rgb

def sand(rng):
    ripple = np.sin((np.arange(N)[None, :]*2*np.pi*6/N)*1 + 5*fbm(rng, 3, octs=3)*2*np.pi*0 + (fbm(rng, 3, octs=3)-0.5)*14 + (np.arange(N)[:, None]*2*np.pi*2/N))
    ripple = 0.5+0.5*ripple
    grain = rng.random((N, N)); grain2 = vnoise(rng, 128, 128)
    broad = norm(fbm(rng, 4, octs=4))
    t = 0.5+0.10*(ripple-0.5)+0.22*(broad-0.5)+0.16*(grain-0.5)+0.08*(grain2-0.5)
    rgb = lerp3(c("#b79a6e"), c("#e7d3a6"), np.clip(t, 0, 1))
    spk = rng.random((N, N))
    rgb[spk > 0.992] = np.array(c("#6b5a45")); rgb[spk < 0.004] = np.array(c("#fff3d6"))
    return rgb

def wood(rng):
    planks = 4; ph = N//planks
    rgb = np.zeros((N, N, 3)); y = np.arange(N)
    for p in range(planks):
        sl = slice(p*ph, (p+1)*ph)
        # grain: periodic noise stretched along x, plus ring wave
        g = np.zeros((N, N))
        sx = int(rng.integers(2, 4)); 
        g = vnoise(rng, sx, 48)*0.55+vnoise(rng, sx*2, 96)*0.3+vnoise(rng, 4, 160)*0.15
        rings = 0.5+0.5*np.sin((g*14+ (vnoise(rng, 2, 6)*3))*2*np.pi)
        tone = 0.42+0.34*(rings-0.5)+0.34*(g-0.5)+0.06*(rng.random((N, N))-0.5)
        tone += 0.18*(rng.random()-0.5)
        # knots
        base = lerp3(c("#57402c"), c("#b58d62"), np.clip(tone, 0, 1))
        base *= (0.9+0.2*rng.random())
        rgb[sl] = base[sl]
    # darker plank gaps (wrap: gap at row 0 / ph*k)
    for p in range(planks):
        for k, dk in enumerate((0.25, 0.55, 0.85)):
            yy = (p*ph+k) % N
            rgb[yy] *= dk
    # weathered silver overlay
    wea = norm(fbm(rng, 5, octs=4))[..., None]
    rgb = rgb*(1-0.25*wea)+np.array(c("#8c8a82"))[None, None]*0.25*wea
    # nail dots
    for p in range(planks):
        for x in ((40, 472) if p%2==0 else (150, 360)):
            yy = p*ph+ph//2
            rr = 3
            for dy in range(-rr, rr+1):
                for dx in range(-rr, rr+1):
                    if dx*dx+dy*dy <= rr*rr: rgb[(yy+dy) % N, (x+dx) % N] *= 0.45
    return rgb

def seam_report(a):
    a = np.asarray(a, float)
    h = np.abs(a[:, 0]-a[:, -1]).mean(); v = np.abs(a[0]-a[-1]).mean()
    inner = np.abs(np.diff(a, axis=1)).mean()
    return h, v, inner

if __name__ == "__main__":
    import os
    here = os.path.dirname(os.path.abspath(__file__))
    for name, fn, seed, q in (("concrete", concrete, 11, 78), ("rock", rock, 22, 78), ("sand", sand, 33, 72), ("wood", wood, 44, 80)):
        rgb = fn(np.random.default_rng(seed))
        p = os.path.join(here, name+".webp"); to_img(rgb, p, q)
        im = np.asarray(Image.open(p).convert("RGB"), float)/255
        h, v, i = seam_report(im)
        print(f"{name}: {os.path.getsize(p)/1024:.1f}KB wrap-diff H={h:.4f} V={v:.4f} (neighbor-diff {i:.4f})")
        t = Image.open(p).convert("RGB"); prev = Image.new("RGB", (1024, 1024))
        for a in (0, 1):
            for b in (0, 1): prev.paste(t, (a*512, b*512))
        prev.save(f"/workspace/realfishing/design/textures/_preview_{name}_2x2.png")
