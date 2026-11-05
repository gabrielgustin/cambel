-- Add type and category columns so the admin panel (type, category) maps to real DB columns
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'ARTÍCULO';
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT '';

-- Seed the admin user used by the "Acceso Admin" login dialog.
-- Email: cambel@cambel.com / Password: 123 (bcrypt hashed below)
-- Note: this INSERT was already run once against the database from the sandbox;
-- kept here so the schema/seed history is reproducible on a fresh database.
