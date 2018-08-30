<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\User;
use DB;

class Role extends Model
{
    //Функция связующая таблицу roles с таблицей users
    public function user()
  {
    return $this->hasMany('App\User', 'id');
  }
}
