import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno({ dark: 'class', attributify: false })],
  // transformers: [transformerVariantGroup()],
  shortcuts: {
    'wh-full': 'w-full h-full'
  }
})
