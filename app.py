# Importa las clases necesarias desde Flask
from flask import Flask, request, jsonify, render_template

# Importa la clase para interactuar con la API de OpenAI
import openai

# Crea una instancia de la aplicación Flask
app = Flask(__name__, static_url_path='/static')

# Configura la clave de API de OpenAI
openai.api_key = "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"

# Ruta para la página principal
@app.route('/')
def index():
    return render_template('index.html') # Renderiza la plantilla HTM

# Ruta para manejar el envío de mensajes desde el formulario
@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.form.get('message') # Obtiene el mensaje del usuario desde el formulario

    # Llamada a la API de OpenAI GPT-3 para obtener una respuesta
    response = openai.Completion.create(
        engine="text-davinci-003",  # Motor GPT-3
        prompt=user_message, # El mensaje del usuario como entrada
        max_tokens=200  # Número máximo de palabras en la respuesta
    )

    bot_response = response.choices[0].text.strip() # Obtiene la respuesta generada por el modelo
    return jsonify({"response": bot_response}) # Devuelve la respuesta como un objeto JSON
    
# Ejecuta la aplicación si este archivo es el punto de entrada    
if __name__ == '__main__':
    app.run(debug=True) # Inicia la aplicación en modo de depuración

