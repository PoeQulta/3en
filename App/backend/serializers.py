
from django.contrib.auth.models import User
from backend.models.model_def import Car
from backend.models.model_def import Office
from rest_framework import serializers


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
class CarSerializer(serializers.ModelSerializer):
    office  = OfficeSerializer()
    class Meta:
        model = Car
        fields = [
            'plate_id',
            'car_type',
            'model',
            'year_made',
            'color',
            'rate',
            'office'
        ]    
    