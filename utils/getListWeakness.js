module.exports = function(d, req){
    var result = {}, poke = [], aux = [], exists = false; 
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
        return [result,200];
    } 
    result['error']="Pokemon não encontrado."
    return [result,404];
};