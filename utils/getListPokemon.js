module.exports = function(d){
    var result = {}, poke = []
    for(i in d.pokemon){
        poke.push(d.pokemon[i].name)
    }
    result["pokemons"] = poke
    return result;
}