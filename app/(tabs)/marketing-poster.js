import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';

export default function MarketingPoster() {
  const [isGenerating, setIsGenerating] = useState(false);

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>أكاديمية المهاجرين - Aprende Español</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
        
        body {
          font-family: 'Tajawal', Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
          line-height: 1.8;
          background-color: #f5f5f5;
        }
        
        .container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #1a5276, #2980b9);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        
        .header h1 {
          margin: 0;
          font-size: 2.8em;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .header p {
          margin: 0;
          font-size: 1.4em;
          opacity: 0.9;
        }
        
        .content {
          padding: 30px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section h2 {
          color: #1a5276;
          border-right: 5px solid #1a5276;
          padding-right: 15px;
          margin: 25px 0 15px 0;
        }
        
        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 25px 0;
          gap: 15px;
        }
        
        .feature {
          width: 48%;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-sizing: border-box;
          border-right: 4px solid #1a5276;
        }
        
        .feature h3 {
          color: #1a5276;
          margin-top: 0;
          font-size: 1.3em;
          margin-bottom: 10px;
        }
        
        .cta {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          text-align: center;
          padding: 30px 20px;
          margin: 40px 0;
          border-radius: 8px;
        }
        
        .cta h2 {
          margin: 0 0 15px 0;
          font-size: 1.8em;
        }
        
        .qr-code {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: inline-block;
        }
        
        .contact {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          margin: 30px 0;
          text-align: center;
          border-right: 4px solid #1a5276;
        }
        
        .contact h3 {
          color: #1a5276;
          margin-top: 0;
          font-size: 1.4em;
        }
        
        .contact p {
          margin: 10px 0;
          font-size: 1.1em;
        }
        
        .footer {
          background: #1a5276;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 0.9em;
        }
        
        .logo {
          max-width: 200px;
          margin: 0 auto 20px;
          display: block;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>أكاديمية المهاجرين</h1>
          <p>تعلم اللغة الإسبانية بسهولة - Aprende Español Fácilmente</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>🌟 مرحباً بكم في منصتنا التعليمية</h2>
            <p>نقدم لكم الحل الأمثل لتعلم اللغة الإسبانية بطريقة سهلة وسلسة تناسب جميع المستويات. من خلال منصتنا، يمكنك تعلم اللغة التي تحتاجها للتواصل بفعالية في إسبانيا.</p>
          </div>
          
          <div class="section">
            <h2>📱 مميزات التطبيق</h2>
            <div class="features">
              <div class="feature">
                <h3>دروس تفاعلية</h3>
                <p>تعلم من خلال دروس مصممة خصيصاً لاحتياجاتك اليومية</p>
              </div>
              
              <div class="feature">
                <h3>تمارين عملية</h3>
                <p>طوّر مهاراتك من خلال تمارين تفاعلية متنوعة</p>
              </div>
              
              <div class="feature">
                <h3>قاموس ناطق</h3>
                <p>استمع إلى النطق الصحيح للكلمات والعبارات</p>
              </div>
              
              <div class="feature">
                <h3>دروس فيديو</h3>
                <p>تعلم من خلال مقاطع فيديو تعليمية ممتعة</p>
              </div>
            </div>
          </div>
          
          <div class="cta">
            <h2>انضم إلينا اليوم!</h2>
            <p>سجل الآن وابدأ رحلتك في تعلم اللغة الإسبانية</p>
            <div class="qr-code">
              <p>📱 مسح رمز الاستجابة السريعة لتحميل التطبيق</p>
              <!-- Aquí puedes agregar una imagen de código QR -->
              <p style="color: #666; margin-top: 15px;">(مسح الكود أعلاه باستخدام كاميرا هاتفك)</p>
            </div>
          </div>
          
          <div class="section">
            <h2>📞 تواصل معنا</h2>
            <div class="contact">
              <h3>للاستفسارات والمزيد من المعلومات:</h3>
              <p>📱 <strong>هاتف:</strong> 665 666 288</p>
              <p>✉️ <strong>البريد الإلكتروني:</strong> info@academiadeinmigrantes.com</p>
              <p>🌐 <strong>الموقع الإلكتروني:</strong> www.academiadeinmigrantes.com</p>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>© 2025 أكاديمية المهاجرين. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const generatePdf = async () => {
    try {
      setIsGenerating(true);
      
      // Generar el PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
        width: 595,  // A4 width in points (210mm)
        height: 842, // A4 height in points (297mm)
      });
      
      // Compartir el PDF
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        UTI: 'com.adobe.pdf',
        dialogTitle: 'Compartir cartel promocional',
      });
      
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('Ocurrió un error al generar el PDF. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Cartel Promocional',
          headerShown: true,
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cartel Promocional</Text>
        <Text style={styles.subtitle}>Genera un PDF promocional para compartir con inmigrantes árabes</Text>
        
        <TouchableOpacity 
          style={[styles.button, isGenerating && styles.buttonDisabled]}
          onPress={generatePdf}
          disabled={isGenerating}
        >
          <Text style={styles.buttonText}>
            {isGenerating ? 'Generando PDF...' : 'Generar PDF'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Vista previa del cartel:</Text>
          <View style={styles.preview}>
            <Text style={styles.previewText}>
              Este es un cartel bilingüe (árabe/español) que incluye:
            </Text>
            <Text style={styles.previewBullet}>• Título atractivo en árabe y español</Text>
            <Text style={styles.previewBullet}>• Características principales de la aplicación</Text>
            <Text style={styles.previewBullet}>• Llamada a la acción clara</Text>
            <Text style={styles.previewBullet}>• Información de contacto</Text>
            <Text style={styles.previewBullet}>• Diseño responsivo y profesional</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a5276',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1a5276',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  previewContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a5276',
    marginBottom: 15,
    textAlign: 'center',
  },
  preview: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  previewText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  previewBullet: {
    fontSize: 15,
    color: '#444',
    marginLeft: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
});
