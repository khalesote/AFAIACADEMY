import contenido_clases
import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk
import os

AVATAR_PATH = "yo.png"

class ProfesorVirtualGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Profesor Virtual - Academia de Inmigrantes")
        self.geometry("700x600")
        self.resizable(False, False)
        self.nivel = tk.StringVar(value="A1")
        self.unidad = tk.IntVar(value=1)
        self.create_widgets()
        self.show_clase()

    def create_widgets(self):
        # Avatar
        avatar_frame = tk.Frame(self)
        avatar_frame.pack(pady=10)
        if os.path.exists(AVATAR_PATH):
            img = Image.open(AVATAR_PATH).resize((120, 120))
            self.avatar_img = ImageTk.PhotoImage(img)
            avatar_label = tk.Label(avatar_frame, image=self.avatar_img)
            avatar_label.pack()
        else:
            avatar_label = tk.Label(avatar_frame, text="[Sin foto]")
            avatar_label.pack()
        tk.Label(avatar_frame, text="Tu profesor virtual", font=("Arial", 14, "bold")).pack()

        # Nivel y unidad
        control_frame = tk.Frame(self)
        control_frame.pack(pady=5)
        tk.Label(control_frame, text="Nivel:").grid(row=0, column=0)
        nivel_cb = ttk.Combobox(control_frame, values=["A1", "A2"], textvariable=self.nivel, width=5, state="readonly")
        nivel_cb.grid(row=0, column=1)
        nivel_cb.bind("<<ComboboxSelected>>", lambda e: self.update_unidades())
        tk.Label(control_frame, text="Unidad:").grid(row=0, column=2)
        self.unidad_cb = ttk.Combobox(control_frame, width=3, textvariable=self.unidad, state="readonly")
        self.unidad_cb.grid(row=0, column=3)
        self.update_unidades()
        self.unidad_cb.bind("<<ComboboxSelected>>", lambda e: self.show_clase())
        mostrar_btn = tk.Button(control_frame, text="Mostrar clase", command=self.show_clase)
        mostrar_btn.grid(row=0, column=4, padx=8)

        # Contenido de la clase
        self.text = tk.Text(self, wrap="word", font=("Arial", 11), width=80, height=25)
        self.text.pack(padx=10, pady=10)

    def update_unidades(self):
        nivel = self.nivel.get()
        unidades = contenido_clases.contenido_clases[nivel]
        unidad_nums = [u["unidad"] for u in unidades]
        self.unidad_cb["values"] = unidad_nums
        self.unidad.set(unidad_nums[0])
        self.show_clase()

    def show_clase(self):
        self.text.delete("1.0", tk.END)
        nivel = self.nivel.get()
        unidad_idx = self.unidad.get() - 1
        unidad = contenido_clases.contenido_clases[nivel][unidad_idx]
        out = []
        out.append(f"Unidad {unidad['unidad']}: {unidad['titulo']}")
        out.append(f"Tema: {unidad['tema']}\nTema (árabe): {unidad['tema_ar']}")
        out.append("\n--- Gramática ---")
        for g, g_ar in zip(unidad['gramatica'], unidad['gramatica_ar']):
            out.append(f"- {g} | {g_ar}")
        out.append("\n--- Vocabulario ---")
        for v, v_ar in zip(unidad['vocabulario'], unidad['vocabulario_ar']):
            out.append(f"- {v} | {v_ar}")
        out.append("\n--- Expresión oral ---")
        for eo, eo_ar in zip(unidad['expresion_oral'], unidad['expresion_oral_ar']):
            out.append(f"- {eo} | {eo_ar}")
        out.append("\n--- Expresión escrita ---")
        for ee, ee_ar in zip(unidad['expresion_escrita'], unidad['expresion_escrita_ar']):
            out.append(f"- {ee} | {ee_ar}")
        out.append("\n--- Comprensión auditiva ---")
        for ca, ca_ar in zip(unidad['comprension_auditiva'], unidad['comprension_auditiva_ar']):
            out.append(f"- {ca} | {ca_ar}")
        out.append("\n--- Comprensión lectora ---")
        for cl, cl_ar in zip(unidad['comprension_lectora'], unidad['comprension_lectora_ar']):
            out.append(f"- {cl} | {cl_ar}")
        out.append("\n--- Ejercicios prácticos ---")
        for ej in unidad['ejercicios']:
            out.append(f"- {ej['es']} | {ej['ar']}")
        self.text.insert(tk.END, "\n".join(out))

if __name__ == "__main__":
    app = ProfesorVirtualGUI()
    app.mainloop()
