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

    function DayView(oneDay){
        var today = new Date();
        this.oneDay = new Date(oneDay.Format("yyyy-MM-01 00:00:00"));
        this.range = getMonthStartEnd(oneDay);
        this.mode = "DAY";
        this.metric = [];
        this.luckData = {};
        this.lang = DAY_LANG;
        this.titles = WEEKTITLE;
        this.midLang = this.oneDay.getFullYear() + "年" + (this.oneDay.getMonth() + 1) + "月";

        this.initMetric = function(){
            this.metric = [];
            for (var i = 0; this.range.start.getTime() + i * DAY2MILLISECOND <= this.range.end.getTime(); i += 7){
                var oneWeek = [];
                for (var j = 0; j < 7; j++){
                    var theDay = new Date(this.range.start.getTime() + (i + j) * DAY2MILLISECOND);
                    oneWeek.push({
                        id: theDay.Format("yyyy-MM-dd"),
                        name: theDay.Format("dd"),
                        desc: "",
                        focus: theDay.getFullYear() === today.getFullYear() && theDay.getMonth() === today.getMonth() && theDay.getDate() === today.getDate(),
                        current: theDay.getMonth() === this.oneDay.getMonth()
                    });
                }
                this.metric.push(oneWeek);
            }
        }

        this.prev = function(){
            if (this.oneDay.getMonth() > 0){
                this.oneDay.setMonth(this.oneDay.getMonth()-1);
            }else{
                this.oneDay.setFullYear(this.oneDay.getFullYear() - 1);
                this.oneDay.setMonth(11);
            }
            this.range = getMonthStartEnd(this.oneDay);
            this.initMetric();
            this.midLang = this.oneDay.getFullYear() + "年" + (this.oneDay.getMonth() + 1) + "月";
        }
        this.next = function(){
            if (this.oneDay.getMonth() < 11){
                this.oneDay.setMonth(this.oneDay.getMonth() + 1);
            }else{
                this.oneDay.setFullYear(this.oneDay.getFullYear() + 1);
                this.oneDay.setMonth(0);
            }
            this.range = getMonthStartEnd(this.oneDay);
            this.initMetric();
            this.midLang = this.oneDay.getFullYear() + "年" + (this.oneDay.getMonth() + 1) + "月";
        }
        this.today = function(){
            if (today.getFullYear() === this.oneDay.getFullYear() && today.getMonth() === this.oneDay.getMonth()){
                return;
            }
            this.oneDay.setFullYear(today.getFullYear());
            this.oneDay.setMonth(today.getMonth());
            this.range = getMonthStartEnd(this.oneDay);
            this.initMetric();
            this.midLang = this.oneDay.getFullYear() + "年" + (this.oneDay.getMonth() + 1) + "月";
        }

        this.initMetric();
    }

    function WeekView(oneDay){
        var today = new Date();
        this.oneDay =  new Date(oneDay.getFullYear() + "-01-01 00:00:00");
        this.range =  getYearStartEnd(this.oneDay);
        this.mode =  "WEEK";
        this.metric =  [];
        this.luckData =  {};
        this.lang =  WEEK_LANG;
        this.midLang =  oneDay.getFullYear() + "年";

        this.initMetric = function(){
            this.metric = [];
            var thisYearWeek = 1;
            var nextYearWeek = 1;
            for (var i = 0; i < 8; ++i){
                var oneLine = [];
                for (var j = 0; j < 7; ++j){
                    var theDay = new Date(this.range.start.getTime() + (i * 7 + j) * 7 * DAY2MILLISECOND);
                    var sunday = new Date(theDay.getTime() + 6 * 24 * 60 * 60 * 1000);
                    oneLine.push({
                        id: sunday.Format('yyyy-MM-dd'),
                        name: (theDay.getFullYear() <= this.oneDay.getFullYear()) ? thisYearWeek++ : nextYearWeek++,
                        range: {monday: theDay.Format("yyyy-MM-dd"), sunday: sunday.Format("yyyy-MM-dd")},
                        desc: theDay.Format("MM/dd") + "-" + sunday.Format("MM/dd"),
                        focus: theDay.getTime() <= today.getTime() && today.getTime() < (sunday.getTime() + 24 * 60 * 60 * 1000),
                        current: theDay.getFullYear() <= this.oneDay.getFullYear()
                    });
                }
                this.metric.push(oneLine);
            }
        }
        this.prev = function(){
            this.oneDay.setFullYear(this.oneDay.getFullYear()-1);
            this.range = getYearStartEnd(this.oneDay);
            this.initMetric();
            this.midLang = this.oneDay.getFullYear() + "年";
        }
        this.next = function(){
            this.oneDay.setFullYear(this.oneDay.getFullYear()+1);
            this.range = getYearStartEnd(this.oneDay);
            this.initMetric();
            this.midLang = this.oneDay.getFullYear() + "年";
        }
        this.today = function(){
            if (today.getFullYear() === this.oneDay.getFullYear()){
                return;
            }
            this.oneDay.setFullYear(today.getFullYear());
            this.range = getYearStartEnd(this.oneDay);
            this.initMetric();
            this.midLang = this.oneDay.getFullYear() + "年";
        }

        this.initMetric();
    }

    function YearView(oneDay){
        var today = new Date();
        this.oneDay =  new Date(oneDay.getFullYear() + "-01-01 00:00:00");
        this.range = {start: (oneDay.getFullYear() - 3) + "-01-01 00:00:00",
                      end: (oneDay.getFullYear() + 3) + "-01-01 00:00:00"};
        this.mode =  "YEAR";
        this.metric =  [];
        this.luckData =  {};
        this.midLang =  "年度运势";

        this.initMetric = function(){
            this.metric = [];
            var years = [];
            for (var i = -3; i <= 3; ++i){
                years.push({
                    id: oneDay.getFullYear() + i,
                    name: oneDay.getFullYear() + i,
                    desc: "",
                    focus: i === 0,
                    current: true
                });
            }
            this.metric.push(years);
        }

        this.initMetric();
    }
    var template = "" +
    "<div class=\"row-fluid calendar\">" +
    "    <div class=\"row-fluid\">" +
    "        <div class=\"col-lg-3 col-md-3 col-sm-5 col-xs-6 close-to-left close-to-right\">" +
    "            <div class=\"btn-group\">" +
    "            <button class=\"btn btn-default btn-sm\" ng-class=\"{'active':mode==='YEAR'}\" " +
    "                    ng-click=\"changeMode('YEAR')\"><span class=\"hidden-lg hidden-md hidden-sm\">年运</span><span class=\"hidden-xs\">年运势</span></button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-class=\"{'active':mode==='WEEK'}\" " +
    "                    ng-click=\"changeMode('WEEK')\"><span class=\"hidden-lg hidden-md hidden-sm\">周运</span><span class=\"hidden-xs\">周运势</span></button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-class=\"{'active':mode==='DAY'}\"" +
    "                    ng-click=\"changeMode('DAY')\"><span class=\"hidden-lg hidden-md hidden-sm\">日运</span><span class=\"hidden-xs\">日运势</span></button> " +
    "            </div>" +
    "        </div>" +
    "        <div ng-if=\"view.prev || view.today || view.next\" class=\"col-sm-7 col-xs-6 pull-right hidden-lg hidden-md close-to-left close-to-right\">" +
    "            <div class=\"btn-group pull-right\">" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"view.prev()\">" +
    "                <li class=\"glyphicon glyphicon-menu-left\"></li><span ng-bind=\"view.lang.prev\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"view.today()\">" +
    "                <span ng-bind=\"view.lang.cur\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"view.next()\">" +
    "                <span ng-bind=\"view.lang.next\"></span><li class=\"glyphicon glyphicon-menu-right\"></li>" +
    "            </button>" +
    "            </div>" +
    "        </div>" +
    "        <div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center h4\">" +
    "            <span ng-bind=\"view.midLang\"></span>" +
    "        </div>" +
    "        <div ng-if=\"view.prev || view.today || view.next\" class=\"col-lg-3 col-md-3 hidden-xs hidden-sm pull-right close-to-right\">" +
    "            <div class=\"btn-group pull-right\">" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"view.prev()\">" +
    "                <li class=\"glyphicon glyphicon-menu-left\"></li><span ng-bind=\"view.lang.prev\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"view.today()\">" +
    "                <span ng-bind=\"view.lang.cur\"></span>" +
    "            </button>" +
    "            <button class=\"btn btn-default btn-sm\" ng-click=\"view.next()\">" +
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

        var oneDay = scope.curDay ? new Date(scope.curDay) : new Date();
        var views = {
            "YEAR": new YearView(oneDay),
            "WEEK": new WeekView(oneDay),
            "DAY": new DayView(oneDay)
        };

        function updateDayLuckSituation(){
            var promise = scope.getDayLuckSituation(views.DAY.range);
            promise.then(function(){
            });
        }

        function updateWeekLuckSituation(){
            var promise = scope.getWeekLuckSituation(views.WEEK.range);
            promise.then(function(){

            });
        }

        function updateYearLuckSituation(){
            var promise = scope.getYearLuckSituation(views.YEAR.range);
            promise.then(function(){

            });
        }

        scope.mode = ["YEAR","WEEK","DAY"].indexOf(scope.mode) >= 0 ? scope.mode : "DAY";
        scope.view = views[scope.mode];

        scope.changeMode = function(mode){
            if (mode === scope.mode){
                return;
            }
            scope.mode = mode;
            scope.view = views[mode];
        }

        scope.onCellClick = function(key){
            if (scope.mode === "DAY"){
                scope.onDayClick({key:key});
            }else if(scope.mode === "WEEK"){
                scope.onWeekClick({key:key});
            }else if(scope.mode === "YEAR"){
                scope.onYearClick({key:key});
            }
        }

        switch(scope.mode)
        {
            case "YEAR":
                updateYearLuckSituation();
                break;
            case "WEEK":
                updateWeekLuckSituation();
                break;
            case "DAY":
                updateDayLuckSituation();
                break;
        };
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
                getYearLuckSituation: "&getYearLuckSituation",
                //event
                onDayClick: "&onDayClick",
                onWeekClick: "&onWeekClick",
                onYearClick: "&onYearClick"
            },
            controller: controller,
            link: link
        };
    };
});