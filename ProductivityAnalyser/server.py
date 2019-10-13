import os
from flask import Flask, request
import pandas as pd
app = Flask(__name__)

from flask_cors import CORS
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/run/', methods = ['POST'])
def handle():
	if request.method == "POST":
		os.system('python3 howProductive.py')
		return 'success!'
		
@app.route('/data/', methods = ['GET'])
def getter():
	if request.method == "GET":
		out = pd.read_csv('data.csv').to_json()
		return out
	
app.run(debug=True)

