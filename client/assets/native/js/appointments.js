$(document).ready(function(){
    var username = getCookie('username');
    var myCompanyId = getAllcompany();

    var appts = getAppts();
    var source = $("#appt-list-template").html();
    var template = Handlebars.compile(source);
    var compiledHtml = template(appts);

    $("#appt-list").html(compiledHtml);
    $('.save-btn').click(submitForm);

    
    /* 
     * find My company ID within all company IDs
     * return my compnay id if found my company ID, else ""
     */
    function getAllcompany() {
      var cid = "";
      var return_cid = "";
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/companies',
           success: function(response) {
            var company_id = "";
            $.each(response, function (key, value) {
                company_id = value._id;
                cid = getMyCompanyId(company_id);
                if(cid != "") {
                  return_cid = cid;
                }

              });       
            }
       });
       return return_cid;
   } 

   /* 
    * find My compnay ID within all company IDs of all employees in the company
    * return my company ID if found my company ID, else ""
    */
   function getMyCompanyId(company_id) {
       var cid = "";
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/appointments/admin/' + company_id,
           success: function(response) {
            $.each(response, function (key, value) {
                if(company_id == value.company_id && username == value.email) {
                  cid = value.company_id;
                  
                }
              });       
            }
       });
       return cid;
   } 



    
   /***
     * Makes a get request to display list of appts
     * @param none
     * @returns displays the employee list
     */
    function getAppts() {
       var json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/appointments/admin/' + myCompanyId,
           success: function(response) {
               json = response;
               //console.log(response);
           }
       });
       return json;
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
    

});
