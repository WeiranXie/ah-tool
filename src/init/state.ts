import { ref } from 'vue'
import { AO, Investigator, Mythos, Exp, Location } from '@/types'

/* ========================================================================== *
 * Screens                                                                    *
 * -------------------------------------------------------------------------- */
export type Screen =
  | 'setup'
  | 'exps'
  | 'investigators'
  | 'aos'
  | 'mythos'
  | 'ah_encounters'
  | 'ow_encounters'

/* ========================================================================== *
 * Setup: Expansions, Investigators, Locations, AO                            *
 * -------------------------------------------------------------------------- */
export interface Setup {
  exp: Exp[],
  locations: Location[],
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

/* ========================================================================== *
 * Mythos Deck                                                                *
 * -------------------------------------------------------------------------- */
export interface MythosDeck {
  all: Mythos[],
  rumor_solved: false,
  current: {
    headline?: Mythos,
    rumor?: Mythos,
    environment?: Mythos,
  },
  left: Mythos[],
  count: number,
}

/* ========================================================================== *
 * Save Data                                                                  *
 * -------------------------------------------------------------------------- */
export interface SaveData extends Setup {
  started: boolean,
  loaded: boolean,
  reset?: boolean,
  mythos?: MythosDeck,
}


/* ========================================================================== *
 * Initial states                                                             *
 * -------------------------------------------------------------------------- */
// Setup
export const $initSetup: Setup = {
  exp: [] as Exp[],
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
  locations: [] as Location[],
}

// Mythos Deck
export const $initMythosDeck: MythosDeck = {
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

export const $setup = ref($initSetup as Setup)
export const $mythosDeck = ref($initMythosDeck as MythosDeck)
export const $screen = ref('exps' as Screen)
