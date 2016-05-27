function SendAjax(option) {
    var req = new XMLHttpRequest();
    var defReq = {
        method: 'GET',
        url: '',
        async: true,
        data: null,
        success: function() {},
        error: function() {},
        loading: function() {
            console.log('loading');
        },
        loaded: function() {},
        interactive: function() {},
        uninitialized: function() {}
    };
    for (var key in defReq) {
        if (!option.hasOwnProperty(key)) {
            option[key] = defReq[key];
        }
    }
    if (option.url === '') {
        return;
    }
    req.open(option.method, option.url, option.async);
    var postStr = null;
    if (option.method.toUpperCase() === 'POST') {
        postStr = '';
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        for (var key in option.data) {
            if (option.data.hasOwnProperty(key)) {
                var val = typeof option.data[key] == 'object' ? JSON.stringify(option.date[key]) : option.data[key];
                postStr += key + '=' + val + '&';
            }
        }
        postStr = postStr.slice(0, postStr.length-1);
    }
    var callBackTable = [
        option.uninitialized,
        option.loading,
        option.loaded,
        option.interactive,
        function() { //readyState == 4
            switch (req.status) {
                case 200:
                    option.success(req.responseText);
                    break;
                default:
                    option.error();
            }
        }
    ];
    req.onreadystatechange = function() {
        callBackTable[req.readyState]();
    };
    req.send(postStr);
}
