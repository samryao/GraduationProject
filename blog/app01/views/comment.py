# Date: 2019-03-20 下午 02:00

from django.utils.html import strip_tags

import markdown
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response

from app01.utils.response import BaseResponse
from app01.models import Article
from comments.models import Comment


class CommentView(APIView):
    res = BaseResponse()
    md = markdown.Markdown(
        extensions=[
            'markdown.extensions.extra',
            'markdown.extensions.codehilite',
        ]
    )

    def get(self, request):
        all_comment = []
        comment_list = Comment.objects.order_by("-created_time")[:3]
        for comment in comment_list:
            every_commend = {
                "id": "",
                "text": "",
                "created_time": "",
                "article": "",
                "excerpt": "",
                "article_id": ""
            }
            excerpt = strip_tags(self.md.convert(comment.text))[:40]
            every_commend["id"] = comment.id
            every_commend["text"] = comment.text
            # every_commend["created_time"] = comment.created_time
            every_commend["article"] = comment.article.title
            every_commend["article_id"] = comment.article.id
            every_commend["excerpt"] = excerpt
            all_comment.append(every_commend)
        self.res.data = all_comment
        return Response(self.res.dict)


class ArticleComment(APIView):
    res = BaseResponse()

    def post(self, request, id):
        article = Article.objects.get(id=id)
        comment_list = article.comment.all()
        response = []
        for comment in comment_list:
            if comment:
                every_comment = dict({
                    'comment_id': comment.id,
                    'created_time': (comment.created_time + datetime.timedelta(hours=8)).strftime("%Y-%m-%d %H:%M:%S"),
                    'username': comment.user.username,
                    'text': comment.text,
                })
                response.append(every_comment)
        self.res.data = response
        return Response(self.res.dict)


class AddComment(APIView):
    res = BaseResponse()

    def post(self, request):
        article_id = request.data.get('article_id')
        user_id = request.data.get('user_id')
        comment = request.data.get('comment')
        comment_obj = Comment.objects.create(article_id=article_id, user_id=user_id, text=comment)
        if comment_obj:
            return Response(self.res.dict)
        self.res.msg = "评论失败"
        return Response(self.res.dict)
