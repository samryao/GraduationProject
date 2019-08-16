"""blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path

from app01.views.login_register import LoginView, RegView, ChangePassword, ChangeUser, ChangeEmail
from app01.views.index import TodayRecommend, NewPublish, Recommend, HotTags, TagArticle
from app01.views.article import MyArticle, ArticleAdd, ArticleDelete,\
    ArticleUpdate, ArticleSearch, ArticleDetail, TimeFilterArticle, HotArticle, TimeFilter
from app01.views.comment import CommentView, AddComment, ArticleComment
from app01.views.user_manage import UserManage, UserEdit, UserDelete

from app01.views.index1 import index1

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view()),
    path('register/', RegView.as_view()),
    path('change_password/', ChangePassword.as_view()),
    path('change_username/', ChangeUser.as_view()),
    path('change_email/', ChangeEmail.as_view()),
    path('user_manage/', UserManage.as_view()),
    path('user_edit/', UserEdit.as_view()),
    path('user_delete/', UserDelete.as_view()),
    path('today_recommend/', TodayRecommend.as_view()),
    path('new_publish/', NewPublish.as_view()),
    path('recommend/', Recommend.as_view()),
    path('tag_article/', TagArticle.as_view()),
    path('my_article/', MyArticle.as_view()),
    path('hot_article/', HotArticle.as_view()),
    path('comment/', CommentView.as_view()),
    re_path(r'article_comment/id=(\d+)', ArticleComment.as_view()),
    path('add_comment/', AddComment.as_view()),
    path('hot_tags/', HotTags.as_view()),
    path('article_update/', ArticleUpdate.as_view()),
    path('article_add/', ArticleAdd.as_view()),
    path('search/', ArticleSearch.as_view()),
    path('time_filter_article/', TimeFilterArticle.as_view()),
    path('time_filter/', TimeFilter.as_view()),
    re_path(r'article_detail/id=(\d+)', ArticleDetail.as_view()),
    re_path(r'article_delete/id=(\d+)', ArticleDelete.as_view()),

    # path('index/', index1),
    # re_path('^$', index1)
]
