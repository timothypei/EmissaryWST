$(document).ready(function(){
   var companyData = JSON.parse(localStorage.getItem("currentCompany"));
   var myCompanyId = companyData._id;

   console.log(myCompanyId);


   var curUser = JSON.parse(localStorage.getItem('currentUser'));
   $('#user-name').text(curUser.first_name + ' ' +  curUser.last_name);
   var employees = getEmployee();

   var source = $("#setting-list-template").html();
   var template = Handlebars.compile(source);
   var compiledHtml = template(employees);



   // Pre-fill in current user information
   document.getElementsByTagName("input")[0].setAttribute("value", curUser.first_name);
   document.getElementsByTagName("input")[1].setAttribute("value", curUser.last_name);
   document.getElementsByTagName("input")[2].setAttribute("value", curUser.phone_number);
   document.getElementsByTagName("input")[3].setAttribute("value", curUser.email);

   // Pulls up form to change employee info
   $('.update-btn').click(updateEmployeeInfo);
   $("#setting-list").html(compiledHtml);

   /**
    * @func getEmployee
    * @desc Makes a get request to display list of employees
    * @returns displays the employee list
    */
   function getEmployee() {
       var json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/employees/' + curUser._id,
           success: function(response) {
               json = response;
               console.log(response);
           }
       });
       return json;
   }

   /**
    * @func grabFormElementsUpdate
    * @desc Grabs elements from the check in and puts it into an object
    * @returns {employee} new employee object
    */
   function grabFormElementsUpdate(){
       var newEmployee = {};
       newEmployee.first_name= $('#employee-first').val();
       newEmployee.last_name = $('#employee-last').val();
       newEmployee.phone_number = $('#employee-number').val();
       newEmployee.email = $('#employee-email').val();
       return newEmployee;
   }

   /**
    * @func updateEmployeeInfo
    * @desc Update the current employee information.
    * @returns {string} updated employee info
    */
   function updateEmployeeInfo(){
       var data = grabFormElementsUpdate();
       console.log(data);
       updateEmployee(data);
       $("#setting-list").html(template(employees));
       document.getElementById("settings-form").reset();
   }

   /**
    * @func updateEmployee
    * @desc Makes a put request to update info of employee
    * @param {employee} obj employee
    */
   function updateEmployee(obj) {
       $.ajax({
           dataType: 'json',
           type: 'PUT',
           data: obj,
           async: false,
           url: '/api/employees/' + curUser._id,
           success: function(response) {
               console.log(response);
               localStorage.setItem('currentUser', JSON.stringify(response));
           }
       });
   }

   $('#logoutButton').on('click',function(){
       localStorage.setItem('userState',0);
   });


});