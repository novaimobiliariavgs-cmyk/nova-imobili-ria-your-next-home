import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getWhatsAppLink } from "@/data/properties";
import { useCreateLead } from "@/hooks/useLeads";
import { toast } from "sonner";

const info = [
  { icon: MapPin, label: "Endereço", value: "R. Saldanha Marinho, 574 - Centro, Vargem Grande do Sul - SP, 13880-000" },
  { icon: Phone, label: "Telefone", value: "(19) 99224-3434" },
  { icon: Mail, label: "E-mail", value: "contato@novaimobiliaria.com.br" },
  { icon: Clock, label: "Horário", value: "Seg a Sex: 8h às 18h · Sáb: 8h às 12h" },
];

export default function ContatoPage() {
  const createLead = useCreateLead();
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", mensagem: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.telefone.trim()) {
      toast.error("Preencha nome e telefone");
      return;
    }
    try {
      await createLead.mutateAsync({
        nome: form.nome, telefone: form.telefone,
        email: form.email || null, tipo: "comprador",
        mensagem: form.mensagem || null, origem: "formulario",
      });
      toast.success("Mensagem enviada! Retornaremos em breve.");
      setForm({ nome: "", telefone: "", email: "", mensagem: "" });
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    }
  };

  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding-sm">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">Contato</h1>
          <p className="text-white/70 mt-1">Fale conosco — estamos prontos para ajudar</p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-6">
                {info.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><item.icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
                <Button variant="whatsapp" size="lg" asChild>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" /> Falar no WhatsApp</a>
                </Button>
                <div className="aspect-video rounded-xl bg-muted overflow-hidden mt-4">
                  <iframe title="Localização" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29608.71817073!2d-46.90!3d-21.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9e0a0a0a0a0a0%3A0x0!2sVargem%20Grande%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">Envie uma mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Seu nome *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm" required />
                  <input type="tel" placeholder="Seu telefone *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm" required />
                  <input type="email" placeholder="Seu e-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-11 rounded-lg border border-input bg-background px-4 text-sm" />
                  <textarea placeholder="Sua mensagem *" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={5} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm resize-none" required />
                  <Button type="submit" variant="accent" size="lg" className="w-full" disabled={createLead.isPending}>
                    {createLead.isPending ? "Enviando..." : "Enviar mensagem"}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
