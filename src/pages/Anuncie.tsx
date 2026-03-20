import { useState } from "react";
import { ClipboardList, BarChart3, Megaphone, Handshake, Scale, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { toast } from "sonner";

const etapas = [
  { icon: ClipboardList, title: "Cadastro", desc: "Preencha o formulário com as informações do seu imóvel" },
  { icon: BarChart3, title: "Avaliação", desc: "Analisamos o mercado e definimos o melhor preço" },
  { icon: Megaphone, title: "Divulgação", desc: "Anunciamos em portais e redes sociais" },
  { icon: Handshake, title: "Venda/Locação", desc: "Acompanhamos toda a negociação até a conclusão" },
];

export default function AnunciePage() {
  const [form, setForm] = useState({
    nome: "", telefone: "", tipo: "", finalidade: "", bairro: "", mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha nome e telefone");
      return;
    }
    toast.success("Cadastro enviado! Entraremos em contato em breve.");
    setForm({ nome: "", telefone: "", tipo: "", finalidade: "", bairro: "", mensagem: "" });
  };

  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Venda ou alugue seu imóvel<br />com segurança jurídica</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Conte com uma imobiliária gerenciada por advogado para cuidar do seu patrimônio
          </p>
        </div>
      </div>

      {/* Etapas */}
      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Como funciona</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {etapas.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 100}>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                    <e.icon className="h-8 w-8" />
                  </div>
                  <div className="text-xs font-bold text-accent mb-1">Etapa {i + 1}</div>
                  <h3 className="font-semibold text-foreground">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-2xl">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cadastre seu imóvel</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Seu nome *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm" required />
                  <input type="tel" placeholder="Seu telefone *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm">
                    <option value="">Tipo de imóvel</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="comercial">Comercial</option>
                  </select>
                  <select value={form.finalidade} onChange={(e) => setForm({ ...form, finalidade: e.target.value })} className="h-11 rounded-lg border border-input bg-background px-4 text-sm">
                    <option value="">Finalidade</option>
                    <option value="venda">Venda</option>
                    <option value="aluguel">Aluguel</option>
                  </select>
                </div>
                <input type="text" placeholder="Bairro" value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm" />
                <textarea placeholder="Mensagem (opcional)" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm resize-none" />
                <Button type="submit" variant="accent" size="lg" className="w-full">Enviar cadastro</Button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <Scale className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground text-sm">Diferencial jurídico</h4>
                <p className="text-sm text-muted-foreground">Toda documentação é revisada por advogado especializado, garantindo segurança em cada etapa.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
