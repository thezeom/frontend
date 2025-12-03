
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EquipmentFilters } from "@/components/equipment/EquipmentFilters";
import { EquipmentTable } from "@/components/equipment/EquipmentTable";
import { UserIcon, LogOut, Monitor, Wifi, Server, Router } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const equipment = [
    {
      id: 1,
      name: "Camera IP-01",
      type: "camera",
      site: "Paris Centre",
      status: "online" as const,
      ip: "192.168.1.101",
      lastMaintenance: "2024-02-15"
    },
    {
      id: 2,
      name: "Switch SW-02",
      type: "switch",
      site: "Lyon Sud",
      status: "online" as const,
      ip: "192.168.1.102",
      lastMaintenance: "2024-02-20"
    },
    {
      id: 3,
      name: "Routeur RT-01",
      type: "router",
      site: "Marseille Port",
      status: "offline" as const,
      ip: "192.168.1.103",
      lastMaintenance: "2024-02-10"
    },
    {
      id: 4,
      name: "Serveur SV-01",
      type: "server",
      site: "Bordeaux Nord",
      status: "online" as const,
      ip: "192.168.1.104",
      lastMaintenance: "2024-02-25"
    },
    {
      id: 5,
      name: "Camera IP-02",
      type: "camera",
      site: "Lille Centre",
      status: "warning" as const,
      ip: "192.168.1.105",
      lastMaintenance: "2024-02-18"
    },
    {
      id: 6,
      name: "Switch SW-03",
      type: "switch",
      site: "Nantes Est",
      status: "online" as const,
      ip: "192.168.1.106",
      lastMaintenance: "2024-02-22"
    },
    {
      id: 7,
      name: "Point d'accès AP-01",
      type: "access_point",
      site: "Paris Centre",
      status: "online" as const,
      ip: "192.168.1.107",
      lastMaintenance: "2024-02-23"
    },
    {
      id: 8,
      name: "NVR-01",
      type: "video-recorder",
      site: "Lyon Sud",
      status: "online" as const,
      ip: "192.168.1.108",
      lastMaintenance: "2024-02-24"
    },
    {
      id: 9,
      name: "PC-01",
      type: "pc",
      site: "Marseille Port",
      status: "warning" as const,
      ip: "192.168.1.109",
      lastMaintenance: "2024-02-26"
    },
    {
      id: 10,
      name: "Device-01",
      type: "other",
      site: "Bordeaux Nord",
      status: "online" as const,
      ip: "192.168.1.110",
      lastMaintenance: "2024-02-27"
    }
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesSite = siteFilter === "all" || item.site === siteFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesType && matchesSite && matchesStatus;
  });

  const stats = [
    { label: "Total", value: equipment.length, icon: Monitor, color: "primary" },
    { label: "En ligne", value: equipment.filter(e => e.status === 'online').length, icon: Wifi, color: "success" },
    { label: "Hors ligne", value: equipment.filter(e => e.status === 'offline').length, icon: Server, color: "danger" },
    { label: "Attention", value: equipment.filter(e => e.status === 'warning').length, icon: Router, color: "warning" },
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
          <h1 className="text-2xl font-bold text-foreground">Équipements</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestion et surveillance de tous vos équipements réseau
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
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 card-interactive group">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                  getColorClasses(stat.color)
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4 card-modern animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <EquipmentFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          siteFilter={siteFilter}
          onSiteFilterChange={setSiteFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </Card>

      {/* Table */}
      <Card className="card-modern overflow-hidden animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <EquipmentTable equipment={filteredEquipment} />
      </Card>
    </div>
  );
};

export default Equipment;
