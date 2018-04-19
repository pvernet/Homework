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
SELECT first_name, last_name, address
FROM address
INNER JOIN staff
	on address.address_id=staff.address_id;

-- 6b
SELECT first_name, last_name, SUM(amount)
FROM payment
INNER JOIN staff
	ON payment.staff_id = staff.staff_id
WHERE payment_date
BETWEEN '2005-07-31 23:59:59' AND '2005-09-01 00:00:00'
GROUP BY staff.staff_id;

-- 6c
SELECT title, COUNT(*) AS 'actors count'
FROM film_actor
INNER JOIN film
	ON film_actor.film_id = film.film_id
GROUP BY film.film_id;

-- 6d
SELECT title, COUNT(*) AS 'inventory count'
FROM inventory
INNER JOIN film
	ON film.film_id = inventory.film_id
WHERE title = 'Hunchback Impossible'
GROUP BY inventory.film_id;

-- 6e
SELECT first_name, last_name, SUM(amount) AS 'total paid'
FROM payment
INNER JOIN customer
	ON payment.customer_id=customer.customer_id
GROUP BY customer.customer_id
ORDER BY customer.last_name;


-- 7a
SELECT title, NAME AS 'language'
FROM film
INNER JOIN LANGUAGE
	ON film.language_id=language.language_id
WHERE (title LIKE 'k%' or title LIKE 'q%' ) AND LANGUAGE.NAME='English';

-- 7b
SELECT first_name, last_name FROM actor WHERE actor_id IN (
	SELECT actor_id FROM film_actor WHERE film_id = (
		SELECT film_id FROM film WHERE title='Alone Trip'
	)
);


-- 7c
SELECT first_name, last_name, email, country
FROM customer
INNER JOIN address
	ON customer.address_id = address.address_id
INNER JOIN city
	ON address.city_id=city.city_id
INNER JOIN country
	ON city.country_id=city.country_id
WHERE country.country_id='Canada';

-- 7d
SELECT * FROM film
INNER JOIN film_category
	ON film.film_id=film_category.film_id
INNER JOIN category
	ON film_category.category_id=category.category_id
WHERE category.name='Family';

-- 7e
SELECT film.title, COUNTt(*) AS 'rental_count'
FROM rental
INNER JOIN inventory
	ON rental.inventory_id=inventory.inventory_id
INNER JOIN film
	ON inventory.film_id = film.film_id
GROUP BY film.film_id
ORDER BY rental_count DESC;

-- 7f
SELECT store_id, SUM(payment.amount) AS 'total_amount'
FROM inventory
INNER JOIN rental
	ON inventory.inventory_id=rental.inventory_id
INNER JOIN payment
	ON rental.rental_id=payment.rental_id
GROUP BY inventory.store_id;

-- 7g
SELECT store_id, city, country
FROM store
INNER JOIN address
	ON store.address_id=address.address_id
INNER JOIN city
	ON address.city_id=city.city_id
INNER JOIN country
	ON city.country_id=country.country_id;

-- 7h
SELECT NAME, SUM(payment.amount) AS 'gross_revenue'
FROM category
INNER JOIN film_category
	ON category.category_id=film_category.category_id
INNER JOIN inventory
	ON film_category.film_id=inventory.film_id
INNER JOIN rental
	ON inventory.inventory_id=rental.inventory_id
INNER JOIN payment
	ON rental.rental_id = payment.rental_id
GROUP BY category.category_id
ORDER BY gross_revenue DESC
LIMIT 0,5;

-- 8a
CREATE OR REPLACE VIEW top5_genres
AS
SELECT NAME, SUM(payment.amount) AS 'gross_revenue'
FROM category
INNER JOIN film_category
	ON category.category_id=film_category.category_id
INNER JOIN inventory
	ON film_category.film_id=inventory.film_id
INNER JOIN rental
	ON inventory.inventory_id=rental.inventory_id
INNER JOIN payment
	ON rental.rental_id = payment.rental_id
GROUP BY category.category_id
ORDER BY gross_revenue DESC;

-- 8b
SELECT * FROM top5_genres;

-- 8c
DROP VIEW IF EXISTS top5_genres;