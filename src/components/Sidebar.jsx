import { useAuth } from '../hooks/useAuth.js'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity=".9" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity=".6" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity=".6" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity=".3" />
      </svg>
    ),
  },
  {
    id: 'reportar',
    label: 'Reportar / Alertas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z"
          fill="currentColor"
          opacity=".85"
        />
      </svg>
    ),
  },
  {
    id: 'ocorrencias',
    label: 'Ocorrências',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="2" rx="1" fill="currentColor" />
        <rect x="3" y="9" width="10" height="2" rx="1" fill="currentColor" opacity=".7" />
        <rect x="3" y="14" width="7" height="2" rx="1" fill="currentColor" opacity=".4" />
        <circle cx="16" cy="14" r="3" fill="currentColor" opacity=".8" />
        <path d="M14.5 14l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity=".6" />
        <path d="M7 13l2-3 2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'auditoria',
    label: 'Auditoria',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity=".6" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'perfil',
    label: 'Perfil',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity=".8" />
        <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".6" />
      </svg>
    ),
  },
]

export default function Sidebar({ currentScreen, setCurrentScreen, onLogout }) {
  const { user } = useAuth()

  return (
    <aside
      className="sidebar-scroll flex flex-col w-[220px] min-w-[220px] h-screen bg-bg-sidebar shadow-sidebar overflow-y-auto"
      style={{ zIndex: 10 }}
    >
      {/* Brand */}
      <div className="px-5 pt-7 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-text-main flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L17 6v8l-7 4L3 14V6l7-4Z" fill="white" opacity=".9" />
              <path d="M10 2v14M3 6l7 4 7-4" stroke="#09162e" strokeWidth="1.2" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">SMDN</p>
            <p className="text-text-on-dark text-[10px] opacity-70 leading-tight">Vale do Paraíba-SP</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-150
                ${active
                  ? 'bg-text-main text-white shadow-sm'
                  : 'text-text-on-dark hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <span className={active ? 'text-white' : 'text-text-on-dark opacity-70'}>{item.icon}</span>
              <span className="truncate">{item.label}</span>
              {item.id === 'reportar' && (
                <span className="ml-auto bg-status-critical text-white text-[10px] font-bold px-1.5 py-0.5 rounded-badge leading-none">5</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-text-main/30 flex items-center justify-center flex-shrink-0">
              <span className="text-text-on-dark text-xs font-bold">
                {user.name?.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-text-on-dark text-[10px] opacity-60 truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-on-dark hover:bg-white/5 hover:text-white transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="opacity-60">
            <path d="M6.75 9H15.75M12.75 6l3 3-3 3M7.5 5.25H3.75A.75.75 0 0 0 3 6v6a.75.75 0 0 0 .75.75H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}
