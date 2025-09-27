import os
import random
from django import template
from django.conf import settings

register = template.Library()

@register.simple_tag
def get_random_spa_images(count=7):
    # Use STATIC_ROOT for production, STATICFILES_DIRS or app static for development
    spa_dir = os.path.join(settings.BASE_DIR, 'alvattenapp', 'static', 'img', 'spa')
    if not os.path.exists(spa_dir):
        return []
    images = [f'img/spa/{f}' for f in os.listdir(spa_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
    random.shuffle(images)
    return images[:count]
