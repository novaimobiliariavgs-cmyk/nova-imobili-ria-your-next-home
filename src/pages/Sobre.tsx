import { Scale, Building2, Handshake } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  { value: "70+", label: "Imóveis na carteira" },
  { value: "3", label: "Anos de atuação" },
];

export default function SobrePage() {
  return (
    <div className="pt-16">
      <div className="bg-primary-dark text-white section-padding">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Sobre a Nova Imobiliária</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Conheça nossa história e o que nos torna diferentes
          </p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-4">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A Nova Imobiliária nasceu em 2023 com o objetivo de transformar a experiência de compra, venda e locação de imóveis na região de Vargem Grande do Sul.
              </p>
              <p>
                Desde o início, nosso compromisso é oferecer segurança e transparência em cada negociação, garantindo que compradores, vendedores e locatários tenham seus interesses protegidos em todas as etapas do processo.
              </p>
              <p>
                Com atuação sólida na região, construímos uma reputação baseada na ética, agilidade e resultados concretos para nossos clientes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Diferencial */}
      <section className="section-padding bg-muted/30">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
              <Scale className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Diferencial Jurídico</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A Nova Imobiliária é gerenciada por um escritório de advocacia com conhecimento especializado em direito imobiliário. Isso significa que toda documentação, contrato e negociação passa por análise jurídica rigorosa, protegendo seu patrimônio e garantindo tranquilidade em cada transação.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-primary-dark">
        <div className="container">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold text-accent">{s.value}</p>
                  <p className="text-white/70 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
