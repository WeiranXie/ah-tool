import { Store } from '@/store'

class LocationStore extends Store<Record<string, Record<string, unknown> | null>> {
  protected data(): Record<string, Record<string, unknown> | null> {
    return {
      location: null,
    }
  }

  /* ========================================================================== *
  * Update state.location and local storage                                     *
  * -------------------------------------------------------------------------- */
  saveNewLocation(location: Record<string, unknown>) {
    this.state.location = Object.assign({}, location)
    localStorage.setItem('location', JSON.stringify(location))
  }

  /* ========================================================================== *
  * Load location from local storage                                            *
  * -------------------------------------------------------------------------- */
  loadLocation() {
    if (localStorage.location) this.state.location = JSON.parse(localStorage.location)
  }
}

export const locationStore: LocationStore = new LocationStore()
