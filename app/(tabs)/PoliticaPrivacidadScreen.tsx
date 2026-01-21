import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PoliticaPrivacidadScreen() {
  const router = useRouter();

  // Información de contacto
  const email = 'somos@afaiacademiadeinmigrantes.com';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#1976d2" style={{ marginRight: 5 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Política de Privacidad</Text>
      <Text style={styles.date}>Última actualización: 19 de enero de 2025</Text>
      
      <Text style={styles.intro}>
        En Afai academia de inmigrantes respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política explica cómo recopilamos, utilizamos, compartimos y protegemos su información personal.
      </Text>

      <Text style={styles.sectionTitle}>1. Responsable del Tratamiento</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Afai academia de inmigrantes</Text>
        {'\n'}Dirección: Valcarreres, 7, 50004 Zaragoza
        {'\n'}Email: somos@afaiacademiadeinmigrantes.com
        {'\n'}Teléfono: 662 744 837
      </Text>

      <Text style={styles.sectionTitle}>2. Finalidades del Tratamiento</Text>
      <Text style={styles.text}>
        Sus datos personales serán utilizados para las siguientes finalidades:
        {'\n\n'}- Gestionar su registro como usuario de la aplicación.
        {'\n'}- Proporcionar los servicios educativos solicitados.
        {'\n'}- Enviar comunicaciones relacionadas con los servicios contratados.
        {'\n'}- Gestionar el envío de información y contenidos formativos.
        {'\n'}- Cumplir con las obligaciones legales aplicables.
      </Text>

      <Text style={styles.sectionTitle}>3. Base Legal para el Tratamiento</Text>
      <Text style={styles.text}>
        La base legal para el tratamiento de sus datos es el consentimiento que se le solicita mediante la aceptación de la presente política de privacidad. El ofrecimiento de los datos personales es obligatorio para prestar los servicios ofrecidos a través de la aplicación.
      </Text>

      <Text style={styles.sectionTitle}>4. Destinatarios de los Datos</Text>
      <Text style={styles.text}>
        No se cederán datos a terceros, salvo obligación legal. Como encargados de tratamiento, podrán tener acceso a sus datos los siguientes prestadores de servicios:
        {'\n\n'}- Proveedores de servicios tecnológicos
        {'\n'}- Proveedores de servicios de alojamiento de datos
        {'\n'}- Asesorías y despachos profesionales cuando sea necesario
      </Text>

      <Text style={styles.sectionTitle}>5. Derechos de los Usuarios</Text>
      <Text style={styles.text}>
        Usted puede ejercer los siguientes derechos:
        {'\n\n'}- <Text style={styles.bold}>Acceso:</Text> A acceder a sus datos personales.
        {'\n'}- <Text style={styles.bold}>Rectificación:</Text> A rectificar sus datos inexactos.
        {'\n'}- <Text style={styles.bold}>Supresión:</Text> A solicitar la supresión de sus datos.
        {'\n'}- <Text style={styles.bold}>Limitación:</Text> A solicitar la limitación del tratamiento de sus datos.
        {'\n'}- <Text style={styles.bold}>Portabilidad:</Text> A recibir sus datos en un formato estructurado.
        {'\n'}- <Text style={styles.bold}>Oposición:</Text> A oponerse al tratamiento de sus datos.
        {'\n'}- <Text style={styles.bold}>Retirar el consentimiento:</Text> En cualquier momento.
      </Text>

      <Text style={styles.text}>
        Para ejercer estos derechos, puede enviar una solicitud por escrito a la siguiente dirección de correo electrónico:
        {'\n\n'}<Text style={styles.bold}>Email:</Text> {email}
      </Text>

      <Text style={styles.sectionTitle}>6. Plazo de Conservación de los Datos</Text>
      <Text style={styles.text}>
        Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.
      </Text>

      <Text style={styles.sectionTitle}>7. Medidas de Seguridad</Text>
      <Text style={styles.text}>
        Hemos implementado medidas técnicas y organizativas para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.
      </Text>

      <Text style={styles.sectionTitle}>8. Menores de Edad</Text>
      <Text style={styles.text}>
        Nuestros servicios están dirigidos a mayores de 16 años. No recopilamos intencionalmente información de menores de esta edad. Si tiene conocimiento de que un menor nos ha proporcionado datos personales, por favor contáctenos para eliminarlos.
      </Text>

      <Text style={styles.sectionTitle}>9. Cambios en la Política de Privacidad</Text>
      <Text style={styles.text}>
        Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o jurisprudenciales. Se recomienda a los usuarios que la revisen periódicamente.
      </Text>

      <Text style={styles.sectionTitle}>10. Contacto</Text>
      <Text style={[styles.text, { marginBottom: 40 }]}>
        Para cualquier consulta sobre esta política de privacidad, puede contactar con nosotros a través de:
        {'\n\n'}<Text style={styles.bold}>Email:</Text> {email}
        {'\n'}<Text style={styles.bold}>Dirección:</Text> Valcarreres, 7, 50004 Zaragoza
        {'\n'}<Text style={styles.bold}>Teléfono:</Text> 662 744 837
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  backText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    padding: 24,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  intro: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    color: '#333',
    textDecorationLine: 'none',
  },
});
