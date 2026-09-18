export type Route = 'home' | 'session' | 'generating' | 'imprint' | 'dashboard' | 'detail-clink' | 'detail-ai' | 'detail-memory' | 'detail-ui' | 'privacy' | 'terms'

export type Metric = { label: string; value: string; unit?: string }
export type SensorPoint = { value: number; motion: number }
export type InteractionEvent = { id: number; label: string; detail: string }
export type ActionKind = 'lift' | 'swirl' | 'sip'
export type SessionSummary = { drink: string; drinkIndex: number; liftCount: number; swirlCount: number; sipCount: number; durationSeconds: number; remainingWeight: number; imprint: string }
