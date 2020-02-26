angular.module('projeto').controller('topicoCtrl', function($scope, topicoAPI, comentarioAPI){

    $scope.topico={}
    $scope.comentarios=[]

    $scope.idtopico=window.location.search.substring(1)

    if(localStorage.getItem('idusuario')){
        $scope.idusuario=localStorage.getItem('idusuario')
	}

    $scope.novoComentario={}
    $scope.mostrar=false

    $scope.mudarMostrar=()=>{
        $scope.mostrar=!$scope.mostrar
    }

    $scope.cadastrarComentario=()=>{
        comentarioAPI.cadastrarComentario($scope.novoComentario, $scope.idusuario, $scope.idtopico).then((result) => {
            window.location.reload()
        }).catch((err) => {
            window.alert('Não foi possivel Comentar')
        });
    }

    const carregarTopico=()=>{
        topicoAPI.carregarTopico($scope.idtopico).then((result)=>{
            $scope.topico=result.data
            console.log($scope.topico)
            if(!$scope.topico){
                $scope.error='O tópico que busca não existe atualmente'
            }
        }).catch((err)=>{
            $scope.error='Não foi possivel carregar os dados'
        })
    }

    const carregarComentarios=()=>{
        comentarioAPI.carregarComentarios($scope.idtopico).then((result)=>{
            $scope.comentarios=result.data
            console.log($scope.comentarios)
        }).catch((err)=>{
            $scope.error='Não foi possivel carregar os dados'
        })
    }

    if($scope.idtopico){
        carregarComentarios()
        carregarTopico()
    }else{
        $scope.error='Ops, Encontramos algum problema, tente novamente mais tarde!'
    }
})