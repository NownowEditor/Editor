define(["framework"], function(app){
    var DAY2MILLISECOND = 1000 * 60 * 60 * 24;
    var WEEKTITLE = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    var WEEK_LANG = {"prev":"去年","cur":"本周","next":"明年"};
    var DAY_LANG = {"prev":"上月","cur":"今天", "next":"下月"}
    function getMonthStartEnd(today){
        var start = today.getTime(), end = today.getTime();
        while(true){
            var startDate = new Date(start);
            if (startDate.getMonth() === today.getMonth() || startDate.getDay() !== 0){
                start -= DAY2MILLISECOND;
                continue;
            }
            start += DAY2MILLISECOND;
            break;
        }

        while(true){
            var endDate = new Date(end);
            if (endDate.getMonth() === today.getMonth() || endDate.getDay() !== 1){
                end += DAY2MILLISECOND;
                continue;
            }
            end -= DAY2MILLISECOND;
            break;
        }
        return {start:new Date(start), end:new Date(end)};
    }

    function getYearStartEnd(today){
        var start = today.getTime();
        while(true){
            var startDate = new Date(start);
            if (startDate.getFullYear() === today.getFullYear() || startDate.getDay() !== 0){
                start -= DAY2MILLISECOND;
                continue;
            }
            start += DAY2MILLISECOND * 8;
            break;
        }
        var end = start + (7 * 7 * 8 - 1) * 24 * 60 * 60 * 1000;
        return {start:new Date(start), end: new Date(end)};
    }

    function initDayView(today){
        var dayView = {
            "range": getMonthStartEnd(today),
            "mode": "DAY",
            "metric": [],
            "luckData": {},
            "lang": DAY_LANG,
            "titles": WEEKTITLE,
            "midLang": today.getFullYear() + "年" + (today.getMonth() + 1) + "月"
        };
        for (var i = 0; dayView.range.start.getTime() + i * DAY2MILLISECOND <= dayView.range.end.getTime(); i += 7){
            var oneWeek = [];
            for (var j = 0; j < 7; j++){
                var theDay = new Date(dayView.range.start.getTime() + (i + j) * DAY2MILLISECOND);
                oneWeek.push({
                    name: theDay.getDate(),
                    desc: "",
                    focus: theDay.getFullYear() === today.getFullYear() && theDay.getMonth() === today.getMonth() && theDay.getDate() === today.getDate(),
                    id: theDay.toDateString(),
                    current: theDay.getMonth() === today.getMonth()
                });
            }
            dayView.metric.push(oneWeek);
        }
        return dayView;
    }
    function initWeekView(today){
        var weekView = {
            "range": getYearStartEnd(today),
            "mode": "WEEK",
            "metric": [],
            "luckData": {},
            "lang": WEEK_LANG,
            "midLang": today.getFullYear() + "年"
        };

        var weekNumber = 1;
        for (var i = 0; i < 8; ++i){
            var oneLine = [];
            for (var j = 0; j < 7; ++j){
                var theDay = new Date(weekView.range.start.getTime() + (i * 7 + j) * 7 * DAY2MILLISECOND);
                oneLine.push({
                    //name: "第" + weekNumber + "周",
                    name: weekNumber,
                    desc: (theDay.getMonth() + 1) + "/" + (theDay.getDate()) + "-" + (new Date((theDay.getTime())+6*DAY2MILLISECOND).getMonth() + 1) + "/" + new Date((theDay.getTime())+6*DAY2MILLISECOND).getDate(),
                    id: theDay.toDateString(),
                    focus: (weekView.range.start.getTime() + (i * 7 + j) * 7 * DAY2MILLISECOND) <= today.getTime() && today.getTime() <= (weekView.range.start.getTime() + (i * 7 + j + 1) * 7 * DAY2MILLISECOND),
                    current: theDay.getFullYear() <= today.getFullYear()
                });
                ++weekNumber;
            }
            weekView.metric.push(oneLine);
        }
        return weekView;
    }
    var template = "" +
    "<div class=\"row-fluid calendar\">" +
    "    <div class=\"row-fluid\">" +
    "        <div class=\"col-lg-3 col-md-3 col-sm-5 col-xs-5 close-to-left\">" +
    "            <div class=\"btn-group\">" +
    "            <button class=\"btn btn-default btn-sm\" ng-class=\"{'active':mode==='WEEK'}\" " +
    "                    ng-click=\"changeMode('WEEK')\"><span>周运势</span></button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-class=\"{'active':mode==='DAY'}\"" +
    "                    ng-click=\"changeMode('DAY')\"><span>日运势</span></button> " +
    "            </div>" +
    "        </div>" +
    "        <div class=\"col-sm-7 col-xs-7 pull-right hidden-lg hidden-md close-to-right\">" +
    "            <div class=\"btn-group pull-right\">" +
    "            <button class=\"btn btn-default btn-sm\">" +
    "                <li class=\"glyphicon glyphicon-menu-left\"></li><span ng-bind=\"view.lang.prev\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\">" +
    "                <span ng-bind=\"view.lang.cur\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\">" +
    "                <span ng-bind=\"view.lang.next\"></span><li class=\"glyphicon glyphicon-menu-right\"></li>" +
    "            </button>" +
    "            </div>" +
    "        </div>" +
    "        <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center h4\">" +
    "            <span ng-bind=\"view.midLang\"></span>" +
    "        </div>" +
    "        <div class=\"col-lg-3 col-md-3 hidden-xs hidden-sm pull-right close-to-right\">" +
    "            <div class=\"btn-group pull-right\">" +
    "            <button class=\"btn btn-default btn-sm\">" +
    "                <li class=\"glyphicon glyphicon-menu-left\"></li><span ng-bind=\"view.lang.prev\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\">" +
    "                <span ng-bind=\"view.lang.cur\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\">" +
    "                <span ng-bind=\"view.lang.next\"></span><li class=\"glyphicon glyphicon-menu-right\"></li>" +
    "            </button>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "    <div class=\"row-fluid\">" +
    "        <div class=\"row-fluid\">" +
    "            <table class=\"col-lg-12 table table-bordered\">" +
    "                <thead ng-if=\"view.titles\">" +
    "                <tr>" +
    "                    <th class=\"text-center\" ng-repeat=\"title in view.titles\" ng-bind=\"title\"></th>" +
    "                </tr>" +
    "                </thead>" +
    "                <tbody>" +
    "                <tr ng-repeat=\"row in view.metric track by $index\">" +
    "                    <td ng-repeat=\"col in row track by col.id\" class=\"text-center cell\" " +
    "                        ng-click=\"col.current && onCellClick(col.id)\" " +
    "                        ng-class=\"{'cur':col.current,'oth':!col.current, 'edited':col.edited, 'unedited':!col.edited, 'focus':col.focus}\">" +
    "                        <div class=\"name center-block \" ng-bind=\"col.name\"></div>" +
    "                        <div class=\"desc small center-block hidden-xs\" ng-bind=\"col.desc\"></div>" +
    "                    </td>" +
    "                </tr>" +
    "                </tbody>" +
    "            </table>" +
    "        </div>" +
    "    </div>" +
    "</div>";

    var controller = ['$scope', function($scope){

    }];

    var link = function(scope,element,attris){

        var today = scope.curDay ? new Date(scope.curDay) : new Date();
        var dayView = initDayView(today);
        var weekView = initWeekView(today);

        function updateDayLuckSituation(){
            var promise = scope.getDayLuckSituation({range:dayView.range});
            promise.then(function(){
            });
        }

        function updateWeekLuckSituation(){
            var promise = scope.getWeekLuckSituation(weekView.range);
            promise.then(function(){

            });
        }


        scope.mode = scope.mode === "WEEK" ? scope.mode : "DAY";
        scope.view = scope.mode === "DAY" ? dayView : weekView;

        scope.changeMode = function(mode){
            if (mode === scope.mode){
                return;
            }
            scope.mode = mode;
            if(mode === "DAY"){
                scope.view = dayView;
            }else{
                scope.view = weekView;
            }
        }
        scope.onCellClick = function(key){
            if (scope.mode === "DAY"){
                scope.onDayClick({key:key, data:dayView.luckData[key]});
            }else{
                scope.onWeekClick({key:key, data:weekView.luckData[key]});
            }
        }

        updateDayLuckSituation();
    }
    return function(){
        return {
            restrict: "E",
            template: template,
            replace:true,
            transclude: false,
            scope: {
                //param
                mode: "=mode",
                curDay: "=curDay",

                //function
                getDayLuckSituation: "&getDayLuckSituation",
                getWeekLuckSituation: "&getWeekLuckSituation",
                //event
                onDayClick: "&onDayClick",
                onWeekClick: "&onWeekClick"
            },
            controller: controller,
            link: link
        };
    };
});