
-- Create imoveis table
CREATE TABLE public.imoveis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  finalidade TEXT NOT NULL,
  tipo TEXT NOT NULL,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL DEFAULT 'Vargem Grande do Sul',
  preco NUMERIC NOT NULL,
  metragem NUMERIC,
  quartos INTEGER DEFAULT 0,
  banheiros INTEGER DEFAULT 0,
  vagas INTEGER DEFAULT 0,
  descricao TEXT,
  fotos TEXT[] DEFAULT '{}',
  destaque BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'ativo',
  codigo TEXT UNIQUE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  tipo TEXT,
  imovel_codigo TEXT,
  mensagem TEXT,
  origem TEXT DEFAULT 'formulario',
  status TEXT DEFAULT 'novo',
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.imoveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Imoveis policies
CREATE POLICY "Anyone can view active properties"
  ON public.imoveis FOR SELECT
  USING (status = 'ativo');

CREATE POLICY "Authenticated users can insert properties"
  ON public.imoveis FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON public.imoveis FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete properties"
  ON public.imoveis FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view all properties"
  ON public.imoveis FOR SELECT
  TO authenticated
  USING (true);

-- Leads policies
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage bucket for property photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('imoveis-fotos', 'imoveis-fotos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Storage policies
CREATE POLICY "Anyone can view property photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'imoveis-fotos');

CREATE POLICY "Authenticated users can upload property photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'imoveis-fotos');

CREATE POLICY "Authenticated users can update property photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'imoveis-fotos');

CREATE POLICY "Authenticated users can delete property photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'imoveis-fotos');

-- Seed data
INSERT INTO public.imoveis (titulo, finalidade, tipo, bairro, cidade, preco, metragem, quartos, banheiros, vagas, descricao, destaque, status, codigo, tags, criado_em)
VALUES
  ('Casa ampla com quintal no Centro', 'venda', 'casa', 'Centro', 'Vargem Grande do Sul', 420000, 180, 3, 2, 2, 'Linda casa com 3 quartos, sendo 1 suíte, sala ampla, cozinha planejada, quintal espaçoso e garagem para 2 carros. Localização privilegiada no centro da cidade, próximo a comércios e escolas.', true, 'ativo', 'NI-001', ARRAY['Destaque'], '2025-03-01'),
  ('Apartamento moderno no Jardim São Paulo', 'aluguel', 'apartamento', 'Jardim São Paulo', 'Vargem Grande do Sul', 1200, 65, 2, 1, 1, 'Apartamento reformado com 2 quartos, sala de estar, cozinha americana e área de serviço. Condomínio com portaria e área de lazer.', true, 'ativo', 'NI-002', ARRAY['Novo'], '2025-02-15'),
  ('Terreno 300m² no Jardim América', 'venda', 'terreno', 'Jardim América', 'Vargem Grande do Sul', 95000, 300, 0, 0, 0, 'Terreno plano de 300m² em localização privilegiada, próximo à avenida principal. Ideal para construção residencial ou comercial.', false, 'ativo', 'NI-003', ARRAY['Oportunidade'], '2025-01-20'),
  ('Sala comercial na Avenida Principal', 'aluguel', 'comercial', 'Centro', 'Vargem Grande do Sul', 1800, 45, 0, 1, 1, 'Sala comercial com excelente visibilidade na avenida principal. Ideal para escritório, consultório ou loja. Ar-condicionado e piso porcelanato.', true, 'ativo', 'NI-004', ARRAY['Destaque'], '2025-03-10'),
  ('Casa térrea com piscina no Parque das Flores', 'venda', 'casa', 'Parque das Flores', 'Vargem Grande do Sul', 580000, 250, 4, 3, 3, 'Excelente casa com 4 quartos, 2 suítes, sala de estar e jantar, cozinha gourmet, piscina e churrasqueira. Acabamento de primeira qualidade.', true, 'ativo', 'NI-005', ARRAY['Destaque', 'Novo'], '2025-03-05'),
  ('Kitnet mobiliada próximo à rodoviária', 'aluguel', 'apartamento', 'Vila Nova', 'Vargem Grande do Sul', 750, 30, 1, 1, 0, 'Kitnet totalmente mobiliada, ideal para solteiros ou estudantes. Inclui cozinha compacta, banheiro e área de serviço.', false, 'ativo', 'NI-006', ARRAY['Oportunidade'], '2025-02-28');
