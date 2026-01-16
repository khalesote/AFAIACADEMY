import os
import requests

GOOGLE_TRANSLATE_API_KEY = os.environ.get('GOOGLE_TRANSLATE_API_KEY')

def get_arabic_translation_google(word):
    if not GOOGLE_TRANSLATE_API_KEY:
        print("No se encontró la API Key de Google Translate. Por favor, configura la variable de entorno GOOGLE_TRANSLATE_API_KEY.")
        return None
    url = "https://translation.googleapis.com/language/translate/v2"
    params = {
        "q": word,
        "source": "es",
        "target": "ar",
        "key": GOOGLE_TRANSLATE_API_KEY
    }
    try:
        response = requests.post(url, params=params, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return data['data']['translations'][0]['translatedText']
        else:
            print("Error:", response.text)
    except Exception as e:
        print(f"Google Translate error con la palabra {word}: {e}")
    return None

if __name__ == "__main__":
    palabra = "abeja"
    traduccion = get_arabic_translation_google(palabra)
    print(f"La traducción de '{palabra}' al árabe es: {traduccion}")
