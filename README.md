
# Node Initial Project

**Nota: aquesta és la branca api-rest**

## Crearem una API REST de resposta ràpida.

# Nivell 1
- Exercici 1
Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i l'URL des d'on es fa la petició.

- Exercici 2
Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif amb una petició POST i que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.

# Nivell 2
- Exercici 1
Crea un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari/ària i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, sigui mitjançant Express o mitjançant un altre middleware.

- Exercici 2
Afegeix un middleware a l'endpoint anterior que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).


# Nivell 3
- Exercici 1
Crea una petició GET a l'endpoint /pokemon/{id} que rebi un número de Pokémon, faci una cerca al Pokémon API i retorni el nom del Pokémon, la seva alçada i el seu pes.

Instruccions

Execute this code to download the necessaries modules:
```
npm i
``` 
Execute this code to run with nodemon:
```
npm run dev
```
or with node:
```
npm start
```

Principal Url is http://localhost:3000/
There is a Postman collection to verify the endpoints.

To upload an image, select one picture in Postman petition 'Upload Image' on the body request under the key 'image'. Files are stored on folder 'img'.
