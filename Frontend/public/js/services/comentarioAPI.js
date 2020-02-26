angular.module("projeto").factory("comentarioAPI",function($http){

    let carregarComentarios=(id)=>{
        return $http.post("http://localhost:3000/banco/getAllComents", {id})
    }

    let cadastrarComentario=(comentario, usuario, topico)=>{
        return $http.post("http://localhost:3000/banco/insertComent", {comentario, usuario, topico})
    }

    return{
        carregarComentarios, cadastrarComentario
    }
})