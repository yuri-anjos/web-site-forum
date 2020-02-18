angular.module('projeto').controller('indexCtrl', function($scope, topicoAPI, tagAPI){

    $scope.topicos=[]
    $scope.tags=[]

    if(localStorage.getItem('idusuario')){
        $scope.idusuario=localStorage.getItem('idusuario')
	}


    $scope.novoTopico={}
    $scope.mostrar=false

    $scope.mudarMostrar=()=>{
        $scope.mostrar=!$scope.mostrar
    }

    $scope.cadastrarTopico=()=>{
        topicoAPI.cadastrarTopico($scope.novoTopico, $scope.idusuario).then((result) => {
            window.location.replace('http://localhost:3000/')
        }).catch((err) => {
            window.alert('Não foi possivel inserir este topico')
        });
    }

    const carregarTopicos=()=>{
        topicoAPI.carregarTopicos().then((result) => {
            $scope.topicos=result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error='não foi possivel carregar os dados'
        });
    }

    const carregarTags=()=>{
        tagAPI.carregarTags().then((result) => {
            $scope.tags=result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error='não foi possivel carregar os dados'
        });
    }


    carregarTopicos()
    carregarTags()

    $scope.limite=4
    $scope.aumentarLimite=()=>{
        $scope.limite+=4
    }
})