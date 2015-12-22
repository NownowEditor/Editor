define(["bootstrap"],function(){
    var energyCtrl = function($scope, $q, camel, $state, mask, businessService){
        $scope.mode = "DAY";
        $scope.curDay = new Date().getTime();
        $scope.editing = false;

        $scope.luckData = [
            {name:"白羊", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"金牛", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"双子", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"巨蟹", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"狮子", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"处女", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"天秤", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"天蝎", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"射手", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"魔羯", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"水瓶", content:"", placeholder:"", key: "", type: 0, checked: false},
            {name:"双鱼", content:"", placeholder:"", key: "", type: 0, checked: false}
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
                        date: astro.key
                    }
                });
                query.then(function(data){
                    successNumber++;
                    mask.updateprogress(parseInt(100 * successNumber / $scope.luckData.length));
                    if (data && data.base && data.base.code === 0){
                        $scope.luckData[index].content = data.result && data.result.content || "";
                        $scope.luckData[index].checked = false;
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
                astro.checked = true;
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
                astro.checked = true;
            });
            queryAstroContent();
        }
        $scope.onYearClick = function(key){
            var year = key.substr(0,4);
            $scope.editing = true;
            $scope.title = year + "年度运势";
            angular.forEach($scope.luckData, function(astro, index){
                astro.type = 9;
                astro.key = key;
                astro.placeholder = astro.name + key.key + "年度运势";
                astro.checked = true;
            });
            queryAstroContent();
        }

        $scope.backToCalendar = function(){
            $scope.editing = false;
        }
        $scope.save = function(){
            var successNumber = 0;
            var waitingSavingData = $scope.luckData.filter(function(data){
                return data.checked;
            });
            if (waitingSavingData.length <= 0){
                alert("请先选中至少一个待保存运势的星座");
                return;
            }
            mask.show(true);
            var saveNumber = 0;
            angular.forEach(waitingSavingData, function(astro, index){
                var set = businessService.setContent({
                    token: $scope.user.token,
                    params: {
                        type: astro.type,
                        astro: index,
                        date: astro.key,
                        content: astro.content
                    }
                });
                set.then(function(data){
                    successNumber++;
                    astro.checked = false;
                    mask.updateprogress(parseInt(100 * successNumber / waitingSavingData.length));
                    if (successNumber === waitingSavingData.length){
                        mask.hide();
                    }
                });
            });
        }
    }

    return energyCtrl;
});
