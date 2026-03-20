import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { bairros, cidades, type Finalidade, type TipoImovel } from "@/data/properties";
import { useImoveis } from "@/hooks/useImoveis";

type SortOption = "recentes" | "menor_preco" | "maior_preco";

export default function ImoveisPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [codigo, setCodigo] = useState("");

  const finalidade = (searchParams.get("finalidade") as Finalidade) || "";
  const tipo = (searchParams.get("tipo") as TipoImovel) || "";
  const cidadeParam = searchParams.get("cidade") || "";
  const bairroParam = searchParams.get("bairro") || "";
  const sort = (searchParams.get("sort") as SortOption) || "recentes";

  const { data: imoveis = [], isLoading } = useImoveis({
    finalidade: finalidade || undefined,
    tipo: tipo || undefined,
    cidade: cidadeParam || undefined,
    bairro: bairroParam || undefined,
    search: codigo || undefined,
    sort,
  });

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding-sm">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">Imóveis</h1>
          <p className="text-white/70 mt-1">Encontre o imóvel perfeito para você</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0 space-y-4">
            <ScrollReveal>
              <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground">Filtros</h3>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Finalidade</label>
                  <select value={finalidade} onChange={(e) => setFilter("finalidade", e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Todas</option>
                    <option value="venda">Venda</option>
                    <option value="aluguel">Aluguel</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Tipo</label>
                  <select value={tipo} onChange={(e) => setFilter("tipo", e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Todos</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="comercial">Comercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Bairro</label>
                  <select value={bairroParam} onChange={(e) => setFilter("bairro", e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Todos</option>
                    {bairros.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Código do imóvel</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Ex: NI-001" className="w-full h-10 rounded-lg border border-input bg-background pl-9 pr-3 text-sm" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{imoveis.length} imóvel(is) encontrado(s)</p>
              <select value={sort} onChange={(e) => setFilter("sort", e.target.value)} className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
                <option value="recentes">Mais recentes</option>
                <option value="menor_preco">Menor preço</option>
                <option value="maior_preco">Maior preço</option>
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-16 text-muted-foreground">Carregando...</div>
            ) : imoveis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {imoveis.map((imovel, i) => (
                  <ScrollReveal key={imovel.id} delay={i * 60}><PropertyCard imovel={imovel} /></ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">Nenhum imóvel encontrado</p>
                <p className="text-sm mt-1">Tente ajustar os filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
