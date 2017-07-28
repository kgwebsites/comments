@extends('layouts.app')
@section('content')
  <div id="app" class="container-fluid">

    <div class="row text-center justify-content-center">
      <div class="col-6">
        <h2>{{ env('APP_NAME') }}</h2>
        <h3>Code Challenge | Nested Comments</h3>
        <hr>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card">
          <img class="card-img-top" src="https://unsplash.it/300/200" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">Goodbye Adobe Flash</h4>
            <p class="card-text">Adobe today announced that Flash, the once-ubiquitous plugin that allowed you to play your first Justin Bieber video on YouTube and Dolphin Olympics 2 on Kongregate, will be phased out by the end of 2020. At that point, Adobe will stop updating and distributing Flash. Until then, Adobe will still partner with the likes of Apple, Mozilla, Microsoft and Google to offer security updates for Flash in their browsers and support new versions of them, but beyond that, Adobe will not offer any new Flash features.</p>
            <hr>
            <h5 class="card-subtitle text-muted font-weight-bold">Comments</h5>
            <hr>
            <div id="comments">

              @foreach($comments as $comment)
                @if($comment->parent == null)
                  <div id="comment-{{ $comment->id }}" class="card mb-3">
                    <Comment
                      margin-left="0"
                      id="{{ $comment->id }}"
                      name="{{ $comment->name }}"
                      comment="{{ $comment->comment }}"
                      created-at="{{ Carbon\Carbon::parse($comment->created_at)->format('M d g:i A') }}"
                      reply-action="{{ route('post-reply') }}">
                    </Comment>
                    <div id="replies-{{ $comment->id }}">
                      @foreach($comments as $commentNestOne)
                        @if($commentNestOne->parent == $comment->id)
                          <div id="comment-{{ $commentNestOne->id }}" class="card rounded-0 border-bottom-0 border-left-0 border-right-0">
                            <Comment
                              margin-left="3"
                              id="{{ $commentNestOne->id }}"
                              name="{{ $commentNestOne->name }}"
                              comment="{{ $commentNestOne->comment }}"
                              created-at="{{ Carbon\Carbon::parse($commentNestOne->created_at)->format('M d g:i A') }}"
                              reply-action="{{ route('post-reply') }}">
                            </Comment>

                            <div id="replies-{{ $commentNestOne->id }}">
                              @foreach($comments as $commentNestTwo)
                                @if($commentNestTwo->parent == $commentNestOne->id)
                                  <div id="comment-{{ $commentNestTwo->id }}" class="card rounded-0 border-bottom-0 border-left-0 border-right-0">
                                    <Comment
                                      margin-left="5"
                                      id="{{ $commentNestTwo->id }}"
                                      name="{{ $commentNestTwo->name }}"
                                      comment="{{ $commentNestTwo->comment }}"
                                      created-at="{{ Carbon\Carbon::parse($commentNestTwo->created_at)->format('M d g:i A') }}">
                                    </Comment>
                                  </div>
                                @endif
                              @endforeach
                            </div>
                          </div>
                        @endif
                      @endforeach
                    </div>
                  </div>
                @endif
              @endforeach
            </div>


            <form id="post-comment" class="card" action="{{ route('post-comment') }}" method="post">
              <div class="card-block">
                <h4 class="card-title">Leave a comment</h4>
                <div class="col">
                  <div class="row justify-content-between">
                    <input name="post-comment-name" type="text" class="form-control col-3 rounded-0" id="name" placeholder="Name" required>
                    <textarea name="post-comment-comment" class="form-control col rounded-0" id="comment" rows="1" placeholder="Comment" required></textarea>
                    <button type="submit" class="btn btn-primary rounded-0">Submit</button>
                  </div>
                </div>
                <div id="post-comment-error" class="text-danger card-text" style="display:none;"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

@endsection
