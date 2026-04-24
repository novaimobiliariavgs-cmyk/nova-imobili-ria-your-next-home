CREATE POLICY "Anon can manage imoveis"
ON public.imoveis FOR ALL
TO anon
USING (true)
WITH CHECK (true);