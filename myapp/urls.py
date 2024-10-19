from django.urls import path
from .views import login_view,register_view,index,check_username
from django.http import HttpResponse

def debug_view(request):
    return HttpResponse('URL routing is working!')

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('', index, name='index'),
    path('check-username/', check_username, name='check_username'), 

    #path('', redirect_to_login, name='redirect_to_login'),
    path('debug/', debug_view, name='debug'),  # 添加调试路径

]