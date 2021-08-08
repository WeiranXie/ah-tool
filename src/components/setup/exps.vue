<template>
  <div :class="[ active ? 'z-2' : 'hidden', 'flex flex-col']">
    <div class="flex text-center flex-row flex-wrap pb-12">
      <div
        v-for="(e, index) in exps"
        :key="index"
        class="flex flex-1/2 max-w-1/2 flex-col tablet:flex-1/3 border border-collapse"
      >
        <label :for="e.id" :class="[!selected_exp.includes(e.id) ? 'opacity-20' : '', 'text-bg bg-black w-full py-3 px-4 checked-sibling:text-black']">
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

    <div class="fixed w-full bottom-0 mt-5 flex flex-col mt-4 bg-bg">
      <div class="flex w-full">
        <div
          v-if="!locked"
          class="w-full text-center bg-black bg-opacity-10 text-black px-4 pt-2 pb-3"
          @click="saveExps()"
          v-html="$t('misc.start')"
        />
        <div
          v-else
          class="w-full text-center bg-bg bg-opacity-40 text-black px-4 pt-2 pb-3"
          @click="clearExps()"
          v-html="$t('misc.restart')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { setupStore } from '@/stores/setup'
  import { screenStore } from '@/stores/screen'
  import $investigators from '@/jsons/investigators.json'
  import $aos from '@/jsons/aos.json'
  import $exps from '@/jsons/exp.json'
  import { Investigator } from '@/types'

  export default defineComponent({
    name: 'Exps',
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
            all: available_investigators as unknown as Investigator[],
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
        this.locked = true,
        screenStore.updateScreen('exps', false)
        screenStore.updateScreen('investigators', true)
      },

      clearExps() {
        this.locked = false,
        this.selected_exp = [ 'AKH' ]
        setupStore.saveSetup({
          exp: this.selected_exp,
          investigators: {
            all: [],
            current: [],
            devoured: [],
            left: [],
          },
          aos: {
            all: [],
            current: '',
          },
        })
      },
    },
  })
</script>

