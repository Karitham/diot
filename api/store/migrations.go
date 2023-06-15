package store

const keyspace = "idiot"
const migKeyspace = `CREATE KEYSPACE IF NOT EXISTS idiot WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`
const migTable = `CREATE TABLE IF NOT EXISTS idiot.migrations (
	content text,
	time timeuuid,
	PRIMARY KEY (content, time)
);`

var migrations = []string{
	`CREATE TABLE IF NOT EXISTS idiot.users (
		id varchar,
		email varchar,
		name varchar,
		password varchar,
		permissions set<varchar>,
		PRIMARY KEY (id, email)
	);`,

	`CREATE INDEX IF NOT EXISTS users_email_idx ON idiot.users (email);`,

	`CREATE TABLE IF NOT EXISTS idiot.sessions (id varchar PRIMARY KEY, permissions set<varchar>);`,

	`CREATE TABLE IF NOT EXISTS idiot.webpush_subscriptions (
		user_id varchar PRIMARY KEY,
		subscription set<blob>
	);`,

	`CREATE TABLE IF NOT EXISTS idiot.keys (
		id varchar PRIMARY KEY,
		private_key blob,
		public_key blob
	);`,

	`ALTER TABLE idiot.sessions ADD user_id varchar;`,
}
