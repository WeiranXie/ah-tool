import { Store } from '@/store'

class ScreenStore extends Store<Record<string, boolean>> {
  protected data(): Record<string, boolean> {
    return {
      exps: true,
      investigators: false,
      aos: false,
      mythos: false,
      ah_encounters: false,
      ow_encounters: false,
    }
  }

  /* ========================================================================== *
  * Update screen active status                                                 *
  * -------------------------------------------------------------------------- */
  updateScreen(ref: string, s: boolean) {
    if (ref in this.state) this.state[ref] = s
  }
}

export const screenStore: ScreenStore = new ScreenStore()
