define(["bootstrap"],function(){
    var energyCtrl = function($scope, $q, camel, $state){
        $scope.mode = "DAY";
        $scope.curDay = new Date().getTime();
        $scope.editing = false;

        var testluckData = [
            {
                name:"白羊"
            },
            {
                name:"金牛"
            },
            {
                name:"双子"
            },
            {
                name:"巨蟹"
            },
            {
                name:"狮子"
            },
            {
                name:"处女"
            },
            {
                name:"天秤"
            },
            {
                name:"天蝎"
            },
            {
                name:"射手"
            },
            {
                name:"魔羯"
            },
            {
                name:"水瓶"
            },
            {
                name:"双鱼"
            }
        ];

        $scope.luckData = testluckData;

        $scope.getDayLuckSituation = function(range){
            var deferred = $q.defer();
            setTimeout(function(){
                deferred.resolve();
            }, 0);
            return deferred.promise;
        }

        $scope.onDayClick = function(key, data){
            $scope.editing = true;
            $scope.title = "今日运势";
        }
        $scope.onWeekClick = function(key, data){
            $scope.editing = true;
            $scope.title = "本周运势";
        }

        $scope.backToCalendar = function(){
            $scope.editing = false;
        }
    }

    return energyCtrl;
});