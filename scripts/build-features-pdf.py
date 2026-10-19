#!/usr/bin/env python3
"""Build assets/docs/toast-iq-inventory-features.pdf from available/index.html.

Main column: every "Available" item, grouped by section.
Sidebar: the COMING_SOON highlights (must match a feature name on the page).
Requires Google Chrome. Run from anywhere: python3 -I scripts/build-features-pdf.py
"""
import html, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'available', 'index.html')
OUT = os.path.join(ROOT, 'assets', 'docs', 'toast-iq-inventory-features.pdf')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
AS_OF = 'October 2026'

COMING_SOON = [
    'Recipe Import',
    'Menu Insights Integration (Toast IQ)',
    'Print Recipe Cards or Books',
    'Simple Recipe Display in KDS',
    'AI-Assisted Allergen Tagging',
    'Build-your-own style complex modification handling',
]

src = open(SRC, encoding='utf-8').read()
available, committed = [], {}
for sec in re.findall(r'<div class="ft-section".*?\n  </div>\n', src, re.S):
    title = re.search(r'ft-section-header">(.*?)</div>', sec).group(1)
    items = []
    for name, desc, status in re.findall(
            r'<tr>\s*<td><strong>(.*?)</strong>(?:<br><span class="ft-desc">(.*?)</span>)?</td>.*?<td class="ft-(\w+)"', sec, re.S):
        if status == 'available':
            items.append((name, desc))
        elif status == 'committed':
            committed[html.unescape(name)] = desc
    if items:
        available.append((title, items))

missing = [n for n in COMING_SOON if n not in committed]
if missing:
    sys.exit('Not committed on the page: %s' % missing)

main = ''.join(
    '<h2>%s</h2>%s' % (t, ''.join(
        '<div class="f"><b>%s</b><span>%s</span></div>' % (n, d) for n, d in items))
    for t, items in available)
side = ''.join(
    '<div class="f"><b>%s</b><span>%s</span></div>' % (html.escape(n), committed[n]) for n in COMING_SOON)

page = f'''<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page {{ size: Letter; margin: 0.5in; }}
* {{ box-sizing: border-box; }}
body {{ font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1a1a1a; font-size: 9.5pt; margin: 0; }}
header {{ border-bottom: 3px solid #ff6900; padding-bottom: 8pt; margin-bottom: 12pt; }}
h1 {{ font-size: 20pt; margin: 0 0 2pt; }}
header p {{ margin: 0; color: #555; }}
.cols {{ display: flex; gap: 18pt; align-items: flex-start; }}
.main {{ flex: 1 1 66%; }}
aside {{ flex: 0 0 32%; background: #e8f0fe; border-radius: 6pt; padding: 10pt 12pt; break-inside: avoid; }}
h2 {{ font-size: 8.5pt; text-transform: uppercase; letter-spacing: .08em; color: #555; border-bottom: 1.5px solid #e0e0e0; padding-bottom: 3pt; margin: 14pt 0 4pt; break-after: avoid; }}
h2:first-child {{ margin-top: 0; }}
aside h2 {{ color: #2a5ab7; border-color: #b9cdf5; margin-top: 0; }}
.f {{ padding: 4pt 0; break-inside: avoid; }}
.f b {{ display: block; font-size: 9.5pt; }}
.f span {{ display: block; color: #555; font-size: 8.5pt; }}
aside .f {{ border-bottom: 1px solid #c9d8f7; }}
aside .f:last-of-type {{ border-bottom: 0; }}
.note {{ font-size: 7.5pt; color: #555; margin-top: 8pt; }}
</style></head><body>
<header><h1>Toast IQ Inventory: What's Available</h1><p>Features available today, as of {AS_OF}.</p></header>
<div class="cols"><div class="main">{main}</div>
<aside><h2>Coming soon</h2>{side}
<p class="note">We provide a look at upcoming features, but in no way is this a commitment to deliver those capabilities.</p></aside></div>
</body></html>'''

with tempfile.TemporaryDirectory() as d:
    tmp = os.path.join(d, 'features.html')
    open(tmp, 'w', encoding='utf-8').write(page)
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                    '--print-to-pdf=' + OUT, 'file://' + tmp], check=True, capture_output=True)
print('wrote', OUT)
