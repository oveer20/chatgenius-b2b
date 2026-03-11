import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

/* ============================================
   Prompt Templates
   ============================================ */

export function buildSummaryPrompt(data: {
  name: string;
  role: string;
  experience: string;
}) {
  return `You are a professional resume writer. Write a compelling 2-3 sentence professional summary for:
Name: ${data.name}
Target Role: ${data.role}
Experience Description: ${data.experience}

Requirements:
- Use first person implied (no "I")
- Include years of experience if mentioned
- Highlight key strengths and value proposition
- ATS-friendly language with relevant keywords
- Professional but engaging tone
- Maximum 50 words

Return ONLY the summary text, no quotes or labels.`;
}

export function buildExperiencePrompt(data: {
  company: string;
  role: string;
  description: string;
}) {
  return `You are a professional resume writer. Transform this work experience into 3-4 powerful bullet points:

Company: ${data.company}
Role: ${data.role}
Description: ${data.description}

Requirements:
- Start each bullet with a strong action verb
- Include quantifiable results where possible (use realistic estimates if none given)
- ATS-optimized keywords
- Each bullet 15-25 words
- Focus on impact and achievements, not just duties

Return ONLY the bullet points, one per line, starting with "•". No other text.`;
}

export function buildSkillsPrompt(data: {
  role: string;
  experience: string;
}) {
  return `Based on this professional profile, suggest 8-12 relevant skills:

Target Role: ${data.role}
Background: ${data.experience}

Requirements:
- Mix of hard/technical and soft skills
- Relevant to the target role and industry
- ATS-friendly terminology
- Order by relevance

Return ONLY a comma-separated list of skills. No other text.`;
}
