<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Role;
use DB;
class User extends Authenticatable //Модель
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    // функция которая связывает таблицу user c таблицей roles
    //Почитать про методы)))
    public function role(){
        return $this->belongsTo('App\Role');
    }

    public function articles(){/// ЭТО АРХИВАЖНО ПИСАТЬ ВО МНОЖЕСТВЕННОМ ЧИСЛЕ!! (это если hasMany)
        return $this->hasMany('App\Article');
    }
}
