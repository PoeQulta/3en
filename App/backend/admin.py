from django.contrib import admin
from backend.models.model_def import *

from django.contrib.admin import AdminSite

admin.site.register([Billing, Car,CarStatus,Customer,Office, Reservation, UserCustomerInfo,UserWorksFor,CarImg])