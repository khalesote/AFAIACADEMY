const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');

const title = 'معلومات صادقة حول إمكانية التسوية الجماعية للمهاجرين في إسبانيا';

const paragraphs = [
  'الفترة: من أبريل 2026 حتى 30 يونيو 2026.',
  'حتى الآن أعلنت الحكومة فقط نيتها، ولم يُنشر بعد المرسوم الملكي النهائي، مما يعني أنه قابل للتغيير أو التعديل قبل الإطلاق.',
  'وفقاً لمسوّدة المرسوم، تُطلب الوثائق التالية:',
];

const docRequirements = [
  'جواز سفر يشمل جميع الصفحات ولو دون أختام.',
  'شهادة قيد تاريخي أو أدلة على الإقامة في إسبانيا (تقارير طبية، فواتير، وغيرها) لمدة لا تقل عن خمسة أشهر قبل التقديم.',
  'شهادة السوابق الجنائية من بلد الأصل ومن أي بلد آخر أقمت فيه خلال السنوات الخمس السابقة لدخول إسبانيا.',
  'لا يُطلب استخراج شهادة سوابق جنائية من إسبانيا.',
  'يمكن إدراج الأطفال القُصّر أو ذوي الإعاقة، وكذلك أفراد الأسرة المستحقين.',
];

const extraParagraphs = [
  'يسري ذلك أيضاً على طالبي الحماية الدولية الذين قدّموا طلب اللجوء قبل 31 ديسمبر 2025، دون اشتراط إقامة لا تقل عن خمسة أشهر.',
  'سيُمنح تصريح إقامة وعمل لمدة عام واحد، وخلال معالجة الملف سيصدر تصريح عمل مؤقت.',
  'للمزيد من المعلومات أو لبدء تجهيز ملفك، أرسل وثائقك إلى العنوان المذكور.',
];

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({ text: title, heading: HeadingLevel.HEADING_1 }),
        ...paragraphs.map((text) => new Paragraph({ text })),
        ...docRequirements.map((text) => new Paragraph({ text, bullet: { level: 0 } })),
        ...extraParagraphs.map((text) => new Paragraph({ text })),
      ],
    },
  ],
});

const outputPath = 'Informacion_regularizacion_ar_lat.docx';

Packer.toBuffer(doc)
  .then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    console.log('Documento generado en', outputPath);
  })
  .catch((error) => {
    console.error('Error generando DOCX:', error);
    process.exit(1);
  });
