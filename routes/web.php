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

Route::get('/', 'PageControllers@welcome')->name('welcome');

Route::post('/post-comment', 'PageControllers@postComment')->name('post-comment');

Route::post('/post-reply', 'PageControllers@postReply')->name('post-reply');
