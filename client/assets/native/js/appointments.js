$(document).ready(function(){
    var companyData = JSON.parse(localStorage.getItem("currentCompany"));
    var myCompanyId = companyData._id;

    var curUser = JSON.parse(localStorage.getItem('currentUser'));
    $('#user-name').text(curUser.first_name + ' ' +  curUser.last_name);

    var appts = getAppts();
    var source = $("#appt-list-template").html();
    var template = Handlebars.compile(source);
    var compiledHtml = template(appts);

    $("#appt-list").html(compiledHtml);
    $('.save-btn').click(submitForm);
    
   /***
     * Makes a get request to display list of appts
     * @param none
     * @returns displays the appt list
     */
    function getAppts() {
       var json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/appointments/company/' + myCompanyId,
           success: function(response) {
               json = response;
               console.log(response);
           }
       });
       return json;
   }

   /***
     * When a patient submits their form
     * @param none
     * @returns updates the appt list
     */
    function submitForm(){
        var d = grabFormElements();
        console.log(d);
        updateApptList(d);
        $("#appt-list").html(template(appts));
        document.getElementById("appt-form").reset();
    }

    /***
     * Makes a post request to update list of appts when adding a new employee
     * @param none
     * @returns updates the appt list
     */
   function updateApptList(obj) {
      $.ajax({
        dataType: 'json',
           type: 'POST',
           data: obj,
           async: false,
           url: '/api/appointments/',
           success: function(response) {
                appts.push(response);
                console.log(response);
           }
      });
    }

    /***
     * Grabs elements from the check in and puts it into an object
     * @param none
     * @returns new appt object
     */
    function grabFormElements(){
        var newAppt = {};
        newAppt.company_id = myCompanyId;
        newAppt.first_name= $('#appt-first').val();
        newAppt.last_name = $('#appt-last').val();
        newAppt.phone_number = $('#appt-number').val();
        newAppt.provider_name = $('#appt-provider').val();
        newAppt.date = $('#appt-date').val();
        return newAppt;
    }    

});
