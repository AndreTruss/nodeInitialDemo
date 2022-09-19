const express = require('express');
const routerPokemon = express.Router();
const https = require('https');

const findPokemon = async (req, res) => {
  
  const idPokemon = req.params.id;
  const url = 'https://pokeapi.co/api/v2/pokemon/' + idPokemon;

  https.get( url, ( response ) => {
    response.setEncoding('utf8');
    let rawData = '';

    response.on('data', ( chunk ) => { rawData += chunk; });

    response.on('end', () => {
      try {
        const object = JSON.parse( rawData );
        res.json({ pokemon_name: object.name, height: object.height, weight: object.weight });
      } catch (e) {
        console.error(e.message);
      }
    });

  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });

}

routerPokemon.get('/pokemon/:id', findPokemon);

module.exports = routerPokemon