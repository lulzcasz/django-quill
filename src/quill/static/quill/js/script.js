function initializeQuill(theme, toolbar) {
    return new Quill('#editor', {
        theme: theme,
        bounds: '#editor',
        modules: {
            toolbar: toolbar,
        },
    })
}

function getTheme(editorElement) {
    return editorElement.getAttribute('theme')
}

function getToolbar(editorElement) {
    return JSON.parse(editorElement.getAttribute('toolbar'))
}

function getContent(editorElement) {
    return JSON.parse(editorElement.getAttribute('content'));
}

function updateHiddenInput(quill, hiddenInputElement) {
    hiddenInputElement.value = JSON.stringify(quill.getContents())
}

document.addEventListener('DOMContentLoaded', () => {
    const editorElement = document.getElementById('editor');
    const hiddenInputId = editorElement.getAttribute('hidden-input-id')
    const hiddenInputElement = document.getElementById(hiddenInputId)

    const quill = initializeQuill(getTheme(editorElement), getToolbar(editorElement))

    quill.setContents(getContent(editorElement));

    updateHiddenInput(quill, hiddenInputElement);

    quill.on('text-change', () => updateHiddenInput(quill, hiddenInputElement));
});
