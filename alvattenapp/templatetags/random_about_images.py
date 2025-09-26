from django import template
import os
import random
from django.conf import settings

register = template.Library()

@register.simple_tag
def get_random_about_images(count=20):
    # Path to the main img folder in static files
    img_dir = os.path.join(settings.BASE_DIR, 'alvattenapp', 'static', 'img')
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF')
    image_paths = []
    for root, dirs, files in os.walk(img_dir):
        # Exclude testimonial folder
        if 'testimonial' in root.replace('\\', '/').split('/'):
            continue
        for file in files:
            if file.endswith(image_extensions):
                rel_path = os.path.relpath(os.path.join(root, file), os.path.join(settings.BASE_DIR, 'alvattenapp', 'static'))
                image_paths.append(rel_path.replace('\\', '/'))
    random.shuffle(image_paths)
    return image_paths[:count]
