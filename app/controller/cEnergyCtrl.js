define(["app/service/businessService", "bootstrap"],function(BusinessService){
    var energyCtrl = function($scope, $q, camel, $state, mask){
        var businessService = new BusinessService($q, camel);
        $scope.mode = "DAY";
        $scope.curDay = new Date().getTime();
        $scope.editing = false;

        $scope.luckData = [
            {name:"白羊", content:"", placeholder:"", key: "", type: 0},
            {name:"金牛", content:"", placeholder:"", key: "", type: 0},
            {name:"双子", content:"", placeholder:"", key: "", type: 0},
            {name:"巨蟹", content:"", placeholder:"", key: "", type: 0},
            {name:"狮子", content:"", placeholder:"", key: "", type: 0},
            {name:"处女", content:"", placeholder:"", key: "", type: 0},
            {name:"天秤", content:"", placeholder:"", key: "", type: 0},
            {name:"天蝎", content:"", placeholder:"", key: "", type: 0},
            {name:"射手", content:"", placeholder:"", key: "", type: 0},
            {name:"魔羯", content:"", placeholder:"", key: "", type: 0},
            {name:"水瓶", content:"", placeholder:"", key: "", type: 0},
            {name:"双鱼", content:"", placeholder:"", key: "", type: 0}
        ];

        $scope.getDayLuckSituation = function(range){
            var deferred = $q.defer();
            setTimeout(function(){
                deferred.resolve();
            }, 0);
            return deferred.promise;
        }

        function queryAstroContent(){
            mask.show(true);
            var successNumber = 0;
            angular.forEach($scope.luckData, function(astro, index){
                var query = businessService.getContent({
                    token: $scope.user.token,
                    params: {
                        type: astro.type,
                        astro: index,
                        day: astro.key
                    }
                });
                query.then(function(data){
                    successNumber++;
                    mask.updateprogress(parseInt(100 * successNumber / $scope.luckData.length));
                    if (data && data.base && data.base.code === 0){
                        $scope.luckData[index].content = data.result.content;
                    }
                    if (successNumber === $scope.luckData.length){
                        mask.hide();
                    }
                });
            });
        }

        $scope.onDayClick = function(key){
            $scope.editing = true;
            $scope.title = key + "日运势";
            angular.forEach($scope.luckData, function(astro, index){
                astro.type = 0;
                astro.key = key;
                astro.placeholder = astro.name + "座" + key + "日运势";
            });
            queryAstroContent();
        }
        $scope.onWeekClick = function(key){
            $scope.editing = true;
            $scope.title = "本周运势";
            angular.forEach($scope.luckData, function(astro, index){
                astro.type = 1;
                astro.key = key;
                astro.placeholder = astro.name + "周运势";
            });
            queryAstroContent();
        }
        $scope.onYearClick = function(key){
            $scope.editing = true;
            $scope.title = "今年运势";
            angular.forEach($scope.luckData, function(astro, index){
                astro.type = 1;
                astro.key = key;
                astro.placeholder = astro.name + key.key + "年运势";
            });
            queryAstroContent();
        }

        $scope.backToCalendar = function(){
            $scope.editing = false;
        }
        $scope.save = function(){
            mask.show(true);
            var successNumber = 0;
            angular.forEach($scope.luckData, function(astro, index){
                var set = businessService.getContent({
                    token: $scope.user.token,
                    params: {
                        type: astro.type,
                        astro: index,
                        day: astro.key,
                        content: astro.content
                    }
                });
                set.then(function(data){
                    successNumber++;
                    mask.updateprogress(parseInt(100 * successNumber / $scope.luckData.length));
                    if (successNumber === $scope.luckData.length){
                        mask.hide();
                    }
                });
            });
        }
    }

    return energyCtrl;
});