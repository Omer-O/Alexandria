DROP TABLE IF EXISTS documents CASCADE;

CREATE TABLE documents(
    id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) NOT NULL,
    txt text NOT NULL,
	title VARCHAR (255),
	tags VARCHAR (255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO documents (user_id,txt,title,tags) VALUES (1, "aaaaaa", "bbbbb", "cccc") RETURNING id
