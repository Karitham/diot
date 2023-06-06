package store

const keyspace = `CREATE KEYSPACE IF NOT EXISTS idiot WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`
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
}
