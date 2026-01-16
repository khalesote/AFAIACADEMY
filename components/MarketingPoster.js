import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const MarketingPoster = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Academia de Inmigrantes - Aprende Español Fácil</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        
        body {
          font-family: 'Roboto', Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333;
          line-height: 1.6;
        }
        
        .container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .header {
          background-color: #1a5276;
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        
        .header h1 {
          margin: 0;
          font-size: 2.5em;
          margin-bottom: 10px;
        }
        
        .header p {
          margin: 0;
          font-size: 1.2em;
          opacity: 0.9;
        }
        
        .content {
          padding: 30px;
          background: white;
        }
        
        .section {
          margin-bottom: 25px;
        }
        
        .section h2 {
          color: #1a5276;
          border-bottom: 2px solid #1a5276;
          padding-bottom: 5px;
          display: inline-block;
        }
        
        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 20px 0;
        }
        
        .feature {
          width: 48%;
          background: #f0f8ff;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 5px;
          box-sizing: border-box;
        }
        
        .feature h3 {
          color: #1a5276;
          margin-top: 0;
        }
        
        .cta {
          background-color: #e74c3c;
          color: white;
          text-align: center;
          padding: 20px;
          margin: 30px 0;
          border-radius: 5px;
        }
        
        .cta h2 {
          margin-top: 0;
        }
        
        .button {
          display: inline-block;
          background: #2ecc71;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 10px 5px;
          transition: background 0.3s;
        }
        
        .button:hover {
          background: #27ae60;
        }
        
        .contact {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
        
        .qr-code {
          text-align: center;
          margin: 20px 0;
        }
        
        .qr-code img {
          max-width: 200px;
          height: auto;
        }
        
        .footer {
          text-align: center;
          padding: 20px;
          background: #1a5276;
          color: white;
          border-radius: 0 0 8px 8px;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print {
            display: none;
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
            <h2>🌟 لماذا تختار أكاديميتنا؟</h2>
            <p>مرحباً بكم في منصتنا التعليمية المصممة خصيصاً للمهاجرين الناطقين باللغة العربية. نقدم لك طريقة سهلة وفعالة لتعلم اللغة الإسبانية مجاناً!</p>
          </div>
          
          <div class="features">
            <div class="feature">
              <h3>📱 تطبيق سهل الاستخدام</h3>
              <p>تعلم في أي وقت ومن أي مكان من خلال تطبيقنا المتنقل.</p>
            </div>
            
            <div class="feature">
              <h3>🎯 دروس عملية</h3>
              <p>دروس مصممة خصيصاً لاحتياجات المهاجرين في الحياة اليومية.</p>
            </div>
            
            <div class="feature">
              <h3>🔊 نطق سليم</h3>
              <p>استمع إلى النطق الصحيح للكلمات والعبارات.</p>
            </div>
            
            <div class="feature">
              <h3>📚 موارد مجانية</h3>
              <p>جميع المواد التعليمية متاحة مجاناً.</p>
            </div>
          </div>
          
          <div class="cta">
            <h2>انضم إلينا اليوم!</h2>
            <p>سجل الآن وابدأ رحلة تعلم اللغة الإسبانية</p>
            <div class="qr-code">
              <!-- Aquí puedes agregar un código QR que enlace a tu aplicación -->
              <p>مسح رمز الاستجابة السريعة لتحميل التطبيق</p>
              <!-- <img src="url_del_codigo_qr" alt="Descarga la App"> -->
            </div>
          </div>
          
          <div class="section">
            <h2>📞 اتصل بنا</h2>
            <div class="contact">
              <p>للمزيد من المعلومات، لا تتردد في الاتصال بنا:</p>
              <p>📱 <strong>هاتف:</strong> 665 666 288</p>
              <p>🌐 <strong>الموقع الإلكتروني:</strong> www.academiadeinmigrantes.com</p>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>© 2025 Academia de Inmigrantes. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const printToFile = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });
      
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={printToFile}>
        <Text style={styles.buttonText}>Descargar Cartel en PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#1a5276',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MarketingPoster;
