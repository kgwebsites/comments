require('./bootstrap');
require('../../../node_modules/jquery/dist/jquery.min.js');

window.Vue = require('vue');

Vue.component('comment', require('./components/Comment.vue'));

const app = new Vue({
    el: '#app'
});


//Comment Form Ajax
$(document).on('submit', '#post-comment', function(e) {
  //Stop Form Default Submission
  e.preventDefault();
  //Start Loading Animation
  $('#loader').fadeToggle();
  //Get post data
  var url = $(this).attr('action');
  var CSRF_TOKEN = $('meta[name=csrf-token]').attr('content');
  var name = $('input[name=post-comment-name]').val();
  var comment = $('textarea[name=post-comment-comment]').val();
  $.ajax({
    type: "POST",
    url: url,
    data: {_token: CSRF_TOKEN, name: name, comment: comment},
    dataType: 'JSON',
    success: function (data) {
      //Stop Loading Animation
      $('#loader').fadeToggle();

      //Clear comment fields
      $('input[name=post-comment-name]').val('');
      $('textarea[name=post-comment-comment]').val('');

      //Append comment to the end
      $('#comments').append(`
        <div id="comment-` + data.id + `" class="card mb-3">
          <div class="card-block row justify-content-between p-2">
            <div class="card-text col col-auto mw-85">
              <span class="font-weight-bold">` + data.name + `</span> - ` + data.comment + ` <i class="h6 text-muted"><i class="fa fa-clock-o"></i>&nbsp;` + data.created_at + `</i>
            </div>
            <i role="button" class="col col-auto fa fa-reply text-muted" data-toggle="collapse" data-target="#reply-` + data.id + `" aria-expanded="false" aria-controls="reply-` + data.id + `"></i>
          </div>
          <div class="collapse" id="reply-` + data.id + `">
            <form id="reply-comment-` + data.id + `" value="` + data.id + `" class="reply-comment card rounded-0 border-bottom-0 border-left-0 border-right-0" action="/post-reply" method="post">
              <div class="card-block">
                <h4 class="card-title">Reply</h4>
                <div class="col">
                  <div class="row justify-content-between">
                    <input id="post-reply-name-` + data.id + `" name="post-reply-name" type="text" class="form-control col-3 rounded-0" id="name" placeholder="Name">
                    <textarea id="post-reply-comment-` + data.id + `" name="post-reply-comment" class="form-control col rounded-0" id="comment" rows="1" placeholder="Comment"></textarea>
                    <button type="submit" class="btn btn-primary rounded-0">Submit</button>
                  </div>
                </div>
                <div id="post-comment-error-` + data.id + `" class="text-danger card-text" style="display:none;"></div>
              </div>
            </form>
          </div>
          <div id="replies-` + data.id + `"></div>
        </div>
      `);
    },
    error: function (data) {
      //Stop Loading Animation
      $('#loader').fadeToggle();
      //Clear comment fields
      $('input[name=post-comment-name]').val('');
      $('input[name=post-comment-comment]').val('');

      $('#post-comment-error').html('Something went wrong, contact support for help!').fadeIn();
    }
  });
});

