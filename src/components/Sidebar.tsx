
import { useState } from "react";
import { Menu, Home, Users, Monitor, Bell, Settings, User, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import vigileosLogo from "@/assets/vigileos-logo.png";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar = ({ isCollapsed, onCollapse }: SidebarProps) => {
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
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-[#3d4f5f] transition-all duration-300 ease-in-out z-50",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={cn(
          "flex items-center gap-3 overflow-hidden transition-all duration-300",
          isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"
        )}>
          <img 
            src={vigileosLogo} 
            alt="Vigileos PRO" 
            className="h-8 w-auto"
          />
        </div>
        <button 
          onClick={() => onCollapse(!isCollapsed)} 
          className={cn(
            "p-2 hover:bg-white/10 rounded-xl transition-all duration-300 text-white/80 hover:text-white",
            isCollapsed && "mx-auto"
          )}
        >
          <ChevronLeft className={cn(
            "w-5 h-5 transition-transform duration-300",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </div>
      
      <nav className="p-3 space-y-1 mt-2">
        {links.map((link, index) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              <span className={cn(
                "font-medium transition-all duration-300 whitespace-nowrap",
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}>
                {link.name}
              </span>
              {isActive && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>
      
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-1">Version</p>
            <p className="text-sm font-medium text-white/80">PRO v2.0.1</p>
          </div>
        </div>
      )}
    </aside>
  );
};
