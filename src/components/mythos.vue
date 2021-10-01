<!-- +=====================================================================+
| MYTHOS                                                                   |
+======================================================================+ -->
<template>
  <div :class="['absolute w-full h-screen top-0']">
    <div class="fixed w-full max-w-xl bg-bg z-10 flex text-xs justify-around text-center">
      <div class="w-full flex">
        <input
          id="mythos-headline"
          v-model="tabs"
          type="radio"
          name="mythos-radios"
          value="headline"
          :disabled="!mythos.current.headline"
          class="hidden"
        >
        <label for="mythos-headline" :class="[!mythos.current.headline ? 'opacity-20' : '', 'bg-black text-bg w-full py-2 checked-sibling:bg-bg checked-sibling:text-black']">{{ $t('mythos.headline') }}</label>
      </div>
      <div class="w-full flex">
        <input
          id="mythos-rumor"
          v-model="tabs"
          type="radio"
          name="mythos-radios"
          value="rumor"
          :disabled="!mythos.current.rumor"
          class="hidden"
        >
        <label for="mythos-rumor" :class="[!mythos.current.rumor || mythos.rumor_solved ? 'opacity-20' : '', 'bg-black text-bg w-full py-2 checked-sibling:bg-bg checked-sibling:text-black']">{{ $t('mythos.rumor') }}</label>
      </div>
      <div class="w-full flex">
        <input
          id="mythos-mystic"
          v-model="tabs"
          type="radio"
          name="mythos-radios"
          value="environment"
          :disabled="!mythos.current.environment"
          class="hidden"
        >
        <label for="mythos-mystic" :class="[!mythos.current.environment ? 'opacity-20' : '', 'bg-black text-bg w-full py-2 checked-sibling:bg-bg checked-sibling:text-black']">{{ $t('mythos.environment') }}</label>
      </div>
    </div>

    <div v-if="mythos.current[tabs]" class="text-center max-w-xl w-full pt-4 py-16 flex flex-col">
      <img class="fixed -z-2 max-w-xl w-full h-full top-0" src="@/assets/cards/mythos-front.jpg">
      <img class="fixed -z-1 max-w-xl w-full pt-7 top-0" src="@/assets/cards/mythos-front-frame.png">
      <div class="fixed px-10 sm:px-16 max-w-xl w-full">
        <p class="font-h text-xl xs:text-2xl sm:text-3xl mt-12 xs:mt-18 mb-3 sm:mb-4 sm:mt-24 leading-6">
          {{ mythos.current[tabs]?.name }}
        </p>
        <p class="text-xs xs:text-md sm:text-lg">
          {{ mythos.count }} {{ $t(`mythos.${mythos.current[tabs]?.type}`) }}<span v-if="mythos.current[tabs]?.subtype" class=""> – {{ $t(`mythos.env.${mythos.current[tabs]?.subtype}`) }}</span>
        </p>
      </div>

      <div class="min-h-h-36 overflow-scroll px-8 xs:px-16 leading-5 xs:leading-6 relative top-32 xs:top-40 sm:top-52" style="height: calc(100vh - 21.5rem)">
        <p
          v-for="(i, index) in mythos.current[tabs].text"
          :key="index"
          class="mb-3 xs:mb-5 sm:text-lg sm:mb-8"
          v-html="i"
        />
        <div v-if="mythos.current[tabs]?.clue" class="flex flex-row mb-5 justify-center">
          <img class="w-7 shadow rounded-full" src="@/assets/tokens/clue.png">
          <div v-if="Array.isArray(mythos.current[tabs]?.clue)" class="flex">
            <p v-for="(item, index) in loc_available(mythos.current[tabs].clue, mythos.current[tabs]?.clue_alt)" :key="index" class="ml-2 self-center">
              {{ $t(`locations.${item}`) }}
            </p>
          </div>
          <p v-else class="ml-2 self-center">
            {{ $t(`locations.${loc_available(mythos.current[tabs].clue, mythos.current[tabs]?.clue_alt)}`) }}
          </p>
        </div>
        <div v-if="mythos.current[tabs]?.type === 'rumor'" class="flex my-6 justify-center">
          <p class="px-4 pt-1 pb-1 bg-white" @click="mythos.rumor_solved = true">
            {{ $t(`misc.rumor_pass`) }}
          </p>
          <p class="px-4 pt-1 pb-1 bg-black text-white" @click="mythos.rumor_solved = true">
            {{ $t(`misc.rumor_failed`) }}
          </p>
        </div>
      </div>

      <div class="fixed w-full max-w-xl bottom-0 mt-5 flex flex-col mt-4">
        <div class="flex px-6 pb-4 xs:pb-6 sm:pb-8">
          <div v-if="mythos.current[tabs]?.gate" class="flex flex-col flex-auto w-1/3 mr-5 justify-center">
            <img class="w-24 xs:w-32 sm:w-40 shadow rounded-full mx-auto mb-2 xs:mb-4 sm:mb-6" src="@/assets/tokens/gate.jpg">
            <div v-if="Array.isArray(mythos.current[tabs]?.gate)" class="flex self-center flex-col">
              <p v-for="(item, index) in loc_available(mythos.current[tabs].gate, mythos.current[tabs].gate_alt)" :key="index" class="mt-1 self-center text-md">
                {{ $t(`locations.${item}`) }}
              </p>
            </div>
            <p v-else :class="[mythos.current[tabs]?.gateType === 'burst' ? 'text-textred' : '', 'self-center text-md']">
              {{ $t(`locations.${loc_available(mythos.current[tabs].gate, mythos.current[tabs].gate_alt)}`) }}
            </p>
          </div>
          <div v-else-if="mythos.current[tabs]?.doom_add" class="flex flex-col flex-auto w-1/3 mr-5 justify-center">
            <p class="self-center text-md">
              2 DOOM TOKENS
            </p>
          </div>
          <div v-else-if="mythos.current[tabs]?.terror_add" class="flex flex-col flex-auto w-1/3 mr-5 justify-center">
            <p class="self-center text-md">
              2 TERROR LEVELS
            </p>
          </div>
          <div class="relative flex w-2/3 border-2 border-transparent self-center flex-col py-4 mx-auto px-1">
            <img class="absolute" style="width: calc(100% + 4px); top: 4px; left: 0px; height: calc(100% - 10px)" src="@/assets/cards/mythos-front-frame-movement.png">
            <div class="flex flex-row justify-center py-1.5 xs:py-2.5 sm:py-3 bg-bg">
              <p v-for="i in mythos.current[tabs]?.movement.white" :key="i.index" class="">
                <img class="h-8 xs:h-10 w-auto" :src="require(`@/assets/dimension-symbols/${i}.png`)">
              </p>
            </div>
            <div class="flex flex-row justify-center py-1.5 xs:py-2.5 sm:py-3 bg-black">
              <p v-for="i in mythos.current[tabs]?.movement.black" :key="i.index" class="">
                <img class="h-8 xs:h-10 w-auto" :src="require(`@/assets/dimension-symbols/${i}.png`)">
              </p>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-full text-center bg-black bg-opacity-10 text-black px-4 py-2" @click="$emit('back', true)" v-html="$t('misc.back')" />
          <div class="w-full text-center bg-bg bg-opacity-40 text-black px-4 py-2" @click="drawMythos()" v-html="$t('misc.draw')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { JsonData } from '@/types'

  export default defineComponent({
    name: 'Mythos',
    emits: [ 'mythos-progress', 'back' ],
    data: () => ({
      tabs: 'headline',
      ready: false,
      mythos: {
        all: [] as JsonData[],
        rumor_solved: false,
        current: {
          headline: null as JsonData | null,
          rumor: null as JsonData | null,
          environment: null as JsonData | null,
        } as { [key: string]: JsonData | null },
        left: [] as object[],
        count: 0,
      },
    }),
    watch: {
    },
    created() {
      /* --------------------------------------------------------------------------- *
      * RESET DATA / LOAD GAME                                                       *
      * --------------------------------------------------------------------------- */
      // if (this.saved && this.saved.locations) this.locations = this.saved.locations
      // if (this.saved && this.saved.mythos) {
      //   this.mythos.all = this.saved.mythos.all
      //   this.mythos.current = this.saved.mythos.current
      //   this.mythos.left = this.saved.mythos.left
      //   this.mythos.count = this.saved.mythos.count
      //   if (this.saved.loaded) console.log('LOAD GAME – MYTHOS')
      // }
      // if (this.saved && !this.saved.loaded) {
      //   console.log('MYTHOS – DRAWING FIRST MYTHOS')
      //   this.tabs = 'headline'
      //   this.drawMythos()
      // }
    },
    updated() {
    },
    methods: {
      /* --------------------------------------------------------------------------- *
       * DRAW MYTHOS                                                                 *
       * --------------------------------------------------------------------------- */
      drawMythos() {
        if (this.mythos.left.length === 0) {
          this.shuffle(this.mythos.all)
          this.mythos.left = [ ...this.mythos.all ]
          const arr: string[] = []
          this.mythos.all.map((i: JsonData) => {
            arr.push(i.name as string)
          })
        }
        const current = this.mythos.left[0] as JsonData
        const type = current.type as string
        if (type === 'rumor') {
          if (this.mythos.current.rumor as Record<string, string> && !this.mythos.rumor_solved) {
            current.name = (this.mythos.current.rumor as JsonData).name
            current.text = (this.mythos.current.rumor as JsonData).text
          } else this.mythos.rumor_solved = false
        }
        this.mythos.current[type] = current
        this.tabs = type
        this.mythos.left.splice(0, 1)
        this.mythos.count = this.mythos.left.length
        this.emitMythos()
      },

      /* --------------------------------------------------------------------------- *
       * SHUFFLE DECK                                                                *
       * --------------------------------------------------------------------------- */
      shuffle(array: object[]) {
        let currentIndex = array.length
        let temporaryValue = {}
        let randomIndex = 0
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
          temporaryValue = array[currentIndex]
          array[currentIndex] = array[randomIndex]
          array[randomIndex] = temporaryValue
        }
        return array
      },
      loc_available(loc: string | string[], loc_alt: string | string[]) {
        if (!this.locations) return false
        if (Array.isArray(loc)) {
          loc.forEach((item) => {
            if (!(this.locations as string[]).includes(item)) return loc_alt
          })
          return loc
        } else {
          return (this.locations as string[]).includes(loc) ? loc : loc_alt
        }
      },
      emitMythos() {
        this.$emit('mythos-progress', {
          all: this.mythos.all,
          current: this.mythos.current,
          left: this.mythos.left,
          count: this.mythos.count,
        })
      },
    },
  })
</script>

// <style lang="scss">
// </style>
