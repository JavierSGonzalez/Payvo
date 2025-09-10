import os
from flask import Flask, request, jsonify
from groq import Groq
from flask_cors import CORS  
 
app = Flask(__name__)
CORS(app)  
 
mi_clave_api = "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" 
client = Groq(
    api_key=mi_clave_api,
)
 
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_question = data.get("question")
 
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
        return jsonify({"response": response_content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
if __name__ == '__main__':
    app.run(debug=True)