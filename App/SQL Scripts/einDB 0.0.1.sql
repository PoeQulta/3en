use eindb;
CREATE TABLE CAR_STATUS
(
	status_id	int 	PRIMARY KEY,
    status_date	DATE NOT NULL,
    car_id varchar(50)	NOT NULL,
    status_val	varchar(500) NOT NULL
);
ALTER TABLE CAR_STATUS
ADD CONSTRAINT status_unique UNIQUE(car_id,status_val),
ADD CONSTRAINT car_status FOREIGN KEY(car_id) REFERENCES car(plate_id);

CREATE TABLE office(
office_id	int PRIMARY KEY AUTO_INCREMENT, 
street varchar(50) NOT NULL,
city varchar(50) NOT NULL,
zip_code int(6) NOT NULL
);

CREATE TABLE user_works_for
(
	id int PRIMARY KEY  AUTO_INCREMENT,
    office_id	int NOT NULL,
    user_id	int NOT NULL
);
ALTER TABLE user_works_for
ADD CONSTRAINT office_user_works_for FOREIGN KEY(office_id) REFERENCES office(office_id),
ADD CONSTRAINT user_user_works_for FOREIGN KEY(user_id) REFERENCES auth_user(id),
ADD CONSTRAINT unique_user UNIQUE(user_id);

CREATE TABLE user_customer_info
(
	id int PRIMARY KEY AUTO_INCREMENT,
    user_id	int NOT NULL,
    customer_dln varchar(50) NOT NULL 
);
ALTER TABLE user_customer_info
ADD CONSTRAINT customer_user_customer_info FOREIGN KEY(customer_dln) REFERENCES customer(dln),
ADD CONSTRAINT user_user_customer_info FOREIGN KEY(user_id) REFERENCES auth_user(id),
ADD CONSTRAINT unique_user UNIQUE(user_id),
ADD CONSTRAINT unique_dln UNIQUE(customer_dln);


CREATE TABLE car_img
(
	img_id	int	PRIMARY KEY auto_increment,
	car_id varchar(50)	NOT NULL,
    img_url	varchar(500) NOT NULL
);
ALTER TABLE car_img
ADD CONSTRAINT car_img FOREIGN KEY(car_id) REFERENCES car(plate_id),
ADD CONSTRAINT unique_car_img UNIQUE(car_id,img_url);

ALTER TABLE car
ADD office_id int NOT NULL,
ADD CONSTRAINT office_car FOREIGN KEY (office_id) REFERENCES office(office_id);