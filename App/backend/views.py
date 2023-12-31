import posixpath
from pathlib import Path

from django.utils._os import safe_join
from django.views.static import serve as static_serve
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from backend.serializers import RegistrationSerializer,CustomerSerializer
from rest_framework import serializers
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters
from backend.serializers import CarSerializer,Car,Customer
import django_filters.rest_framework
from django_filters import DateFromToRangeFilter

def serve_react(request, path, document_root=None):
    path = posixpath.normpath(path).lstrip("/")
    fullpath = Path(safe_join(document_root, path))
    if fullpath.is_file():
        return static_serve(request, path, document_root)
    else:
        return static_serve(request, "index.html", document_root)



class RegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        """Handles post request logic"""
        registration_serializer  = RegistrationSerializer(data=request.data)

        # Generate tokens for existing users
        for user in User.objects.all():
            if not user:
                break
            else:
                try:
                    Token.objects.get(user_id=user.id)
                except Token.DoesNotExist:
                    Token.objects.create(user=user)

        if registration_serializer.is_valid():
            user = registration_serializer.save()
            token = Token.objects.create(user=user)

            return Response(
                {
                    "user": {
                        "id": registration_serializer.data["id"],
                        "first_name": registration_serializer.data["first_name"],
                        "last_name": registration_serializer.data["last_name"],
                        "username": registration_serializer.data["username"],
                        "email": registration_serializer.data["email"],
                        "is_active": registration_serializer.data["is_active"],
                        "is_staff": registration_serializer.data["is_staff"],
                    },
                    "status": {
                        "message": "User created",
                        "code": f"{status.HTTP_200_OK} OK",
                    },
                    "token": token.key,
                }
            )
        return Response(
             {
                "error": registration_serializer.errors,
                "status": f"{status.HTTP_203_NON_AUTHORITATIVE_INFORMATION} NON AUTHORITATIVE INFORMATION",
            }
        )

class CarSearchView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {
        'model': ['exact'],
        'color':['exact'],
        'car_type':['exact'],
        'year_made':['gt','lt','exact'],
        'rate':['gt','lt','exact'],
        'office_id':['exact']
        }
    ordering_fields = ['year_made', 'rate']

class CarSearchView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {
        'model': ['exact'],
        'color':['exact'],
        'car_type':['exact'],
        'year_made':['gt','lt','exact'],
        'rate':['gt','lt','exact'],
        'office_id':['exact']
        }
    ordering_fields = ['year_made', 'rate']    

class CustomerSearchView(generics.ListAPIView):
   
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {
      
            'dln': ['exact'],
            'fname':['exact'],
            'lname':['exact'],
            'city':['exact'],
            'date_joined':['gt', 'lt', 'exact']
        }
    ordering_fields = ['date_joined']    
              