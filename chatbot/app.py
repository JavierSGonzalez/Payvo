import os
import time
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
        return jsonify({"response": response_content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
if __name__ == '__main__':
    app.run(debug=True)