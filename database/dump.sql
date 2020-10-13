--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	22	1	2999
2	23	1	2999
3	24	1	2999
4	25	3	2900
5	26	3	2900
6	27	3	2900
7	28	6	830
9	29	3	2900
11	30	5	9900
13	31	5	9900
14	32	3	2900
19	41	3	2900
21	42	3	2900
23	43	4	999
25	44	4	999
26	45	4	999
28	49	4	999
30	51	4	999
32	53	4	999
34	55	5	9900
36	57	5	9900
37	57	5	9900
38	57	3	2900
39	57	2	2595
40	61	1	2999
41	61	2	2595
42	61	2	2595
43	61	2	2595
44	61	2	2595
45	61	2	2595
46	61	2	2595
47	61	2	2595
48	61	3	2900
49	61	3	2900
50	61	3	2900
51	61	3	2900
52	61	3	2900
53	68	5	9900
54	68	4	999
55	68	5	9900
56	68	5	9900
57	69	2	2595
58	69	2	2595
59	69	2	2595
60	69	2	2595
61	69	2	2595
62	69	2	2595
63	69	2	2595
64	69	2	2595
65	69	2	2595
66	69	2	2595
67	69	2	2595
68	69	2	2595
69	69	2	2595
70	69	2	2595
71	69	2	2595
72	69	2	2595
73	69	2	2595
74	69	2	2595
75	69	2	2595
76	69	2	2595
77	69	2	2595
78	69	2	2595
79	69	2	2595
80	69	2	2595
81	69	2	2595
82	69	2	2595
83	69	2	2595
84	69	2	2595
85	69	2	2595
86	69	2	2595
87	69	2	2595
88	69	2	2595
89	69	2	2595
90	69	2	2595
91	69	2	2595
92	69	2	2595
93	69	2	2595
94	69	2	2595
95	69	2	2595
96	69	2	2595
97	69	2	2595
98	69	2	2595
99	69	2	2595
100	69	2	2595
101	69	2	2595
102	69	2	2595
103	69	2	2595
104	69	2	2595
105	69	2	2595
106	69	2	2595
107	69	2	2595
108	69	2	2595
109	69	2	2595
110	69	2	2595
111	69	2	2595
112	69	2	2595
113	69	2	2595
114	69	2	2595
115	69	2	2595
116	69	2	2595
117	69	2	2595
118	69	2	2595
119	69	2	2595
120	69	2	2595
121	69	2	2595
122	69	2	2595
123	69	2	2595
124	69	2	2595
125	69	2	2595
126	69	2	2595
127	69	2	2595
128	69	2	2595
129	69	2	2595
130	69	2	2595
131	69	2	2595
132	69	2	2595
133	69	2	2595
134	69	2	2595
135	69	2	2595
136	69	2	2595
137	69	2	2595
138	69	2	2595
139	69	2	2595
140	69	2	2595
141	70	3	2900
142	70	1	2999
143	70	2	2595
144	71	2	2595
145	71	1	2999
146	71	1	2999
147	71	1	2999
148	71	1	2999
149	72	2	2595
150	72	6	830
151	73	1	2999
152	73	4	999
153	74	5	9900
154	74	2	2595
155	74	4	999
156	74	2	2595
157	74	3	2900
158	74	4	999
159	75	3	2900
160	75	4	999
161	75	6	830
162	75	3	2900
163	75	1	2999
164	75	6	830
165	75	6	830
166	75	6	830
167	75	6	830
168	76	1	27500
169	77	2	17000
170	77	1	27500
171	78	2	17000
172	78	4	4999
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-09-28 04:58:49.938073+00
2	2020-09-28 05:01:47.402394+00
3	2020-09-28 05:03:18.70477+00
4	2020-09-28 05:05:25.035843+00
5	2020-09-28 05:07:34.435801+00
6	2020-09-28 05:08:06.447431+00
7	2020-09-28 05:08:25.811821+00
8	2020-09-28 05:08:48.789203+00
9	2020-09-28 05:09:39.53014+00
10	2020-09-28 05:10:18.332399+00
11	2020-09-28 17:06:56.123021+00
12	2020-09-28 17:12:00.993101+00
13	2020-09-28 17:12:22.640923+00
14	2020-09-28 17:16:08.448246+00
15	2020-09-28 17:16:19.277684+00
16	2020-09-28 17:17:26.861213+00
17	2020-09-28 17:17:47.357343+00
18	2020-09-28 17:49:57.355924+00
19	2020-09-28 17:54:34.811259+00
20	2020-09-28 19:07:40.164318+00
21	2020-09-28 19:10:06.188601+00
22	2020-09-28 19:11:04.139747+00
23	2020-09-28 19:13:00.708119+00
24	2020-09-28 19:20:14.411194+00
25	2020-09-28 19:20:56.946227+00
26	2020-09-28 19:21:36.304505+00
27	2020-09-28 19:22:08.53224+00
28	2020-09-28 19:22:18.209404+00
29	2020-09-28 19:37:38.947558+00
30	2020-09-28 19:38:38.085169+00
31	2020-09-28 19:39:10.884984+00
32	2020-09-28 19:59:35.64486+00
33	2020-09-28 20:21:56.400894+00
34	2020-09-28 20:24:33.985539+00
35	2020-09-28 20:26:19.023021+00
36	2020-09-28 20:29:38.895399+00
37	2020-09-28 20:32:12.437763+00
38	2020-09-28 20:32:55.38245+00
39	2020-09-28 21:31:14.978044+00
40	2020-09-28 21:32:24.109817+00
41	2020-09-28 21:33:28.960934+00
42	2020-09-28 21:37:57.447139+00
43	2020-09-28 21:38:20.769301+00
44	2020-09-28 21:38:46.29666+00
45	2020-09-28 21:38:49.569323+00
46	2020-09-28 21:42:22.705015+00
47	2020-09-28 21:43:01.011039+00
48	2020-09-28 21:43:25.20147+00
49	2020-09-28 21:44:18.032996+00
50	2020-09-28 21:44:28.920781+00
51	2020-09-28 21:44:39.125757+00
52	2020-09-28 21:46:10.250093+00
53	2020-09-28 21:46:17.938064+00
54	2020-09-28 21:46:24.309664+00
55	2020-09-28 21:46:26.690297+00
56	2020-09-28 21:47:24.433062+00
57	2020-09-28 21:47:43.704309+00
58	2020-09-28 21:48:11.090927+00
59	2020-09-28 21:48:17.42274+00
60	2020-09-28 21:48:25.442332+00
61	2020-09-28 21:48:50.559459+00
62	2020-09-28 21:49:06.041629+00
63	2020-09-28 21:49:15.315166+00
64	2020-09-28 21:49:16.000213+00
65	2020-09-28 21:49:16.964103+00
66	2020-09-28 21:49:17.599489+00
67	2020-09-28 21:49:18.210681+00
68	2020-09-28 21:58:22.118753+00
69	2020-09-28 23:03:16.179455+00
70	2020-09-28 23:06:14.90121+00
71	2020-09-29 00:54:45.361792+00
72	2020-09-29 01:04:45.422816+00
73	2020-09-29 02:02:18.220497+00
74	2020-09-29 17:09:56.257186+00
75	2020-09-29 19:06:53.463203+00
76	2020-10-12 23:04:51.290242+00
77	2020-10-13 00:32:55.110547+00
78	2020-10-13 17:42:53.159757+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	73	Connor	6000500040003000	12345 street	2020-09-29 02:05:32.437112+00
2	73	Connor	600050004000p000	12345 street	2020-09-29 02:06:57.638306+00
3	73	Connor	600050004000p000	12345 street	2020-09-29 02:07:52.469374+00
4	73	Connor	600050004000p000	12345 street	2020-09-29 02:09:02.033029+00
5	73	Connor	6000500oooo00p000	12345 street	2020-09-29 02:09:36.483209+00
6	73	Connor	600050004000p000	12345 street	2020-09-29 02:10:29.898315+00
7	73	Tim	60003333040003000	12345 street	2020-09-29 02:20:24.763666+00
8	73	Cody	60003339049203000	12345 house street	2020-09-29 02:53:41.115477+00
9	73	Cody	60003339049203000	12345 house street	2020-09-29 02:54:05.992952+00
10	73	Cody	60003339049203000	12345 house street	2020-09-29 02:55:30.752101+00
11	74	Batman	101010101010929	25874 The Bat Cave\nGotham City NY 90889	2020-09-29 18:22:14.424134+00
12	74	me	89749837	my house	2020-09-29 18:28:13.069965+00
13	74	hi	90909090	money	2020-09-29 19:06:47.077394+00
14	76	Connor	2341421341	home	2020-10-13 00:23:00.326711+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
4	Stadium Jacket	4999	/images/jacket.jpg	A full-zip Stadium Jacket	This full-zip Stadium Jacket keeps you comfortable on the sidelines and while traveling to cold weather matches. Wrap yourself in warmth with poly-fill lining, a full hood and two zippered fleece-lined pockets and internal cuffs. Stay secure with nylon fasteners along the zipper. Keep your tactics and valuables close to the vest with two internal pockets. Polyester.
2	Men's Authentic adidas Sergio Ramos Real Madrid Home Jersey 20/21	17000	/images/jersey.jpg	The classic white 2020/21 Real Madrid Authentic Home Jersey adds new accent color pink	With an aging core and coaching upheaval, manager Zinedine Zidane returned to Madrid in 2019, a move that breathed new life into Los Blancos. Real Madrid are the 2019/20 La Liga champs, a 34th league title. Karim Benzema carried the team as the highest goal scorer, captain Sergio Ramos marshaled the defense and was, incredibly, the second highest scorer. Thibaut Courtois was the leagues best goalkeeper.\\n\n       - Three stripes down the sides.\\n\n- Tiger print tag on the collar.\\n\n- Heat press badge.\\n\n- Curved hem.\\n\n- Mesh construction and Heatready technology provide moisture control.\\n\n\n100% Polyester. Official merchandise.
5	Adidas Predator Pro Hybrid Goalkeeper Gloves	12999	/images/gloves.jpg	Adidas Predator gloves turn any goalkeeper into a shot-stopping beast! Play with the confidence that you're competing with a superior set of gloves from a great soccer brand	PALM: URG 2.0 latex for grip and cushioning.\\n\n\nCUT: Hybrid cut.\\n\n\nBACKHAND: Knit backhand material. Grippy control elements rise from the backhand for accurate, powerful punching.\\n\n\nCLOSURE: A compressive entry hugs your wrist for a natural, strapless fit.\\n\n\nBody: 91% polyester, 8% elastane, 1% nylon\\n\nPalm: 100% latex\\n\nDemonskin rubber details.
6	Adidas Tango joggers	5999	/images/sweats.jpg	Tango joggers combine soccer lifestyle with the streets.	Soft French terry fabric provides comfort during a light work out , or hang out.\\n\n\n- Elastic drawcord waist\\n\n- Ribbed cuffs\\n\n- Front pockets\\n\n\n70/30 Cotton/polyester.
3	Nike Premier League Flight Ball - Crimson/Black/Black	15999	/images/ball.jpg	The official match ball of the Premier League	The Premier League Flight Ball is the new standard in true flight. Nike Aerowsculpt technology, a revolutionary new innovation in aerodynamics, uses molded grooves for consistent flight, accuracy and control.\\n\n\nHigh-contrast graphics not only give the ball a fresh edge and look--they're designed to help players track the ball as it moves across the pitch. Includes Premier League logo. 3D printed ink reduces unexpected movement.\\n\n\n- All Conditions Control technology adds a grip texture for a consistent touch in wet or dry conditions.\\n\n- Four fused panels create a larger sweet spot.\\n\n- Machine-stitched casing for increased durability.\\n\n- Reinforced rubber bladder maintains shape and stabilizes ball during flight.\\n\n\n37% SYNTHETIC LEATHER 33% RUBBER 20% POLYESTER 10% COTTON\\n\n\nNote: All of our balls are shipped deflated. This helps in keeping our shipping costs low, savings we can pass on to you.\\n\n\nStandard Ball Sizing\\n\nSize 5: ages 12 and up\\n\nSize 4: ages 8-12\\n\nSize 3: ages 8 and under\\n\nSize 1: skills/practice
1	Nike Mercurial Superfly 7 Elite	27500	/images/cleats.jpg	Soccer Cleat - White/Flash Crmison/Platinum Tint/Hyper Jade/Black	The Mercurial Superfly has always been on the forefront of speed and innovation. Now, the Superfly 7 is even more refined and perfected into one of the best speed boots ever created. It is made for the fastest players on the field. The ones who are always ready and on their toes, willing to sprint after every through ball to score the game winning goal.\\n\n\nNow, with a softer knit, a more form fitting upper, and a refined Dynamic Fit Collar, the new Mercurial Superfly 7 offers one of the best fits in the history of the Mercurial. It means you are lighter, faster, and more comfortable than ever before. Grab a pair and see why Mbappe and Cristano Ronaldo, two of the fastest players in the world, are wearing the Mercurial Superfly.\\n\n\nThe 360 degree flyknit upper continues to offer one of the most complete fits in the game. New high tenacity yarns in the Flyknit gives you a closer fit and feel around the foot. The Dynamic Fit collar is lower and more refined, ensuring a seamless fit from leg to foot.\\n\n\nThe new Flyknit used in the upper is thicker, offering a more plush touch on the ball than in previous models. It creates the perfect mix of speed, fit, and touch, creating what could be one of the best Mercurials ever made.\\n\n\nA stiff chasis and podular outsole combine to create an extremely responsive sole plate with aggressive traction. The chevron studs are perfect for accelerating and decelerating quickly on firm ground surfaces.\n\nWEIGHT: 7.0 oz.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 172, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 78, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 14, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

