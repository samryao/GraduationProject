git地址：https://github.com/YaooXiansheng/blog.git
使用python实现的blog系统
前端使用vue实现，经过打包后将文件存放在服务器中
主要遇到的问题：
  数据库表的设计：
    一共有四个表：用户表，标签表，文章表和评论表。用户表和文章表使用一对多外键关联，标签表和文章表使用多对多，评论表和用户表使用一对多关联，评论表和文章表使用一对多
  开发过程中的跨域问题：
    使用django的django-cors-headers解决
  django连接Mysql：
    在app的__init__文件中中添加连接mysql的代码

主要界面展示：
  登录界面：![1557623170838](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1557623170838.png)

主页面：

![1557623259175](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1557623259175.png)

![1557623277072](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1557623277072.png)

文章列表界面：

![1557623297319](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1557623297319.png)

写博客界面：

![1557623319559](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1557623319559.png)

账号设置界面：

![1557623341105](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1557623341105.png)

