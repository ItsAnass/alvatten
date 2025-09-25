from django.views.generic import FormView , TemplateView
from django.urls import reverse_lazy
from django.contrib import messages
from .forms import ContactForm
import os
from django.conf import settings
from django.core.mail import EmailMessage

class HomePageView(TemplateView):
    template_name = "index.html"

class AboutPageView(TemplateView):
    template_name = "about.html"
    
class PoolPageView(TemplateView):
    template_name = "pool.html"    

class SpaPageView(TemplateView):
    template_name = "spa.html"
   
class WaterfallsPageView(TemplateView):
    template_name = "waterfalls.html"

class FountainPageView(TemplateView):
    template_name = "fountain.html"

class PondsPageView(TemplateView):
    template_name = "ponds.html"


    
class ContactPageView(FormView):
    template_name = "contact.html"
    form_class = ContactForm
    success_url = reverse_lazy('contact')

    def form_valid(self, form):
        # Compose a proper email body with name, subject, and message
        name = form.cleaned_data['name']
        email_address = form.cleaned_data['email']
        subject = form.cleaned_data['subject']
        message = form.cleaned_data['message']
        
        email_body = f"""
        You have received a new contact form submission:

        Name: {name}
        Email: {email_address}
        Subject: {subject}
        Message:
        {message}
        """

        email = EmailMessage(
            subject=f"Contact Form: {subject}",
            body=email_body,
            from_email=email_address,
            to=[settings.DEFAULT_FROM_EMAIL],
        )
        # Handle multiple images
        images = self.request.FILES.getlist('images[]')
        for img in images:
            img.open()
            email.attach(img.name, img.read(), img.content_type)
        email.send()
        messages.success(self.request, 'Your message has been sent successfully!')
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, 'There was an error in your form. Please correct the errors below.')
        return super().form_invalid(form)

class ServicesPageView(TemplateView):
    template_name = "service.html"
    

class ProjectsPageView(TemplateView):
    template_name = "project.html"
   

class FeaturesPageView(TemplateView):
    template_name = "feature.html"
    

class TeamPageView(TemplateView):
    template_name = "team.html"
    

class TestimonialPageView(TemplateView):
    template_name = "testimonial.html"


