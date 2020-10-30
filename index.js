const express = require('express')
const app = express()
const https = require('https')

const getListAdvantages = require('./utils/getListAdvantages')
const getPokemon = require('./utils/getPokemon')
const getListWeakness = require('./utils/getListWeakness')
const getListPokemon = require('./utils/getListPokemon')

const url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
const port = process.env.PORT || 3000 // heroku config port

app.get('/api/v1/pokemon', (req, res) => {
    https.get(url, response => {
        var body = ''; poke = []; result = {};
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body);
            var result = getListPokemon(d);
            res.status(200).json(result) 
        }) 
    
    })
});

app.get('/api/v1/pokemon/:name', (req, res) => {
    https.get(url, response => {
        var body = '';
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body)
            var result = getPokemon(d, req);
            res.status(200).json(result)
        }) 
    })   
});

app.post('/api/v1/advantage/pokemon/:name', (req, res) => {
    https.get(url, response => {
        var body = '';
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body)
            var result = getListAdvantages(d, req)
            res.status(200).json(result);
        }) 
    })
});

app.post('/api/v1/weakness/pokemon/:name', (req, res) => {
    https.get(url, response => {
        var body = '';
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body)
            var result = getListWeakness(d, req)
            res.status(200).json(result);        
        }) 
    })
});

app.listen(port, () => {
    console.log("Rodando na porta "+ port)
})