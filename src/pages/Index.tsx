
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from "@/lib/utils";
import SitesMap from "@/components/SitesMap";
import { UserIcon, LogOut, Shield, Wifi, AlertTriangle, Bell, ChevronRight, Calendar, Camera, Router, Server, Activity, Users, ShoppingCart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      logout();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate('/');
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  // Sparkline data
  const sparklineUp = [
    { v: 20 }, { v: 25 }, { v: 22 }, { v: 30 }, { v: 28 }, { v: 35 }, { v: 32 }, { v: 40 }, { v: 38 }, { v: 45 }
  ];
  const sparklineDown = [
    { v: 45 }, { v: 42 }, { v: 44 }, { v: 38 }, { v: 40 }, { v: 35 }, { v: 32 }, { v: 28 }, { v: 25 }, { v: 20 }
  ];

  // Monthly network data
  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    disponibilite: 150 + Math.sin(i * 0.3) * 40 + Math.random() * 20,
    incidents: 180 + Math.cos(i * 0.2) * 30 + Math.random() * 15,
  }));

  const recentAlerts = [
    { icon: Camera, title: "Caméra IP-02", location: "Électronique", time: "22 DEC 7:20 PM", color: "bg-purple-100 text-purple-600" },
    { icon: Router, title: "Routeur principal", location: "Équipement Réseau", time: "22 DEC 7:20 PM", color: "bg-blue-100 text-blue-600" },
    { icon: Server, title: "Serveur SV-01", location: "Infrastructure", time: "22 DEC 7:20 PM", color: "bg-amber-100 text-amber-600" },
    { icon: Wifi, title: "Point d'accès WiFi", location: "Connectivité", time: "22 DEC 7:20 PM", color: "bg-emerald-100 text-emerald-600" },
  ];

  const topEquipments = [
    { name: "Caméras de surveillance", popularity: 45, count: "45%" },
    { name: "Routeurs et Switches", popularity: 32, count: "32%" },
    { name: "Serveurs de stockage", popularity: 28, count: "28%" },
    { name: "Points d'accès WiFi", popularity: 22, count: "22%" },
  ];

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bienvenue ! Voici l'état de votre infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/50 shadow-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">Global Secure SARL</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <UserIcon className="w-5 h-5 text-primary-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout} className="text-danger focus:text-danger focus:bg-danger/10">
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Row 1 - First 3 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sites Actifs - Large Card */}
        <Card className="lg:col-span-2 p-5 bg-card border-0 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground">Sites Actifs</p>
            <p className="text-xs text-muted-foreground">(+2) cette semaine</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">En ligne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs text-muted-foreground">Alerte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">En ligne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs text-muted-foreground">Alerte</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="border-b-2 border-foreground pb-1">
              <span className="text-lg font-bold text-foreground">10</span>
            </div>
            <div className="border-b-2 border-foreground pb-1">
              <span className="text-lg font-bold text-foreground">2</span>
            </div>
            <div className="border-b-2 border-foreground pb-1">
              <span className="text-lg font-bold text-foreground">10</span>
            </div>
            <div className="border-b-2 border-foreground pb-1">
              <span className="text-lg font-bold text-foreground">2</span>
            </div>
          </div>
        </Card>

        {/* Disponibilité Réseau */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disponibilité Réseau</p>
              <p className="text-2xl font-bold text-foreground mt-1">99.4%</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineUp}>
                  <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs mt-2"><span className="text-emerald-500 font-medium">+2.3%</span> <span className="text-emerald-500">↑</span></p>
        </Card>

        {/* Alertes Actives */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alertes Actives</p>
              <p className="text-2xl font-bold text-foreground mt-1">6</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineDown}>
                  <Line type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs mt-2"><span className="text-orange-500 font-medium">-5.3%</span> <span className="text-orange-500">↓</span></p>
        </Card>
      </div>

      {/* Row 2 - 3 Equal KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Équipements Jour */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Équipements Actifs</p>
              <p className="text-2xl font-bold text-foreground mt-1">350</p>
              <p className="text-xs mt-1"><span className="text-emerald-500 font-medium">+25%</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>

        {/* Nouveaux Sites */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Nouveaux Sites</p>
              <p className="text-2xl font-bold text-foreground mt-1">+12</p>
              <p className="text-xs mt-1"><span className="text-emerald-500 font-medium">+45%</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>

        {/* Total Caméras */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Caméras</p>
              <p className="text-2xl font-bold text-foreground mt-1">245</p>
              <p className="text-xs mt-1"><span className="text-emerald-500 font-medium">+34%</span></p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Row 3 - Chart & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2 p-6 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Analyse Réseau</h2>
              <p className="text-xs text-emerald-500">+20% par rapport à la semaine dernière</p>
            </div>
            <div className="text-right bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
              <p className="text-xs text-muted-foreground">Ce mois</p>
              <p className="text-xl font-bold text-foreground">98.7%</p>
              <p className="text-xs text-muted-foreground">Décembre</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorDisponibilite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(value) => `${value}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px -4px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="disponibilite" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorDisponibilite)"
                  name="Disponibilité"
                />
                <Area 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  fill="url(#colorIncidents)"
                  name="Activité"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Alerts Overview */}
        <Card className="p-6 bg-card border-0 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Alertes Récentes</h2>
            <p className="text-xs text-emerald-500">+30% ce mois</p>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", alert.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 4 - Table & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Equipments */}
        <Card className="p-6 bg-card border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Équipements</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Nom</th>
                <th className="pb-3 font-medium">Utilisation</th>
                <th className="pb-3 font-medium text-right">Part</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {topEquipments.map((item, index) => (
                <tr key={index} className="border-t border-border/30">
                  <td className="py-3 text-muted-foreground">{String(index + 1).padStart(2, '0')}</td>
                  <td className="py-3 font-medium text-foreground">{item.name}</td>
                  <td className="py-3 w-24">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${item.popularity}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-muted-foreground">
                      {item.count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Map */}
        <Card className="lg:col-span-2 p-6 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Répartition par Région</h2>
          </div>
          <div className="h-[250px] rounded-xl overflow-hidden">
            <SitesMap />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
