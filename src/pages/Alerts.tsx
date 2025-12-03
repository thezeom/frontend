
import { Card } from "@/components/ui/card";
import { AlertCircleIcon, CheckCircleIcon, XCircleIcon, UserIcon, LogOut, Bell, Filter, Search } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Alerts = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

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

  const alerts = [
    {
      id: 1,
      title: "Serveur principal inaccessible",
      description: "Le serveur ne répond plus depuis 5 minutes",
      type: "error",
      timestamp: "Il y a 5 min",
      source: "Serveur principal"
    },
    {
      id: 2,
      title: "Trafic réseau anormal",
      description: "Pic de trafic détecté sur le switch principal",
      type: "warning",
      timestamp: "Il y a 30 min",
      source: "Switch principal"
    },
    {
      id: 3,
      title: "Connexion rétablie",
      description: "La connexion avec l'imprimante RH a été rétablie",
      type: "success",
      timestamp: "Il y a 1h",
      source: "Imprimante RH"
    },
    {
      id: 4,
      title: "Mise à jour firmware disponible",
      description: "Une nouvelle version du firmware est disponible pour le routeur RT-01",
      type: "warning",
      timestamp: "Il y a 2h",
      source: "Routeur RT-01"
    },
    {
      id: 5,
      title: "Caméra hors ligne",
      description: "La caméra IP-03 ne répond plus",
      type: "error",
      timestamp: "Il y a 3h",
      source: "Caméra IP-03"
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || alert.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-danger" />;
      case 'warning':
        return <AlertCircleIcon className="w-6 h-6 text-warning" />;
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-success" />;
      default:
        return <AlertCircleIcon className="w-6 h-6" />;
    }
  };

  const stats = [
    { label: "Total", value: alerts.length, color: "primary" },
    { label: "Critiques", value: alerts.filter(a => a.type === 'error').length, color: "danger" },
    { label: "Avertissements", value: alerts.filter(a => a.type === 'warning').length, color: "warning" },
    { label: "Résolues", value: alerts.filter(a => a.type === 'success').length, color: "success" },
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
          <h1 className="text-2xl font-bold text-foreground">Alertes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Suivi et gestion des alertes système
          </p>
        </div>
        <div className="flex items-center gap-4">
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 card-interactive group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                getColorClasses(stat.color)
              )}>
                <Bell className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 card-modern animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Rechercher une alerte..." 
              className="pl-10 bg-background border-border/50 focus:border-primary rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="pl-10 min-w-[180px] bg-background border-border/50 rounded-xl">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="error">Critiques</SelectItem>
                <SelectItem value="warning">Avertissements</SelectItem>
                <SelectItem value="success">Résolues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3 stagger-children">
        {filteredAlerts.map((alert) => (
          <Card 
            key={alert.id} 
            className={cn(
              "p-5 card-interactive border-l-4 transition-all duration-300",
              alert.type === 'error' && "border-l-danger bg-danger/5 hover:bg-danger/10",
              alert.type === 'warning' && "border-l-warning bg-warning/5 hover:bg-warning/10",
              alert.type === 'success' && "border-l-success bg-success/5 hover:bg-success/10"
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                alert.type === 'error' && "bg-danger/10",
                alert.type === 'warning' && "bg-warning/10",
                alert.type === 'success' && "bg-success/10"
              )}>
                {getIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold shrink-0",
                    alert.type === 'error' && "bg-danger/10 text-danger",
                    alert.type === 'warning' && "bg-warning/10 text-warning",
                    alert.type === 'success' && "bg-success/10 text-success"
                  )}>
                    {alert.type === 'error' && "Critique"}
                    {alert.type === 'warning' && "Attention"}
                    {alert.type === 'success' && "Résolu"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{alert.timestamp}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>Source: {alert.source}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
