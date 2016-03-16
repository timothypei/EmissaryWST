// with Button named loginButton
$(function() {
    $('#loginButton').click(function () {
        event.preventDefault();
        var userData = grabUserData();
        ajaxPostUser('/api/employees/login', userData);
    });
});

// with Button named signin-bt
$(function() {
    $('#logout-bt').click(function() {
        
    });
});

//Ajax function to create a POST request to server
function ajaxPostUser(url, data){
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        success: function(response){
            console.log(response);
            localStorage.setItem('currentUser', JSON.stringify(response));
            localStorage.setItem('userState', 1);
            //alert(response.company_id);
            ajaxGetCompanyInfo('/api/companies/' + response.company_id);
        }
    });
}
// ex) company_id : 56e8a51293a19986040e93fe
//Ajax function to create a POST request to server
function ajaxGetCompanyInfo(url){
    $.ajax({
        type: "GET",
        url: url,
        data: $('#response').serialize(),
        async: false,
        dataType: 'json',
        success: function(response){
            console.log(response);
            //alert(response.name);
            localStorage.setItem('currentCompany', JSON.stringify(response));
        }
    });
}


//Grab user data from form
function grabUserData(){
    var user = {};
    user.email = $('#username').val();
    user.password = $('#password').val();
    return user;
}
