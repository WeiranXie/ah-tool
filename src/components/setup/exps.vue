<template>
  <div id="screen-exps" :class="[ active ? 'z-2' : 'hidden', 'flex flex-col']">
    <!-- +=====================================================================+
    | CHOOSE EXPANSIONS                                                        |
    +======================================================================+ -->
    <div class="flex text-center flex-row flex-wrap pb-24">
      <div v-for="(e, index) in exps" :key="index" class="flex flex-1/2 max-w-1/2 flex-col tablet:flex-1/3 border border-collapse">
        <div :class="[!selected_exp.includes(e.id) ? 'opacity-20' : '', locked ? 'pointer-events-none' : '', 'text-bg bg-black w-full py-3 px-4 checked-sibling:text-black']" @click="toggleExp(e.id)">
          <img class="h-36 my-3 mx-auto" :src="require(`@/assets/exps/${e.id}.jpg`).default">
          {{ $t(`exp.${e.id}`) }}
        </div>
      </div>
    </div>

    <div class="fixed w-full bottom-0 mt-5 flex flex-col mt-4 bg-bg">
      <div class="flex w-full">
        <!-- +=====================================================================+
        | SAVE EXPS AND CONTINUE                                                   |
        +======================================================================+ -->
        <div
          v-if="!locked"
          class="w-full text-center bg-black bg-opacity-10 text-black px-4 py-2"
          @click="saveExps()"
          v-html="$t('misc.start')"
        />
        <!-- +=====================================================================+
        | TO OTHER SCREENS OR RESTART                                              |
        +======================================================================+ -->
        <div v-else class="w-full">
          <div class="flex">
            <div
              class="w-1/3 text-center flex-grow-0 border-r border-gray-300 bg-bg bg-opacity-40 text-black px-4 py-2"
              @click="to('investigators')"
              v-html="$t('misc.browse_investigators')"
            />
            <div
              class="w-1/3 text-center flex-grow-0 border-r border-gray-300 bg-bg bg-opacity-40 text-black px-4 py-2"
              @click="to('aos')"
              v-html="$t('misc.browse_aos')"
            />
            <div
              class="w-1/3 text-center flex-grow-0 bg-bg bg-opacity-40 text-black px-4 py-2"
              @click="to('mythos')"
              v-html="$t('misc.mythos')"
            />
          </div>
          <div
            class="w-full text-center bg-black bg-opacity-10 text-black px-4 py-2"
            @click="clearExps()"
            v-html="$t('misc.restart')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { $initSetup, $setup, $screen, Screen, $mythosDeck, $initMythosDeck } from '@/init/state'
  import $investigators from '@/jsons/investigators.json'
  import $locations from '@/jsons/locations_exp.json'
  import $mythos from '@/jsons/mythos.json'
  import $aos from '@/jsons/aos.json'
  import $exps from '@/jsons/exp.json'
  import { Investigator, Exp, AO, Location, Mythos } from '@/types'

  export default defineComponent({
    name: 'Exps',
    props: {
    },
    data: () => ({
      locked: false,
      selected_exp: [ 'AKH' ] as Exp[],
    }),
    computed: {
      exps() {
        return $exps.expansions as { id: Exp; name: string; year: number }[]
      },
      locations() {
        return $locations as { [key in Exp]: Location[] }
      },
      investigators() {
        return $investigators.investigators as Investigator[]
      },
      aos() {
        return $aos.ancientOnes as AO[]
      },
      mythos() {
        return $mythos.mythos as Mythos[]
      },
      active() {
        return $screen.value === 'exps'
      },
    },
    methods: {
      /* ========================================================================== *
      * Toggle expansion selection                                                  *
      * -------------------------------------------------------------------------- */
      toggleExp(exp: Exp) {
        const selected = this.selected_exp
        if (selected.includes(exp)) selected.splice(selected.indexOf(exp), 1)
        else selected.push(exp)
      },

      /* ========================================================================== *
      * Saving expansions and get available aos/investigators/locations etc         *
      * -------------------------------------------------------------------------- */
      saveExps() {
        // All avaiable AOs
        const available_aos = this.aos.filter((a) => this.selected_exp.includes(a.expansion))
        // All avaiable Investigators
        const available_investigators = this.investigators.filter((i) => this.selected_exp.includes(i.exp))
        // All avaiable Locations
        const available_locations = [] as Location[]
        for (const key in this.locations) {
          if (this.selected_exp.includes(key as Exp)) {
            const exp = key as Exp
            this.locations[exp].forEach((l: Location) => {
              available_locations.push(l)
              console.log(this.$t(`locations.${l}`))
            })
          }
        }
        // All available mythos
        const available_mythos = this.mythos.filter((i) => this.selected_exp.includes(i.expansion))
        // Save to setup ref
        $setup.value = {
          exp: this.selected_exp,
          locations: available_locations,
          aos: {
            all: available_aos,
            current: undefined,
          },
          investigators: {
            all: available_investigators,
            current: [],
            devoured: [],
            left: [],
          },
        }
        $mythosDeck.value = $initMythosDeck
        $mythosDeck.value.all = available_mythos

        /* ========================================================================== *
        * Next screen: investigators                                                  *
        * -------------------------------------------------------------------------- */
        this.locked = true,
        $screen.value = 'investigators'
      },

      clearExps() {
        this.locked = false,
        this.selected_exp = [ 'AKH' ]
        $setup.value = $initSetup
      },

      /* ========================================================================== *
      * Jump to other screen                                                        *
      * -------------------------------------------------------------------------- */
      to(screen: Screen) {
        $screen.value = screen
      },
    },
  })
</script>

