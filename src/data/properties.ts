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
  metragem: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  descricao: string;
  fotos: string[];
  destaque: boolean;
  status: StatusImovel;
  codigo: string;
  criado_em: string;
  tags?: TagImovel[];
}

export const imoveis: Imovel[] = [
  {
    id: "1",
    titulo: "Casa ampla com quintal no Centro",
    finalidade: "venda",
    tipo: "casa",
    bairro: "Centro",
    cidade: "Vargem Grande do Sul",
    preco: 420000,
    metragem: 180,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    descricao: "Linda casa com 3 quartos, sendo 1 suíte, sala ampla, cozinha planejada, quintal espaçoso e garagem para 2 carros. Localização privilegiada no centro da cidade, próximo a comércios e escolas.",
    fotos: [],
    destaque: true,
    status: "ativo",
    codigo: "NI-001",
    criado_em: "2025-03-01",
    tags: ["Destaque"],
  },
  {
    id: "2",
    titulo: "Apartamento moderno no Jardim São Paulo",
    finalidade: "aluguel",
    tipo: "apartamento",
    bairro: "Jardim São Paulo",
    cidade: "Vargem Grande do Sul",
    preco: 1200,
    metragem: 65,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    descricao: "Apartamento reformado com 2 quartos, sala de estar, cozinha americana e área de serviço. Condomínio com portaria e área de lazer.",
    fotos: [],
    destaque: true,
    status: "ativo",
    codigo: "NI-002",
    criado_em: "2025-02-15",
    tags: ["Novo"],
  },
  {
    id: "3",
    titulo: "Terreno 300m² no Jardim América",
    finalidade: "venda",
    tipo: "terreno",
    bairro: "Jardim América",
    cidade: "Vargem Grande do Sul",
    preco: 95000,
    metragem: 300,
    quartos: 0,
    banheiros: 0,
    vagas: 0,
    descricao: "Terreno plano de 300m² em localização privilegiada, próximo à avenida principal. Ideal para construção residencial ou comercial.",
    fotos: [],
    destaque: false,
    status: "ativo",
    codigo: "NI-003",
    criado_em: "2025-01-20",
    tags: ["Oportunidade"],
  },
  {
    id: "4",
    titulo: "Sala comercial na Avenida Principal",
    finalidade: "aluguel",
    tipo: "comercial",
    bairro: "Centro",
    cidade: "Vargem Grande do Sul",
    preco: 1800,
    metragem: 45,
    quartos: 0,
    banheiros: 1,
    vagas: 1,
    descricao: "Sala comercial com excelente visibilidade na avenida principal. Ideal para escritório, consultório ou loja. Ar-condicionado e piso porcelanato.",
    fotos: [],
    destaque: true,
    status: "ativo",
    codigo: "NI-004",
    criado_em: "2025-03-10",
    tags: ["Destaque"],
  },
  {
    id: "5",
    titulo: "Casa térrea com piscina no Parque das Flores",
    finalidade: "venda",
    tipo: "casa",
    bairro: "Parque das Flores",
    cidade: "Vargem Grande do Sul",
    preco: 580000,
    metragem: 250,
    quartos: 4,
    banheiros: 3,
    vagas: 3,
    descricao: "Excelente casa com 4 quartos, 2 suítes, sala de estar e jantar, cozinha gourmet, piscina e churrasqueira. Acabamento de primeira qualidade.",
    fotos: [],
    destaque: true,
    status: "ativo",
    codigo: "NI-005",
    criado_em: "2025-03-05",
    tags: ["Destaque", "Novo"],
  },
  {
    id: "6",
    titulo: "Kitnet mobiliada próximo à rodoviária",
    finalidade: "aluguel",
    tipo: "apartamento",
    bairro: "Vila Nova",
    cidade: "Vargem Grande do Sul",
    preco: 750,
    metragem: 30,
    quartos: 1,
    banheiros: 1,
    vagas: 0,
    descricao: "Kitnet totalmente mobiliada, ideal para solteiros ou estudantes. Inclui cozinha compacta, banheiro e área de serviço.",
    fotos: [],
    destaque: false,
    status: "ativo",
    codigo: "NI-006",
    criado_em: "2025-02-28",
    tags: ["Oportunidade"],
  },
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

export function formatPrice(value: number, finalidade: Finalidade): string {
  const formatted = value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return finalidade === "aluguel" ? `${formatted}/mês` : formatted;
}

export function getWhatsAppLink(codigo?: string, titulo?: string): string {
  const phone = "5519999999999";
  let msg = "Olá! Gostaria de mais informações";
  if (codigo && titulo) {
    msg = `Olá! Tenho interesse no imóvel ${codigo} - ${titulo}`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
