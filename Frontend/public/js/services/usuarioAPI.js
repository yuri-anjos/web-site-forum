angular.module("projeto").factory("usuarioAPI",function($http){

    let cadastrar=(usuario)=>{
        return $http.post("http://localhost:3000/banco/insertUser", usuario)
    }

    let logar=(usuario)=>{
        return $http.post("http://localhost:3000/banco/login", usuario)
    }

    let carregarUsuario=(id)=>{
        return $http.post("http://localhost:3000/banco/getUser", {id})
    }

    return{
        cadastrar, logar, carregarUsuario
    }
})