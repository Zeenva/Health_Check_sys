from rest_framework import serializers
from django.contrib.auth.models import User
from myapp.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('name', 'age', 'phone', 'gender')
        

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('username', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}
       
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        UserProfile.objects.create(
            user=user,
            name=profile_data['name'],
            age=profile_data['age'],
            phone=profile_data['phone'],
            gender=profile_data['gender']
        )
        return user

    
