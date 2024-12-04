SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE DATABASE webtech24sessions WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';

ALTER DATABASE webtech24sessions OWNER TO postgres;

\connect webtech24sessions

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.products (
    id character varying(50) NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(100) NOT NULL,
    price INTEGER NOT NULL
);

ALTER TABLE public.products OWNER TO postgres;

COPY public.products (id, title, description, price) FROM stdin;
sonyAIV	Sony Alpha IV	New 2021 arrival, hot deal	2890
sony24105	Sony 24-105mm lens	Best Sony travel zoom	1300
NiconDX16400	Nicon DX 16-600	Nicon crop travel lens	900
tamron1724	Tamron 17-24mm	Full frame 17-14mm 2.8 lens	800
\.


CREATE TABLE public.users (
    login character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);

ALTER TABLE public.users OWNER TO postgres;

COPY public.users (login, password) FROM stdin;
admin	admin
user	user
\.
