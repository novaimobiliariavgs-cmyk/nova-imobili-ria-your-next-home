import { Link } from "react-router-dom";
import { MessageCircle, Send, Images, KeyRound, Scale, Home as HomeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getWhatsAppAluguelLink, getWhatsAppProprietarioLink } from "@/data/properties";

const etapas = [
  { icon: Send, title: "Chame no WhatsApp", desc: "Conte o que você procura: casa ou apartamento, bairro e valor." },
  { icon: Images, title: "Receba as opções", desc: "Enviamos na hora as fotos e os valores dos imóveis disponíveis." },
  { icon: KeyRound, title: "Visite o imóvel", desc: "Agendamos a visita no melhor horário para você." },
  { icon: Scale, title: "Contrato seguro", desc: "Contrato claro, revisado por advogado, com a garantia certa para o seu caso." },
];

/** Página de aluguel: no lugar da lista de imóveis, convida o cliente a chamar no WhatsApp. */
export function AluguelContato() {
  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Imóveis para alugar em Vargem Grande do Sul</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Temos casas e apartamentos disponíveis. Como os imóveis para alugar mudam toda semana, o jeito mais rápido é chamar no
            WhatsApp: mandamos as opções disponíveis na hora.
          </p>
          <Button variant="accent" size="xl" asChild>
            <a href={getWhatsAppAluguelLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Quero alugar um imóvel
            </a>
          </Button>
          <p className="text-white/60 text-sm mt-4">WhatsApp (19) 99224-3434</p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Como funciona</h2></ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {etapas.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 100}>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4"><e.icon className="h-8 w-8" /></div>
                  <h3 className="font-semibold text-foreground">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="accent" size="lg" asChild>
              <a href={getWhatsAppAluguelLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ProprietarioBloco />
    </div>
  );
}

/** Faixa curta para as listas de imóveis, levando quem quer alugar ao WhatsApp. */
export function AluguelFaixa() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
      <p className="text-sm text-foreground">
        <span className="font-semibold">Procura imóvel para alugar?</span> Chame no WhatsApp e mandamos as opções disponíveis na hora.
      </p>
      <Button variant="accent" size="sm" asChild>
        <a href={getWhatsAppAluguelLink()} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-4 w-4" />
          Quero alugar
        </a>
      </Button>
    </div>
  );
}

/** Bloco para captar proprietários que querem colocar o imóvel para alugar. */
export function ProprietarioBloco({ fundo = "bg-muted/30" }: { fundo?: string }) {
  return (
    <section className={`section-padding ${fundo}`}>
      <div className="container max-w-3xl">
        <ScrollReveal>
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><HomeIcon className="h-7 w-7" /></div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Tem um imóvel para alugar?</h2>
            <p className="text-muted-foreground mb-6">
              A Nova administra para você: divulgação, análise do inquilino, contrato, vistoria com relatório fotográfico,
              cobrança mensal e repasse do aluguel, tudo com acompanhamento jurídico.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="accent" size="lg" asChild>
                <a href={getWhatsAppProprietarioLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Falar sobre meu imóvel
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/anuncie">Ver como funciona <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
