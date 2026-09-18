import { motion } from 'motion/react'
import type { SensorPoint } from '../types'

const WIDTH = 520
const HEIGHT = 150
const toPath = (points: SensorPoint[], key: keyof SensorPoint, min: number, max: number) => {
  const coords = points.map((point, index) => ({ x: (index / (points.length - 1)) * WIDTH, y: HEIGHT - ((point[key] - min) / (max - min)) * HEIGHT }))
  if (coords.length < 2) return ''
  return coords.slice(1).reduce((path, point, index) => {
    const previous = coords[index]
    const cx = (previous.x + point.x) / 2
    return `${path} C ${cx} ${previous.y}, ${cx} ${point.y}, ${point.x} ${point.y}`
  }, `M ${coords[0].x} ${coords[0].y}`)
}

export function SensorChart({ points }: { points: SensorPoint[] }) {
  const values = points.map(point => point.value)
  const weightMin = Math.max(0, Math.min(...values) - 2)
  const weightMax = Math.max(weightMin + 8, Math.max(...values) + 2)
  const weightPath = toPath(points, 'value', weightMin, weightMax)
  const motionPath = toPath(points, 'motion', 0, 2.2)
  return <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[.025] p-4 shadow-[0_0_50px_rgba(34,211,238,.06)]"><div className="mb-3 flex items-center justify-between text-xs"><span className="font-semibold text-white/55">实时传感流</span><span className="flex gap-4"><i className="not-italic text-amber-300">重量</i><i className="not-italic text-cyan-300">运动</i></span></div><svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-40 w-full overflow-visible" role="img" aria-label="实时重量和运动强度曲线"><defs><filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g className="text-white/5">{[0,1,2,3].map(i => <line key={i} x1="0" y1={i*50} x2={WIDTH} y2={i*50} stroke="currentColor" />)}</g><motion.path d={weightPath} fill="none" stroke="#fbbf24" strokeWidth="2.2" filter="url(#glow)" animate={{d:weightPath}} transition={{duration:.38,ease:'easeOut'}} /><motion.path d={motionPath} fill="none" stroke="#67e8f9" strokeWidth="1.8" filter="url(#glow)" animate={{d:motionPath}} transition={{duration:.32,ease:'easeOut'}} /><motion.line y1="0" y2={HEIGHT} stroke="#fff" strokeOpacity=".22" animate={{x1:[0,WIDTH],x2:[0,WIDTH]}} transition={{duration:2.8,repeat:Infinity,ease:'linear'}} /></svg></div>
}
