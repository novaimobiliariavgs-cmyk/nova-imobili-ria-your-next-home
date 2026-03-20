import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Home, Building, TreePine, Store, Shield, Scale, Eye, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cidades, type Finalidade } from "@/data/properties";
import { useImoveisDestaque, useImoveis } from "@/hooks/useImoveis";
import heroBg from "@/assets/hero-bg.jpg";

const categories = [
  { label: "Comprar", icon: Home, desc: "Casas e apartamentos à venda", link: "/imoveis?finalidade=venda", color: "bg-primary/10 text-primary" },
  { label: "Alugar", icon: Building, desc: "Imóveis para locação", link: "/imoveis?finalidade=aluguel", color: "bg-accent/10 text-accent" },
  { label: "Terrenos", icon: TreePine, desc: "Lotes e terrenos disponíveis", link: "/imoveis?tipo=terreno", color: "bg-whatsapp/10 text-whatsapp" },
  { label: "Comercial", icon: Store, desc: "Salas e pontos comerciais", link: "/imoveis?tipo=comercial", color: "bg-primary/10 text-primary" },
];

const diferenciais = [
  { icon: Scale, title: "Segurança Jurídica", desc: "Imobiliária gerenciada por advogado com experiência em direito imobiliário" },
  { icon: Shield, title: "Transparência Total", desc: "Documentação verificada e processos claros do início ao fim" },
  { icon: Eye, title: "Avaliação Justa", desc: "Análise criteriosa de mercado para precificação adequada" },
  { icon: Handshake, title: "Atendimento Humano", desc: "Acompanhamento personalizado em todas as etapas da negociação" },
];

export default function HomePage() {
  const [finalidade, setFinalidade] = useState<Finalidade>("venda");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");
  
  const [activeTab, setActiveTab] = useState<string>("venda");

  const { data: destaque = [] } = useImoveisDestaque();

  const tabFilters = (() => {
    if (activeTab === "venda") return { finalidade: "venda" };
    if (activeTab === "aluguel") return { finalidade: "aluguel" };
    if (activeTab === "terrenos") return { tipo: "terreno" };
    if (activeTab === "comercial") return { tipo: "comercial" };
    return {};
  })();
  const { data: tabImoveis = [] } = useImoveis(tabFilters);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[hsl(var(--hero-overlay)/0.75)]" />
        <div className="relative z-10 container text-center py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-4 animate-reveal-up">
            Encontre seu imóvel ideal
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-reveal-up" style={{ animationDelay: "100ms" }}>
            Compra, venda e locação com segurança jurídica
          </p>
          <div className="animate-reveal-up max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl" style={{ animationDelay: "200ms" }}>
            <div className="flex flex-col md:flex-row gap-2">
              <select value={finalidade} onChange={(e) => setFinalidade(e.target.value as Finalidade)} className="h-12 rounded-xl border-0 bg-muted px-4 text-sm font-medium text-foreground focus:ring-2 focus:ring-primary">
                <option value="venda">Comprar</option>
                <option value="aluguel">Alugar</option>
              </select>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="h-12 rounded-xl border-0 bg-muted px-4 text-sm text-foreground focus:ring-2 focus:ring-primary flex-1">
                <option value="">Tipo de imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </select>
              <select value={cidade} onChange={(e) => setCidade(e.target.value)} className="h-12 rounded-xl border-0 bg-muted px-4 text-sm text-foreground focus:ring-2 focus:ring-primary flex-1">
                <option value="">Todas as cidades</option>
                {cidades.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <Button variant="accent" size="lg" className="rounded-xl" asChild>
                <Link to={`/imoveis?finalidade=${finalidade}${tipo ? `&tipo=${tipo}` : ""}${cidade ? `&cidade=${cidade}` : ""}`}>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat) => (
                <Link key={cat.label} to={cat.link} className="group flex flex-col items-center text-center p-6 rounded-xl border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-3 ${cat.color} group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Imóveis em Destaque</h2>
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

      {/* Diferenciais */}
      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Por que escolher a Nova Imobiliária</h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Mais do que uma imobiliária: segurança jurídica e transparência em cada negociação</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 80}>
                <div className="text-center p-6">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><d.icon className="h-7 w-7" /></div>
                  <h3 className="font-semibold text-foreground mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-foreground mb-6">Imóveis por categoria</h2>
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
            {tabImoveis.length > 0 ? tabImoveis.map((imovel) => <PropertyCard key={imovel.id} imovel={imovel} />) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">Nenhum imóvel encontrado nesta categoria.</div>
            )}
          </div>
        </div>
      </section>

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
