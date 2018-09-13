<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/addArticle', //Прочесть в документации! Для чего нужен этот файл и зачем эти исключения!!!
        // '/delArticle', //включен токен 
        // '/getArticle',
        '/editArticle',
        'getUserArticles{id}'   
    ];

}
