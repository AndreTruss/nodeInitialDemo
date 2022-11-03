
# Node Initial Project

**Nota: aquesta és la branca api-rest**

## Crearem una API REST de resposta ràpida.

### Instruccions:

Execute this code to download modules:
```
npm i
``` 
Execute this code to run with node:
```
npm start
```

Principal Url is http://localhost:3000/
There is a Postman collection to verify the endpoints:

- get /user
- post /upload - form-data { key: image } choose file to store on folder 'img'
- post /time - form-urlencoded { key: name, password } authorization { username: admin, password: 1234 }
- get /pokemon/:id - valid pokemon id from 1 to 905 & from 10001 to 10249

