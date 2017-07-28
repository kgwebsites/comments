<template>
  <div>
    <div class="card-block row justify-content-between p-2" :class="setMarginLeft()">
      <CommentText :name="name" :comment="comment" :created-at="createdAt"></CommentText>
      <ReplyButton :id="id" v-if="replyAction"></ReplyButton>
    </div>
    <CommentReply :id="id" :action="replyAction" v-if="replyAction"></CommentReply>
  </div>
</template>

<script>
    import CommentText from './CommentText.vue';
    import ReplyButton from './ReplyButton.vue';
    import CommentReply from './CommentReply.vue';

    export default {
        props: ['marginLeft', 'id', 'name', 'comment', 'createdAt', 'replyAction'],
        components: {
          CommentText: CommentText,
          ReplyButton: ReplyButton,
          CommentReply: CommentReply
        },
        methods: {
          setMarginLeft() {
            return this.marginLeft != 0 ? "ml-" + this.marginLeft : '';
          }
        }
    }
</script>
