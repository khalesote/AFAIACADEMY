import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

interface Ejercicio {
  tipo: string;
  enunciado?: string;
  titulo?: string;
  texto?: string;
  pregunta?: string;
  solucion?: string[];
  opciones?: string[];
  respuesta_correcta?: string;
  respuestaCorrecta?: number;
  pares?: Array<{izquierda: string, derecha: string}>;
  explicacion?: string;
  explicacionAr?: string;
}

interface EjerciciosInteractivosProps {
  ejercicios: Ejercicio[];
  onComplete?: () => void;
  onProgressChange?: (progress: { correct: number; total: number }) => void;
}

// Función de mezclado determinista basada en el índice del ejercicio
// Esto asegura que el orden sea consistente para el mismo ejercicio
const shuffleDeterministic = <T,>(arr: T[], seed: number): T[] => {
  const shuffled = [...arr];
  let currentSeed = seed;
  // Usar un algoritmo de Fisher-Yates con seed determinista
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Crear un "pseudo-random" basado en el seed
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const pseudoRandom = currentSeed / 233280;
    const j = Math.floor(pseudoRandom * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function EjerciciosInteractivos({ ejercicios, onComplete, onProgressChange }: EjerciciosInteractivosProps) {
  const [respuestas, setRespuestas] = useState<any>({});
  const [feedback, setFeedback] = useState<any>({});
  const [opcionesDesordenadas, setOpcionesDesordenadas] = useState<any>({});
  const [omOpciones, setOmOpciones] = useState<Record<number, string[]>>({});
  const [omCorrectIdx, setOmCorrectIdx] = useState<Record<number, number>>({});
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [ltLoading, setLtLoading] = useState<Record<number, boolean>>({});
  const [ltSuggestions, setLtSuggestions] = useState<Record<number, any[]>>({});
  const [isListening, setIsListening] = useState<Record<number, boolean>>({});
  const [transcripts, setTranscripts] = useState<Record<number, string>>({});
  const currentOralIdx = React.useRef<number | null>(null);

  // Estado para RELACIONAR (tabla de dos columnas)
  const [relLeft, setRelLeft] = useState<Record<number, string[]>>({});
  const [relRight, setRelRight] = useState<Record<number, string[]>>({});
  const [relSelectedLeft, setRelSelectedLeft] = useState<Record<number, number | null>>({});
  // userMatches: para cada ejercicio, mapea índice de la columna izquierda -> índice de la columna derecha
  const [relUserMatches, setRelUserMatches] = useState<Record<number, Record<number, number>>>({});

  // Implementaciones básicas de oral (placeholder)
  const startOral = async (idx: number) => {
    try {
      currentOralIdx.current = idx;
      setIsListening((prev: Record<number, boolean>) => ({ ...prev, [idx]: true }));
      // En una versión futura, integrar STT real aquí
    } catch {}
  };

  const stopOral = async (idx: number) => {
    try {
      setIsListening((prev: Record<number, boolean>) => ({ ...prev, [idx]: false }));
    } catch {}
  };

  const evaluarOral = (texto: string, _ejercicio: Ejercicio) => {
    const t = (texto || '').trim();
    let score = 0;
    const detalles: string[] = [];
    if (t.length >= 10) { score += 40; detalles.push('Longitud adecuada (≥10)'); } else { detalles.push('Texto corto (<10)'); }
    if (/[aeiouáéíóú]/i.test(t)) { score += 20; detalles.push('Contiene vocales y estructura básica'); }
    if (/\.|\?|!/.test(t)) { score += 10; detalles.push('Tiene puntuación'); }
    if (/\s/.test(t)) { score += 10; detalles.push('Múltiples palabras'); }
    if (score < 60 && t.length > 0) score = 60; // umbral mínimo si habló
    if (score > 100) score = 100;
    return { score, passed: score >= 60, detalles };
  };

  // Usar useRef para almacenar si ya se inicializó, evitando re-mezclar en cada render
  const initializedRef = React.useRef(false);
  const ejerciciosRef = React.useRef(ejercicios);

  // Inicializar opciones desordenadas cuando se cargan los ejercicios (solo una vez)
  useEffect(() => {
    // Solo inicializar si no se ha hecho antes o si los ejercicios realmente cambiaron
    const ejerciciosCambiaron = JSON.stringify(ejerciciosRef.current) !== JSON.stringify(ejercicios);
    
    if (!initializedRef.current || ejerciciosCambiaron) {
      ejerciciosRef.current = ejercicios;
      initializedRef.current = true;

      const nuevasOpciones: any = {};
      const nuevasOmOpciones: Record<number, string[]> = {};
      const nuevasOmCorrectIdx: Record<number, number> = {};
      const nRelLeft: Record<number, string[]> = {};
      const nRelRight: Record<number, string[]> = {};
      const nRelSelectedLeft: Record<number, number | null> = {};
      const nRelUserMatches: Record<number, Record<number, number>> = {};

      const norm = (s: string) => (s || '').trim().toLowerCase().normalize('NFC');

      ejercicios.forEach((ejercicio, idx) => {
        if (ejercicio.tipo === 'vocabulario' && ejercicio.pares) {
          // Crear una lista plana de todas las opciones
          const todasLasOpciones: string[] = [];
          ejercicio.pares.forEach(par => {
            todasLasOpciones.push(par.izquierda, par.derecha);
          });
          
          // Mezclar de forma determinista (mismo orden cada vez para este ejercicio)
          const opcionesMezcladas = shuffleDeterministic(todasLasOpciones, idx);
          
          // Asignar las opciones mezcladas al ejercicio
          nuevasOpciones[idx] = opcionesMezcladas;
        } else if (ejercicio.tipo === 'opcion_multiple' && Array.isArray(ejercicio.opciones)) {
          // Emparejar opción con su índice original para poder recalcular el índice correcto tras mezclar
          const pairs = (ejercicio.opciones || []).map((text, i) => ({ text, originalIndex: i }));
          const shuffled = shuffleDeterministic(pairs, idx);

          // Determinar índice correcto en el arreglo mezclado, soportando string o índice original
          let correctIdx = -1;
          if (typeof ejercicio.respuestaCorrecta === 'number') {
            correctIdx = shuffled.findIndex(p => p.originalIndex === ejercicio.respuestaCorrecta);
          } else if (typeof ejercicio.respuesta_correcta === 'string') {
            const target = norm(ejercicio.respuesta_correcta);
            correctIdx = shuffled.findIndex(p => norm(p.text) === target);
          }
          // Como fallback: si no se pudo determinar, intentamos con coincidencia exacta contra opciones originales
          if (correctIdx < 0 && typeof ejercicio.respuesta_correcta === 'string') {
            const target = norm(ejercicio.respuesta_correcta);
            const idxOriginal = (ejercicio.opciones || []).findIndex(o => norm(o) === target);
            correctIdx = shuffled.findIndex(p => p.originalIndex === idxOriginal);
          }
          // Fallback final a 0 si aún no hay válido
          if (correctIdx < 0) correctIdx = 0;

          nuevasOmOpciones[idx] = shuffled.map(p => p.text);
          nuevasOmCorrectIdx[idx] = correctIdx;
        } else if (ejercicio.tipo === 'relacionar' && Array.isArray(ejercicio.pares)) {
          const left = ejercicio.pares.map(p => p.izquierda);
          const right = ejercicio.pares.map(p => p.derecha);
          // Mezclar de forma determinista
          nRelLeft[idx] = shuffleDeterministic(left, idx * 2);
          nRelRight[idx] = shuffleDeterministic(right, idx * 2 + 1);
          nRelSelectedLeft[idx] = null;
          nRelUserMatches[idx] = {};
        }
      });
      setOpcionesDesordenadas(nuevasOpciones);
      setOmOpciones(nuevasOmOpciones);
      setOmCorrectIdx(nuevasOmCorrectIdx);
      setRelLeft(nRelLeft);
      setRelRight(nRelRight);
      setRelSelectedLeft(nRelSelectedLeft);
      setRelUserMatches(nRelUserMatches);
    }
  }, [ejercicios]);

  const handleInput = (idx: number, value: string | string[]) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: value }));
  };

  // Corrector con LanguageTool (online, sin clave)
  const corregirConLanguageTool = async (idx: number, texto: string) => {
    try {
      setLtLoading((prev: Record<number, boolean>) => ({ ...prev, [idx]: true }));
      setLtSuggestions((prev: Record<number, any[]>) => ({ ...prev, [idx]: [] }));
      const params = new URLSearchParams();
      params.append('text', texto || '');
      params.append('language', 'es');
      // Puedes ajustar niveles con enabledOnly, motherTongue, etc.
      const res = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const data = await res.json();
      const matches = Array.isArray(data?.matches) ? data.matches : [];
      setLtSuggestions((prev: Record<number, any[]>) => ({ ...prev, [idx]: matches }));
      // Crear un resumen legible
      const resumen = matches.length === 0
        ? 'Sin errores detectados por LanguageTool.'
        : `LanguageTool encontró ${matches.length} sugerencia(s).`;
      setFeedback((prev: any) => ({ ...prev, [idx]: [prev[idx], resumen].filter(Boolean).join('\n') }));
    } catch (e) {
      setFeedback((prev: any) => ({ ...prev, [idx]: 'No se pudo conectar al corrector (LanguageTool). Revisa tu conexión.' }));
    } finally {
      setLtLoading((prev: Record<number, boolean>) => ({ ...prev, [idx]: false }));
    }
  };

  // Utilidades de evaluación
  const normalizar = (s: string) => (s || '').trim().toLowerCase();
  const esGradable = (tipo: string) => [
    'opcion_multiple',
    'vocabulario',
    'relacionar'
  ].includes(tipo);

  // Evaluación heurística para expresión escrita (offline)
  const evaluarEscribir = (texto: string, ejercicio: Ejercicio) => {
    const t = (texto || '').trim();
    let score = 0;
    const detalles: string[] = [];

    // Longitud mínima
    if (t.length >= 30) { score += 30; detalles.push('Longitud suficiente (≥30)'); } else { detalles.push('Texto muy corto (<30)'); }

    // Palabras clave (si vienen en solucion)
    const keywords = (ejercicio.solucion || []).map(k => k.toLowerCase());
    if (keywords.length > 0) {
      let hits = 0;
      const tl = t.toLowerCase();
      keywords.forEach(k => { if (tl.includes(k)) hits++; });
      const kwScore = Math.min(hits * 10, 40);
      score += kwScore;
      detalles.push(`Palabras clave: ${hits}/${keywords.length}`);
    }

    // Puntuación básica (puntos, comas, interrogación/exclamación)
    const tienePunto = /[\.!?]/.test(t);
    const tieneComa = /[,;]/.test(t);
    if (tienePunto) { score += 6; detalles.push('Tiene puntuación final (.,!,?)'); } else { detalles.push('Falta puntuación al final'); }
    if (tieneComa) { score += 4; detalles.push('Buen uso de coma/;'); }

    // Mayúscula al inicio de frase
    const empiezaMayus = /^[A-ZÁÉÍÓÚÜÑ]/.test(t);
    if (empiezaMayus) { score += 10; detalles.push('Empieza con mayúscula'); } else { detalles.push('No empieza con mayúscula'); }

    // Umbral de aprobado
    const passed = score >= 60;
    return { score, passed, detalles };
  };

  const ejercicioCorrecto = (ejercicio: Ejercicio, idx: number): boolean => {
    const tipo = ejercicio.tipo;
    const resp = respuestas[idx];
    if (tipo === 'opcion_multiple') {
      return typeof resp === 'number' && resp === (ejercicio.respuestaCorrecta ?? -1);
    }
    // Ejercicios de completar eliminados
    if (tipo === 'vocabulario') {
      const pares = ejercicio.pares || [];
      if (!Array.isArray(resp)) return false;
      return pares.every(par => resp.includes(par.izquierda) && resp.includes(par.derecha));
    }
    if (tipo === 'relacionar') {
      const pares = ejercicio.pares || [];
      const matches = relUserMatches[idx] || {};
      // Validar que cada item de la izquierda está emparejado con el item correcto de la derecha
      return relLeft[idx]?.every((leftText, leftIdx) => {
        const rightIdx = matches[leftIdx];
        const rightText = relRight[idx]?.[rightIdx];
        if (rightIdx === undefined || rightText === undefined) return false;
        // Es correcto si el par (leftText, rightText) existe en la lista original
        return pares.some(p => p.izquierda === leftText && p.derecha === rightText);
      }) ?? false;
    }
    // Para "reflexion" basta con contenido; para "escribir" usamos evaluación heurística; "oral" similar
    if (tipo === 'reflexion') {
      return !!resp && String(resp).trim().length > 0;
    }
    if (tipo === 'escribir') {
      if (!resp || String(resp).trim().length === 0) return false;
      const { passed } = evaluarEscribir(String(resp), ejercicio);
      return passed;
    }
    if (tipo === 'oral') {
      if (!resp || String(resp).trim().length === 0) return false;
      const { passed } = evaluarOral(String(resp), ejercicio);
      return passed;
    }
    return false;
  };

  // Recalcular progreso y disparar onComplete si procede
  const prevProgress = React.useRef<{correct: number; total: number} | null>(null);
  useEffect(() => {
    const total = ejercicios.length; // No lo ponemos en deps para evitar bucles si el padre recrea el array
    let correct = 0;
    for (let i = 0; i < total; i++) {
      if (ejercicioCorrecto(ejercicios[i], i)) correct++;
    }
    const current = { correct, total };
    // Sólo notificar si cambió
    if (!prevProgress.current || prevProgress.current.correct !== correct || prevProgress.current.total !== total) {
      onProgressChange?.(current);
      prevProgress.current = current;
    }
    if (!alreadyCompleted && correct === total && total > 0) {
      console.log(`🎯 EjerciciosInteractivos: Disparando onComplete (${correct}/${total})`);
      setAlreadyCompleted(true);
      onComplete?.();
    }
  }, [respuestas]);

  const checkCompletar = (idx: number, solucion: string[]) => {
    const user = respuestas[idx] || [];
    const ok = Array.isArray(user) && user.length === solucion.length && user.every((v, i) => v.trim().toLowerCase() === solucion[i].toLowerCase());
    setFeedback((prev: any) => ({ ...prev, [idx]: ok ? '¡Correcto!' : 'Incorrecto' }));
  };

  const checkOpcionMultiple = (idx: number, respuestaCorrecta: number, seleccion: number) => {
    setRespuestas((prev: any) => ({ ...prev, [idx]: seleccion }));
    setFeedback((prev: any) => ({ ...prev, [idx]: seleccion === respuestaCorrecta ? '¡Correcto!' : 'Incorrecto' }));
  };

  const renderEjercicio = (ejercicio: Ejercicio, idx: number) => {
    switch (ejercicio.tipo) {
      case "completar":
      case "rellenar_huecos":
        // Ejercicios de completar espacios eliminados - no renderizar
        return null;

      case "oral":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Expresión oral</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado || 'Pulsa el micrófono y habla. Verás tu transcripción en tiempo real.'}</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              {!isListening[idx] ? (
                <TouchableOpacity style={styles.checkButton} onPress={() => startOral(idx)}>
                  <Text style={styles.checkButtonText}>Hablar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.checkButton, { backgroundColor: '#000' }]} onPress={() => stopOral(idx)}>
                  <Text style={styles.checkButtonText}>Detener</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.checkButton, { backgroundColor: '#000' }]}
                onPress={() => {
                  const oral = evaluarOral(String(transcripts[idx] || respuestas[idx] || ''), ejercicio);
                  const resumen = `Puntaje oral: ${oral.score}/100 - ${oral.passed ? 'Aprobado' : 'Mejorar'}\n` + oral.detalles.map(d => `• ${d}`).join('\n');
                  setFeedback((prev: any) => ({ ...prev, [idx]: resumen }));
                }}
              >
                <Text style={styles.checkButtonText}>Evaluar oral</Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
              <Text style={{ fontSize: 14, color: '#000', marginBottom: 6 }}>Transcripción:</Text>
              <Text style={{ fontSize: 16, color: '#000' }}>{transcripts[idx] || respuestas[idx] || ''}</Text>
            </View>
            {feedback[idx] && (
              <Text style={[styles.feedback, { color: (evaluarOral(String(transcripts[idx] || respuestas[idx] || ''), ejercicio).passed ? '#2e7d32' : '#e53935') }]}>
                {feedback[idx]}
              </Text>
            )}
          </View>
        );

      case "opcion_multiple":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Opción múltiple</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.pregunta || ejercicio.enunciado}</Text>
            {(omOpciones[idx] || ejercicio.opciones || []).map((opcion: string, i: number) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.opcionButton,
                  respuestas[idx] === i && styles.opcionSeleccionada,
                  mostrarRespuestas && i === (omCorrectIdx[idx] ?? ejercicio.respuestaCorrecta ?? -1) && styles.opcionCorrecta
                ]}
                onPress={() => checkOpcionMultiple(idx, (omCorrectIdx[idx] ?? ejercicio.respuestaCorrecta ?? 0), i)}
              >
                <Text style={[
                  styles.opcionText,
                  respuestas[idx] === i && styles.opcionTextSeleccionada,
                  mostrarRespuestas && i === (omCorrectIdx[idx] ?? ejercicio.respuestaCorrecta ?? -1) && styles.opcionTextCorrecta
                ]}>
                  {opcion} {mostrarRespuestas && i === (omCorrectIdx[idx] ?? ejercicio.respuestaCorrecta ?? -1) ? ' ✓' : ''}
                </Text>
              </TouchableOpacity>
            ))}
            {feedback[idx] && (
              <Text style={[styles.feedback, { color: feedback[idx] === '¡Correcto!' ? '#4CAF50' : '#f44336' }]}>
                {feedback[idx]}
              </Text>
            )}
            {mostrarRespuestas && ejercicio.explicacion && (
              <View style={styles.explicacionContainer}>
                <Text style={styles.explicacionText}>{ejercicio.explicacion}</Text>
                {ejercicio.explicacionAr && (
                  <Text style={styles.explicacionAr}>{ejercicio.explicacionAr}</Text>
                )}
              </View>
            )}
          </View>
        );

      case "reflexion":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Reflexión</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.titulo || ejercicio.enunciado}</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe tu reflexión aquí..."
              multiline
              numberOfLines={4}
              value={respuestas[idx] || ''}
              onChangeText={(text) => handleInput(idx, text)}
            />
          </View>
        );

      case "vocabulario":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Vocabulario</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.titulo || ejercicio.enunciado}</Text>
            
            {/* Lista de todas las opciones mezcladas */}
            <View style={styles.opcionesContainer}>
              {opcionesDesordenadas[idx]?.map((opcion: string, opcionIdx: number) => {
                const esSeleccionada = ejercicio.pares?.some(par => 
                  (par.izquierda === opcion || par.derecha === opcion) &&
                  respuestas[idx]?.includes(opcion)
                );
                
                const parRelacionado = ejercicio.pares?.find(par => 
                  par.izquierda === opcion || par.derecha === opcion
                );
                
                const esCorrecta = esSeleccionada && 
                  respuestas[idx]?.some((r: string) => 
                    (parRelacionado?.izquierda === r || parRelacionado?.derecha === r) &&
                    ((parRelacionado.izquierda === opcion && parRelacionado.derecha === r) ||
                     (parRelacionado.derecha === opcion && parRelacionado.izquierda === r))
                  );
                
                return (
                  <TouchableOpacity
                    key={opcionIdx}
                    style={[
                      styles.opcionVocabulario,
                      esSeleccionada && (
                        esCorrecta ? styles.opcionCorrecta : styles.opcionIncorrecta
                      )
                    ]}
                    onPress={() => {
                      // Si ya está seleccionada, la quitamos
                      if (esSeleccionada) {
                        const nuevasRespuestas = (respuestas[idx] || []).filter(
                          (r: string) => r !== opcion
                        );
                        handleInput(idx, nuevasRespuestas);
                      } 
                      // Si no está seleccionada, la añadimos
                      else {
                        const nuevasRespuestas = [...(respuestas[idx] || []), opcion];
                        handleInput(idx, nuevasRespuestas);
                      }
                    }}
                  >
                    <Text style={styles.opcionVocabularioText}>
                      {opcion}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {/* Mostrar pares correctos seleccionados */}
            {ejercicio.pares?.map((par: any, i: number) => {
              const estaCompleto = respuestas[idx]?.includes(par.izquierda) && 
                                 respuestas[idx]?.includes(par.derecha);
              
              if (estaCompleto) {
                return (
                  <View key={i} style={styles.parCorrectoContainer}>
                    <Text style={styles.parCorrectoText}>
                      {par.izquierda} → {par.derecha} ✓
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        );


      case "escribir":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Expresión escrita</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Escribe tu respuesta aquí..."
              multiline
              numberOfLines={4}
              value={respuestas[idx] || ''}
              onChangeText={(text) => handleInput(idx, text)}
            />
            <TouchableOpacity
              style={[styles.checkButton, { marginTop: 10 }]}
              onPress={() => {
                const res = evaluarEscribir(String(respuestas[idx] || ''), ejercicio);
                const resumen = `Puntaje: ${res.score}/100 - ${res.passed ? 'Aprobado' : 'Mejorar'}\n` + res.detalles.map(d => `• ${d}`).join('\n');
                setFeedback((prev: any) => ({ ...prev, [idx]: resumen }));
              }}
            >
              <Text style={styles.checkButtonText}>Revisar texto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkButton, { marginTop: 10, backgroundColor: '#000' }]}
              onPress={() => corregirConLanguageTool(idx, String(respuestas[idx] || ''))}
              disabled={!!ltLoading[idx]}
            >
              <Text style={styles.checkButtonText}>
                {ltLoading[idx] ? 'Analizando...' : 'Corregir con LanguageTool'}
              </Text>
            </TouchableOpacity>
            {feedback[idx] && (
              <Text style={[styles.feedback, { color: (evaluarEscribir(String(respuestas[idx] || ''), ejercicio).passed ? '#2e7d32' : '#e53935') }]}>
                {feedback[idx]}
              </Text>
            )}
            {Array.isArray(ltSuggestions[idx]) && ltSuggestions[idx].length > 0 && (
              <View style={{ marginTop: 8 }}>
                {ltSuggestions[idx].slice(0, 10).map((m: any, i: number) => (
                  <Text key={i} style={{ fontSize: 14, color: '#000', marginBottom: 4 }}>
                    • {m?.message || 'Sugerencia'} {m?.replacements?.[0]?.value ? `(→ ${m.replacements[0].value})` : ''}
                  </Text>
                ))}
                {ltSuggestions[idx].length > 10 && (
                  <Text style={{ fontSize: 12, color: '#000', marginTop: 4 }}>
                    Y {ltSuggestions[idx].length - 10} sugerencia(s) más...
                  </Text>
                )}
              </View>
            )}
          </View>
        );

      case "relacionar":
        return (
          <View key={idx} style={styles.ejercicioContainer}>
            <Text style={styles.ejercicioTitulo}>Ejercicio {idx + 1}: Relacionar</Text>
            <Text style={styles.ejercicioEnunciado}>{ejercicio.enunciado}</Text>

            <View style={styles.relTable}>
              <View style={styles.relHeaderRow}>
                <Text style={styles.relHeaderText}>Izquierda</Text>
                <Text style={styles.relHeaderText}>Derecha</Text>
              </View>
              <View style={styles.relBody}>
                <View style={styles.relColumn}>
                  {relLeft[idx]?.map((text, li) => {
                    const isSelected = relSelectedLeft[idx] === li;
                    const isMatched = relUserMatches[idx] && relUserMatches[idx][li] !== undefined;
                    return (
                      <TouchableOpacity
                        key={`L-${li}`}
                        style={[styles.relCell, isSelected && styles.relCellSelected, isMatched && styles.relCellMatched]}
                        onPress={() => {
                          setRelSelectedLeft(prev => ({ ...prev, [idx]: li }));
                        }}
                      >
                        <Text style={styles.relCellText}>{text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.relColumn}>
                  {relRight[idx]?.map((text, ri) => {
                    // comprobar si ya está emparejado por algún left
                    const alreadyMatched = Object.values(relUserMatches[idx] || {}).includes(ri);
                    return (
                      <TouchableOpacity
                        key={`R-${ri}`}
                        style={[styles.relCell, alreadyMatched && styles.relCellMatched]}
                        onPress={() => {
                          const leftSel = relSelectedLeft[idx];
                          if (leftSel === null || leftSel === undefined) return;
                          // evitar reusar una derecha ya emparejada
                          if (alreadyMatched) return;
                          setRelUserMatches(prev => ({
                            ...prev,
                            [idx]: { ...(prev[idx] || {}), [leftSel]: ri }
                          }));
                          setRelSelectedLeft(prev => ({ ...prev, [idx]: null }));
                        }}
                      >
                        <Text style={styles.relCellText}>{text}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Resultado visual de pares */}
            <View style={{ marginTop: 12 }}>
              {(Object.entries(relUserMatches[idx] || {})).map(([lIdxStr, rIdx], i) => {
                const lIdx = Number(lIdxStr);
                const lText = relLeft[idx]?.[lIdx];
                const rText = relRight[idx]?.[rIdx];
                const correcto = (ejercicio.pares || []).some(p => p.izquierda === lText && p.derecha === rText);
                return (
                  <View key={i} style={styles.relPairRow}>
                    <Text style={[styles.parCorrectoText, correcto ? styles.relPairOk : styles.relPairKo]}>
                      {lText} → {rText} {correcto ? '✓' : '✗'}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Controles de relación */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => {
                  // traducir matches a respuestas para compatibilidad y progreso
                  const paresSeleccionados: string[] = [];
                  Object.entries(relUserMatches[idx] || {}).forEach(([lIdxStr, rIdx]) => {
                    const lIdx = Number(lIdxStr);
                    paresSeleccionados.push(relLeft[idx]?.[lIdx] || '');
                    paresSeleccionados.push(relRight[idx]?.[rIdx] || '');
                  });
                  handleInput(idx, paresSeleccionados);
                  const ok = ejercicioCorrecto(ejercicio, idx);
                  setFeedback((prev: any) => ({ ...prev, [idx]: ok ? '¡Correcto!' : 'Incorrecto' }));
                }}
              >
                <Text style={styles.checkButtonText}>Comprobar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.checkButton, { backgroundColor: '#000' }]}
                onPress={() => {
                  setRelSelectedLeft(prev => ({ ...prev, [idx]: null }));
                  setRelUserMatches(prev => ({ ...prev, [idx]: {} }));
                  setFeedback((prev: any) => ({ ...prev, [idx]: undefined }));
                }}
              >
                <Text style={styles.checkButtonText}>Reiniciar</Text>
              </TouchableOpacity>
            </View>

            {feedback[idx] && (
              <Text style={[styles.feedback, { color: feedback[idx] === '¡Correcto!' ? '#4CAF50' : '#f44336' }]}> 
                {feedback[idx]}
              </Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  // Filtrar ejercicios de completar antes de renderizar
  const ejerciciosFiltrados = ejercicios.filter(ej => 
    ej.tipo !== 'completar' && ej.tipo !== 'rellenar_huecos'
  );

  return (
    <View style={styles.container}>
      {ejerciciosFiltrados.map((ejercicio, idx) => {
        // Recalcular índice basado en ejercicios filtrados
        const originalIdx = ejercicios.findIndex(e => e === ejercicio);
        return renderEjercicio(ejercicio, originalIdx);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  ejercicioContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
  },
  ejercicioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  ejercicioEnunciado: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minWidth: 120,
    backgroundColor: '#f9f9f9',
  },
  // Input compacto para una sola letra
  letterInput: {
    minWidth: 44,
    width: 48,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  checkButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  checkButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  opcionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  opcionSeleccionada: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  opcionText: {
    fontSize: 16,
    color: '#000',
  },
  opcionTextSeleccionada: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  opcionTextCorrecta: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  explicacionContainer: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  explicacionText: {
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
  },
  explicacionAr: {
    fontSize: 14,
    color: '#000',
    fontStyle: 'italic',
    marginTop: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  parContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parTexto: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  parFlecha: {
    fontSize: 18,
    color: '#000',
    marginHorizontal: 12,
  },
  relacionarButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  relacionarButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  
  relacionarButtonTextCorrecto: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  relacionarButtonTextIncorrecto: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  opcionesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  opcionVocabulario: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionVocabularioText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  // ===== Teclado/banco de letras sugeridas =====
  letterKeysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
    marginBottom: 12,
    justifyContent: 'center',
  },
  letterKey: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== Estilos para RELACIONAR (tabla de dos columnas) =====
  relTable: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  relHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  relHeaderText: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#1976d2',
    textAlign: 'center',
  },
  relBody: {
    flexDirection: 'row',
  },
  relColumn: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  relCell: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  relCellSelected: {
    borderColor: '#1976d2',
    backgroundColor: '#e3f2fd',
  },
  relCellMatched: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  relCellHint: {
    borderColor: '#ffc107',
    backgroundColor: '#fff8e1',
  },
  relCellText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  relPairRow: {
    paddingVertical: 6,
  },
  relPairOk: {
    color: '#2e7d32',
  },
  relPairKo: {
    color: '#c62828',
  },
  opcionCorrecta: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  opcionIncorrecta: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  parCorrectoContainer: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    marginVertical: 8,
  },
  parCorrectoText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '500',
  },
  respuestasButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  respuestasButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 