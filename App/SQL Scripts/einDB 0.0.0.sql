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
	customer_dln	varchar(50) NOT NULL,
	car_id	varchar(50) NOT NULL,
    pickup_date datetime	NOT NULL,
    return_date	datetime	NOT NULL
);
ALTER TABLE reservation
ADD PRIMARY KEY(customer_dln,car_id,pickup_date),
ADD CONSTRAINT customer_reservation FOREIGN KEY(customer_dln) REFERENCES  customer(dln),
ADD CONSTRAINT car_reservation FOREIGN KEY(car_id) REFERENCES car(plate_id);
