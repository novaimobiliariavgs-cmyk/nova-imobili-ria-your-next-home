import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HomeSobreServicos } from "@/components/HomeSobreServicos";
import { AluguelFaixa, ProprietarioBloco } from "@/components/AluguelContato";
import { listarBairros, type Finalidade } from "@/data/properties";
import { useImoveisDestaque, useImoveis } from "@/hooks/useImoveis";
import heroBg from "@/assets/hero-bg.jpg";

const categories = [
  { label: "Comprar", desc: "Casas e apartamentos à venda", link: "/imoveis?finalidade=venda", pos: "object-[88%_45%]" },
  { label: "Alugar", desc: "Imóveis para locação", link: "/casas-para-alugar-vargem-grande-do-sul", pos: "object-[30%_80%]" },
  { label: "Terrenos", desc: "Lotes e terrenos", link: "/imoveis?tipo=terreno", pos: "object-[55%_25%]" },
  { label: "Comercial", desc: "Salas e pontos comerciais", link: "/imoveis?tipo=comercial", pos: "object-[8%_50%]" },
];

export default function HomePage() {
  const [finalidade, setFinalidade] = useState<Finalidade>("venda");
  const [tipo, setTipo] = useState("");
  const [bairro, setBairro] = useState("");
  const { data: ativos = [] } = useImoveis({ status: "ativo" });
  const bairrosBusca = listarBairros(ativos.filter((i) => i.finalidade !== "aluguel"));
  
  const [activeTab, setActiveTab] = useState<string>("venda");

  const { data: destaqueTodos = [] } = useImoveisDestaque();
  // Aluguel não é listado no site: o cliente chama no WhatsApp.
  const destaque = destaqueTodos.filter((i) => i.finalidade !== "aluguel");

  const tabFilters = (() => {
    if (activeTab === "venda") return { finalidade: "venda" };
    if (activeTab === "aluguel") return { finalidade: "aluguel" };
    if (activeTab === "terrenos") return { tipo: "terreno" };
    if (activeTab === "comercial") return { tipo: "comercial" };
    return {};
  })();
  const { data: tabTodos = [] } = useImoveis(tabFilters);
  const tabImoveis = tabTodos.filter((i) => i.finalidade !== "aluguel");

  useSEO(
    "Imobiliária em Vargem Grande do Sul | Nova Imobiliária",
    "Imobiliária em Vargem Grande do Sul/SP: casas, apartamentos e salas para alugar ou comprar, e administração de imóveis para proprietários. Atendimento pelo WhatsApp.",
    "/"
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-[58%_center]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-overlay)/0.35)] via-[hsl(var(--hero-overlay)/0.6)] to-[hsl(var(--hero-overlay)/0.92)]" />
        <div className="relative z-10 container pt-36 pb-14 md:pt-44 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow text-gold-light mb-5 animate-reveal-up">O imóvel certo, com segurança do começo ao fim</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] mb-5 animate-reveal-up" style={{ animationDelay: "80ms" }}>
              Imobiliária em <em className="text-gold-light">Vargem Grande do Sul</em>
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10 animate-reveal-up" style={{ animationDelay: "140ms" }}>
              Compra, venda, locação e administração de imóveis, com contratos feitos com rigor jurídico.
            </p>
          </div>
          <div className="glass animate-reveal-up max-w-3xl mx-auto rounded-3xl p-3 md:p-4" style={{ animationDelay: "200ms" }}>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="grid grid-cols-2 p-1 rounded-full bg-black/25 md:w-56 shrink-0">
                {(["venda", "aluguel"] as Finalidade[]).map((f) => (
                  <button key={f} type="button" onClick={() => setFinalidade(f)}
                    className={`h-11 rounded-full text-sm font-semibold transition-colors ${finalidade === f ? "bg-white/95 text-primary" : "text-white hover:bg-white/10"}`}>
                    {f === "venda" ? "Comprar" : "Alugar"}
                  </button>
                ))}
              </div>
              <label className="flex-1 flex flex-col justify-center px-4 py-2 rounded-2xl bg-white/10 text-[11px] uppercase tracking-[0.15em] text-gold-light">
                Tipo de imóvel
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="bg-transparent text-white text-[15px] normal-case tracking-normal outline-none [&>option]:text-foreground">
                  <option value="">Todos</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="comercial">Comercial</option>
                </select>
              </label>
              <label className="flex-1 flex flex-col justify-center px-4 py-2 rounded-2xl bg-white/10 text-[11px] uppercase tracking-[0.15em] text-gold-light">
                Bairro
                <select value={bairro} onChange={(e) => setBairro(e.target.value)} className="bg-transparent text-white text-[15px] normal-case tracking-normal outline-none [&>option]:text-foreground">
                  <option value="">Todos os bairros</option>
                  {bairrosBusca.map((b) => <option key={b.chave} value={b.nome}>{b.nome}</option>)}
                </select>
              </label>
              <Button size="lg" className="btn-gold rounded-full h-12 md:h-auto px-7" asChild>
                <Link to={`/imoveis?finalidade=${finalidade}${tipo ? `&tipo=${tipo}` : ""}${bairro && finalidade !== "aluguel" ? `&bairro=${encodeURIComponent(bairro)}` : ""}`}>
                  <Search className="h-5 w-5" /> Buscar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow text-accent mb-2">Explore</p>
            <h2 className="text-4xl text-primary mb-8">Encontre por categoria</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.label} delay={i * 60}>
                <Link to={cat.link} className="group relative block h-44 md:h-64 overflow-hidden rounded-lg">
                  <img src={heroBg} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${cat.pos} group-hover:scale-105 transition-transform duration-700`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.85)] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-2xl text-white">{cat.label}</h3>
                    <p className="text-xs text-white/75 mt-0.5">{cat.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-4xl text-primary">Imóveis em destaque</h2>
                <p className="text-muted-foreground mt-1">Selecionados especialmente para você</p>
              </div>
              <Button variant="ghost" className="hidden md:flex text-primary" asChild>
                <Link to="/imoveis">Ver todos <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destaque.map((imovel, i) => (
              <ScrollReveal key={imovel.id} delay={i * 80}>
                <PropertyCard imovel={imovel} />
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Button variant="accent" asChild><Link to="/imoveis">Ver todos os imóveis</Link></Button>
          </div>
        </div>
      </section>

      {/* Diferencial */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <ScrollReveal>
            <p className="eyebrow text-gold-light mb-3">Por que a Nova Imobiliária</p>
            <h2 className="text-4xl md:text-5xl mb-5">Sócios advogados, contratos sem surpresas</h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Contratos de locação e de compra e venda feitos com rigor jurídico, a garantia certa para cada caso,
              documentação verificada e acompanhamento próximo quando há atraso no aluguel.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-4xl text-primary mb-6">Imóveis por categoria</h2>
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {[{ key: "venda", label: "Venda" }, { key: "aluguel", label: "Aluguel" }, { key: "terrenos", label: "Terrenos" }, { key: "comercial", label: "Comercial" }].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.key ? "bg-primary text-primary-foreground shadow-md" : "bg-background text-muted-foreground hover:text-foreground border border-border"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "aluguel" ? (
              <div className="col-span-full"><AluguelFaixa /></div>
            ) : tabImoveis.length > 0 ? tabImoveis.map((imovel) => <PropertyCard key={imovel.id} imovel={imovel} />) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">Nenhum imóvel encontrado nesta categoria.</div>
            )}
          </div>
        </div>
      </section>

      <ProprietarioBloco fundo="bg-background" />

      <HomeSobreServicos />

      {/* CTA Proprietário */}
      <section className="section-padding bg-primary-dark">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Quer vender ou alugar seu imóvel?</h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">Anuncie com quem oferece segurança jurídica. Seu imóvel merece uma gestão profissional.</p>
            <Button variant="accent" size="xl" asChild>
              <Link to="/anuncie">Anuncie seu imóvel <ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
