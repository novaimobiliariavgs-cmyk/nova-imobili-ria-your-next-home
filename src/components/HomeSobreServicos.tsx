import { Link } from "react-router-dom";
import { KeyRound, Home, ClipboardCheck, FileText } from "lucide-react";

const servicos = [
  {
    icon: KeyRound,
    title: "Aluguel de imóveis",
    desc: "Casas, apartamentos e salas comerciais para alugar em Vargem Grande do Sul e região, com agendamento de visitas e contrato claro.",
    link: "/imoveis?finalidade=aluguel",
    cta: "Ver imóveis para alugar",
  },
  {
    icon: Home,
    title: "Venda de imóveis",
    desc: "Casas, apartamentos, terrenos, sítios e imóveis comerciais, com avaliação, divulgação, negociação e acompanhamento da documentação até a escritura.",
    link: "/imoveis?finalidade=venda",
    cta: "Ver imóveis à venda",
  },
  {
    icon: ClipboardCheck,
    title: "Administração para proprietários",
    desc: "Divulgação, análise do inquilino, contrato, vistoria com relatório fotográfico, cobrança mensal, acompanhamento de atrasos e repasse do aluguel com demonstrativo.",
    link: "/anuncie",
    cta: "Anunciar meu imóvel",
  },
  {
    icon: FileText,
    title: "Laudos de avaliação",
    desc: "Laudos para inventário, partilha, divórcio, processos judiciais, revisional e renovatória de aluguel, ITCMD e venda.",
    link: "/avaliacao",
    cta: "Pedir orçamento de laudo",
  },
];

const faq = [
  {
    q: "Como alugar um imóvel com a Nova Imobiliária?",
    a: "Veja os imóveis disponíveis na página de aluguel ou chame no WhatsApp (19) 99224-3434. Agendamos a visita, analisamos o cadastro e preparamos o contrato com a garantia adequada ao seu caso.",
  },
  {
    q: "Quero colocar meu imóvel para alugar. O que a Nova Imobiliária faz?",
    a: "Cuidamos de tudo: divulgação, análise e seleção do inquilino, contrato, vistoria com relatório fotográfico, cobrança mensal, acompanhamento de atrasos e repasse do aluguel com demonstrativo.",
  },
  {
    q: "A Nova Imobiliária também vende imóveis?",
    a: "Sim. Fazemos a avaliação, a divulgação, as visitas e a negociação, e acompanhamos a documentação até a escritura. Também ajudamos quem quer comprar a encontrar o imóvel certo.",
  },
  {
    q: "Vocês fazem laudo de avaliação de imóvel?",
    a: "Sim. Fazemos laudos de imóveis residenciais, comerciais, terrenos e rurais, para inventário, partilha, divórcio, processos judiciais, revisional e renovatória de aluguel, ITCMD e venda.",
  },
  {
    q: "Quais cidades a Nova Imobiliária atende?",
    a: "Vargem Grande do Sul, São João da Boa Vista, Casa Branca, Itobi, Divinolândia e Poços de Caldas.",
  },
  {
    q: "Qual o endereço e o horário de atendimento?",
    a: "Rua Saldanha Marinho, 574, Centro, Vargem Grande do Sul/SP. Atendemos de segunda a sexta, das 8h às 17h, e pelo WhatsApp (19) 99224-3434.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/** Texto institucional, serviços e perguntas frequentes da home (SEO e respostas de IA). */
export function HomeSobreServicos() {
  return (
    <>
      <section className="section-padding bg-background">
        <div className="container">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Imobiliária em Vargem Grande do Sul</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Nova Imobiliária é uma imobiliária em Vargem Grande do Sul/SP que aluga, vende e administra imóveis
              residenciais e comerciais. Os sócios são advogados: contratos de locação e de compra e venda são
              elaborados com rigor jurídico, com a garantia adequada a cada caso e acompanhamento próximo quando há
              atraso no aluguel. O atendimento é feito pelo WhatsApp (19) 99224-3434.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicos.map((s) => (
              <div key={s.title} className="p-6 rounded-xl border border-border bg-card">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                <Link to={s.link} className="text-sm font-medium text-primary hover:underline">
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Perguntas frequentes</h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-foreground mb-1">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </section>
    </>
  );
}
