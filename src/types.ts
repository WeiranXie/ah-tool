export type Exp = 'AKH' | 'CDP' | 'DUH' | 'KIY' | 'KH' | 'BGW' | 'INH' | 'LTH' | 'MKH'
export type Symbol = 'crescent' | 'diamond' | 'hexagon' | 'square' | 'circle' | 'cross' | 'slash' | 'triangle' | 'star'

export interface Mythos {
  name: string,
  type: string,
  subtype: string,
  text: string[],
  clue: string,
  gate: string,
  gateType: 'normal' | 'burst',
  movement: {
    white: Symbol[],
    black: Symbol[],
  },
  expansion: Exp,
}

export interface Skillnames {
  skillset_1: [string, string],
  skillset_2: [string, string],
  skillset_3: [string, string],
  skillset_4?: [string, string],
}

export interface Skillsets {
  skillset_1: [number, number][],
  skillset_2: [number, number][],
  skillset_3: [number, number][],
  skillset_4?: [number, number][],
}

export interface AO {
  name: string,
  doomTrack: number,
  expansion: Exp,
  power?: Record<string, unknown>,
  attack?: string,
  startOfBattle?: string,
  combatRating?: number,
  defenses?: string,
  worshippers?: string,
  activeText?: string[],
  plots?: Record<string, unknown>[],
  plotBackImg?: string,
}

export interface Investigator {
  name: string,
  subline: string,
  starting_at: string,
  stats: number[],
  skillsets: Skillsets,
  skillnames: Skillnames,
  clues: number,
  money: number,
  abilities: string[],
  possessions: string,
  exp: Exp,
  image: string,
}

