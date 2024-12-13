import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: 'autoUpdate',
  manifest: {
    "short_name": "EuroScores",
    "name": "EuroScores Application",
    "description": "Provides the scores for the Euro 2024.",
    "start_url": "/euroscores/",
    "background_color": "#000000",
    "display": "standalone",
    "scope": "/euroscores/",
    "theme_color": "#000000",
    "icons": [
      {
        "src": "/euroscores/icons/android-chrome-192x192.png",
        "type": "image/png",
        "sizes": "192x192",
        "purpose": "any"
      },
      {
        "src": "/euroscores/icons/android-chrome-512x512.png",
        "type": "image/png",
        "sizes": "512x512",
        "purpose": "any"
      },
      {
        "src": "/euroscores/icons/maskable_icon.png",
        "type": "image/png",
        "sizes": "512x512",
        "purpose": "maskable"
      }
    ]
  }
}

export default defineConfig({
  base: '/euroscores/',
  plugins: [
    react(),
    VitePWA(manifestForPlugin)
  ]
})