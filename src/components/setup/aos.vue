<template>
  <div id="screen-aos" :class="[ 'left-0 absolute w-full h-screen top-0']">
    <!-- Header -->
    <transition
      data
      enterActiveClass="transition-opacity duration-150 ease-linear"
      enterFromClass="opacity-0"
      enterToClass="opacity-100"
      leaveActiveClass="transition-opacity duration-150 ease-linear"
      leaveFromClass="opacity-100"
      leaveToClass="opacity-0"
    >
      <div v-show="!locked" class="flex w-full bg-black bg-opacity-10 fixed px-2 justify-between py-2 z-10 font-c tracking-tighter">
        <div class="py-1.5 px-6 h-8 mx-2 rounded text-base bg-bg bg-opacity-60 text-center" @click="randomAO()" v-html="$t('misc.choose_random')" />
      </div>
    </transition>

    <!-- Current Investigators -->
    <div :class="[locked ? 'mt-4': 'mt-16', 'transition-all duration-300 px-2 font-c tracking-tighter mb-16 overflow-scroll h-full']">
      <div>
        <div :class="[`transition-all top-0 opacity-100 delay-${50}`, 'ease-in-out relative flex mt-1 py-1']">
          <div class="relative mr-3">
            <img class="w-14 h-14" src="@/assets/investigators/frame.png">
            <img class="w-12 h-12 absolute top-1/2 -z-1 absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2">
          </div>
          <div v-if="locked" class="flex">
            <div class="my-3 self-center pt-1.5 rounded pb-1 px-3 bg-opacity-40 bg-white" @click="updateDevoured(i, index)" v-html="$t('misc.devoured')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Back / Continue -->
    <div class="fixed w-full max-w-xl bottom-0 mt-5 flex flex-col mt-4">
      <div class="flex w-full">
        <div class="w-full text-center bg-black bg-opacity-10 text-black px-4 pt-2 pb-3" @click="$emit('back', true)" v-html="$t('misc.back')" />
        <div class="w-full text-center bg-bg bg-opacity-40 text-black px-4 pt-2 pb-3" @click="lockAOs()" v-html="$t('misc.continue')" />
      </div>
    </div>
    <div class="text-center max-w-xl w-full pt-4 py-16 flex flex-col">
      <img class="fixed -z-2 max-w-xl w-full h-full top-0" src="@/assets/cards/mythos-front.jpg">
    </div>
  </div>
</template>

<script lang="ts">
  import { setupStore } from '@/stores/setup'
  import { screenStore } from '@/stores/screen'
  import { defineComponent } from 'vue'
  import { AO } from '@/types'
  const ao_temp = {
    name: '',
    doomTrack: 0,
    expansion: '',
  } as AO

  export default defineComponent({
    name: 'AOs',
    data: () => ({
      locked: false,
      aos: [] as AO[],
      ao: ao_temp,
    }),
    watch: {
    },
    created() {
      /* ========================================================================== *
      * Get available investigators after exp selected                              *
      * -------------------------------------------------------------------------- */
      const self = this
      setInterval(function() {
        if (setupStore.getState().setup) self.aos = setupStore.getState().setup.aos
      }, 50)
    },
    methods: {
      randomAO() {

      },
    },
  })
</script>
