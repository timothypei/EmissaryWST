var usernameVal = '';

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$('#loginButton').on('click', function(){
    var data = grabLoginInfo();
    $.ajax({
        type: "POST",
        url: '/api/employees/login',
        data: data,
        dataType: 'json',
        succeess: function(response){
            console.log(response);
            //localStorage.setItem('currentUser',JSON.stringify(response));
            //location.href = '/visitors.html';
        }

    });
});

function grabLoginInfo(){
    var employee;
    employee.email = $('#username').val();
    employee.password = $('#password').val();
    return employee;

}

function checkLoginCookie() {
    var username = getCookie("username");

    // cookie already exists
    if(username != "") {
        // do something
    } else {
        // get Val from Log In
        username = $('#username').val();
        // set Cookie
        if (username != "" && username != null) {
           setCookie("username", username, 365);
        }
    }
}

function checkLogoutCookie() {
    var username = getCookie("username");

    if(username != "") {
        setCookie("username", "", -1);
    } else {
        //do something
    }
}

// with Button named loginButton
$(function() {
    $('#loginButton').click(function () {
        checkLoginCookie();
    });
});

// with Button named signin-bt
$(function() {
    $('#logout-bt').click(function() {
        checkLogoutCookie();
    });
});