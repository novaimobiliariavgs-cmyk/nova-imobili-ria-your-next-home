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
                A Nova Imobiliária nasceu em janeiro de 2023, em Vargem Grande do Sul, a partir da parceria entre profissionais das áreas jurídica e imobiliária que já atuavam na região e identificaram a necessidade de um serviço mais completo e seguro. A união entre advocacia e corretagem foi o ponto de partida para a criação de uma empresa com visão estratégica e foco em soluções.
              </p>
              <p>
                Desde o início, a proposta foi oferecer muito mais do que a simples intermediação de imóveis, trazendo segurança jurídica para cada negociação e garantindo maior tranquilidade para proprietários, compradores e locatários. A experiência acumulada ao longo de anos de atuação permitiu estruturar um modelo de atendimento eficiente, transparente e confiável.
              </p>
              <p>
                Hoje, a Nova Imobiliária atua na venda, locação e administração de imóveis residenciais, comerciais e terrenos, além de oferecer assessoria completa em contratos, avaliações e demais demandas imobiliárias. Com forte presença local, seguimos construindo nossa trajetória com base na ética, agilidade e compromisso com resultados.
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
