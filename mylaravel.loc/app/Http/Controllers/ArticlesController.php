<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Article;
use Auth;
use App\User;
use App\Role;

class ArticlesController extends Controller
{
    public function getArticles(){
        $articles = Article::all();
        foreach($articles as $article){
            if($article->author == NULL){
                $article->author = 'Default author!';
            }
        }
        return $articles;
    }

    public function addArticle(Request $request){

        $input = $request->except('_token');
        $article = new Article();
        $user = Auth::user();
        $article->fill($input);
        $article->author = $user->name;
        if ($article->save()) {
            $message = "New article was created!";

            return $message;
        }
    }
//Принимает данные с фронта и удаляет статью с полученым айдишником.
    public function delArticle(Request $request){
       $user = Auth::user();
       $user = User::find($user->id);
       $user_role = $user->role_id;
       if($user_role == 1){
            $id = $request->id;
            $article_del = Article::find($id);
            $article_del->delete();// найти в доках и изучить!
            $message = 'article '.$id.' was delete';

            return $message;
        }else{
            $message = 'У Вас нет прав для удаления';

            return $message;
        }
        
            
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
    
    public function getUserArticles(Request $request){
        $id = $request->id;
        $user = User::find($id);
        $articles = $user->articles;
        
        return $articles;
    }
}
