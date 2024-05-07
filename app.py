# app.py
from flask import Flask, render_template, request, jsonify
from dataset_based import find_answer as dataset_find_answer
import gpt_based 
import json
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/page1')
def page1():
    return render_template('page1.html')
@app.route('/page2')
def page2():
    return render_template('page2.html')


@app.route('/ask', methods=['POST'])
def ask():
    if request.method == 'POST':
        data = request.json
        question = data.get('question')
        option = data.get('option')  # Access 'option' from JSON data
        if option == 'dataset':
            answer = dataset_find_answer(question)
        else:
            answer = gpt_based.call_openai_api(question)
    
        return jsonify({'answer': answer})



if __name__ == '__main__':
    app.run(debug=True)

