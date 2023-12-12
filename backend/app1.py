import requests
import urllib.parse

# value1 = "restaraunt"
print("******************************************************************")
print("****************************FIND NEAR ME**************************")
print("******************************************************************")
q = 1

def selectOption():
  
    print("CATEGORIES        ")
    print()
    print("  1-    * restaraunt")
    print("  2-    * gasStation")
    print("  3-    * Hospital")
    print("  0     * quit")
    print()
    value1 = int(input("Enter the category you want to choose: "))

    return value1

while q != 0:
     
    value1 = selectOption()

    if value1 == 1:
      val = "restaraunt"
    
    elif value1 == 2:
      val = 'gasStation'
    
    elif value1 == 3:
      val = 'Hospital'
    
    elif value1 == 0:
      print("******  Thank you **********")
      exit()

    print('the value entered is:', val)


    url = f"http://localhost:8080/api/nearby-location/{val.strip()}"

    data = {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "category": "restaraunt",
    }

    try:
      response = requests.post(url, json=data)
      response.raise_for_status()
      json_data = response.json()
      print(json_data , end="\n")
      print()
    except requests.exceptions.HTTPError as errh:
      print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
      print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
      print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
      print(f"Request Error: {err}")

    # value1 = int(input("Enter the category you want to choose"))
print("\032[32m*****************************************************************\023[0m")