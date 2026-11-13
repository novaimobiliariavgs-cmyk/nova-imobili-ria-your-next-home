import { AvaliacaoLanding } from "@/components/AvaliacaoLanding";

export default function AvaliacaoInventario() {
  return (
    <AvaliacaoLanding
      path="/avaliacao/inventario-e-partilha"
      seoTitle="Laudo de Avaliação para Inventário e Partilha em Vargem Grande do Sul | Nova Imobiliária"
      seoDescription="Laudo de avaliação de imóveis para inventário judicial ou em cartório, partilha entre herdeiros e divórcio em Vargem Grande do Sul e região. Entrega rápida, orçamento sob consulta."
      h1="Laudo de Avaliação para Inventário e Partilha em Vargem Grande do Sul"
      intro="No inventário, judicial ou em cartório, e na partilha de bens entre herdeiros, é preciso saber quanto vale cada imóvel. O laudo de avaliação traz esse valor com base no mercado local."
      whatsappTexto="Olá! Gostaria de um orçamento de laudo de avaliação para inventário/partilha."
      secoes={[
        {
          titulo: "Quando o laudo é usado",
          itens: [
            "Inventário judicial ou extrajudicial (em cartório)",
            "Partilha de imóveis entre herdeiros",
            "Divórcio e dissolução de união estável",
            "Doação de imóveis e planejamento sucessório",
            "Quando os herdeiros discordam do valor de um imóvel",
          ],
        },
        {
          titulo: "O que o laudo traz",
          itens: [
            "Identificação e descrição do imóvel",
            "Vistoria com fotos",
            "Pesquisa de mercado com imóveis semelhantes da região",
            "Valor de mercado fundamentado",
            "Casas, apartamentos, terrenos, imóveis comerciais e rurais",
          ],
        },
      ]}
      faq={[
        { q: "Preciso de laudo de avaliação no inventário?", a: "O laudo é muito usado para definir o valor dos imóveis na partilha e evitar divergências entre os herdeiros. A necessidade depende de cada caso; fale com a gente e com o advogado do inventário." },
        { q: "Vocês avaliam imóveis rurais e terrenos?", a: "Sim. Avaliamos casas, apartamentos, terrenos, imóveis comerciais, sítios e chácaras." },
        { q: "Quanto custa e qual o prazo?", a: "O valor depende do imóvel e da quantidade de bens do inventário. A entrega é rápida, e o prazo é informado junto com o orçamento." },
        { q: "Atendem inventários de outras cidades?", a: "Sim, atendemos Vargem Grande do Sul, São João da Boa Vista, Casa Branca, Itobi, Divinolândia, Poços de Caldas e região." },
      ]}
    />
  );
}
