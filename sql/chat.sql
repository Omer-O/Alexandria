DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
	message TEXT,
	sender_id INTEGER REFERENCES users(id) NOT NULL,
	receiver_id INTEGER REFERENCES users(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS private_messages CASCADE;
