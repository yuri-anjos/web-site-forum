angular.module('projeto').controller('editarUsuarioCtrl', function($scope, usuarioAPI, tagAPI){

    $scope.usuario={}
    $scope.tags=[]


    const carregarTags=()=>{
        tagAPI.carregarTagsDeUsuario($scope.idusuario).then((result) => {
            $scope.tags=result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error='não foi possivel carregar os dados'
            $scope.error2=err
        });
    }

    const carregarUsuario=()=>{
        usuarioAPI.carregarUsuario($scope.idusuario).then((result) => {
            $scope.usuario=result.data
            console.log(result.data)
            if(!$scope.usuario){
                $scope.error='Usuario não existe'
            }
        }).catch((err) => {
            $scope.error='não foi possivel carregar os dados'
            $scope.error2=err
        });
    }
    

    if(localStorage.getItem('idusuario')){
        $scope.idusuario=localStorage.getItem('idusuario')
        carregarUsuario()
        carregarTags()
    }else{
        $scope.error='Ops, Encontramos algum problema, tente novamente mais tarde!'
    }

})