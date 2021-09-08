"use strict";
import { saveItem, loadItem } from "../src/localstorage.js";
import { checkLog, Comparison, extractLog } from "../src/logLineProcessing.js";

const namespace = "test";
function save(key, def) {
    return saveItem(namespace, key, def);
}
function load(key, def) {
    return loadItem(namespace, key, def);
}

//查询
function cha(t) { }

//读日志，匹配日志
addOverlayListener("LogLine", (e) => {
    if (
        checkLog(e.line, "00", {
            MessageType: [Comparison.equal, "0038"],//默语
        })
    ) {
        const t = extractLog(e.line, "MessageText");
        cha(t);
    }
});

// 锁定悬浮窗
document.addEventListener("onOverlayStateUpdate", (e) => {
    if (e.detail.isLocked) {
        $("#readMe").hide();
    } else {
        $("#readMe").show();
    }
});

startOverlayEvents();

$("#save").on("click", () => {
    const zone = $("#zones").val();
    save("Zone", zone);
});

$.ajax({
    type: "GET",
    dataType: "json",
    url: "https://souma-sumire.github.io/resources/zones.json",
    success: (data) => {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                $("#zones").append(
                    `<option value="${key}" ${parseInt(key) === (load('Zone') || 38) ? "selected" : ""}>${data[key]}</option>`
                );
            }
        }
    },
});