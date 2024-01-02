"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from backend.views import serve_react , RegistrationView ,ReserveCustomerView, ReserveStaffView, \
 CustomerInfoView, CarSearchView,CustomerSearchView,CarImgView,StatusView, BillingStaffView, ReturnCarView,PayBillView
from backend.api.example import ExampleView
from rest_framework.authtoken import views
admin.site.site_title = "3en Admin"
admin.site.site_header = "3en Site Adminstration"
admin.site.index_title = "Site administration"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/",views.obtain_auth_token),
    path("api/register/",RegistrationView.as_view()),
    path("api/cars/search/", CarSearchView.as_view()),
    path("api/cars/search/Img/", CarImgView.as_view()),
    path("api/customers/search/", CustomerSearchView.as_view()),
    path("api/reserve/",ReserveCustomerView.as_view()),
    path("api/reserve/Staff/",ReserveStaffView.as_view()),
    path("api/customer/info/",CustomerInfoView.as_view()), 
    path("api/cars/status/",StatusView.as_view()), 
    path("api/billing/",BillingStaffView.as_view()), 
    path("api/car/Return/",ReturnCarView.as_view()), 
    path("api/bill/pay/",PayBillView.as_view()), 
    re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
]