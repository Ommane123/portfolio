# Om Mane | AI & ML Engineer Portfolio

A premium, modern, highly interactive developer portfolio built using **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

🔗 **Live Website:** [https://ommane123.github.io/portfolio/](https://ommane123.github.io/portfolio/)

---

## 🎨 Design & Aesthetic Style

Inspired by award-winning Awwwards developer portfolios, this website balances high-fidelity interactive elements with professional structure:
* **Cyberpunk/Sci-Fi Dark Theme:** Default theme featuring vibrant neon blue and purple highlights.
* **Light Contrast Mode:** A high-end clean "cyber-light" theme accessible via a toggle in the navigation bar.
* **Glassmorphism Elements:** Blurry, frosted-glass panels (`glass` and `glass-navbar` backdrops) defining cards and navigation layers.
* **Custom Typography:** Space Grotesk for sci-fi heading details and Inter for reading legibility.

---

## 🚀 Core Interactive Features

* **AI-Themed Preloader Screen:** Displays a loading console that boots up system modules with terminal logs and fills a progress bar before fading out.
* **Interactive Canvas Background:** Spawns moving particles that connect with neon connection lines, reacting to your mouse pointer.
* **Damped Mouse Follower Cursor:** A custom outer cursor ring that floats with lag/spring mechanics and expands on hover over links and buttons.
* **3D Tilt Project Cards:** Interactive project cards that calculate cursor angle on hover to apply a 3D rotate effect (`rotateX`, `rotateY`) and shift a glowing radial highlight.
* **Custom SVG HUDs:** Custom vector graphics designed to illustrate project schemas (RAG systems, drowsiness detection landmark scopes, binary decision trees).
* **Resume Tabs & Timeline:** Vertical vertical checkpoint timeline displaying education history and interactive tabs for quick skills indexing.
* **Count-Up Counter Cards:** Increments key engineering metrics (completed projects, CodeVita rank, hackathons) when loaded.
* **Magnetic Back-to-Top Button:** A scroll-to-top button in the footer that translates slightly toward the cursor on hover.

---

## 🛠️ Technology Stack

* **Core Framework:** React 19, TypeScript
* **Build System:** Vite
* **Styling Engine:** Tailwind CSS v4.0.0 (using Vite CSS directives)
* **Icon Set:** Lucide React & Custom Brand SVG Vectors

---

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ommane123/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser.

4. **Build production bundles:**
   ```bash
   npm run build
   ```

---

## 📦 Deployment to GitHub Pages

This portfolio uses GitHub Actions to compile and deploy automatically:
1. Make changes to the code.
2. Commit and push your changes to the `main` branch.
3. The workflow in `.github/workflows/deploy.yml` automatically triggers, compiles your React/TS files, and deploys the resulting `dist/` directory to the `/portfolio/` subdirectory.
