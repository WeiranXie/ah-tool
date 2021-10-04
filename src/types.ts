export type Exp = 'AKH' | 'CDP' | 'DUH' | 'KIY' | 'KH' | 'BGW' | 'INH' | 'LTH' | 'MKH'
export type Symbol = 'crescent' | 'diamond' | 'hexagon' | 'square' | 'circle' | 'cross' | 'slash' | 'triangle' | 'star'
export type Location =
'Newspaper' |
'Easttown' |
'Downtown' |
'French Hill' |
'Inner Sanctum' |
'Arkham Asylum' |
'Bank of Arkham' |
'Unvisited Isle' |
'Graveyard' |
'Silver Twilight Lodge' |
'The Witch House' |
'Black Cave' |
'Independence Square' |
'Woods' |
'Hibbs Roadhouse' |
'Historical Society' |
'The Unnamable' |
'Science Building' |
'The General Store' |
'Curiositie Shoppe' |
'Ye Olde Magick Shoppe' |
'St Marys Hospital' |
'Police Station' |
'Library' |
'Velmas Diner' |
'Train Station' |
'Administration Building' |
'Backwoods Country' |
'Blasted Heath' |
'Village Commons' |
'Sentinel Hill' |
'Whateley Farm' |
'Gardners Place' |
'Wizards Hill' |
'Harney Jones Shack' |
'Darkes Carnival' |
'Bishops Brook Bridge' |
'Darkes Carnival' |
'Dunwich Village' |
'Central Hill Streets' |
'Devils Hopyard' |
'Cold Spring Glen' |
'Another Time' |
'Lost Carcosa' |
'Central Hill' |
'Harborside' |
'Kingsport Head' |
'South Shore' |
'7th House on the Left' |
'Congregational Hospital' |
'St Erasmuss Home' |
'607 Water St' |
'North Point Lighthouse' |
'The Rope and Anchor' |
'Strange High House' |
'The Causeway' |
'Wireless Station' |
'Artists Colony' |
'Neils Curiosity Shop' |
'The Hall School' |
'The Underworld' |
'Unknown Kadath' |
'Church Green' |
'Factory District' |
'Innsmouth Shore' |
'Innsmouth Jail' |
'Jail Cell' |
'Sawbone Alley' |
'First National Grocery' |
'Gilman House Hotel' |
'Marsh Refinery' |
'Falcon Point' |
'Esoteric Order of Dagon' |
'Devil Reef' |
'Yha nthlei'


export interface Mythos {
  name: string,
  type: string,
  subtype: string,
  text: string[],
  clue: Location | Location[],
  clue_alt?: Location,
  gate: Location,
  gate_alt?: Location,
  doom_add?: number,
  terror_add?: number,
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
  starting_at: Location,
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

