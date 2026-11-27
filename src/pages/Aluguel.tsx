import { Link } from "react-router-dom";
import {
  MessageCircle, Send, Images, KeyRound, Scale, Home as HomeIcon, Building2, Store, MapPin, Clock, ClipboardCheck, ShieldCheck,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProprietarioBloco } from "@/components/AluguelContato";
import { getWhatsAppAluguelLink } from "@/data/properties";

export const ALUGUEL_PATH = "/casas-para-alugar-vargem-grande-do-sul";
const CATALOGO_WHATSAPP = "https://wa.me/c/5519992243434";

const etapas = [
  { icon: Send, title: "1. Chame no WhatsApp", desc: "Conte o que você procura: casa ou apartamento, número de quartos, bairro e valor." },
  { icon: Images, title: "2. Receba as opções", desc: "Enviamos as casas disponíveis no momento, com fotos, endereço e valor do aluguel." },
  { icon: KeyRound, title: "3. Visite o imóvel", desc: "Agendamos a visita no melhor horário para você, com um corretor da Nova." },
  { icon: Scale, title: "4. Assine com segurança", desc: "Contrato claro, elaborado e revisado por advogados, e vistoria de entrada com fotos." },
];

const tipos = [
  { icon: HomeIcon, title: "Casas", desc: "De 1 a 4 quartos, com e sem garagem, em vários bairros da cidade." },
  { icon: Building2, title: "Apartamentos", desc: "Opções para quem busca praticidade e segurança." },
  { icon: Store, title: "Comerciais", desc: "Salas, pontos comerciais e barracões para o seu negócio." },
];

const bairros = [
  "Centro", "Jardim Paraíso", "Residencial Colina", "Jardim Bela Vista", "Nossa Senhora Aparecida",
  "Vila Santa Terezinha", "Jardim São Paulo", "Jardim Paulista",
];

const diferenciais = [
  { icon: ShieldCheck, title: "Segurança jurídica", desc: "Os sócios da Nova são advogados. Seu contrato segue a Lei do Inquilinato (Lei 8.245/91), sem cláusulas surpresa." },
  { icon: ClipboardCheck, title: "Vistoria com fotos", desc: "O estado do imóvel fica registrado na entrada, o que protege você na hora de devolver as chaves." },
  { icon: MapPin, title: "Imobiliária local", desc: "Escritório no Centro de Vargem Grande do Sul, na Rua Saldanha Marinho, 570." },
  { icon: Clock, title: "Atendimento rápido", desc: "Segunda a sexta, das 8h às 11h e das 13h às 17h, pelo WhatsApp ou no escritório." },
];

const faq = [
  {
    q: "Quais casas estão disponíveis para alugar em Vargem Grande do Sul?",
    a: "Os imóveis disponíveis mudam toda semana. Pelo WhatsApp (19) 99224-3434 você recebe na hora a lista atualizada das casas e apartamentos para alugar, com fotos, endereço e valor.",
  },
  {
    q: "Quais documentos preciso para alugar uma casa?",
    a: "Em geral, documento com foto, CPF, comprovante de renda e comprovante de residência. A lista completa depende da garantia escolhida e é enviada no atendimento.",
  },
  {
    q: "Preciso de fiador para alugar?",
    a: "Nem sempre. A Lei do Inquilinato prevê outras modalidades de garantia, e indicamos a mais adequada para o seu caso e para o imóvel escolhido.",
  },
  {
    q: "O contrato de aluguel é seguro?",
    a: "Sim. Os contratos da Nova Imobiliária são elaborados e revisados pelos sócios advogados, de acordo com a Lei do Inquilinato (Lei 8.245/91), e a entrada no imóvel é feita com vistoria fotográfica.",
  },
  {
    q: "Quais bairros vocês atendem?",
    a: `Temos imóveis para alugar em todos os bairros de Vargem Grande do Sul, como ${bairros.slice(0, -1).join(", ")} e ${bairros[bairros.length - 1]}.`,
  },
  {
    q: "Tenho uma casa para alugar. A Nova pode administrar?",
    a: "Sim. Cuidamos da divulgação, da análise do inquilino, do contrato, da vistoria, da cobrança mensal e do repasse do aluguel, com acompanhamento jurídico.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function AluguelPage() {
  useSEO(
    "Casas para Alugar em Vargem Grande do Sul | Nova Imobiliária",
    "Casas e apartamentos para alugar em Vargem Grande do Sul/SP. Receba pelo WhatsApp as opções disponíveis com fotos e valores. Contrato com segurança jurídica.",
    ALUGUEL_PATH
  );

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-primary-dark text-white section-padding">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Casas para alugar em Vargem Grande do Sul</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            A Nova Imobiliária tem casas, apartamentos e imóveis comerciais para alugar em Vargem Grande do Sul/SP. Chame no
            WhatsApp e receba na hora as opções disponíveis, com fotos e valores.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="accent" size="xl" asChild>
              <a href={getWhatsAppAluguelLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Quero alugar uma casa
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white">
              <a href={CATALOGO_WHATSAPP} target="_blank" rel="noopener noreferrer">
                <Images className="h-5 w-5" />
                Ver catálogo de imóveis
              </a>
            </Button>
          </div>
          <p className="text-white/60 text-sm mt-4">WhatsApp (19) 99224-3434</p>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">Como alugar uma casa com a Nova</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">Do primeiro contato à entrega das chaves, em quatro passos.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {etapas.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 80}>
                <div className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4"><e.icon className="h-8 w-8" /></div>
                  <h3 className="font-semibold text-foreground">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Imóveis para alugar em Vargem Grande do Sul</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {tipos.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 80}>
                <div className="h-full glass-card rounded-2xl p-6">
                  <div className="h-12 w-12 rounded-xl icon-gold flex items-center justify-center mb-4"><t.icon className="h-6 w-6" /></div>
                  <h3 className="font-semibold text-foreground mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-3">Bairros com casas para alugar</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {bairros.map((b) => (
                  <span key={b} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">{b}</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">E demais bairros de Vargem Grande do Sul. Pergunte pelo WhatsApp o que está disponível no seu bairro.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Por que alugar com a Nova Imobiliária</h2></ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d, i) => (
              <ScrollReveal key={d.title} delay={i * 80}>
                <div className="text-center">
                  <div className="h-14 w-14 rounded-2xl icon-gold flex items-center justify-center mx-auto mb-4"><d.icon className="h-7 w-7" /></div>
                  <h3 className="font-semibold text-foreground">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container max-w-3xl">
          <ScrollReveal><h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Perguntas frequentes sobre aluguel</h2></ScrollReveal>
          <div className="space-y-4">
            {faq.map((f) => (
              <div key={f.q} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="accent" size="lg" asChild>
              <a href={getWhatsAppAluguelLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Quer comprar? Veja os <Link to="/imoveis?finalidade=venda" className="text-accent underline">imóveis à venda</Link>.
            </p>
          </div>
        </div>
      </section>

      <ProprietarioBloco fundo="bg-background" />
    </div>
  );
}
