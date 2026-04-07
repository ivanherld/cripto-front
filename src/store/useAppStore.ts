import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Horizon = 'scalping' | 'swing' | 'position'

interface AppState {
  activeSymbol: string
  activeHorizon: Horizon
  activeTimeframe: string
  darkMode: boolean
  setSymbol: (symbol: string) => void
  setHorizon: (horizon: Horizon) => void
  setTimeframe: (timeframe: string) => void
  toggleDarkMode: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeSymbol: 'BTC',
      activeHorizon: 'swing',
      activeTimeframe: '1h',
      darkMode: false,
      setSymbol: (symbol) => set({ activeSymbol: symbol }),
      setHorizon: (horizon) => set({ activeHorizon: horizon }),
      setTimeframe: (timeframe) => set({ activeTimeframe: timeframe }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    {
      name: 'cryptolens-app-store',
      partialize: (state) => ({
        activeSymbol: state.activeSymbol,
        activeHorizon: state.activeHorizon,
        activeTimeframe: state.activeTimeframe,
        darkMode: state.darkMode,
      }),
    }
  )
)
