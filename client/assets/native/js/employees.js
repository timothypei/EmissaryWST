$(document).ready(function(){
    var username = getCookie('username');
    var myCompanyId = getAllcompany();

    var employees = getEmployees();
    var source = $("#employee-list-template").html();
    var template = Handlebars.compile(source);
    var compiledHtml = template(employees);

    $("#employee-list").html(compiledHtml);
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
           url: '/api/employees/company/' + company_id,
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
     * Makes a get request to display list of employees 
     * @param none
     * @returns displays the employee list
     */
    function getEmployees() {
       var json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/employees/company/' + myCompanyId,
           success: function(response) {
               json = response;
               //console.log(response);
           }
       });
       return json;
   }

   /***
     * Makes a post request to update list of employees when adding a new employee
     * @param none
     * @returns updates the employee list
     */
   function updateEmployeeList(obj) {
      $.ajax({
        dataType: 'json',
           type: 'POST',
           data: obj,
           async: false,
           url: '/api/employees',
           success: function(response) {
               employees.push(response);
               //console.log(response);
           }
      });
    }

     /***
     * When a patient submits their form
     * @param none
     * @returns updates the employee list
     */
    function submitForm(){
        var d = grabFormElements();
        console.log(d);
        updateEmployeeList(d);
        $("#employee-list").html(template(employees));
        document.getElementById("employee-form").reset();
    }

    /***
     * Grabs elements from the check in and puts it into an object
     * @param none
     * @returns new employee object
     */
    function grabFormElements(){
        var newEmployee = {};
        newEmployee.company_id = myCompanyId;
        newEmployee.role = "c_employee",
        newEmployee.first_name= $('#employee-first').val();
        newEmployee.last_name = $('#employee-last').val();
        newEmployee.phone_number = $('#employee-number').val();
        newEmployee.email = $('#employee-email').val();
        newEmployee.password = $('#employee-pw').val();
        newEmployee.confirm_password = $('#employee-confirm-pw').val();
        return newEmployee;
    }

     /***
     * Find Specific Employee Given Employee ID within the Employee Array
     * @param id
     * @returns {string}
     */
    function findEmployee(id){

        for(var employee in employeeList) {
           if(employeeList.hasOwnProperty(employee)){
              if(employeeList[employee]._id === id){
                  if(DEBUG) //console.log(employeeList[employee]);
                  return employeeList[employee];
              }
           }
        }
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
