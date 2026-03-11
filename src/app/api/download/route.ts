import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, template } = body;

    if (!data || !template) {
      return NextResponse.json(
        { error: "Missing resume data or template" },
        { status: 400 }
      );
    }

    // For now, generate a simple HTML-to-PDF approach
    // In production, this would use @react-pdf/renderer server-side
    // or validate Stripe payment before generating

    const html = generateResumeHTML(data, template);
    
    // Return HTML that can be printed to PDF
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${data.personalInfo?.name || "resume"}_CV.html"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Error generating PDF. Please try again." },
      { status: 500 }
    );
  }
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  summary: string;
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    bullets: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
}

function generateResumeHTML(data: ResumeData, template: string): string {
  const { personalInfo, summary, experience, education, skills } = data;

  const templateColors: Record<string, { primary: string; accent: string }> = {
    Modern: { primary: "#4f7df5", accent: "#4f7df5" },
    Classic: { primary: "#1a1a1a", accent: "#1a1a1a" },
    Creative: { primary: "#9b59f5", accent: "#9b59f5" },
    Minimal: { primary: "#666", accent: "#999" },
  };

  const colors = templateColors[template] || templateColors.Modern;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.name} — CV</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      font-size: 11px;
      background: white;
    }
    
    .page {
      max-width: 21cm;
      min-height: 29.7cm;
      margin: 0 auto;
      padding: 40px 50px;
    }
    
    .header {
      border-bottom: 2px solid ${colors.primary};
      padding-bottom: 16px;
      margin-bottom: 20px;
      ${template === "Classic" ? "text-align: center;" : ""}
      ${template === "Creative" ? `background: linear-gradient(135deg, #4f7df5, #9b59f5); color: white; padding: 30px; margin: -40px -50px 20px; border: none;` : ""}
    }
    
    .header h1 {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      ${template === "Creative" ? "color: white;" : ""}
    }
    
    .contact {
      display: flex;
      gap: 12px;
      font-size: 10px;
      color: #666;
      flex-wrap: wrap;
      ${template === "Classic" ? "justify-content: center;" : ""}
      ${template === "Creative" ? "color: rgba(255,255,255,0.85);" : ""}
    }
    
    .contact span:not(:last-child)::after {
      content: '|';
      margin-left: 12px;
      color: #ddd;
    }
    
    .section {
      margin-bottom: 18px;
    }
    
    .section h2 {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: ${colors.primary};
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
      margin-bottom: 10px;
      ${template === "Minimal" ? "border-bottom: none; font-size: 11px;" : ""}
    }
    
    .entry {
      margin-bottom: 12px;
    }
    
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    
    .entry-header strong {
      font-size: 11.5px;
    }
    
    .entry-date {
      font-size: 10px;
      color: #888;
    }
    
    .entry-company {
      font-size: 10.5px;
      color: #666;
      margin-bottom: 4px;
    }
    
    .bullets p {
      font-size: 10.5px;
      color: #444;
      padding-left: 8px;
    }
    
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .skill {
      padding: 3px 10px;
      background: #f3f4f6;
      border-radius: 4px;
      font-size: 10px;
      color: #444;
    }
    
    @media print {
      body { font-size: 10px; }
      .page { padding: 20px 30px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>${personalInfo.name}</h1>
      <div class="contact">
        ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ""}
        ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ""}
        ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ""}
        ${personalInfo.linkedin ? `<span>${personalInfo.linkedin}</span>` : ""}
      </div>
    </div>

    ${summary ? `
    <div class="section">
      <h2>Resumen Profesional</h2>
      <p>${summary}</p>
    </div>
    ` : ""}

    ${experience.some(e => e.company) ? `
    <div class="section">
      <h2>Experiencia Laboral</h2>
      ${experience.filter(e => e.company).map(exp => `
      <div class="entry">
        <div class="entry-header">
          <strong>${exp.role}</strong>
          <span class="entry-date">${exp.startDate} — ${exp.current ? "Presente" : exp.endDate}</span>
        </div>
        <div class="entry-company">${exp.company}</div>
        ${exp.bullets ? `<div class="bullets">${exp.bullets.split("\n").map(line => `<p>${line}</p>`).join("")}</div>` : ""}
      </div>
      `).join("")}
    </div>
    ` : ""}

    ${education.some(e => e.institution) ? `
    <div class="section">
      <h2>Educación</h2>
      ${education.filter(e => e.institution).map(edu => `
      <div class="entry">
        <div class="entry-header">
          <strong>${edu.degree}${edu.field ? ` — ${edu.field}` : ""}</strong>
          <span class="entry-date">${edu.startDate} — ${edu.endDate}</span>
        </div>
        <div class="entry-company">${edu.institution}</div>
      </div>
      `).join("")}
    </div>
    ` : ""}

    ${skills.length > 0 ? `
    <div class="section">
      <h2>Habilidades</h2>
      <div class="skills-list">
        ${skills.map(s => `<span class="skill">${s}</span>`).join("")}
      </div>
    </div>
    ` : ""}
  </div>
  <script>window.onload = () => window.print();</script>
</body>
</html>`;
}
