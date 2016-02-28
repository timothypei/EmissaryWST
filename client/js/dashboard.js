
$(document).ready(function(){

    var socket = io(); //Initialize Socket

    //Socket variables

    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";

    var VISITOR_QUEUE = [];

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
          VISITOR_QUEUE = data;
          var compiledHtml = template(VISITOR_QUEUE);
          $('#visitor-list').html(compiledHtml);
       });
    });


    /***
    * Function Listener for Opening a Modal
    */
   $(document).on('click','.patient-check-out',function(){
       var uniqueId = $(this).attr('value');
       var visitor = findVisitor(uniqueId);
       var compiledTemplate = modalTemplate(visitor);
       $('.modal-dialog').html(compiledTemplate);


    });

    $(document).on('click','.check-in-btn',function(){
       var id = $(this).closest('.modal-content').find('.phone-number').attr('value');

       socket.on(VALIDATE_COMPANY_ID, function(io) {
          io.emit(VISITOR_LIST_UPDATE, id);
       });

    })

    function findVisitor(id){
       for(var visitor in VISITOR_QUEUE) {
          if(VISITOR_QUEUE.hasOwnProperty(visitor)){
             if(VISITOR_QUEUE[visitor].id === id){
                return visitor;
             }
          }
       }
    }




});
