# gpt_based.py
import os
import openai
import tempfile
from gtts import gTTS
from pydub import AudioSegment
from pydub.playback import play

openai.api_key = ""
model = 'gpt-3.5-turbo'

def play_audio(response_text, language='en'):
    """Function to play audio feedback."""
    with tempfile.NamedTemporaryFile(delete=True) as temp_wav:
        tts = gTTS(response_text, lang=language)
        tts.save(f"{temp_wav.name}.mp3")
        sound = AudioSegment.from_mp3(f"{temp_wav.name}.mp3")
        play(sound)

def provide_audio_feedback(feedback_text, language):
    """Function to provide short audio feedback."""
    play_audio(feedback_text, language)

def call_openai_api(text):
    """Function to make a call to the OpenAI API and handle the response."""
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a knowledgeable AI, designed to assist with educational topics."},
                {"role": "user", "content": text}
            ]
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        print("Failed to call OpenAI API:", e)
        return "Sorry, I encountered an error while processing your request."

