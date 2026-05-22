# 🌌 Manu Jindal | Premium Software Engineer Portfolio

A premium, state-of-the-art developer portfolio website designed to showcase full-stack engineering expertise, interactive 3D particle canvas renders, and a modern design system. Fully responsive across mobiles, tablets, laptops, and ultra-high-resolution displays.

---

## ✨ Features & Architectural Highlights

### ⚡ 3 Harmonious Interactive Themes
Seamlessly toggle between three premium color palettes at 60fps, built with high-performance CSS theme variables:
* **Light Mode**: Sleek, clean slate background with bright cobalt blue accents.
* **Dark Mode**: High-contrast cyberpunk-inspired charcoal and electric-indigo canvas.
* **Neon Mode**: Immersive neon cyan, hot-pink, and purple glowing techscape.

### 🌌 Interactive 3D Canvas Particles
* Built with native HTML5 Canvas and dynamic Javascript rendering.
* Features a high-performance orbiting starfield system that dynamically speeds up, slows down, and curves in response to cursor mouse hover and page scroll.
* Rendered at `z-0` beneath crystal-clear glassmorphic cards.

### 💼 Integrated Education & Profile
* Side-by-side glassmorphic grid aligning a **Profile Summary** (Mohali, Punjab, India) with a responsive **Education Timeline** (Chandigarh University, S.U.S.G.S.S.S School, D.A.V Public School) featuring dynamic "Ongoing" and "Completed" badges.
* Engineered with an optimized backdrop blur filter (`blur(4px)`) and transparent card layers so that the trailing 3D stars show through sharply.

### 📂 Double-Safe Responsive Project Modals
* View detailed capabilities, technologies deployed, and description lists.
* **Viewport Safety**: Centered with `my-auto` and bounded by `max-h-[85vh]` to ensure zero clipping on short devices (like mobile phones in landscape mode).
* **Double Scroll Safety**: The parent container handles backdrop scrolling while the body handles text flow smoothly via a responsive custom scrollbar.
* **Global Stacking Context**: Fully isolated z-index layout ensuring modals overlay perfectly in front of the fixed Navbar blur.

### 📝 Boundary-Styled Secure Feedback
* High-contrast contact form designed for direct messaging.
* Responsive layouts, sleek hover transition effects, and solid boundaries.

---

## 🛠️ Technology Stack

* **Core Framework**: React (with TypeScript)
* **Build System**: Vite (lightning-fast HMR)
* **Styling**: Tailwind CSS & Vanilla CSS Utility layers
* **Animations**: Framer Motion (ultra-smooth spring dynamics)
* **Icons**: Lucide React
* **Deployment Ready**: Vercel & GitHub Pages compatible

---

## ⚙️ Local Development Setup

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, and follow these simple steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the interactive portfolio!

4. **Compile Production Build**:
   ```bash
   npm run build
   ```

---

## 🚀 Deployment Instructions

### Deploying to Vercel
This project is configured with a `vercel.json` file and is fully ready to deploy to Vercel:
1. Connect your GitHub repository to [Vercel](https://vercel.com/).
2. Select the repository and import.
3. Keep default settings (Vite build commands will auto-detect).
4. Click **Deploy**!

### Deploying to GitHub Pages
1. Install `gh-pages` helper:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add deploy scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -dist"
   ```
3. Run the deploy pipeline:
   ```bash
   npm run deploy
   ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
