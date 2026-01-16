const fs = require('fs');
const path = require('path');

async function main() {
  const inputPath = process.argv[2];
  const outputPathArg = process.argv[3];

  if (!inputPath) {
    console.error('Uso: node scripts/extractPdfText.js <ruta_al_pdf> [ruta_salida_txt]');
    process.exit(1);
  }

  let pdf;
  try {
    const imported = require('pdf-parse');
    const candidates = [
      imported,
      imported && imported.default,
      imported && imported.pdfParse,
      imported && imported.pdf,
      imported && imported.parse,
    ];
    pdf = candidates.find((c) => typeof c === 'function');

    if (typeof pdf !== 'function') {
      const keys = imported && typeof imported === 'object' ? Object.keys(imported) : [];
      console.error('No se pudo resolver la función de pdf-parse.');
      console.error(`Tipo del módulo: ${typeof imported}`);
      console.error(`Claves exportadas: ${keys.join(', ') || '(ninguna)'}`);
      console.error(
        'Sugerencia: prueba instalando una versión compatible: cmd /c npm i pdf-parse@1.1.1'
      );
      process.exit(1);
    }
  } catch (e) {
    console.error(
      'Falta la dependencia "pdf-parse". Instálala con: npm i pdf-parse\n' +
        'Luego vuelve a ejecutar este script.'
    );
    process.exit(1);
  }

  const resolvedInput = path.resolve(inputPath);
  if (!fs.existsSync(resolvedInput)) {
    console.error(`No existe el archivo: ${resolvedInput}`);
    process.exit(1);
  }

  const defaultOutput = resolvedInput.replace(/\.pdf$/i, '.txt');
  const resolvedOutput = path.resolve(outputPathArg || defaultOutput);

  const dataBuffer = fs.readFileSync(resolvedInput);
  const data = await pdf(dataBuffer);

  const extractedText = (data && data.text ? data.text : '').toString();
  fs.writeFileSync(resolvedOutput, extractedText, 'utf8');

  const trimmed = extractedText.replace(/\s+/g, ' ').trim();
  if (!trimmed) {
    console.warn(
      'AVISO: El PDF no devolvió texto. Puede ser un PDF escaneado (imagen) y necesitar OCR.'
    );
  }

  const pages = data && typeof data.numpages === 'number' ? data.numpages : '¿?';
  console.log(`OK: texto extraído a ${resolvedOutput} (páginas: ${pages})`);
}

main().catch((err) => {
  console.error('Error extrayendo texto del PDF:', err);
  process.exit(1);
});
