<!-- +=====================================================================+
| INVESTIGATORS                                                            |
+======================================================================+ -->
<template>
  <div id="screen-investigators" :class="[ active ? 'z-2' : 'hidden', 'left-0 absolute w-full h-full top-0']">
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
        <div class="flex w-8 h-8 rounded bg-bg bg-opacity-60" @click="number--" v-html="'<p class=&#34;self-center w-full text-center font-ca text-lg&#34;>-</p>'" />
        <div class="py-1.5 px-6 h-8 mx-2 rounded text-base bg-bg bg-opacity-60 text-center" @click="randomInvestigators(number)" v-html="$t('misc.choose_random')" />
        <div class="flex w-8 h-8 rounded bg-bg bg-opacity-60" @click="number++" v-html="'<p class=&#34;self-center w-full text-center font-ca text-lg&#34;>+</p>'" />
      </div>
    </transition>

    <!-- Current Investigators -->
    <div :class="[locked ? 'mt-1': 'mt-12', 'transition-all text-left duration-300 px-2 font-c tracking-tighter max-h-screen overflow-scroll no-scrollbar h-full']">
      <div class="text-center mt-3 mb-1">
        {{ $t('misc.num_gators') }}: {{ number }}
      </div>
      <div class="pb-44">
        <div v-for="(i, index) in investigators.current" :key="index">
          <div :class="[rolling_ongoing ? '-top-2 opacity-0' : `transition-all top-0 opacity-100 delay-${index * 50}`, 'group ease-in-out relative flex mt-1 py-1']">
            <div class="w-14 h-14 self-center relative mr-3 flex-shrink-0">
              <img class="w-14 h-14" :src="require(`@/assets/investigators/frame.pn${path}`).default">
              <img class="w-12 h-12 absolute top-1/2 absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2" :src="require(`@/assets/investigators/${i.image}`).default">
            </div>
            <div class="flex flex-col w-44 flex-shrink-0 self-center flex-grow">
              <p class="text-lg -mb-1" v-html="i.name" />
              <div class="text-sm">
                <img class="inline-block -mt-1 w-4 h-auto" :src="require(`@/assets/investigators/Sanity.pn${path}`).default">
                <p class="inline-block mx-1.5" v-html="i.max_stats[0]" />
                <img class="inline-block -mt-0.5 w-3.5 h-auto" :src="require(`@/assets/investigators/Stamina.pn${path}`).default">
                <p class="inline-block mx-1.5" v-html="i.max_stats[1]" />
              </div>
            </div>
            <div class="text-left absolute pointer-events-none opacity-0 z-10 top-0 group-hover:opacity-100 transition shadow-md bg-white py-1.5 px-2 mt-0.5 ml-16 self-center">
              <p
                v-for="(a, $ind) in i.abilities"
                :key="$ind"
                class="text-base"
                v-html="$t(`investigators.${i.abilities[$ind]}`)"
              />
            </div>
            <div v-if="locked" class="flex ml-3 flex-shrink-0">
              <div class="my-3 self-center pt-1.5 rounded pb-1 px-3 bg-opacity-40 bg-white" @click="updateDevoured(i, index)" v-html="$t('misc.devoured')" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back / Continue -->
    <div class="fixed w-full bottom-0 mt-5 flex flex-col mt-4 bg-bg">
      <div class="flex w-full">
        <div class="w-full text-center bg-black bg-opacity-10 text-black px-4 py-2" @click="toScreen('exps')" v-html="$t('misc.back')" />
        <div
          v-if="!locked"
          class="w-full text-center bg-bg bg-opacity-40 text-black px-4 py-2"
          @click="lockInvestigators()"
          v-html="$t('misc.continue')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Investigator } from '@/types'
  import { $setup, $screen, Screen, Setup } from '@/init/state'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Investigators',
    emits: [ 'back', 'investigators' ],
    data: () => ({
      path: 'g',
      saved: null,
      number: 6,
      sliding_status: '',
      random_index: [] as number[],
      locked: false,
      rolling_ongoing: false,
      investigators: {
        all: [] as Investigator[],
        current: [] as Investigator[],
        devoured: [] as Investigator[],
        left: [] as Investigator[],
      },
    }),
    computed: {
      setup(): Setup {
        return $setup.value
      },
      active() {
        return $screen.value === 'investigators'
      },
    },
    watch: {
      /* ========================================================================== *
      * Get available investigators after exp selected                              *
      * -------------------------------------------------------------------------- */
      setup: {
        handler(v: Setup) {
          const exp = v.exp
          if (exp && exp.length) this.investigators = $setup.value.investigators

          // If game is restarted, unlock
          if (!v.exp.length) this.locked = false
        },
        deep: true,
      },

      /* ========================================================================== *
      * Min 1 player, max 10 players                                                *
      * -------------------------------------------------------------------------- */
      number(v) {
        this.number = v < 1 ? 1 : v > 10 ? 10 : v
      },

      /* ========================================================================== *
      * When investigators changes, push to store                                   *
      * -------------------------------------------------------------------------- */
      investigators: {
        handler() {
          const setup = Object.assign({}, this.setup) || null
          if (setup) {
            setup.investigators = this.investigators
            $setup.value = setup
          }
        },
        deep: true,
      },
    },
    methods: {
      /* --------------------------------------------------------------------------- *
      * SLIDING ANIMATION                                                            *
      * --------------------------------------------------------------------------- */
      slidingStatus(v: boolean) {
        return v
      },

      /* --------------------------------------------------------------------------- *
      * Randomly select investigators                                                *
      * --------------------------------------------------------------------------- */
      randomInvestigators(num: number) {
        this.rolling_ongoing = true
        this.investigators.current = []
        this.investigators.left = []
        this.random_index = []
        while (this.random_index.length < num) {
          const r = Math.floor(Math.random() * this.investigators.all.length)
          if (this.random_index.indexOf(r) === -1) {
            this.random_index.push(r)
            this.investigators.current.push(this.investigators.all[r])
          }
        }
        this.investigators.all.map((i, index) => {
          if (!this.random_index.includes(index)) this.investigators.left.push(i)
        })
        setTimeout(() => {
          this.rolling_ongoing = false
        }, 50)
      },

      /* --------------------------------------------------------------------------- *
      * Investigator devoured, remove from pool and randomly select a new one        *
      * --------------------------------------------------------------------------- */
      updateDevoured(i: Investigator, index: number) {
        if (this.investigators.left.length) {
          this.investigators.devoured.push(i)
          const r = Math.floor(Math.random() * this.investigators.left.length)
          this.investigators.current[index] = Object.assign({}, this.investigators.left[r])
          this.investigators.left.splice(r, 1)
          this.$emit('investigators', this.investigators)
        }
      },

      /* --------------------------------------------------------------------------- *
      * Lock selections and continue                                                 *
      * --------------------------------------------------------------------------- */
      lockInvestigators() {
        this.locked = true
        $screen.value = 'aos'
      },

      toScreen(s: Screen) {
        $screen.value = s
      },
    },
  })
</script>
