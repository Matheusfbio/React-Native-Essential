-- Criar tabela posts
CREATE TABLE IF NOT EXISTS posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  image_url text,
  created_at timestamp DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Política para SELECT (leitura pública)
CREATE POLICY "Permitir leitura pública"
ON posts FOR SELECT
TO public
USING (true);

-- Política para INSERT (inserção pública)
CREATE POLICY "Permitir inserção pública"
ON posts FOR INSERT
TO public
WITH CHECK (true);

-- Política para UPDATE (atualização pública - opcional)
CREATE POLICY "Permitir atualização pública"
ON posts FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Política para DELETE (exclusão pública - opcional)
CREATE POLICY "Permitir exclusão pública"
ON posts FOR DELETE
TO public
USING (true);

-- Configurar Storage Bucket
-- Execute no Supabase Dashboard > Storage:
-- 1. Crie um bucket chamado "posts-images"
-- 2. Marque como "Public bucket"
-- 3. Ou execute as políticas abaixo:

-- Política para upload de imagens
CREATE POLICY "Permitir upload público"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'posts-images');

-- Política para leitura de imagens
CREATE POLICY "Permitir leitura pública de imagens"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'posts-images');
