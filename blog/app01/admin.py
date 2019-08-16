from django.contrib import admin
from app01.models import UserInfo
from app01.models import Article
from app01.models import Tag
from comments.models import Comment

# Register your models here.

admin.site.register(UserInfo)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Tag)
