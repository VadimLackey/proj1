$(document).ready(function() {
    //КУКИ! ЧИТАТЬ.
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    console.log(getCookie("XSRF-TOKEN"));    // alert("Hello!");
    $.ajaxSetup({ headers: { 'XSRF-TOKEN': getCookie("XSRF-TOKEN") } });
    //Запрос при аутентификации позьзователя убирается кнопка ввойти и появляется кнопка выйти.
    
    status();
    function status(){
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:8000/status',
            success: function(data){
                console.log("success");
                var status =  data.status;
                var name = data.name;
                var role = data.role;
                var role_name = data.role_name;//то что прилетело с ф-и status
                if(role==1){
                    $('#show_authors_button').show();
                }else{
                    $('#show_authors_button').hide();
                }
                if (status){
                    $('#login_button').hide();
                    $('#logout').show();
                    // $('#show_authors_button').hide();
                    $('#show_users_button').show();//Кнопка показывающая всех юзеров АКТИВНА!
                    $('#hello').text('Привет, ' + name + '!' + '<br>' + 'Вы ' + role_name);
                }
                
            },
            error: function(data){
                console.log("error");
                console.log(data);
                $('#logout').hide();
                $('#login_button').show();
                $('#show_users_button').hide();
            }
        });
    }
    // console.log("Hello");
    
    //Ф-я которая отрисовывает таблицу с 4 столбами
    function getArticles(){
        $.ajax({       
            type: "GET",
            url: 'http://127.0.0.1:8000/getArticles',
            success: function(data){
                // console.log(data);
                $('tr.del').remove();
                
                data.forEach( function(el){
                    $('#articles_list_tr').append('<tr class="del table-warning show_event"><td>' 
                    + el.id + '</td><td><b><a href="#" class = "edit_article" data-id = "' + el.id + '">'+ el.title 
                    + '</a></b></td><td><b><a href="#" class = "edit_article" data-id = "' + el.id + '">' 
                    + el.author + '</a></b></td><td>' 
                    + el.content + '</td><td><button class = "del_article" data-id = "' + el.id 
                    + '">Delete</button></td></tr>')
                });
                $(".del_article").on("click",delArticle);
                $(".edit_article").on("click",editArticle);

                //Вызывается функция, которая при нажатии на кнопку "Удалить" delArticle
            },
            error: function(data){
                console.log("error");
                // console.log(data);
            }
        });
    }

    getArticles();
        //функция которая выбирает нужную статью для удаления
    function delArticle(data){
        var id = $(this).data("id");
        delFunc(data, id);
    }

    function delFunc(data, id){
        $.ajax({
            type:'POST',
            headers: {
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
            },
            url:'http://127.0.0.1:8000/delArticle',
            data: {
                id: id
            },
            success: function(data){
                console.log('success');
                getArticles();
                //Вопрос об удалении статьи  - типа подумай а то можешь натупить...))))
                alert("Вы действительно хотите удалить статью?");
                alert(data);
            },
            error: function(data){
                console.log('error');
            }
        });
    }
   //редактирование статьи
    function editArticle(){
        var id = $(this).data("id");
        $.ajax({
            type:'POST',
            headers: {
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
            },
            url:'http://127.0.0.1:8000/getArticle',
            data: {
                id: id,
            },
            success: function(data){
                console.log('success');
                $('#article_id').val(data.id);
                $('#author2').val(data.author);
                $('#title2').val(data.title);
                $('#content2').val(data.content);
                $('#edit_article_form').dialog('open');
            },
            error: function(data){
                console.log('error');
            }
        });
    }
    //Декларация функции, которая идентифицирует пользователя и дает ему права согластно идентификации
    
    function updateArticle(id){
        var author = $('#author2').val();
        var title = $('#title2').val();
        var content = $('#content2').val();
        $.ajax({
            type:'POST',
            headers: {
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
            },
            url:'http://127.0.0.1:8000/editArticle',
            data: {
                id: id,
                title: title,
                content: content,
                author: author
            },
            success: function(data){
                console.log('success');
            },
            error: function(data){
                console.log('error');
            }
        });
    }
    $('#button_add_article').click(function(){
        var title = $('#title');
        var content = $('#content');
        var author = $('#author');
        $.ajax({
            type:'POST',
            headers: {
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
            },
            url:'http://127.0.0.1:8000/addArticle',
            data: {
                title: title.val(),
                content: content.val(),
                author: author.val()
            },
            success: function(data){
                console.log('success');
            },
            error: function(data){
            console.log('error');
            }
        });
    });
    
    $('#button_add_article').click(function(){
        var author = $('#author').val();
        console.log(author);
    });

    $('#button_add_article').click(function(){
        var title = $('#title').val();
        console.log(title);
    });

    $('#button_add_article').click(function(){
        var content = $('#content').val();
        console.log(content);
    });

    $('#input_article_button').click(function(){
        $('#new_article_form').dialog( 'open' ); 
    });
   
    // Модальное окно отправки формы новой статьи!
    $('#new_article_form').dialog({
        autoOpen: false,
        title: 'Добавить статью', 
        buttons: [
            {
                id: 'new_article',
                text: 'Add article',
                click: function(){
                    var title = $('#title1').val();
                    var content = $('#content1');
                    var author = $('#author1');
                    $.ajax({
                        type:'POST',
                        headers: {
                            'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
                        },
                        url:'http://127.0.0.1:8000/addArticle',
                        data: {
                            title: title,
                            content: content.val(),
                            author: author.val()
                        },
                        success: function(data){
                            console.log('success');
                            getArticles();
                            //выкидывает окно INFO
                            $('#new_article_form').dialog( 'close' );
                            $('.span-del').remove();
                            $('#info').append("<span class='span-del' style='color:blue;'>" + data + "</span>");
                            $('#info').dialog('open');
                        },
                        
                        error: function(data){
                            console.log('error');
                        }
                    });
                }
            },
            {
                id: 'cancel_new_article',
                text: 'Cancel',
                click: function(){
                    $('#new_article_form').dialog( 'close' );
                }
            }
        ]
    });

     // Модальное окно для редактирования статьи!
    $('#edit_article_form').dialog({
        autoOpen: false,
        width: 800,
        title: 'Edit article',
         
        buttons: [
            {
                id: 'save_article',
                text: 'Save',
                click: function(data){
                    var id = $('#article_id').val();
                    updateArticle(id);//фун-я которая сохраняет данные на сервак
                    $('#edit_article_form').dialog( 'close' );
                    getArticles();
                }
            },
            {
                id: 'delete_article',
                text: 'Delete',
                click: function(data){
                    var id = $('#article_id').val();
                    delFunc(data, id)//Функция, которая удаляет содерживое модального окна
                    $('#edit_article_form').dialog( 'close' );
                    getArticles();
                }
            },
            {
                id: 'cancel_edit_article',
                text: 'Cancel',
                click: function(){
                    $('#edit_article_form').dialog( 'close' );
                }
            }
        ]
        
    });

    // Декларация функции показать авторов
    //ПЕРЕДЕЛАТЬ!!!!
    
    //Тут нормально продекларирована функция
