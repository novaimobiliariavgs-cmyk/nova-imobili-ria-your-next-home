import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import {
  ScrollText, Users, Gavel, KeyRound, Receipt, Handshake, Landmark, Building2,
  Zap, MapPin, FileCheck, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCreateLead } from "@/hooks/useLeads";
import { toast } from "sonner";

const WHATSAPP =
  "https://wa.me/5519992243434?text=" +
  encodeURIComponent("Olá! Gostaria de um orçamento de laudo de avaliação de imóvel.");

const finalidades = [
  { icon: ScrollText, title: "Inventário e partilha", desc: "Valor dos imóveis do espólio para inventário judicial ou em cartório e para a divisão entre herdeiros." },
  { icon: Users, title: "Divórcio e união estável", desc: "Avaliação dos imóveis do casal para a partilha de bens." },
  { icon: Gavel, title: "Processos judiciais", desc: "Laudos para ações, perícias e assistência técnica às partes em processos que envolvem imóveis." },
  { icon: KeyRound, title: "Revisional e renovatória de aluguel", desc: "Laudo do valor de locação do imóvel residencial ou comercial." },
  { icon: Receipt, title: "ITCMD, doação e ganho de capital", desc: "Valor de mercado para doações, impostos e declarações." },
  { icon: Handshake, title: "Compra, venda e negociação", desc: "Saiba quanto vale o imóvel antes de comprar, vender ou fazer uma proposta." },
  { icon: Landmark, title: "Garantias e financiamento", desc: "Avaliação de imóveis oferecidos em garantia ou em operações de crédito." },
  { icon: Building2, title: "Empresas e holdings", desc: "Valor para integralização de capital, planejamento patrimonial e sucessório." },
];

const diferenciais = [
  { icon: FileCheck, title: "Todos os tipos de laudo", desc: "Laudos e pareceres de avaliação para qualquer finalidade, residencial, comercial, terreno ou rural." },
  { icon: Zap, title: "Entrega rápida", desc: "Atendimento ágil, do primeiro contato à entrega do laudo." },
  { icon: MapPin, title: "Mercado local", desc: "Conhecemos os bairros e os preços de Vargem Grande do Sul e região." },
  { icon: MessageCircle, title: "Orçamento sob consulta", desc: "O valor depende do imóvel e da finalidade. Peça seu orçamento sem compromisso." },
];

const faq = [
  { q: "Quanto custa um laudo de avaliação de imóvel?", a: "O valor depende do tipo de imóvel, do tamanho e da finalidade do laudo. Envie os dados pelo formulário ou pelo WhatsApp e passamos o orçamento sem compromisso." },
  { q: "Em quanto tempo o laudo fica pronto?", a: "Trabalhamos com entrega rápida. O prazo de cada laudo é informado junto com o orçamento." },
  { q: "O laudo serve para inventário e processos judiciais?", a: "Sim. Elaboramos laudos e pareceres para inventários, partilhas, divórcios, ações revisionais e renovatórias de aluguel e outros processos judiciais." },
  { q: "Quais cidades vocês atendem?", a: "Vargem Grande do Sul, São João da Boa Vista, Casa Branca, Itobi, Divinolândia, Poços de Caldas e região." },
];

export default function AvaliacaoPage() {
  useSEO(
    "Laudo de Avaliação de Imóveis em Vargem Grande do Sul | Nova Imobiliária",
    "Laudo de avaliação de imóveis em Vargem Grande do Sul e região para inventário, partilha, divórcio, processos judiciais, revisional de aluguel e mais. Entrega rápida. Peça seu orçamento.",
    "/avaliacao"
  );
  const createLead = useCreateLead();
  const [form, setForm] = useState({ nome: "", telefone: "", finalidade: "", tipo: "", cidade: "", mensagem: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha nome e telefone");
      return;
    }
    try {
      await createLead.mutateAsync({
        nome: form.nome, telefone: form.telefone,
        tipo: "avaliacao", origem: "formulario",
        mensagem: `Laudo de avaliação. Finalidade: ${form.finalidade || "N/A"}, Imóvel: ${form.tipo || "N/A"}, Cidade: ${form.cidade || "N/A"}. ${form.mensagem}`.trim(),
      });
      toast.success("Pedido enviado! Entraremos em contato com o orçamento.");
      setForm({ nome: "", telefone: "", finalidade: "", tipo: "", cidade: "", mensagem: "" });
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    }
  };

  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Laudo de Avaliação de Imóveis<br />em Vargem Grande do Sul</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Laudos e pareceres de avaliação para todas as finalidades, com entrega rápida e atendimento local em Vargem Grande do Sul e região.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">Pedir orçamento pelo WhatsApp</Button>
            </a>
            <a href="#orcamento">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white">Preencher formulário</Button>
            </a>
          </div>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">Para que serve o laudo de avaliação</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">Fazemos todos os tipos de laudo de avaliação de imóveis. Os mais pedidos:</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalidades.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 60}>
                <div className="h-full rounded-xl border border-border bg-card p-6">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4"><f.icon className="h-6 w-6" /></div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Por que fazer seu laudo com a Nova</h2></ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 80}>
                <div className="text-center">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><d.icon className="h-7 w-7" /></div>
                  <h3 className="font-semibold text-foreground">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="orcamento" className="section-padding bg-background scroll-mt-20">
        <div className="container max-w-2xl">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Peça seu orçamento</h2>
              <p className="text-sm text-muted-foreground mb-6">Sem compromisso. Respondemos com o valor e o prazo do seu laudo.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Seu nome *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm" required />
                  <input type="tel" placeholder="Seu telefone *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select value={form.finalidade} onChange={(e) => setForm({ ...form, finalidade: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm">
                    <option value="">Finalidade do laudo</option>
                    {finalidades.map((f) => <option key={f.title} value={f.title}>{f.title}</option>)}
                    <option value="Outra">Outra</option>
                  </select>
                  <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm">
                    <option value="">Tipo de imóvel</option>
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Rural">Rural (sítio, chácara)</option>
                  </select>
                </div>
                <input type="text" placeholder="Cidade do imóvel" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm" />
                <textarea placeholder="Conte um pouco sobre o imóvel (opcional)" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm resize-none" />
                <Button type="submit" variant="accent" size="lg" className="w-full" disabled={createLead.isPending}>
                  {createLead.isPending ? "Enviando..." : "Pedir orçamento"}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container max-w-3xl">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Perguntas frequentes</h2></ScrollReveal>
          <div className="space-y-4">
            {faq.map((item) => (
              <ScrollReveal key={item.q}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
