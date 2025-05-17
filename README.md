# Virtual Learning Assistant (VTeach)

## Overview

VTeach is a web-based Virtual Learning Assistant designed to provide students with a modern, AI-powered learning experience. Key features include an interactive AI chatbot (powered by Qwen-Max via DashScope API), OCR capabilities for note-taking from images, a user dashboard, and multilingual support (English, Malay, Chinese).

The application is built with Next.js and is intended for deployment on an Alibaba Cloud ECS instance.

## Features

*   **AI Chatbot:**
    *   Integrates with the Qwen-Max large language model through the DashScope API.
    *   ChatGPT-like user interface with dark mode.
    *   Supports multiple chat sessions with history saved in `localStorage`.
    *   Chat sessions are organized by date in a sidebar.
*   **OCR & Note-Taking (`/note` page):
    *   Allows users to upload an image.
    *   Utilizes a Python backend script with PaddleOCR to extract text (Chinese & English) from the uploaded image.
    *   Extracted text can be added to a notes section.
    *   Users can download the extracted OCR text as a PDF, with customizable filenames.
*   **User Authentication (Simulated):
    *   Basic login and registration forms.
    *   Redirects to a user dashboard upon (simulated) successful authentication.
*   **Dashboard (`/dashboard` page):
    *   Displays mock course progress and upcoming assignments.
    *   Placeholder for personalized learning recommendations.
*   **Multilingual Support:**
    *   Supports English (en), Malay (ms), and Chinese (zh).
    *   Uses React Context API (`LanguageContext`) for managing language state and translations.
    *   Translations are stored in a central file (`src/app/translations/index.ts`).
    *   Language selector in the Navbar (displays country codes GB, MY, CN).
*   **Responsive Design:** Built with Tailwind CSS for a responsive user interface across devices.

## Tech Stack

**Frontend:**

