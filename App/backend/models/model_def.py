# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User
class Billing(models.Model):
    billing_num = models.AutoField(primary_key=True)
    due_date = models.DateTimeField()
    fully_paid = models.BooleanField()
    reservation = models.ForeignKey('Reservation', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'billing'

class Car(models.Model):
    plate_id = models.CharField(primary_key=True, max_length=50)
    car_type = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year_made = models.TextField()  # This field type is a guess.
    color = models.CharField(max_length=50)
    rate = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'car'

class CarStatus(models.Model):
    status_id = models.IntegerField(primary_key=True)
    status_date = models.DateField()
    car = models.ForeignKey(Car, models.DO_NOTHING)
    status_val = models.CharField(max_length=500)

    class Meta:
        managed = False
        db_table = 'car_status'
        unique_together = (('car', 'status_val'),)

class Customer(models.Model):
    dln = models.CharField(primary_key=True, max_length=50)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    zip_code = models.IntegerField()
    date_joined = models.DateTimeField(db_column='Date_Joined')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'customer'

class Office(models.Model):
    office_id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    zip_code = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'office'

class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    customer_dln = models.ForeignKey(Customer, models.DO_NOTHING, db_column='customer_dln')
    car = models.ForeignKey(Car, models.DO_NOTHING)
    pickup_date = models.DateTimeField()
    return_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'reservation'
        unique_together = (('customer_dln', 'car', 'pickup_date'),)

class UserCustomerInfo(models.Model):
    user = models.OneToOneField(User, models.DO_NOTHING)
    customer_dln = models.OneToOneField(Customer, models.DO_NOTHING, db_column='customer_dln')

    class Meta:
        managed = False
        db_table = 'user_customer_info'


class UserWorksFor(models.Model):
    office = models.ForeignKey(Office, models.DO_NOTHING)
    user = models.OneToOneField(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_works_for'