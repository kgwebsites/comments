<template>
  <div class="collapse" :id="formId()">
  <form :id="formId()" :value="id" class="reply-comment card rounded-0 border-bottom-0 border-left-0 border-right-0" :action="action" method="post">
    <div class="card-block">
      <h4 class="card-title">Reply</h4>
      <div class="col">
        <div class="row justify-content-between">
          <input :id="postReplyName()" name="post-reply-name" type="text" class="form-control col-3 rounded-0" placeholder="Name" required>
          <textarea :id="postReplyComment()" name="post-reply-comment" class="form-control col rounded-0" rows="1" placeholder="Comment" required></textarea>
          <button type="submit" class="btn btn-primary rounded-0">Submit</button>
        </div>
      </div>
      <div :id="postCommentError()" class="text-danger card-text" style="display:none;"></div>
    </div>
  </form>
  </div>
</template>

<script>
    export default {
        props: ['id', 'action'],
        methods: {
          formId() {
            return 'reply-' + this.id;
          },
          postReplyName() {
            return 'post-reply-name-' + this.id;
          },
          postReplyComment() {
            return 'post-reply-comment-' + this.id;
          },
          postCommentError() {
            return 'post-comment-error-' + this.id;
          }
        }
    }
</script>
