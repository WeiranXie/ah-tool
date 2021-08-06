<template>
  <div :class="[ active ? 'z-2' : 'hidden', 'flex flex-col bg-bg']">
    <div class="flex text-center flex-row flex-wrap">
      <div
        v-for="(e, index) in exps"
        :key="index"
        class="flex flex-1/2 max-w-1/2 flex-col tablet:flex-1/3 border border-collapse"
      >
        <label :for="e.id" :class="[!selected_exp.includes(e.id) ? 'opacity-20' : '', 'bg-black text-bg w-full py-3 px-4 checked-sibling:bg-bg checked-sibling:text-black']">
          <img class="h-36 my-3 mx-auto" :src="require(`@/assets/exps/${e.id}.jpg`).default">
          <input
            :id="e.id"
            v-model="selected_exp"
            type="checkbox"
            name="some-radios"
            :value="e.id"
            :disabled="e.id === 'AKH' || locked"
            class="hidden"
          >
          {{ $t(`exp.${e.id}`) }}
        </label>
      </div>
    </div>
    <transition
      data
      enterActiveClass="transition-all duration-150 ease-out"
      enterFromClass="opacity-0 max-h-0"
      enterToClass="opacity-100 max-h-16"
      leaveActiveClass="transition-all duration-150 ease-in"
      leaveFromClass="opacity-100 max-h-16"
      leaveToClass="opacity-0 max-h-0"
    >
      <div class="relative" @click="saveExps()">
        <div class="text-center border-b bg-black bg-opacity-20 text-bg px-4 pt-2 pb-3" v-html="$t('misc.start')" />
      </div>
    </transition>
    <!-- <div
      v-if="!locked"
      class="relative z-1 text-center bg-black text-bg px-4 pt-2 pb-3"
      v-html="$t('misc.start')"
    />
    <div
      v-else
      class="relative z-1 text-center bg-black text-bg px-4 pt-2 pb-3"
      v-html="$t('misc.restart')"
    /> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { setupStore } from '@/stores/setup'
  import { screenStore } from '@/stores/screen'
  import $investigators from '@/jsons/investigators.json'
  import $aos from '@/jsons/aos.json'
  import $exps from '@/jsons/exp.json'

  export default defineComponent({
    name: 'Setup',
    props: {
    },
    data: () => ({
      locked: false,
      selected_exp: [ 'AKH' ],
    }),
    computed: {
      exps() {
        return $exps.expansions
      },
      investigators() {
        return $investigators.investigators
      },
      aos() {
        return $aos.ancientOnes
      },
      active() {
        return screenStore.getState().exps
      },
    },
    created() {
    },
    methods: {
      /* ========================================================================== *
      * Filtering available investigators and aos, push to store                    *
      * -------------------------------------------------------------------------- */
      saveExps() {
        const available_aos = this.aos.filter((a) => this.selected_exp.includes(a.expansion))
        const available_investigators = this.investigators.filter((i) => this.selected_exp.includes(i.exp))
        setupStore.saveSetup({
          exp: this.selected_exp,
          investigators: {
            all: available_investigators,
            current: [],
            devoured: [],
            left: [],
          },
          aos: {
            all: available_aos,
            current: '',
          },
        })

        /* ========================================================================== *
        * Next screen: investigators                                                  *
        * -------------------------------------------------------------------------- */
        screenStore.updateScreen('exps', false)
        screenStore.updateScreen('investigators', true)
      },
    },
  })
</script>

