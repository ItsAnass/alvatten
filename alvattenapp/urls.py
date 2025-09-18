from django.urls import path
from . import views



urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('about/', views.AboutPageView.as_view(), name='about'),
    path('contact/', views.ContactPageView.as_view(), name='contact'),
    path('services/', views.ServicesPageView.as_view(), name='services'),
    path('projects/', views.ProjectsPageView.as_view(), name='projects'),
    path('features/', views.FeaturesPageView.as_view(), name='features'),
    path('team/', views.TeamPageView.as_view(), name='team'),
    path('testimonial/', views.TestimonialPageView.as_view(), name='testimonial'),
       
]
