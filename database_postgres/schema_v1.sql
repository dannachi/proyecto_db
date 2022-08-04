-- Database: laika_db

--DROP DATABASE IF EXIST laika_db;

CREATE DATABASE laika_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c laika_db

DROP TABLE IF EXISTS ptype CASCADE;
DROP TABLE IF EXISTS pet CASCADE;
DROP TABLE IF EXISTS toy CASCADE;


CREATE TABLE ptype(
	tyid SERIAL PRIMARY KEY,
	ttype VARCHAR(60),
	breed VARCHAR(60) not null,
	type_description VARCHAR(60) NOT NULL
);

CREATE TABLE pet(
	pid SERIAL PRIMARY KEY,
	pet_name VARCHAR(60) UNIQUE,
	age INT not null,
	tyid int,
	foreign key (tyid) REFERENCES ptype(tyid) ON DELETE CASCADE
);

CREATE TABLE toy(
	tid SERIAL PRIMARY KEY,
	tname VARCHAR(60) UNIQUE,
	color VARCHAR(60) not null,
	pet_id int,
	FOREIGN key (pet_id) REFERENCES pet(pid) ON DELETE CASCADE
);