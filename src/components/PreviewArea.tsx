import { 
  Settings, User, Home, Users, Building2, Handshake, CheckSquare, 
  Clock, Database, Calendar, ListTodo, DollarSign, Target, 
  Lightbulb, Trophy, AlertTriangle, Activity, TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function PreviewArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const DESKTOP_WIDTH = 1440;
  const DESKTOP_HEIGHT = 900;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleX = clientWidth / DESKTOP_WIDTH;
        const scaleY = clientHeight / DESKTOP_HEIGHT;
        setScale(Math.min(scaleX, scaleY, 1));
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { icon: Home, label: 'Головна', active: true },
    { icon: Users, label: 'Метчі' },
    { icon: Building2, label: "Об'єкти" },
    { icon: User, label: 'Контакти' },
    { icon: Handshake, label: 'Угоди' },
    { icon: CheckSquare, label: 'Мої задачі' },
    { icon: Clock, label: 'Розклад' },
    { icon: Database, label: 'База OLX' },
    { icon: Calendar, label: 'Календар' },
    { icon: ListTodo, label: 'Завдання' },
  ];

  const statCards = [
    { title: "Всі об'єкти", value: 57, icon: Building2, color: 'text-[var(--color-badge-warning-text)]' },
    { title: 'Всі закриті угоди', value: 0, icon: CheckCircle2, color: 'text-[var(--color-badge-success-text)]' },
    { title: 'Конверсія лідів', value: '0%', icon: Target, color: 'text-[var(--color-badge-info-text)]' },
  ];

  const quickActions = [
    { name: "Створити об'єкт", icon: Building2 },
    { name: "Запланувати зустріч", icon: Clock },
    { name: "Новий клієнт", icon: Users },
    { name: "Нова угода", icon: Handshake },
  ];

  const recentActivity = [
    { manager: 'Роман К.', action: "оновив об'єкт", title: 'вул. Хрещатик, 24', time: 'щойно', type: 'property', initials: 'РК' },
    { manager: 'Олена М.', action: 'закрив угоду', title: 'пр. Свободи, 12', time: '12 хв тому', type: 'deal', initials: 'ОМ' },
    { manager: 'Іван Д.', action: 'оновив клієнта', title: 'Олексій (Покупець)', time: '2 год тому', type: 'client', initials: 'ІД' },
    { manager: 'Марія В.', action: "оновив об'єкт", title: 'вул. Стрийська, 45', time: '5 год тому', type: 'property', initials: 'МВ' },
    { manager: 'Роман К.', action: 'офер', title: 'вул. Шевченка, 100', time: '1 д тому', type: 'deal', initials: 'РК' },
  ];

  const topManagers = [
    { name: 'Роман К.', deals: 5, amount: 250000 },
    { name: 'Олена М.', deals: 3, amount: 150000 },
    { name: 'Іван Д.', deals: 1, amount: 50000 },
  ];

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center overflow-hidden rounded-[24px] bg-black/5"
    >
      <div 
        style={{
          width: DESKTOP_WIDTH,
          height: DESKTOP_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
        className="relative shrink-0 overflow-hidden shadow-2xl rounded-[24px] app-fixed-bg app-page-shell"
      >
        {/* Sidebar */}
        <aside className="asset-sidebar xatosfera-sidebar absolute top-0 left-0 h-full flex flex-col z-20 py-6 border-r border-[var(--color-border-main)] bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-6">
            <div className="w-10 h-10 rounded-md border border-primary/30 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-secondary rounded-full -rotate-45" />
              </div>
            </div>
            <div>
              <div className="font-bold text-lg leading-tight text-primary">Хатосфера</div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Агенція Нерухомості</div>
            </div>
          </div>
          
          {/* Menu */}
          <nav className="space-y-1 px-4 flex-1 overflow-y-auto">
            {menuItems.map((item, i) => (
              <a key={i} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${item.active ? 'bg-[var(--color-sidebar-active-bg)] text-[var(--color-sidebar-active-text)] font-medium' : 'text-[var(--color-sidebar-text)] hover:brightness-125 font-medium'}`}>
                <item.icon size={20} className={item.active ? 'text-[var(--color-sidebar-active-text)]' : ''} />
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </nav>
          
          {/* User Profile */}
          <div className="mt-6 pt-4 flex items-center justify-between px-6 border-t border-[var(--color-border-main)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface/30 border border-border/20 flex items-center justify-center font-bold text-sm text-[var(--color-text-muted)]">Р</div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-main)]">Роман К.</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Суперадмін</div>
              </div>
            </div>
            <Settings size={16} className="text-[var(--color-text-muted)] hover:text-primary cursor-pointer transition-colors" />
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="xatosfera-main-content absolute inset-0 z-10 flex flex-col">
          <main className="flex-1 overflow-y-auto app-content px-6 md:px-10 py-6 relative z-10">
            <div className="min-h-screen overflow-hidden space-y-6">
              
              {/* PageHeader mock */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between md:items-start pt-2">
                <h1 className="text-2xl font-medium flex items-center gap-3 text-[var(--color-text-main)]">
                  <Home size={28} className="text-primary" />
                  Панель керування
                </h1>
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-background)]/35 p-2 px-4">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-badge-success-text)]">
                    <DollarSign className="h-4 w-4" /> USD: 41.50
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-badge-warning-text)]">
                    <span className="text-xs font-bold">€</span> EUR: 45.20
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <span className="text-[10px] uppercase tracking-wide px-1 text-[var(--color-text-muted)]">НБУ</span>
                </div>
              </div>
              
              {/* Stat Cards */}
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {statCards.map((item, i) => (
                  <div key={i} className="rounded-lg bg-[var(--color-card-bg)] text-[var(--color-card-text)] border border-[var(--color-card-border)] p-1 transition-colors shadow-sm">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex gap-2 items-center">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                        <p className="text-sm text-[var(--color-text-muted)]">{item.title}</p>
                      </div>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Main Dashboard Grid */}
              <div className="grid items-stretch gap-6 md:grid-cols-2">
                
                {/* Recent Activity */}
                <div className="rounded-xl border border-[var(--color-border-main)] bg-[var(--color-background)]/35 flex flex-col shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 className="text-base font-semibold leading-none tracking-tight flex flex-wrap items-center gap-2">
                      <Activity className="h-4 w-4 text-orange-500" />
                      <span className="text-[var(--color-text-main)]/80">Остання активність</span>
                      <span className="w-full text-[11px] font-normal text-[var(--color-text-muted)] sm:ml-auto sm:w-auto sm:text-xs">Натисни щоб побачити всі</span>
                    </h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="space-y-3 mt-4">
                      {recentActivity.map((item, i) => (
                        <div key={i} className="flex gap-3 border-b border-[var(--color-border-main)] pb-3 text-sm last:border-0 last:pb-0">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${
                            item.type === 'deal' ? 'border-[var(--color-badge-success-bg)] bg-[var(--color-badge-success-bg)] text-[var(--color-badge-success-text)]' :
                            item.type === 'property' ? 'border-[var(--color-badge-warning-bg)] bg-[var(--color-badge-warning-bg)] text-[var(--color-badge-warning-text)]' :
                            'border-[var(--color-badge-info-bg)] bg-[var(--color-badge-info-bg)] text-[var(--color-badge-info-text)]'
                          }`}>
                            {item.initials}
                          </div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="leading-snug break-words">
                              <span className="font-medium text-[var(--color-text-main)]">{item.manager}</span>{' '}
                              <span className="text-[var(--color-text-muted)]">{item.action}</span>{' '}
                              <button type="button" className="text-[var(--color-text-main)] underline-offset-2 hover:underline break-words text-left">
                                {item.title}
                              </button>
                            </p>
                            <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex h-full flex-col gap-4">
                  {/* Quick Actions */}
                  <div className="rounded-xl border bg-[var(--color-card-bg)] text-[var(--color-card-text)] shadow-sm flex flex-[2] flex-col border-[var(--color-card-border)]">
                    <div className="flex flex-col space-y-1.5 p-6 pb-3">
                      <h3 className="text-base font-semibold leading-none tracking-tight flex items-center gap-2 font-normal text-[var(--color-text-main)]/80">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Швидкі дії
                      </h3>
                    </div>
                    <div className="p-6 pt-0 grid flex-1 content-center grid-cols-2 gap-3">
                      {quickActions.map((action, i) => (
                        <button key={i} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground shadow-sm h-auto min-h-[4rem] py-3 flex-col gap-1.5">
                          <action.icon className="h-4 w-4 shrink-0" />
                          <span className="text-center text-xs leading-tight whitespace-normal">{action.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tip of the day */}
                  <div className="rounded-xl border bg-[var(--color-card-bg)] text-[var(--color-card-text)] shadow-sm flex-1 border-[var(--color-card-border)]">
                    <div className="flex flex-col space-y-1.5 p-6 pb-2">
                      <h3 className="text-base font-semibold leading-none tracking-tight flex items-center gap-2 text-sm text-[var(--color-badge-warning-text)]">
                        <Lightbulb className="h-4 w-4" />
                        Порада дня
                      </h3>
                    </div>
                    <div className="p-6 pt-0">
                      <p className="text-sm leading-relaxed text-primary/80">"Не продавай квадратні метри — продавай рішення для життя клієнта."</p>
                      <p className="mt-2 text-right text-xs text-primary">— Поради нерухомості</p>
                    </div>
                  </div>
                </div>

                {/* Database Status */}
                <div className="rounded-xl border shadow-sm border-[var(--color-badge-warning-bg)] dashboard-database-status-card--warning bg-[var(--color-card-bg)] text-[var(--color-card-text)]">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 className="text-base font-semibold leading-none tracking-tight flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-[var(--color-badge-warning-text)]" />
                      Статус бази даних
                    </h3>
                  </div>
                  <div className="p-6 pt-0 space-y-3 mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Активні об'єкти без фото</span>
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-[var(--color-badge-warning-bg)] bg-[var(--color-badge-warning-bg)] text-[var(--color-badge-warning-text)]">3</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Активні клієнти без нотаток</span>
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-[var(--color-badge-success-bg)] bg-[var(--color-badge-success-bg)] text-[var(--color-badge-success-text)]">0</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Клієнтів без взаємодії</span>
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-[var(--color-badge-success-bg)] bg-[var(--color-badge-success-bg)] text-[var(--color-badge-success-text)]">0</div>
                    </div>
                    <p className="pt-1 text-xs font-medium text-[var(--color-badge-warning-text)]">⚠ Є записи що потребують уваги</p>
                  </div>
                </div>

                {/* Top Managers */}
                <div className="rounded-xl border bg-[var(--color-card-bg)] text-[var(--color-card-text)] shadow-sm border-[var(--color-card-border)]">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 className="text-base font-semibold leading-none tracking-tight flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      Топ агентів
                    </h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <table className="w-full min-w-[280px] text-sm mt-2">
                        <thead>
                          <tr className="border-b border-[var(--color-border-main)] text-left text-[var(--color-text-muted)]">
                            <th className="pb-2 font-medium">Агент</th>
                            <th className="pb-2 text-center font-medium w-16">Угоди</th>
                            <th className="pb-2 text-right font-medium w-24">Сума</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topManagers.map((manager, index) => (
                            <tr key={index} className="border-b border-[var(--color-border-main)] last:border-0">
                              <td className="py-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                                    index === 0 ? 'border-[var(--color-badge-warning-bg)] bg-[var(--color-badge-warning-bg)] text-[var(--color-badge-warning-text)]' : 
                                    'border-white/15 bg-white/[0.07] text-[var(--color-card-text)] opacity-60'
                                  }`}>
                                    {index + 1}
                                  </span>
                                  <span className="truncate">{manager.name}</span>
                                </div>
                              </td>
                              <td className="py-3 text-center font-bold">{manager.deals}</td>
                              <td className="py-3 text-right text-xs font-bold text-[var(--color-badge-success-text)]">
                                {manager.amount.toLocaleString('uk-UA')} $
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
