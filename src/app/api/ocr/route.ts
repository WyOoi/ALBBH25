import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Path to the Python script - adjust if you place it elsewhere
const PYTHON_SCRIPT_PATH = path.resolve(process.cwd(), 'scripts', 'ocr_processor.py');
// Command to execute Python - might be 'python3' on some systems
const PYTHON_COMMAND = 'python'; 

async function performOcrWithPython(imagePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Log the paths for debugging
    console.log(`[OCR API] Current Working Directory (process.cwd()): ${process.cwd()}`);
    console.log(`[OCR API] Resolved PYTHON_SCRIPT_PATH: ${PYTHON_SCRIPT_PATH}`);
    console.log(`[OCR API] Attempting to execute: ${PYTHON_COMMAND} ${PYTHON_SCRIPT_PATH} ${imagePath}`);

    const pythonProcess = spawn(PYTHON_COMMAND, [PYTHON_SCRIPT_PATH, imagePath]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdoutData);
          resolve(result);
        } catch (parseError) {
          console.error('Python script stdout JSON parse error:', parseError);
          console.error('Python script stdout raw:', stdoutData);
          console.error('Python script stderr raw:', stderrData);
          reject(new Error('Failed to parse OCR result from Python script.'));
        }
      } else {
        console.error(`Python script exited with code ${code}`);
        console.error('Python script stderr:', stderrData);
        console.error('Python script stdout (if any on error):', stdoutData);
        try {
          // Try to parse stderr as JSON if it contains an error message from the script
          const errorResult = JSON.parse(stderrData);
          reject(new Error(errorResult.error || 'Python script execution failed.'));
        } catch (e) {
          reject(new Error(stderrData || 'Python script execution failed.'));
        }
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('Failed to start Python subprocess.', err);
      reject(new Error('Failed to start OCR process.'));
    });
  });
}

export async function POST(request: NextRequest) {
  let tempImagePath = '';
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ success: false, error: 'No image file provided.' }, { status: 400 });
    }

    // Create a temporary file to store the image
    const imageBuffer = await imageFile.arrayBuffer();
    const tempDir = path.join(os.tmpdir(), 'vteach_ocr');
    await fs.mkdir(tempDir, { recursive: true }); // Ensure temp directory exists
    tempImagePath = path.join(tempDir, `${Date.now()}-${imageFile.name}`);
    await fs.writeFile(tempImagePath, Buffer.from(imageBuffer));

    // Perform OCR using the Python script
    const extractedResult = await performOcrWithPython(tempImagePath);

    // The Python script now returns an array of objects with text, confidence, bbox
    // For simplicity, let's concatenate the text fields for now.
    // You might want to process this array more sophisticatedly on the frontend.
    const concatenatedText = (extractedResult && Array.isArray(extractedResult)) 
        ? extractedResult.map((line: any) => line.text).join('\n') 
        : 'No text extracted or unexpected format.';

    return NextResponse.json({ success: true, text: concatenatedText, rawResult: extractedResult });

  } catch (error) {
    console.error('[OCR API Route Error]:', error);
    let errorMessage = 'An unknown error occurred during OCR processing.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  } finally {
    // Clean up the temporary file
    if (tempImagePath) {
      try {
        await fs.unlink(tempImagePath);
      } catch (cleanupError) {
        console.error('Error deleting temporary image file:', cleanupError);
      }
    }
  }
} 