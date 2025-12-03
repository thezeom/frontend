
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, RefreshCcw, ArrowRight, Trash2Icon, Search, Filter, UserIcon, MapPin, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSites, createSite, deleteSite } from "@/lib/api";
import { Site } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sites = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const { data: sites = [], isLoading, refetch } = useQuery({
    queryKey: ['sites'],
    queryFn: getSites,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Erreur",
          description: "Impossible de charger les sites. Veuillez réessayer.",
          variant: "destructive",
        });
        console.error("Error fetching sites:", error);
      },
    },
  });

  const deleteSiteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteSite(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      toast({
        title: "Succès",
        description: "Le site a été supprimé avec succès.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le site. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Error deleting site:", error);
    },
  });

  const handleDeleteSite = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce site ?")) {
      deleteSiteMutation.mutate(id);
    }
  };

  const handleAssociateSite = async (id: string) => {
    try {
      toast({
        title: "Succès",
        description: "Le site a été associé avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'associer le site. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const filteredSites = (sites as Site[]).filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sites Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gestion et surveillance de vos sites
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => navigate('/sites/detected')}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Nouveau site
          </Button>
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

      {/* Filters */}
      <Card className="p-4 card-modern animate-fade-in-up" style={{ animationDelay: '50ms' }}>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Rechercher un site..." 
              className="pl-10 bg-background border-border/50 focus:border-primary rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="pl-10 min-w-[180px] bg-background border-border/50 rounded-xl">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="online">En ligne</SelectItem>
                <SelectItem value="offline">Hors ligne</SelectItem>
                <SelectItem value="warning">Attention</SelectItem>
                <SelectItem value="pending">Nouveaux sites</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="ml-auto rounded-xl border-border/50 hover:bg-muted"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCcw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </Card>

      {/* Sites Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5 card-modern">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded-lg w-3/4"></div>
                <div className="h-3 bg-muted rounded-lg w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full"></div>
                </div>
              </div>
            </Card>
          ))
        ) : filteredSites.length === 0 ? (
          <Card className="col-span-full p-12 text-center card-modern">
            <div className="text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Aucun site trouvé</p>
              <p className="text-sm mt-1">Ajoutez votre premier site pour commencer</p>
            </div>
          </Card>
        ) : (
          filteredSites.map((site) => (
            <Card key={site.id} className="p-5 card-interactive group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{site.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{site.address}</span>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  site.status === 'online' && "bg-success/10 text-success",
                  site.status === 'offline' && "bg-danger/10 text-danger",
                  site.status === 'warning' && "bg-warning/10 text-warning",
                  site.status === 'pending' && "bg-primary/10 text-primary"
                )}>
                  {site.status === 'online' && "En ligne"}
                  {site.status === 'offline' && "Hors ligne"}
                  {site.status === 'warning' && "Attention"}
                  {site.status === 'pending' && "Nouveau"}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Monitor className="w-4 h-4" />
                  <span>12 équipements</span>
                </div>
                <div className="flex gap-1">
                  {site.status === 'pending' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssociateSite(site.id)}
                      className="text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                    >
                      Associer
                    </Button>
                  ) : (
                    <>
                      <Link to={`/sites/${site.id}/equipment`}>
                        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/10 hover:text-primary">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg hover:bg-danger/10 hover:text-danger"
                        onClick={() => handleDeleteSite(site.id)}
                        disabled={deleteSiteMutation.isPending}
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Sites;
