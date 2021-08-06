import { Store } from '@/store'
import { AO, Investigator } from '@/types'
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
    current: string,
  }
}

class SetupStore extends Store<Record<string, Setup>> {
  protected data(): Record<string, Setup> {
    return {
      setup: {
        exp: [],
        investigators: {
          all: [],
          current: [],
          devoured: [],
          left: [],
        },
        aos: {
          all: [],
          current: '',
        },
      } as Setup,
    }
  }

  /* ========================================================================== *
  * Update state.setup and local storage                                        *
  * -------------------------------------------------------------------------- */
  saveSetup(setup: Setup) {
    this.state.setup = Object.assign({}, setup)
    localStorage.setItem('setup', JSON.stringify(setup))
  }

  /* ========================================================================== *
  * Load setup from local storage                                               *
  * -------------------------------------------------------------------------- */
  loadSetup() {
    if (localStorage.setup) this.state.setup = JSON.parse(localStorage.setup)
  }
}

export const setupStore: SetupStore = new SetupStore()
