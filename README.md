# 🎓 VTeach: Your AI-Powered Virtual Learning Companion 🚀

Welcome to VTeach, the next-generation Virtual Learning Assistant that transforms your study routine into an engaging, personalized journey. Built with cutting-edge AI technologies—including the Qwen-Max chatbot, multimodal OCR, and multilingual support—VTeach adapts to your learning style and needs.

## 🔍 Table of Contents

*   [💖 Why VTeach?](#why-vteach)
*   [✨ Key Features](#key-features)
*   [🛠 Tech Stack](#tech-stack)
*   [🚀 Quick Start (Local Development)](#quick-start-local-development)
*   [💡 Cool Tips & Tricks (Future Ideas)](#cool-tips--tricks-future-ideas)
*   [☁️ Deployment Guide (Alibaba Cloud ECS)](#deployment-guide-alibaba-cloud-ecs)
*   [📂 Project Structure](#project-structure)
*   [🤝 Contributing & Support](#contributing--support)
*   [📜 License](#license)

## 💖 Why VTeach?

*   **Truly Personalized (Future Vision):** Combines your learning style (visual, auditory, reading/writing, kinesthetic) with MBTI insights for study plans that feel made for you.
*   **Multimodal Magic:** Snap a photo of your notes—our OCR engine extracts Chinese & English text instantly. 📸📝
*   **Instant AI Tutor:** Chat 24/7 with our Qwen-Max–powered assistant. No more waiting for office hours!
*   **Global Classroom:** Seamless support in English, Malay, and Chinese. 🌐🇬🇧🇲🇾🇨🇳

## ✨ Key Features

*   **🎙 AI Chatbot (Qwen-Max)**
    *   Real-time, context-aware Q&A via DashScope API.
    *   Persistent chat history with `localStorage`.
    *   ChatGPT-like dark mode interface for comfortable study sessions.
    *   Multiple chat sessions organized by date.
*   **🖼 OCR Note-Taking (`/note` page)**
    *   Upload images of whiteboards, textbooks, or handwritten notes.
    *   PaddleOCR-powered extraction for mixed Chinese & English text via a Python backend script.
    *   Export extracted notes as PDF, with customizable filenames on the fly.
*   **🚪 Simulated Auth & Dashboard (`/login`, `/register`, `/dashboard` pages)**
    *   Basic login/register forms (currently mock authentication).
    *   Personalized dashboard displaying mock course progress and upcoming assignments.
    *   Placeholder for AI-driven learning recommendations.
*   **🌍 Multilingual UI**
    *   Switch languages in seconds: English (GB), Malay (MY), or Chinese (CN).
    *   Consistent experience via React Context API (`LanguageContext`) and centralized translations (`src/app/translations/index.ts`).
*   **📱 Responsive Design**
    *   Seamless experience across desktop, tablet, and mobile—thanks to Tailwind CSS.

## 🛠 Tech Stack

| Layer        | Technology                                                                                                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | Next.js (v13+ with App Router), TypeScript, Tailwind CSS, React Hooks, Context API, `localStorage`, `jsPDF`                               |
| **Backend**  | Next.js API Routes (Node.js for chat proxy & OCR orchestration), Python (for OCR processing script)                                      |
| **AI Chat**  | Qwen-Max via Alibaba Cloud DashScope API                                                                                                   |
| **OCR Engine**| PaddleOCR (`paddleocr`, `opencv-python`, `paddlepaddle` for Chinese + English) via Python script (`scripts/ocr_processor.py`)         |
| **Deployment**| Alibaba Cloud ECS (intended), Nginx (reverse proxy), PM2 (process manager)                                                                 |

## 🚀 Quick Start (Local Development)

1.  **Clone & Install**
    ```bash
    # git clone https://github.com/your-org/vteach.git # Uncomment if you have a repo
    # cd vteach
    npm install        # or yarn install
    pip install paddleocr opencv-python paddlepaddle
    ```
    *(Ensure PaddleOCR downloads its models on first run or configure model paths in `scripts/ocr_processor.py` if needed)*

2.  **Configure Environment Variables**
    *   Create a `.env.local` file in the project root (e.g., `D:\VTeach\vteach\.env.local`).
    *   Add your DashScope API key (the actual key name might vary based on your implementation in `src/app/api/chat/route.ts`):
        ```
        DASHSCOPE_API_KEY=your_actual_dashscope_api_key
        ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Cool Tips & Tricks (Future Ideas)

*   **Dark Mode Shortcut:** Press `D` to toggle between light/dark themes instantly.
*   **Batch OCR:** Drop multiple images on the `/note` page and export a combined PDF.
*   **Chat Templates:** Save common prompts (e.g., “Explain this concept in simple terms”) for one-click re-use.

## ☁️ Deployment Guide (Alibaba Cloud ECS)

1.  **Provision ECS:** Set up an Alibaba Cloud ECS instance with your preferred OS (e.g., Ubuntu). Install Node.js, npm/yarn, Python, pip, Nginx, and PM2.
2.  **Install Python Dependencies on ECS:**
    ```bash
    pip install paddleocr opencv-python paddlepaddle # (or paddlepaddle-gpu if applicable)
    ```
    Ensure PaddleOCR models are downloaded or accessible on the server.
3.  **Build & Transfer Code:**
    *   Locally, build your Next.js app: `npm run build`
    *   Transfer your project (including the `.next` build folder, `public`, `scripts`, `node_modules`, and `package.json`) to your ECS instance (e.g., using `scp -r . username@your_ecs_ip:/home/username/vteach`).
4.  **Install Production Dependencies on ECS (if not transferred with `node_modules`):
    ```bash
    cd /home/username/vteach
    npm install --production # or yarn install --production
    ```
5.  **Configure Environment Variables on ECS:** Set `DASHSCOPE_API_KEY` and `NODE_ENV=production` (e.g., via PM2 ecosystem file or system environment variables).
6.  **PM2 & Nginx:**
    *   Use an `ecosystem.config.js` file for PM2 to manage your Next.js app (e.g., `pm2 start ecosystem.config.js`). A sample is provided in the previous README version.
    *   Configure Nginx as a reverse proxy to forward requests from port 80/443 to your Next.js app's port (e.g., 3000). A sample Nginx config is in the previous README version.
7.  **Security Groups:** Allow inbound traffic on port 80 (HTTP) and/or 443 (HTTPS) in your ECS security group settings.

**Important Notes for OCR Python Script (Server):**
*   **Python Executable Path:** The `src/app/api/ocr/route.ts` file uses `python` (defined by `PYTHON_COMMAND`). If your server uses `python3` or a specific virtual environment path, update this constant.
*   **PaddleOCR Model Paths:** PaddleOCR needs its models. If they aren't found when run by Node.js on the server, explicitly set model paths (e.g., `det_model_dir`) in the `PaddleOCR()` constructor in `scripts/ocr_processor.py`.

## 📂 Project Structure

```
/vteach                  # Project Root (e.g., D:\VTeach\vteach)
├── public/              # Static assets (images, fonts)
├── scripts/
│   └── ocr_processor.py # 📸 Python script for OCR engine integration
├── src/
│   ├── app/
│   │   ├── api/         # 🔌 Backend API routes (chat, ocr)
│   │   │   ├── chat/route.ts
│   │   │   └── ocr/route.ts
│   │   ├── components/  # 🧩 Reusable UI React components (Navbar, Footer, etc.)
│   │   ├── contexts/    # 🌐 LanguageContext for i18n
│   │   ├── translations/# 🈴 Language JSON files
│   │   ├── chatbot/     # Chatbot page specific files
│   │   ├── dashboard/   # Dashboard page
│   │   ├── login/       # Login page
│   │   ├── note/        # OCR & Note-taking page
│   │   ├── register/    # Registration page
│   │   ├── layout.tsx   # 🎨 Main application layout
│   │   └── page.tsx     # 🏠 Landing page
│   └── ... (other supporting files)
├── .env.local           # Local environment variables (e.g., API keys) - DO NOT COMMIT
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and npm scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## 🤝 Contributing & Support

We love pull requests! 🧡 Please read our `CONTRIBUTING.md` (you might want to create this file) to get started. For issues or feature requests, please open a ticket in our GitHub Repo (link to your repo if you have one).

## 📜 License

This project is licensed under the MIT License. See `LICENSE` file (you might want to create this file) for details.
