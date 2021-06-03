<!--==================================================================+
| WIDGET: BUTTON                                                      |
+===================================================================-->

<template>
  <label
    v-if="type === 'label'"
    :class="[`${final_color.border} bg-${final_color.bg} text-${final_color.text} hover:bg-${final_color.hover_bg} hover:text-${final_color.hover_text}`, size_classes, default_classes]"
  >
    <slot />
  </label>
  <a
    v-else-if="url === `/${$i18n.locale}/order` || type === 'link'"
    :href="url === `/${$i18n.locale}/order` ? `https://dev.juitnow.com/${$i18n.locale}/order` : url"
    :class="[`${final_color.border} bg-${final_color.bg} text-${final_color.text} group-hover:bg-${final_color.hover_bg} group-hover:text-${final_color.hover_text} hover:bg-${final_color.hover_bg} hover:text-${final_color.hover_text}`, size_classes, default_classes]"
  >
    <slot />
  </a>
  <router-link
    v-else-if="type === 'router-link'"
    :class="[`${final_color.border} bg-${final_color.bg} text-${final_color.text} group-hover:bg-${final_color.hover_bg} group-hover:text-${final_color.hover_text} hover:bg-${final_color.hover_bg} hover:text-${final_color.hover_text}`, size_classes, default_classes]"
    :to="url"
  >
    <slot />
  </router-link>
  <button
    v-else-if="type === 'submit'"
    :form="form"
    :class="[`${final_color.border} bg-${final_color.bg} text-${final_color.text} group-hover:bg-${final_color.hover_bg} group-hover:text-${final_color.hover_text} hover:bg-${final_color.hover_bg} hover:text-${final_color.hover_text}`, size_classes, default_classes]"
  >
    <slot />
  </button>
  <div
    v-else
    :class="[`${final_color.border} bg-${final_color.bg} text-${final_color.text} group-hover:bg-${final_color.hover_bg} group-hover:text-${final_color.hover_text} hover:bg-${final_color.hover_bg} hover:text-${final_color.hover_text}`, size_classes, default_classes]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  interface Color {
    bg: string;
    text: string;
    hover_bg: string;
    hover_text: string;
    border: string;
  }

  export default defineComponent({
    name: 'JuitButton',
    props: {
      theme: {
        type: String,
        default: 'green',
      },
      type: {
        type: String,
        default: 'router-link',
      },
      form: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '#',
      },
      size: {
        type: String,
        default: 'default',
      },
      transparent: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      default_classes: 'cursor-pointer inline-block rounded hover:no-underline justify-center transition-all',
    }),
    computed: {
      orig_color(): Color {
        switch (this.theme) {
          case 'dark':
            return {
              bg: 'textblue',
              text: 'bg',
              hover_bg: 'textbluehover',
              hover_text: 'bg',
              border: '',
            }
          case 'green_old':
            return {
              bg: 'dgreen_old',
              text: 'bg',
              hover_bg: 'hgreen_old',
              hover_text: 'bg',
              border: '',
            }
          default:
            return {
              bg: 'dgreen',
              text: 'bg',
              hover_bg: 'hgreen',
              hover_text: 'bg',
              border: '',
            }
        }
      },
      final_color(): Color {
        const obj = Object.assign({}, this.orig_color)
        if (this.transparent || this.type === 'label') {
          obj.text = this.orig_color.bg
          obj.border = `border border-${this.orig_color.bg} hover:border-${this.orig_color.hover_bg}`
          obj.bg = 'transparent'
        }
        return obj
      },
      size_classes() {
        let str = 'px-8 py-1.5 md:py-2 font-semibold text-base md:text-md'
        if (this.type === 'label') str = `text-sm px-5 py-1 md:py-1.5 checked-sibling:bg-${this.orig_color.bg} checked-sibling:text-${this.orig_color.text}`
        if (this.size === 'custom') str = ''
        if (this.size === 'sm') str = 'text-sm md:text-base font-semibold px-5 py-1 md:py-1.5'
        return str
      },
    },
  })
</script>
