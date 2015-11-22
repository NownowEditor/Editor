define(['app/service/loginService'],function(LoginService){
    var loginCtrl = function($scope, $q, camel, $state, $cookies){
        var loginIns = new LoginService($q, camel);
        $scope.account = {
            "username": "",
            "password": ""
        };

        $scope.login = function(){
            var promise = loginIns.login({
                "username":$scope.account.username,
                "password":$scope.account.password
            });
            promise.then(function(data){
                if (data && data.base && data.base.code === 0){
                    $cookies.putObject("user", data.result);
                    $state.go('home.cEnergy');
                }else if (data && data.code){
                    alert("用户名或者密码错误");
                }
            });
        }
    }

    return loginCtrl;
});