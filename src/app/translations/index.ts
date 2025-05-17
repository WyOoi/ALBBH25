import { Language } from '@/app/contexts/LanguageContext';

// Define the translation structure
type TranslationRecord = Record<string, Record<Language, string>>;

// Define all translations here
const translations: TranslationRecord = {
  // Common
  "app.name": {
    en: "Virtual Learning Assistant",
    ms: "Pembantu Pembelajaran Maya",
    zh: "虚拟学习助手"
  },
  "app.tagline": {
    en: "Your AI-powered companion for effective learning",
    ms: "Rakan AI anda untuk pembelajaran berkesan",
    zh: "您的AI驱动学习伙伴，提供高效学习体验"
  },
  "app.name.short": {
    en: "VTeach",
    ms: "VTeach",
    zh: "VTeach"
  },

  // Navigation
  "nav.home": {
    en: "Home",
    ms: "Utama",
    zh: "首页"
  },
  "nav.dashboard": {
    en: "Dashboard",
    ms: "Papan Pemuka",
    zh: "仪表板"
  },
  "nav.chatbot": {
    en: "Chatbot",
    ms: "Bot Perbualan",
    zh: "聊天机器人"
  },
  "nav.login": {
    en: "Login",
    ms: "Log Masuk",
    zh: "登录"
  },
  "nav.register": {
    en: "Register",
    ms: "Daftar",
    zh: "注册"
  },
  "nav.go_to_homepage": {
    en: "Go to Homepage",
    ms: "Ke Halaman Utama",
    zh: "返回首页"
  },
  "nav.open_main_menu": {
    en: "Open main menu",
    ms: "Buka menu utama",
    zh: "打开主菜单"
  },
  "nav.note": {
    en: "Notes",
    ms: "Nota",
    zh: "笔记"
  },
  "nav.study_plan": {
    en: "Study Plan",
    ms: "Pelan Belajar",
    zh: "学习计划"
  },

  // Hero section
  "hero.new_features": {
    en: "New features",
    ms: "Ciri baharu",
    zh: "新功能"
  },
  "hero.just_launched": {
    en: "Just launched",
    ms: "Baru dilancarkan",
    zh: "刚刚发布"
  },
  "hero.cta": {
    en: "Get started",
    ms: "Mulakan",
    zh: "开始使用"
  },
  "hero.try_chatbot": {
    en: "Try our chatbot",
    ms: "Cuba bot perbualan kami",
    zh: "试用我们的聊天机器人"
  },
  "hero.dashboard_title": {
    en: "AI-Powered Learning Dashboard",
    ms: "Papan Pemuka Pembelajaran Berkuasa AI",
    zh: "AI驱动的学习仪表板"
  },
  "hero.dashboard_subtitle": {
    en: "Personalized insights and intelligent assistance",
    ms: "Pandangan peribadi dan bantuan pintar",
    zh: "个性化见解和智能辅助"
  },

  // Features section
  "features.title": {
    en: "Learn Smarter",
    ms: "Belajar Lebih Pintar",
    zh: "更智能地学习"
  },
  "features.subtitle": {
    en: "Everything you need for effective learning",
    ms: "Semua yang anda perlukan untuk pembelajaran berkesan",
    zh: "高效学习所需的一切"
  },
  "features.description": {
    en: "Our Virtual Learning Assistant combines AI capabilities with proven educational methodologies to enhance your learning experience.",
    ms: "Pembantu Pembelajaran Maya kami menggabungkan keupayaan AI dengan metodologi pendidikan yang terbukti untuk meningkatkan pengalaman pembelajaran anda.",
    zh: "我们的虚拟学习助手将AI能力与成熟的教育方法相结合，提升您的学习体验。"
  },
  "features.dashboard": {
    en: "Dashboard",
    ms: "Papan Pemuka",
    zh: "仪表板"
  },
  "features.dashboard.description": {
    en: "Track your learning progress, view course completion statistics, and get personalized recommendations based on your learning patterns.",
    ms: "Jejaki kemajuan pembelajaran anda, lihat statistik penyelesaian kursus, dan dapatkan cadangan peribadi berdasarkan corak pembelajaran anda.",
    zh: "跟踪您的学习进度，查看课程完成统计，并根据您的学习模式获取个性化推荐。"
  },
  "features.chatbot": {
    en: "Chatbot Assistant",
    ms: "Pembantu Bot Perbualan",
    zh: "聊天机器人助手"
  },
  "features.chatbot.description": {
    en: "Get instant help with your questions using our AI-powered chatbot that understands context and provides relevant educational resources.",
    ms: "Dapatkan bantuan segera dengan soalan anda menggunakan bot perbualan berkuasa AI kami yang memahami konteks dan menyediakan sumber pendidikan yang relevan.",
    zh: "使用我们能够理解上下文并提供相关教育资源的AI聊天机器人，获得即时问题解答。"
  },
  "features.analytics": {
    en: "Learning Analytics",
    ms: "Analitik Pembelajaran",
    zh: "学习分析"
  },
  "features.analytics.description": {
    en: "Advanced analytics to understand your learning style, identify knowledge gaps, and optimize your study schedule for maximum retention.",
    ms: "Analitik lanjutan untuk memahami gaya pembelajaran anda, mengenal pasti jurang pengetahuan, dan mengoptimumkan jadual pembelajaran anda untuk pengekalan maksimum.",
    zh: "高级分析功能，理解您的学习风格，识别知识差距，并优化您的学习计划以获得最大记忆保留率。"
  },
  "features.learning_paths": {
    en: "Personalized Learning Paths",
    ms: "Laluan Pembelajaran Peribadi",
    zh: "个性化学习路径"
  },
  "features.learning_paths.description": {
    en: "Custom learning journeys based on your goals, current knowledge level, and preferred learning pace.",
    ms: "Perjalanan pembelajaran yang disesuaikan berdasarkan matlamat anda, tahap pengetahuan semasa, dan kadar pembelajaran pilihan anda.",
    zh: "基于您的目标、当前知识水平和偏好学习节奏的定制学习旅程。"
  },

  // Chatbot section
  "chatbot.title": {
    en: "Experience Our AI-Powered Chatbot",
    ms: "Alami Bot Perbualan Kami yang Dikuasakan oleh AI",
    zh: "体验我们的AI驱动聊天机器人"
  },
  "chatbot.subtitle": {
    en: "Get personalized assistance with your learning journey using our intelligent virtual assistant.",
    ms: "Dapatkan bantuan peribadi dalam perjalanan pembelajaran anda menggunakan pembantu maya pintar kami.",
    zh: "使用我们的智能虚拟助手获得个性化的学习旅程辅助。"
  },
  "chatbot.greeting": {
    en: "Hello! I'm your Virtual Learning Assistant. How can I help you today?",
    ms: "Halo! Saya Pembantu Pembelajaran Maya anda. Bagaimana saya boleh membantu anda hari ini?",
    zh: "您好！我是您的虚拟学习助手。今天我能为您提供什么帮助？"
  },
  "chatbot.placeholder": {
    en: "Ask anything...",
    ms: "Tanya apa sahaja...",
    zh: "问任何问题..."
  },
  "chatbot.send": {
    en: "Send",
    ms: "Hantar",
    zh: "发送"
  },
  "chatbot.error": {
    en: "Sorry, I encountered an error. Please try again or check your connection.",
    ms: "Maaf, saya mengalami ralat. Sila cuba lagi atau periksa sambungan anda.",
    zh: "抱歉，我遇到了错误。请重试或检查您的连接。"
  },
  "chatbot.disclaimer": {
    en: "Powered by Qwen-Max. VTeach AI may produce inaccurate information about people, places, or facts.",
    ms: "Dikuasakan oleh Qwen-Max. VTeach AI mungkin menghasilkan maklumat yang tidak tepat tentang orang, tempat, atau fakta.",
    zh: "由Qwen-Max提供支持。VTeach AI可能会产生关于人物、地点或事实的不准确信息。"
  },
  "chatbot.new_chat": {
    en: "New chat",
    ms: "Perbualan baharu",
    zh: "新对话"
  },
  "chatbot.today": {
    en: "Today",
    ms: "Hari ini",
    zh: "今天"
  },
  "chatbot.yesterday": {
    en: "Yesterday",
    ms: "Semalam",
    zh: "昨天"
  },
  "chatbot.try_full_experience": {
    en: "Try the full chatbot experience",
    ms: "Cuba pengalaman bot perbualan penuh",
    zh: "体验完整的聊天机器人功能"
  },
  "chatbot.placeholder_preview": {
    en: "Ask any learning question...",
    ms: "Tanya sebarang soalan pembelajaran...",
    zh: "提出任何学习问题..."
  },
  "chatbot.new_chat_title": {
    en: "New Conversation",
    ms: "Perbualan Baharu",
    zh: "新对话标题"
  },
  "chatbot.title_suffix": {
    en: "Chat",
    ms: "Perbualan",
    zh: "聊天"
  },
  "chatbot.error.api_fail": {
    en: "Failed to get response from AI.",
    ms: "Gagal mendapatkan respons daripada AI.",
    zh: "未能从AI获取响应。"
  },
  "chatbot.error.api_unsuccessful": {
    en: "API returned an unsuccessful response.",
    ms: "API mengembalikan respons yang tidak berjaya.",
    zh: "API返回了不成功的响应。"
  },
  "chatbot.error.generic": {
    en: "Something went wrong. Please try again.",
    ms: "Sesuatu telah berlaku. Sila cuba lagi.",
    zh: "发生错误。请重试。"
  },
  "chatbot.action.deep_research_suffix": {
    en: "Please perform deep research on this topic",
    ms: "Sila lakukan penyelidikan mendalam mengenai topik ini",
    zh: "请就此主题进行深入研究"
  },
  "chatbot.typing": {
    en: "Typing",
    ms: "Menaip",
    zh: "正在输入"
  },
  "chatbot.sending": {
    en: "Sending",
    ms: "Menghantar",
    zh: "发送中"
  },
  "chatbot.error_occurred": {
    en: "Error occurred",
    ms: "Ralat berlaku",
    zh: "发生错误"
  },

  // Login/Register
  "auth.login": {
    en: "Sign in to your account",
    ms: "Log masuk ke akaun anda",
    zh: "登录您的账户"
  },
  "auth.register": {
    en: "Create a new account",
    ms: "Cipta akaun baharu",
    zh: "创建新账户"
  },
  "auth.email": {
    en: "Email address",
    ms: "Alamat e-mel",
    zh: "电子邮件地址"
  },
  "auth.password": {
    en: "Password",
    ms: "Kata laluan",
    zh: "密码"
  },
  "auth.confirm_password": {
    en: "Confirm password",
    ms: "Sahkan kata laluan",
    zh: "确认密码"
  },
  "auth.remember_me": {
    en: "Remember me",
    ms: "Ingat saya",
    zh: "记住我"
  },
  "auth.forgot_password": {
    en: "Forgot your password?",
    ms: "Lupa kata laluan anda?",
    zh: "忘记密码？"
  },
  "auth.sign_in": {
    en: "Sign in",
    ms: "Log masuk",
    zh: "登录"
  },
  "auth.create_account": {
    en: "Create account",
    ms: "Cipta akaun",
    zh: "创建账户"
  },
  "auth.fullname": {
    en: "Full name",
    ms: "Nama penuh",
    zh: "全名"
  },
  "auth.agree_terms": {
    en: "I agree to the",
    ms: "Saya bersetuju dengan",
    zh: "我同意"
  },
  "auth.terms": {
    en: "Terms of Service",
    ms: "Terma Perkhidmatan",
    zh: "服务条款"
  },
  "auth.and": {
    en: "and",
    ms: "dan",
    zh: "和"
  },
  "auth.privacy": {
    en: "Privacy Policy",
    ms: "Dasar Privasi",
    zh: "隐私政策"
  },
  "auth.or": {
    en: "Or",
    ms: "Atau",
    zh: "或"
  },
  "auth.register_link": {
    en: "register for a new account",
    ms: "daftar untuk akaun baharu",
    zh: "注册新账户"
  },
  "auth.login_link": {
    en: "sign in to your existing account",
    ms: "log masuk ke akaun anda yang sedia ada",
    zh: "登录您的现有账户"
  },
  "auth.error.login_failed": {
    en: "Failed to login. Please check your credentials.",
    ms: "Gagal log masuk. Sila semak kelayakan anda.",
    zh: "登录失败。请检查您的凭据。"
  },
  "auth.email.placeholder": {
    en: "you@example.com",
    ms: "anda@contoh.com",
    zh: "you@example.com"
  },
  "auth.password.placeholder": {
    en: "Your password",
    ms: "Kata laluan anda",
    zh: "您的密码"
  },
  "auth.signing_in": {
    en: "Signing in...",
    ms: "Sedang log masuk...",
    zh: "登录中..."
  },
  "auth.error.password_mismatch": {
    en: "Passwords don't match",
    ms: "Kata laluan tidak sepadan",
    zh: "密码不匹配"
  },
  "auth.error.password_too_short": {
    en: "Password must be at least 6 characters long",
    ms: "Kata laluan mesti sekurang-kurangnya 6 aksara panjang",
    zh: "密码长度至少为6个字符"
  },
  "auth.error.registration_failed": {
    en: "Failed to create account. Please try again.",
    ms: "Gagal mencipta akaun. Sila cuba lagi.",
    zh: "创建帐户失败。请重试。"
  },
  "auth.fullname.placeholder": {
    en: "Your full name",
    ms: "Nama penuh anda",
    zh: "您的全名"
  },
  "auth.password.placeholder_new": {
    en: "Choose a password (min. 6 characters)",
    ms: "Pilih kata laluan (min. 6 aksara)",
    zh: "选择一个密码（最少6个字符）"
  },
  "auth.confirm_password.placeholder": {
    en: "Confirm your password",
    ms: "Sahkan kata laluan anda",
    zh: "确认您的密码"
  },
  "auth.creating_account": {
    en: "Creating account...",
    ms: "Sedang mencipta akaun...",
    zh: "正在创建帐户..."
  },

  // Dashboard
  "dashboard.welcome": {
    en: "Welcome back",
    ms: "Selamat kembali",
    zh: "欢迎回来"
  },
  "dashboard.overview": {
    en: "Here's an overview of your learning progress",
    ms: "Inilah gambaran keseluruhan kemajuan pembelajaran anda",
    zh: "以下是您的学习进度概览"
  },
  "dashboard.courses": {
    en: "Your Courses",
    ms: "Kursus Anda",
    zh: "您的课程"
  },
  "dashboard.course.math": {
    en: "Introduction to Mathematics",
    ms: "Pengenalan kepada Matematik",
    zh: "数学概论"
  },
  "dashboard.course.physics": {
    en: "Advanced Physics",
    ms: "Fizik Lanjutan",
    zh: "高等物理"
  },
  "dashboard.course.english": {
    en: "English Literature",
    ms: "Kesusasteraan Inggeris",
    zh: "英国文学"
  },
  "dashboard.course.compsci": {
    en: "Computer Science Basics",
    ms: "Asas Sains Komputer",
    zh: "计算机科学基础"
  },
  "dashboard.view_courses": {
    en: "View all courses",
    ms: "Lihat semua kursus",
    zh: "查看所有课程"
  },
  "dashboard.assignments": {
    en: "Upcoming Assignments",
    ms: "Tugasan Akan Datang",
    zh: "即将到来的作业"
  },
  "dashboard.assignment.math_quiz": {
    en: "Math Quiz",
    ms: "Kuiz Matematik",
    zh: "数学测验"
  },
  "dashboard.assignment.physics_report": {
    en: "Physics Lab Report",
    ms: "Laporan Makmal Fizik",
    zh: "物理实验报告"
  },
  "dashboard.assignment.essay": {
    en: "Essay Submission",
    ms: "Penghantaran Esei",
    zh: "论文提交"
  },
  "dashboard.due": {
    en: "Due",
    ms: "Tarikh akhir",
    zh: "截止日期"
  },
  "dashboard.due.tomorrow": {
    en: "Tomorrow",
    ms: "Esok",
    zh: "明天"
  },
  "dashboard.due.next_week": {
    en: "Next week",
    ms: "Minggu depan",
    zh: "下周"
  },
  "dashboard.due.in_3_days": {
    en: "In 3 days",
    ms: "Dalam 3 hari",
    zh: "3天内"
  },
  "dashboard.urgent": {
    en: "Urgent",
    ms: "Segera",
    zh: "紧急"
  },
  "dashboard.view_assignments": {
    en: "View all assignments",
    ms: "Lihat semua tugasan",
    zh: "查看所有作业"
  },
  "dashboard.recommendations": {
    en: "Study Recommendations",
    ms: "Cadangan Pembelajaran",
    zh: "学习建议"
  },
  "dashboard.recommendations.desc": {
    en: "Based on your learning patterns, we recommend focusing on these topics:",
    ms: "Berdasarkan corak pembelajaran anda, kami cadangkan untuk memberi tumpuan kepada topik-topik ini:",
    zh: "根据您的学习模式，我们建议您关注以下主题："
  },
  "dashboard.recommendation.algebra.title": {
    en: "Algebra Concepts",
    ms: "Konsep Algebra",
    zh: "代数概念"
  },
  "dashboard.recommendation.algebra.desc": {
    en: "Strengthen your understanding of core principles",
    ms: "Kukuhkan pemahaman anda tentang prinsip teras",
    zh: "加强对核心原则的理解"
  },
  "dashboard.recommendation.physics.title": {
    en: "Physics Formulas",
    ms: "Rumus Fizik",
    zh: "物理公式"
  },
  "dashboard.recommendation.physics.desc": {
    en: "Review key equations for your upcoming test",
    ms: "Kaji semula persamaan utama untuk ujian anda yang akan datang",
    zh: "复习即将到来的考试的关键方程式"
  },
  "dashboard.recommendation.essay.title": {
    en: "Essay Structure",
    ms: "Struktur Esei",
    zh: "论文结构"
  },
  "dashboard.recommendation.essay.desc": {
    en: "Practice organizing your writing more effectively",
    ms: "Berlatih menyusun penulisan anda dengan lebih berkesan",
    zh: "练习更有效地组织您的写作"
  },

  // Language selector
  "language.select": {
    en: "Language",
    ms: "Bahasa",
    zh: "语言"
  },
  "language.english": {
    en: "English",
    ms: "Bahasa Inggeris",
    zh: "英语"
  },
  "language.malay": {
    en: "Malay",
    ms: "Bahasa Melayu",
    zh: "马来语"
  },
  "language.chinese": {
    en: "Chinese",
    ms: "Bahasa Cina",
    zh: "中文"
  },
  "language.option.english": {
    en: "English",
    ms: "English",
    zh: "English"
  },
  "language.option.malay": {
    en: "Bahasa Melayu",
    ms: "Bahasa Melayu",
    zh: "Bahasa Melayu"
  },
  "language.option.chinese": {
    en: "中文",
    ms: "中文",
    zh: "中文"
  },

  // Footer
  "footer.terms": {
    en: "Terms",
    ms: "Terma",
    zh: "条款"
  },
  "footer.privacy": {
    en: "Privacy",
    ms: "Privasi",
    zh: "隐私"
  },
  "footer.faq": {
    en: "FAQ",
    ms: "Soalan Lazim",
    zh: "常见问题"
  },
  "footer.contact": {
    en: "Contact",
    ms: "Hubungi",
    zh: "联系我们"
  },
  "footer.copyright": {
    en: "Virtual Learning Assistant. All rights reserved.",
    ms: "Pembantu Pembelajaran Maya. Hak cipta terpelihara.",
    zh: "虚拟学习助手。保留所有权利。"
  },

  // Chatbot actions
  "action.search": {
    en: "Search",
    ms: "Cari",
    zh: "搜索"
  },
  "action.reason": {
    en: "Reason",
    ms: "Alasan",
    zh: "推理"
  },
  "action.deep_research": {
    en: "Deep research",
    ms: "Penyelidikan mendalam",
    zh: "深度研究"
  },
  "action.create_image": {
    en: "Create image",
    ms: "Cipta imej",
    zh: "创建图像"
  },

  // Note Page
  "note.title": {
    en: "My Notes & OCR",
    ms: "Nota Saya & OCR",
    zh: "我的笔记和OCR"
  },
  "note.subtitle": {
    en: "Extract text from images and keep your notes organized.",
    ms: "Ekstrak teks daripada imej dan susun nota anda.",
    zh: "从图像中提取文本并整理您的笔记。"
  },
  "note.ocr_section_title": {
    en: "Image OCR",
    ms: "OCR Imej",
    zh: "图像OCR"
  },
  "note.upload_label": {
    en: "Upload an image to extract text",
    ms: "Muat naik imej untuk ekstrak teks",
    zh: "上传图片以提取文本"
  },
  "note.selected_image": {
    en: "Selected image",
    ms: "Imej dipilih",
    zh: "已选图片"
  },
  "note.image_preview_alt": {
    en: "Image preview",
    ms: "Pratonton imej",
    zh: "图片预览"
  },
  "note.button_extract_text": {
    en: "Extract Text",
    ms: "Ekstrak Teks",
    zh: "提取文本"
  },
  "note.loading_ocr": {
    en: "Extracting text...",
    ms: "Mengekstrak teks...",
    zh: "正在提取文本..."
  },
  "note.extracted_text_title": {
    en: "Extracted Text",
    ms: "Teks Diekstrak",
    zh: "提取的文本"
  },
  "note.notes_section_title": {
    en: "My Notes",
    ms: "Nota Saya",
    zh: "我的笔记"
  },
  "note.placeholder_notes": {
    en: "Write your notes here...",
    ms: "Tulis nota anda di sini...",
    zh: "在此处写下您的笔记..."
  },
  "note.button_save_note": {
    en: "Save Note",
    ms: "Simpan Nota",
    zh: "保存笔记"
  },
  "note.error.no_image": {
    en: "Please select an image first.",
    ms: "Sila pilih imej dahulu.",
    zh: "请先选择一张图片。"
  },
  "note.error.ocr_failed": {
    en: "Failed to extract text from image. Please try again.",
    ms: "Gagal mengekstrak teks daripada imej. Sila cuba lagi.",
    zh: "无法从图像中提取文本。请重试。"
  },
  "note.ocr.mock_result_placeholder": {
    en: "Extracted text from {fileName} will appear here.",
    ms: "Teks yang diekstrak daripada {fileName} akan muncul di sini.",
    zh: "从 {fileName} 提取的文本将显示在此处。"
  },
  "note.save_success": {
    en: "Note saved successfully! (Logged to console for demo)",
    ms: "Nota berjaya disimpan! (Dicatat ke konsol untuk demo)",
    zh: "笔记保存成功！（已记录到控制台用于演示）"
  },
  "note.button_download_pdf": {
    en: "Download as PDF",
    ms: "Muat Turun sebagai PDF",
    zh: "下载为PDF"
  },
  "note.downloading_pdf": {
    en: "Downloading PDF...",
    ms: "Memuat turun PDF...",
    zh: "正在下载PDF..."
  },
  "note.error.pdf_generation_failed": {
    en: "Failed to generate PDF. Please try again.",
    ms: "Gagal menjana PDF. Sila cuba lagi.",
    zh: "生成PDF失败。请重试。"
  },
  "note.error.no_text_to_download": {
    en: "There is no extracted text to download.",
    ms: "Tiada teks yang diekstrak untuk dimuat turun.",
    zh: "没有提取的文本可供下载。"
  },
  "note.pdf_filename_label": {
    en: "PDF Filename:",
    ms: "Nama Fail PDF:",
    zh: "PDF 文件名："
  },
  "note.pdf_filename_placeholder": {
    en: "Enter desired PDF filename",
    ms: "Masukkan nama fail PDF yang diingini",
    zh: "输入所需的 PDF 文件名"
  },

  // Study Plan Page
  "study_plan.title": {
    en: "My Study Plan",
    ms: "Pelan Belajar Saya",
    zh: "我的学习计划"
  },
  "study_plan.subtitle": {
    en: "Organize your learning, track progress, and discover personalized activities.",
    ms: "Susun pembelajaran anda, jejak kemajuan, dan temui aktiviti yang diperibadikan.",
    zh: "组织您的学习，跟踪进度，发现个性化活动。"
  },
  "study_plan.learning_profile_title": {
    en: "Your Learning Profile",
    ms: "Profil Pembelajaran Anda",
    zh: "您的学习画像"
  },
  "study_plan.take_assessment_button": {
    en: "Take Learning Style Assessment",
    ms: "Ambil Penilaian Gaya Pembelajaran",
    zh: "进行学习风格评估"
  },
  "study_plan.assessment_placeholder": {
    en: "Complete the assessment to unlock your personalized learning style insights!",
    ms: "Lengkapkan penilaian untuk membuka wawasan gaya pembelajaran peribadi anda!",
    zh: "完成评估以解锁您的个性化学习风格洞察！"
  },
  "study_plan.todays_plan_title": {
    en: "Today's Plan",
    ms: "Pelan Hari Ini",
    zh: "今日计划"
  },
  "study_plan.task.visual_example": {
    en: "Watch: Concept Overview Video",
    ms: "Tonton: Video Gambaran Keseluruhan Konsep",
    zh: "观看：概念总览视频"
  },
  "study_plan.task.auditory_example": {
    en: "Listen: Chapter Summary Podcast",
    ms: "Dengar: Podcast Ringkasan Bab",
    zh: "收听：章节摘要播客"
  },
  "study_plan.task.reading_writing_example": {
    en: "Read: Article on Core Principles & Summarize",
    ms: "Baca: Artikel mengenai Prinsip Teras & Ringkaskan",
    zh: "阅读：核心原则文章并总结"
  },
  "study_plan.task.kinesthetic_example": {
    en: "Do: Interactive Quiz - Module 1",
    ms: "Lakukan: Kuiz Interaktif - Modul 1",
    zh: "实践：模块1互动测验"
  },
  "study_plan.week_ahead_title": {
    en: "Your Week Ahead",
    ms: "Minggu Anda Yang Akan Datang",
    zh: "未来一周安排"
  },
  "study_plan.style_balance_meter_title": {
    en: "Style Balance Meter",
    ms: "Meter Keseimbangan Gaya",
    zh: "学习风格平衡表"
  },
  "study_plan.style_balance_placeholder": {
    en: "Your learning style balance for the past week will be shown here.",
    ms: "Baki gaya pembelajaran anda untuk minggu lalu akan ditunjukkan di sini.",
    zh: "您过去一周的学习风格平衡将在此显示。"
  },
  "study_plan.generate_plan_title": {
    en: "Generate & Customize Your Plan",
    ms: "Jana & Suaikan Pelan Anda",
    zh: "生成并定制您的计划"
  },
  "study_plan.goal_oriented_label": {
    en: "I want to achieve a goal:",
    ms: "Saya ingin mencapai matlamat:",
    zh: "我想实现一个目标："
  },
  "study_plan.goal_placeholder": {
    en: "e.g., Pass exam in 2 weeks, Master Topic X",
    ms: "cth., Lulus peperiksaan dalam 2 minggu, Kuasai Topik X",
    zh: "例如，2周内通过考试，掌握X主题"
  },
  "study_plan.time_budget_label": {
    en: "My weekly study time budget:",
    ms: "Bajet masa belajar mingguan saya:",
    zh: "我的每周学习时间预算："
  },
  "study_plan.time_placeholder": {
    en: "e.g., 10 hours",
    ms: "cth., 10 jam",
    zh: "例如，10小时"
  },
  "study_plan.generate_button": {
    en: "Generate My Personalized Plan",
    ms: "Jana Pelan Peribadi Saya",
    zh: "生成我的个性化计划"
  },

  // Learning Style Assessment Page
  "nav.assessment": {
    en: "Learning Assessment",
    ms: "Penilaian Pembelajaran",
    zh: "学习评估"
  },
  "assessment.title": {
    en: "Learning Style Assessment",
    ms: "Penilaian Gaya Pembelajaran",
    zh: "学习风格评估"
  },
  "assessment.instructions": {
    en: "For each scenario, pick the option (A–D) that feels most 'you.' At the end you'll tally how many A's, B's, C's and D's you chose to compute your % profile in Visual (A), Auditory (B), Reading/Writing (C) and Kinesthetic (D).",
    ms: "Untuk setiap senario, pilih pilihan (A–D) yang paling 'anda.' Pada akhirnya anda akan mengira berapa banyak A, B, C, dan D yang anda pilih untuk mengira profil % anda dalam Visual (A), Auditori (B), Membaca/Menulis (C) dan Kinestetik (D).",
    zh: "对于每个场景，选择最符合您感觉的选项（A-D）。最后，统计您选择了多少个A、B、C和D，以计算您在视觉（A）、听觉（B）、读写（C）和动觉（D）方面的百分比。"
  },
  "assessment.calculate_button": {
    en: "Calculate My Profile",
    ms: "Kira Profil Saya",
    zh: "计算我的画像"
  },
  "assessment.reset_button": {
    en: "Reset Answers",
    ms: "Set Semula Jawapan",
    zh: "重置答案"
  },
  "assessment.results_title": {
    en: "Your Learning Style Profile",
    ms: "Profil Gaya Pembelajaran Anda",
    zh: "您的学习风格画像"
  },
  "assessment.style.visual": { en: "Visual", ms: "Visual", zh: "视觉型" },
  "assessment.style.auditory": { en: "Auditory", ms: "Auditori", zh: "听觉型" },
  "assessment.style.reading_writing": { en: "Reading/Writing", ms: "Membaca/Menulis", zh: "读写型" },
  "assessment.style.kinesthetic": { en: "Kinesthetic", ms: "Kinestetik", zh: "动觉型" },
  "assessment.dominant_style_message": {
    en: "Your dominant style is {style}. If two are close, you\'re likely a \"multi-modal\" learner!",
    ms: "Gaya dominan anda ialah {style}. Jika dua gaya hampir sama, anda mungkin pelajar \"pelbagai mod\"!",
    zh: "您的主导风格是 {style}。如果两种风格得分接近，您很可能是\"多模式\"学习者！"
  },
  "assessment.use_profile_message": {
    en: "Use this profile to guide the mix of activities in your personalized study plan.",
    ms: "Gunakan profil ini untuk memandu campuran aktiviti dalam pelan pembelajaran peribadi anda.",
    zh: "使用此画像来指导您个性化学习计划中的活动组合。"
  },
  "assessment.error.incomplete": {
    en: "Please answer all questions before calculating your profile.",
    ms: "Sila jawab semua soalan sebelum mengira profil anda.",
    zh: "在计算您的画像之前，请回答所有问题。"
  },
  // Questions & Options
  "assessment.q1.title": { 
    en: "When you encounter a brand-new topic, you prefer to…", 
    ms: "Apabila anda menghadapi topik baharu, anda lebih suka…", 
    zh: "当您遇到一个全新的主题时，您更喜欢…"
  },
  "assessment.q1.a": { en: "A. Watch a short infographic or diagram explaining the key ideas.", ms: "A. Tonton infografik ringkas atau rajah yang menerangkan idea utama.", zh: "A. 观看解释关键思想的简短信息图或图表。" },
  "assessment.q1.b": { en: "B. Listen to a quick podcast or lecture clip about it.", ms: "B. Dengar podcast ringkas atau klip kuliah mengenainya.", zh: "B. 收听关于该主题的简短播客或讲座片段。" },
  "assessment.q1.c": { en: "C. Read an overview article or textbook chapter.", ms: "C. Baca artikel gambaran keseluruhan atau bab buku teks.", zh: "C. 阅读概述文章或教科书章节。" },
  "assessment.q1.d": { en: "D. Jump in and do a small hands-on activity or experiment.", ms: "D. Terus lakukan aktiviti praktikal atau eksperimen kecil.", zh: "D. 立即参与并进行小型动手活动或实验。" },

  "assessment.q2.title": { 
    en: "To remember a set of vocabulary words, you would…", 
    ms: "Untuk mengingati satu set perkataan kosa kata, anda akan…", 
    zh: "为了记住一组词汇，您会…"
  },
  "assessment.q2.a": { en: "A. Create a color-coded mind-map linking words and images.", ms: "A. Buat peta minda berkod warna yang menghubungkan perkataan dan imej.", zh: "A. 创建一个颜色编码的思维导图，连接词语和图像。" },
  "assessment.q2.b": { en: "B. Record yourself saying each word and play it back.", ms: "B. Rakam diri anda menyebut setiap perkataan dan mainkannya semula.", zh: "B. 录下自己说每个单词并回放。" },
  "assessment.q2.c": { en: "C. Write each word and definition on flashcards.", ms: "C. Tulis setiap perkataan dan definisi pada kad imbas.", zh: "C. 在抽认卡上写下每个单词和定义。" },
  "assessment.q2.d": { en: "D. Act out each term or use role-play scenarios.", ms: "D. Lakonkan setiap istilah atau gunakan senario main peranan.", zh: "D. 表演出每个术语或使用角色扮演场景。" },

  "assessment.q3.title": { 
    en: "When solving a complex problem, you like to…", 
    ms: "Apabila menyelesaikan masalah yang kompleks, anda suka…", 
    zh: "在解决复杂问题时，您喜欢…"
  },
  "assessment.q3.a": { en: "A. Sketch a flowchart or diagram of the steps.", ms: "A. Lakarkan carta alir atau rajah langkah-langkahnya.", zh: "A. 绘制流程图或步骤图。" },
  "assessment.q3.b": { en: "B. Talk through the problem aloud (to yourself or a study partner).", ms: "B. Bincangkan masalah itu dengan lantang (kepada diri sendiri atau rakan belajar).", zh: "B. 大声讲出问题（对自己或学习伙伴）。" },
  "assessment.q3.c": { en: "C. Write out each step in a detailed, linear outline.", ms: "C. Tulis setiap langkah dalam rangka linear yang terperinci.", zh: "C. 用详细的线性大纲写出每个步骤。" },
  "assessment.q3.d": { en: "D. Manipulate physical objects (e.g., blocks, models) to understand it.", ms: "D. Manipulasi objek fizikal (cth., blok, model) untuk memahaminya.", zh: "D. 操作物理对象（例如积木、模型）来理解它。" },

  "assessment.q4.title": { 
    en: "You absorb new information best when it's presented as…", 
    ms: "Anda menyerap maklumat baharu dengan terbaik apabila ia dipersembahkan sebagai…", 
    zh: "当信息以下列方式呈现时，您吸收新信息的效果最好…"
  },
  "assessment.q4.a": { en: "A. A visually engaging slide or video with animations.", ms: "A. Slaid atau video yang menarik secara visual dengan animasi.", zh: "A. 带有动画的视觉吸引人的幻灯片或视频。" },
  "assessment.q4.b": { en: "B. A clear verbal explanation or discussion.", ms: "B. Penjelasan lisan atau perbincangan yang jelas.", zh: "B. 清晰的口头解释或讨论。" },
  "assessment.q4.c": { en: "C. Well-written text with bullet points and summaries.", ms: "C. Teks yang ditulis dengan baik dengan senarai berbutir dan ringkasan.", zh: "C. 文字清晰、带有项目符号和摘要的文本。" },
  "assessment.q4.d": { en: "D. A simulation, lab exercise, or real-world task.", ms: "D. Simulasi, latihan makmal, atau tugasan dunia sebenar.", zh: "D. 模拟、实验室练习或现实世界任务。" },

  "assessment.q5.title": { 
    en: "To study for an exam, you would most likely…", 
    ms: "Untuk belajar bagi peperiksaan, anda kemungkinan besar akan…", 
    zh: "为了准备考试，您最有可能…"
  },
  "assessment.q5.a": { en: "A. Review annotated diagrams and highlight key areas.", ms: "A. Semak rajah beranotasi dan serlahkan kawasan utama.", zh: "A. 查看带注释的图表并突出显示关键区域。" },
  "assessment.q5.b": { en: "B. Join a study-group discussion or use audio-recorded notes.", ms: "B. Sertai perbincangan kumpulan belajar atau gunakan nota yang dirakam audio.", zh: "B. 参加学习小组讨论或使用录音笔记。" },
  "assessment.q5.c": { en: "C. Rewrite your notes in your own words and review them.", ms: "C. Tulis semula nota anda dalam perkataan anda sendiri dan semaknya.", zh: "C. 用自己的话重写笔记并复习。" },
  "assessment.q5.d": { en: "D. Use practice kits, build models, or do sample problems by hand.", ms: "D. Gunakan kit latihan, bina model, atau selesaikan masalah contoh secara manual.", zh: "D. 使用练习工具包、构建模型或手动做例题。" },

  "assessment.q6.title": { 
    en: "When you need to clarify a tricky concept, you…", 
    ms: "Apabila anda perlu menjelaskan konsep yang rumit, anda…", 
    zh: "当您需要澄清一个棘手的概念时，您会…"
  },
  "assessment.q6.a": { en: "A. Draw it out on paper or use a concept-map tool.", ms: "A. Lukiskannya di atas kertas atau gunakan alat peta konsep.", zh: "A. 在纸上画出来或使用概念图工具。" },
  "assessment.q6.b": { en: "B. Call a friend and explain it to them verbally.", ms: "B. Hubungi rakan dan terangkannya kepada mereka secara lisan.", zh: "B.打电话给朋友并口头向他们解释。" },
  "assessment.q6.c": { en: "C. Look up multiple articles and take written notes.", ms: "C. Cari beberapa artikel dan ambil nota bertulis.", zh: "C. 查阅多篇文章并做书面笔记。" },
  "assessment.q6.d": { en: "D. Try to recreate the process yourself until it \"clicks.\"", ms: "D. Cuba cipta semula proses itu sendiri sehingga ia 'klik'.", zh: "D. 尝试自己重现该过程，直到\"理解\"为止。" },

  "assessment.q7.title": { 
    en: "Learning new procedures (e.g., software workflows) is easiest if you…", 
    ms: "Mempelajari prosedur baharu (cth., aliran kerja perisian) adalah paling mudah jika anda…", 
    zh: "如果您…学习新程序（例如软件工作流程）最容易："
  },
  "assessment.q7.a": { en: "A. Follow a step-by-step annotated screencast.", ms: "A. Ikuti tayangan skrin beranotasi langkah demi langkah.", zh: "A. 观看带注释的分步截屏视频。" },
  "assessment.q7.b": { en: "B. Listen to someone narrate the steps as they go.", ms: "B. Dengar seseorang menceritakan langkah-langkah semasa ia berlaku.", zh: "B. 听别人边操作边叙述步骤。" },
  "assessment.q7.c": { en: "C. Read a written tutorial or manual.", ms: "C. Baca tutorial bertulis atau manual.", zh: "C. 阅读书面教程或手册。" },
  "assessment.q7.d": { en: "D. Open the software and learn by clicking around.", ms: "D. Buka perisian dan belajar dengan mengklik di sekeliling.", zh: "D. 打开软件并通过实际点击来学习。" },

  "assessment.q8.title": { 
    en: "When reviewing lecture materials, you prefer…", 
    ms: "Apabila menyemak bahan kuliah, anda lebih suka…", 
    zh: "在复习讲座材料时，您更喜欢…"
  },
  "assessment.q8.a": { en: "A. Slide-decks with visuals and embedded charts.", ms: "A. Dek slaid dengan visual dan carta terbenam.", zh: "A. 带有视觉效果和嵌入式图表的幻灯片。" },
  "assessment.q8.b": { en: "B. Audio recordings of the lecture to replay.", ms: "B. Rakaman audio kuliah untuk dimainkan semula.", zh: "B. 可重播的讲座录音。" },
  "assessment.q8.c": { en: "C. Lecture transcripts or detailed handouts.", ms: "C. Transkrip kuliah atau edaran terperinci.", zh: "C. 讲座文字稿或详细讲义。" },
  "assessment.q8.d": { en: "D. In-class activities or lab assignments to reinforce.", ms: "D. Aktiviti dalam kelas atau tugasan makmal untuk mengukuhkan.", zh: "D. 通过课堂活动或实验作业来巩固。" },

  "assessment.q9.title": { 
    en: "To master a foreign-language phrase, you would…", 
    ms: "Untuk menguasai frasa bahasa asing, anda akan…", 
    zh: "为了掌握一个外语短语，您会…"
  },
  "assessment.q9.a": { en: "A. Watch a short video clip showing someone using it.", ms: "A. Tonton klip video pendek yang menunjukkan seseorang menggunakannya.", zh: "A. 观看某人使用该短语的短视频片段。" },
  "assessment.q9.b": { en: "B. Repeat it aloud and listen to a native speaker recording.", ms: "B. Ulanginya dengan lantang dan dengar rakaman penutur asli.", zh: "B. 大声重复并听母语人士的录音。" },
  "assessment.q9.c": { en: "C. Write it down multiple times and read it silently.", ms: "C. Tulisnya berulang kali dan bacanya secara senyap.", zh: "C. 多次写下来并默读。" },
  "assessment.q9.d": { en: "D. Use it in a real-life conversation or role-play.", ms: "D. Gunakannya dalam perbualan kehidupan sebenar atau main peranan.", zh: "D. 在现实生活对话或角色扮演中使用它。" },

  "assessment.q10.title": { 
    en: "At the end of a study session, you feel most satisfied if you…", 
    ms: "Pada akhir sesi belajar, anda berasa paling puas jika anda…", 
    zh: "在学习结束时，如果您…您会感到最满意："
  },
  "assessment.q10.a": { en: "A. See a completed diagram or chart summarizing what you learned.", ms: "A. Lihat rajah atau carta yang lengkap merumuskan apa yang anda pelajari.", zh: "A. 看到一个总结所学内容的完整图表。" },
  "assessment.q10.b": { en: "B. Can verbally teach the concept back to someone.", ms: "B. Boleh mengajar konsep itu semula kepada seseorang secara lisan.", zh: "B. 能够口头向别人复述这个概念。" },
  "assessment.q10.c": { en: "C. Have a neatly written set of notes and summaries.", ms: "C. Mempunyai set nota dan ringkasan yang ditulis dengan kemas.", zh: "C. 拥有一套整齐的书面笔记和摘要。" },
  "assessment.q10.d": { en: "D. Have built something or completed a hands-on exercise.", ms: "D. Telah membina sesuatu atau menyelesaikan latihan praktikal.", zh: "D. 完成了某项构建或动手练习。" }
};

export default translations; 