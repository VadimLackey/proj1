$(document).ready(function() {
    // console.log("Hello");
    // это ажакс запрос:
    $.ajax({       
        type: "GET",
        url: 'http://127.0.0.1:8000/getArticles',
        success: function(data){
          
            // $('tr.del').remove();

            data.forEach( function(el){
                $('#articles_list').append(
                '<div class="card" style="width: 50rem;"><div class="card-body">'+
                '<img src="http://127.0.0.1:8000' + el.img + '">' +
                '<h5 class="card-title">' + el.title + '</h5>'+
                '<p class="card-text">' + el.content + '</p>'+
                '<a class="card-link">' + el.author + '<br></a>'+
                '<a href="https://ru.wikipedia.org/wiki/Lorem_ipsum" class="card-link">Another</a></div></div>')
            });
            console.log("success");
            console.log(data);
            console.log(data[0]["author"]);

        },
        error: function(data){
            console.log("error");
            console.log(data);
        }
    });

    $('#input_article_button').click(function(){
        $('#input_article').dialog('open');
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
});