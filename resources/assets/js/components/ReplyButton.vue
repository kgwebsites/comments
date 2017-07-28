<template>
    <i role="button" class="col col-auto fa fa-reply text-muted" data-toggle="collapse" :data-target="replyId()" aria-expanded="false" :aria-controls="replyId()"></i>
</template>

<script>
    export default {
        props: ['id'],
        methods: {
          replyId() {
            return '#reply-' + this.id;
          }
        }
    }
</script>
