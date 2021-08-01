const plugin = require('tailwindcss/plugin')

// colors
const bg = 'rgb(247,244,236)'
const text = 'rgb(87,87,87)'
const textblue = 'rgb(59,50,125)'
const textbluehover = 'rgb(100,110,185)'
const textyellow = 'rgb(255,209,32)'
const hgreen = 'rgb(16,140,8)'
const dgreen = 'rgb(5,105,35)'
const hgreen_old = 'rgb(0,175,125)'
const dgreen_old = 'rgb(4,84,87)'

// start
module.exports = {
  purge: {
    content: [ 'src/**/*.vue' ],
    options: {
      safelist: {
        greedy: [ /^delay-/, /^list-/, /-bg$/, /-lg$/, /-dgreen$/, /-hgreen$/, /-dgreen_old$/, /-hgreen_old$/, /-text$/, /-textblue$/, /-textyellow$/ ],
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      h: [ '"IM Fell DW Pica"', 'Times', 'serif', 'huiwenMing' ],
      t: [ '"PT Sans"', 'Helvetica', 'Arial', 'sans-serif', 'huiwenMing' ],
      c: [ '"loveLetter"', 'Times', 'serif', 'huiwenMing' ],
      ca: [ '"courierPolski"', 'Times', 'serif', 'huiwenMing' ],
    },
    screens: {
      tablet: '814px',
    },
    inset: {
      '0': 0,
      'auto': 'auto',
      '1/2': '50%',
      '8': '2rem',
      '-10': '-3rem',
      'full': '100%',
    },
    extend: {
      backgroundImage: (theme) => ({
        'texture': 'url(\'../src/assets/secbg.jpg\')',
      }),
      gradientColorStops: (theme) => ({
        ...theme('colors'),
        'bg-75': 'rgba(247,244,236,.75)',
        'bg-50': 'rgba(247,244,236,.5)',
        'bg-0': 'rgba(247,244,236,0)',
        'bg': bg,
        'hgreen': hgreen,
        'dgreen': dgreen,
        'hgreen_old': hgreen_old,
        'dgreen_old': dgreen_old,
      }),
      borderColor: (theme) => ({
        ...theme('colors'),
        border: 'rgba(0,0,0,0.1)',
        bg: bg,
        text: text,
        textblue: textblue,
        textbluehover: textbluehover,
        textyellow: textyellow,
        hgreen: hgreen,
        dgreen: dgreen,
        hgreen_old: hgreen_old,
        dgreen_old: dgreen_old,
      }),
      textColor: (theme) => ({
        ...theme('colors'),
        bg: bg,
        text: text,
        textblue: textblue,
        textbluehover: textbluehover,
        textyellow: textyellow,
        hgreen: hgreen,
        dgreen: dgreen,
        hgreen_old: hgreen_old,
        dgreen_old: dgreen_old,
      }),
      backgroundColor: (theme) => ({
        ...theme('colors'),
        bg: bg,
        text: text,
        textblue: textblue,
        textbluehover: textbluehover,
        textyellow: textyellow,
        hgreen: hgreen,
        dgreen: dgreen,
        hgreen_old: hgreen_old,
        dgreen_old: dgreen_old,
      }),
      transitionDelay: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1100': '1100ms',
        '1200': '1200ms',
        '1300': '1300ms',
        '1400': '1400ms',
        '1500': '1500ms',
        '1600': '1600ms',
        '1700': '1700ms',
        '1800': '1800ms',
        '1900': '1900ms',
        '2000': '2000ms',
        '2100': '2100ms',
        '2200': '2200ms',
        '2300': '2300ms',
        '2400': '2400ms',
        '2500': '2500ms',
      },
      letterSpacing: {
        tight: '-0.5px',
      },
      flex: {
        '1/3': '1 1 32%',
        '1/2': '1 1 46%',
      },
      minHeight: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      maxHeight: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      maxWidth: {
        '1/2': '50%',
      },
      height: {
        hero: '80vh',
      },
      listStyleType: {
        square: 'square',
        circle: 'circle',
      },
      borderRadius: {
        '100': '100%',
      },
      boxShadow: {
        'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'y-only': '0px 8px 6px -5px rgba(0, 0, 0, 0.1)',
        'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 30px 55px -15px rgba(0, 0, 0, 0.4)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      scale: {
        0: '0',
        40: '.4',
        45: '.45',
        50: '.5',
        55: '.55',
        75: '.75',
        80: '.8',
        90: '.9',
        95: '.95',
        100: '1',
        105: '1.05',
        110: '1.1',
        120: '1.2',
        125: '1.25',
        150: '1.5',
        200: '2',
      },
      translate: {
        '1/2': '50%',
        '-1/2': '-50%',
      },
      keyframes: {
        zoomin: {
          '0%': { transform: 'scale(1.05)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideinleft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideintop: {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideinbot: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideouttop: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-50px)', opacity: '0' },
        },
        slideloop: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        updownloop: {
          '0%': { transform: 'translateY(-0.5rem)' },
          '50%': { transform: 'translateY(0.5rem)' },
          '100%': { transform: 'translateY(-0.5rem)' },
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeout: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      zIndex: {
        '1000': '1000',
        '-1': '-1',
        '-2': '-2',
        '-10': '-10',
      },
      animation: {
        slideloop: 'slideloop 2s linear infinite',
        zoomin: 'zoomin 0.75s ease-in-out forwards',
        heroheight: '',
        slideinleftdelay: 'slideinleft 0.5s 0.6s ease-in-out forwards',
        slideintopdelay: 'slideintop 0.4s 1s ease-in-out forwards',
        slideinbotdelay: 'slideinbot 0.4s 0.3s ease-in-out forwards',
        slideintop: 'slideintop 0.5s ease-in-out forwards',
        slideouttop: 'slideouttop 0.5s ease-in-out forwards',
        fadein: 'fadein 0.5s ease-in-out forwards',
        fadeout: 'fadeout 0.5s ease-in-out forwards',
        updownloop: 'updownloop 1.5s ease-in-out infinite',
        fadeindelay: 'fadein 0.5s 1.2s ease-in-out forwards',
      },
    },
  },
  variants: {
    extend: {
      animation: [ 'first' ],
      backgroundColor: [ 'active', 'checked-sibling', 'hover', 'group-hover' ],
      borderWidth: [ 'first', 'responsive', 'child-of-first-child' ],
      borderColor: [ 'active', 'hover', 'group-hover' ],
      boxShadow: [ 'responsive', 'hover', 'focus', 'active', 'group-hover' ],
      margin: [ 'hover', 'group-hover' ],
      maxHeight: [ 'hover' ],
      opacity: [ 'first' ],
      padding: [ 'first' ],
      pointerEvents: [ 'hover', 'group-hover', 'checked-sibling' ],
      textColor: [ 'active', 'checked-sibling' ],
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('checked-sibling', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `:checked + .checked-sibling\\:${rule.selector.slice(1)}`
        })
      })
      addVariant('child-of-first-child', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `:first-child > .child-of-first-child\\:${rule.selector.slice(1)}`
        })
      })
      addVariant('child-list-of-list', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `li > ul > .child-list-of-list\\:${rule.selector.slice(1)}`
        })
      })
    }),
  ],
}
