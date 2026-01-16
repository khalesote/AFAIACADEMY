import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { agendaContactos, Contacto } from '../utils/agenda';

const provinciasUnicas = Array.from(new Set(agendaContactos.map(c => c.provincia))).sort();
const tiposUnicos = Array.from(new Set(agendaContactos.map(c => c.tipo))).sort();

export default function AgendaScreen() {
  const [provincia, setProvincia] = useState('');
  const [tipo, setTipo] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const contactosFiltrados = agendaContactos.filter(c =>
    (provincia === '' || c.provincia === provincia) &&
    (tipo === '' || c.tipo === tipo) &&
    (busqueda === '' || c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const renderContacto = ({ item }: { item: Contacto }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.tipo}>{item.tipo} - {item.provincia}</Text>
      {item.direccion && <Text style={styles.direccion}>Dirección: {item.direccion}</Text>}
      {item.telefono ? (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${(item.telefono ?? '').replace(/\s/g, '')}`)}>
          <Text style={styles.link}>☎ {item.telefono}</Text>
        </TouchableOpacity>
      ) : null}
      {item.correo && (
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.correo ?? ''}`)}>
          <Text style={styles.link}>✉ {item.correo}</Text>
        </TouchableOpacity>
      )}
      {item.web && (
        <TouchableOpacity onPress={() => Linking.openURL(item.web ?? '')}>
          <Text style={styles.link}>🌐 {item.web}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const recursosProvincia = agendaContactos.filter((c: Contacto) => provincia === '' || c.provincia === provincia);
  const tiposProvincia: string[] = Array.from(new Set(recursosProvincia.map((c: Contacto) => c.tipo)));
  const totalRecursos: number = recursosProvincia.length;
  const telefonosEmergencia: Contacto[] = recursosProvincia.filter((c: Contacto) => c.tipo === 'Emergencia');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda de Contactos Útiles</Text>
      {provincia !== '' && (
        <View style={styles.resumenProvincia}>
          <Text style={styles.resumenTitulo}>Resumen de {provincia}:</Text>
          <Text style={styles.resumenItem}>Total de recursos: {totalRecursos}</Text>
          <Text style={styles.resumenItem}>Tipos de recursos: {tiposProvincia.join(', ')}</Text>
          {/* Listado de direcciones y teléfonos */}
          <Text style={styles.resumenItem}>Direcciones y teléfonos:</Text>
          {recursosProvincia.map((c: Contacto, i: number) => (
            <Text key={i} style={styles.resumenItem}>
              - {c.nombre}{c.direccion ? `, ${c.direccion}` : ''}{c.telefono ? `, ☎ ${c.telefono}` : ''}
            </Text>
          ))}
          {telefonosEmergencia.length > 0 && (
            <View style={styles.resumenEmergencia}>
              <Text style={styles.resumenItem}>Teléfonos de emergencia:</Text>
              {telefonosEmergencia.map((c: Contacto, i: number) => (
                <Text key={i} style={styles.resumenItem}>- {c.nombre}: {c.telefono}</Text>
              ))}
            </View>
          )}
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <View style={styles.filtros}>
        <Text style={styles.label}>Provincia:</Text>
        <FlatList
          data={[ '', ...provinciasUnicas ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item || 'todas'}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setProvincia(item)} style={[styles.filtroBtn, provincia === item && styles.filtroBtnActivo]}>
              <Text style={provincia === item ? styles.filtroTextActivo : styles.filtroText}>{item || 'Todas'}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.filtros}>
        <Text style={styles.label}>Tipo:</Text>
        <FlatList
          data={[ '', ...tiposUnicos ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item || 'todos'}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setTipo(item)} style={[styles.filtroBtn, tipo === item && styles.filtroBtnActivo]}>
              <Text style={tipo === item ? styles.filtroTextActivo : styles.filtroText}>{item || 'Todos'}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={contactosFiltrados}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderContacto}
        ListEmptyComponent={<Text style={styles.noResultados}>No se encontraron contactos.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#2a3c4d' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 10 },
  filtros: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { fontWeight: 'bold', marginRight: 8 },
  filtroBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16, backgroundColor: '#eee', marginRight: 6 },
  filtroBtnActivo: { backgroundColor: '#2a3c4d' },
  filtroText: { color: '#2a3c4d' },
  filtroTextActivo: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#f6fafd', borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#e0e0e0' },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#1a2b3c' },
  tipo: { fontSize: 14, color: '#3a4a5a', marginBottom: 4 },
  direccion: { fontSize: 13, color: '#444', marginBottom: 2 },
  link: { color: '#007aff', marginVertical: 1 },
  noResultados: { textAlign: 'center', color: '#888', marginTop: 24 },
  resumenProvincia: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  resumenTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1a237e',
    marginBottom: 4,
  },
  resumenItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  resumenEmergencia: {
    marginTop: 6,
    backgroundColor: '#ffe0e0',
    borderRadius: 6,
    padding: 6,
  },
});
