import type { LucideIcon } from "lucide-react";
import { FileText, ClipboardCheck, KeyRound, ScrollText, FileCheck2, Gavel } from "lucide-react";

/** Cidades atendidas nos serviços (sede em Vargem Grande do Sul). */
export const CIDADES = [
  "Vargem Grande do Sul",
  "São João da Boa Vista",
  "Poços de Caldas",
  "Casa Branca",
  "Aguaí",
  "Espírito Santo do Pinhal",
  "São Sebastião da Grama",
  "Divinolândia",
  "Itobi",
  "Mococa",
  "São José do Rio Pardo",
];
export const CIDADES_TEXTO = CIDADES.slice(0, -1).join(", ") + " e " + CIDADES[CIDADES.length - 1];

export interface Servico {
  slug: string;
  icon: LucideIcon;
  /** Nome curto, usado no cartão da página /servicos. */
  nome: string;
  /** Frase única do cartão. */
  resumo: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  /** Situações em que o serviço ajuda. */
  paraQuem: string[];
  passos: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  whatsappMsg: string;
  /** Observação curta exibida ao final (ex.: atos que exigem outro profissional). */
  nota?: string;
}

/** Laudos de avaliação já têm página própria (/avaliacao); entram só no cartão. */
export const laudoCard = {
  slug: "avaliacao",
  icon: FileText,
  nome: "Laudos de avaliação",
  resumo: "Laudos para inventário, partilha, divórcio, processos judiciais, aluguel e venda.",
};

