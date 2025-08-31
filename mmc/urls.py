from django.contrib import admin
from django.urls import path, include
from mmc.views import MMCView

urlpatterns = [
    path('', MMCView.as_view(), name='mmc'),
]
