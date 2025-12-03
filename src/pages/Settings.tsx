import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreditCard, Wallet, UserIcon, LogOut, Check, Sparkles } from "lucide-react";
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

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "paypal" | null>(null);
  const [siteCount, setSiteCount] = useState(3);
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  const [paypalInfo, setPaypalInfo] = useState({
    email: ""
  });

  const pricePerSite = 15;
  const totalHT = siteCount * pricePerSite;
  const totalTTC = totalHT * 1.2;

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      toast.error("Veuillez sélectionner une méthode de paiement");
      return;
    }

    if (selectedPaymentMethod === "card" && (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvc)) {
      toast.error("Veuillez remplir tous les champs de la carte");
      return;
    }

    if (selectedPaymentMethod === "paypal" && !paypalInfo.email) {
      toast.error("Veuillez remplir votre email PayPal");
      return;
    }

    toast.success("Paiement simulé avec succès !");
  };

  const plans = [
    { name: "Starter", sites: 3, price: 45, features: ["3 sites", "Support email", "Rapports mensuels"] },
    { name: "Pro", sites: 10, price: 120, features: ["10 sites", "Support prioritaire", "Rapports hebdomadaires", "API access"], popular: true },
    { name: "Enterprise", sites: 50, price: 450, features: ["50 sites", "Support dédié", "Rapports temps réel", "API illimité", "SLA garanti"] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Souscription</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez votre abonnement et vos paiements
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

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4 stagger-children">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={cn(
              "p-6 card-interactive relative overflow-hidden",
              plan.popular && "border-accent ring-2 ring-accent/20"
            )}
          >
            {plan.popular && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Populaire
                </span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-foreground">{plan.price}€</span>
              <span className="text-muted-foreground">/mois</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              className={cn(
                "w-full",
                plan.popular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90"
              )}
            >
              Choisir ce plan
            </Button>
          </Card>
        ))}
      </div>

      {/* Billing Summary */}
      <Card className="p-6 card-modern animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-lg font-semibold mb-6">Récapitulatif de facturation</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Nombre de sites</span>
                <span className="font-medium">{siteCount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Prix unitaire</span>
                <span className="font-medium">{pricePerSite}€ HT</span>
              </div>
              <div className="flex justify-between mb-2 pt-2 border-t border-border/50">
                <span className="text-muted-foreground">Total HT</span>
                <span className="font-medium">{totalHT}€</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">TVA (20%)</span>
                <span className="font-medium">{(totalTTC - totalHT).toFixed(2)}€</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border/50">
                <span className="font-semibold text-foreground">Total TTC</span>
                <span className="font-bold text-xl text-primary">{totalTTC.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Méthode de paiement</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedPaymentMethod("card")}
                className={cn(
                  "p-4 rounded-xl border-2 flex items-center gap-3 transition-all duration-200",
                  selectedPaymentMethod === "card" 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 hover:border-primary/50"
                )}
              >
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="font-medium">Carte bancaire</span>
              </button>
              <button
                onClick={() => setSelectedPaymentMethod("paypal")}
                className={cn(
                  "p-4 rounded-xl border-2 flex items-center gap-3 transition-all duration-200",
                  selectedPaymentMethod === "paypal" 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 hover:border-primary/50"
                )}
              >
                <Wallet className="w-5 h-5 text-primary" />
                <span className="font-medium">PayPal</span>
              </button>
            </div>

            {selectedPaymentMethod === "card" && (
              <div className="space-y-4 p-4 rounded-xl bg-muted/30 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numéro de carte</Label>
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    className="bg-background rounded-xl"
                    value={cardInfo.number}
                    onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nom sur la carte</Label>
                  <Input
                    id="cardName"
                    placeholder="JOHN DOE"
                    className="bg-background rounded-xl"
                    value={cardInfo.name}
                    onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Date d'expiration</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/AA"
                      className="bg-background rounded-xl"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCVC">CVC</Label>
                    <Input
                      id="cardCVC"
                      placeholder="123"
                      className="bg-background rounded-xl"
                      value={cardInfo.cvc}
                      onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === "paypal" && (
              <div className="space-y-4 p-4 rounded-xl bg-muted/30 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">Email PayPal</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="bg-background rounded-xl"
                    value={paypalInfo.email}
                    onChange={(e) => setPaypalInfo({...paypalInfo, email: e.target.value})}
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={handlePayment} 
              className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
              size="lg"
            >
              Payer {totalTTC.toFixed(2)}€
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
