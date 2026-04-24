-- Remove políticas restritas a usuários autenticados
DROP POLICY IF EXISTS "Authenticated users can upload property photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update property photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete property photos" ON storage.objects;

-- Recria políticas permitindo acesso público (admin é controlado no frontend)
CREATE POLICY "Anyone can upload property photos"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'imoveis-fotos');

CREATE POLICY "Anyone can update property photos"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'imoveis-fotos');

CREATE POLICY "Anyone can delete property photos"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'imoveis-fotos');