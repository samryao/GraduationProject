# Date: 2019-03-12 下午 03:58
from django.utils.html import strip_tags

import markdown
from rest_framework.views import APIView
from rest_framework.response import Response

from app01.utils.response import BaseResponse
from app01.models import Article
from app01.models import Tag


class TodayRecommend(APIView):
    res = BaseResponse()
    md = markdown.Markdown(
        extensions=[
            'markdown.extensions.extra',
            'markdown.extensions.codehilite',
        ]
    )

    def get(self, request):
        recommend = []
        today_recommend = Article.objects.all().order_by('-total_views')[0:4]
        for article in today_recommend:
            every_recommend = {"id": "", "title": "", "excerpt": ""}
            excerpt = strip_tags(self.md.convert(article.content))[:30]
            every_recommend["id"] = article.pk
            every_recommend["title"] = article.title
            every_recommend["excerpt"] = excerpt
            recommend.append(every_recommend)
        self.res.data = recommend
        return Response(self.res.dict)


class NewPublish(APIView):
    res = BaseResponse()
    md = markdown.Markdown(
        extensions=[
            'markdown.extensions.extra',
            'markdown.extensions.codehilite',
        ]
    )

    def get(self, request):
        new_publish_article_list = []
        new_publish_article = Article.objects.order_by("-create_time")[:4]
        for article in new_publish_article:
            every_article = {"id": "", "title": "", "create_time": "", "excerpt": "", "user": ""}
            excerpt = strip_tags(self.md.convert(article.content))[:90]
            every_article["id"] = article.id
            every_article["title"] = article.title
            every_article["create_time"] = article.create_time.strftime("%Y-%m-%d %H:%M:%S")
            every_article["user"] = article.user.username
            every_article["excerpt"] = excerpt
            new_publish_article_list.append(every_article)
        self.res.data = new_publish_article_list

        return Response(self.res.dict)


class HotTags(APIView):
    res = BaseResponse()

    def get(self, request):
        tag_list = []
        tags = Tag.objects.all()[:9]

        for tag in tags:
            every_tag = {"id": "", "title": ""}
            every_tag["id"] = tag.id
            every_tag["title"] = tag.name
            tag_list.append(every_tag)
        self.res.data = tag_list

        return Response(self.res.dict)


class Recommend(APIView):
    res = BaseResponse()
    md = markdown.Markdown(
        extensions=[
            'markdown.extensions.extra',
            'markdown.extensions.codehilite',
        ]
    )

    def get(self, request):
        recommend = []
        recommend_article = Article.objects.order_by('-total_views')[0:5]
        for article in recommend_article:
            every_recommend = {
                "id": "",
                "title": "",
                "user": "",
                "create_time": "",
                "total_views": "",
                "excerpt": "",
            }
            excerpt = strip_tags(self.md.convert(article.content))[:30]
            every_recommend["id"] = article.pk
            every_recommend["title"] = article.title
            every_recommend["user"] = article.user.username
            every_recommend["create_time"] = article.create_time.strftime("%Y-%m-%d %H:%M:%S")
            every_recommend["total_views"] = article.total_views
            every_recommend["excerpt"] = excerpt
            recommend.append(every_recommend)
        self.res.data = recommend
        return Response(self.res.dict)


class TagArticle(APIView):

    res = BaseResponse()

    def post(self, request):
        articles = []
        tag_id = request.data.get('id')
        article_list = Article.objects.filter(tags__id=tag_id)
        for article in article_list:
            every_article = dict({
                "id": "",
                "title": "",
                "create_time": "",
                "user": "",
                "views": ""
            })
            every_article["id"] = article.pk
            every_article["title"] = article.title
            every_article["user"] = article.user.username
            every_article["views"] = article.total_views
            every_article["create_time"] = article.create_time.strftime("%Y-%m-%d %H:%M:%S")
            articles.append(every_article)
        self.res.data = articles
        return Response(self.res.dict)
