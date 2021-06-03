import { App, ComponentPublicInstance } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $nutrition: typeof nutrition;
    $currency: typeof currency;
  }
}

// Our "this.$nutrition" function available to every component
function nutrition(
    this: ComponentPublicInstance,
    value: number | undefined,
    unit: string,
    weight = 100,
    decimals = 1,
) {
  const v = value ? value * weight / 100 : 0
  const format: Intl.NumberFormatOptions = { style: 'decimal', useGrouping: true }
  let digits = -1
  switch (decimals) {
    case 0:
      digits = 0
      break
    case 1:
      digits = v >= 10 ? 0 : 1
      break
    case 2:
      digits = v >= 1 ? 1 : 2
      break
  }
  if (digits >= 0) {
    format.minimumFractionDigits = digits
    format.maximumFractionDigits = digits
  }
  return `${new Intl.NumberFormat(this.$i18n.locale, format).format(v)}\u00A0${unit}`
}

// Our "this.$currency" function available to every component
function currency(locale: string, num: number) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(num)
}

// Install a global mixin in Vue
export default {
  install(app: App): void {
    app.mixin({
      methods: {
        $nutrition: nutrition,
        $currency: currency,
      },
    })
  },
}
