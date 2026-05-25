# Faire — How RL Unlocks the Aha Moment in Geometric Interleaved Reasoning

Project page for the ICML 2026 paper.

- **Paper (PDF):** https://arxiv.org/pdf/2603.01070
- **arXiv abstract:** https://arxiv.org/abs/2603.01070
- **Live page (GitHub Pages):** https://ucas-elysia.github.io/Faire/

## Local preview

```bash
cd <repo-root>
python3 -m http.server 8000
# then open http://localhost:8000/
```

Everything is static — no build step required. Math is rendered locally with
KaTeX (vendored under `static/vendor/katex/`), so the page works offline.

## Structure

```
.
├── index.html              # whole page
├── static/
│   ├── css/style.css       # styles
│   ├── js/main.js          # BibTeX copy, lightbox, smooth scroll
│   ├── paper.pdf           # local fallback of the camera-ready PDF
│   ├── images/             # figures (PNG, extracted from the LaTeX source)
│   └── vendor/katex/       # KaTeX 0.16.11 (CSS + JS + woff2 fonts)
└── README.md
```

## Citation

```bibtex
@inproceedings{zhang2026faire,
  title     = {How {RL} Unlocks the Aha Moment in Geometric Interleaved Reasoning},
  author    = {Zhang, Xiangxiang and Jia, Caijun and Li, Siyuan and He, Dingyu and
               Xiong, Xiya and Sun, Zheng and He, Honghao and Wu, Yuchen and
               Yu, Bihui and Sun, Linzhuang and Tan, Cheng and Wei, Jingxuan},
  booktitle = {Proceedings of the 43rd International Conference on Machine Learning},
  series    = {PMLR 306},
  year      = {2026},
  address   = {Seoul, South Korea},
}
```

Template loosely inspired by the Nerfies project page.
