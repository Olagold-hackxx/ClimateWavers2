#!/usr/bin/python3
""" Flask Application """

from os import environ
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import  prediction


app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.route("/api/v1/analysis/model/waverx", methods=['POST'], strict_slashes=False)
def model_inference():
    location = request.form['location']
    start_date = request.form['startDate']
    end_date = request.form['endDate']
    disaster_type = request.form['disasterType']
    key = request.form["apiKey"]
    return jsonify(prediction.predict(location, start_date, end_date, disaster_type, key))

@app.route("/api/v1/analysis/model/waverx/status", strict_slashes=False)
def model_status():
    return jsonify({"status": "OK"})

@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)



if __name__ == "__main__":
    """ Main Function """
    host = environ.get('MODEL_HOST')
    port = environ.get('MODEL_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '6000'
    app.run(host=host, port=port, threaded=True)

