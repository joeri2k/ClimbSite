from django.db import models
from crags.models import Crag
from climbers.models import User

class Event(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    crag = models.ForeignKey(Crag, on_delete=models.CASCADE)
    tries = models.IntegerField()
    description = models.TextField(max_length=500)
    date = models.DateTimeField()
    total_seats = models.IntegerField()
    current_seats = models.IntegerField()
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    created = models.DateTimeField(auto_now_add=True)

class Attendee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)