import { SUMMARY_SYSYTEM_PROMPT } from '@/utils/prompts';
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generatePdfSummaryFromGemini = async(pdftext: string) => {
  try{
    const model = genAI.getGenerativeModel ({ model: 'gemini-1.5-flash', generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
    }});

    const prompt = {
      contents: [
        {
          role: 'user',
          parts:[
            {text: SUMMARY_SYSYTEM_PROMPT},
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdftext}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = await result.response;

    if(!response.text()) {
      throw new Error('Empty response from Gemini API')
    }
    return response.text();

  } catch (error : any ) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generatePdfSummaryWithRetry = async (pdftext: string, retries = 3, delayMs = 15000): Promise<string> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await generatePdfSummaryFromGemini(pdftext);
    } catch (error: any) {
      if (error?.status === 429 || error?.message?.includes('RATE_LIMIT')) {
        if (attempt < retries - 1) {
          console.warn(`Rate limit hit. Retrying in ${delayMs / 1000} seconds... (attempt ${attempt + 1})`);
          await wait(delayMs);
          continue;
        } else {
          console.error("All retry attempts exhausted.");
        }
      }
      throw error;
    }
  }

  throw new Error("Failed after multiple retry attempts.");
};
