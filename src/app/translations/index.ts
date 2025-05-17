import { Language } from '../contexts/LanguageContext';

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
};

export default translations; 