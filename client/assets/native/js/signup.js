/**
 * Created by DanielKong on 3/8/16.
 */
$(document).ready(function(){

    var companyId;
    var buttonClicked;

    //Listener for Initial Sign up of an Employee
    $('#submit-btn').on('click', function(){
        buttonClicked = 'employee';
    });

    //Listener for creating a company
    $('#submit-company-btn').on('click',function(){
        buttonClicked = 'company';
    });

    $('#company-reg-form').on('submit', function(event) {
        var companyData = grabCompanyData();
        console.log(companyData);
        ajaxPost('/api/companies',companyData);
        transitionToNextStep();
        return false;
    });

    $('#employee-reg-form').on('submit', function(event) {
        var employeeData = grabEmployeeData();
        console.log(employeeData);
        ajaxPost('/api/employees',employeeData);
        return false;
    });

    /**
     * @function grabCompanyData
     * @desc Grab company data from the forms.
     * @return {company} company
     */
    function grabCompanyData(){
        var company = {};
        company.name = $('#form-company-name').val();
        company.email = $('#form-email').val();
        company.phone_number = $('#form-phone').val();
        return company;
    }

    /**
     * @function grabEmployeeData
     * @desc Grab employee data from the forms.
     * @return {employee} employee 
     */
    function grabEmployeeData(){
        var employee = {};
        employee.first_name = $('#form-employee-first').val();
        employee.last_name = $('#form-employee-last').val();
        employee.email = $('#form-employee-email').val();
        employee.password = $('#form-password').val();
        employee.phone_number = $('#form-employee-phone').val();
        employee.role = 'c_admin';
        employee.company_id = companyId;
        return employee;
    }

    /**
     * @function ajaxPost
     * @param {url} url
     * @param {data} data
     * @desc Ajax function to create a POST request to server.
     */
    function ajaxPost(url, data){
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: 'json',
            success: function(response){
                //console.log(response);
                if(url === '/api/employees') {
                    localStorage.setItem('userState', 1);
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    location.href = '/visitors.html';
                }
                else if (url === '/api/companies') {
                    localStorage.setItem('currentCompany', JSON.stringify(response));
                    companyId = response._id;
                }
            },
            error: function(response){
                //console.log(response);
                //alert(jQuery.parseJSON(resJSON).responseText);
                event.preventDefault();
                location.href = '/signup.html';
            }
        });
    }

    /**
     * @function transitionToNextStep
     * @desc Bring up the employees form after the company form is filled?
     */
    function transitionToNextStep () {
        var next_step = true;

        if( next_step ) {
            $('#company-reg-form').fadeOut(400, function() {
                $('#employee-reg-form').find('fieldset:first-child').fadeIn();
            });
        }
    }
});
