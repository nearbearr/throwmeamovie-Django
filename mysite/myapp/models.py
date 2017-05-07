from __future__ import unicode_literals

from django.db import models
# Create your models here.

class Collection(models.Model):
    fb_id = models.CharField(max_length=40)
    imdbID = models.CharField(max_length=20)
    title = models.CharField(max_length=200)
    imdbRating = models.CharField(max_length=4)
    tomatoeRating = models.CharField(max_length=4)
    year = models.CharField(max_length=4)
    genre1 = models.CharField(max_length=20)
    genre2 = models.CharField(max_length=20)
    genre3 = models.CharField(max_length=20)
    watched = models.CharField(max_length=1)

class Users(models.Model):
    fb_id = models.CharField(max_length=40)
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=254)
    expPreference1 = models.CharField(max_length=20)
    expPreference2 = models.CharField(max_length=20)
    derPreference1 = models.CharField(max_length=20)
    derPreference2 = models.CharField(max_length=20)

class Friends(models.Model):
    fb_id = models.CharField(max_length=40)
    friends_id = models.CharField(max_length=40)
