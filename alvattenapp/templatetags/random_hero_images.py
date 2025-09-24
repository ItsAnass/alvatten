import os
import random
from django import template
from django.conf import settings

register = template.Library()

@register.simple_tag
def get_random_hero_images(count=20):
    # Path to the hero-random folder (relative to static root)
    hero_folder = os.path.join(settings.BASE_DIR, 'alvattenapp', 'static', 'img', 'hero-random')
    try:
        all_files = [f for f in os.listdir(hero_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp'))]
    except FileNotFoundError:
        all_files = []
    random.shuffle(all_files)
    selected = all_files[:count]
    # Return static-relative paths
    return [f'img/hero-random/{fname}' for fname in selected]