//Reply Form Ajax
$(document).on('submit', '.reply-comment', function(e) {
  //Stop Form Default Submission
  e.preventDefault();
  //Start Loading Animation
  $('#loader').fadeToggle();
  //Get post data
  var url = $(this).attr('action');
  var CSRF_TOKEN = $('meta[name=csrf-token]').attr('content');
  var id = $(this).attr('value');
  var name = $('#post-reply-name-' + id).val();
  var comment = $('#post-reply-comment-' + id).val();

  $.ajax({
    type: "POST",
    url: url,
    data: {_token: CSRF_TOKEN, name: name, comment: comment, parent: id},
    dataType: 'JSON',
    success: function (data) {
      //Stop Loading Animation
      $('#loader').fadeToggle();

      //Clear reply fields
      $('#post-reply-name-' + data.parent).val('');
      $('#post-reply-comment-' + data.parent).val('');

      //Collapse reply form
      $('#reply-' + data.parent).attr('aria-expanded', 'false').removeClass('show');

      //Append reply to parent comment
      $('#replies-' + data.parent).append(`
        <div id="comment-` + data.id + `" class="card rounded-0 border-bottom-0 border-left-0 border-right-0">
          <div class="card-block row justify-content-between ml-3 p-2">
            <div class="card-text col col-auto mw-85"><span class="font-weight-bold">` + data.name + `</span> - ` + data.comment + ` <i class="h6 text-muted"><i class="fa fa-clock-o"></i>&nbsp;` + data.created_at + `</i></div>
            <i role="button" class="col col-auto fa fa-reply text-muted" data-toggle="collapse" data-target="#reply-` + data.id + `" aria-expanded="false" aria-controls="reply-` + data.id + `"></i>
          </div>
          <div class="collapse" id="reply-` + data.id + `">
            <form id="reply-comment-` + data.id + `" value="` + data.id + `" class="reply-sub-comment card rounded-0 border-bottom-0 border-left-0 border-right-0" action="/post-reply" method="post">
              <div class="card-block">
                <h4 class="card-title">Reply</h4>
                <div class="col">
                  <div class="row justify-content-between">
                    <input id="post-reply-name-` + data.id + `" name="post-reply-name" type="text" class="form-control col-3 rounded-0" id="name" placeholder="Name">
                    <textarea id="post-reply-comment-` + data.id + `" name="post-reply-comment" class="form-control col rounded-0" id="comment" rows="1" placeholder="Comment"></textarea>
                    <button type="submit" class="btn btn-primary rounded-0">Submit</button>
                  </div>
                </div>
                <div id="post-comment-error-` + data.id + `" class="text-danger card-text" style="display:none;"></div>
              </div>
            </form>
          </div>
          <div id="replies-` + data.id + `"></div>
        </div>
      `);
    },
    error: function (data) {
      //Stop Loading Animation
      $('#loader').fadeToggle();

      //Clear reply fields
      $('#post-reply-name-' + id).val('');
      $('#post-reply-comment-' + id).val('');

      $('#post-reply-error-' + id).html('Something went wrong, contact support for help!').fadeIn();
    }
  });
});

//Sub-Reply Form Ajax
$(document).on('submit', '.reply-sub-comment', function(e) {
  //Stop Form Default Submission
  e.preventDefault();
  //Start Loading Animation
  $('#loader').fadeToggle();
  //Get post data
  var url = $(this).attr('action');
  var CSRF_TOKEN = $('meta[name=csrf-token]').attr('content');
  var id = $(this).attr('value');
  var name = $('#post-reply-name-' + id).val();
  var comment = $('#post-reply-comment-' + id).val();

  $.ajax({
    type: "POST",
    url: url,
    data: {_token: CSRF_TOKEN, name: name, comment: comment, parent: id},
    dataType: 'JSON',
    success: function (data) {
      //Stop Loading Animation
      $('#loader').fadeToggle();

      //Clear reply fields
      $('#post-reply-name-' + data.parent).val('');
      $('#post-reply-comment-' + data.parent).val('');

      //Collapse reply form
      $('#reply-' + data.parent).attr('aria-expanded', 'false').removeClass('show');

      //Append reply to parent comment
      $('#replies-' + data.parent).append(`
        <div id="comment-` + data.id + `" class="card rounded-0 border-bottom-0 border-left-0 border-right-0">
          <div class="card-block row justify-content-between ml-5 p-2">
            <div class="card-text col col-auto mw-85"><span class="font-weight-bold">` + data.name + `</span> - ` + data.comment + ` <i class="h6 text-muted"><i class="fa fa-clock-o"></i>&nbsp;` + data.created_at + `</i></div>
          </div>
        </div>
      `);
    },
    error: function (data) {
      //Stop Loading Animation
      $('#loader').fadeToggle();

      //Clear reply fields
      $('#post-reply-name-' + id).val('');
      $('#post-reply-comment-' + id).val('');

      $('#post-reply-error-' + id).html('Something went wrong, contact support for help!').fadeIn();
    }
  });
});
