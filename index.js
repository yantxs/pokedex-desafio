const express = require('express')
const app = express()
const https = require('https')

var url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"

app.get('/pokemon', (req, res) => {
    https.get(url, response => {
        var body = ''; var poke = []; var result = {};
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body); var poke = []
            for(i in d.pokemon){
                poke.push(d.pokemon[i].name)
            }
            result["pokemons"] = poke
            res.status(200).json(result) 
        }) 
    
    })
})

app.get('/pokemon/:name', (req, res) => {
    https.get(url, response => {
        var body = ''; var result = {};
        result["error"] = "Pokemon não encontrado."
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body)
            for(i in d.pokemon){
                if (d.pokemon[i].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    result = d.pokemon[i]
                }
            };
            res.status(200).json(result)
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
            for(i in d.pokemon){
                if (d.pokemon[i].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    exists = true;
                    type = d.pokemon[i].type
                }
            };
            if (exists){
                for(i in d.pokemon){
                    aux = d.pokemon[i].weaknesses.filter(value => type.includes(value))
                    if (aux.length > 0){
                        poke.push(d.pokemon[i].name)
                    }
                }
                result['advantage_against']=poke
            
            }else{
                result['error']="Pokemon não encontrado."
            }
            res.status(200).json(result)
        }) 
    })
})

app.post('/weakness/pokemon/:name', (req, res) => {
    https.get(url, response => {
        var body = ''; var aux = [];var exists = false; var poke = []; var result = {}
        response.on('data', data => {
            body += data
        })
        response.on('end', () => {
            var d = JSON.parse(body)
            for(i in d.pokemon){
                if (d.pokemon[i].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
                    exists = true;
                    weaknesses = d.pokemon[i].weaknesses
                }
            };

            if (exists){
                for(i in d.pokemon){
                    aux = d.pokemon[i].type.filter(value => weaknesses.includes(value))
                    if (aux.length > 0){
                        poke.push(d.pokemon[i].name)
                    }
                }
                result['weakness_against']=poke
           
            } else{
                result['error']="Pokemon não encontrado."
            }
            res.status(200).json(result);        
        }) 
    })
})

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})