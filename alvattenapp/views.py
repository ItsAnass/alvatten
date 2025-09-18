from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = "index.html"

class AboutPageView(TemplateView):
    template_name = "about.html"
    
class ContactPageView(TemplateView):
    template_name = "contact.html"    

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

