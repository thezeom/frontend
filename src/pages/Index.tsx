
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import SitesMap from "@/components/SitesMap";
import { 
  Search, Bell, ArrowUpRight, Camera, Router, Server, Wifi, 
  Shield, Activity, MapPin, Clock, Globe, Building2
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Chart data - 6 months
  const chartData = [
    { month: 'Jan', value: 150 },
    { month: 'Fév', value: 120 },
    { month: 'Mar', value: 100 },
    { month: 'Avr', value: 80 },
    { month: 'Mai', value: 60 },
    { month: 'Juin', value: 70 },
  ];

  // Recent alerts (like Economic Events)
  const recentAlerts = [
    { time: "00:00", type: "camera", location: "Site Paris", data: "Caméra IP-02", status: "Alerte: Déconnexion", prev: "En ligne" },
    { time: "02:01", type: "router", location: "Site Lyon", data: "Routeur R-05", status: "Alerte: Latence", prev: "Normal" },
    { time: "02:30", type: "server", location: "Site Marseille", data: "Serveur SV-01", status: "Alerte: CPU 95%", prev: "Normal" },
    { time: "02:50", type: "wifi", location: "Site Bordeaux", data: "Point d'accès AP-12", status: "Alerte: Signal faible", prev: "Fort" },
  ];

  // Equipment status (like Markets)
  const equipmentStatus = [
    { name: "Caméras", icon: Camera, count: 245, change: "+12", positive: true, color: "bg-orange-500" },
    { name: "Routeurs", icon: Router, count: 89, change: "+3", positive: true, color: "bg-blue-500" },
    { name: "Serveurs", icon: Server, count: 24, change: "-1", positive: false, color: "bg-purple-500" },
    { name: "Points WiFi", icon: Wifi, count: 156, change: "+8", positive: true, color: "bg-emerald-500" },
  ];

  // Market hours equivalent - Site status by region
  const regionStatus = [
    { name: "Paris", icon: "🇫🇷", status: "online" },
    { name: "Lyon", icon: "🏛️", status: "online" },
    { name: "Marseille", icon: "⚓", status: "alert" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0 min-h-[calc(100vh-5rem)]">
      {/* Main Content */}
      <main className="p-5 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300 flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Admin</h4>
              <span className="text-xs text-muted-foreground">@vigileos_admin</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="stat-card">
              <div className="text-[10px] text-muted-foreground mb-1">Sites Actifs</div>
              <div className="text-base font-semibold">24<span className="stat-change">↑ 12%</span></div>
            </div>
            <div className="stat-card">
              <div className="text-[10px] text-muted-foreground mb-1">Disponibilité</div>
              <div className="text-base font-semibold">99.4%<span className="stat-change">↑ 2%</span></div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="btn-icon">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="btn-icon relative">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
            </div>
            <button className="btn-primary flex items-center gap-2">
              Nouveau Site <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Balance Card equivalent - Infrastructure Overview */}
        <section className="card-dark p-6 mb-5">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Infrastructure Totale</h3>
              <div className="text-3xl font-bold">
                <sup className="text-lg text-muted-foreground">📡</sup> 514
                <span className="text-sm text-primary ml-2">↑ 8%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Équipements surveillés</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-card2 border-none px-4 py-2 rounded-lg text-foreground text-xs cursor-pointer">⊞</button>
              <button className="bg-card2 border-none px-4 py-2 rounded-lg text-foreground text-xs cursor-pointer">6 Mois ⏱</button>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-[180px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c8ff00" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#c8ff00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8a9a8a', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f1a',
                    border: '1px solid #2a352a',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value} équipements`, 'Total']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#c8ff00" 
                  strokeWidth={2}
                  fill="url(#chartGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Tooltip overlay */}
            <div className="absolute left-[60%] top-2 bg-card2 px-3 py-2 rounded-xl text-xs">
              <div className="text-muted-foreground">Pic d'activité</div>
              <div className="font-semibold">514 équipements</div>
            </div>
          </div>
        </section>

        {/* Bottom Grid - Alerts & Equipment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Recent Alerts (like Economic Events) */}
          <section className="card-dark p-5">
            <h4 className="text-sm font-medium mb-4 flex justify-between items-center">
              Alertes Récentes 
              <span className="text-muted-foreground text-xs font-normal flex items-center gap-1">
                <Clock className="w-3 h-3" /> Aujourd'hui
              </span>
            </h4>
            {recentAlerts.map((alert, index) => (
              <div key={index} className="grid grid-cols-[50px_30px_1fr_80px] gap-2 items-center py-2.5 border-b border-border text-xs">
                <span className="text-muted-foreground">{alert.time}</span>
                <div className={cn(
                  "w-5 h-3.5 rounded-sm flex items-center justify-center text-[8px]",
                  alert.type === "camera" ? "bg-orange-500" :
                  alert.type === "router" ? "bg-blue-500" :
                  alert.type === "server" ? "bg-purple-500" : "bg-emerald-500"
                )}>
                  {alert.type === "camera" ? "📷" : 
                   alert.type === "router" ? "📡" : 
                   alert.type === "server" ? "💾" : "📶"}
                </div>
                <div className="text-muted-foreground">
                  {alert.data}<br/>
                  <b className="text-foreground">{alert.status}</b>
                </div>
                <div className="text-muted-foreground text-right">
                  {alert.location}<br/>
                  <b className="text-foreground">P: {alert.prev}</b>
                </div>
              </div>
            ))}
          </section>

          {/* Equipment Status (like Markets) */}
          <section className="card-dark p-5">
            <h4 className="text-sm font-medium mb-4">Équipements</h4>
            {equipmentStatus.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex justify-between items-center py-3 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-sm", item.color)}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{item.count}</div>
                    <span className={cn("text-xs", item.positive ? "positive" : "negative")}>
                      {item.change} {item.positive ? "↑" : "↓"}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="bg-card border-l border-border p-5">
        {/* Quick Stats Calculator equivalent */}
        <div className="bg-card2 rounded-2xl p-5 mb-5">
          <h4 className="text-sm font-medium mb-5">Statistiques Rapides</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">Sites surveillés</label>
              <div className="w-full bg-card border border-border px-2.5 py-2.5 rounded-lg text-xs">
                24 sites
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">Région principale</label>
              <div className="w-full bg-card border border-border px-2.5 py-2.5 rounded-lg text-xs">
                Île-de-France
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">Alertes actives</label>
              <div className="w-full bg-card border border-border px-2.5 py-2.5 rounded-lg text-xs">
                6 alertes
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">SLA</label>
              <div className="w-full bg-card border border-border px-2.5 py-2.5 rounded-lg text-xs">
                99.4%
              </div>
            </div>
          </div>
          <button className="w-full py-3.5 bg-primary text-primary-foreground border-none rounded-xl font-semibold cursor-pointer mt-4 hover:brightness-110 transition-all">
            Voir Rapport
          </button>
          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-border">
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">Caméras en ligne</label>
              <div className="text-xl font-bold">238</div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-1">Temps de réponse</label>
              <div className="text-xl font-bold">1.2s</div>
            </div>
          </div>
        </div>

        {/* Region Status (like Market Hours) */}
        <div className="bg-card2 rounded-2xl p-5">
          <h4 className="text-sm font-medium mb-5 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Statut Régions
          </h4>
          
          {/* Mini Map */}
          <div className="h-[100px] rounded-xl overflow-hidden mb-4 relative bg-card">
            <SitesMap />
            <div className="absolute top-2 left-[20%] bg-blue-900/80 px-2 py-1 rounded-full text-[10px] font-medium">
              🇫🇷 Paris
            </div>
            <div className="absolute top-[40%] left-[40%] bg-emerald-900/80 px-2 py-1 rounded-full text-[10px] font-medium">
              Lyon
            </div>
            <div className="absolute bottom-2 right-[20%] bg-orange-900/80 px-2 py-1 rounded-full text-[10px] font-medium">
              Marseille
            </div>
          </div>
          
          {/* Region Icons */}
          <div className="flex justify-around text-center">
            {regionStatus.map((region, index) => (
              <div key={index} className="text-xs text-muted-foreground">
                <div className={cn(
                  "w-8 h-8 bg-card rounded-full mx-auto mb-2 flex items-center justify-center text-sm",
                  region.status === "online" ? "shadow-[0_0_10px_rgba(200,255,0,0.3)]" : "shadow-[0_0_10px_rgba(255,68,68,0.3)]"
                )}>
                  {region.status === "online" ? "☀️" : "⚠️"}
                </div>
                {region.name}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Index;
