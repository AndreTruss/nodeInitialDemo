
# Node Initial Project

**Nota: aquesta és la branca sockets**

## About The Project


![Chat-app](client/public/Screenshot.png)

This is a Chat-App made as part of the IT-Academy Bootcamp. A user can sign-up via username and password. Once authenticated, you can create or join rooms to chat with other people.  


### Built With


* Node.js
* Express
* MongoDB
* Socket.io
* React
* JWT


<!-- GETTING STARTED -->
## Getting Started

The app has independent client and server 

### Server Installation

1. Head to the server folder

2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename  `.env_template` to `.env`
   
4. If you want you can replace the mongoDB URI
   ```js
    MONGODB_URI=YOUR_DB_URI
   ```   
5. Run the server. Will run on port 5000
   ```sh
   npm start
   ```

### Client Installation

1. Head to the client folder

2. Install NPM packages
   ```sh
   npm install
   ```

3. Run the client. Will run on port 3000
   ```sh
   npm start
   ```     

<!-- POSTMAN -->
## Endpoints

POSTMAN collection contains following requests:

- POST /signup  - Body form-urlencoded {key: name, password} 
- POST /login   - Body form-urlencoded {key: name, password} 
                - Headers {key: Authorization} paste token on value
- POST /room    - Body form-urlencoded {key: name} 
                - Headers {key: Authorization} paste token on value
- GET /room/:id     - Params form-urlencoded {key: id} 
                    - Headers {key: Authorization} paste token on value
- DELETE /room/:id  - Params form-urlencoded {key: id} 
                    - Headers {key: Authorization} paste token on value
 