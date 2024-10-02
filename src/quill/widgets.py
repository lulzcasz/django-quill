from django.forms.widgets import Widget
from json import dumps
from django.conf import settings
from quill.settings import QUILL_THEME, QUILL_TOOLBAR, QUILL_JS, QUILL_CSS


class QuillWidget(Widget):
    template_name = "quill/quill.html"

    class Media:
        js = (
            'quill/js/script.js',
            getattr(settings, 'QUILL_JS', QUILL_JS),
        )

        css = {
            'all': [
                'quill/css/styles.css',  
            ] + getattr(settings, 'QUILL_CSS', QUILL_CSS)
        }

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)

        context['toolbar'] = dumps(getattr(settings, "QUILL_TOOLBAR", QUILL_TOOLBAR))
        context['theme'] = getattr(settings, 'QUILL_THEME', QUILL_THEME)

        return context
