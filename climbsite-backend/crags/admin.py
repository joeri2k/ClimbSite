from django.contrib import admin
from . import models


@admin.register(models.Route)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')


admin.site.register(models.Sector)
admin.site.register(models.Crag)