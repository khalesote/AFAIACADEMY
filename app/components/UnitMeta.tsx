import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { completeUnit, getUnitsForLevel } from '../../utils/unitProgress';

const data: any = require('../assets/unidades_y_examenes.json');

type Nivel = 'A1' | 'A2' | 'B1' | 'B2';

interface UnitMetaProps {
  nivel: Nivel;
  unidad: number;
  storageKey: string; // e.g., 'A1_unidadesCompletadas'
}

export default function UnitMeta({ nivel, unidad, storageKey }: UnitMetaProps) {
  const unidadData = (data?.[nivel]?.unidades || []).find((u: any) => u.unidad === unidad) || {};
  let gramaticaEs: string[] = unidadData.gramatica || [];
  let gramaticaAr: string[] = unidadData.gramatica_ar || [];
  let vocabularioEs: string[] = unidadData.vocabulario || [];
  let vocabularioAr: string[] = unidadData.vocabulario_ar || [];

  const marcarCompletada = async () => {
    try {
      // 1) Progreso unificado
      const level = nivel.toLowerCase() as 'a1' | 'a2' | 'b1' | 'b2';
      // Intentar resolver unitId según nivel
      let unitId = '';
      if (level === 'a1' || level === 'a2') {
        unitId = `unidad${unidad}`;
      } else {
        // Para B1/B2, intentar mapear por índice usando getUnitsForLevel (unidad es 1-based)
        const list = getUnitsForLevel(level);
        const idx = Math.max(0, Math.min(list.length - 1, unidad - 1));
        unitId = list[idx] || '';
      }

      if (unitId) {
        await completeUnit(level, unitId);
      }

      // 2) Compatibilidad legacy: mantener contador máximo
      const prev = parseInt((await AsyncStorage.getItem(storageKey)) || '0') || 0;
      const next = Math.max(prev, unidad);
      await AsyncStorage.setItem(storageKey, String(next));

      alert(`تم حفظ التقدم: تم إكمال الوحدة ${unidad}.\nProgreso guardado: Unidad ${unidad} completada.`);
    } catch (e) {
      alert('No se pudo guardar el progreso de la unidad.');
    }
  };

  // Alinear pares ES/AR. Si ambas listas vienen como un solo string CSV, dividir por comas
  const maybeSplitCsv = (arr: string[]): string[] => {
    if (arr.length === 1) {
      const s = arr[0] || '';
      if (s.includes(',')) {
        return s.split(',').map(x => x.trim()).filter(Boolean);
      }
    }
    return arr;
  };

  vocabularioEs = maybeSplitCsv(vocabularioEs);
  vocabularioAr = maybeSplitCsv(vocabularioAr);

  const renderPairs = (es: string[], ar: string[]) => {
    const max = Math.max(es.length, ar.length);
    const items: JSX.Element[] = [];
    for (let i = 0; i < max; i++) {
      if (es[i]) items.push(<Text key={`es-${i}`} style={{marginBottom: 2, textAlign: 'left'}}>• {es[i]}</Text>);
      if (ar[i]) items.push(<Text key={`ar-${i}`} style={{marginBottom: 8, writingDirection: 'rtl', textAlign: 'right', color:'#333'}}>• {ar[i]}</Text>);
    }
    return items;
  };

  const pickIcon = (spanish: string): { name: any; color: string } => {
    const s = spanish.toLowerCase();
    if (/hola|adiós|buenos días|buenas tardes|buenas noches|gracias|por favor/.test(s)) {
      return { name: 'chatbubble-ellipses-outline', color: '#1565c0' } as any;
    }
    if (/país|españa|marruecos|méxico|francia|alemania|italia|portugal|inglaterra|estados unidos|nací|nacionalidad/.test(s)) {
      return { name: 'globe-outline', color: '#2e7d32' } as any;
    }
    if (/padre|madre|herman|abuelo|familia|amigo|hijo|hija|primo|prima/.test(s)) {
      return { name: 'people-outline', color: '#6a1b9a' } as any;
    }
    if (/color|rojo|verde|azul|amarillo|negro|blanco/.test(s)) {
      return { name: 'color-palette-outline', color: '#f57f17' } as any;
    }
    return { name: 'book-outline', color: '#455a64' } as any;
  };

  const renderVocabTable = (es: string[], ar: string[]) => {
    const max = Math.max(es.length, ar.length);
    const header = (
      <View key="hdr" style={{flexDirection: 'row', backgroundColor: '#E3F2FD', borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
        <View style={{flex:1, padding:8, borderRightWidth:1, borderColor:'#BBDEFB'}}>
          <Text style={{fontWeight:'bold', color:'#0d47a1'}}>Español</Text>
        </View>
        <View style={{flex:1.1, padding:8}}>
          <Text style={{fontWeight:'bold', color:'#0d47a1', textAlign:'right'}}>العربية</Text>
        </View>
      </View>
    );
    const rows = [] as JSX.Element[];
    for (let i = 0; i < max; i++) {
      rows.push(
        <View key={`row-${i}`} style={{flexDirection:'row', borderTopWidth:1, borderColor:'#E3F2FD', backgroundColor: i%2===0? '#FAFAFA':'#FFFFFF'}}>
          <View style={{flex:1, padding:8, borderRightWidth:1, borderColor:'#E3F2FD', flexDirection:'row', alignItems:'center', gap:8 as any}}>
            <Ionicons name={pickIcon(es[i] || '').name as any} size={18} color={pickIcon(es[i] || '').color} style={{marginRight: 6}} />
            <Text style={{textAlign:'left', flexShrink: 1}}>{es[i] || ''}</Text>
          </View>
          <View style={{flex:1.1, padding:8}}>
            <Text style={{textAlign:'right', writingDirection:'rtl'}}>{ar[i] || ''}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{borderWidth:1, borderColor:'#E3F2FD', borderRadius:8, overflow:'hidden', marginTop:6}}>
        {header}
        {rows}
      </View>
    );
  };

  return (
    <View style={{ width: '100%', paddingHorizontal: 16, marginTop: 8 }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0d47a1', marginBottom: 6}}>Gramática / شرح القواعد</Text>
      {renderPairs(gramaticaEs, gramaticaAr)}

      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#1b5e20', marginTop: 10}}>Vocabulario / المفردات</Text>
      {renderVocabTable(vocabularioEs, vocabularioAr)}

      <TouchableOpacity
        style={{backgroundColor:'#2e7d32', padding:12, borderRadius:8, alignItems:'center', marginTop: 12}}
        onPress={marcarCompletada}
      >
        <Text style={{color:'#fff', fontWeight:'bold'}}>✔️ marcar unidad como completada</Text>
      </TouchableOpacity>
    </View>
  );
}

