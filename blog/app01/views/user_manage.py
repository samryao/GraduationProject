# Date: 2019-04-03 上午 10:00

from rest_framework.views import APIView
from rest_framework.response import Response

from app01.models import UserInfo
from app01.utils.response import BaseResponse


class UserManage(APIView):
    res = BaseResponse()

    def get(self, request):
        user_list = []
        users = UserInfo.objects.all()
        for user in users:
            if user.username == 'root':
                pass
            else:
                user_obj = dict({'id': '', 'username': '', 'password': '', 'email': ''})
                user_obj['id'] = user.id
                user_obj['username'] = user.username
                user_obj['password'] = user.pwd
                user_obj['email'] = user.email
                user_list.append(user_obj)
        self.res.data = user_list
        return Response(self.res.dict)


class UserEdit(APIView):
    res = BaseResponse()

    def post(self, request):

        user_id = request.data.get('id')
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        user = UserInfo.objects.filter(id=user_id).update(username=username, email=email, pwd=password)
        if user:
            user_obj = UserInfo.objects.filter(id=user_id).first()
            user_obj.set_password(password)
            user_obj.save()
            self.res.msg = "修改成功"
        else:
            self.res.code = 201
            self.res.msg = "修改失败"

        return Response(self.res.dict)


class UserDelete(APIView):
    res = BaseResponse()

    def post(self, request):
        user_id = request.data.get('id')
        UserInfo.objects.filter(id=user_id).delete()

        return Response(self.res.dict)
