import { useState } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'

const MOCK_DATA = {
  activeOccurrences: 12,
  activeAlerts: 5,
  criticalSeverity: 3,
  resolvedToday: 18,
  recentOccurrences: [
    { id: 1, title: 'Enchente em Jardim Aquarius', severity: 'critical', city: 'São José dos Campos', time: '10 min atrás', coords: [45, 38] },
    { id: 2, title: 'Deslizamento na Serra', severity: 'severe', city: 'Caraguatatuba', time: '25 min atrás', coords: [72, 55] },
    { id: 3, title: 'Queda de árvore', severity: 'regular', city: 'Taubaté', time: '1h atrás', coords: [38, 62] },
    { id: 4, title: 'Incêndio em vegetação', severity: 'severe', city: 'Jacareí', time: '2h atrás', coords: [28, 44] },
    { id: 5, title: 'Temporal previsto', severity: 'regular', city: 'Guaratinguetá', time: '3h atrás', coords: [65, 72] },
  ],
}

const SEVERITY_CONFIG = {
  critical: { label: 'Crítico', cls: 'badge-critical', dotColor: '#c60202', ringColor: 'rgba(198,2,2,0.2)' },
  severe: { label: 'Grave', cls: 'badge-severe', dotColor: '#ff6a00', ringColor: 'rgba(255,106,0,0.2)' },
  regular: { label: 'Moderado', cls: 'badge-regular', dotColor: '#cab900', ringColor: 'rgba(202,185,0,0.2)' },
}

export default function Dashboard() {
  const [selectedOcc, setSelectedOcc] = useState(null)

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title-medium font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Monitoramento em tempo real – Vale do Paraíba-SP</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-status-success bg-status-success-bg border border-status-success/20 px-3 py-1.5 rounded-badge">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse2 block" />
          Ao vivo
        </div>
      </div>

      {/* Stat counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'OCORRÊNCIAS ATIVAS', value: MOCK_DATA.activeOccurrences, color: 'text-status-critical', bg: 'bg-status-critical-bg', icon: '🔴' },
          { label: 'ALERTAS ATIVOS', value: MOCK_DATA.activeAlerts, color: 'text-status-severe', bg: 'bg-status-severe-bg', icon: '🟠' },
          { label: 'SEVERIDADE CRÍTICA', value: MOCK_DATA.criticalSeverity, color: 'text-status-critical', bg: 'bg-status-critical-bg', icon: '⚠️' },
          { label: 'RESOLVIDAS HOJE', value: MOCK_DATA.resolvedToday, color: 'text-status-success', bg: 'bg-status-success-bg', icon: '✅' },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4 py-4">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-xl flex-shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-label text-slate-500">{s.label}</p>
              <p className={`text-3xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border-soft flex items-center justify-between">
            <h3 className="text-card-title font-bold text-slate-800">Mapa Geoespacial</h3>
            <span className="text-xs text-slate-400">Integração com Mapbox/Leaflet via Supabase</span>
          </div>
          {/* Map placeholder with SVG pins */}
          <div className="relative h-80 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
            {/* Fake grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[10,20,30,40,50,60,70,80,90].map((v) => (
                <g key={v}>
                  <line x1={v} y1="0" x2={v} y2="100" stroke="#44769b" strokeWidth="0.3" />
                  <line x1="0" y1={v} x2="100" y2={v} stroke="#44769b" strokeWidth="0.3" />
                </g>
              ))}
            </svg>
            {/* Fake road */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 320" preserveAspectRatio="none">
              <path d="M0 160 Q100 140 200 160 T400 155" stroke="#44769b" strokeWidth="2" fill="none" />
              <path d="M0 100 Q80 120 160 100 T320 110 T400 100" stroke="#44769b" strokeWidth="1.5" fill="none" />
              <path d="M100 0 Q110 80 100 160 T110 320" stroke="#44769b" strokeWidth="1.5" fill="none" />
              <path d="M280 0 Q290 100 280 200 T285 320" stroke="#44769b" strokeWidth="1" fill="none" />
            </svg>
            {/* Pins */}
            {MOCK_DATA.recentOccurrences.map((occ) => {
              const cfg = SEVERITY_CONFIG[occ.severity]
              return (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOcc(occ)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${occ.coords[0]}%`, top: `${occ.coords[1]}%` }}
                >
                  <span
                    className="block w-6 h-6 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125"
                    style={{ backgroundColor: cfg.dotColor, boxShadow: `0 0 0 4px ${cfg.ringColor}` }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-7 bg-slate-800/90 text-white text-[10px] font-semibold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    {occ.title}
                  </span>
                </button>
              )
            })}
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm border border-border-soft rounded-lg px-3 py-2 flex items-center gap-3 text-xs text-slate-600">
              {Object.entries(SEVERITY_CONFIG).map(([k, v]) => (
                <span key={k} className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full block flex-shrink-0" style={{ backgroundColor: v.dotColor }} />
                  {v.label}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Occurrences list */}
        <Card className="p-0 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-border-soft">
            <h3 className="text-card-title font-bold text-slate-800">Ocorrências Recentes</h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border-soft">
            {MOCK_DATA.recentOccurrences.map((occ) => {
              const cfg = SEVERITY_CONFIG[occ.severity]
              return (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOcc(occ)}
                  className="w-full flex items-start gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: cfg.dotColor }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-slate-800 truncate">{occ.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{occ.city} · {occ.time}</p>
                  </div>
                  <span className={cfg.cls}>{cfg.label}</span>
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Occurrence Detail Modal */}
      <Modal isOpen={!!selectedOcc} onClose={() => setSelectedOcc(null)} title="Detalhes da Ocorrência" size="sm">
        {selectedOcc && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{selectedOcc.title}</span>
              <span className={SEVERITY_CONFIG[selectedOcc.severity].cls}>{SEVERITY_CONFIG[selectedOcc.severity].label}</span>
            </div>
            <dl className="space-y-2 text-sm">
              <div><dt className="text-label text-slate-400">MUNICÍPIO</dt><dd className="text-slate-700 font-medium mt-0.5">{selectedOcc.city}</dd></div>
              <div><dt className="text-label text-slate-400">REPORTADO</dt><dd className="text-slate-700 font-medium mt-0.5">{selectedOcc.time}</dd></div>
            </dl>
            <div className="flex justify-end gap-3 pt-2 border-t border-border-soft">
              <button className="btn-ghost" onClick={() => setSelectedOcc(null)}>Fechar</button>
              <button className="btn-primary">Ver Ocorrência Completa</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
