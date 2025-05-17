import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Initialize the OpenAI client with DashScope configuration
    const openai = new OpenAI({
      apiKey: process.env.DASHSCOPE_API_KEY || 'your_api_key_here', // Replace with your actual API key if not using env vars
      baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
    });

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