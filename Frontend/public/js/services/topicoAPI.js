angular.module('projeto').factory('topicoAPI', function($http){

    let carregarTopicos=()=>{
        return $http.get("http://localhost:3000/banco/getAllTopics")
    }

    let carregarTopico=(id)=>{
        return $http.post("http://localhost:3000/banco/getTopic", {id})
    }

    let carregarTopicosDeUsuario=(id)=>{
        return $http.post("http://localhost:3000/banco/getTopicsFromUser", {id})
    }

    let cadastrarTopico=(topico, idusuario)=>{
        return $http.post("http://localhost:3000/banco/insertTopic", {topico, idusuario})
    }

    return {
        carregarTopicos, carregarTopico, carregarTopicosDeUsuario, cadastrarTopico
    }
}) 
