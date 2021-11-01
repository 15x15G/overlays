
$(document).ready(() => {
    $("input[type='checkbox']").each(function (index, item) {
        var order = localStorage.getItem(item.value).split(',');
        $(item).prop('checked', order[2]);
    });
});



$("input[type='checkbox']").change(function () {

    window.opener.$("#" + this.value).toggle(this.checked);
    var order = localStorage.getItem(this.value).split(',');
    order[2] = this.checked;
    localStorage.setItem(this.value, order.join(","));

});