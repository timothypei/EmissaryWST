
$(document).ready(function(){

    var socket = io('/visitorList'); //Initialize Socket

    //Socket variables
    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";
    var REMOVE_VISITOR = "remove_visitor";

    var VISITOR_QUEUE = [];

    //Connect to private socket
    socket.emit(VALIDATE_COMPANY_ID,'uniqueId');

   /***
    * Compile all the Handle Bar Templates
    */
    //DashBoard Template
    var source = $("#visitor-list-template").html();
    var template = Handlebars.compile(source);

    //Modal Template
    var modal = $('#visitor-info-template').html();
    var modalTemplate = Handlebars.compile(modal);


    //LISTEN FOR VISITOR QUEUE
    socket.on(VISITOR_LIST_UPDATE, function (data) {
        VISITOR_QUEUE = data;
        var compiledHtml = template(VISITOR_QUEUE);
        $('#visitor-list').html(compiledHtml);
    });

    /***
    * Function Listener for Opening a Modal
    */
   $(document).on('click','.patient-check-out',function(){

       var uniqueId = $(this).attr('value');
       var visitorIndex = findVisitor(uniqueId);
       var visitor = VISITOR_QUEUE[visitorIndex];

       var compiledTemplate = modalTemplate(visitor);
       $('.modal-dialog').html(compiledTemplate);

    });

    $(document).on('click','.check-in-btn',function(){
        var id = $(this).closest('.modal-content').find('.phone-number').attr('value');
        io.emit(REMOVE_VISITOR, {room: 'uniqueId'}, id);


    });

    /***
     * Find Specific Visitor within the Visitor Array
     * @param id
     * @returns {string}
     */
    function findVisitor(id){
       for(var visitor in VISITOR_QUEUE) {
          if(VISITOR_QUEUE.hasOwnProperty(visitor)){
             if(VISITOR_QUEUE[visitor].id === id){
                 console.log(visitor);
                 return visitor;
             }
          }
       }
    }

});
