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
        res.status(201).json({ pokemon_name: object.name, height: object.height, weight: object.weight });
      } catch (e) {
        res.status(400).json({ errorMessage: "Pokemons from 1 to 905 & from 10001 to 10249" })
      }
    });

  }).on('error', () => {
    res.status(500).json({ errorMessage: "Can't reach url" })
  });

}

routerPokemon.get('/pokemon/:id', findPokemon);

module.exports = routerPokemon