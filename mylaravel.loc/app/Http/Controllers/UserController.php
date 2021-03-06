<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Article; //Действует пространство имен контроллера статей
use App\User;
use App\Role;

class UserController extends Controller
{
    public function status(Request $request){
        $user = Auth::user();
        // var_dump($user);
        $user = User::find($user->id);-
        $user_role = $user->role_id;
        $user_name = $user->name;
        $user_status = false;
        $role_name = $user->role->name;
        if ($user){
            $user_status = true;
        }
        //То что отправляется на клиент
        $data = [
            'role'=>$user_role,
            'name'=>$user_name,
            'status'=>$user_status,
            'role_name'=>$role_name
        ];

        return $data;
    }

    public function getUsers(){
        $users = User::all();

        return $users;
    }

    //удаляет юзера с нужным айдишником
    public function delUser(Request $request){
        //$request - это все что продается с фронтенда (это date из js)
        $user = Auth::user();
        $role = $user->role_id;
        // var_dump($role);
        // die();
        if($role == 1){
            $id = $request->id;
            $user_del = User::find($id);
            $user_del->delete();// найти в доках и изучить!
            $message = 'user '.$id.' was delete';
        }else{
            $message = 'Вы не admin!';
        }
       
       return $message;
    }

    public function getUser(Request $request){
        $id = $request->id;
        $user = User::find($id);

        return $user;
    }


    public function editUser(Request $request){
        $id = $request->id;
        $input = $request->except('_token');
        $name = $request->name;
        // var_dump($input);
        $user = User::find($id);
        $user->fill($input);
        //операция обновления данных!
        if($user->update()){
            $message  = 'Save successfull';
            $message1 = 'user: '.$id.' name: '.$name.' was change';

            return $message1;//$message; 
            
        } else {
            $message  = /*'seve error'*/'does not change'; 

            return $message;      
        }
        
    }
    public function test(){

        $user = Auth::user();
        $user = User::find($user->id);
        $user_role = $user->role->name;
        $user_role_id = $user->role_id;
        if($user_role_id == 1){
            echo 'Привет admin';
        }else{
            echo 'Вы не admin, Вы '.$user_role;      
        }
        // var_dump($user_role_id);
    }

    // функция, принимающая с фронтенда данные с ф-и showAuthors
    function getAuthors()
    {
        //Работа с массивами!
        $users = User::all();
        //Знать как "Отче наш"
        $users_arr = [];
        $i = 0;
        foreach($users as $user){
            // $users_arr[$user['id']] = $user['name'];
            $users_arr [$i] = [ 'id' => $user['id'], 'name' => $user['name']];
            $i++;
        }

        return $users_arr;
    }
    //Функция. которая находит статьи юзера и возвращает эти статьи в массиве
    public function getArticlesAuthor(Request $request)
    {
        $id = $request->id;
        $user = User::find($id);
        $articles = $user->articles;
            
        return $articles;
    }
}
