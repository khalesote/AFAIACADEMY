# Diseño General del Juego (GDD)

## 1. Visión del Proyecto
- **Título provisional:** Academy Battle Worlds
- **Género:** Acción-aventura en tercera persona con elementos educativos.
- **Inspiraciones:** War Robots (combate mech), Super Mario (plataformas), experiencias AAA móviles.
- **Plataformas objetivo:** Android y iOS (fase alfa en Android), posible port a PC.
- **Público objetivo:** Jóvenes y adultos interesados en aprendizaje de idiomas con jugabilidad de alto impacto.
- **Objetivo educativo:** Reforzar vocabulario y estructuras gramaticales mediante desafíos integrados al gameplay.

## 2. Mecánicas Principales
- **Exploración 3D:** Niveles semiabiertos con rutas alternativas.
- **Combate con mechas:** Control de robots personalizados, ataques cuerpo a cuerpo y a distancia.
- **Retos lingüísticos:** Puertas, terminales o NPCs que exigen completar frases/palabras usando recursos recolectados en el nivel.
- **Plataformas dinámicas:** Saltos, obstáculos móviles, trampas ambientales.
- **Progresión:** Sistema de experiencia, desbloqueo de habilidades lingüísticas (traducción rápida, escudos activados mediante frases).

## 3. Estilo Audiovisual
- **Dirección artística:** Futurista con estética neon y trazos limpios.
- **Modelado:** Mechas estilizados (low-poly avanzado) con texturas PBR.
- **UI/HUD:** Interfaces holográficas, indicadores claros de vocabulario y objetivos.
- **Audio:** Música electrónica ambiental, efectos de combate contundentes, locuciones bilingües.

## 4. Contenido Inicial (Vertical Slice)
- **Nivel 1:** Tutorial en ciudad futurista, introduce movimiento, combate básico y primer reto lingüístico.
- **Enemigos:** Drones de vigilancia, torretas estáticas, mini-boss al final.
- **Objetivos educativos:** Vocabulario de direcciones, instrucciones y acciones.
- **Narrativa breve:** Mensajes de una IA mentora que guía al jugador.

## 5. Sistemas Clave
- **Física:** Colisiones, gravedad realista, empujes de habilidades.
- **IA enemiga:** Comportamientos simples (patrulla, persecución, ataque), escalando a tácticas de equipo.
- **Inventario de letras/tokens:** Recolectar símbolos para construir frases exigidas en checkpoints.
- **Multiplicadores:** Combos de vocabulario correcto que incrementan puntuación.

## 6. Requisitos Técnicos
- **Motor:** Unity (HDRP/URP según plataforma) o Unreal Engine 5 (Lumen para iluminación)
- **Lenguajes:** C# (Unity) o C++/Blueprints (Unreal).
- **Control de versiones:** Git (GitHub/GitLab) con integración continua.
- **Herramientas de arte:** Blender, Substance Painter (opcional), Krita.
- **Audio:** Audacity, bibliotecas libres o producción propia.
- **Backend opcional:** PlayFab/Photon para futurible multijugador.

## 7. Equipo y Roles
- **Programación gameplay:** Controles, IA, sistemas de misiones.
- **Artista 3D:** Modelado de mechas, entornos, texturas.
- **Diseñador de niveles:** Layouts, pacing de retos.
- **Diseñador narrativa/educativo:** Integración de objetivos lingüísticos.
- **Ingeniero de sonido:** FX y música.
- **QA:** Pruebas en dispositivos objetivo.

## 8. Cronograma Tentativo
- **Fase 0 (2 semanas):** Prototipo de movimiento y combate básico.
- **Fase 1 (4 semanas):** Vertical slice con tutorial completo.
- **Fase 2 (6 semanas):** Expansión del contenido, pulido visual y audio.
- **Fase 3 (4 semanas):** Optimización, QA y preparación de demo.

## 9. Métricas de Éxito
- Tiempo promedio para completar el tutorial.
- % de acertijos lingüísticos resueltos sin errores.
- Estabilidad del frame rate (>50 FPS en móviles gama media-alta).
- Retención de usuarios entre sesiones (medir en pruebas cerradas).

## 10. Próximos Pasos
1. Validar y expandir este documento con aportes del equipo.
2. Preparar estructura de repositorio y pipeline de assets.
3. Generar prototipo jugable mínimo en el motor elegido.
