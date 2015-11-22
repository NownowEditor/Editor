define(['jquery'], function($){
    var mask = function(){
        var overlay = $("<div style='background-color:#000000;left:0;top:0;position:absolute;width:100%;height:100%;z-index:9999;opacity:0.7;'></div>");
        var progress = $("<div class='progress' style='background-color: #aaaaaa; position:absolute; top:0;left:0;right:0;bottom:0;margin:auto auto;min-weight:300px; width:40%'></div>");
        var progress_bar = $("<div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='background-color:#111'></div>");
        var $mask = overlay.append(progress.append(progress_bar));

        this.show = function(hasProgress){
            if (hasProgress){
                progress_bar.css("width","0%");
                progress_bar.html("0%");
            }else{
                progress_bar.css("width","100%");
                progress_bar.html("");
            }
            $mask.appendTo($('body'));
        }

        this.updateprogress = function(progress){
            progress_bar.css("width", progress + "%");
            progress_bar.html(progress + "%");
        }

        this.hide = function(){
            $mask.remove();
        }
    };

    return mask;
});