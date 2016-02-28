
$(document).ready(function(){

    var socket = io(); //Initialize Socket

    //Socket variables
    //var CONNECTION = "connection";
    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";
    var DISCONNECT = "disconnect";
    var REMOVE_VISITOR = "remove_visitor";
    var ADD_VISITOR = "add_visitor";
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
    socket.on(VALIDATE_COMPANY_ID, function(io) {
       io.on(VISITOR_LIST_UPDATE, function (data) {
          console.log("[server] visitor list update");
          var compiledHtml = template(data);
          $('#visitor-list').html(compiledHtml);
       });
    });


    /***
    * Function Listener for Opening a Modal
    */
   $(document).on('click','.patient-check-out',function(){
       var uniqueId = $(this).attr('value');

      socket.on(VALIDATE_COMPANY_ID, function(io) {
         io.emit('send Id', uniqueId);
         io.on('send visitorData', function (data) {
            var compiledTemplate = modalTemplate(data);
            $('.modal-dialog').html(compiledTemplate);
         });
      });

    });

    $(document).on('click','.check-in-btn',function(){
       var id = $(this).closest('.modal-content').find('.phone-number').attr('value');

       socket.on(VALIDATE_COMPANY_ID, function(io) {
          io.emit('check-in-patient', id);
       });

    });




});
