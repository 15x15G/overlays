//import 'https://act.diemoe.net/overlays/common/common.min.js';
import 'https://blog.bluefissure.com/cactoverlay/resources/common.js';
import { checkLog, Comparison, extractLog } from "../src/logLineProcessing.js";

var recording = true;

$(document).ready(function () {
    $('#actlog_table').DataTable({
        paging: true,
        scrollX: true,
        scrollY: 800,
        scroller: true,
        columns: [
            { 'data': 'Time', 'orderable': true },
            { 'data': 'ID', 'orderable': true },
            { 'data': 'Name', 'orderable': true },
        ],
        columnDefs: [
            {
                render: function (data, type, full, meta) {
                    return "<div style='white-space:normal; width:100%;'>" + data + "</div>";
                },
                targets: '_all'
            }
        ],
        fnInitComplete: function (oSettings, json) {
            // $('#actlog_table').parents('.dataTables_wrapper').first().find('thead').hide();
        }
    });
});

// addOverlayListener('onLogEvent', function (e) {
//     if (!recording) return;
//     let t = $('#actlog_table').DataTable();
//     for (let i = 0; i < e.detail.logs.length; i++) {
//         let r = e.detail.logs[i];
//         t.row.add({ Log: r });
//         // console.log(r);
//     }
//     t.draw(false);
//     let num_rows = t.page.info().recordsTotal;
//     t.row(num_rows - 1).scrollTo(false);
// });

addOverlayListener("LogLine", (e) => {
    if (!recording) return;
    if (checkLog(e.line, "01", {})) {
        let t = $('#actlog_table').DataTable();
        const time = extractLog(e.line, "Time");
        const id = extractLog(e.line, "ZoneID");
        const name = extractLog(e.line, "ZoneName");
        t.row.add({ Time: time, ID: id, Name: name });
        t.draw(false);
        let num_rows = t.page.info().recordsTotal;
        t.row(num_rows - 1).scrollTo(false);
    }
});

$('#cleatLogButton').click(() => {
    let t = $('#actlog_table').DataTable();
    t.clear();
    t.draw();
});

$('#startStopButton').click(() => {
    recording = !recording;
    $('#startStopButton').text(recording ? '停止记录' : '开始记录');
});