
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { cn } from "@/lib/utils";
import SitesMap from "@/components/SitesMap";
import { UserIcon, LogOut, TrendingUp, Shield, Wifi, AlertTriangle, Activity, Bell, ChevronRight, Calendar } from "lucide-react";
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

  const weeklyData = [
    { day: 'L', value: 92, incidents: 2 },
    { day: 'M', value: 95, incidents: 1 },
    { day: 'M', value: 88, incidents: 4 },
    { day: 'J', value: 99, incidents: 0 },
    { day: 'V', value: 97, incidents: 1 },
    { day: 'S', value: 100, incidents: 0 },
    { day: 'D', value: 99, incidents: 0 },
  ];

  const equipmentData = [
    { name: 'Caméras', value: 35, color: 'hsl(220, 70%, 50%)' },
    { name: 'Routeurs', value: 15, color: 'hsl(32, 95%, 55%)' },
    { name: 'Switches', value: 20, color: 'hsl(270, 50%, 55%)' },
    { name: 'Serveurs', value: 10, color: 'hsl(200, 50%, 50%)' },
    { name: 'AP WiFi', value: 12, color: 'hsl(152, 65%, 42%)' },
    { name: 'Autres', value: 8, color: 'hsl(220, 10%, 50%)' }
  ];

  const stats = [
    { 
      label: "Total Sites", 
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: Shield,
      color: "primary"
    },
    { 
      label: "En Ligne", 
      value: "10", 
      change: "83%",
      changeType: "positive",
      icon: Wifi,
      color: "success"
    },
    { 
      label: "Hors Ligne", 
      value: "1", 
      change: "-1",
      changeType: "negative",
      icon: AlertTriangle,
      color: "danger"
    },
    { 
      label: "Alertes Actives", 
      value: "6", 
      change: "24h",
      changeType: "neutral",
      icon: Bell,
      color: "warning"
    },
  ];

  const alerts = [
    {
      title: "Perte de connexion - Site Marseille",
      time: "Il y a 30 min",
      status: "Nouveau",
      type: "error"
    },
    {
      title: "Utilisation CPU élevée - Serveur SV-01",
      time: "Il y a 2h",
      status: "En cours",
      type: "warning"
    },
    {
      title: "Sauvegarde terminée - Caméra IP-02",
      time: "Il y a 3h",
      status: "Résolu",
      type: "success"
    }
  ];

  const recentSites = [
    { name: "Paris Centre", status: "online", equipment: 24 },
    { name: "Lyon Sud", status: "online", equipment: 18 },
    { name: "Marseille Port", status: "offline", equipment: 12 },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      primary: "bg-primary/10 text-primary",
      success: "bg-success/10 text-success", 
      danger: "bg-danger/10 text-danger",
      warning: "bg-warning/10 text-warning",
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="space-y-6">
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.label} 
              className="p-5 card-interactive group"
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                  getColorClasses(stat.color)
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full",
                  stat.changeType === "positive" && "bg-success/10 text-success",
                  stat.changeType === "negative" && "bg-danger/10 text-danger",
                  stat.changeType === "neutral" && "bg-muted text-muted-foreground"
                )}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Availability Chart - Large Card */}
        <Card className="lg:col-span-2 p-6 card-modern animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Disponibilité Réseau</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Suivi de la disponibilité sur 7 jours</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-success">99.4%</span>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }}
                />
                <YAxis 
                  domain={[80, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(220, 15%, 90%)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px -4px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Disponibilité']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(220, 70%, 50%)" 
                  strokeWidth={3}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">Uptime moyen: 99.4%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Incidents: 8 cette semaine</span>
            </div>
          </div>
        </Card>

        {/* Recent Sites */}
        <Card className="p-6 card-modern animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sites Récents</h2>
            <Link to="/sites">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentSites.map((site, index) => (
              <div 
                key={site.name}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{site.name}</p>
                    <p className="text-sm text-muted-foreground">{site.equipment} équipements</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold",
                    site.status === 'online' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  )}>
                    {site.status === 'online' ? 'En ligne' : 'Hors ligne'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 p-6 card-modern animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Répartition Géographique</h2>
          </div>
          <div className="h-[350px] rounded-xl overflow-hidden">
            <SitesMap />
          </div>
        </Card>

        {/* Alerts */}
        <Card className="p-6 card-modern animate-fade-in-up" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-warning" />
              <h2 className="text-lg font-semibold">Alertes Récentes</h2>
            </div>
            <Link to="/alertes">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-xl transition-all duration-200 hover:-translate-x-1 cursor-pointer",
                  alert.type === 'error' && "bg-danger/5 border-l-4 border-danger",
                  alert.type === 'warning' && "bg-warning/5 border-l-4 border-warning",
                  alert.type === 'success' && "bg-success/5 border-l-4 border-success"
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-foreground">{alert.title}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                  <span 
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      alert.type === 'error' && "bg-danger/10 text-danger",
                      alert.type === 'warning' && "bg-warning/10 text-warning",
                      alert.type === 'success' && "bg-success/10 text-success"
                    )}
                  >
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Equipment Distribution */}
      <Card className="p-6 card-modern animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Répartition des Équipements</h2>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={equipmentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 15%, 90%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px -4px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => [`${value}%`, 'Part']}
              />
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]}
              >
                {equipmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Index;
