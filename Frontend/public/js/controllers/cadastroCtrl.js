angular.module('projeto').controller('cadastroCtrl', function($scope, usuarioAPI){

    $scope.confirmPassword = (senha1, senha2) => {
        if (senha1 === senha2) {
            return true
        } else {
            return false
        }
    }

    $scope.cadastrar=()=>{
        usuarioAPI.cadastrar($scope.usuario).then((result) => {
            if(result.data.insertId){
                localStorage.setItem('idusuario', result.data.insertId)
                window.location.replace('http://localhost:3000/')
            }else{
                window.alert('Email ja foi utilizado, tente com algum outro')
            }
        })
    }
    
})