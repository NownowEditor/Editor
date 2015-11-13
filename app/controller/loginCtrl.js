define(['app/service/loginService'],function(LoginService){
    var loginCtrl = function($scope, $q, camel, $state){
        var loginIns = new LoginService($q, camel);
        $scope.account = {
            "username": "",
            "password": ""
        };

        $scope.login = function(){
            var promise = loginIns.login({
                "uname":$scope.account.username,
                "upwd":$scope.account.password
            });
            promise.then(function(data){
                $state.go('home');
            });
        }
    }

    return loginCtrl;
});