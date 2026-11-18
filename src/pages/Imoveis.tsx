import { useSEO } from "@/hooks/useSEO";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { bairros, cidades, type Finalidade, type TipoImovel } from "@/data/properties";
import { useImoveis } from "@/hooks/useImoveis";
import { AluguelContato, AluguelFaixa } from "@/components/AluguelContato";

type SortOption = "recentes" | "menor_preco" | "maior_preco";

const POR_PAGINA = 12;

export default function ImoveisPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [codigo, setCodigo] = useState("");

  const finalidade = (searchParams.get("finalidade") as Finalidade) || "";
  const tipo = (searchParams.get("tipo") as TipoImovel) || "";
  const cidadeParam = searchParams.get("cidade") || "";
  const bairroParam = searchParams.get("bairro") || "";
  const sort = (searchParams.get("sort") as SortOption) || "recentes";

  const { data: todos = [], isLoading } = useImoveis({
    finalidade: finalidade || undefined,
    tipo: tipo || undefined,
    cidade: cidadeParam || undefined,
    bairro: bairroParam || undefined,
    search: codigo || undefined,
    sort,
  });

  useSEO(
    finalidade === "aluguel"
      ? "Imóveis para alugar em Vargem Grande do Sul | Nova Imobiliária"
      : finalidade === "venda"
        ? "Imóveis à venda em Vargem Grande do Sul | Nova Imobiliária"
        : "Imóveis em Vargem Grande do Sul | Nova Imobiliária",
    finalidade === "aluguel"
      ? "Casas e apartamentos para alugar em Vargem Grande do Sul/SP. Chame a Nova Imobiliária no WhatsApp e receba na hora as opções disponíveis, com fotos e valores."
      : finalidade === "venda"
        ? "Casas, apartamentos, terrenos e imóveis comerciais à venda em Vargem Grande do Sul/SP. Veja fotos, valores e agende sua visita."
        : "Imóveis para alugar e comprar em Vargem Grande do Sul/SP: casas, apartamentos, terrenos e imóveis comerciais.",
    finalidade ? `/imoveis?finalidade=${finalidade}` : "/imoveis"
  );

  // Imóveis de aluguel não são listados no site (a carteira muda muito): o cliente chama no WhatsApp.
  const imoveis = todos.filter((i) => i.finalidade !== "aluguel");

  const totalPaginas = Math.max(1, Math.ceil(imoveis.length / POR_PAGINA));
  const pagina = Math.min(Math.max(1, Number(searchParams.get("pagina")) || 1), totalPaginas);
  const imoveisPagina = imoveis.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const irParaPagina = (n: number) => {
    const params = new URLSearchParams(searchParams);
    if (n > 1) params.set("pagina", String(n));
    else params.delete("pagina");
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("pagina"); // filtro novo volta para a primeira página
    setSearchParams(params);
  };

  if (finalidade === "aluguel") return <AluguelContato />;

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
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Cidade</label>
                  <select value={cidadeParam} onChange={(e) => setFilter("cidade", e.target.value)} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option value="">Todas</option>
                    {cidades.map((c) => <option key={c} value={c}>{c}</option>)}
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
                    <input type="text" value={codigo} onChange={(e) => { setCodigo(e.target.value); if (searchParams.get("pagina")) irParaPagina(1); }} placeholder="Ex: NI-001" className="w-full h-10 rounded-lg border border-input bg-background pl-9 pr-3 text-sm" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </aside>

          <div className="flex-1">
            <div className="mb-6"><AluguelFaixa /></div>
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
                {imoveisPagina.map((imovel, i) => (
                  <ScrollReveal key={imovel.id} delay={i * 60}><PropertyCard imovel={imovel} /></ScrollReveal>
                ))}
              </div>
            ) : null}

            {!isLoading && totalPaginas > 1 && (
              <nav className="flex flex-wrap items-center justify-center gap-1 mt-10" aria-label="Páginas">
                <Button variant="outline" size="sm" onClick={() => irParaPagina(pagina - 1)} disabled={pagina === 1} aria-label="Página anterior">
                  <ChevronLeft className="h-4 w-4" /> Anterior
                </Button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <Button key={n} variant={n === pagina ? "default" : "outline"} size="sm" className="min-w-9" onClick={() => irParaPagina(n)} aria-current={n === pagina ? "page" : undefined}>
                    {n}
                  </Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => irParaPagina(pagina + 1)} disabled={pagina === totalPaginas} aria-label="Próxima página">
                  Próxima <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            )}

            {isLoading || imoveis.length > 0 ? null : (
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
