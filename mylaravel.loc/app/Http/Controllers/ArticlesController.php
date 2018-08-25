<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Article;

class ArticlesController extends Controller
{
    public function getArticles(){
        $articles = Article::all();

        return $articles;
    }

    public function addArticle(Request $request){

        $input = $request->except('_token');
         $article = new Article();
         $article->fill($input);
         if ($article->save()) {
            $message = "Событие Сохранено!";

             return $message;
         }
    }
//Принимает данные с фронта и удаляет статью с полученым айдишником.
    public function delArticle(Request $request){
        //$request - это все что продается с фронтенда (это date из js)
       $id = $request->id;
       $article_del = Article::find($id);
       $article_del->delete();// найти в доках и изучить!
       $message = 'article '.$id.' was delete';

       return $message;
    }

    public function getArticle(Request $request){
        $id = $request->id;
        $article = Article::find($id);

        return $article;
    }

    public function editArticle(Request $request){
        $id = $request->id;
        $input = $request->except('_token');
        // var_dump($input);
        $article = Article::find($id);
        $article->fill($input);
        if($article->update()){
            $message  = 'Seve sucssesfull'; 

            return $message;      
        } else {
            $message  = 'seve error'; 

            return $message;      
        }
        
    }

    
}
