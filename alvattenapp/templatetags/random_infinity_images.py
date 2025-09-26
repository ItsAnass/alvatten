from django import template
import os
import random
from django.conf import settings

register = template.Library()

@register.simple_tag
def get_infinity_images(count=15):
    # Path to the infinity folder in static files
    infinity_dir = os.path.join(settings.BASE_DIR, 'alvattenapp', 'static', 'img', 'pooler', 'infinity')
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF')
    image_paths = []
    for root, dirs, files in os.walk(infinity_dir):
        for file in files:
            if file.endswith(image_extensions):
                rel_path = os.path.relpath(os.path.join(root, file), os.path.join(settings.BASE_DIR, 'alvattenapp', 'static'))
                image_paths.append(rel_path.replace('\\', '/'))
    random.shuffle(image_paths)
    return image_paths[:count]
