import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { laudoCard, servicos } from "@/data/servicos";

const cards = [laudoCard, ...servicos];

export default function ServicosPage() {
  useSEO(
    "Serviços Imobiliários em Vargem Grande do Sul e Região | Nova Imobiliária",
    "Laudos de avaliação, vistoria de imóvel, locação sem administração, imóvel herdado, regularização e imóveis de leilão em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas e região.",
    "/servicos"
  );

  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Serviços</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Além de vender, alugar e administrar imóveis, a Nova Imobiliária resolve o que o seu imóvel precisa.
            Atendemos Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas e região. Valores sob consulta.
          </p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 60}>
                <Link
                  to={`/${c.slug}`}
                  className="group h-full flex flex-col rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-semibold text-lg text-foreground mb-1">{c.nome}</h2>
                  <p className="text-sm text-muted-foreground flex-1">{c.resumo}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Saiba mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
