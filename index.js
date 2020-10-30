const express = require('express')
const app = express()
const https = require('https')

let url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"

app.get('/pokemon', (req, res) => {
    https.get(url, response => {
        let body = ''; poke = []; result = {};
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body); var poke = []
            for(x in d.pokemon){
                poke.push(d.pokemon[x].name)
            }
            result["pokemons"] = poke
            res.status(200).send(result) 
        }) 
    
    })
})

app.get('/pokemon/:name', (req, res) => {
    https.get(url, response => {
        let body = ''; var result = {};
        result["error"] = "Pokemon não encontrado."
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body)
            for(x in d.pokemon){
                if (d.pokemon[x].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    result = d.pokemon[x]
                }
            };
            res.status(200).send(result)
        }) 
    })
    
})

app.post('/advantage/pokemon/:name', (req, res) => {
    https.get(url, response => {
        var body = ''; var aux = [];var exists = false; var poke = []; var result = {};
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
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
                result['advantage_against']=poke
            
            }else{
                result['error']="Pokemon não encontrado."
            }
            res.status(200).send(result)
        }) 
    })
})

app.post('/weakness/pokemon/:name', (req, res) => {
    https.get(url, response => {
        let body = ''; let aux = []; exists = false; poke = []; result = {}
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
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
                        poke.push(d.pokemon[x].name)
                    }
                }
                result['weakness_against']=poke
           
            } else{
                result['error']="Pokemon não encontrado."
            }
            res.status(200).send(result);        
        }) 
    })
})

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})