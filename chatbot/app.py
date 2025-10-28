import os
import time
import re  # Importar el módulo de expresiones regulares
from flask import Flask, request, jsonify
from groq import Groq
from flask_cors import CORS

app = Flask(__name__)
<<<<<<< HEAD
CORS(app)  
 
mi_clave_api = "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"
=======
CORS(app)

mi_clave_api = "api en teams"
>>>>>>> e59de9b6a4afbdcf5146bf7591ecb9927cb27a2d
client = Groq(
    api_key=mi_clave_api,
)

<<<<<<< HEAD
=======
# Patron de expresiones regulares para buscar cálculos simples como "100 - 32 = 68"
# También busca la sintaxis LaTeX que el modelo podría estar usando, como \text{...}=...
CALC_PATTERN = re.compile(r'(\d+)\s*[+-]\s*(\d+)\s*=\s*(\d+)|(\d+)\s*[+-]\s*(\d+)\s*=\s*\$(\d+)', re.IGNORECASE)
LATEX_PATTERN = re.compile(r'\\\[\s*\\text\{.+\}\s*=\s*(\d+\s*-\s*\d+\s*=\s*\d+)\s*\]')


>>>>>>> e59de9b6a4afbdcf5146bf7591ecb9927cb27a2d
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_question = data.get("question")

    # Dejamos la respuesta fija del teléfono sin cambios
    if user_question == "Can I buy a $200 cell phone with my current salary?":
        time.sleep(3)
        return jsonify({"response": "Hello!\n\n"
        "With the money you have available, the answer is clear: **you should not buy the cell phone right now.** Here is the plan so you can do it without putting your finances at risk:\n\n"
        "**1. Prioritize the urgent expense:** Next week you have an important payment of $100. You need to make sure that money is set aside so you can cover it on time and avoid any late fees or problems.\n\n"
        "**2. Wait to receive your next income:** Two days after that urgent payment, you will receive your next income of $500. This is the money you should use for the cell phone.\n\n"
        "**3. Buy the cell phone without pressure:** Once you have received the $500 and have already covered the $100 payment, you will have a secure balance. At that moment you can buy your new cell phone knowing you are not compromising essential expenses.\n\n"
        "By following this plan you ensure your finances stay stable and you can enjoy your sneakers without stress. \n\n"}), 200

    if not user_question:
        return jsonify({"error": "No se proporcionó ninguna pregunta"}), 400

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_question,
                }
            ],
            model="compound-beta",
        )
        response_content = chat_completion.choices[0].message.content

        # 1. Eliminar/Limpiar el código LaTeX que causa el error de visualización
        # Esto quita el código de LaTeX completo y sólo deja el cálculo simple
        response_content = LATEX_PATTERN.sub(r'\1', response_content)

        # 2. Reemplazar cualquier cálculo simple restante (e.g., "100 - 32 = 68")
        # con un encabezado Markdown "##" para que se vea grande.
        # Esto imita el estilo de la imagen.
        def format_calc_to_header(match):
            # Obtiene el texto del cálculo (grupo 1 o 4) y lo formatea
            if match.group(1):
                # Formato para el caso "100 - 32 = 68"
                return f"## ${match.group(1)} - ${match.group(2)} = ${match.group(3)}"
            elif match.group(4):
                # Formato para el caso "100 - 32 = $68"
                return f"## ${match.group(4)} - ${match.group(5)} = ${match.group(6)}"
            else:
                # Formato para el caso que viene del patrón LaTeX (\1)
                return f"## {match.group(0)}"

        # Aplicar el reemplazo al contenido de la respuesta
        # Nota: El patrón CALC_PATTERN es simple, si la IA genera textos más complejos 
        # será necesario ajustarlo.
        response_content = CALC_PATTERN.sub(format_calc_to_header, response_content)

        return jsonify({"response": response_content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)