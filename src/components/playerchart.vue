<template>
  <div class="fixed top-0 z-10 flex font-c text-center overflow-scroll no-scroller bg-bg w-full h-full">
    <div v-if="!locked" class="flex flex-col mx-auto self-center">
      <select v-model="selected" class="block text-lg py-3 my-2 bg-transparent outline-none rounded border border-black px-3 w-64">
        <option disabled value="" v-html="'请选择你的调查员'" />
        <option
          v-for="(i, index) in investigators"
          :key="index"
          :value="i.subline"
          v-html="i.name"
        />
      </select>
      <div
        v-if="selected"
        class="py-3 my-2 rounded border border-black px-3 w-64"
        @click="locked = true"
        v-html="$t('misc.continue')"
      />
    </div>
    <div v-else-if="Object.keys(selected_i).length">
      <div class="p-4 w-screen">
        <div class="flex border-b pb-4 mb-3 border-gray-400">
          <div class="relative flex-shrink-0 self-center w-24 h-24">
            <img class="w-20 h-20 absolute top-1/2 absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2" :src="require(`@/assets/investigators/${selected_i.image}`).default">
            <img class="w-24 h-24 relative" :src="require(`@/assets/investigators/frame.pn${path}`).default">
          </div>
          <div class="self-center text-center pl-2.5 flex-grow">
            <p class="self-center leading-7 mt-1 mb-0.5 text-2xl" v-html="selected_i.name" />
            <p class="mb-1.5 text-sm" v-html="selected_i.subline" />

            <!---------------------------------------------------------------------------------
            | STAMINA & SANITY                                                                |
            ---------------------------------------------------------------------------------->
            <div class="flex flex-row -mb-1 justify-around text-left">
              <!-- Sanity -->
              <div class="flex mx-1.5 flex-col">
                <div class="flex mx-auto">
                  <img class="inline-block mt-1 w-8 h-6" :src="require(`@/assets/investigators/Sanity.pn${path}`).default">
                  <p class="text-2xl inline-block ml-2" v-html="`${selected_i.sanity}/${selected_i.max_stats[0]}`" />
                </div>
                <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
                  <div class="flex w-9 h-9 border-r border-gray-400" @click="addToStat('sanity', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
                  <div class="flex w-9 h-9" @click="addToStat('sanity', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
                </div>
              </div>
              <!-- Stamina -->
              <div class="flex mx-1.5 flex-col">
                <div class="flex mx-auto">
                  <img class="inline-block mt-0.5 w-7 h-7" :src="require(`@/assets/investigators/Stamina.pn${path}`).default">
                  <p class="text-2xl inline-block ml-2" v-html="`${selected_i.stamina}/${selected_i.max_stats[1]}`" />
                </div>
                <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
                  <div class="flex w-9 h-9 border-r border-gray-400" @click="addToStat('stamina', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
                  <div class="flex w-9 h-9" @click="addToStat('stamina', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col text-left border-b pb-1 mb-3 border-gray-400">
          <p
            v-for="(a, $ind) in selected_i.abilities"
            :key="$ind"
            class="text-sm font-t mb-2"
            v-html="$t(`investigators.${selected_i.abilities[$ind]}`)"
          />
        </div>

        <!---------------------------------------------------------------------------------
        | SKILL CHECKS                                                                    |
        ---------------------------------------------------------------------------------->
        <div class="flex flex-row justify-around text-left border-b pb-2 mb-2.5 border-gray-400">
          <!-- focus -->
          <div v-for="(stat, key) in selected_i.check" :key="key" class="flex flex-col">
            <div class="flex mx-auto flex-wrap text-center">
              <span class="text-sm w-full">
                {{ $t(`investigators.${key}`) }}
              </span>
              <span class="w-full">{{ stat }}</span>
            </div>
          </div>
        </div>

        <!---------------------------------------------------------------------------------
        | CLUES & MONEY                                                                   |
        ---------------------------------------------------------------------------------->
        <div class="flex flex-row justify-around text-left border-b pb-2 mb-2 border-gray-400">
          <!-- focus -->
          <div class="flex flex-col flex-nowrap self-center">
            <div>
              <span class="mr-0.5 text-sm">
                {{ $t('investigators.focus') }}
              </span>
              {{ selected_i.max_stats[2] }}
            </div>
          </div>
          <!-- clue -->
          <div class="flex flex-col">
            <div class="flex mx-auto">
              <img class="inline-block w-5 h-5" :src="require(`@/assets/tokens/clue.pn${path}`).default">
              <p class="inline-block ml-2 self-center" v-html="`${selected_i.clues}`" />
            </div>
            <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
              <div class="flex w-9 h-9 border-r border-gray-400" @click="addToStat('clue', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
              <div class="flex w-9 h-9" @click="addToStat('clue', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
            </div>
          </div>
          <!-- money -->
          <div class="flex flex-col">
            <div class="flex mx-auto">
              <p class="inline-block" v-html="`$ ${selected_i.money}`" />
            </div>
            <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
              <div class="flex w-9 h-9 border-r border-gray-400" @click="addToStat('money', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
              <div class="flex w-9 h-9" @click="addToStat('money', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
            </div>
          </div>
        </div>

        <!---------------------------------------------------------------------------------
        | SKILL SLIDER                                                                    |
        ---------------------------------------------------------------------------------->
        <div class="flex flex-col justify-around text-left pb-3 mb-3 border-gray-400">
          <div
            v-for="(sets, setsindex) in selected_i.skillsets"
            :key="setsindex"
            class="flex flex-row mb-2 pb-1.5 border-b border-gray-300"
            :class="{ hidden: !sets.length}"
          >
            <p class="w-32 text-sm px-4 self-center" v-html="getSkillName(setsindex)" />
            <div v-if="sets" class="flex flex-1 justify-between">
              <div
                v-for="(set, setindex) in sets"
                :key="setindex"
                class="sets flex px-3 -mt-0.5 py-0.5 flex-col"
                :class="{ selected: setindex === selected_i.selected_skills[setsindex]}"
              >
                <div
                  v-for="(value, vindex) in set"
                  :key="vindex"
                  class="-mb-1"
                  @click="setSkills(setsindex, sets, set)"
                  v-html="value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="locked" class="fixed w-full bottom-0 mt-5 flex flex-col mt-4 bg-bg">
      <div class="flex w-full">
        <div class="w-full text-center bg-black bg-opacity-10 text-black px-4 py-2" @click="goBack()" v-html="$t('misc.back')" />
        <div
          v-if="stats_locked"
          class="w-full text-center bg-bg bg-opacity-40 text-black px-4 py-2"
          @click="stats_locked = false"
          v-html="$t('misc.change')"
        />
        <div
          v-else
          class="w-full text-center bg-bg bg-opacity-40 text-black px-4 py-2"
          @click="stats_locked = true"
          v-html="$t('misc.confirm_change')"
        />
      </div>
    </div>
    <img class="fixed -z-2 w-full h-full top-0" :src="require(`@/assets/secbg.jp${path}`).default">
  </div>
