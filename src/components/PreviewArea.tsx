import { 
  Settings, User,
  Home, Users, Building2, Handshake, CheckSquare, 
  Clock, Database, Calendar, ListTodo, DollarSign, Euro, 
  Target, FilePlus2, Lightbulb, Trophy, AlertTriangle, Activity, Zap
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
        <aside className="asset-sidebar xatosfera-sidebar absolute top-0 left-0 h-full flex flex-col z-20 py-6 border-r border-border/10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-6">
            <div className="w-10 h-10 rounded-md border border-primary/30 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-secondary rounded-full -rotate-45" />
              </div>
            </div>
            <div>
              <div className="font-bold text-lg leading-tight text-primary">Хатосфера</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Агенція Нерухомості</div>
            </div>
          </div>
          
          {/* Menu */}
          <nav className="space-y-1 px-4 flex-1 overflow-y-auto">
            {menuItems.map((item, i) => (
              <a key={i} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${item.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-surface/20 font-medium'}`}>
                <item.icon size={20} className={item.active ? 'text-primary' : ''} />
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </nav>
          
          {/* User Profile */}
          <div className="mt-6 pt-4 flex items-center justify-between px-6 border-t border-border/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface/30 border border-border/20 flex items-center justify-center font-bold text-sm text-muted-foreground">Г</div>
              <div>
                <div className="text-sm font-medium text-foreground">Геннадій Кернес</div>
                <div className="text-[10px] text-muted-foreground">Суперадмін</div>
              </div>
            </div>
            <Settings size={16} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="xatosfera-main-content absolute inset-0 z-10 flex flex-col">
          <main className="flex-1 overflow-y-auto app-content px-6 md:px-10 py-6 flex flex-col gap-6 relative z-10">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 pt-2">
              <h1 className="text-2xl font-medium flex items-center gap-3 text-foreground">
                <Home size={28} className="text-primary" />
                Панель керування
              </h1>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground glass-card !p-3 !rounded-full">
                <span className="flex items-center gap-2"><DollarSign size={16} className="text-secondary" /> USD: 44.91</span>
                <span className="flex items-center gap-2"><Euro size={16} className="text-secondary" /> EUR: 51.46</span>
                <span className="opacity-50 text-xs">НБУ</span>
              </div>
            </header>
            
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
              {[
                { icon: Building2, label: "Всі об'єкти", value: '57' },
                { icon: CheckSquare, label: 'Всі закриті угоди', value: '0' },
                { icon: Target, label: 'Конверсія лідів', value: '0%' },
              ].map((stat, i) => (
                <div key={i} className="glass-card flex items-center justify-between shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <stat.icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-3xl font-light text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 shrink-0 pb-6">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="glass-card flex-1 shadow-card flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold flex items-center gap-2 text-foreground">
                      <Activity size={18} className="text-orange-500" />
                      Остання активність
                    </h3>
                    <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">Натисни щоб побачити всі</span>
                  </div>
                  <div className="space-y-4 flex-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex items-center gap-4 pb-4 border-b border-border/10 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">оновив клієнта <span className="font-bold text-primary">О</span></p>
                          <p className="text-xs text-muted-foreground mt-0.5">3 д тому</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card shadow-card">
                  <h3 className="font-semibold flex items-center gap-2 mb-4 text-muted-foreground">
                    <AlertTriangle size={18} className="text-yellow-500" />
                    Статус бази даних
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Активні об'єкти без фото</span>
                    <span className="w-6 h-6 rounded-full border border-border/20 flex items-center justify-center text-xs text-foreground bg-surface/30">3</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-card shadow-card">
                  <h3 className="font-semibold flex items-center gap-2 mb-6 text-foreground">
                    <Zap size={18} className="text-secondary" />
                    Швидкі дії
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Building2, label: "Створити об'єкт" },
                      { icon: Clock, label: "Запланувати зустріч" },
                      { icon: Users, label: "Новий клієнт" },
                      { icon: FilePlus2, label: "Нова угода" },
                    ].map((action, i) => (
                      <button key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all text-primary group hover:shadow-button">
                        <action.icon size={22} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="text-xs font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card shadow-card flex-1 flex flex-col justify-center min-h-[140px]">
                  <h3 className="font-semibold flex items-center gap-2 mb-3 text-muted-foreground">
                    <Lightbulb size={18} className="text-yellow-500" />
                    Порада дня
                  </h3>
                  <p className="text-sm text-muted-foreground animate-pulse flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Завантаження поради...
                  </p>
                </div>
                
                <div className="glass-card shadow-card">
                  <h3 className="font-semibold flex items-center gap-2 text-foreground">
                    <Trophy size={18} className="text-yellow-500" />
                    Топ агентів
                  </h3>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
