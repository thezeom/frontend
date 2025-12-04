
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from "@/lib/utils";
import SitesMap from "@/components/SitesMap";
import { UserIcon, LogOut, Shield, Wifi, AlertTriangle, Bell, ChevronRight, Calendar, Camera, Router, Server, Activity } from "lucide-react";
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

  // Mini sparkline data for KPI cards
  const sparklineUp = [
    { v: 20 }, { v: 35 }, { v: 25 }, { v: 45 }, { v: 30 }, { v: 55 }, { v: 40 }, { v: 60 }
  ];
  const sparklineDown = [
    { v: 50 }, { v: 45 }, { v: 55 }, { v: 40 }, { v: 35 }, { v: 30 }, { v: 25 }, { v: 20 }
  ];

  // Monthly network data for main chart
  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    disponibilite: 85 + Math.random() * 15,
    incidents: Math.floor(Math.random() * 10) + 2,
  }));

  const recentAlerts = [
    { icon: Camera, title: "Caméra IP-02 hors ligne", location: "Paris Centre", time: "22 DEC 7:20 PM", color: "text-primary" },
    { icon: Router, title: "Routeur principal redémarré", location: "Lyon Sud", time: "22 DEC 7:20 PM", color: "text-warning" },
    { icon: Server, title: "Serveur SV-01 CPU élevé", location: "Marseille Port", time: "22 DEC 7:20 PM", color: "text-danger" },
    { icon: Wifi, title: "Point d'accès restauré", location: "Nice", time: "22 DEC 7:20 PM", color: "text-success" },
  ];

  const topEquipments = [
    { name: "Caméras IP", popularity: 85, count: "35" },
    { name: "Routeurs Réseau", popularity: 60, count: "15" },
    { name: "Switches", popularity: 75, count: "20" },
    { name: "Serveurs", popularity: 45, count: "10" },
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

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sites Actifs - Large Card */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Sites Actifs</p>
              <p className="text-xs text-success">(+2) cette semaine</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">En ligne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-danger" />
              <span className="text-xs text-muted-foreground">Hors ligne</span>
            </div>
          </div>
          <div className="flex items-center gap-8 mt-2">
            <div>
              <span className="text-2xl font-bold text-foreground">10</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">2</span>
            </div>
          </div>
        </Card>

        {/* Disponibilité Réseau */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disponibilité Réseau</p>
              <p className="text-3xl font-bold text-foreground mt-1">99.4%</p>
              <p className="text-xs text-success mt-1">+2.3% ↑</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="h-12 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineUp}>
                <Line type="monotone" dataKey="v" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Équipements */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Équipements</p>
              <p className="text-3xl font-bold text-foreground mt-1">+350</p>
              <p className="text-xs text-success mt-1">+45% ↑</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Server className="w-6 h-6 text-warning" />
            </div>
          </div>
          <div className="h-12 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineUp}>
                <Line type="monotone" dataKey="v" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Alertes */}
        <Card className="p-5 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alertes Actives</p>
              <p className="text-3xl font-bold text-foreground mt-1">6</p>
              <p className="text-xs text-danger mt-1">-5.3% ↓</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="h-12 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineDown}>
                <Line type="monotone" dataKey="v" stroke="hsl(var(--danger))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Second Row - Main Chart & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2 p-6 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Analyse Réseau</h2>
              <p className="text-xs text-success">+20% par rapport à la semaine dernière</p>
            </div>
            <div className="text-right bg-muted/50 px-4 py-2 rounded-xl">
              <p className="text-xs text-muted-foreground">Ce mois</p>
              <p className="text-2xl font-bold text-foreground">98.7%</p>
              <p className="text-xs text-muted-foreground">Décembre</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorDisponibilite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(32, 95%, 55%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(32, 95%, 55%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(220, 15%, 90%)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px -4px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="disponibilite" 
                  stroke="hsl(220, 70%, 50%)" 
                  strokeWidth={2}
                  fill="url(#colorDisponibilite)"
                  name="Disponibilité %"
                />
                <Area 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="hsl(32, 95%, 55%)" 
                  strokeWidth={2}
                  fill="url(#colorIncidents)"
                  name="Incidents"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Alerts Overview */}
        <Card className="p-6 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Alertes Récentes</h2>
              <p className="text-xs text-success">+30% ce mois</p>
            </div>
            <Link to="/alertes">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-xl bg-muted/80 flex items-center justify-center", alert.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Third Row - Top Equipment & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Equipments */}
        <Card className="p-6 bg-card border-0 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Équipements</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Nom</th>
                  <th className="pb-3 font-medium">Utilisation</th>
                  <th className="pb-3 font-medium text-right">Quantité</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {topEquipments.map((item, index) => (
                  <tr key={index} className="border-t border-border/50">
                    <td className="py-3 text-muted-foreground">{String(index + 1).padStart(2, '0')}</td>
                    <td className="py-3 font-medium text-foreground">{item.name}</td>
                    <td className="py-3 w-32">
                      <Progress value={item.popularity} className="h-2" />
                    </td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium">
                        {item.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Map */}
        <Card className="lg:col-span-2 p-6 bg-card border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Répartition Géographique</h2>
            </div>
            <Link to="/sites">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="h-[300px] rounded-xl overflow-hidden">
            <SitesMap />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
