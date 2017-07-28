<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PageControllers extends Controller
{
  /*
  |--------------------------------------------------------------------------
  | Page Controllers
  |--------------------------------------------------------------------------
  |
  | This controller is responsible for handling all page request as
  | well as post requests.
  |
  */

  /*
   * Welcome Page
   * Retrieves all the comments in the DB upon load
  */
  public function welcome()
  {
    $comments = DB::table('comments')->get();

    return view('welcome', ['comments' => $comments]);
  }

  /*
   * New Comment Post
   * Inserts comments into the DB and returns the attributes
  */
  public function postComment(Request $request)
  {
    $name = $request->input('name');
    $comment = $request->input('comment');

    $id = DB::table('comments')->insertGetId(['name' => $name, 'comment' => $comment]);
    $created_at = Carbon::parse(DB::table('comments')->where('id', $id)->first()->created_at)->format('M d g:i A');

    return ['id' => $id, 'name' => $name, 'comment' => $comment, 'created_at' => $created_at];
  }

  /**
   * New Comment Reply
   * Inserts comment replies into the DB and returns the attributes
  */
  public function postReply(Request $request)
  {
    $name = $request->input('name');
    $comment = $request->input('comment');
    $parent = $request->input('parent');

    $id = DB::table('comments')->insertGetId(['name' => $name, 'comment' => $comment, 'parent' => $parent]);
    $created_at = Carbon::parse(DB::table('comments')->where('id', $id)->first()->created_at)->format('M d g:i A');

    return ['id' => $id, 'name' => $name, 'comment' => $comment, 'parent' => $parent, 'created_at' => $created_at];
  }
}
