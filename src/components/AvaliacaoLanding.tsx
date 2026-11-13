import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

export type Secao = { titulo: string; itens: string[] };
export type Pergunta = { q: string; a: string };

type Props = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  secoes: Secao[];
  faq: Pergunta[];
  whatsappTexto: string;
};

export function AvaliacaoLanding({ path, seoTitle, seoDescription, h1, intro, secoes, faq, whatsappTexto }: Props) {
  useSEO(seoTitle, seoDescription, path);
  const whatsapp = "https://wa.me/5519992243434?text=" + encodeURIComponent(whatsappTexto);

  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">{h1}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">{intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">Pedir orçamento pelo WhatsApp</Button>
            </a>
            <Link to="/avaliacao#orcamento">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white">Preencher formulário</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container max-w-4xl grid gap-8 md:grid-cols-2">
          {secoes.map((s) => (
            <ScrollReveal key={s.titulo}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">{s.titulo}</h2>
                <ul className="space-y-3">
                  {s.itens.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
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
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-4">Fazemos todos os tipos de laudo de avaliação de imóveis, com entrega rápida e orçamento sob consulta.</p>
            <Link to="/avaliacao" className="text-primary font-semibold hover:underline">Ver todos os tipos de laudo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
