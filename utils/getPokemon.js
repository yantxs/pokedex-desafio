module.exports = function(d, req){
    result = {};
    for(i in d.pokemon){
        if (d.pokemon[i].name.toLowerCase().valueOf() == req.params.name.toLowerCase().valueOf()){
            return [d.pokemon[i], 200]
        }
    }
    result["error"] = "Pokemon não encontrado."
    return [result, 404];
};