import { Mail, Bell, Search, LayoutDashboard, Settings, User } from 'lucide-react';

export function PreviewArea() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Design Preview</h2>
        <p className="text-[var(--color-text-muted)]">Interact with the components below to see your design system in action.</p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-[var(--color-border-main)] pb-2">Buttons</h3>
        <div className="flex flex-wrap gap-4 items-center p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-sm border border-[var(--color-border-main)]">
          <button className="px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-[var(--radius-md)] hover:opacity-90 transition-opacity shadow-sm">
            Primary Action
          </button>
          <button className="px-5 py-2.5 bg-[var(--color-secondary)] text-white font-medium rounded-[var(--radius-md)] hover:opacity-90 transition-opacity shadow-sm">
            Secondary Action
          </button>
          <button className="px-5 py-2.5 bg-[var(--color-background)] border border-[var(--color-border-main)] text-[var(--color-text-main)] font-medium rounded-[var(--radius-md)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors shadow-sm">
            Outline Button
          </button>
          <button className="px-5 py-2.5 text-[var(--color-text-muted)] font-medium rounded-[var(--radius-md)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors">
            Ghost Button
          </button>
        </div>
      </section>

      {/* Forms & Inputs */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-[var(--color-border-main)] pb-2">Form Elements</h3>
        <div className="grid md:grid-cols-2 gap-6 p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-sm border border-[var(--color-border-main)]">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border-main)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
              />
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">We'll never share your email.</p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border-main)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-shadow"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded-[var(--radius-sm)] text-[var(--color-primary)] border-[var(--color-border-main)] focus:ring-[var(--color-primary)]" />
            <span className="text-sm">I agree to the terms and conditions</span>
          </div>
        </div>
      </section>

      {/* Mock Application Layout */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-[var(--color-border-main)] pb-2">Dashboard Example</h3>
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-main)] bg-[var(--color-surface)] shadow-md overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          {/* Mock Sidebar */}
          <div className="w-full md:w-64 bg-[var(--color-background)] border-b md:border-b-0 md:border-r border-[var(--color-border-main)] p-4 flex flex-col">
            <div className="flex items-center gap-2 font-bold text-lg mb-8 text-[var(--color-primary)]">
              <div className="w-8 h-8 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] rounded-[var(--radius-md)]"></div>
              AppLogo
            </div>
            <nav className="space-y-1">
              {[{icon: LayoutDashboard, label: 'Dashboard', active: true}, {icon: User, label: 'Customers'}, {icon: Settings, label: 'Settings'}].map((item, i) => (
                <a key={i} href="#" className={`flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] transition-colors ${item.active ? 'bg-[var(--color-primary)] text-white shadow-sm shadow-[var(--color-primary)]/20' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-main)]'}`}>
                  <item.icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Mock Content */}
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-[var(--color-border-main)] flex items-center justify-between px-6 bg-[var(--color-surface)]">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-1.5 bg-[var(--color-background)] border border-[var(--color-border-main)] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-shadow" />
              </div>
              <div className="flex items-center gap-4">
                <button className="relative text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-secondary)] rounded-full border-2 border-[var(--color-surface)]"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-bold text-sm border border-[var(--color-primary)]/20">
                  JD
                </div>
              </div>
            </header>
            
            <div className="p-6 flex-1 bg-[var(--color-background)]/50">
              <h1 className="text-2xl font-bold mb-6">Overview</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', color: 'var(--color-primary)' },
                  { label: 'Active Users', value: '2,350', change: '+15.2%', color: 'var(--color-secondary)' },
                  { label: 'Conversion Rate', value: '3.4%', change: '-2.4%', color: 'var(--color-accent)' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[var(--color-surface)] p-5 rounded-[var(--radius-lg)] border border-[var(--color-border-main)] shadow-sm">
                    <h4 className="text-sm font-medium text-[var(--color-text-muted)] mb-2">{stat.label}</h4>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs font-medium" style={{ color: stat.change.startsWith('+') ? 'var(--color-secondary)' : 'var(--color-accent)' }}>
                      {stat.change} from last month
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-main)] p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 pb-4 border-b border-[var(--color-border-main)] last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-background)] flex items-center justify-center text-[var(--color-primary)]">
                        <User size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-[var(--color-text-muted)]">Just now</p>
                      </div>
                      <button className="text-xs font-medium text-[var(--color-primary)] hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
