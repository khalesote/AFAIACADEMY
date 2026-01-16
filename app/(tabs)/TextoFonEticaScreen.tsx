import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TextoFonEticaScreen() {
  const textoCompleto = `Hola,
soy khaled,
tu profesor virtual de inteligencia artificial.
Bienvenidos a la unidad uno: el alfabeto español.
Vamos a aprender las letras del alfabeto español.
Para cada letra te daré una palabra, un ejemplo.
A. amigo. Ejemplo: Mi amigo es muy simpático.
B. barco. Ejemplo: El barco navega en el mar.
C. casa. Ejemplo: Vivo en una casa blanca.
D. dado. Ejemplo: El dado tiene seis caras.
E. elefante. Ejemplo: El elefante es un animal grande.
F. fuego. Ejemplo: El fuego calienta la habitación.
G. gato. Ejemplo: El gato duerme en el sofá.
H. helado. Ejemplo: Me gusta el helado de chocolate.
I. isla. Ejemplo: La isla está en el océano.
J. jugo. Ejemplo: Bebo jugo de naranja.
K. kilo. Ejemplo: Un kilo de manzanas.
L. luz. Ejemplo: La luz está encendida.
M. mesa. Ejemplo: La mesa es redonda.
N. niño. Ejemplo: El niño juega en el parque.
Ñ. ñu. Ejemplo: El ñu vive en África.
O. ojo. Ejemplo: Tengo un ojo marrón y otro azul.
P. perro. Ejemplo: El perro ladra mucho.
Q. queso. Ejemplo: Me gusta el queso español.
R. rosa. Ejemplo: La rosa es una flor bonita.
S. sol. Ejemplo: El sol brilla en el cielo.
T. taza. Ejemplo: La taza está llena de café.
U. uva. Ejemplo: La uva es una fruta dulce.
V. vaso. Ejemplo: El vaso está vacío.
W. wifi. Ejemplo: Tengo wifi en casa.
X. xilófono. Ejemplo: El xilófono es un instrumento musical.
Y. yate. Ejemplo: El yate es muy grande.
Z. zapato. Ejemplo: El zapato es nuevo.`;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Fonética y Pronunciación</Text>
        <Text style={styles.titleAr}>علم الأصوات والنطق</Text>
        <Text style={styles.texto}>{textoCompleto}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 2,
    textAlign: 'center',
    letterSpacing: 1,
  },
  titleAr: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 14,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  texto: {
    fontSize: 20,
    color: '#333',
    textAlign: 'left',
    marginVertical: 10,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 32,
  },
});
