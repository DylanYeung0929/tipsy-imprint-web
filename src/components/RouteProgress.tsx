import type { Route } from '../types'

const order: Route[] = ['home','session','generating','imprint']
export function RouteProgress({ route }: { route: Route }) {
  if (route === 'dashboard') return null
  const current = Math.max(0, order.indexOf(route))
  return <div className="fixed bottom-0 left-0 z-20 h-1 w-full bg-white/5" aria-hidden="true"><div className="h-full bg-amber-400 transition-transform duration-200 ease-out" style={{ transform: `scaleX(${(current + 1) / order.length})`, transformOrigin: 'left' }} /></div>
}
