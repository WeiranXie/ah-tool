<template>
  <aos />
  <investigators />
  <exps />
  <img class="fixed -z-2 w-full h-full top-0" :src="require(`@/assets/secbg.jp${path}`).default">
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Setup',
    props: {
    },
    data: () => ({
      path: 'g',
      foo: 'bar',
    }),
    computed: {
    },
    created() {
      // console.log(require('./assets'))
    },
    methods: {
    },
  })
</script>

