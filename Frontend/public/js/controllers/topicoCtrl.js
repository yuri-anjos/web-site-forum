angular.module('projeto').controller('topicoCtrl', function($scope, topicoAPI, comentarioAPI){

    $scope.topico={}
    $scope.comentarios=[]

    $scope.idtopico=window.location.search.substring(1)

    if(localStorage.getItem('idusuario')){
        $scope.idusuario=localStorage.getItem('idusuario')
    }

    if($scope.idtopico){

        topicoAPI.carregarTopico($scope.idtopico).then((result)=>{
            $scope.topico=result.data
            console.log($scope.topico)
            if(!$scope.topico){
                $scope.error='O tópico que busca não existe atualmente'
            }
        }).catch((err)=>{
            $scope.error='Não foi possivel carregar os dados'
        })
    
        comentarioAPI.carregarComentarios($scope.idtopico).then((result)=>{
            $scope.comentarios=result.data
            console.log($scope.comentarios)
        }).catch((err)=>{
            $scope.error='Não foi possivel carregar os dados'
        })

    }else{
        $scope.error='Ops, Encontramos algum problema, tente novamente mais tarde!'
    }
})