use eindb;
ALTER TABLE car
ADD CONSTRAINT check_car_type
CHECK (car_type IN ('sedan', 'suv', 'hatchback', 'mini_van'));
