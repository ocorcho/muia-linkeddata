from django.contrib import admin

from food.models import *

admin.site.register(Food)
admin.site.register(NutritionFact)