import { useParams, Link } from "react-router-dom";
import { Bed, Bath, Car, Maximize, MapPin, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { formatPrice, getWhatsAppLink } from "@/data/properties";
import { useImovel, useImoveis } from "@/hooks/useImoveis";
import { useCreateLead } from "@/hooks/useLeads";
import { useState } from "react";
import { toast } from "sonner";

export default function ImovelDetailPage() {
  const { id } = useParams();
  const { data: imovel, isLoading } = useImovel(id);
  const { data: allImoveis = [] } = useImoveis();
  const createLead = useCreateLead();
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", mensagem: "" });

  if (isLoading) {
    return <div className="pt-16 min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div>;
  }

  if (!imovel) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Imóvel não encontrado</h1>
          <Button asChild><Link to="/imoveis">Ver todos os imóveis</Link></Button>
        </div>
      </div>
    );
  }

  const similares = allImoveis.filter((i) => i.id !== imovel.id && i.tipo === imovel.tipo).slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha nome e telefone");
      return;
    }
    try {
      await createLead.mutateAsync({
        nome: form.nome, telefone: form.telefone, email: form.email || null,
        tipo: "comprador", imovel_codigo: imovel.codigo,
        mensagem: form.mensagem || null, origem: "formulario",
      });
      toast.success("Interesse enviado! Entraremos em contato em breve.");
      setForm({ nome: "", telefone: "", email: "", mensagem: "" });
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    }
  };

  return (
    <div className="pt-16">
      <div className="container section-padding">
        <Link to="/imoveis" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar aos imóveis
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="aspect-video rounded-xl bg-muted flex items-center justify-center overflow-hidden">
              {imovel.fotos && imovel.fotos[0] ? (
                <img src={imovel.fotos[0]} alt={imovel.titulo} className="w-full h-full object-cover" />
              ) : (
                <div className="text-muted-foreground/30 text-center">
                  <Maximize className="h-16 w-16 mx-auto mb-2" /><p className="text-sm">Galeria de fotos</p>
                </div>
              )}
            </div>

            <ScrollReveal>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" /> {imovel.bairro}, {imovel.cidade} · Código: {imovel.codigo}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{imovel.titulo}</h1>
                <p className="text-3xl font-bold text-primary mt-3">{formatPrice(imovel.preco, imovel.finalidade)}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                {(imovel.quartos || 0) > 0 && <div className="flex items-center gap-2"><Bed className="h-5 w-5 text-muted-foreground" /><div><span className="font-semibold">{imovel.quartos}</span> <span className="text-sm text-muted-foreground">Quartos</span></div></div>}
                {(imovel.banheiros || 0) > 0 && <div className="flex items-center gap-2"><Bath className="h-5 w-5 text-muted-foreground" /><div><span className="font-semibold">{imovel.banheiros}</span> <span className="text-sm text-muted-foreground">Banheiros</span></div></div>}
                {(imovel.vagas || 0) > 0 && <div className="flex items-center gap-2"><Car className="h-5 w-5 text-muted-foreground" /><div><span className="font-semibold">{imovel.vagas}</span> <span className="text-sm text-muted-foreground">Vagas</span></div></div>}
                <div className="flex items-center gap-2"><Maximize className="h-5 w-5 text-muted-foreground" /><div><span className="font-semibold">{imovel.metragem}</span> <span className="text-sm text-muted-foreground">m²</span></div></div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div><h2 className="text-lg font-semibold text-foreground mb-3">Descrição</h2><p className="text-muted-foreground leading-relaxed">{imovel.descricao}</p></div>
            </ScrollReveal>
          </div>

          <aside className="lg:w-96 shrink-0">
            <ScrollReveal>
              <div className="sticky top-24 space-y-4">
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Tenho interesse neste imóvel</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" placeholder="Seu nome *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" required />
                    <input type="tel" placeholder="Seu telefone *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" required />
                    <input type="email" placeholder="Seu e-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" />
                    <textarea placeholder="Mensagem (opcional)" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none" />
                    <Button type="submit" className="w-full" size="lg" disabled={createLead.isPending}>
                      {createLead.isPending ? "Enviando..." : "Enviar interesse"}
                    </Button>
                  </form>
                </div>
                <Button variant="whatsapp" size="lg" className="w-full" asChild>
                  <a href={getWhatsAppLink(imovel.codigo, imovel.titulo)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </aside>
        </div>

        {similares.length > 0 && (
          <div className="mt-16">
            <ScrollReveal><h2 className="text-2xl font-bold text-foreground mb-6">Imóveis similares</h2></ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similares.map((s, i) => <ScrollReveal key={s.id} delay={i * 80}><PropertyCard imovel={s} /></ScrollReveal>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
