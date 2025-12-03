
import { Card } from "@/components/ui/card";
import { UserIcon, LogOut, Mail, Phone, Globe, Clock, Shield, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Account = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+33 6 12 34 56 78",
    role: "Administrateur",
    timezone: "Europe/Paris",
    language: "fr",
    lastLogin: new Date().toLocaleString()
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Modifications enregistrées avec succès");
  };

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Déconnexion réussie");
      navigate('/');
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Un problème est survenu lors de la déconnexion.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon Compte</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez vos informations personnelles
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 card-modern animate-fade-in-up lg:row-span-2">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
                <UserIcon className="w-12 h-12 text-primary-foreground" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-card border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <h2 className="text-xl font-semibold mt-4 text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">Global Secure SARL</p>
            <span className="mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {user.role}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Téléphone</p>
                <p className="text-sm font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Dernière connexion</p>
                <p className="text-sm font-medium text-foreground">{user.lastLogin}</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full mt-6 border-danger/30 text-danger hover:bg-danger/10 hover:text-danger"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2 p-6 card-modern animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Informations personnelles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input 
                id="name" 
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="bg-background rounded-xl border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="bg-background rounded-xl border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input 
                id="phone" 
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                className="bg-background rounded-xl border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input 
                id="role" 
                value={user.role} 
                disabled 
                className="bg-muted rounded-xl border-border/50"
              />
            </div>
          </div>
          <Button onClick={handleSave} className="mt-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            Enregistrer les modifications
          </Button>
        </Card>

        {/* Preferences */}
        <Card className="lg:col-span-2 p-6 card-modern animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Préférences</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select 
                value={user.language}
                onValueChange={(value) => setUser({...user, language: value})}
              >
                <SelectTrigger id="language" className="bg-background rounded-xl border-border/50">
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select 
                value={user.timezone}
                onValueChange={(value) => setUser({...user, timezone: value})}
              >
                <SelectTrigger id="timezone" className="bg-background rounded-xl border-border/50">
                  <SelectValue placeholder="Sélectionner un fuseau horaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Account;
