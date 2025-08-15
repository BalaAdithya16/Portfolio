PORTFOLIO ASSETS GUIDE
======================

This folder contains all the assets needed for your portfolio website.

REQUIRED FILES:
===============

1. RESUME:
   - File: BalaAdithya.pdf
   - Place in: assets/ (root of assets folder)
   - Update in HTML: Line 95 - href="assets/BalaAdithya.pdf"

2. PROFILE PHOTO:
   - File: profile.jpg
   - Place in: portfolio/ (root of portfolio folder)
   - Recommended size: 500x261 pixels (or similar ratio)
   - Update in HTML: Line 108 - src="profile.jpg"

3. PROJECT LOGO:
   - File: logo.png
   - Place in: assets/
   - Recommended size: 300x450 pixels
   - Update in HTML: Line 220 - src="assets/logo.png"

4. CERTIFICATES:
   - Create folder: assets/certificates/
   - Add your certificate images:
     * python-basic.png - Python Basic Certificate
     * html-css.png - HTML & CSS Certificate  
     * mern-stack.png - Full Stack MERN Certificate
     * servicenow-csa.png - ServiceNow CSA Certificate
   - Recommended size: 64x64 pixels or larger (will be scaled down)
   - Format: PNG, JPG, or PDF (PNG recommended for best quality)

FOLDER STRUCTURE:
=================
portfolio/
├── assets/
│   ├── BalaAdithya.pdf
│   ├── logo.png
│   └── certificates/
│       ├── python-basic.png
│       ├── html-css.png
│       ├── mern-stack.png
│       └── servicenow-csa.png
├── profile.jpg
├── index.html
├── styles.css
└── script.js

TIPS:
=====
- Keep file names lowercase and hyphen-separated
- Use PNG format for logos and certificates for best quality
- Ensure images are high resolution (they will be scaled down automatically)
- If you don't have a specific certificate, you can remove that card from the HTML or replace with a placeholder image

After adding all assets, your portfolio will be complete with real images and documents! 