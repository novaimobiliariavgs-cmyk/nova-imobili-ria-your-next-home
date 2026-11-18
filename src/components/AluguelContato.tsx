import { Link } from "react-router-dom";
import { MessageCircle, Home as HomeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getWhatsAppAluguelLink, getWhatsAppProprietarioLink } from "@/data/properties";

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
