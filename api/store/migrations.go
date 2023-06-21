package store

const keyspace = "idiot"
const migKeyspace = `CREATE KEYSPACE IF NOT EXISTS idiot WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`
const migTable = `CREATE TABLE IF NOT EXISTS idiot.migrations (
	id int PRIMARY KEY,
	time timeuuid,
	content text
);`

var migrations = []string{
	`CREATE TABLE idiot.users (
		id varchar,
		email varchar,
		name varchar,
		password varchar,
		permissions set<varchar>,
		PRIMARY KEY (id, email)
	);`,

	`CREATE INDEX users_email_idx ON idiot.users (email);`,

	`CREATE TABLE idiot.sessions (id varchar PRIMARY KEY, permissions set<varchar>);`,

	`CREATE TABLE idiot.webpush_subscriptions (
		user_id varchar PRIMARY KEY,
		subscription set<blob>
	);`,

	`CREATE TABLE idiot.keys (
		id varchar PRIMARY KEY,
		private_key blob,
		public_key blob
	);`,

	`ALTER TABLE idiot.sessions ADD user_id varchar;`,

	`CREATE TABLE idiot.devices (
		id varchar PRIMARY KEY,
		name varchar
	);`,

	`CREATE TABLE idiot.sensor_readings (
		iot_id varchar,
		time timestamp,
		value blob,
		PRIMARY KEY (iot_id, time)
	) WITH CLUSTERING ORDER BY (time DESC);`,
}
