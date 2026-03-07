import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, ListTodo, BarChart3, Bot } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '프로젝트 목록' },
  { to: '/care-level', icon: Settings, label: '케어 레벨 설정' },
  { to: '/task-monitor', icon: ListTodo, label: '태스크 현황' },
  { to: '/stats', icon: BarChart3, label: '통계 대시보드' },
];

export default function SideNav() {
  return (
    <aside className="w-60 bg-[#1A2B4A] text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-lg tracking-tight">TaskPilot</span>
        </div>
        <p className="text-xs text-white/50 mt-1">태스크 품질 AI 코파일럿</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/40">Powered by Claude 3.5</div>
      </div>
    </aside>
  );
}
