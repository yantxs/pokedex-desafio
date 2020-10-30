const express = require('express')
const app = express()
const https = require('https')

app.use(express.static("public"));

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
            var [result, code] = getPokemon(d, req);
            res.status(code).json(result)
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
            var [result, code] = getListAdvantages(d, req)
            res.status(code).json(result);
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
            var [result, code] = getListWeakness(d, req)
            res.status(code).json(result);        
        }) 
    })
});

app.get('*', (req,res) => {
    res.redirect('/apidoc')
});

app.listen(port, () => {
    console.log("Rodando na porta "+ port)
})

/**
 * @api {get} /api/v1/pokemon GetPokemonList
 * @apiGroup Endpoints
 *
 * @apiSuccess {String[]} pokemons List of all existing pokemons.
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *    {
 *      "pokemons": ["Squirtle", "Bulbarsaur", "Pikachu"...]
 *    }
 *
 *
 */
/**
 * @api {get} /api/v1/pokemon/{name} GetPokemon
 * @apiGroup Endpoints
 *
 * @apiSuccess {Object} pokemon Details about informed pokemon
 * 
 * @apiError {Object} error Message error
 * 
 * @apiErrorExample {json} Error
 *    HTTP/1.1 404 Not Found
 * {
 *     "error":"Pokemon não encontrado"
 * }
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 * {
 *  "id": 4,
 *  "num": "004",
 *  "name": "Charmander",
 *  "img": "http://www.serebii.net/pokemongo/pokemon/004.png",
 *  "type": [
 *    "Fire"
 *  ],
 *  "height": "0.61 m",
 *  "weight": "8.5 kg",
 *  "candy": "Charmander Candy",
 *  "candy_count": 25,
 *  "egg": "2 km",
 *  "spawn_chance": 0.253,
 *  "avg_spawns": 25.3,
 *  "spawn_time": "08:45",
 *  "multipliers": [
 *    1.65
 *  ],
 *  "weaknesses": [
 *    "Water",
 *    "Ground",
 *    "Rock"
 *  ],
 *  "next_evolution": [
 *    {
 *      "num": "005",
 *      "name": "Charmeleon"
 *    },
 *    {
 *      "num": "006",
 *      "name": "Charizard"
 *    }
 *  ]
 * }
 *
 *
 */
/**
 * @api {post} /api/v1/advantage/pokemon/{name} GetPokemonAdvantages
 * @apiGroup Endpoints
 *
 * @apiSuccess {String[]} advantage_against Returns a list of pokemon that has disadvantages against the informed pokemon
 * 
 * @apiError {Object} error Message error
 * 
 * @apiErrorExample {json} Error
 *    HTTP/1.1 404 Not Found
 * {
 *     "error":"Pokemon não encontrado"
 * }
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 * {
 *  "advantage_against": ["Pikachu", "Bulbasaur", "Mewtwo", "Squirtle"...]
 * }
 *
 */
/**
 * @api {post} /api/v1/weakness/pokemon/{name} GetPokemonDisadvantages
 * @apiGroup Endpoints
 *
 * @apiSuccess {String[]} weakness_against Returns a list of pokemon that has advantages against the informed pokemon
 * 
 * @apiError {Object} error Message error
 * 
 * @apiErrorExample {json} Error
 *    HTTP/1.1 404 Not Found
 * {
 *     "error":"Pokemon não encontrado"
 * }
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 * {
 *  "weakness_against": ["Pikachu", "Bulbasaur", "Mewtwo", "Squirtle"...]
 * }
 *
 */
