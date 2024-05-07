let recognition;
let isListening = false;
let currentLanguage = 'en';

window.onload = function () {
    initializeRecognition();
    provideAudioFeedback("Hello, I am IRIS, your AI teacher at Xyme International school. How can I help you?");
};

function initializeRecognition() {
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        isListening = true;
        console.log('Speech recognition started.');
    };

    recognition.onend = function () {
        isListening = false;
        console.log('Speech recognition stopped.');
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        handleRecognitionError(event.error);
    };

    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Recognized:', transcript);
        handleSpeech(transcript);
    };
}

function handleRecognitionError(error) {
    switch(error) {
        case 'no-speech':
            provideAudioFeedback("I didn't hear anything. Please try speaking again.");
            addToChat("Iris: " + "I didn't hear anything. Please try speaking again.", "chatbot");
            break;
        case 'network':
            provideAudioFeedback("Failed to connect to the speech service.");
            addToChat("Iris: " + "I didn't hear anything. Please try speaking again.", "chatbot");
            break;
        default:
            // Handle other errors
            break;
    }
}

function startListening() {
    if (!isListening && recognition) {
        recognition.start();
    }
}

function stopListening() {
    if (isListening && recognition) {
        recognition.stop();
        isListening = false; // Update isListening status
    }
}

function handleSpeech(text) {
    console.log('Handling speech:', text);
    if (text.toLowerCase().includes('switch to english')) {
        currentLanguage = 'en';
        provideAudioFeedback("Switching to English.");
    } else if (text.toLowerCase().includes('switch to malayalam')) {
        currentLanguage = 'ml';
        provideAudioFeedback("മലയാളത്തിലേക്ക് മാറുക.");
    } else if (text.toLowerCase().includes('switch to hindi')) {
        currentLanguage = 'hi';
        provideAudioFeedback("हिंदी में स्विच कर रहा हूँ.");
    } else if (text.toLowerCase().includes('inaugural')) {
        provideAudioFeedback("Hello, I am your AI teacher at Xyme International school. Welcome to our learning community.");
    } else {
        callOpenaiAPI(text);
    }
}

function callOpenaiAPI(text){
    addToChat("You: " + text, "user"); 
    console.log('Calling OpenAI API:', text);
    $.ajax({
        url: "/ask",
        type: "POST",
        contentType: "application/json; charset=utf-8", // Specify content type
        data: JSON.stringify({ question: text, option: "gpt" }), // Updated to directly pass an object
        success: function(response) {
            addToChat("Iris: " + response.answer, "chatbot");
            speak(response.answer);
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

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

function provideAudioFeedback(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    addToChat("Iris: " + text, "chatbot"); 
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

