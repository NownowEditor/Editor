define(['app/service/loginService'],function(LoginService){
    var loginCtrl = function($scope, $q, camel, $state, $cookies){
        var loginIns = new LoginService($q, camel);
        var checkOK = false;
        $scope.account = {
            "username": "",
            "password": ""
        };
        $scope.logining = false;
        $scope.login = function(){
            $scope.logining = true;
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

        $scope.valueChange = function(){
            if ($scope.account.username.length != 0 && $scope.account.password.length != 0 && !checkOK) {
                checkOK = true;
                $("#loginbtn").animate({ left: '0' , duration: 'slow'});;
                $("#lockbtn").animate({ left: '260px' , duration: 'slow'});;
            }else if (($scope.account.username.length == 0 || $scope.account.password.length == 0) && checkOK){
                checkOK = false;
                $("#lockbtn").animate({ left: '0' , duration: 'slow'});;
                $("#loginbtn").animate({ left: '-260px' , duration: 'slow'});;
            }
        }
    }

    return loginCtrl;
});