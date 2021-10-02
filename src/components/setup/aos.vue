<template>
  <div id="screen-aos" :class="[ active ? 'z-2' : 'hidden', 'left-0 absolute w-full h-screen top-0']">
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
        {{ ao.name }}
      </div>
    </div>


    <!-- Back / Continue -->
    <div class="fixed w-full bottom-0 mt-5 flex flex-col mt-4 bg-bg">
      <div class="flex w-full">
        <div class="w-full text-center bg-black bg-opacity-10 text-black px-4 py-2" @click="toScreen('exps')" v-html="$t('misc.back')" />
        <div class="w-full text-center bg-bg bg-opacity-40 text-black px-4 py-2" @click="lockAOs()" v-html="$t('misc.continue')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { $screen, $setup, Screen } from '@/init/state'
  import { defineComponent } from 'vue'
  import { AO } from '@/types'
  const ao_temp = {
    name: '',
    doomTrack: 0,
    expansion: 'AKH',
  } as AO

  export default defineComponent({
    name: 'AOs',
    data: () => ({
      locked: false,
      all_aos: [] as AO[],
      ao: ao_temp,
      rolling_ongoing: false,
    }),
    computed: {
      setup() {
        return $setup.value
      },
      active() {
        return $screen.value === 'aos'
      },
    },
    watch: {
      /* ========================================================================== *
      * Get available AOs after exp selected                                        *
      * -------------------------------------------------------------------------- */
      setup: {
        handler(v) {
          const exp = v.exp
          if (exp && exp.length) this.all_aos = $setup.value.aos.all
        },
        deep: true,
      },
    },
    created() {
      console.log(this.all_aos)
    },
    methods: {
      randomAO() {
        this.rolling_ongoing = true
        this.ao = ao_temp
        const r = Math.floor(Math.random() * this.all_aos.length)
        this.ao = this.all_aos[r]
        setTimeout(() => {
          this.rolling_ongoing = false
        }, 50)
      },
      /* --------------------------------------------------------------------------- *
      * Lock selections and continue                                                 *
      * --------------------------------------------------------------------------- */
      lockAOs() {
        this.locked = true
      },

      toScreen(s: Screen) {
        $screen.value = s
      },
    },
  })
</script>
