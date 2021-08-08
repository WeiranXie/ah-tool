import { Store } from '@/store'
import { JsonData } from '@/types'

export interface Mythos {
  locations: string[],
  all: JsonData[],
  rumor_solved: false,
  current: {
    headline: JsonData,
    rumor: JsonData,
    environment: JsonData,
  },
  left: object[],
  count: number,
}

class MythosStore extends Store<Record<string, Mythos>> {
  protected data(): Record<string, Mythos> {
    return {
      mythos: {
        locations: [],
        all: [ {} ],
        rumor_solved: false,
        current: {
          headline: {},
          rumor: {},
          environment: {},
        },
        left: [],
        count: 0,
      } as Mythos,
    }
  }

  /* ========================================================================== *
  * Update state.mythos and local storage                                        *
  * -------------------------------------------------------------------------- */
  saveMythos(mythos: Mythos) {
    this.state.mythos = Object.assign({}, mythos)
    localStorage.setItem('mythos', JSON.stringify(mythos))
  }

  /* ========================================================================== *
  * Load mythos from local storage                                               *
  * -------------------------------------------------------------------------- */
  loadMythos() {
    if (localStorage.mythos) this.state.mythos = JSON.parse(localStorage.mythos)
  }
}

export const mythosStore: MythosStore = new MythosStore()
