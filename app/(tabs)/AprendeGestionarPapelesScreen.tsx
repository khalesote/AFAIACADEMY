import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AprendeGestionarPapelesScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#2c3e50" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Aprende a gestionar tus papeles administrativos</Text>
      <TouchableOpacity
        style={{backgroundColor:'#388e3c', padding:14, borderRadius:16, alignItems:'center', marginBottom:16, marginTop:6}}
        onPress={() => router.push('/(tabs)/ComunidadInfoScreen')}
      >
        <Text style={{color:'#fff', fontWeight:'bold', fontSize:16, textAlign:'center'}}>
          Administraciones, Organizaciones y Centros de Acogida
        </Text>
        <Text style={{color:'#fff', fontWeight:'bold', fontSize:16, textAlign:'center'}}>
          إدارات، منظمات ومراكز الإيواء
        </Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={styles.scrollContent}>
        {/* Bloque destacado: Carpeta Ciudadana */}

        {/* Trámites de extranjería */}
        <View style={styles.adminCard}>
          <Text style={styles.adminTitle}>Trámites de Extranjería (NIE, Empadronamiento, etc.)</Text>
          <Text style={styles.adminTitleAr}>إجراءات الأجانب (NIE، التسجيل في البلدية، ...)</Text>
          <Text style={styles.adminFunc}>• Cómo solicitar el NIE, renovar residencia y empadronarse.</Text>
          <Text style={styles.adminFuncAr}>• كيفية طلب NIE، تجديد الإقامة والتسجيل في البلدية.</Text>
          <Text style={styles.adminFunc}>• Información oficial: <Text style={{color:'#1976d2'}} onPress={() => {}}>https://extranjeros.inclusion.gob.es/</Text></Text>
        </View>

        {/* Solicitud de cita previa */}
        <View style={styles.adminCard}>
          <Text style={styles.adminTitle}>Solicitud de Cita Previa</Text>
          <Text style={styles.adminTitleAr}>طلب موعد مسبق</Text>
          <Text style={styles.adminFunc}>• Portal de cita previa para trámites de extranjería y documentos.</Text>
          <Text style={styles.adminFuncAr}>• بوابة حجز المواعيد لإجراءات الأجانب والوثائق.</Text>
          <Text style={styles.adminFunc}>• Solicita tu cita: <Text style={{color:'#1976d2'}} onPress={() => {}}>https://sede.administracionespublicas.gob.es/icpplus/</Text></Text>
        </View>

        {/* Descarga de formularios */}
        <View style={styles.adminCard}>
          <Text style={styles.adminTitle}>Descarga de Formularios Oficiales</Text>
          <Text style={styles.adminTitleAr}>تحميل النماذج الرسمية</Text>
          <Text style={styles.adminFunc}>• Encuentra y descarga los formularios necesarios para tus trámites.</Text>
          <Text style={styles.adminFuncAr}>• ابحث وحمّل النماذج اللازمة لإجراءاتك.</Text>
          <Text style={styles.adminFunc}>• Formularios: <Text style={{color:'#1976d2'}} onPress={() => {}}>https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/</Text></Text>
        </View>

        {/* Enlaces oficiales útiles */}
        <View style={styles.adminCard}>
          <Text style={styles.adminTitle}>Enlaces Oficiales Útiles</Text>
          <Text style={styles.adminTitleAr}>روابط رسمية مفيدة</Text>
          <Text style={styles.adminFunc}>• Carpeta Ciudadana: <Text style={{color:'#1976d2'}} onPress={() => {}}>https://carpetaciudadana.gob.es</Text></Text>
          <Text style={styles.adminFunc}>• Sede Electrónica: <Text style={{color:'#1976d2'}} onPress={() => {}}>https://sede.administracionespublicas.gob.es</Text></Text>
        </View>

        {/* Preguntas frecuentes */}
        <View style={styles.adminCard}>
          <Text style={styles.adminTitle}>Preguntas Frecuentes (FAQ)</Text>
          <Text style={styles.adminTitleAr}>أسئلة شائعة</Text>
          <Text style={styles.adminFunc}>• ¿Qué documentos necesito para empadronarme?</Text>
          <Text style={styles.adminFuncAr}>• ما هي الوثائق المطلوبة للتسجيل في البلدية؟</Text>
          <Text style={styles.adminFunc}>• ¿Cómo puedo renovar mi tarjeta de residencia?</Text>
          <Text style={styles.adminFuncAr}>• كيف يمكنني تجديد بطاقة الإقامة؟</Text>
        </View>

        {/* Contacto con la administración */}
        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>Contacto con la Administración</Text>
          <Text style={styles.contactInfo}>• Teléfono de información: 060</Text>
          <Text style={styles.contactInfo}>• Portal de atención: <Text style={{color:'#1976d2'}} onPress={() => {}}>https://administracion.gob.es</Text></Text>
        </View>

        <View
          style={{
            backgroundColor: "#fffde7",
            borderColor: "#fbc02d",
            borderWidth: 2,
            borderRadius: 12,
            padding: 18,
            marginBottom: 22,
            shadowColor: "#000",
            shadowOpacity: 0.07,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="folder-open-outline"
              size={30}
              color="#fbc02d"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#b8860b" }}>
              ¿Qué es la Carpeta Ciudadana?
            </Text>
          </View>
          {/* Español */}
          <Text style={{ fontSize: 16, color: '#444', marginBottom: 4 }}>
            La <Text style={{ fontWeight: 'bold', color: '#1976d2' }}>Carpeta Ciudadana</Text> es
            una plataforma oficial del Gobierno de España que centraliza tus trámites,
            notificaciones y documentos con la administración pública. Es tu ""ventanilla única""
            digital para acceder a información y servicios de forma segura.
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 15,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#1976d2' }}>حقيبة المواطن</Text> هي منصة
            رسمية من حكومة إسبانيا تجمع معاملاتك وإشعاراتك ووثائقك مع الإدارة العامة. إنها "شباكك
            الموحد" الرقمي للوصول إلى المعلومات والخدمات بأمان.
          </Text>
          {/* Español */}
          <Text style={{ fontSize: 15, color: '#333', marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>"¿Por qué es importante?"</Text> Porque te permite:
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 14,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>"لماذا هي مهمة؟"</Text> لأنها تتيح لك:
          </Text>
          <View style={{ marginLeft: 10, marginBottom: 8 }}>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Consultar el estado de tus trámites (por ejemplo: nacionalidad, residencia,
              ayudas...)
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • متابعة حالة معاملاتك (مثال: الجنسية، الإقامة، المساعدات...)
            </Text>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Descargar notificaciones oficiales y documentos importantes
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • تحميل الإشعارات الرسمية والوثائق الهامة
            </Text>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Recibir avisos sobre plazos, renovaciones o citas pendientes
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • استقبال تنبيهات حول المواعيد النهائية أو التجديدات أو المواعيد القادمة
            </Text>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Acceder a servicios de distintas administraciones (Seguridad Social, DGT,
              Hacienda...)
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • الوصول إلى خدمات إدارات مختلفة (الضمان الاجتماعي، المرور، الضرائب...)
            </Text>
          </View>
          {/* Español */}
          <Text style={{ fontSize: 15, color: '#333', marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>"Ejemplo práctico:"</Text> Si solicitas la
            nacionalidad, puedes ver online el estado de tu expediente y recibir notificaciones
            oficiales sin esperar cartas en papel.
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 14,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>"مثال عملي:"</Text> إذا تقدمت بطلب الجنسية، يمكنك
            متابعة ملفك واستلام الإشعارات الرسمية عبر الإنترنت دون انتظار الرسائل الورقية.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#1976d2',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 6,
            }}
            onPress={() => router.push('/(tabs)/CarpetaCiudadanaScreen')}
          >
            <Ionicons
              name="arrow-forward-circle-outline"
              size={22}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Acceder a la Carpeta Ciudadana
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bloque destacado: Certificado Digital */}
        <View
          style={{
            backgroundColor: '#e3f2fd',
            borderColor: '#1976d2',
            borderWidth: 2,
            borderRadius: 12,
            padding: 18,
            marginBottom: 22,
            shadowColor: '#000',
            shadowOpacity: 0.07,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Ionicons name="key-outline" size={28} color="#1976d2" style={{ marginRight: 8 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 19, color: '#1976d2' }}>
              ¿Qué es el Certificado Digital?
            </Text>
          </View>
          {/* Español */}
          <Text style={{ fontSize: 16, color: '#444', marginBottom: 4 }}>
            El <Text style={{ fontWeight: 'bold', color: '#1976d2' }}>Certificado Digital</Text> es
            un documento electrónico que te identifica de forma segura en internet y te permite
            firmar documentos y realizar trámites online con la administración pública y entidades
            privadas.
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 15,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#1976d2' }}>الشهادة الرقمية</Text> هي وثيقة
            إلكترونية تُعرّفك بشكل آمن على الإنترنت وتسمح لك بتوقيع المستندات وإجراء المعاملات عبر
            الإنترنت مع الإدارة العامة والجهات الخاصة.
          </Text>
          {/* Español */}
          <Text style={{ fontSize: 15, color: '#333', marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>"¿Por qué es importante?"</Text> Porque te permite:
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 14,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>"لماذا هي مهمة؟"</Text> لأنها تتيح لك:
          </Text>
          <View style={{ marginLeft: 10, marginBottom: 8 }}>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Presentar solicitudes y escritos oficiales sin desplazarte
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • تقديم الطلبات والمستندات الرسمية دون الحاجة للذهاب شخصياً
            </Text>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Consultar y descargar tus datos fiscales, vida laboral, multas, etc.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • الاطلاع على بياناتك الضريبية أو رصيد العمل أو المخالفات وتحميلها
            </Text>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Firmar digitalmente documentos con validez legal
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • توقيع المستندات إلكترونياً بقوة قانونية
            </Text>
            <Text style={{ fontSize: 15, color: '#333' }}>
              • Acceder a servicios de la Seguridad Social, Hacienda, DGT, etc.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#00897b',
                textAlign: 'right',
                writingDirection: 'rtl',
              }}
            >
              • الوصول إلى خدمات الضمان الاجتماعي، الضرائب، المرور وغيرها
            </Text>
          </View>
          {/* Español */}
          <Text style={{ fontSize: 15, color: '#333', marginBottom: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>"Ejemplo práctico:"</Text> Puedes presentar la
            declaración de la renta o consultar puntos del carnet de conducir desde casa, usando tu
            certificado digital.
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 14,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>"مثال عملي:"</Text> يمكنك تقديم إقرارك الضريبي أو
            معرفة نقاط رخصة القيادة من المنزل باستخدام الشهادة الرقمية.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#1976d2',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 6,
            }}
            onPress={() => {
              // Abrir enlace externo FNMT
              import('react-native').then(({ Linking }) => {
                Linking.openURL('https://www.sede.fnmt.gob.es/certificados');
              });
            }}
          >
            <Ionicons name="globe-outline" size={22} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Más información y solicitud
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bloque destacado: Organizaciones Humanitarias y Ayudas */}
        <View
          style={{
            backgroundColor: '#e8f5e9',
            borderColor: '#43a047',
            borderWidth: 2,
            borderRadius: 12,
            padding: 18,
            marginBottom: 22,
            shadowColor: '#000',
            shadowOpacity: 0.07,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="hand-left-outline"
              size={26}
              color="#43a047"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#388e3c' }}>
              Organizaciones Humanitarias y Ayudas
            </Text>
          </View>
          {/* Español */}
          <Text style={{ fontSize: 15, color: '#444', marginBottom: 4 }}>
            Si necesitas apoyo social, ayuda alimentaria, asesoría legal o acompañamiento, existen
            organizaciones y ONGs que pueden ayudarte en España.
          </Text>
          {/* Árabe */}
          <Text
            style={{
              fontSize: 14,
              color: '#00897b',
              marginBottom: 8,
              textAlign: 'right',
              writingDirection: 'rtl',
            }}
          >
            إذا كنت بحاجة إلى دعم اجتماعي أو مساعدة غذائية أو استشارة قانونية أو مرافقة، هناك منظمات
            وجمعيات خيرية يمكنها مساعدتك في إسبانيا.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#43a047',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 6,
            }}
            onPress={() => router.push('/(tabs)/AyudasONGScreen')}
          >
            <Ionicons name="help-buoy-outline" size={22} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Ver organizaciones y ayudas
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Administraciones en España para el ciudadano</Text>
        <View style={styles.adminList}>
          {/* Ficha: Administración General del Estado */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración General del Estado</Text>
            <Text style={styles.adminTitleAr}>الإدارة العامة للدولة</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Coordina servicios y trámites de
              todo el país (DNI, extranjería, pasaportes, etc).
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تنسق الخدمات والمعاملات على مستوى الدولة (بطاقة الهوية، شؤون الأجانب، جوازات
              السفر...)
            </Text>
          </View>

          {/* Ficha: Administración Autonómica */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración Autonómica</Text>
            <Text style={styles.adminTitleAr}>الإدارة الذاتية (إدارة الأقاليم المستقلة)</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Gestiona educación, sanidad y
              servicios sociales en cada comunidad autónoma.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تدير التعليم والصحة والخدمات الاجتماعية في كل إقليم مستقل.
            </Text>
          </View>

          {/* Ficha: Administración Local */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración Local (Ayuntamientos)</Text>
            <Text style={styles.adminTitleAr}>الإدارة المحلية (البلديات)</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Tramita empadronamiento,
              licencias, ayudas sociales y atención ciudadana en tu municipio.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تعالج التسجيل السكاني، الرخص، المساعدات الاجتماعية وخدمة المواطنين في
              البلدية.
            </Text>
          </View>

          {/* Ficha: Extranjería */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Oficinas de Extranjería</Text>
            <Text style={styles.adminTitleAr}>مكاتب شؤون الأجانب</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Tramita permisos de residencia,
              trabajo, reagrupación familiar, renovaciones, NIE y consultas sobre situación legal en
              España.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تعالج تصاريح الإقامة والعمل، لم الشمل الأسري، التجديدات، رقم NIE والاستفسارات
              حول الوضع القانوني في إسبانيا.
            </Text>
            <View style={styles.contactBox}>
              <Text style={styles.contactTitle}>Teléfono de atención:</Text>
              <Text style={styles.contactInfo}>060 (Información general de Extranjería)</Text>
              <Text style={styles.contactTitle}>Correo electrónico:</Text>
              <Text style={styles.contactInfo}>informacionextranjeria@correo.gob.es</Text>
            </View>
          </View>

          {/* Ficha: Administración de Justicia */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración de Justicia</Text>
            <Text style={styles.adminTitleAr}>إدارة العدالة</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Gestiona juzgados, tribunales,
              certificados de antecedentes penales, y acceso a asistencia jurídica gratuita.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تدير المحاكم، الشهادات الجنائية، وتوفر إمكانية الحصول على المساعدة القانونية
              المجانية.
            </Text>
            <View style={styles.contactBox}>
              <Text style={styles.contactTitle}>Teléfono de atención:</Text>
              <Text style={styles.contactInfo}>
                902 007 214 / 91 837 22 95 (Certificados penales y consultas generales)
              </Text>
              <Text style={styles.contactTitle}>Correo electrónico:</Text>
              <Text style={styles.contactInfo}>informacion@mj.es</Text>
            </View>
          </View>

          {/* Ficha: Administración Tributaria */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración Tributaria (Agencia Tributaria)</Text>
            <Text style={styles.adminTitleAr}>الإدارة الضريبية (وكالة الضرائب)</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Gestiona impuestos, declaraciones
              de la renta y devoluciones fiscales.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تدير الضرائب، التصريحات الضريبية والاستردادات المالية.
            </Text>
          </View>

          {/* Ficha: Seguridad Social */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración de la Seguridad Social</Text>
            <Text style={styles.adminTitleAr}>إدارة الضمان الاجتماعي</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Tramita afiliaciones, pensiones,
              prestaciones y ayudas por desempleo o maternidad.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تعالج التسجيل، المعاشات، الإعانات ومساعدات البطالة أو الأمومة.
            </Text>
          </View>

          {/* Ficha: Sanidad */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración Sanitaria (Servicios de Salud)</Text>
            <Text style={styles.adminTitleAr}>الإدارة الصحية (خدمات الصحة)</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Proporciona acceso a la sanidad
              pública, tarjetas sanitarias y centros de salud.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: توفر الوصول إلى الصحة العامة، بطاقات التأمين الصحي والمراكز الصحية.
            </Text>
          </View>

          {/* Ficha: Educación */}
          <View style={styles.adminCard}>
            <Text style={styles.adminTitle}>Administración de Educación</Text>
            <Text style={styles.adminTitleAr}>الإدارة التعليمية</Text>
            <Text style={styles.adminFunc}>
              <Text style={{ fontWeight: 'bold' }}>"Función:"</Text> Gestiona el acceso a escuelas,
              matrículas, becas y homologación de títulos.
            </Text>
            <Text style={styles.adminFuncAr}>
              الوظيفة: تدير الوصول إلى المدارس، التسجيل، المنح ومعادلة الشهادات.
            </Text>
          </View>
        </View>

        {/* Carpeta Ciudadana */}
        <Text style={styles.sectionTitle}>
          Carpeta Ciudadana <Text style={styles.arabic}>الملف المواطن</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>"¿Qué es?"</Text> La Carpeta Ciudadana es una
          plataforma digital del Gobierno de España que permite a los ciudadanos consultar y
          gestionar de manera centralizada sus trámites, notificaciones y documentos con las
          distintas administraciones públicas. {"\n"}
          <Text style={styles.arabic}>
            الملف المواطن هو منصة رقمية تابعة للحكومة الإسبانية تتيح للمواطنين الاطلاع على معاملاتهم
            وإشعاراتهم ووثائقهم مع الإدارات العامة المختلفة وإدارتها بشكل مركزي.
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>"¿Para qué sirve? Ventajas:"</Text>
          {"\n"}• Consultar el estado de trámites y expedientes. {"\n"}• Recibir notificaciones
          electrónicas oficiales. {"\n"}• Acceder a documentos y certificados personales. {"\n"}•
          Centralizar la relación con todas las administraciones públicas. {"\n"}• Ahorro de tiempo
          y desplazamientos. {"\n"}• Mayor seguridad y privacidad en la gestión de datos. {"\n"}•
          Acceso 24/7 desde cualquier dispositivo. {"\n"}
          <Text style={styles.arabic}>
            • الاطلاع على حالة المعاملات والملفات. • استلام الإشعارات الإلكترونية الرسمية. • الوصول
            إلى الوثائق والشهادات الشخصية. • مركزية العلاقة مع جميع الإدارات العامة. • توفير الوقت
            والجهد. • مزيد من الأمان والخصوصية في إدارة البيانات. • الوصول على مدار الساعة ومن أي
            جهاز.
          </Text>
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: 'bold' }}>"¿Cómo se puede acceder?"</Text> {"\n"}• A través de la
          web oficial: https://carpetaciudadana.gob.es {"\n"}• Es necesario disponer de un sistema
          de identificación digital, como: {"\n"}- Certificado digital {"\n"}- DNI electrónico{" "}
          {"\n"}- Sistema Cl@ve {"\n"}• Se puede acceder desde ordenador, móvil o tablet. {"\n"}
          <Text style={styles.arabic}>
            • من خلال الموقع الرسمي: https://carpetaciudadana.gob.es • يجب توفر نظام تعريف رقمي مثل:
            - الشهادة الرقمية - بطاقة الهوية الإلكترونية - نظام Cl@ve • يمكن الدخول من الحاسوب أو
            الهاتف أو الجهاز اللوحي.
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  arabic: {
    fontSize: 15,
    color: "#1976d2",
    marginBottom: 4,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "System",
  },
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 10,
    color: "#388e3c",
    textAlign: "center",
  },
  adminList: {
    marginBottom: 18,
    width: "100%",
  },
  adminCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  adminTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  adminTitleAr: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "bold",
    marginBottom: 6,
    writingDirection: "rtl",
    textAlign: "right",
  },
  adminFunc: {
    fontSize: 15,
    color: "#444",
    marginBottom: 2,
  },
  adminFuncAr: {
    fontSize: 15,
    color: "#1976d2",
    marginBottom: 2,
    writingDirection: "rtl",
    textAlign: "right",
  },
  contactBox: {
    marginTop: 8,
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    padding: 8,
    marginBottom: 4,
  },
  contactTitle: {
    fontWeight: "bold",
    color: "#1565c0",
    fontSize: 14,
    marginTop: 2,
  },
  contactInfo: {
    color: "#1a237e",
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
    minHeight: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#2c3e50",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
});
