
import { Home, Users, Monitor, Bell, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import vigileosLogo from "@/assets/vigileos-logo.png";

export const TopNavbar = () => {
  const location = useLocation();
  
  const links = [
    { name: "Tableau de bord", icon: Home, path: "/dashboard" },
    { name: "Sites clients", icon: Users, path: "/sites" },
    { name: "Équipements", icon: Monitor, path: "/equipements" },
    { name: "Alertes", icon: Bell, path: "/alertes" },
    { name: "Configuration", icon: Settings, path: "/configuration" },
    { name: "Compte", icon: User, path: "/compte" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#3d4f5f] z-50 shadow-lg">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img 
            src={vigileosLogo} 
            alt="Vigileos PRO" 
            className="h-8 w-auto"
          />
        </div>
        
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )} />
                <span className="font-medium text-sm whitespace-nowrap">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center">
          <span className="text-xs text-white/50">PRO v2.0.1</span>
        </div>
      </div>
    </header>
  );
};
