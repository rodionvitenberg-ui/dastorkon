from django import forms
from .models import Tag

class TagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = "__all__"
        widgets = {
            "color_text": forms.TextInput(attrs={"type": "color"}),
            "color_bg_hex": forms.TextInput(attrs={"type": "color"}),
        }