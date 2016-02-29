
$(document).ready(function(){

    var socket = io('/visitorList'); //Initialize Socket

    //Socket variables
    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";
    var REMOVE_VISITOR = "remove_visitor";

    //Connect to private socket
   // var companyId = getCookie('company_id');
    socket.emit(VALIDATE_COMPANY_ID, '');

   /***
    * Compile all the Handle Bar Templates
    */
    //DashBoard Template
    var source = $("#visitor-list-template").html();
    var template = Handlebars.compile(source);

    //Modal Template
    var modal = $('#visitor-info-template').html();
    var modalTemplate = Handlebars.compile(modal);


    //SOCKET LISTEN FOR VISITOR QUEUE
    socket.on(VISITOR_LIST_UPDATE, function (data) {
        localStorage.setItem("VISITOR_QUEUE", data);
        var compiledHtml = template(data);
        $('#visitor-list').html(compiledHtml);
    });

    /***
    * Listener for Opening a Modal
    */
    $(document).on('click','.patient-check-out',function(){

       var uniqueId = $(this).attr('value');
       var visitor = findVisitor(uniqueId);

       var compiledTemplate = modalTemplate(visitor);
       $('.modal-dialog').html(compiledTemplate);

    });

    /***
     * Listener for Checking out a Visitor
     */
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
        var visitorQueue = JSON.parse(localStorage.getItem('VISITOR_QUEUE'));

        for(var visitor in visitorQueue) {
           if(visitorQueue.hasOwnProperty(visitor)){
              if(visitorQueue[visitor].id === id){
                  console.log(visitorQueue[visitor]);
                  return visitorQueue[visitor];
              }
           }
        }
    }

    /***
     * Find a specific cookie name
     * @param cName
     * @returns {string|*}
     */
    function getCookie(cName) {
        var name = cName + '=';
        var cookieArray = document.cookie.split(';');

        for (var i = 0, len = cookieArray.length; i < len; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ')
                cookie.substring(1);
            if (cookie.indexOf(name) == 0)
                return cookie.substring(name.length, cookie.length);
        }

    }

    /***
     * TODO order the list by increasing order
     * @param key
     */
    function increasingOrder(key){

    }

    /***
     * TODO order the list by decreasing order
     * @param key
     */
    function decreasingOrder(key){

    }

});
