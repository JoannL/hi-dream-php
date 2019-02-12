var JTools = {
    cookie: {
        write: function (key, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        writes: function (json) {
            for (key in json) {
                this.write(key, json[key]);
            }
        },
        read: function (key) {
            var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        remove: function (key) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(key);
            if (cval != null)
                document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
        }
    },
    theForm: {
        values: function (source) {
            var data = {};
            $(source).serializeArray().map(function (x) {
                data[x.name] = x.value;
            });
            return data;
        },
        setForm: function (json) {
            for (name in json) {
                $("input[name=" + name + "]").val(values[name]);
            }
        }
    },
	random : function(limit){
		var num = Math.random();
		num = Math.ceil(num * limit);
		var str;
		if (num < 10) {
			str = "0" + num
		} else {
			str = num.toString();
		}
		return str;
	},
    noLogin : function(data){
        if(data == 'noLogin'){
            window.location.href=getRootPath()+"/page/login.html?redirect="+window.location.href;
        }
    },
    getQueryVariable : function(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
}
Array.prototype.isContains = function(key,value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][key] == value) return true;
    }
    return false;
};