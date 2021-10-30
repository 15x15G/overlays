//import 'https://act.diemoe.net/overlays/common/common.min.js';
import 'https://blog.bluefissure.com/cactoverlay/resources/common.js';
// import "https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.min.js"
// import "https://unpkg.com/papaparse@latest/papaparse.min.js"
import { checkLog, Comparison, extractLog } from "../src/logLineProcessing.js";

var recording = true;
var Weather = []
var WeatherRate = []
var TerritoryType = []
var PlaceName = []
$(document).ready(async function () {
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

    console.log("start");
    try {
        WeatherRate = await toJson("https://cdn.jsdelivr.net/gh/thewakingsands/ffxiv-datamining-cn@master/WeatherRate.csv")
        Weather = await toJson("https://cdn.jsdelivr.net/gh/thewakingsands/ffxiv-datamining-cn@master/Weather.csv")
        TerritoryType = await toJson("https://cdn.jsdelivr.net/gh/thewakingsands/ffxiv-datamining-cn@master/TerritoryType.csv")
        PlaceName = await toJson("https://cdn.jsdelivr.net/gh/thewakingsands/ffxiv-datamining-cn@master/PlaceName.csv")
    } catch (err) {
        console.error('Could not parse json', err)
    }
    let Weather2 = {}
    for (let item of Weather) {
        Weather2[item["key"]] = item["1"]
    }
    Weather = Weather2;

    window.Weather = Weather;
    window.WeatherRate = WeatherRate;
    window.TerritoryType = TerritoryType;
    window.PlaceName = PlaceName;
});

// in(int): TerritoryType out(json): {name:[],rate:[]}
function getWeatherRate(i) {
    for (let item of TerritoryType) {
        if (item.key == `${i}`) {
            const WeatherRateid = item["12"];
            for (let item2 of WeatherRate) {
                if (item2.key == WeatherRateid) {
                    item2 = {
                        "name": [Weather[item2["0"]], Weather[item2["2"]], Weather[item2["4"]], Weather[item2["6"]], Weather[item2["8"]], Weather[item2["10"]], Weather[item2["12"]], Weather[item2["14"]]],
                        "rate": [item2["1"], item2["3"], item2["5"], item2["7"], item2["9"], item2["11"], item2["13"], item2["15"]]
                    }
                    return item2
                }
            }
            return null;
        }
    }
    return null;
}

// in(int,json): weathervalue,{name:[],rate:[]} out(str):weather
function getWeather(i, rate) {
    const namearray = rate.name;
    const ratearray = rate.rate;
    let a = i;
    for (let v in ratearray) {
        a = a - parseInt(ratearray[v])
        if (a <= 0) {
            return namearray[v]
        }
    }
}

function TerritoryType2PlaceName(i) {
    for (let item of TerritoryType) {
        if (item.key == `${i}`) {
            const PlaceNameid = item["5"];
            for (let item2 of PlaceName) {
                if (item2.key == PlaceNameid) {
                    const pname = item2["0"];
                    if (pname == "") return "no name";
                    else return pname;
                }
            }
            return `wrong PlaceNameid ${PlaceNameid}`;
        }
    }
    return `wrong TerritoryTypeid ${i}`;
}

function toJson(url) {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            encoding: "utf-8",
            skipEmptyLines: true,
            complete(results, file) {
                console.log("Parsing complete:", results, file);
                resolve(results.data)
            },
            error(err, file) {
                reject(err)
            }
        })
    })
}

addOverlayListener("LogLine", (e) => {
    if (!recording) return;
    if (checkLog(e.line, "01", {})) {
        let t = $('#actlog_table').DataTable();
        let time = extractLog(e.line, "Time");
        time = moment(time).format("YY/MM/DD HH:mm");
        let id = extractLog(e.line, "ZoneID");
        id = parseInt(id, 16);
        const name = extractLog(e.line, "ZoneName");
        t.row.add({ Time: time, ID: id, Name: name });
        t.draw(false);
        let num_rows = t.page.info().recordsTotal;
        t.row(num_rows - 1).scrollTo(false);

        console.log(`${time} ${id} ${name}`);
        console.log(getWeatherRate(id));
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

export { getWeatherRate, TerritoryType2PlaceName, getWeather }