module.exports  = function parseStringAsArray(arrayAsString)  {

    return arrayAsString.split(',').map(tech => tech.trim());
    //split => pra cortar essa string toda vez que tiver uma ','
    //map => pra mapear toda a tech
    //trim => p/ eliminar espaçamento antes e depois da string

}