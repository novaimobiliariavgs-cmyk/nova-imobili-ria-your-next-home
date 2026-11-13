import { AvaliacaoLanding } from "@/components/AvaliacaoLanding";

export default function AvaliacaoAluguel() {
  return (
    <AvaliacaoLanding
      path="/avaliacao/valor-de-aluguel"
      seoTitle="Laudo de Valor de Aluguel (Revisional e Renovatória) em Vargem Grande do Sul | Nova Imobiliária"
      seoDescription="Laudo de avaliação do valor de aluguel para ação revisional, renovatória e renegociação de contratos de locação residencial ou comercial em Vargem Grande do Sul e região."
      h1="Laudo de Valor de Aluguel em Vargem Grande do Sul"
      intro="Para revisar ou renovar um aluguel é preciso saber o valor de locação de mercado. O laudo mostra quanto o imóvel vale para alugar hoje, com base em imóveis semelhantes da região."
      whatsappTexto="Olá! Gostaria de um orçamento de laudo de valor de aluguel."
      secoes={[
        {
          titulo: "Quando o laudo é usado",
          itens: [
            "Ação revisional de aluguel, para aumentar ou reduzir o valor",
            "Ação renovatória de locação comercial",
            "Renegociação do aluguel com o inquilino ou o proprietário",
            "Definição do valor de um imóvel antes de colocar para alugar",
            "Processos e acordos que discutem o valor da locação",
          ],
        },
        {
          titulo: "O que o laudo traz",
          itens: [
            "Descrição e vistoria do imóvel",
            "Pesquisa de aluguéis de imóveis semelhantes na região",
            "Valor de locação de mercado fundamentado",
            "Imóveis residenciais, comerciais, salas e galpões",
            "Experiência de quem administra imóveis alugados na cidade",
          ],
        },
      ]}
      faq={[
        { q: "O laudo serve para ação revisional e renovatória?", a: "Sim. O laudo apresenta o valor de locação de mercado, que é a base dessas ações. O advogado do caso orienta sobre o uso no processo." },
        { q: "Vocês fazem laudo para imóvel comercial?", a: "Sim. Avaliamos lojas, salas, galpões e imóveis residenciais." },
        { q: "Quanto custa e qual o prazo?", a: "O valor depende do imóvel. A entrega é rápida, e o prazo é informado junto com o orçamento." },
        { q: "Por que fazer com uma imobiliária?", a: "Administramos imóveis alugados em Vargem Grande do Sul e acompanhamos de perto os valores de aluguel praticados na cidade." },
      ]}
    />
  );
}
