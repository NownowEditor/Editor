define(["bootstrap"],function(){
    var homeCtrl = function($scope, $q, camel, $state){
        $scope.brand = "女巫店编辑后台";
        $scope.modules = [{
            name:'cEnergy',
            desc:'星座运势',
            state:'home.cEnergy',
            active:$state.includes('home.cEnergy')
        },{
            name:'cSearch',
            desc:'星座淘',
            state:'home.cSearch',
            active:$state.includes('home.cSearch')
        },{
            name:'cTabloid',
            desc:'星座小报',
            state:'home.cTabloid',
            active:$state.includes('home.cTabloid')
        },{
            name:'pTools',
            desc:'公用工具',
            state:'home.pTools',
            active:$state.includes('home.pTools')
        }];

        $scope.go = function(state){
            $state.go(state);
        }
    }

    return homeCtrl;
});