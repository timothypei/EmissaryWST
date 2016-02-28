$(document).ready(function(){

    var socket = io();
    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";
    var DISCONNECT = "disconnect";
    var REMOVE_VISITOR = "remove_visitor";
    var ADD_VISITOR = "add_visitor";

    //Prevent users from scrolling around on iPad
    document.ontouchmove = function(e) {
        e.preventDefault();
    };


    //Bind Listeners
    $('#tap-to-check').on('click', startCheckIn);
    $('.check-in').on('submit',submitForm);


    //When a user starts their check in
    function startCheckIn(){
        console.log("click");
        $('.check-in').addClass('show');
        $('.check-in').animate({
            top:'25%',
            opacity: '1'
        }, 700);
        $(this).addClass('hide');
    }

    //When a patient submits their form
    function submitForm(){
        var data2 = grabFormElements();
        console.log("data 2: " + data2);

        socket.on(VALIDATE_COMPANY_ID, function(io) {
            var data = grabFormElements();
            console.log("data 1: " + data);
            io.emit('VISITOR_LIST_UPDATE', data);
        });
        $(this).animate({
            top:'35%',
            opacity:'0'
        },0);
    }

    //Grabs elements from the check in and puts it into an object
    function grabFormElements(){
        var newVisitor = {};
        newVisitor.firstName= $('#visitor-first').val();
        newVisitor.lastName = $('#visitor-last').val();
        newVisitor.appointment = $('#visitor-appointment').val();
        newVisitor.checkin = getCurrentTime();
        return newVisitor;
    }

    //Function to get Current Time of Check in
    function getCurrentTime(){
        var currentTime;
        var today = new Date();
        var currentHour = today.getHours();
        var currentMinute = today.getMinutes();

        if(currentMinute < 10){
            currentMinute = '0' + currentMinute;
        }

        if(currentHour >= 13){
            currentHour = currentHour - 12;
            currentTime = currentHour + ':' + currentMinute + 'PM';
        }
        else if(currentHour === 12){
            currentTime = currentHour + ':' + currentMinute + 'PM';
        }
        else if (currentHour === 0)
            currentTime = 1 + ':' + currentMinute + 'AM';
        else
            currentTime = currentHour + ':' + currentMinute + 'AM';

        return currentTime;

    }


});
