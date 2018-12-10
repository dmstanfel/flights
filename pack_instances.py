import requests
import json
import arrow

URL = 'http://comp426.cs.unc.edu:3001/'
def main():
    r = requests.post(URL + 'sessions', json={"user":{"username":"dstanfel","password":"password1"}})
    jar = r.cookies
    req = requests.get(URL+'airports', cookies=jar)
    airports_arr = req.json()
    ports_id = {}
    for i in range(0, len(airports_arr)):
        ide = airports_arr[i]['id']
        flights = requests.get(URL + 'flights?filter[departure_id]='+str(ide), cookies=jar)
        ports_id[ide] = [item['id'] for item in flights.json()]
    date_loop(ports_id, jar)

def date_loop(ports_id, jar):
    d = arrow.now()
    for i in range(0,30):
        d_post = str(d.date())
        for key in ports_id:
            for item in ports_id[key]:
                req = requests.post(URL+'instances',json={"instance":{"flight_id":item, "date":d_post}}, cookies=jar)
                print(req.status_code)
        d = d.shift(days=+1)
   

    

if __name__ == '__main__':
    main()