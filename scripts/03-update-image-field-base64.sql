-- Cambiar el campo image_url a TEXT para soportar Base64
ALTER TABLE news_articles 
ALTER COLUMN image_url TYPE TEXT;
