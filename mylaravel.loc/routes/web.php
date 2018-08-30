<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    return view('welcome');
});

Route::get('page', 'IndexController@index');

Route::get('/getArticles', ['uses' => 'ArticlesController@getArticles', 'as' => 'getArticles']);

Route::post('/addArticle', ['uses' => 'ArticlesController@addArticle', 'as' => 'addArticle']);

Route::post('/delArticle', ['uses' => 'ArticlesController@delArticle', 'as' => 'delArticle']); 

Route::post('/getArticle', ['uses' => 'ArticlesController@getArticle', 'as' => 'getArticle']);

Route::post('/editArticle', ['uses' => 'ArticlesController@editArticle', 'as' => 'editArticle']);

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::get('/status', ['uses' => 'UserController@status']);

// Route::get('/logout', ['uses' => 'UserController@logout']);

Route::get('/getUsers', ['uses' => 'UserController@getUsers']);

//Експеременто....

Route::post('/getUser', ['uses' => 'UserController@getUser']);

Route::post('/editUser', ['uses' => 'UserController@editUser']);

Route::post('/delUser', ['uses' => 'UserController@delUser']); 

//роут выводящий на стартовую страницу проверку юзера

Route::get('/testUser', 'UserController@test')->name('home');

