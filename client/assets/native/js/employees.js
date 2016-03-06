$(document).ready(function(){
	var data = { employees: [
     	{
      		first_name: "Alicia",
      		last_name: "Nguyen",
      		phone_number: "(234) 345 - 5634",
      		email: "aliciadnguyen@gmail.com"
  		}
    ]};

    function getEmployees() {
       var json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/employees/company/56d40a6aa6de7129d0a4b1f6',
           success: function(response) {
               json = response;
               console.log(response);
           }
       });
       return json;
   }

   	var employees = getEmployees();
   	var source = $("#employee-list-template").html();
   	var template = Handlebars.compile(source);

   	var compiledHtml = template(employees);
	//$("#employee-list").html(compiledHtml);
	$("#employee-list").html(template(data));

    //HARD CODED FOR NOW
    var companyData = {
        company_id: "56d40a6aa6de7129d0a4b1f6",
        name: "WST",
        credit_card_number: "12345678912",
        expiration_date: "2018-4-24",
        email: "danielK@wst.com",
        phone_number: "3109851473",
        paid_time: "2016-04-23T18:25:43.511Z"
    };

    $('.add-btn').click(submitForm);

    //When a patient submits their form
    function submitForm(){
        var d = grabFormElements();
        console.log(d);
        data.employees.push(d);
        $("#employee-list").html(template(data));
    }

    //Grabs elements from the check in and puts it into an object
    function grabFormElements(){
        var newEmployee = {};
        newEmployee.company_id = "56d40a6aa6de7129d0a4b1f6";
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
                  if(DEBUG) console.log(employeeList[employee]);
                  return employeeList[employee];
              }
           }
        }
    }

});
