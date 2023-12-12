 # API KEY = AIzaSyDsqqQjU7cAww-UlWAchB9i3R26DfUQkx0
import urllib.parse
import requests
import csv
import json
from flask import Flask, jsonify, request
from sklearn.neighbors import NearestNeighbors
import numpy as np
from flask_cors import CORS, cross_origin
from collections import OrderedDict

app = Flask(__name__)
CORS(app)

data = []
data1 = []
data2 = []

locations =  "data.txt"
jsonFile = 'data.json'
locations1 = "Hospital.csv"
locations2 = 'data2.csv'

file = open(locations, "r")
file1 = open(locations1,"r")
file2 = open(locations2,"r")

reader = csv.DictReader(file)
reader1 = csv.DictReader(file1)
reader2 = csv.DictReader(file2)

for line in reader:
  data.append(line)

file.close()

for line in reader1:
  data1.append(line)

file1.close()
for line in reader2:
  data2.append(line)

file2.close()

inFile = open(jsonFile,'w')
json.dump(data, inFile)

inFile1 = open(jsonFile,'w')
json.dump(data1, inFile)

inFile2 = open(jsonFile,'w')
json.dump(data2, inFile)

locations_data = OrderedDict({"restaraunt":[],"Hospital":[] , "gasStation":[]})


def get_photos(key,name):
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"

    paramters = {
      'key' : 'AIzaSyDsqqQjU7cAww-UlWAchB9i3R26DfUQkx0',
      'input': name, 
      'inputtype':'textquery',
       'fields': 'photos,formatted_address,name,rating,opening_hours,geometry'
    } 

    response = requests.get(base_url,params=paramters)
    jformat = response.json()

    try:
      if 'candidates' in jformat and len(jformat['candidates']) > 0:
         place_id =  jformat['candidates']

         filee = open("place_id.txt","w")
         filee.write(json.dumps(place_id,indent=2))


         if place_id and place_id[0].get('photos'):
           photorefrence = place_id[0]['photos'][0].get('photo_reference')

           if photorefrence:
              base_url1 = "https://maps.googleapis.com/maps/api/place/photo"
              paramters =   {
                 'key' : 'AIzaSyDsqqQjU7cAww-UlWAchB9i3R26DfUQkx0',
                 'maxwidth' : 400,
               'photoreference':photorefrence,
          }
              url_for_picture = f"{base_url1}?{urllib.parse.urlencode(paramters)}"

              if url_for_picture:
                return url_for_picture
              else:
                return f"The photo is not available for ${name}"

         else:
          return f"The place_id is not available for ${name}"
      else:
        return f"The Location is not available"
    except KeyError:
      return f"The Location is not available"

open("place_id.txt",'w').close()
count = 0

for line in data:
    name = line['name']
    latitude = float(line['latitude'])
    longitude = float(line['longitude'])
    image_url = get_photos('AIzaSyDsqqQjU7cAww-UlWAchB9i3R26DfUQk', name)
    address = ",".join([line['address'], line['city'], line['province'], line['postalCode']])
    website = line['websites']
    locations_data["restaraunt"].append({
        "latitude": latitude,
        "longitude": longitude,
        "name": name,
        "image_url": image_url,
        "address": address,
        "website": website,
    })

for line in data1:
    name = line['NAME']
    latitude = float(line['LATITUDE'])
    longitude = float(line['LONGITUDE'])
    image_url = get_photos('AIzaSyDsqqQjU7cAww-UlWAchB9i3R26DfUQk', name)
    address = ",".join([line['ADDRESS'], line['CITY'], line['STATE'], line['ZIP']])
    locations_data["Hospital"].append({
        "latitude": latitude,
        "longitude": longitude,
        "name": name,
        "image_url": image_url,
        "address": address,
    })
for line in data2:
    name = line['StationName']
    latitude = float(line['X'])
    longitude = float(line['Y'])
    image_url = get_photos('AIzaSyDsqqQjU7cAww-UlWAchB9i3R26DfUQk', name)
    address = ",".join([line['StreetAddress'], line['City'], line['State'], line['ZIP']])
    locations_data["gasStation"].append({
        "latitude": latitude,
        "longitude": longitude,
        "name": name,
        "image_url": image_url,
        "address": address,
    })

knn_models = {
    category: NearestNeighbors(n_neighbors=len(data), algorithm='ball_tree').fit([[loc["latitude"], loc["longitude"]] for loc in data])
    for category, data in locations_data.items()
}
knn_models = {
    category: NearestNeighbors(n_neighbors=len(data1), algorithm='ball_tree').fit([[loc["latitude"], loc["longitude"]] for loc in data1])
    for category, data1 in locations_data.items()
}
knn_models = {
    category: NearestNeighbors(n_neighbors=len(data2), algorithm='ball_tree').fit([[loc["latitude"], loc["longitude"]] for loc in data2])
    for category, data2 in locations_data.items()
}


# Add print statements to debug
for category, knn_model in knn_models.items():
    print(f"Category: {category}")
    print(f"Data for {category}: {[[loc['latitude'], loc['longitude']] for loc in locations_data[category]]}")
    print(f"KNN Model: {knn_model}")

@app.route('/api/nearby-location/<category>', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()


def get_nearby_locations(category):
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        return response

    if request.method == 'POST':
        try:
            request_data = request.json
            print(f"Request Data: {request_data}")

            if request_data is None or 'latitude' not in request_data or 'longitude' not in request_data:
                return jsonify({"error": "Invalid JSON data"}), 400

            latitude = request_data.get('latitude')
            longitude = request_data.get('longitude')
            print(latitude,longitude)

            user_location = np.array([float(latitude), float(longitude)]).reshape(1, -1)
            print(f"User Location: {user_location}")

            print(f"Available Categories: {knn_models.keys()}")

            knn_model = knn_models.get(category)
            # print(f"KNN Model: {knn_model}")

            if knn_model is None:
                return jsonify({"error": f"Category '{category}' not found. Available categories: {knn_models.keys()}"}), 400

            distances, indices = knn_model.kneighbors(user_location)
            print(f"Distances: {distances}")
            print(f"Indices: {indices}")

            nearby_locations = [
                {
                    "name": location["name"],
                    "latitude": location["latitude"],
                    "longitude": location["longitude"],
                    "distance": distances[0][i],
                    "image_url": location["image_url"],
                    "address":location['address'],
                }
                for i, location in enumerate(locations_data[category])
              
            ]
            # print(nearby_locations)
            print("done with this")
            return jsonify(nearby_locations)

        except Exception as e:
            return jsonify({"error": str(e)}), 501
    else:
        return jsonify({"error": "Invalid method"}), 405
    
if __name__ == '__main__':
     app.run(port=8080, debug=True)

