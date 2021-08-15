drop table if exists stocks;

drop table if exists products;

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    price int
);

INSERT INTO
    products (title, description, price)
VALUES
    ('Nice Product 1', 'Nice Product 1', 2),
    ('Nice Product 2', 'Nice Product 2', 10),
    ('Nice Product 3', 'Nice Product 3', 23),
    ('Nice Product 4', 'Nice Product 4', 15),
    ('Nice Product 5', 'Nice Product 5', 23),
    ('Nice Product 6', 'Nice Product 6', 15),
    ('Nice Product 7', 'Nice Product 7', 23),
    ('Nice Product 8', 'Nice Product 8', 15);

CREATE TABLE stocks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id uuid,
    count int,
    foreign key ("product_id") references "products" ("id")
);

INSERT INTO
    stocks (product_id, count)
VALUES
    ('9a14812c-07e1-463e-9fa1-1a5179f48e61', 4),
    ('164032bb-6512-4d5b-aae8-313fc365f012', 6),
    ('b3595014-634c-4b47-8250-cce3867d4919', 7),
    ('504e5779-c1bc-4498-a792-3b12839b4a7d', 12),
    ('e7a1919b-0bb8-4511-980b-553a332be219', 7),
    ('00e95255-4243-426c-93e7-b9504a8bff89', 8),
    ('c2f464aa-a291-435d-b465-f35c5466f19c', 2),
    ('00345b0c-d0fb-4076-836b-b67c715f3a4e', 3);

CREATE extension if not exists "uuid-ossp";
