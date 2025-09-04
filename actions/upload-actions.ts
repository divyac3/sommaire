'use server';

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

  try {
    const pdfText = await fetchAndExtractPdfText(pdfurl);
    console.log({pdfText})
  } catch(error) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    }
  }
}