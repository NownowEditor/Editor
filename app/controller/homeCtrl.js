define(["bootstrap"],function(){
    var homeCtrl = function($rootScope, $scope, $cookies, $state, user){
        if (!user || !user.uid){
            $state.go("login");
            return;
        }
        $rootScope.user = $cookies.getObject("user");
        $rootScope.user.uid = user.uid;
        $scope.brand = "女巫店编辑后台";
        $scope.modules = [{
            name:'cEnergy',
            desc:'星座运势',
            state:'home.cEnergy'
        },{
            name:'cSearch',
            desc:'星座淘',
            state:'home.cSearch'
        },{
            name:'cTabloid',
            desc:'星座小报',
            state:'home.cTabloid'
        },{
            name:'pTools',
            desc:'公用工具',
            state:'home.pTools'
        }];
        $scope.go = function(state){
            $state.go(state);
        }
    }

    return homeCtrl;
});