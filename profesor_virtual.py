import contenido_clases
import sys

# --- Profesor Virtual: Interfaz de consola ---

def seleccionar_nivel():
    print("\nBienvenido/a al Profesor Virtual del Instituto Cervantes!")
    print("Niveles disponibles:")
    print("1. A1")
    print("2. A2")
    while True:
        nivel = input("Selecciona el nivel (1 o 2): ").strip()
        if nivel == "1":
            return "A1"
        elif nivel == "2":
            return "A2"
        else:
            print("Por favor, elige 1 o 2.")

def seleccionar_unidad(nivel):
    unidades = contenido_clases.contenido_clases[nivel]
    print(f"\nUnidades disponibles en {nivel}:")
    for u in unidades:
        print(f"{u['unidad']}. {u['titulo']}")
    while True:
        try:
            num = int(input("Selecciona la unidad (número): ").strip())
            if 1 <= num <= len(unidades):
                return unidades[num-1]
            else:
                print("Número fuera de rango.")
        except ValueError:
            print("Introduce un número válido.")

def mostrar_clase(unidad):
    print(f"\n{'='*40}")
    print(f"Unidad {unidad['unidad']}: {unidad['titulo']}")
    print(f"Tema: {unidad['tema']}\nTema (árabe): {unidad['tema_ar']}")
    print("\n--- Gramática ---")
    for g, g_ar in zip(unidad['gramatica'], unidad['gramatica_ar']):
        print(f"- {g} | {g_ar}")
    print("\n--- Vocabulario ---")
    for v, v_ar in zip(unidad['vocabulario'], unidad['vocabulario_ar']):
        print(f"- {v} | {v_ar}")
    print("\n--- Expresión oral ---")
    for eo, eo_ar in zip(unidad['expresion_oral'], unidad['expresion_oral_ar']):
        print(f"- {eo} | {eo_ar}")
    print("\n--- Expresión escrita ---")
    for ee, ee_ar in zip(unidad['expresion_escrita'], unidad['expresion_escrita_ar']):
        print(f"- {ee} | {ee_ar}")
    print("\n--- Comprensión auditiva ---")
    for ca, ca_ar in zip(unidad['comprension_auditiva'], unidad['comprension_auditiva_ar']):
        print(f"- {ca} | {ca_ar}")
    print("\n--- Comprensión lectora ---")
    for cl, cl_ar in zip(unidad['comprension_lectora'], unidad['comprension_lectora_ar']):
        print(f"- {cl} | {cl_ar}")
    print("\n--- Ejercicios prácticos ---")
    for ej in unidad['ejercicios']:
        print(f"- {ej['es']} | {ej['ar']}")
    print(f"{'='*40}\n")

def modo_interactivo(unidad):
    print("\n¿Quieres practicar ejercicios de esta unidad?")
    resp = input("(s/n): ").strip().lower()
    if resp == "s":
        for i, ej in enumerate(unidad['ejercicios'], 1):
            print(f"\nEjercicio {i}: {ej['es']}")
            input("Tu respuesta: ")
            print(f"Solución sugerida: {ej['ar']}")
        print("\n¡Muy bien! Puedes repetir la unidad o elegir otra.")
    else:
        print("Puedes repasar la teoría o elegir otra unidad cuando quieras.")

def main():
    while True:
        nivel = seleccionar_nivel()
        unidad = seleccionar_unidad(nivel)
        mostrar_clase(unidad)
        modo_interactivo(unidad)
        print("\n¿Quieres salir del Profesor Virtual?")
        if input("(s para salir / Enter para continuar): ").strip().lower() == "s":
            print("¡Hasta pronto!")
            sys.exit(0)

if __name__ == "__main__":
    main()
