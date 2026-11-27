import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CIDADES, getServico } from "@/data/servicos";
import NotFound from "./NotFound";

const whatsapp = (msg: string) => "https://wa.me/5519992243434?text=" + encodeURIComponent(msg);

/** Página de um serviço da imobiliária, montada a partir de src/data/servicos.ts. */
export default function ServicoPage({ slug }: { slug: string }) {
  const s = getServico(slug);
  useSEO(s?.seoTitle ?? "Serviços | Nova Imobiliária", s?.seoDescription ?? "", `/${slug}`);
  if (!s) return <NotFound />;

  const link = whatsapp(s.whatsappMsg);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div>
      <div className="bg-primary-dark text-white page-hero">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{s.h1}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">{s.intro}</p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Button variant="accent" size="lg" className="w-full sm:w-auto">
              <MessageCircle className="h-5 w-5" />
              Falar pelo WhatsApp
            </Button>
          </a>
          <p className="text-white/60 text-sm mt-4">Valor sob consulta, sem compromisso.</p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container max-w-3xl">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">O que fazemos</h2></ScrollReveal>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.paraQuem.map((item) => (
              <li key={item} className="flex items-start gap-3 glass-card rounded-2xl p-4">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding glow-bg">
        <div className="container max-w-4xl">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Como funciona</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.passos.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="h-full glass-card rounded-2xl p-6">
                  <div className="h-10 w-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-4">{i + 1}</div>
                  <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Cidades atendidas</h2>
          <p className="text-muted-foreground mb-6">Sede em Vargem Grande do Sul/SP, com atendimento em toda a região.</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {CIDADES.map((c) => (
              <li key={c} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container max-w-3xl">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Perguntas frequentes</h2></ScrollReveal>
          <div className="space-y-4">
            {s.faq.map((item) => (
              <div key={item.q} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
          {s.nota && <p className="text-xs text-muted-foreground text-center mt-8">{s.nota}</p>}
          <div className="text-center mt-10">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg">
                <MessageCircle className="h-5 w-5" />
                Pedir orçamento pelo WhatsApp
              </Button>
            </a>
            <p className="mt-6 text-sm">
              <Link to="/servicos" className="text-primary hover:underline">Ver todos os serviços</Link>
            </p>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </section>
    </div>
  );
}
