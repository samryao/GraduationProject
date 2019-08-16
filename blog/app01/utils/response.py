# Date: 2019-01-11 上午 11:49


class BaseResponse(object):

    def __init__(self):
        self.code = 200
        self.data = {}
        self.msg = ""

    @property
    def dict(self):
        return self.__dict__


if __name__ == '__main__':
    res = BaseResponse()
