USE sakila;

-- 1a
SELECT first_name, last_name
FROM actor;

-- 1b
SELECT CONCAT(first_name, " ", last_name) AS Actor_Name
FROM actor;

-- 2a
SELECT actor_id, first_name, last_name
FROM actor
WHERE first_name = "Joe";

-- 2b
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name like "%GEN%";

-- 2c
SELECT actor_id, last_name, first_name
FROM actor
WHERE last_name like "%LI%"
ORDER BY last_name, first_name DESC;

-- 2d
SELECT country_id, country
FROM country
WHERE country IN ("Afghanistan", "Bangladesh", "China");

-- 3a
ALTER TABLE actor
ADD middle_name VARCHAR(30) AFTER first_name;

-- 3b
ALTER TABLE actor 
CHANGE COLUMN middle_name middle_name BLOB NULL DEFAULT NULL ;

-- 3c
ALTER TABLE actor
DROP COLUMN middle_name;

-- 4a
SELECT COUNT(actor_id), last_name
FROM actor
GROUP BY last_name;

-- 4b
SELECT COUNT(actor_id), last_name
FROM actor
GROUP BY last_name
HAVING COUNT(actor_id) > 2;

-- 4c
UPDATE actor
SET first_name = "HARPO"
WHERE last_name = "WILLIAMS" and first_name = "GROUCHO";

-- 4d
UPDATE actor
IF (last_name = "WILLIAMS" and first_name = "HARPO", SET first_name = "GROUCHO" WHERE last_name = "WILLIAMS" and first_name = "HARPO", SET first_name = "MUCHO");


-- 5a
SHOW CREATE TABLE address;

-- 6a
SELECT staff.first_name , staff.last_name, address.address
FROM staff
INNER JOIN address ON staff.address_id = address.address_id;

-- 6b
SELECT staff.first_name , staff.last_name, payment.amount, payment.payment_date
FROM staff
INNER JOIN payment ON staff.staff_id = payment.staff_id
WHERE payment_date BETWEEN 2005-08-01 AND 2005-08-31;

-- 6c
SELECT COUNT(film_actor.actor_id), film.title
FROM film
INNER JOIN film_actor ON film.film_id = film_actor.film_id;

-- 6d
SELECT COUNT (inventory.film_id), film.title
FROM inventory
INNER JOIN film ON inventory.film_id = film.film_id;

-- 6e








