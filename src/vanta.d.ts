declare module 'vanta/dist/vanta.waves.min' {
  const createWaves: (options: Record<string, unknown>) => { destroy: () => void }
  export default createWaves
}
