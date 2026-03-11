import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Basic text extraction (removing tags)
    // In a real app, you'd use a more robust parser like cheerio
    const cleanText = html
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
      .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return NextResponse.json({ 
      success: true, 
      text: cleanText.substring(0, 5000) // Limit for MVP
    });
  } catch (error: any) {
    console.error("/// CRAWL API ERROR ///");
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
