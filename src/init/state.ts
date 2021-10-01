import { ref } from 'vue'
import { AO, Investigator, JsonData } from '@/types'

export type Screen =
  | 'setup'
  | 'exps'
  | 'investigators'
  | 'aos'
  | 'mythos'
  | 'ah_encounters'
  | 'ow_encounters'

export interface Setup {
  exp: string[],
  investigators: {
    all: Investigator[],
    current: Investigator[],
    devoured: Investigator[],
    left: Investigator[],
  }
  aos: {
    all: AO[],
    current: AO | undefined,
  }
}

export interface MythosDeck {
  locations: string[],
  all: JsonData[],
  rumor_solved: false,
  current: {
    headline: JsonData,
    rumor: JsonData,
    environment: JsonData,
  },
  left: JsonData[],
  count: number,
}

export const $initSetup = {
  exp: [] as string[],
  investigators: {
    all: [] as Investigator[],
    current: [] as Investigator[],
    devoured: [] as Investigator[],
    left: [] as Investigator[],
  },
  aos: {
    all: [] as AO[],
    current: undefined as AO | undefined,
  },
}

export const $initMythosDeck = {
  locations: [] as string[],
  all: [] as JsonData[],
  rumor_solved: false,
  current: {
    headline: {} as JsonData,
    rumor: {} as JsonData,
    environment: {} as JsonData,
  },
  left: [] as JsonData[],
  count: 0,
}

export const $setup = ref($initSetup)
export const $mythosDeck = ref($initMythosDeck)
export const $screen = ref('exps' as Screen)
