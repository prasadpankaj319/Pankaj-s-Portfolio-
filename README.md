# Pankaj Prasad - Personal Portfolio

A modern, dynamic, and fully responsive personal portfolio website built with HTML5, Tailwind CSS, and Vanilla JavaScript.

## Features

- **Dark + Gradient Theme** – Premium tech look with glassmorphism
- **Animated Hero** – Typing effect, floating shapes, glowing profile image
- **Section Reveal** – Smooth left-to-right animations on scroll
- **Interactive Elements** – Hover effects, progress bars, tilt cards
- **Contact Form** – Frontend-only with success popup
- **Theme Toggle** – Switch between dark and light mode
- **Mobile-First** – Fully responsive design
- **SEO Ready** – Semantic HTML and meta tags

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Google Fonts (Inter)

## Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles & animations
├── js/
│   └── script.js       # All interactivity
├── assets/             # Images (add profile photo here)
└── README.md
```

## Local Development

1. **Clone or download** the project
2. **Open** `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

3. Visit `http://localhost:8000` in your browser

## Deployment

### GitHub Pages

1. **Create a GitHub repository** (e.g., `pankaj-prasad-portfolio`)

2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Select root folder and save
   - Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd Portfolio
   vercel
   ```
   Follow the prompts. Your site will be live at a URL like `https://your-project.vercel.app`

3. **Or use Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Deploy (no build settings needed for static HTML)

### Netlify (Alternative)

1. Drag and drop the project folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo in the Netlify dashboard

## Customization

- **Profile Image:** Replace the `ui-avatars.com` URL in `index.html` with your image path (e.g., `assets/profile.jpg`)
- **Social Links:** Update LinkedIn and GitHub URLs in the Contact section
- **GitHub Project Link:** Update the TuneHub project GitHub URL in the Projects section

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

---

**Pankaj Prasad** | Web Developer | BSc IT Student | Software Engineer Intern
