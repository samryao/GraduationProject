# Date: 2019-01-10 下午 07:33
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.response import Response

from app01.models import UserInfo
from app01.utils.response import BaseResponse


class LoginView(APIView):
    res = BaseResponse()

    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = UserInfo.objects.filter(username=username).first()
            if not user:
                self.res.code = 201
                self.res.msg = "用户不存在"

            else:
                user_obj = auth.authenticate(username=username, password=password)
                if user_obj:
                    self.res.code = 200
                    self.res.data["username"] = username
                    self.res.data["user_id"] = user.pk

                else:
                    self.res.code = 202
                    self.res.msg = "用户名或密码错误"
        except Exception as e:
            self.res.msg = str(e)

        return Response(self.res.dict)


class RegView(APIView):
    res = BaseResponse()

    def post(self, request):
        try:
            reg_username = request.data.get("reg_username")
            reg_password = request.data.get("reg_password")
            reg_email = request.data.get("reg_email")
            user = UserInfo.objects.filter(username=reg_username)
            if user:
                self.res.code = 201
                return Response(self.res.dict)
            user = UserInfo.objects.create_user(username=reg_username, password=reg_password, email=reg_email)
            user.pwd = reg_password
            user.save()
            if user:
                self.res.code = 200
            else:
                self.res.code = 202
        except Exception as e:
            self.res.code = 203
            self.res.msg = str(e)
        return Response(self.res.dict)


class ChangePassword(APIView):
    res = BaseResponse()

    def post(self, request):
        user_id = request.data.get("id")
        old_password = request.data.get("data").get("old_password")
        change_password = request.data.get("data").get("change_password")
        user = UserInfo.objects.filter(id=user_id).first()

        if user.check_password(old_password):
            user.set_password(change_password)
            user.save()
        else:
            self.res.code = 201
            self.res.msg = "输入的原密码不正确"
        return Response(self.res.dict)


class ChangeUser(APIView):
    res = BaseResponse()

    def post(self, request):

        user_id = request.data.get("id")
        change_username = request.data.get("change_username")
        user = UserInfo.objects.filter(id=user_id).update(username=change_username)
        if user:
            pass
        else:
            self.res.code = 201
            self.res.msg = "用户名修改失败"

        return Response(self.res.dict)


class ChangeEmail(APIView):
    res = BaseResponse()

    def post(self, request):
        print(request.data)
        user_id = request.data.get('id')
        change_email = request.data.get('change_email')
        user = UserInfo.objects.filter(id=user_id).update(email=change_email)
        if user:
            pass
        else:
            self.res.code = 201
            self.res.msg = "邮箱修改失败"

        return Response(self.res.dict)
