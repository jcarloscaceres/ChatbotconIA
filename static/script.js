// Espera a que el contenido del documento esté listo
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencias a elementos del DOM
    const chatDisplay = document.getElementById("chat-display"); // Área de visualización de mensajes
    const userInput = document.getElementById("user-input"); // Campo de entrada de texto del usuario
    const sendBtn = document.getElementById("send-btn"); // Botón de enviar

    // Escucha el evento clic en el botón de enviar
    sendBtn.addEventListener("click", function () {
        const userMessage = userInput.value; // Obtiene el mensaje del usuario
        displayMessage("user", "> "+userMessage); // Muestra el mensaje del usuario en la pantalla
        userInput.value = ""; // Borra el campo de entrada

        sendMessageToServer(userMessage); // Envia el mensaje al servidor
    });

    // Función para enviar un mensaje al servidor
    function sendMessageToServer(message) {
        // Enviar el mensaje al servidor usando AJAX o fetch
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `message=${encodeURIComponent(message)}`,
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response;
            displayMessage("bot", "+ " + botResponse); // Muestra la respuesta del bot en la pantalla
        })
        .catch(error => console.error('Error:', error));
    }

    // Función para mostrar un mensaje en la pantalla
    function displayMessage(sender, message) {
        const messageDiv = document.createElement("div"); // Crea un nuevo elemento div
        messageDiv.className = `message ${sender}`; // Aplica clases para estilo
        messageDiv.textContent = message; // Establece el contenido del mensaje
        chatDisplay.appendChild(messageDiv); // Agrega el div al área de visualización
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Desplaza hacia abajo para mostrar el nuevo mensaje
    }
});

