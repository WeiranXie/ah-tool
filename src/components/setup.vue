<template>
  <div class="flex flex-col bg-bg">
    <div class="flex text-center flex-row flex-wrap">
      <div
        v-for="(e, index) in exps"
        :key="index"
        class="flex flex-1/2 max-w-1/2 flex-col tablet:flex-1/3 border border-collapse"
      >
        <label :for="e.id" :class="[!exp.includes(e.id) ? 'opacity-20' : '', 'bg-black text-bg w-full py-3 px-4 checked-sibling:bg-bg checked-sibling:text-black']">
          <img class="h-36 my-3 mx-auto " :src="require(`@/assets/exps/${e.id}.jpg`).default">
          <input
            :id="e.id"
            v-model="exp"
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
      <div class="relative">
        <div class="text-center border-b bg-black bg-opacity-20 text-bg px-4 pt-2 pb-3" v-html="$t('misc.choose_investigators')" />
        <div class="text-center border-b bg-black bg-opacity-20 text-bg px-4 pt-2 pb-3" v-html="$t('misc.mythos')" />
      </div>
    </transition>
    <div
      v-if="!locked"
      class="relative z-1 text-center bg-black text-bg px-4 pt-2 pb-3"
      v-html="$t('misc.start')"
    />
    <div
      v-else
      class="relative z-1 text-center bg-black text-bg px-4 pt-2 pb-3"
      v-html="$t('misc.restart')"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import $exps from '@/jsons/exp.json'

  export default defineComponent({
    name: 'Setup',
    props: {
    },
    emits: [ 'exp', 'active-panel' ],
    data: () => ({
      locked: false,
      exp: [ 'AKH' ],
    }),
    computed: {
      exps() {
        return $exps.expansions
      },
    },
    created() {
      // console.log(require('./assets'))
    },
    methods: {
    },
  })
</script>

