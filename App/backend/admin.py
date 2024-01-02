from django.contrib import admin
from backend.models.model_def import *

admin.site.register([Billing, Car,CarStatus,Customer,Office, Reservation, UserCustomerInfo,UserWorksFor,CarImg])