from email.policy import default
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from crags.models import Route, Crag
from django.core.validators import RegexValidator

class CustomManager(BaseUserManager):

    def create_superuser(self, email, full_name, password,phone_number,  **other_fields):
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_staff', True)
        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
        return self.create_user(email, full_name, password,phone_number, **other_fields)

    def create_user(self, email, full_name, password,phone_number, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        
        email = self.normalize_email(email)
        user = self.model(email = email, full_name=full_name,phone_number = phone_number , **other_fields )
        user.set_password(password)
        # other_fields.setdefault('longitude',)
        # other_fields.setdefault('latitude',)
        user.save() 
        return user

def upload_to(instance, filename):
    return 'profile_pic/{filename}'.format(filename=filename)

class User(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(_('email address'), unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    profile_pic = models.ImageField(_("Image"),upload_to = upload_to, null=True, blank = True,default='profile_pic/profile_avatar.jpg')
    phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phone_number = models.CharField(validators = [phoneNumberRegex], max_length = 16, unique = True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6,null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6,null=True, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'phone_number']

class UserFollowing(models.Model):
    follower = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="following",on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)


class ClimbList(models.Model):
    user = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE)
    route = models.ForeignKey(Route, related_name="route",on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)

class Ascending(models.Model):
    user = models.ForeignKey(User, related_name="climber", on_delete=models.CASCADE)
    route = models.ForeignKey(Route, related_name="route_climbed",on_delete=models.CASCADE)
    tries = models.IntegerField()
    very_bad = 1
    bad = 2
    average = 3
    good = 4
    very_good = 5
    STATUS = (
        (very_bad, _('Very ugly route')),
        (bad, _('Ugly route')),
        (average, _('Average route')),
        (good, _('Good route')),
        (very_good, _('Beautiful route'))

    )    
    rating = models.IntegerField(
       choices=STATUS,
       default=average,
   )
    comment = models.TextField(max_length=500)
    date = models.DateField(auto_now_add=True)

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    crag = models.ForeignKey(Crag, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)