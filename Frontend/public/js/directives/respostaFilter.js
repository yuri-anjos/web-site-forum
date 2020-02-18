angular.module('projeto').filter('resposta', function () {
    return function (input) {
        if (input == 0) {
            return 'Não'
        }
        return 'Sim'
    }
})