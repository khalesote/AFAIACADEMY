import os
import requests
import contenido_clases
from dotenv import load_dotenv

# Cargar API Key de D-ID desde .env
load_dotenv(".env")
DID_API_KEY = os.getenv("DID_API_KEY")

AVATAR_ID = "78273e102878eaf5a66f74ccee64b5cb"  # avatar personal D-ID
OUTPUT_DIR = "videos_did"

# Configuración de voz D-ID (masculina, español y árabe)
# Puedes consultar https://docs.d-id.com/docs/voices para más opciones de voz
VOICE_ES = "es-ES-JorgeNeural"  # Masculina español
VOICE_AR = "ar-SA-HamedNeural"  # Masculina árabe

DID_URL = "https://api.d-id.com/talks"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def crear_texto_presentacion(unidad, idioma):
    if idioma == "es":
        return f"Hola, soy tu profesor virtual. Hoy veremos la unidad {unidad['unidad']}: {unidad['titulo']}. {unidad['tema']}"
    else:
        return f"مرحباً، أنا أستاذك الافتراضي. اليوم سندرس الوحدة {unidad['unidad']}: {unidad['titulo']}. {unidad['tema_ar']}"

def crear_video_did(texto, voice_id, nombre_video):
    data = {
        "script": {
            "type": "text",
            "input": texto,
            "provider": {
                "type": "microsoft",
                "voice_id": voice_id
            },
            "ssml": False,
            "lang": "es" if "es" in voice_id else "ar"
        },
        "avatar_id": AVATAR_ID,
        "driver_expressions": {
            "expressions": [
                {"expression": "neutral", "start_frame": 0}
            ]
        }
    }
    headers = {
        "Authorization": f"Basic {DID_API_KEY}",
    }
    print(f"Enviando petición a D-ID para: {nombre_video}")
    response = requests.post(DID_URL, json=data, headers=headers)
    if response.status_code != 200:
        print(f"Error al crear video (status {response.status_code}): {response.text}")
        print(f"Headers enviados: {headers}")
        print(f"Datos enviados: {data}")
        return None
    result = response.json()
    video_url = result.get("result_url")
    # Si la respuesta tiene un campo 'id', esperar a que el video esté listo
    talk_id = result.get("id")
    if talk_id:
        # Polling para esperar a que el video esté listo
        for _ in range(30):
            r = requests.get(f"{DID_URL}/{talk_id}", headers=headers)
            if r.status_code == 200:
                j = r.json()
                if j.get("result_url"):
                    video_url = j["result_url"]
                    break
            import time; time.sleep(2)
    if not video_url:
        print("No se pudo obtener el enlace del video.")
        return None
    # Descargar el video
    video_data = requests.get(video_url).content
    with open(os.path.join(OUTPUT_DIR, nombre_video), "wb") as f:
        f.write(video_data)
    print(f"Video guardado: {nombre_video}")
    return nombre_video


def main():
    niveles = ["A1", "A2", "B1", "B2"]
    unidades_por_nivel = 5  # Solo las primeras 5 unidades de cada nivel
    resumen = []
    for nivel in niveles:
        unidades_candidatas = []
        for unidad in contenido_clases.contenido_clases.get(nivel, []):
            texto_es = crear_texto_presentacion(unidad, "es")
            palabras_es = len(texto_es.split())
            texto_ar = crear_texto_presentacion(unidad, "ar")
            palabras_ar = len(texto_ar.split())
            if palabras_es <= 50 and palabras_ar <= 50:
                unidades_candidatas.append(unidad)
                resumen.append(f"[SELECCIONADA] {nivel} unidad {unidad['unidad']}: {unidad['titulo']} | ES={palabras_es} | AR={palabras_ar}")
            else:
                print(f"[DESCARTADA] {nivel} unidad {unidad['unidad']} por superar las 50 palabras: ES={palabras_es}, AR={palabras_ar}")
                resumen.append(f"[DESCARTADA] {nivel} unidad {unidad['unidad']}: {unidad['titulo']} | ES={palabras_es} | AR={palabras_ar}")
            if len(unidades_candidatas) == unidades_por_nivel:
                break
        if len(unidades_candidatas) < unidades_por_nivel:
            print(f"[AVISO] Solo se encontraron {len(unidades_candidatas)} unidades válidas en {nivel}.")
        for unidad in unidades_candidatas:
            # Español
            texto_es = crear_texto_presentacion(unidad, "es")
            nombre_video_es = f"{nivel}_unidad{unidad['unidad']:02d}_es.mp4"
            crear_video_did(texto_es, VOICE_ES, nombre_video_es)
            # Árabe
            texto_ar = crear_texto_presentacion(unidad, "ar")
            nombre_video_ar = f"{nivel}_unidad{unidad['unidad']:02d}_ar.mp4"
            crear_video_did(texto_ar, VOICE_AR, nombre_video_ar)
    # Guardar resumen
    with open("unidades_seleccionadas.txt", "w", encoding="utf-8") as f:
        f.write("Resumen de unidades seleccionadas y descartadas para vídeos D-ID\n\n")
        for linea in resumen:
            f.write(linea + "\n")
    print("Resumen guardado en unidades_seleccionadas.txt")

    print("Generación de videos finalizada. Recuerda que el tiempo total no debe superar los 15 minutos (aprox. 22 segundos por video).")

if __name__ == "__main__":
    main()
