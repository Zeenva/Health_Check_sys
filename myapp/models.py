from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    phone = models.CharField(max_length=11)
    gender = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')])

    def __str__(self):
        return self.user.username

    