export const servicos: Servico[] = [
  {
    slug: "vistoria-de-imovel",
    icon: ClipboardCheck,
    nome: "Vistoria de imóvel",
    resumo: "Vistoria de entrada e de saída com relatório fotográfico, para proprietário ou inquilino.",
    seoTitle: "Vistoria de Imóvel em Vargem Grande do Sul e Região | Nova Imobiliária",
    seoDescription:
      "Vistoria de entrada e de saída de imóvel em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas e região, com relatório fotográfico. Valor sob consulta.",
    h1: "Vistoria de Imóvel em Vargem Grande do Sul e Região",
    intro:
      "Alugou o imóvel por conta própria? A vistoria registra o estado de cada cômodo na entrega das chaves e evita discussão na devolução. Fazemos a vistoria completa, com fotos e descrição, pronta para assinatura das partes.",
    paraQuem: [
      "Proprietário que aluga sem imobiliária e quer se proteger",
      "Inquilino que quer documentar o estado do imóvel ao entrar",
      "Devolução das chaves, comparando com a vistoria de entrada",
      "Venda ou empréstimo do imóvel, para registrar como foi entregue",
    ],
    passos: [
      { title: "Agendamento", desc: "Você chama no WhatsApp e combinamos dia e horário no imóvel." },
      { title: "Vistoria no local", desc: "Percorremos cada cômodo, registrando pisos, paredes, portas, instalações e itens com fotos." },
      { title: "Relatório pronto", desc: "Entregamos o termo de vistoria com relatório fotográfico, pronto para as partes assinarem." },
    ],
    faq: [
      { q: "Quanto custa a vistoria?", a: "O valor é sob consulta e depende do tamanho do imóvel e da cidade. Chame no WhatsApp e passamos o orçamento sem compromisso." },
      { q: "Preciso ser cliente da imobiliária para contratar?", a: "Não. A vistoria é um serviço avulso, para quem aluga ou vende por conta própria." },
      { q: "Vocês fazem a vistoria de saída também?", a: "Sim. Na devolução das chaves, comparamos o imóvel com a vistoria de entrada e apontamos o que mudou." },
      { q: "Quais cidades vocês atendem?", a: `Nossa sede fica em Vargem Grande do Sul e atendemos também ${CIDADES.slice(1).join(", ")}.` },
    ],
    whatsappMsg: "Olá! Gostaria de um orçamento de vistoria de imóvel.",
  },
  {
    slug: "locacao-sem-administracao",
    icon: KeyRound,
    nome: "Locação sem administração",
    resumo: "Encontramos e analisamos o inquilino, fazemos contrato e vistoria. Depois, o imóvel fica com você.",
    seoTitle: "Locação sem Administração em Vargem Grande do Sul e Região | Nova Imobiliária",
    seoDescription:
      "Quer alugar seu imóvel e cuidar dele você mesmo? Em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas e região, fazemos análise do inquilino, contrato e vistoria. Taxa única sob consulta.",
    h1: "Locação sem Administração em Vargem Grande do Sul e Região",
    intro:
      "Para o proprietário que prefere receber o aluguel e cuidar do imóvel por conta própria, mas quer começar a locação do jeito certo. Fazemos a parte que mais pesa na segurança da locação, uma única vez, sem comissão mensal.",
    paraQuem: [
      "Análise cadastral do inquilino e do fiador",
      "Contrato de locação com a garantia adequada ao caso",
      "Vistoria de entrada com relatório fotográfico",
      "Divulgação do imóvel e entrega das chaves",
    ],
    passos: [
      { title: "Conversa inicial", desc: "Você conta sobre o imóvel e o valor pretendido, e indicamos a melhor garantia para o caso." },
      { title: "Inquilino e documentos", desc: "Divulgamos o imóvel, analisamos o cadastro do interessado e preparamos o contrato." },
      { title: "Assinatura e chaves", desc: "Fazemos a vistoria, colhemos as assinaturas e entregamos as chaves. A partir daí, a locação segue com você." },
    ],
    faq: [
      { q: "Quanto custa a locação sem administração?", a: "É cobrada uma taxa única, sob consulta, conforme o imóvel e o valor do aluguel. Não há comissão mensal." },
      { q: "Qual a diferença para a administração completa?", a: "Na administração completa, cuidamos também da cobrança mensal, dos atrasos e do repasse do aluguel. Aqui, depois da entrega das chaves, o proprietário assume a gestão." },
      { q: "Posso mudar para a administração completa depois?", a: "Sim. Se preferir, passamos a administrar o imóvel a qualquer momento." },
      { q: "Já tenho o inquilino. Vocês fazem só o contrato e a vistoria?", a: "Sim. Fazemos a análise do cadastro, o contrato e a vistoria para a locação que você já negociou." },
    ],
    whatsappMsg: "Olá! Quero saber sobre a locação sem administração do meu imóvel.",
  },
  {
    slug: "imovel-herdado",
    icon: ScrollText,
    nome: "Imóvel herdado",
    resumo: "Avaliação para o inventário e, depois, venda ou aluguel do imóvel da herança.",
    seoTitle: "Imóvel Herdado: Avaliação e Venda em Vargem Grande do Sul e Região",
    seoDescription:
      "Herdou um imóvel em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas ou região? Avaliação para inventário e partilha e, depois, venda ou aluguel. Valor sob consulta.",
    h1: "Imóvel Herdado em Vargem Grande do Sul e Região",
    intro:
      "Quando um imóvel vem de herança, surgem as mesmas perguntas: quanto ele vale, como dividir entre os herdeiros e o que fazer com ele depois. Ajudamos a família em cada etapa do lado imobiliário.",
    paraQuem: [
      "Avaliação do imóvel para o inventário e o ITCMD",
      "Valor de referência para a partilha entre herdeiros",
      "Venda do imóvel depois da partilha",
      "Aluguel do imóvel enquanto a família decide",
    ],
    passos: [
      { title: "Avaliação", desc: "Avaliamos o imóvel e entregamos o laudo para o inventário e a partilha." },
      { title: "Documentação", desc: "Orientamos sobre matrícula, IPTU e documentos que o imóvel vai precisar para ser vendido ou alugado." },
      { title: "Venda ou aluguel", desc: "Concluída a partilha, cuidamos da divulgação, das visitas e da negociação." },
    ],
    faq: [
      { q: "Preciso de laudo de avaliação para o inventário?", a: "O laudo ajuda a definir o valor do imóvel para o inventário, o ITCMD e a divisão entre os herdeiros, evitando discussões." },
      { q: "Dá para alugar o imóvel antes de terminar o inventário?", a: "Em muitos casos, sim, com a concordância dos herdeiros e do inventariante. Avaliamos cada situação." },
      { q: "Quanto custa?", a: "O laudo e os demais serviços têm valor sob consulta, conforme o imóvel. Chame no WhatsApp para um orçamento." },
    ],
    whatsappMsg: "Olá! Tenho um imóvel de herança e gostaria de uma orientação.",
    nota: "O inventário e a partilha são atos que exigem advogado e são conduzidos por profissional habilitado.",
  },
  {
    slug: "regularizacao-de-imovel",
    icon: FileCheck2,
    nome: "Regularização do imóvel",
    resumo: "Organizamos habite-se, averbação e documentos para o imóvel poder ser vendido ou financiado.",
    seoTitle: "Regularização de Imóvel em Vargem Grande do Sul e Região | Nova Imobiliária",
    seoDescription:
      "Imóvel sem averbação, sem habite-se ou com documentos pendentes em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas e região? Organizamos tudo para vender ou financiar.",
    h1: "Regularização de Imóvel em Vargem Grande do Sul e Região",
    intro:
      "Casa construída que não aparece na matrícula, falta de habite-se ou documentos desatualizados travam a venda e impedem o financiamento bancário. Levantamos o que falta e organizamos a documentação até o imóvel ficar pronto para negociar.",
    paraQuem: [
      "Construção ou ampliação não averbada na matrícula",
      "Imóvel sem habite-se",
      "Comprador que precisa de financiamento e encontrou pendências",
      "Proprietário que quer vender e não sabe o que falta",
    ],
    passos: [
      { title: "Diagnóstico", desc: "Analisamos matrícula, IPTU e situação na prefeitura e listamos o que falta." },
      { title: "Documentação", desc: "Reunimos certidões e documentos e acompanhamos os protocolos na prefeitura e no cartório." },
      { title: "Imóvel pronto", desc: "Com a documentação em dia, o imóvel pode ser vendido, financiado ou alugado com segurança." },
    ],
    faq: [
      { q: "Por que o imóvel precisa estar regularizado para vender?", a: "Sem a construção averbada na matrícula, o imóvel consta como terreno. Isso reduz o valor e, em geral, impede o financiamento bancário do comprador." },
      { q: "Quanto custa a regularização?", a: "Depende do que está pendente. Fazemos o diagnóstico e passamos o orçamento sob consulta." },
      { q: "Vocês fazem o projeto da construção?", a: "Projetos e responsabilidade técnica são feitos por engenheiro ou arquiteto. Nós organizamos a documentação e acompanhamos o processo." },
    ],
    whatsappMsg: "Olá! Preciso regularizar a documentação de um imóvel.",
    nota: "Projetos e laudos técnicos são de engenheiro ou arquiteto, e procedimentos que exigem advogado, como a usucapião, são conduzidos por profissional habilitado.",
  },
  {
    slug: "imoveis-de-leilao",
    icon: Gavel,
    nome: "Imóveis de leilão",
    resumo: "Ajudamos a escolher, avaliar e, depois da compra, vender ou alugar imóveis de leilão.",
    seoTitle: "Imóveis de Leilão em São João da Boa Vista, Poços de Caldas e Região",
    seoDescription:
      "Vai comprar imóvel de leilão em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas ou região? Avaliamos antes do lance e cuidamos da venda ou do aluguel depois.",
    h1: "Imóveis de Leilão em São João da Boa Vista, Poços de Caldas e Região",
    intro:
      "Imóvel de leilão pode ser um ótimo negócio, desde que o comprador saiba quanto ele vale de verdade e o que vem junto com ele. Avaliamos a oportunidade antes do lance e, depois da compra, cuidamos da venda ou do aluguel.",
    paraQuem: [
      "Avaliação de mercado antes de dar o lance",
      "Visita externa e informações sobre o bairro",
      "Estimativa de aluguel e de revenda",
      "Venda ou locação do imóvel depois da arrematação",
    ],
    passos: [
      { title: "Escolha", desc: "Você nos envia o link do leilão ou pedimos para buscar oportunidades na região." },
      { title: "Avaliação", desc: "Avaliamos o valor de mercado, o potencial de aluguel e os pontos de atenção do imóvel." },
      { title: "Depois da compra", desc: "Arrematado o imóvel, cuidamos da divulgação, da venda ou do aluguel." },
    ],
    faq: [
      { q: "Vale a pena comprar imóvel de leilão?", a: "Pode valer, se o lance ficar bem abaixo do valor de mercado e os custos e riscos forem conhecidos antes. Por isso a avaliação prévia é tão importante." },
      { q: "Vocês atendem leilões de bancos e judiciais?", a: "Sim. Avaliamos imóveis de leilões de bancos e judiciais em Vargem Grande do Sul, São João da Boa Vista, Poços de Caldas e região." },
      { q: "Quanto custa?", a: "O valor é sob consulta, conforme o imóvel e o serviço. Chame no WhatsApp e envie o link do leilão." },
    ],
    whatsappMsg: "Olá! Estou interessado em um imóvel de leilão e gostaria de uma avaliação.",
    nota: "A análise jurídica do edital, da matrícula e das medidas para a posse do imóvel exige advogado e é feita por profissional habilitado.",
  },
];

export const getServico = (slug: string) => servicos.find((s) => s.slug === slug);
