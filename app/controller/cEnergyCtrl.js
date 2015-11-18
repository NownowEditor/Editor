define([],function(){
    var energyCtrl = function($scope, $q, camel, $state){
        $scope.mode = "DAY";
        $scope.curDay = new Date().getTime();

        $scope.getDayLuckSituation = function(range){
            var deferred = $q.defer();
            console.log("get day luck situation start...");
            setTimeout(function(){
                console.log("get day luck situation end...");
                deferred.resolve();
            }, 0);
            return deferred.promise;
        }

        $scope.onDayClick = function(key, data){
        }
        $scope.onWeekClick = function(key, data){
        }
    }

    return energyCtrl;
});