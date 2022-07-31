-- Database: mande_db

DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

DROP TABLE IF EXIST ptype CASCADE;
DROP TABLE IF EXIST pet CASCADE;
DROP TABLE IF EXIST toy CASCADE;


CREATE TABLE ptype(
	tyid SERIAL PRIMARY KEY,
	ttype VARCHAR(60) UNIQUE,
	breed VARCHAR(60) not null,
	type_escription VARCHAR(60) NOT NULL
);

CREATE TABLE pet(
	pid SERIAL PRIMARY KEY,
	pet_name VARCHAR(60) UNIQUE,
	age INT not null,
	tyid FOREGIN KEY ptype(tyid)
);

CREATE TABLE toy(
	tid SERIAL PRIMARY KEY,
	tname VARCHAR(60) UNIQUE,
	color VARCHAR(60) not null,
	pet_id FOREGIN KEY pet(pid)

}
