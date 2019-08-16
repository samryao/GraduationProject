from django.db import models
from app01.models import Article
from app01.models import UserInfo


# Create your models here.

class Comment(models.Model):
    text = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comment")
    user = models.ForeignKey(UserInfo, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.text[:20]
