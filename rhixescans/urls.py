from django.urls import path, include
from django.contrib import admin
# from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
# from rest_framework.schemas import get_schema_view
# from rest_framework.documentation import include_docs_urls

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',  include('Comics.urls', namespace='Comics')),
    # path('api/', include('blog_api.urls', namespace='blog_api')),
    # # API Token Management
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # # User Management

    # path('api/user/', include('users.urls', namespace='users')),
    # # Comics_API Application

    # Project URLs


    # # API schema and Documentation
    # path('docs/', include_docs_urls(title='Rhixescans')),
    # path('schema/', get_schema_view(
    #     title="Rhixescans",
    #     description="Manhwa and Manhua",
    #     version="1.0.0",
    # ), name='api-schema'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
