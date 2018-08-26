$('#show_users_button').click(function(){
    getUsers();
});

function getUsers(){
    $.ajax({       
        type: "GET",
        url: 'http://127.0.0.1:8000/getUsers',
        success: function(data){
            console.log(data);
            // console.log(data[2].email);!!!!!! это чудное сочетание значков дает возможность достучатся ДО обьекта в массиве + к его свойству(в данном случае email)

            $('.user_tr_del').remove();
            data.forEach( function(el){
                $('#user_list_tr').append('<tr class="user_tr_del"><td>' + el.id + '</td><td><b><a href="#" class = "edit_user" data-id =  "' + el.id + '">' + el.name
                + '</a></b></td><td>' + el.email + '</td><td>' + el.role_id + '</td></tr>');
            });
            $('#users_list').dialog( 'open' );
            $(".edit_user").on("click",showUser);
        },
        error: function(data){
            console.log("error");
            // console.log(data);
        }
    });
}
//Обьявление диалогового окна отрисовывает юзеров в диалоговом окошке
$('#users_list').dialog({
    autoOpen: false, 
    height: 600, 
    width: 550,
    buttons: [
        {
            id: 'cancel_users_list',
            text: 'Cancel',
            click: function(){
                $('#users_list').dialog( 'close' );
            }
        }
    ]
});

function delUser(id){
    $.ajax({
        type:'POST',
        headers: {
            'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        },
        url:'http://127.0.0.1:8000/delUser',
        data: {
            id: id
        },
        success: function(data){
            console.log('success');
        },
        error: function(data){
            console.log('error');
        }
    });
}

function updateUser(id){
    var id_user = id;
    var name_user = $('#name').val();
    var email_user = $('#email').val();
    var role_user = $('#role').val();
    var role_id_user = $('#user_role').val();
    $.ajax({
        type:'POST',
        headers: {
            'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        },
        url:'http://127.0.0.1:8000/editUser',
        data: {
            //ассоциативный массив или json которые передаются переменные
            id: id_user,
            name: name_user,
            email: email_user,
            role: role_user,
            role_id: role_id_user,
        },
        success: function(data){
            console.log(data);
            $('#info').append("<span style='color:blue;'>" + data + "</span>");
            $('#info').dialog('open');
            $('#edit_user_form').dialog('close');
        },
        error: function(data){
            console.log('error');
            // $('#info').append("<span>" + messege + "</span>");//выводит информацию о неуспешном измениении юзера
        }
    });
}
    //Дикларация диалогового окна, которое показывает изменения в юзере, если таковы были
    $('#info').dialog({
        autoOpen:false,
        title: "INFO", //Изначально закрыто
        buttons: [
                {
                    id: 'cancel_info',
                    text: 'Cancel',
                    click: function(){
                        $('#info').dialog( 'close' );
                    }
                }
        ]
    }); 
        
    
//Показать юзера
function showUser(){
    var id = $(this).data("id");
    $.ajax({
        type:'POST',
        headers: {
            'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        },
        url:'http://127.0.0.1:8000/getUser',
        data: {
            id: id,
        },
        success: function(data){
            console.log('success');
            $('#user_id').val(data.id);
            $('#name').val(data.name);
            $('#email').val(data.email);
            // $('#role').val(data.role_id);
            $('#edit_user_form').dialog('open');
            $('#users_list').dialog('close');
        },
        error: function(data){
            console.log('error');
        }
    });
}


//редактирование юзера!
$('#edit_user_form').dialog({
    autoOpen: false,
    width: 500,
    title: 'Edit User',
     
    buttons: [
        {
            id: 'save_user',
            text: 'Edit',
            click: function(data){
                var id = $('#user_id').val();
                updateUser(id);//фун-я которая сохраняет данные на сервак
                // $('#info').append("<span>" + messege1 + "</span>");
                $('#edit_user_form').dialog( 'close' );
            }
        },
        {
            id: 'delete_user',
            text: 'Delete',
            click: function(data){
                var id = $('#user_id').val();
                delUser(id)//Функция, которая удаляет содерживое модального окна
                $('#edit_user_form').dialog( 'close' );
            }
        },
        {
            id: 'cancel_edit_user',
            text: 'Cancel',
            click: function(){
                $('#edit_user_form').dialog( 'close' );
            }
        }
    ]
});
