angular.module('projeto').controller('editarUsuarioCtrl', function ($scope, usuarioAPI, tagAPI) {

    $scope.usuario = {}
    $scope.tags = []//tags do usuario
    $scope.tags2 = []//todas tags

    $scope.novaTag = {}
    $scope.niveis = ['Iniciante', 'Intermediário', 'Avançado', 'Boss']

    $scope.adicionarTag = () => {
        $scope.permissao=true
        $scope.tags.forEach(tag => {
            if (tag.tech == $scope.novaTag.tech) {
                $scope.permissao = false
                window.alert('Tecnologia já está selecionada no seu perfil')
            }
        })

        if ($scope.permissao==true) {
            tagAPI.adicionarTag($scope.novaTag, $scope.idusuario).then(() => {
                carregarTagsDeUsuario()
            }).catch((err) => {
                window.alert('Não foi possivel adicionar a tecnologia selecionada')
            })
        }

    }


    $scope.removerTag = (tag) => {
        tagAPI.removerTag(tag).then(() => {
            carregarTagsDeUsuario()
        }).catch((err) => {
            window.alert('Erro ao remover a tecnologia')
        })
    }

    $scope.salvarPerfil = () => {
        usuarioAPI.salvarPerfil($scope.usuario).then(() => {
            window.location.assign('http://localhost:3000/usuario?' + $scope.usuario.id)
        }).catch((err) => {
            window.alert('Não foi possivel salvar todas as modificações')
        })
    }

    const carregarTagsDeUsuario = () => {
        tagAPI.carregarTagsDeUsuario($scope.idusuario).then((result) => {
            $scope.tags = result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error = 'não foi possivel carregar os dados'
            $scope.error2 = err
        });
    }

    const carregarUsuario = () => {
        usuarioAPI.carregarUsuario($scope.idusuario).then((result) => {
            $scope.usuario = result.data
            console.log(result.data)
            if (!$scope.usuario) {
                $scope.error = 'Usuario não existe'
            }
        }).catch((err) => {
            $scope.error = 'não foi possivel carregar os dados'
            $scope.error2 = err
        });
    }

    const carregarTags = () => {
        tagAPI.carregarTags().then((result) => {
            $scope.tags2 = result.data
            console.log(result.data)
        }).catch((err) => {
            $scope.error = 'não foi possivel carregar os dados'
            $scope.error2 = err
        });
    }

    if (localStorage.getItem('idusuario')) {
        $scope.idusuario = localStorage.getItem('idusuario')
        carregarUsuario()
        carregarTagsDeUsuario()
        carregarTags()
    } else {
        $scope.error = 'Por Favor entre em sua conta para executar esta página'
    }

})