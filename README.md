# Mongo aggregations test project

## Setup

- Clone the repo;
- Adjust your settings:
  - `config/config.json` for production; 
  - `config/development.json` for development.
  - `config/test.json` for tests.
- Change directory to repo root, then install dependencies by running `npm i`;
- To start app:
  - `npm run dev` for development;
  - `npm run build && npm start` for prod.


## Endpoints

### Search employees

Sample request:

```shell
curl -L -X POST 'localhost:4000/employees/search' \
-H 'Content-Type: application/json' \
--data-raw '{
    "search": "es graph en"
}'
```

Sample response on success:

```json
{
  "error": null,
  "result": [
    {
      "_id": "638f48a1fc13ae5d9c00084f",
      "fullName": "Desmond O'Dunneen",
      "department": "Research and Development",
      "position": "Graphic Designer",
      "addresses": [
        {
          "_id": "638f48a1fc13ae5d9c00084f",
          "address": "534 Hooker Way",
          "employeeId": "638f48a1fc13ae5d9c00084f"
        }
      ]
    },
    {
      "_id": "638f48a3fc13ae5d9c000b03",
      "fullName": "Latia Defries",
      "department": "Support",
      "position": "Graphic Designer",
      "addresses": [
        {
          "_id": "638f48a3fc13ae5d9c000b03",
          "address": "52 Pennsylvania Place",
          "employeeId": "638f48a3fc13ae5d9c000b03"
        }
      ]
    }
  ]
}
```

