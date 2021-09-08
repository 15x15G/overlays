"use strict";
import { saveItem, loadItem, loadAll } from "../src/localstorage.js";
import { checkLog, Comparison, extractLog } from "../src/logLineProcessing.js";

const namespace = "test";
function save(key, def) {
    return saveItem(namespace, key, def);
}
function load(key, def) {
    return loadItem(namespace, key, def);
}
// 锁定悬浮窗
document.addEventListener("onOverlayStateUpdate", (e) => {
    if (e.detail.isLocked) {
        $("#readMe").hide();
    } else {
        $("#readMe").show();
    }
});


//读日志，匹配日志
// https://www.yuque.com/docs/share/f1da0d8c-79e6-42b3-9697-fd29e7ec1240?#Zzki2
addOverlayListener("LogLine", (e) => {
    if (checkLog(e.line, "01")) {
        const id = extractLog(e.line, "ZoneID");
        const name = extractLog(e.line, "ZoneName");
        const val = { 'id': id, 'title': name, 'text': "" };
        if ($(`#zones>[value='${id}']`).lenth > 0)
            ;
        else
            $("#zones").append(
                `<option value="${id}">${id}:${val.title}</option>`
            );
        $("#zones").val(id);
    }
});

$("#clear").on("click", () => {
    $("#main ul").empty();
});

$("#zones").change(() => {
    const id = $("#zones").val();
    const json = JSON.parse(load(id));
    $("#text").val(json.text);
    $("#title").val(json.title);
});

$("#save").on("click", () => {
    const title = $("#title").val();
    const id = $("#zones").val();
    const text = $("#text").val();
    if (id) {
        const val = { 'id': id, 'title': title, 'text': text };
        save(id, val);
    }

});

function init() {
    const id = $("#zones").val();
    const json = loadAll(namespace);
    for (let k in json) {
        $("#zones").append(
            `<option value="${json[k].id}">${json[k].id}:${json[k].title}</option>`
        );
        $("#title").val(json[k].title);
        $("#text").val(json[k].text);
    }

}

init();
startOverlayEvents();

export { save, load };