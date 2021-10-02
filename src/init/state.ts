import { ref } from 'vue'
import { AO, Investigator, Mythos } from '@/types'

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
  all: Mythos[],
  rumor_solved: false,
  current: {
    headline: Mythos,
    rumor: Mythos,
    environment: Mythos,
  },
  left: Mythos[],
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
  all: [] as Mythos[],
  rumor_solved: false,
  current: {
    headline: {} as Mythos,
    rumor: {} as Mythos,
    environment: {} as Mythos,
  },
  left: [] as Mythos[],
  count: 0,
}

export const $setup = ref($initSetup)
export const $mythosDeck = ref($initMythosDeck)
export const $screen = ref('exps' as Screen)
