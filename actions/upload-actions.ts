'use server';

import { generatePdfSummaryWithRetry } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";

export async function generatePdfSummary(uploadResponse :[{
  serverData: {
    userId: string;
    file: {
      url: string;
      name:string;
    }
  }
}]) {
  if(!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    }
  }

  const {
    serverData: {
      userId,
      file: {url: pdfurl, name: fileName},
    }
  } = uploadResponse[0];

  if(!pdfurl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    }
  }

  let summary;
  try {
    const pdfText = await fetchAndExtractPdfText(pdfurl);
    console.log({pdfText})
    try{
      summary = await generatePdfSummaryWithRetry(pdfText)
      console.log({summary})
    } catch (error) {
      console.log(error)
    }

    if(!summary) {          
      return {
        success: false,
        message: 'File to generate summary',
        data: null,
      }
    }
  } catch(error) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    }
  }
}