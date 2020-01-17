angular.module('projeto').controller('deslogarCtrl', function($scope){
    
    if(localStorage.getItem('idusuario')){
        $scope.idusuario=localStorage.getItem('idusuario')
    }
    
	$scope.deslogar=()=>{
		localStorage.removeItem('idusuario')
    }	
    
})