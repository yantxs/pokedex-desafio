const express = require('express')
const app = express()
const https = require('https')
const data = require('./data')
//const data = require('./data')



let url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"

app.get('/pokemon', (req, res) => {
    https.get(url, resp => {
        let body = ''
        resp.on('data', data => {
            body += data
        })
        resp.on('end', () => {
            var d = JSON.parse(body)
            res.send(d.pokemon)
            
        }) 
    
    })
})

app.get('/pokemon/:name', (req, res) => {
    https.get(url, resp => {
        let body = ''; let result = "não existe"
        resp.on('data', data => {
            body += data
        })
        resp.on('end', () => {
            var d = JSON.parse(body)
            for(x in d.pokemon){
                if (d.pokemon[x].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    result = d.pokemon[x]
                }
            };
            res.send(result)
        }) 
    })
    
})

app.post('/advantage/pokemon/:name', (req, res) => {
    https.get(url, resp => {
        let body = ''; let aux = []; exists = false; poke = []
        resp.on('data', data => {
            body += data
        })
        resp.on('end', () => {
            var d = JSON.parse(body)
            for(x in d.pokemon){
                if (d.pokemon[x].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    exists = true;
                    type = d.pokemon[x].type
                }
            };
            if (exists){
                for(x in d.pokemon){
                    aux = d.pokemon[x].weaknesses.filter(value => type.includes(value))
                    if (aux.length > 0){
                        poke.push(d.pokemon[x].name)
                    }
                }
                res.send(poke)
            }
        }) 
    })
})

app.post('/weakness/pokemon/:name', (req, res) => {
    https.get(url, resp => {
        let body = ''; let aux = []; exists = false; result = []
        resp.on('data', data => {
            body += data
        })
        resp.on('end', () => {
            var d = JSON.parse(body)
            for(x in d.pokemon){
                if (d.pokemon[x].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    exists = true;
                    weaknesses = d.pokemon[x].weaknesses
                }
            };

            if (exists){
                for(x in d.pokemon){
                    aux = d.pokemon[x].type.filter(value => weaknesses.includes(value))
                    if (aux.length > 0){
                        result.push(d.pokemon[x].name)
                    }
                }
                
            } else{
                result = "Pokemon não encontrado.";
            }
            res.send(result);        
        }) 
    })
})

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})