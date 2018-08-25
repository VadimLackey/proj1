// $('#login_button').click(function() {
//     $('#login_form').dialog('open');
// });

// $('#login_form').dialog({
//     autoOpen: false, 
//     width: 400,
//     title: 'LogIn',
//     height: "auto",
//     width: "auto",
//     modal: true,
//         my: "center",
//         at: "center",
//         of: window,
//     buttons: 
//         [
//             {
//                 id: 'login',
//                 text: 'LogIn',
//                 click: function(){
//                     $('.ui-dialog').css("top","0px"); //тут написать стили окна
//                     var login = $('#login').val();
//                     var password = $('#password').val();
//                     $.ajax({
//                         type:'POST',
//                         headers: {
//                             'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
//                         },
//                         url:'http://127.0.0.1:8000/login', //Нужно создать класс и весь функционал
//                         data: {
//                             login: login,
//                             password: password,
//                         },
//                         success: function(data){
//                             console.log('success');
//                             $('#login_form').dialog( 'close' );
//                         },
                        
//                         error: function(data){
//                             console.log('error');
//                         }
//                     });
//                 }
//             },
//             {
//                 id: 'cancel_login_form',
//                 text: 'Cancel',
//                 click: function(){
//                     $('#login_form').dialog( 'close' );
//                 }
//             }
//         ]
// });
