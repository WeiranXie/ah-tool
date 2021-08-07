<template>
  <div class="font-h w-full h-full overflow-scroll no-scrollbar text-text text-center tablet:text-left">
    <setup />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {
    },
    data: () => ({
    }),
    computed: {
    },
    watch: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    },
  })
</script>

<style scoped>
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
