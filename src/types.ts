export interface JsonData {
  [key: string]: boolean | string | string[] | number | number[] | Record<string, unknown> | undefined | null
}
export interface AO {
  name: string,
  doomTrack: number,
  expansion: string,
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
  subline?: string,
  starting_at?: string,
  stats: number[],
  exp: string,
  image: string,
}

export interface SaveData {
  started: boolean,
  loaded: boolean,
  reset?: boolean,
  exp?: string[],
  locations?: string[],
  investigators?: {
    all: JsonData[],
    current: JsonData[],
    devoured: JsonData[],
    left: JsonData[],
  },
  ao?: string,
  mythos?: {
    all: JsonData[],
    current: {
      [key: string]: JsonData | null,
    },
    left: JsonData[],
    count: number,
  }
}
