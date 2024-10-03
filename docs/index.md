# Django Quill

## Installation
``` { .sh .copy }
pip install django=="4.2.*" git+https://github.com/lulzcasz/django-quill.git
```

## Usage

### Django Project/App

``` { .sh .copy }
django-admin startproject ___ && cd ___
```

``` { .sh .copy }
python manage.py startapp documents
```

`___/settings.py`

``` { .py .copy }
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'quill',
    'documents',
]
```

### DeltaField

#### Model

`documents/models.py`
``` { .py .copy }
from django.db.models import Model
from quill.fields import DeltaField


class Document(Model):
    document = DeltaField()
```

#### Admin

`documents/admin.py`
``` { .py .copy }
from django.contrib import admin
from documents.models import Document


admin.site.register(Document, admin.ModelAdmin)
```

#### Form

`documents/forms.py`
``` { .py .copy }
from django.forms import ModelForm
from documents.models import Document


class DocumentForm(ModelForm):
    class Meta:
        model = Document
        fields = ['document']
```

#### View

`documents/views.py`

``` { .py .copy }
from django.shortcuts import render, redirect
from documents.forms import DocumentForm


def create_document(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(request.path)
    else:
        form = DocumentForm()
    return render(request, 'documents/create_document.html', {'form': form})
```

#### Template

`documents/templates/documents/create_document.html`
``` { .html+django .copy }
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create Document</title>
    </head>
    <body>
        <form method="post">
            {% csrf_token %}
            {{ form.media }}
            {{ form.as_p }}
            <button type="submit">Submit</button>
        </form>
    </body>
</html>
```

#### Url

`documents/urls.py`
``` { .py .copy }
from django.urls import path
from documents.views import create_document


urlpatterns = [
    path('documents/create/', create_document, name='create_document')
]
```

`___/urls.py`
``` { .py .copy }
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('documents.urls')),
]

```

### Commands

``` { .sh .copy }
python manage.py makemigrations
```

``` { .sh .copy }
python manage.py migrate
```

``` { .sh .copy }
python manage.py createsuperuser
```

``` { .sh .copy }
python manage.py runserver
```

## Configuration

The following values are default. To make changes, add them to `___/settings.py`.

### [QUILL THEME](https://quilljs.com/docs/customization/themes)

``` { .py .copy }
QUILL_THEME = 'snow'
```

### [QUILL TOOLBAR](https://quilljs.com/docs/modules/toolbar)

``` { .py .copy }
QUILL_TOOLBAR = [
    [{'header': [1, 2, 3, 4, 5, 6, False]}],
    ['bold', 'italic', 'underline', 'link'],
    ['video', 'image'],
    ['blockquote'],
    [{'align': ['', 'center', 'right', 'justify']}],
    ['code', 'code-block'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['clean'],
]
```

### QUILL JS

``` { .py .copy }
QUILL_JS = 'https://cdn.jsdelivr.net/npm/quill@2.0/dist/quill.js'
```

### QUILL CSS

``` { .py .copy }
QUILL_CSS = [
    'https://cdn.jsdelivr.net/npm/quill@2.0/dist/quill.snow.css',
    'https://cdn.jsdelivr.net/npm/quill@2.0/dist/quill.bubble.css',
]
```

