const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';

// Function to provide audio feedback
function provideAudioFeedback(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    addToChat("Assistant: " + text, "chatbot");
}

// Welcome message to display and speak when the page loads
window.onload = function () {
    const welcomeMessage = "Welcome! How can I assist you today?";
    provideAudioFeedback(welcomeMessage);
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    sendQuestion(transcript);
};

recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
    addToChat("Error: Speech recognition failed.");
};

function addToChat(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var p = document.createElement("p");
    p.textContent = message;
    
    // Set different styles based on the sender
    if (sender === "user") {
        p.classList.add("user-message");
        p.classList.add("right-align");
    } else if (sender === "chatbot") {
        p.classList.add("chatbot-message");
        p.classList.add("left-align");
    }
    
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("voice-button").addEventListener("click", function() {
    if (recognition !== null && recognition.state !== "listening") {
        recognition.start();
    }
});

function sendQuestion(question) {
    addToChat("You: " + question, "user");

    $.ajax({
        url: "/ask",
        type: "POST",
        data: JSON.stringify({ question: question, option: "dataset" }), // Include the option here
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            addToChat("Assistant: " + response.answer, "chatbot");
            speak(response.answer);
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    
    utterance.onerror = function(event) {
        console.error("Speech synthesis error:", event.error);
    };
}
