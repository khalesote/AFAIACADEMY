# Script para agregar avatar y duración de video a las primeras 5 unidades de cada nivel en contenido_clases.py
import re
import ast

AVATAR_URL = "https://studio.d-id.com/share?id=78273e102878eaf5a66f74ccee64b5cb&utm_source=copy"
VIDEO_DURATION = 45

# Lee el archivo como texto
with open("contenido_clases.py", "r", encoding="utf-8") as f:
    source = f.read()

# Busca el bloque del diccionario principal usando una expresión regular
match = re.search(r"contenido_clases\s*=\s*({.*?})\s*\n# NOTA", source, re.DOTALL)
if not match:
    raise Exception("No se encontró el diccionario contenido_clases")

contenido_dict_str = match.group(1)
contenido_dict = ast.literal_eval(contenido_dict_str)

# Modifica las primeras 5 unidades de cada nivel
for nivel in ["A1", "A2", "B1", "B2"]:
    if nivel in contenido_dict:
        for unidad in contenido_dict[nivel][:5]:
            unidad["avatar"] = AVATAR_URL
            unidad["duracion_video"] = VIDEO_DURATION

# Escribe el nuevo archivo
with open("contenido_clases.py", "w", encoding="utf-8") as f:
    # Escribe el encabezado y las variables
    f.write("# Contenido de clases A1, A2, B1, B2 con avatar y duración de video\n")
    f.write("AVATAR_URL = '%s'\n" % AVATAR_URL)
    f.write("VIDEO_DURATION = %d\n\n" % VIDEO_DURATION)
    f.write("contenido_clases = ")
    f.write(repr(contenido_dict))
    f.write("\n\n# NOTA: Por razones de espacio, aquí solo se muestra la estructura y la primera unidad de ejemplo.\n")
    f.write("# El contenido completo de todas las unidades (A1 y A2) será generado y extendido en los siguientes pasos.\n")
    f.write("# Puedes importar este archivo como módulo y acceder a contenido_clases para alimentar el profesor virtual.\n")

print("¡Listo! Se han agregado los campos avatar y duracion_video a las primeras 5 unidades de cada nivel.")
