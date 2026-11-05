-- Increase description field size to accommodate longer descriptions
ALTER TABLE news_articles 
  ALTER COLUMN description TYPE TEXT;
