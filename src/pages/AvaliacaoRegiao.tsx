import { AvaliacaoLanding } from "@/components/AvaliacaoLanding";

export default function AvaliacaoRegiao() {
  return (
    <AvaliacaoLanding
      path="/avaliacao/regiao"
      seoTitle="Laudo de Avaliação de Imóveis em São João da Boa Vista, Casa Branca e Região | Nova Imobiliária"
      seoDescription="Laudo de avaliação de imóveis em São João da Boa Vista, Casa Branca, Itobi, Divinolândia, Poços de Caldas e Vargem Grande do Sul. Todos os tipos de laudo, entrega rápida."
      h1="Laudo de Avaliação de Imóveis em São João da Boa Vista, Casa Branca e Região"
      intro="A Nova Imobiliária faz laudos de avaliação de imóveis em Vargem Grande do Sul e nas cidades vizinhas, para todas as finalidades."
      whatsappTexto="Olá! Gostaria de um orçamento de laudo de avaliação de imóvel na região."
      secoes={[
        {
          titulo: "Cidades atendidas",
          itens: [
            "Vargem Grande do Sul",
            "São João da Boa Vista",
            "Casa Branca",
            "Itobi",
            "Divinolândia",
            "Poços de Caldas e região",
          ],
        },
        {
          titulo: "Tipos de laudo",
          itens: [
            "Inventário, partilha e divórcio",
            "Processos judiciais e assistência técnica",
            "Valor de aluguel (revisional e renovatória)",
            "ITCMD, doação, compra e venda",
            "Garantias, financiamento, empresas e holdings",
          ],
        },
      ]}
      faq={[
        { q: "Vocês vão até o imóvel em outra cidade?", a: "Sim. Atendemos as cidades da região e fazemos a vistoria no local." },
        { q: "Que tipos de imóvel vocês avaliam?", a: "Casas, apartamentos, terrenos, imóveis comerciais, sítios e chácaras." },
        { q: "Quanto custa e qual o prazo?", a: "O valor depende do imóvel, da cidade e da finalidade. A entrega é rápida, e o prazo é informado junto com o orçamento." },
      ]}
    />
  );
}
