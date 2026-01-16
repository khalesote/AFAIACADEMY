import json
from contenido_clases import contenido_clases

# Genera preguntas de ejemplo para examen a partir de los títulos de las unidades
def generar_examen_para_nivel(unidades):
    preguntas = []
    for unidad in unidades:
        # Pregunta tipo test basada en el título/tema
        pregunta = {
            "pregunta": f"¿Cuál es el tema principal de la unidad '{unidad.get('titulo', '')}'?",
            "opciones": [
                unidad.get("tema", ""),
                "Otro tema",
                "Tema inventado",
                "No sé"
            ],
            "respuesta_correcta": unidad.get("tema", ""),
            "unidad": unidad.get("unidad", None)
        }
        preguntas.append(pregunta)
    return preguntas

# Prepara la estructura exportable
export_data = {}
for nivel, unidades in contenido_clases.items():
    export_data[nivel] = {
        "unidades": [
            {
                "unidad": u.get("unidad"),
                "titulo": u.get("titulo"),
                "avatar": u.get("avatar", None),
                "duracion_video": u.get("duracion_video", None)
            } for u in unidades
        ],
        "examen": generar_examen_para_nivel(unidades)
    }

with open("unidades_y_examenes.json", "w", encoding="utf-8") as f:
    json.dump(export_data, f, ensure_ascii=False, indent=2)

print("Archivo 'unidades_y_examenes.json' generado correctamente.")