//Дикларация Диалогового окна: показать всех авторов
$('#author_list').dialog({
    autoOpen: false, 
    height: 600, 
    width: 550,
    buttons: [
        {
            id: 'cancel_author_list',
            text: 'Cancel',
            click: function(){
                $('#author_list').dialog( 'close' );
            }
        }
    ]
});

    function getAuthors(){
        //
        // var id = $(this).data("id");
        // var name = $(this).data("name");
        //
        $.ajax({       
            type: "GET",
            url: 'http://127.0.0.1:8000/getAuthors',
                        
            success: function(data){
                // console.log(data[2]);
                console.log('success');
                $('tr.table').remove();
                data.forEach(function(el)
                    {
                        $('#author_list_tr').append('<tr class="table author_show"><td>' 
                        + el.id + '</td><td><b><a href="#" class = "author_id" data-id = "' + el.id + '">' 
                        + el.name + '</a></b></td></tr>')
                    }
                );
                $('#author_list').dialog( 'open' );
                $(".author_id").on("click",showArticlesAuthor);
    
            },
            error: function(data){
                console.log("error");
                // console.log(data);
             }
        });
    }

    //Декларация функции, которая будет показывать 
    // все статьи которые написал автор, если таких нет то 
    // выскочит окно уведомлений и сообщит что у автора статей пока нет

    function showArticlesAuthor(){
        var id = $(this).data("id");
        $.ajax({
            type:'POST',
            headers: {
                'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
            },
            url:'http://127.0.0.1:8000/getArticlesAuthor',
            data: {
                id: id,
            },
            success: function(data){
                console.log('success');
                // $('#user_id').val(data.id);
                // $('#name').val(data.name);
                // $('#email').val(data.email);
                // // $('#role').val(data.role_id);
                // $('#edit_user_form').dialog('open');// задекларировать форму которая показывает все статьи автора, что он создал
                $('#author_list').dialog('close');//закрывает предыдущее окошко
            },
            error: function(data){
                console.log('error');
            }
        });
    }

    $('#show_authors_button').click(function(){
        getAuthors();
    })
});
    
//Смавпувать

// function showUser(){
//     var id = $(this).data("id");
//     $.ajax({
//         type:'POST',
//         headers: {
//             'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
//         },
//         url:'http://127.0.0.1:8000/getUser',
//         data: {
//             id: id,
//         },
//         success: function(data){
//             console.log('success');
//             $('#user_id').val(data.id);
//             $('#name').val(data.name);
//             $('#email').val(data.email);
//             // $('#role').val(data.role_id);
//             $('#edit_user_form').dialog('open');
//             $('#users_list').dialog('close');
//         },
//         error: function(data){
//             console.log('error');
//         }
//     });
// }

////////// Взаимосвязанные функции...
// function getUsers(){
//     $.ajax({       
//         type: "GET",
//         url: 'http://127.0.0.1:8000/getUsers',
//         success: function(data){
//             console.log(data);
//             // console.log(data[2].email);!!!!!! это чудное сочетание значков дает возможность достучатся ДО обьекта в массиве + к его свойству(в данном случае email)

//             $('.user_tr_del').remove(); //найди таблицу с таким классом и удали ее
//             data.forEach( function(el){
//                 $('#user_list_tr').append('<tr class="user_tr_del"><td>' + el.id + '</td><td><b><a href="#" class = "edit_user" data-id =  "' + el.id + '">' + el.name
//                 + '</a></b></td><td>' + el.email + '</td><td>' + el.role_id + '</td></tr>');
//             });
//             $('#users_list').dialog( 'open' );
//             $(".edit_user").on("click",showUser);
//         },
//         error: function(data){
//             console.log("error");
//             // console.log(data);
//         }
//     });
// }


