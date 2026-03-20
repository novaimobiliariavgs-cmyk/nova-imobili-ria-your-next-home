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

export const bairros = [
  "Centro",
  "Jardim São Paulo",
  "Jardim América",
  "Parque das Flores",
  "Vila Nova",
  "Jardim Europa",
  "Vila Brasil",
];

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
