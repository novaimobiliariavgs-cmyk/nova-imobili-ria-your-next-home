import { useNavigate } from "react-router-dom";
import { usePropertyStore } from "@/contexts/PropertyStoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, Key, Users, Plus } from "lucide-react";

export default function Dashboard() {
  const { properties, leads } = usePropertyStore();
  const navigate = useNavigate();

  const total = properties.length;
  const ativos = properties.filter((p) => p.status === "ativo").length;
  const vendidos = properties.filter((p) => p.status === "vendido").length;
  const locados = properties.filter((p) => p.status === "locado").length;

  const stats = [
    { label: "Total de Imóveis", value: total, icon: Building2, color: "text-[hsl(var(--nova-purple))]" },
    { label: "Ativos", value: ativos, icon: CheckCircle, color: "text-emerald-600" },
    { label: "Vendidos", value: vendidos, icon: CheckCircle, color: "text-blue-600" },
    { label: "Locados", value: locados, icon: Key, color: "text-amber-600" },
    { label: "Leads Recebidos", value: leads.length, icon: Users, color: "text-[hsl(var(--nova-orange))]" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[hsl(var(--nova-purple))]">Dashboard</h1>
        <Button
          onClick={() => navigate("/admin/imoveis/novo")}
          className="bg-[hsl(var(--nova-orange))] hover:bg-[hsl(var(--nova-orange))]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar novo imóvel
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <s.icon className={`w-8 h-8 ${s.color}`} />
              <span className="text-3xl font-bold tabular-nums">{s.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