*   **Framework:** [Next.js](https://nextjs.org/) (v13+ with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** Primarily custom-built with Next.js and Tailwind CSS.
*   **State Management:**
    *   React Hooks (`useState`, `useEffect`, `useRef`, `useContext`)
    *   React Context API for global state (e.g., `LanguageContext`).
*   **Client-Side Storage:** `localStorage` (for chat history, language preference).
*   **PDF Generation (Client-Side):**
    *   [jsPDF](https://github.com/parallax/jsPDF): For creating PDF documents directly in the browser from extracted text.

**Backend (within Next.js API Routes & External Script):**

*   **API Routes:** Next.js API Routes (`src/app/api/...`)
    *   `/api/chat/route.ts`: Proxies requests to the DashScope API for the Qwen-Max chatbot.
    *   `/api/ocr/route.ts`: Handles image uploads and orchestrates OCR processing.
*   **OCR Processing:**
    *   **Python Script (`scripts/ocr_processor.py`):**
        *   Language: [Python](https://www.python.org/)
        *   OCR Engine: [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) (for Chinese and English text extraction).
        *   Libraries: `paddleocr`, `opencv-python`, `paddlepaddle` (CPU/GPU).
    *   **Orchestration:** The Next.js `/api/ocr` route saves the uploaded image temporarily and calls the Python script as a child process (`child_process.spawn`) to perform OCR.
*   **Server Environment:** Node.js (as part of Next.js)

**External Services:**

*   **AI Chatbot Model:** Qwen-Max via [Alibaba Cloud DashScope API](https://help.aliyun.com/document_detail/2582307.html).

**Deployment (Intended):**

*   **Cloud Provider:** [Alibaba Cloud](https://www.alibabacloud.com/)
*   **Service:** Elastic Compute Service (ECS)
*   **Web Server (Typical for Next.js):** Node.js server (either `next start` or a custom server). Often managed by a process manager like PM2 and fronted by a reverse proxy like Nginx on the ECS instance.

## Project Structure (Key Directories)

```
/vteach
├── public/                 # Static assets (images, fonts, etc.)
├── scripts/
│   └── ocr_processor.py    # Python script for OCR
├── src/
│   ├── app/
│   │   ├── api/              # Backend API routes
│   │   │   ├── chat/route.ts
│   │   │   └── ocr/route.ts
│   │   ├── components/       # Reusable React components (Navbar, Footer, Hero, etc.)
│   │   ├── contexts/         # React Context providers (e.g., LanguageContext)
│   │   ├── translations/     # Language translation files
│   │   ├── chatbot/          # Chatbot page specific files
│   │   ├── dashboard/        # Dashboard page specific files
│   │   ├── login/            # Login page
│   │   ├── note/             # OCR & Note-taking page
│   │   ├── register/         # Registration page
│   │   ├── layout.tsx        # Main app layout
│   │   └── page.tsx          # Landing page
│   └── ... (other supporting files)
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Prerequisites for Local Development

*   Node.js (v18.x or later recommended)
*   npm or yarn
*   Python (v3.x) installed and added to PATH.
*   `pip` (Python package installer).
*   Required Python packages for OCR: `pip install paddleocr opencv-python paddlepaddle`
*   DashScope API Key (set as an environment variable, e.g., `DASHSCOPE_API_KEY` used in `src/app/api/chat/route.ts` - *actual implementation detail for API key handling might vary*).

## Getting Started (Local Development)

1.  **Clone the repository (if applicable) or ensure project files are in place.**
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Install Python dependencies for OCR (if not already done globally):**
    ```bash
    pip install paddleocr opencv-python paddlepaddle
    ```
    *(Ensure PaddleOCR downloads its models on first run or configure model paths in `scripts/ocr_processor.py` if needed)*
4.  **Set up environment variables:**
    *   Create a `.env.local` file in the project root.
    *   Add your DashScope API key: `DASHSCOPE_API_KEY=your_actual_api_key` (Update `src/app/api/chat/route.ts` to securely read this if not already done).
5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The application should be accessible at `http://localhost:3000`.

## Deployment on Alibaba Cloud ECS

1.  **Set up an Alibaba Cloud ECS instance:**
    *   Choose an appropriate OS (e.g., Ubuntu, CentOS).
    *   Install Node.js, npm/yarn, Python, and pip.
    *   Install Nginx (recommended as a reverse proxy) and PM2 (recommended for managing the Node.js process).
2.  **Install Python Dependencies on ECS:**
    *   `pip install paddleocr opencv-python paddlepaddle` (or `paddlepaddle-gpu` if your ECS instance has a GPU and CUDA is configured).
    *   Ensure PaddleOCR models are downloaded or accessible by the Python script on the server.
3.  **Deploy your application code to the ECS instance:**
    *   Use Git, SCP, rsync, or any other method to transfer your project files.
4.  **Build the Next.js application:**
    *   Navigate to your project directory on the ECS instance.
    *   Install dependencies: `npm install` (or `yarn install`).
    *   Build the application: `npm run build` (or `yarn build`).
5.  **Configure Environment Variables on ECS:**
    *   Set `DASHSCOPE_API_KEY` and any other necessary environment variables (e.g., `NODE_ENV=production`) for your production environment. This can be done via PM2 ecosystem file or system environment variables.
6.  **Run the application with PM2:**
    *   Create a PM2 ecosystem configuration file (e.g., `ecosystem.config.js`):
        ```javascript
        // ecosystem.config.js
        module.exports = {
          apps: [
            {
              name: 'vteach-app',
              script: 'node_modules/.bin/next',
              args: 'start -p 3000', // Adjust port if needed
              instances: 1, // Or 'max' based on CPU cores
              autorestart: true,
              watch: false,
              max_memory_restart: '1G',
              env: {
                NODE_ENV: 'production',
                // Add other environment variables here, like DASHSCOPE_API_KEY
              },
            },
          ],
        };
        ```
    *   Start the application: `pm2 start ecosystem.config.js`
7.  **Configure Nginx as a Reverse Proxy (Example):**
    *   Edit your Nginx site configuration (e.g., `/etc/nginx/sites-available/default` or a new file for your domain):
        ```nginx
        server {
            listen 80;
            server_name your_domain.com www.your_domain.com; # Replace with your actual domain or IP

            location / {
                proxy_pass http://localhost:3000; # Assuming your Next.js app runs on port 3000
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }
        ```
    *   Enable the site and restart Nginx: `sudo ln -s /etc/nginx/sites-available/your_config /etc/nginx/sites-enabled/`, `sudo systemctl restart nginx`.
8.  **Configure Security Groups:** Ensure your ECS instance's security group allows inbound traffic on port 80 (HTTP) and/or 443 (HTTPS if you set up SSL).

## Important Notes for OCR Python Script

*   **Python Executable Path:** The `src/app/api/ocr/route.ts` file uses `python` as the command to execute the OCR script. If your server uses `python3` or has a specific path for the correct Python environment, update the `PYTHON_COMMAND` constant in that file.
*   **PaddleOCR Model Paths:** When the Python script is run by the Node.js child process, its working directory and environment might differ. PaddleOCR needs to locate its trained models. If you encounter issues where models aren't found on the server:
    *   Ensure they are downloaded (usually to `~/.paddleocr/whl` or a system cache).
    *   Consider explicitly setting model directories in `scripts/ocr_processor.py` using parameters like `det_model_dir`, `rec_model_dir` in the `PaddleOCR()` constructor.

---

This README provides a starting point. You should update it with more specific details about your setup, especially the deployment section, as your project evolves.
