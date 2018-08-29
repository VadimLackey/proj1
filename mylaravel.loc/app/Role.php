<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //Функция связующая таблицу roles с таблицей users
    public function roles()
  {
    return $this->hasMany('App\User');
  }
}
