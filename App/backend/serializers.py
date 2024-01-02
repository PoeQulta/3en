
from django.contrib.auth.models import User
from backend.models.model_def import Car
from backend.models.model_def import Office
from backend.models.model_def import Customer
from rest_framework import serializers
from backend.models.model_def import Customer, Reservation, CarImg,CarStatus,Billing

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "dln", 
            "fname", 
            "lname", 
            "street", 
            "city", 
            "zip_code", 
            "date_joined"
        ]

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", 
            "username", 
            "first_name", 
            "last_name", 
            "email", 
            "password", 
            "is_active", 
            "is_staff"
        ]
        extra_kwargs = {"id": {"read_only": True}, "password": {"write_only": True}}

    def create(self, validated_data):

        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        email = validated_data["email"]
        password = validated_data["password"]

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
        )

        return user
    
class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = [
            'office_id',
            'city',
            'zip_code',
        ] 
class CarImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImg
        fields = [
            'img_url',
        ]  
class CarStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarStatus
        fields = [
            'status_date',
            'car',
            'status_val'
        ] 
        depth=1 
class BillingSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        NotNest = kwargs.pop("NotNest", None)

        if NotNest is not None:
            if NotNest == True:
                self.Meta.depth = 0
        else:
            self.Meta.depth = 3

        super(BillingSerializer, self).__init__(*args, **kwargs)
    class Meta:
        model = Billing
        fields = [
            'billing_num',
            'due_date',
            'fully_paid',
            'reservation'
        ] 
        depth=1 

class CarSerializer(serializers.ModelSerializer):
    office = OfficeSerializer()
    images = CarImgSerializer(source='carimg_set', many=True, read_only=True)
    status_val = serializers.SerializerMethodField()  

    
    class Meta:
        model = Car
        fields = [
            'plate_id',
            'car_type',
            'model',
            'year_made',
            'color',
            'rate',
            'office',
            'images',
            'status_val',  
        ]

    def get_status_val(self, obj):
        # This method extracts the status_val from the CarStatus
        latest_status = obj.carstatus_set.order_by('-status_date').first()
        return latest_status.status_val if latest_status else None

class ReservationSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        NotNest = kwargs.pop("NotNest", None)

        if NotNest is not None:
            if NotNest == True:
                self.Meta.depth = 0
        else:
            self.Meta.depth = 2

        super(ReservationSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Reservation
        fields = [
            "reservation_id",
            "customer_dln", 
            "car", 
            "pickup_date", 
            "return_date", 
        ]