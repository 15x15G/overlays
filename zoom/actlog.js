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
        Weather2[item["key"]] = getIcon(item["0"]) + item["1"];
    }
    Weather = Weather2;

    window.Weather = Weather;
    window.WeatherRate = WeatherRate;
    window.TerritoryType = TerritoryType;
    window.PlaceName = PlaceName;
});

// in(int): TerritoryType out(json): {name:str,weather:[],rate:[]}
function getWeatherRate(i) {
    for (let item of TerritoryType) {
        if (item.key == `${i}`) {

            //get PlaceName
            const PlaceNameid = item["5"];
            let pname = "";
            for (let item1 of PlaceName) {
                if (item1.key == PlaceNameid) {
                    pname = item1["0"];
                }
            }
            if (pname == "") pname = "no name";

            // get WeatherRate
            const WeatherRateid = item["12"];
            if (WeatherRateid == "0") {
                return { "weather": ["晴朗"], "rate": ["100"] }
            }
            for (let item2 of WeatherRate) {
                if (item2.key == WeatherRateid) {
                    item2 = {
                        "name": pname,
                        "weather": [item2["0"], item2["2"], item2["4"], item2["6"], item2["8"], item2["10"], item2["12"], item2["14"]],
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

// in(json,int): {name:str,weather:[],rate:[]}, weatherseed
// out(str): weather
function getWeather(rate, seed = getSeed()) {
    const namearray = rate.weather;
    const ratearray = rate.rate;
    let temp = seed;
    for (let v in ratearray) {
        temp = temp - parseInt(ratearray[v])
        if (temp < 0) {
            return rate.name + " " + Weather[namearray[v]]
        }
    }
}



function getSeed(time = localToEorzea()) {
    const t = time.getDays() * 100 + (time.getHours() + 8 - time.getHours() % 8) % 24;
    const i = calcSeed(t);
    return i
    function calcSeed(base) {
        // tslint:disable:no-bitwise
        const step1 = (base << 11 ^ base) >>> 0;
        const step2 = (step1 >>> 8 ^ step1) >>> 0;
        // tslint:enable:no-bitwise
        return step2 % 100;
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

function getIcon(i) {
    let str = `${i}`;
    if (str == "" || str == "0") return "";
    while (str.length <= 5) str = '0' + str;
    const folder = str.substring(0, 3) + "000"
    const url = `https://xivapi.com/i/${folder}/${str}.png`
    return `<img style="vertical-align:middle;" src=${url}>`
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
        let time = extractLog(e.line, "Time");
        let id = extractLog(e.line, "ZoneID");
        id = parseInt(id, 16);
        const name = extractLog(e.line, "ZoneName");
        window.rateid = id;
        addrow(id, name, time);
    }
});

function addrow(rateid, name = "", time = moment()) {
    console.log(`${time} ${rateid} ${name}`);
    const unixms = moment(time).valueOf();
    name = getWeather(getWeatherRate(rateid), getSeed(localToEorzea(unixms)))

    let t = $('#actlog_table').DataTable();
    t.row.add({ Time: moment(time).format("YY/MM/DD HH:mm"), ID: rateid, Name: name });
    t.draw(false);
    let num_rows = t.page.info().recordsTotal;
    t.row(num_rows - 1).scrollTo(false);


}

$('#cleatLogButton').click(() => {
    let t = $('#actlog_table').DataTable();
    t.clear();
    t.draw();
});

$('#startStopButton').click(() => {
    recording = !recording;
    $('#startStopButton').text(recording ? '停止记录' : '开始记录');
});


function show() {
    const lt = moment().format("MM/DD HH:mm:ss");
    const et = localToEorzea(moment().valueOf());
    const etMM = doubleDigit(et.getMonth());
    const etDD = doubleDigit(et.getDate());
    const ethh = doubleDigit(et.getHours());
    const etmm = doubleDigit(et.getMinutes());
    const etss = doubleDigit(et.getSeconds());
    const etstr = `${etMM}/${etDD} ${ethh}:${etmm}:${etss}`;

    //月份图标
    const EtMonth = et.getMonth() + 1;
    const EtMonthIcon = ["01halone.png", "02menphina.png", "03thaliak.png", "04nymeia.png", "05llymlaen.png", "06oschon.png", "07byregot.png", "08rhalgr.png", "09azeyma.png", "10naldthal.png", "11nophica.png", "12althyk.png"];
    const EtMonthIconUrl = 'https://15x15g.github.io/img/' + EtMonthIcon[EtMonth - 1];
    const EtMonthImg = `<img style="vertical-align:middle;" src="${EtMonthIconUrl}">`

    //月相
    const EorzeaMoon = eorzeaMoon();
    EorzeaMoon.setTime(et.getTime());
    const EtMoon = EorzeaMoon.getMoon();
    const MOON_LIST_TEXT = ["新月", "三日月", "上弦の月", "十三夜", "満月", "十六夜", "下弦の月", "二十六夜"];
    const MOON_LIST = ["new", "new_crescent", "quarter", "new_gibbous", "full", "old_gibbous", "waning", "old_crescent"];
    const EtMoonImg = `<img style="vertical-align:middle;" src="https://15x15g.github.io/img/${EtMoon}.png">`;
    const EtMoonText = MOON_LIST_TEXT[MOON_LIST.indexOf(EtMoon)];
    const moon = `${EtMoonImg}<span style="vertical-align:middle;">${EtMoonText}</span>`;

    //天气
    let w = ""
    if (window.rateid && window.rateid != 0)
        w = getWeather(getWeatherRate(window.rateid));

    let output = `${lt}<br/>${etstr}<br/>${w} ${EtMonthImg} ${moon}`
    if ($('#clock')) {
        $('#clock').html(output);
    }
    setTimeout("show()", 50);
}

export { getWeatherRate, TerritoryType2PlaceName, getWeather, getSeed, addrow, show }