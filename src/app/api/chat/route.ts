import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// WARNING: Hardcoding API keys is not recommended due to security risks.
// It is better to use environment variables (.env.local).
const HARDCODED_API_KEY = "sk-6bc7400b50e84aafa5b1385e7690d6cb"; // Replace with your actual API key

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Initialize the OpenAI client with DashScope configuration
    const openai = new OpenAI({
      apiKey: HARDCODED_API_KEY, // Using the hardcoded API key
      baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
    });

    // Check if API key is present (even if hardcoded, it's a basic check)
    if (!openai.apiKey) {
      console.error('API_KEY is not set directly in the code.'); // Updated error message
      return NextResponse.json({ 
        error: "API key is not configured in the source code.", // Updated error message
        success: false 
      }, { status: 500 });
    }

    // Call the Qwen model through DashScope
    const completion = await openai.chat.completions.create({
      model: "qwen-max", // Qwen model
      messages: [
        { role: "system", content: "You are a helpful virtual learning assistant. You provide clear, accurate, and educational responses to help students learn." },
        ...messages
      ],
    });

    // Return the response
    return NextResponse.json({ 
      message: completion.choices[0].message.content,
      success: true 
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: `Error: ${error.message || 'Unknown error'}`,
      success: false 
    }, { status: 500 });
  }
} 