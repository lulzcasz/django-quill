from django.db import models
from quill.widgets import QuillWidget


class DeltaField(models.JSONField):
    def formfield(self, **kwargs):
        kwargs['widget'] = QuillWidget
        
        return super().formfield(**kwargs)
