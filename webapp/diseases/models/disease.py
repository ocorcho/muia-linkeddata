from django.db import models

from food.models import Food
from allergen.models import Allergen
from nutrients.models import Nutrient

class DiseaseManager(models.Manager):
    def create_from_list(self, list):
        instance = self.model()
        instance.DiseaseName = list[0]
        instance.Description = list[1]
        instance.DOID = list[2]
        instance.save()
        return instance

class Disease(models.Model):
    filename = 'DISEASE'

    DiseaseName = models.CharField(max_length=100, primary_key=True)
    Description = models.TextField(null=True, blank=True)
    FoodList    = models.ManyToManyField(Food, through='FoodCausesDisease')
    NutrList    = models.ManyToManyField(Nutrient, through='NutrientCausesDisease')
    AlleList    = models.ManyToManyField(Allergen, through='AllergenCausesDisease')
    DOID        = models.CharField(max_length=15, null=True, blank=True)
    
    objects = DiseaseManager()

    def __unicode__(self):
        return u"%s, %s" % (self.DiseaseName, self.Description)