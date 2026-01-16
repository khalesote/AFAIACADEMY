import { DefaultResumeData } from "./defaultResumeData";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderList = (items: string[]) =>
  items
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<li>${esc(item)}</li>`)
    .join("");

const renderExperiences = (experiences: DefaultResumeData["experiences"]) =>
  experiences
    .map((exp) => {
      const content = [
        `<div class="item-header">
            <span class="item-period">${esc(exp.startDate || "")} - ${esc(exp.endDate || "Actualidad")}</span>
            <span class="item-occupation">${esc(exp.occupation)}</span>
          </div>`,
        exp.company ? `<p class="item-company">${esc(exp.company)}</p>` : "",
        exp.responsibilities ? `<p>${esc(exp.responsibilities)}</p>` : "",
      ]
        .join("")
        .trim();

      if (!content) return "";
      return `<div class="item">${content}</div>`;
    })
    .filter(Boolean)
    .join("<hr class=\"divider\" />");

const renderEducation = (education: DefaultResumeData["education"]) =>
  education
    .map((edu) => {
      if (!edu.diploma && !edu.institution) {
        return "";
      }
      return `<div class="item">
        <div class="item-header">
          <span class="item-period">${esc(edu.startDate || "")} - ${esc(edu.endDate || "")}</span>
          <span class="item-occupation">${esc(edu.diploma)}</span>
        </div>
        ${edu.institution ? `<p class="item-company">${esc(edu.institution)}</p>` : ""}
      </div>`;
    })
    .filter(Boolean)
    .join("<hr class=\"divider\" />");

export const generateCvHtml = (data: DefaultResumeData) => {
  const photoBlock = data.personal.photoDataUrl
    ? `<div class="photo"><img src="${data.personal.photoDataUrl.replace(/"/g, "'")}" alt="Foto profesional" /></div>`
    : "";

  const skillsBlock = data.skills.length
    ? `<div class="section">
        <h2>Habilidades clave</h2>
        <ul class="list">
          ${renderList(data.skills)}
        </ul>
      </div>`
    : "";

  const languagesBlock = data.languages.length
    ? `<div class="section">
        <h2>Idiomas</h2>
        <table class="languages-table">
          <thead>
            <tr>
              <th>Idioma</th>
              <th>Nivel (MCER)</th>
            </tr>
          </thead>
          <tbody>
            ${data.languages
              .map(
                (lang) => `
                  <tr>
                    <td>${esc(lang.language)}</td>
                    <td>${esc(lang.level)}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>`
    : "";

  const experiencesBlock = renderExperiences(data.experiences);
  const educationBlock = renderEducation(data.education);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Currículum Vitae</title>
<style>
  @page { margin: 28px; }
  body {
    font-family: 'Open Sans', Arial, sans-serif;
    color: #1f2933;
    font-size: 12px;
    background-color: ${data.personal.backgroundColor};
  }
  .wrapper {
    background-color: #fff;
    border-radius: 18px;
    border: 1px solid #dbe2ef;
    overflow: hidden;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #1f4f8b;
    color: #fff;
    padding: 20px 28px;
  }
  .header-info h1 {
    font-size: 24px;
    margin: 0 0 4px;
  }
  .header-info p {
    margin: 2px 0;
  }
  .photo {
    width: 110px;
    height: 140px;
    overflow: hidden;
    border-radius: 12px;
    background-color: rgba(255,255,255,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    padding: 24px 28px;
  }
  .section {
    margin-bottom: 24px;
  }
  .section h2 {
    font-size: 16px;
    color: #1f4f8b;
    border-bottom: 2px solid #dbe2ef;
    padding-bottom: 4px;
    margin-bottom: 12px;
  }
  .item {
    margin-bottom: 12px;
  }
  .item-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: #1f4f8b;
  }
  .item-period {
    font-size: 12px;
    color: #344560;
  }
  .item-company {
    font-weight: 600;
    color: #2f3e4d;
    margin: 4px 0;
  }
  .divider {
    border: 0;
    border-top: 1px solid #e2e8f5;
    margin: 12px 0;
  }
  .list {
    margin: 0;
    padding-left: 18px;
  }
  .list li {
    margin-bottom: 4px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #cbd4e2;
    padding: 6px 10px;
    text-align: left;
  }
  th {
    background-color: #eef3fb;
    color: #1f4f8b;
  }
  .contact {
    margin-top: 8px;
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="header-info">
        <h1>${esc(data.personal.fullName)}</h1>
        <p>${esc(data.personal.desiredPosition)}</p>
        <p>${esc(data.personal.headline)}</p>
        <div class="contact">
          <p>${esc(data.personal.email)} | ${esc(data.personal.phone)}</p>
          <p>${esc(data.personal.address)}</p>
          <p>${esc(data.personal.nationality)} | Nacimiento: ${esc(data.personal.dateOfBirth)}</p>
        </div>
      </div>
      ${photoBlock}
    </div>
    <div class="content">
      ${experiencesBlock ? `<div class="section"><h2>Experiencia profesional</h2>${experiencesBlock}</div>` : ""}
      ${educationBlock ? `<div class="section"><h2>Formación académica</h2>${educationBlock}</div>` : ""}
      ${skillsBlock}
      ${languagesBlock}
    </div>
  </div>
</body>
</html>`;
};
