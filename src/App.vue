<template>
  <div class="font-h w-full h-full overflow-scroll no-scrollbar text-text text-center tablet:text-left">
    <setup v-if="screen === 'ahtool'" />
    <playerchart v-if="screen === 'playerchart'" />
    <div v-if="main_menu" class="fixed top-0 z-10 flex text-center bg-bg w-full h-full">
      <div class="self-center w-full flex flex-col">
        <div class="self-center border-black border py-3 my-2 w-64 rounded" @click="toScreen('ahtool')" v-html="'Arkham Horror Tool (WIP)'" />
        <div class="self-center border-black border py-3 my-2 w-64 rounded" @click="toScreen('playerchart')" v-html="'调查员表'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {
    },
    data: () => ({
      main_menu: true,
      screen: '',
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
      toScreen(s: string) {
        this.screen = s
        this.main_menu = false
      },
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
