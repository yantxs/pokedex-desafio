module.exports = function(d, req){
    var aux = [], poke = [], exists = false, result = {};
    for(i in d.pokemon){
        if (d.pokemon[i].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
            exists = true;
            var type = d.pokemon[i].type
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
        return result;
    }
    result['error']="Pokemon não encontrado."
    return result;
}