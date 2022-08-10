function validateInput() {
    var title = document.forms["blogForm"]["title"];
    var category = document.forms["blogForm"]["category"];
    var content = document.forms["blogForm"]["content"];

    if (title.value == "") {
        window.alert("Please enter the Blog Title.");
        title.focus();
        return false;
    }

    if (category.value == "") {
        window.alert("Please enter Blog Category.");
        category.focus();
        return false;
    }

    if (content.value == "") {
        window.alert("Please enter Blog Description.");
        category.focus();
        return false;
    }

    return true;
}