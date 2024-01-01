USE einDB;
CREATE TABLE customer(
dln	varchar(50) PRIMARY KEY,
fname varchar(50) NOT NULL,
lname varchar(50) NOT NULL,
street varchar(50) NOT NULL,
city varchar(50) NOT NULL,
zip_code int(6) NOT NULL,
Date_Joined datetime NOT NULL
);
CREATE TABLE car(
plate_id	varchar(50) PRIMARY KEY,
car_type	varchar(50)	NOT NULL,
model	varchar(50) NOT NULL,
year_made	year	NOT NULL,
color	varchar(50) NOT NULL,
rate	DECIMAL(10,2) NOT NULL
);
CREATE TABLE reservation
(
	reservation_id	int	PRIMARY KEY AUTO_INCREMENT,
	customer_dln	varchar(50) NOT NULL,
	car_id	varchar(50) NOT NULL,
    pickup_date datetime	NOT NULL,
    return_date	datetime	NOT NULL
);
CREATE TABLE billing
(
billing_num	int PRIMARY KEY AUTO_INCREMENT,
due_date	datetime NOT NULL,
fully_paid	boolean	NOT NULL,
reservation_id	int NOT NULL
);

ALTER TABLE billing
ADD CONSTRAINT reservation_billing FOREIGN KEY(reservation_id) REFERENCES reservation(reservation_id);
ALTER TABLE reservation
ADD CONSTRAINT customer_reservation FOREIGN KEY(customer_dln) REFERENCES  customer(dln),
ADD CONSTRAINT car_reservation FOREIGN KEY(car_id) REFERENCES car(plate_id),
ADD CONSTRAINT reservation_Unique UNIQUE(customer_dln,car_id,pickup_date);
