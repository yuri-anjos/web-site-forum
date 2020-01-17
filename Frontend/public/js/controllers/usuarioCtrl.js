angular.module('projeto').controller('usuarioCtrl', function($scope, usuarioAPI, topicoAPI, tagAPI){

    $scope.topicos=[]
    $scope.usuario={}
    $scope.tags=[]

    $scope.idusuariopesquisa=window.location.search.substring(1)

    if(localStorage.getItem('idusuario')){
        $scope.idusuario=localStorage.getItem('idusuario')
    }

    const carregarTopicos=()=>{
        topicoAPI.carregarTopicosDeUsuario($scope.idusuariopesquisa).then((result) => {
            $scope.topicos=result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error='não foi possivel carregar os dados'
            $scope.error2=err
        });
    }

    const carregarTags=()=>{
        tagAPI.carregarTagsDeUsuario($scope.idusuariopesquisa).then((result) => {
            $scope.tags=result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error='não foi possivel carregar os dados'
            $scope.error2=err
        });
    }

    const carregarUsuario=()=>{
        usuarioAPI.carregarUsuario($scope.idusuariopesquisa).then((result) => {
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
    
    if($scope.idusuariopesquisa){
        carregarUsuario()
        carregarTags()
        carregarTopicos()
    }else{
        $scope.error='Ops, Encontramos algum problema, tente novamente mais tarde!'
    }
    

})