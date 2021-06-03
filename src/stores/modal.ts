import { Store } from '@/store'
import { Product } from '@juitnow/lib-schema-types'

interface Modal {
  state: string;
  in_transition: boolean;
  content: null | Product;
}

class ModalStore extends Store<Record<string, Modal>> {
  protected data(): Record<string, Modal> {
    return {
      zip: {
        state: 'hidden',
        in_transition: false,
        content: null,
      } as Modal,
      carousel: {
        state: 'hidden',
        in_transition: false,
        content: null,
      } as Modal,
    }
  }

  /* ========================================================================== *
  * Show and hide modals                                                        *
  * -------------------------------------------------------------------------- */
  juitModal(modal_ref: string, action: string) {
    if (this.state[modal_ref] && !this.state.in_transition) {
      this.state[modal_ref].in_transition = true
      this.state[modal_ref].state = action !== 'show' ? 'hiding' : 'showing'
      console.log(modal_ref.toUpperCase(), 'MODAL', action.toUpperCase())
      setTimeout(() => {
        this.state[modal_ref].state = action !== 'show' ? 'hidden' : 'shown'
        this.state[modal_ref].in_transition = false
      }, 400)
    }
  }

  /* ========================================================================== *
  * Update modal content                                                        *
  * -------------------------------------------------------------------------- */
  updateContent(modal_ref: string, content: Product) {
    if (this.state[modal_ref]) {
      this.state[modal_ref].content = Object.assign({}, content)
    }
  }
}

export const modalStore: ModalStore = new ModalStore()
