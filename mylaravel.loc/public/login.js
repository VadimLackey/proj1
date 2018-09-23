function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

function status(){
    $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:8000/status',
        success: function(data){
            console.log("success");
            var status =  data.status;
            var name = data.name;
            var role = data.role;
            if (status){
                $('#login_button').hide();
                $('#logout').show();
                $('#show_users_button').show();//Кнопка показывающая всех юзеров АКТИВНА
                $('#hello').text('Привет, ' + name + '!');
            }
        },
        error: function(data){
            console.log("error");
            $('#logout').hide();
            $('#login_button').show();
            $('#show_users_button').hide();
        }
    });
}

$('#login_button').click(function() {
    $('#login_form').dialog('open');
});

$('#login_form').dialog({
    autoOpen: false, 
    width: 400,
    title: 'LogIn',
    height: "auto",
    width: "auto",
    modal: true,
        my: "center",
        at: "center",
        of: window,
    buttons: 
        [
            {
                id: 'login',
                text: 'LogIn',
                click: function(){
                    $('.ui-dialog').css("top","0px"); //тут написать стили окна
                    var login = $('#login').val();
                    var password = $('#password').val();
                    $.ajax({
                        type:'POST',
                        headers: {
                            'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
                        },
                        url:'http://127.0.0.1:8000/login', //Нужно создать класс и весь функционал
                        data: {
                            name: login,
                            password: password,
                        },
                        success: function(data){
                            console.log('success');
                            $('#login_form').dialog( 'close' );
                            status();
                        },
                        
                        error: function(data){
                            console.log( 'error' );
                        }
                    });
                }
            },
            {
                id: 'cancel_login_form',
                text: 'Cancel',
                click: function(){
                    $('#login_form').dialog( 'close' );
                }
            }
        ]
});

$('#logout').click(function(){
    logout();
});

function logout(){
    $.ajax({
        headers: {
            'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        },
        type: "POST",
        url: 'http://127.0.0.1:8000/logout',
        success: function(data){
            console.log("success");
            $('#login_button').show();
            $('#logout').hide();
            $('#show_users_button').hide();//Кнопка которая показывает всех юзеров НЕ АКТИВНА
            $('#hello').text('');
            status();
        },
        error: function(data){
            console.log("error");
        }
    });
}
