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
                '<div class="card" style="width: 20rem;"><div class="card-body">'+
                '<h5 class="card-title">' + el.title + '</h5>'+
                '<p class="card-text">' + el.content + '</p>'+
                '<a class="card-link">' + el.author + '<br></a>'+
                '<a href="#" class="card-link">Another</a></div></div>')
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