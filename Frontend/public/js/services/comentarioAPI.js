angular.module("projeto").factory("comentarioAPI",function($http){

    let carregarComentarios=(id)=>{
        return $http.post("http://localhost:3000/banco/getAllComents", {id})
    }

    return{
        carregarComentarios
    }
})