from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


# 用户表
class UserInfo(AbstractUser, models.Model):
    username = models.CharField(max_length=11, unique=True)
    password = models.CharField(max_length=128)
    pwd = models.CharField(max_length=128, null=True, blank=True)
    email = models.CharField(max_length=128, null=True, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


# 标签表
class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# 文章表
class Article(models.Model):
    title = models.CharField(max_length=32)
    content = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)
    modify_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    total_views = models.IntegerField(default=0)

    def __str__(self):
        return self.title

