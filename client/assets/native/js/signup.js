/**
 * Created by DanielKong on 3/8/16.
 */
$(document).ready(function(){

    var companyId;

    $('#submit-btn').on('click', function(){
        var employeeData = grabEmployeeData();
        console.log(employeeData);
        ajaxPost('/api/employees',employeeData);

    });

    $('#submit-company-btn').on('click',function(){
        var companyData = grabCompanyData();
        console.log(companyData);
        ajaxPost('/api/companies',companyData);
    })

    function grabCompanyData(){
        var company = {};
        company.name = $('#form-company-name').val();
        company.email = $('#form-email').val();
        company.phone_number = $('#form-phone').val();
        return company;

    }
    function grabEmployeeData(){
        var employee = {};
        employee.first_name = $('#form-employee-first').val();
        employee.last_name = $('#form-employee-last').val();
        employee.email = $('#form-employee-email').val();
        employee.password = $('#form-password').val();
        employee.phone_number = $('#form-employee-phone').val();
        employee.role = $('#form-employee-role').val();
        employee.company_id = companyId;
        return employee;
    }

    function ajaxPost(url, data){
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: 'json',
            success: function(response){
                console.log(response);
                if(url == '/api/employees') {
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    location.href = '/visitors.html';
                }
                else if (url == '/api/companies') {
                    localStorage.setItem('currentCompany', JSON.stringify(response));
                    companyId = response._id;
                }
            }
        });
    }


});