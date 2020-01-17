angular.module('projeto').controller('loginCtrl', function($scope, usuarioAPI){

    $scope.logar=()=>{
        usuarioAPI.logar($scope.usuario).then((result) => {
            if(result.data.id){
                localStorage.setItem('idusuario', result.data.id)
                window.location.replace('http://localhost:3000/')
            }else{
                window.alert('Email ou senha incorretos')
            }
        })
    }
    
})