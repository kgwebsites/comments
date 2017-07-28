<template>
  <div class="card-text col col-auto mw-85">
    <span class="font-weight-bold">{{ name }}</span> - {{ comment }} <i class="h6 text-muted"><i class="fa fa-clock-o"></i>&nbsp;{{ createdAt }}</i>
  </div>
</template>

<script>
    export default {
        props: ['name', 'comment', 'createdAt']
    }
</script>
