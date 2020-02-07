angular.module("projeto").factory("tagAPI",function($http){

    let carregarTags=()=>{
        return $http.get("http://localhost:3000/banco/getAllTags")
    }

    let carregarTagsDeUsuario=(id)=>{
        return $http.post("http://localhost:3000/banco/getSkills", {id})
    }

    let adicionarTag=(novaTag, idusuario)=>{
        return $http.post("http://localhost:3000/banco/insertTagUser", {novaTag, idusuario})
    }

    let removerTag=(id)=>{
        return $http.post("http://localhost:3000/banco/removeTagUser", {id})
    }

    return {
        carregarTags, carregarTagsDeUsuario, adicionarTag, removerTag
    }

})