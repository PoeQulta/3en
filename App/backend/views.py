import posixpath
from pathlib import Path

from django.utils._os import safe_join
from django.views.static import serve as static_serve
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from backend.serializers import RegistrationSerializer,ReservationSerializer, CustomerSerializer,CarImgSerializer,CarStatusSerializer,BillingSerializer,CarStatus
from rest_framework import serializers
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from rest_framework import generics
from rest_framework import filters
from backend.serializers import CarSerializer,Car,Customer
import django_filters.rest_framework
from backend.models.model_def import UserCustomerInfo
from backend.models.model_def import Customer,Reservation,CarImg,CarStatus, Billing,CarStatus
from rest_framework.authentication import TokenAuthentication
from backend.permissions import IsStaffUser
from backend.filters import ReservationFilter,BillingFilter
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
        'model': ['contains'],
        'color':['exact'],
        'car_type':['exact'],
        'year_made':['gt','lt','exact'],
        'rate':['gt','lt','exact'],
        'office__city':['exact'],
        'carstatus__status_val': ['exact']
        }
    ordering_fields = ['year_made', 'rate']

class CarImgView(generics.ListAPIView):
    queryset = CarImg.objects.all()
    serializer_class = CarImgSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = {
        'car': ['exact'],
        }

class CustomerSearchView(generics.ListAPIView):
   
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    # for user in User.objects.all():
    #         if not user:
    #             break
    #         else:
    #             try:
    #                 Token.objects.get(user_id=user.id)
    #             except Token.DoesNotExist:
    #                 Token.objects.create(user=user)

    # if serializer_class.is_valid():
    #         user = serializer_class.save()
    #         token = Token.objects.create(user=user)
    
    filterset_fields = {
      
            'dln': ['exact'],
            'fname':['exact'],
            'lname':['exact'],
            'city':['exact'],
            'date_joined':['gt', 'lt', 'exact']
        }
    ordering_fields = ['date_joined']    
              
class ReserveCustomerView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        customerInfo = UserCustomerInfo.objects.get(user=user_id)
        userReservations = Reservation.objects.filter(customer_dln=customerInfo.customer_dln).filter(billing__isnull=True).all()
        reservationSerializer = ReservationSerializer(userReservations, many=True)
        return Response(reservationSerializer.data)
    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        customerInfo = UserCustomerInfo.objects.get(user=user_id)
        request.data["customer_dln"] = customerInfo.customer_dln.dln
        reservationSerializer = ReservationSerializer(NotNest=True,data=request.data)
        if reservationSerializer.is_valid():
            reservation = reservationSerializer.save()
            return Response(
                {
                    "status": {
                            "message": "Reservation created",
                            "code": f"{status.HTTP_200_OK} OK",
                        }
                }
            )
        else:
             return Response(
                {
                    "error": reservationSerializer.errors,
                    "status": {
                            "message": "Reservation created",
                            "code": f"{status.HTTP_500_INTERNAL_SERVER_ERROR} INTERNAL SERVER ERROR",
                        }
                }
            )
class PayBillView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        bill = Billing.objects.get(billing_num=request.data["billing_num"])
        bill.fully_paid = True
        bill.save()
        return Response(
            {
                    "status": {
                            "message": "Bill Payed",
                            "code": f"{status.HTTP_200_OK} OK",
                        }
                }
        )
class ReturnCarView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        customerInfo = UserCustomerInfo.objects.get(user=user_id)
        userReservations = Reservation.objects.filter(customer_dln=customerInfo.customer_dln).all()
        bills = Billing.objects.filter(reservation__in=userReservations)
        billSerializer = BillingSerializer(bills, many=True)
        return Response(billSerializer.data)
    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        billSerializer = BillingSerializer(NotNest=True,data=request.data)
        if billSerializer.is_valid():
            bill = billSerializer.save()
            return Response(
                {
                    "status": {
                            "message": "Bill created",
                            "code": f"{status.HTTP_200_OK} OK",
                        }
                }
            )
        else:
             return Response(
                {
                    "error": billSerializer.errors,
                    "status": {
                            "message": "Bill NOT created",
                            "code": f"{status.HTTP_500_INTERNAL_SERVER_ERROR} INTERNAL SERVER ERROR",
                        }
                }
            )

class ReserveStaffView(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication]
    #permission_classes=[IsAuthenticated, IsStaffUser]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = ReservationFilter

class BillingStaffView(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication]
    #permission_classes=[IsAuthenticated, IsStaffUser]
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = BillingFilter

class StatusView(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication]
    #permission_classes=[IsAuthenticated, IsStaffUser]
    queryset = CarStatus.objects.all()
    serializer_class = CarStatusSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = {
        'status_date': ['exact'],
    }
    ordering_fields = ['status_date'] 

    
class CustomerInfoView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        customerInfo = UserCustomerInfo.objects.get(user=user_id)
        customerSerializer = CustomerSerializer(customerInfo.customer_dln)
        return Response(customerSerializer.data)
    def post(self, request, *args, **kwargs):
        customerSerializer = CustomerSerializer(data=request.data)
        user_id = request.user.id
        try:
            prevCustomerInfo = UserCustomerInfo.objects.get(user=user_id)
            customer = prevCustomerInfo.customer_dln
            prevCustomerInfo.delete()
            customer.delete()
        except:
            prevCustomerInfo = None
        if customerSerializer.is_valid():
            customer = customerSerializer.save()
            uci = UserCustomerInfo(customer_dln=customer,user = request.user)
            uci.save()
            return Response(
                {
                    "status": {
                            "message": "Customer Info created",
                            "code": f"{status.HTTP_200_OK} OK",
                        }
                }
            )

        else:
            return Response(
                {
                    "error": customerSerializer.errors,
                    "status":{
                            "message": " Serializer Error",
                            "code": f"{status.HTTP_500_INTERNAL_SERVER_ERROR} INTERNAL SERVER ERROR",
                        }
                }
            )