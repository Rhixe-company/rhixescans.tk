from django.urls import path, include
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls


urlpatterns = [
    # User Management
    path('api/users/', include('users.urls', namespace='users')),
    # Comics_API Application
    path('api/', include('Comics.urls.comics_urls', namespace='comics')),
    # Project URLs
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    # API schema and Documentation
    path('docs/', include_docs_urls(title='Rhixescans')),
    path('schema/', get_schema_view(
        title="Rhixescans",
        description="Manhwa and Manhua",
        version="1.0.0",
    ), name='api-schema'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
