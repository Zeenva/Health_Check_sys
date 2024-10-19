from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
from django.shortcuts import redirect
from myapp.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from myapp.models import UserProfile

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            # 检查用户名是否存在
            if not User.objects.filter(username=username).exists():
                return JsonResponse({'message': '用户名不存在'}, status=400)

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': '登录成功'}, status=200)
            else:
                return JsonResponse({'message': '用户名或密码错误'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'message': '无效的JSON数据'}, status=400)
    return JsonResponse({'message': '不支持的请求方法'}, status=405)

@api_view(['POST'])
def register_view(request):
    print("Request data:", request.data)  # 打印请求数据
    # 检查用户名是否已存在
    username = request.data.get('username')
    if User.objects.filter(username=username).exists():
        return Response({'username': '该用户名已经被注册'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': '用户注册成功'}, status=status.HTTP_200_OK)
    else:
         # 提取错误信息并翻译为中文
        error_messages = {}
        for field, errors in serializer.errors.items():
            if isinstance(errors, dict):
                # Nested fields (e.g., profile)
                for sub_field, sub_errors in errors.items():
                    error_messages[sub_field] = sub_errors[0]
            else:
                error_messages[field] = errors[0]
        return Response(error_messages, status=status.HTTP_400_BAD_REQUEST)
    
    

@api_view(['POST'])
def check_username(request):
    username = request.data.get('username')
    exists = User.objects.filter(username=username).exists()
    return Response({'exists': exists})

def index(request):
    return render(request, 'index.html')