</template>

<script lang="ts">
  import $investigators from '@/jsons/investigators.json'
  import { defineComponent } from 'vue'
  import { Investigator, SkillName } from '@/types'

  export default defineComponent({
    name: 'PlayerChart',
    props: {
    },
    data: () => ({
      path: 'g',
      selected: '',
      locked: false,
      selected_i: {} as Investigator,
      stats_locked: true,
    }),
    computed: {
      investigators() {
        return $investigators.investigators
      },
    },
    watch: {
      // Confirm the investigator selection
      locked(locked) {
        if (locked && !Object.keys(this.selected_i).length && this.selected && this.investigators) {
          this.investigators.forEach((i) => {
            if (i.subline === this.selected) this.selected_i = Object.assign({}, i as Investigator)
          })
        }
      },
      // Update skill checks and save chart to local storage
      selected_i: {
        handler(i) {
          if (Object.keys(i).length) {
            this.getSkillCheck()
            localStorage.setItem('ah_active_investigator', JSON.stringify(i))
          }
        },
        deep: true,
        immediate: true,
      },
    },
    // Load player chart
    created() {
      const stored_i = localStorage.getItem('ah_active_investigator')
      if (stored_i) {
        this.selected_i = JSON.parse(stored_i)
        this.locked = true
      }
    },
    methods: {
      // Choose skill set
      setSkills(index: number, sets: number[][], set: number[]) {
        this.selected_i.selected_skills[index] = sets.indexOf(set)
        console.log(index, sets, set)
      },
      getSkillName(index: number) {
        const keys = this.selected_i.skillnames[index]
        if (keys) return [ this.$t(`investigators.${keys[0]}`), this.$t(`investigators.${keys[1]}`) ].join('<br/>')
      },
      getSkillCheck() {
        const skills: SkillName[] = Array.prototype.concat.apply([], this.selected_i.skillnames)
        const stats = Array.prototype.concat.apply([], this.selected_i.skillsets.map((sets, index) => sets[this.selected_i.selected_skills[index]]))
        skills.forEach((skill, index) => {
          if (skill !== 'max_sanity' && skill !== 'max_stamina') this.selected_i.check[skill] = stats[index]
          else if (skill === 'max_sanity') this.selected_i.max_stats[0] = stats[index]
          else this.selected_i.max_stats[1] = stats[index]
        })
      },
      // Modify investigator status
      addToStat(key: string, add: boolean) {
        switch (key) {
          case 'stamina':
            console.log(this.selected_i)
            if (add) this.selected_i.stamina++
            else this.selected_i.stamina--
            break
          case 'sanity':
            if (add) this.selected_i.sanity++
            else this.selected_i.sanity--
            break
          case 'clue':
            if (add) this.selected_i.clues++
            else this.selected_i.clues--
            break
          case 'money':
            if (add) this.selected_i.money++
            else this.selected_i.money--
            break
        }
      },
      goBack() {
        this.locked = false
        this.selected_i = {} as Investigator
      },
    },
  })
</script>

<style scoped>
  .sets {
    border: 3px solid transparent;
    border-radius: 10px;
  }
  .sets.selected {
    border: 3px solid #999;
  }
</style>
