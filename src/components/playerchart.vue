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
        <div class="flex border-b pb-4 mb-4 border-gray-400">
          <div class="relative w-24 h-24">
            <img class="w-20 h-20 absolute top-1/2 absolute transform -translate-x-1/2 left-1/2 -translate-y-1/2" :src="require(`@/assets/investigators/${selected_i.image}`).default">
            <img class="w-24 h-24 relative" :src="require(`@/assets/investigators/frame.pn${path}`).default">
          </div>
          <div class="self-center text-center px-3 flex-grow">
            <p class="self-center leading-7 my-2 text-2xl" v-html="selected_i.name" />
            <p class="" v-html="selected_i.subline" />
          </div>
        </div>
        <div class="flex flex-col text-left border-b pb-2 mb-4 border-gray-400">
          <p
            v-for="(a, $ind) in selected_i.abilities"
            :key="$ind"
            class="font-t mb-2"
            v-html="$t(`investigators.${selected_i.abilities[$ind]}`)"
          />
        </div>
        <div class="flex flex-row justify-around text-left border-b pb-4 mb-4 border-gray-400">
          <!-- Stamina -->
          <div class="flex flex-col">
            <div class="flex mt-1 mx-auto">
              <img class="inline-block -mt-1 -ml-1 w-9 h-9" :src="require(`@/assets/investigators/Stamina.pn${path}`).default">
              <p class="text-3xl inline-block ml-3" v-html="`${selected_i.stats[1]}/${max_stats[1]}`" />
            </div>
            <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
              <div class="flex w-11 h-11 border-r border-gray-400" @click="addToStat('stamina', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
              <div class="flex w-11 h-11" @click="addToStat('stamina', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
            </div>
          </div>
          <!-- Sanity -->
          <div class="flex flex-col">
            <div class="flex mt-1 mx-auto">
              <img class="inline-block -mt-0.5 -ml-1 w-11 h-8" :src="require(`@/assets/investigators/Sanity.pn${path}`).default">
              <p class="text-3xl inline-block ml-3" v-html="`${selected_i.stats[0]}/${max_stats[0]}`" />
            </div>
            <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
              <div class="flex w-11 h-11 border-r border-gray-400" @click="addToStat('sanity', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
              <div class="flex w-11 h-11" @click="addToStat('sanity', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-around text-left border-b pb-4 mb-4 border-gray-400">
          <!-- focus -->
          <div class="flex flex-col">
            <div class="flex mt-1 mx-auto">
              <p class="text-2xl inline-block -ml-1" v-html="`专注：${selected_i.stats[2]}`" />
            </div>
          </div>
          <!-- money -->
          <div class="flex flex-col">
            <div class="flex mt-1 mx-auto">
              <p class="text-2xl inline-block ml-3" v-html="`$ ${selected_i.money}`" />
            </div>
            <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
              <div class="flex w-11 h-11 border-r border-gray-400" @click="addToStat('money', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
              <div class="flex w-11 h-11" @click="addToStat('money', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
            </div>
          </div>
          <!-- clue -->
          <div class="flex flex-col">
            <div class="flex mt-1 mx-auto">
              <img class="inline-block -mt-0.5 -ml-1 w-8 h-8" :src="require(`@/assets/tokens/clue.pn${path}`).default">
              <p class="text-2xl inline-block ml-3" v-html="`${selected_i.clues}`" />
            </div>
            <div v-if="!stats_locked" class="flex border mx-auto mt-2 rounded border-gray-400">
              <div class="flex w-11 h-11 border-r border-gray-400" @click="addToStat('clue', false)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>–</p>'" />
              <div class="flex w-11 h-11" @click="addToStat('clue', true)" v-html="'<p class=&#34;self-center w-full text-center font-t text-3xl&#34;>+</p>'" />
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-around text-left pb-4 mb-4 border-gray-400">
          <!-- Skillsets 1 -->
          <div class="flex flex-row mb-2 pb-2 border-b border-gray-300">
            <p class="w-32 self-center" v-html="getSkillName('skillset_1')" />
            <div class="flex flex-1 justify-between">
              <div v-for="(values, vsindex) in selected_i.skillsets.skillset_1" :key="vsindex" class="radio flex text-2xl flex-col">
                <input
                  :id="`${values}${getSkillName('skillset_1')}`"
                  type="radio"
                  :value="selected_i.skillsets.skillset_1.indexOf(values)"
                  name="skillset_1"
                >
                <label :for="`${values}${getSkillName('skillset_1')}`" class="px-4 py-2">
                  <div
                    v-for="(v, vi) in values"
                    :key="vi"
                    v-html="v"
                  />
                </label>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-around text-left pb-4 mb-4 border-gray-400">
            <!-- Skillsets 2 -->
            <div class="flex flex-row mb-2 pb-2 border-b border-gray-300">
              <p class="w-32 self-center" v-html="getSkillName('skillset_2')" />
              <div class="flex flex-1 justify-between">
                <div v-for="(values, vsindex) in selected_i.skillsets.skillset_2" :key="vsindex" class="radio flex text-2xl flex-col">
                  <input
                    :id="`${values}${getSkillName('skillset_2')}`"
                    type="radio"
                    :value="selected_i.skillsets.skillset_2.indexOf(values)"
                    name="skillset_2"
                  >
                  <label :for="`${values}${getSkillName('skillset_2')}`" class="px-4 py-2">
                    <div
                      v-for="(v, vi) in values"
                      :key="vi"
                      v-html="v"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-around text-left pb-4 mb-4 border-gray-400">
              <!-- Skillsets 3 -->
              <div class="flex flex-row mb-2 pb-2 border-b border-gray-300">
                <p class="w-32 self-center" v-html="getSkillName('skillset_3')" />
                <div class="flex flex-1 justify-between">
                  <div v-for="(values, vsindex) in selected_i.skillsets.skillset_3" :key="vsindex" class="radio flex text-2xl flex-col">
                    <input
                      :id="`${values}${getSkillName('skillset_3')}`"
                      type="radio"
                      :value="selected_i.skillsets.skillset_3.indexOf(values)"
                      name="skillset_3"
                    >
                    <label :for="`${values}${getSkillName('skillset_3')}`" class="px-4 py-2">
                      <div
                        v-for="(v, vi) in values"
                        :key="vi"
                        v-html="v"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!-- <div v-for="(sets, index) in selected_i.skillsets" :key="index" class="flex flex-row mb-2 pb-2 border-b border-gray-300">
            <p class="w-32 self-center" v-html="getSkillName(index)" />
            <div class="flex flex-1 justify-between">
              <div v-for="(values, vsindex) in sets" :key="vsindex" class="flex text-2xl px-4 flex-col">
                <label>
                  <div
                    v-for="(v, vi) in values"
                    :key="vi"
                    v-html="v"
                  />
                  <input
                    v-modal="selected_skills[index]"
                    type="radio"
                    :value="getIndex(sets, values)"
                  >
                </label>
              </div>
            </div>
          </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="locked" class="fixed w-full bottom-0 mt-5 flex flex-col mt-4 bg-bg">
      <div class="flex w-full">
        <div class="w-full text-center bg-black bg-opacity-10 text-black px-4 pt-2 pb-3" @click="locked = false" v-html="$t('misc.back')" />
        <div
          v-if="stats_locked"
          class="w-full text-center bg-bg bg-opacity-40 text-black px-4 pt-2 pb-3"
          @click="stats_locked = false"
          v-html="$t('misc.change')"
        />
        <div
          v-else
          class="w-full text-center bg-bg bg-opacity-40 text-black px-4 pt-2 pb-3"
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
  import { Investigator } from '@/types'

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
      max_stats: [] as number[],
      selected_skills: {
        skillset_1: 0 as any,
        skillset_2: 0 as any,
        skillset_3: 0 as any,
        skillset_4: 0 as any,
      },
    }),
    computed: {
      investigators() {
        return $investigators.investigators
      },
    },
    watch: {
      selected() {
        if (this.selected && this.investigators) {
          this.investigators.forEach((i) => {
            if (i.subline === this.selected) {
              this.selected_i = Object.assign({}, i as unknown as Investigator)
              this.max_stats = i.stats.map((i) => i)
            }
          })
        }
      },
    },
    created() {
      // console.log(require('./assets'))
    },
    methods: {
      getIndex(arr: number[][], i: number[]) {
        return arr.indexOf(i) || 0
      },
      getSkillName(key: 'skillset_1' | 'skillset_2' | 'skillset_3' | 'skillset_4') {
        if (key in this.selected_i.skillsets) return this.selected_i.skillnames[key]
      },
      addToStat(key: string, add: boolean) {
        switch (key) {
          case 'stamina':
            if (add) this.selected_i.stats[1]++
            else this.selected_i.stats[1]--
            break
          case 'sanity':
            if (add) this.selected_i.stats[0]++
            else this.selected_i.stats[0]--
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
    },
  })
</script>

<style scoped>
  input[type="radio"] {
    display: none;
  }
  input[type="radio"]+label {
    border: 3px solid transparent;
    border-radius: 10px;
  }
  input[type="radio"]:checked+label {
    border: 3px solid #999;
  }
</style>
