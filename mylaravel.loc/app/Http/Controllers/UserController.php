<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\Role;

class UserController extends Controller
{
    public function status(Request $request){
        $user = Auth::user();
        // var_dump($user);
        $user = User::find($user->id);
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
       $id = $request->id;
       $user_del = User::find($id);
       $user_del->delete();// найти в доках и изучить!
       $message = 'user '.$id.' was delete';
       
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
}
