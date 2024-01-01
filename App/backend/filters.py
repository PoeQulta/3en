from django_filters import rest_framework as filters
from backend.models.model_def import Reservation,Billing
class ReservationFilter(filters.FilterSet):
    pickup_date = filters.DateTimeFromToRangeFilter()
    return_date = filters.DateTimeFromToRangeFilter()
    class Meta:
        model = Reservation
        fields = [
            "customer_dln", 
            "car", 
            "pickup_date", 
            "return_date", 
        ] 
class BillingFilter(filters.FilterSet):
    due_date = filters.DateTimeFromToRangeFilter()
    class Meta:
        model = Billing
        fields = [
            "due_date", 
        ] 