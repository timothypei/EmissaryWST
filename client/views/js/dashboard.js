
$(document).ready(function(){

    var socket = io(); //Initialize Socket

    /***
     * Compile all the Handle Bar Templates
     */

    //DashBoard Template
    var source = $("#visitor-list-template").html();
    var template = Handlebars.compile(source);

    //Modal Template
    var modal = $('#visitor-info-template').html();
    var modalTemplate = Handlebars.compile(modal);


    //Update Patient List
    socket.on('send list', function (data) {
        var compiledHtml = template(data);
        $('#visitor-list').html(compiledHtml);
    });


    /***
    * Function Listener for Opening a Modal
    */
   $(document).on('click','.patient-check-out',function(){
       var uniqueId = $(this).attr('value');
       socket.emit('send Id',uniqueId);
       socket.on('send visitorData',function(data){
          var compiledTemplate = modalTemplate(data);
           $('.modal-dialog').html(compiledTemplate);
       });
    });

    $(document).on('click','.check-in-btn',function(){
        var id = $(this).closest('.modal-content').find('.phone-number').attr('value');
        socket.emit('check-in-patient',id);

    });





});
