DROP TABLE IF EXISTS documents CASCADE;

CREATE TABLE documents(
    id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) NOT NULL,
	img_url VARCHAR (300),
    txt text,
	title VARCHAR (255),
	tags VARCHAR (255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
