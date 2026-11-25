export type Finalidade = "venda" | "aluguel";
export type TipoImovel = "casa" | "apartamento" | "terreno" | "comercial";
export type StatusImovel = "ativo" | "vendido" | "locado";
export type TagImovel = "Novo" | "Destaque" | "Oportunidade";

export interface Imovel {
  id: string;
  titulo: string;
  finalidade: Finalidade;
  tipo: TipoImovel;
  bairro: string;
  cidade: string;
  preco: number;
  metragem: number | null;
  quartos: number | null;
  banheiros: number | null;
  vagas: number | null;
  descricao: string | null;
  fotos: string[] | null;
  destaque: boolean | null;
  status: string | null;
  codigo: string;
  criado_em: string | null;
  tags: string[] | null;
}

export const cidades = [
  "Vargem Grande do Sul",
  "Casa Branca",
  "São João da Boa Vista",
  "Espírito Santo do Pinhal",
  "Aguaí",
  "Mococa",
];

/** Chave para comparar bairros escritos de formas diferentes ("Jd. América", "Jardim America", "JARDIM AMÉRICA"). */
export function chaveBairro(bairro: string | null | undefined): string {
  return (bairro || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\bjd\.?\s*/g, "jardim ")
    .replace(/\bres\.?\s+/g, "residencial ")
    .replace(/\bconj\.?\s*hab\.?\s*/g, "conjunto habitacional ")
    .replace(/\bv\.\s*/g, "vila ")
    .replace(/\bpq\.?\s*/g, "parque ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lista de bairros a partir dos imóveis cadastrados, sem repetir grafias diferentes do mesmo bairro. */
export function listarBairros(imoveis: { bairro: string | null }[]): { chave: string; nome: string; total: number }[] {
  const mapa = new Map<string, { nome: string; total: number }>();
  for (const i of imoveis) {
    const chave = chaveBairro(i.bairro);
    if (!chave) continue;
    const atual = mapa.get(chave);
    const nome = (i.bairro || "").trim();
    // Mostra a grafia mais completa (ex.: "Jardim América" no lugar de "Jd. America").
    if (!atual) mapa.set(chave, { nome, total: 1 });
    else {
      atual.total++;
      if (!/^jd\b/i.test(nome) && (/^jd\b/i.test(atual.nome) || nome.length > atual.nome.length)) atual.nome = nome;
    }
  }
  return [...mapa.entries()]
    .map(([chave, v]) => ({ chave, ...v, nome: v.nome.replace(/^jd\.?\s*/i, "Jardim ") }))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
}

export function formatPrice(value: number, finalidade: string): string {
  const formatted = value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return finalidade === "aluguel" ? `${formatted}/mês` : formatted;
}

export function getWhatsAppLink(codigo?: string, titulo?: string): string {
  const phone = "5519992243434";
  let msg = "Olá! Vim pelo site da Nova Imobiliária e gostaria de mais informações.";
  if (codigo && titulo) {
    msg = `Olá! Tenho interesse no imóvel ${codigo} - ${titulo}. Poderia me passar mais informações?`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function waLink(msg: string): string {
  return `https://wa.me/5519992243434?text=${encodeURIComponent(msg)}`;
}

/** Quem procura imóvel para alugar: a mensagem já identifica que veio do site. */
export function getWhatsAppAluguelLink(): string {
  return waLink("Olá! Vim pelo site e procuro um imóvel para alugar.");
}

/** Proprietário que quer colocar o imóvel para alugar. */
export function getWhatsAppProprietarioLink(): string {
  return waLink("Olá! Vim pelo site e tenho um imóvel para alugar. Gostaria de saber como funciona a administração.");
}
