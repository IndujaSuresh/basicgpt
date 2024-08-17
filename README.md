# **Voice-Enabled Question Answering System**
## **Overview**
This repository contains a voice-enabled question-answering system with a web interface built using Flask, HTML, CSS, and JavaScript. The system employs both dataset-based and GPT-based approaches to provide answers to user queries.

## **Features**
* Voice Recognition: Interact with the system using voice commands.
* Question Answering: Uses both dataset-driven and GPT-driven models to answer questions.
* Web Interface: User-friendly interface built with Flask, HTML, CSS, and JavaScript.
## **Installation Prerequisites**
* Python 3.x
* Flask
* Other dependencies listed in requirements.txt
## **Usage**
* Voice Commands: Click on the microphone icon to start voice input. Ask your question, and the system will provide a response.
* Text Input: Alternatively, type your question into the input box and press "Submit" to receive an answer.
## **Files**
* app.py: Main Flask application that handles routing and integrates with the question-answering models.
* dataset_based.py: Contains logic for question-answering using dataset-driven models.
* gpt_based.py: Contains logic for question-answering using GPT-based models.
* static/: Contains static files like CSS, JavaScript, and images.
* templates/: Contains HTML templates for the web interface.
* S08_question_answer_pairs.txt, S09_question_answer_pairs.txt, S10_question_answer_pairs.txt: Text files with question-answer pairs for the dataset-based model.
* requirements.txt: Lists Python dependencies.
