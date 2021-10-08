/**
 * ver.1.2-2014-06-22
 */

//地球時間→エオルゼア時間
var localToEorzea = function () {
	//エオルゼアの1年(月)
	var MONTHS_PER_YEAR = 12;
	//エオルゼアの1ヶ月(日)
	var DATES_PER_MONTH = 32;
	//エオルゼアの1日(時間)
	var HOURS_PER_DATE = 24;
	//エオルゼアの1時間(分)
	var MINUTES_PER_HOUR = 60;
	//エオルゼアの1分(秒)
	var SECONDS_PER_MINUTE = 60;
	//エオルゼアの1秒(ミリ秒)
	var MILLISECONDS_PER_SECONDS = 1000;
	//エオルゼア時間の速度(エオルゼア1日※1440分 = 地球時間70分)
	var EORZEA_PER_LOCAL = 1440 / 70;
	//エオルゼア時間(UNIX)
	var EORZEA_MILLISECONDS = 0;

	//エオルゼアの月日時分秒をミリ秒に換算
	/*
	 *ET1min = ET1,000ms * ET60sec
	 * (60,000ms)
	 */
	var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECONDS * SECONDS_PER_MINUTE;
	/*
	 *ET1hour = ET60,000ms * ET60min
	 * (3,600,000ms)
	 */
	var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
	/*
	 *ET1date = ET3,600,000ms * ET24h
	 * (86,400,000ms)
	 */
	var MILLISECONDS_PER_DATE = MILLISECONDS_PER_HOUR * HOURS_PER_DATE;
	/*
	 *ET1month = ET86,400,000ms * ET32d
	 * (2,764,800,000ms)
	 */
	var MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DATE * DATES_PER_MONTH;
	/*
	*ET1Year = ET2,764,800,000ms * ET12m
	* (33,177,600,000ms)
	*/
	var MILLISECONDS_PER_YEAR = MILLISECONDS_PER_MONTH * MONTHS_PER_YEAR;
	return {
		setTime: function (time) {
			var UNIX = time;
			//UNIXエポックミリ秒をエオルゼアエポックミリ秒に換算
			/*
			 *LT1d = LT1440min
			 *ET1d = LT70min
			 */
			EORZEA_MILLISECONDS = UNIX * EORZEA_PER_LOCAL;
		},
		setEtTime: function (time) {
			EORZEA_MILLISECONDS = time;
		},
		getYear: function () {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_YEAR);
		},
		getMonth: function () {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_MONTH) % MONTHS_PER_YEAR;
		},
		getDate: function () {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_DATE) % DATES_PER_MONTH;
		},
		getHours: function () {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_HOUR) % HOURS_PER_DATE;
		},
		getMinutes: function () {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
		},
		getSeconds: function () {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_SECONDS) % SECONDS_PER_MINUTE;
		},
		getMilliseconds: function () {
			return Math.floor(EORZEA_MILLISECONDS % MILLISECONDS_PER_SECONDS);
		},
		getTime: function () {
			return EORZEA_MILLISECONDS;
		},
		getSpeed: function () {
			return Math.floor(1000 / EORZEA_PER_LOCAL);
		}
	};
};

//エオルゼア時間→地球時間
var eorzeaToLocal = function () {
	var UNIX = 0;
	var MONTHS_PER_YEAR = 12;
	var END_OF_THE_MONTH = new Date();
	END_OF_THE_MONTH.setFullYear(END_OF_THE_MONTH.getFullYear(), END_OF_THE_MONTH.getMonth() + 1, 0);
	var DATES_PER_MONTH = END_OF_THE_MONTH.getDate();
	var HOURS_PER_DATE = 24;
	var MINUTES_PER_HOUR = 60;
	var SECONDS_PER_MINUTE = 60;
	var MILLISECONDS_PER_SECONDS = 1000;
	var LOCAL_PER_EORZEA = 70 / 1440;
	var LOCAL_MILLISECONDS = 0;
	var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECONDS * SECONDS_PER_MINUTE;
	var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
	var MILLISECONDS_PER_DATE = MILLISECONDS_PER_HOUR * HOURS_PER_DATE;
	var MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DATE * DATES_PER_MONTH;
	return {
		setTime: function (time) {
			UNIX = time;
			LOCAL_MILLISECONDS = UNIX * LOCAL_PER_EORZEA;
		},
		setLtTime: function (time) {
			LOCAL_MILLISECONDS = time;
		},
		getMonth: function () {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_MONTH) % MONTHS_PER_YEAR;
		},
		getDate: function () {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_DATE) % DATES_PER_MONTH;
		},
		getHours: function () {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_HOUR) % HOURS_PER_DATE;
		},
		getMinutes: function () {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
		},
		getSeconds: function () {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_SECONDS) % SECONDS_PER_MINUTE;
		},
		getMilliseconds: function () {
			return LOCAL_MILLISECONDS % MILLISECONDS_PER_SECONDS;
		},
		getTime: function () {
			return LOCAL_MILLISECONDS;
		}
	};
};

//日時分をミリ秒に変換
var timeToMillisecond = function () {
	var CURRENT_DAYS = 0;
	var CURRENT_HOUR = 0;
	var CURRENT_MINUTE = 0;
	var CURRENT_SECOND = 0;
	var HOURS_PER_DATE = 24;
	var MINUTES_PER_HOUR = 60;
	var SECONDS_PER_MINUTE = 60;
	var MILLISECONDS_PER_SECOND = 1000;
	//1分のミリ秒
	var MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
	//1時間のミリ秒
	var MILLISECONDS_PER_HOUR = MINUTES_PER_HOUR * MILLISECONDS_PER_MINUTE;
	//1日のミリ秒
	var MILLISECONDS_PER_DATE = HOURS_PER_DATE * MILLISECONDS_PER_HOUR;
	return {
		setDays: function (days) {
			CURRENT_DAYS = MILLISECONDS_PER_DATE * days;
		},
		setHours: function (hours) {
			CURRENT_HOUR = MILLISECONDS_PER_HOUR * hours;
		},
		setMinutes: function (minutes) {
			CURRENT_MINUTE = MILLISECONDS_PER_MINUTE * minutes;
		},
		setSeconds: function (seconds) {
			CURRENT_SECOND = MILLISECONDS_PER_SECOND * seconds;
		},
		getTime: function () {
			return CURRENT_DAYS + CURRENT_HOUR + CURRENT_MINUTE + CURRENT_SECOND;
		}
	};
};

//エオルゼアの新しい暦
var eorzeaNewCalendar = function () {
	//エオルゼアの属性変化(月)
	var ATTRIBUTE_PER_MONTH = 2;
	//エオルゼアの極性数
	var POLARITY_PER_MONTH = 2;
	var NEW_ATTRIBUTE = NEW_MONTH = 0;
	var NEW_POLARITY = 0;
	//	var POLARITY_LIST = ["霊","星"];
	var POLARITY_LIST = ["spirit", "star"];
	//	var ATTRIBUTE_LIST = ["氷","水","風","雷","火","土"];
	var ATTRIBUTE_LIST = ["ice", "water", "wind", "lightning", "fire", "earth"];
	return {
		setTime: function (time) {
			var ed = localToEorzea();
			ed.setEtTime(time);
			var MONTH = ed.getMonth() + 1;
			NEW_ATTRIBUTE = NEW_MONTH = Math.ceil(MONTH / ATTRIBUTE_PER_MONTH);
			NEW_POLARITY = MONTH % POLARITY_PER_MONTH;
		},
		getMonth: function () {
			return NEW_MONTH;
		},
		getPolarity: function () {
			return POLARITY_LIST[NEW_POLARITY];
		},
		getAttribute: function () {
			return ATTRIBUTE_LIST[NEW_ATTRIBUTE - 1];
		}
	};
};

//エオルゼアの曜日
var eorzeaDay = function () {
	//エオルゼアの1週間(日)
	var DATES_PER_WEEK = 8;
	var DAY_OF_THE_WEEK = 0;
	//	var WEEK_LIST = ["霊極日","風属日","雷属日","火属日","土属日","氷属日","水属日","星極日"];
	var WEEK_LIST = ["spirit", "wind", "lightning", "fire", "earth", "ice", "water", "star"];
	var REMAINING_TIME_OF_THE_DAY = 0;
	return {
		setTime: function (time) {
			var ed = localToEorzea();
			ed.setEtTime(time);
			var DATE = ed.getDate() + 1;
			var HOUR = ed.getHours();
			var MINUTE = ed.getMinutes();
			var SECOND = ed.getSeconds();

			DAY_OF_THE_WEEK = Math.floor(DATE % DATES_PER_WEEK);

			var currentMilliSecond = timeToMillisecond();
			currentMilliSecond.setHours(HOUR);
			currentMilliSecond.setMinutes(MINUTE);
			currentMilliSecond.setSeconds(SECOND);
			var CURRENT_MILLISECOND = currentMilliSecond.getTime();
			var milliseconsPerDate = timeToMillisecond();
			milliseconsPerDate.setDays(1);
			var MILLISECONDS_PER_DATE = milliseconsPerDate.getTime();
			//1日の残りミリ秒
			REMAINING_TIME_OF_THE_DAY = MILLISECONDS_PER_DATE - CURRENT_MILLISECOND;
		},
		getDay: function () {
			return WEEK_LIST[DAY_OF_THE_WEEK];
		},
		getTime: function () {
			return REMAINING_TIME_OF_THE_DAY;
		}
	};
};

//エオルゼアの刻属性と時属性
var eorzeaHour = function () {
	var HOURS = 0;
	var REMAINING_TIME_OF_THE_HOUR = 0;
	//エオルゼアの属性変化(時)
	var HOUR_PER_ATTRIBUTE = 6;
	//	var HOUR_ATTRIBUTE_LIST = ["風属時","雷属時","火属時","土属時","氷属時","水属時"];
	var HOUR_ATTRIBUTE_LIST = ["wind", "lightning", "fire", "earth", "ice", "water"];
	//エオルゼアの属性変化(刻)
	var TIME_PER_ATTRIBUTE = 4;
	//	var TIME_ATTRIBUTE_LIST = ["氷の刻","水の刻","風の刻","雷の刻","火の刻","土の刻"];
	var TIME_ATTRIBUTE_LIST = ["ice", "water", "wind", "lightning", "fire", "earth"];
	return {
		setTime: function (time) {
			var ed = localToEorzea();
			ed.setEtTime(time);
			HOURS = ed.getHours();
			var MINUTE = ed.getMinutes();
			var SECOND = ed.getSeconds();

			var currentMilliSecondH = timeToMillisecond();
			currentMilliSecondH.setMinutes(MINUTE);
			currentMilliSecondH.setSeconds(SECOND);
			var CURRENT_MILLISECOND_H = currentMilliSecondH.getTime();
			var milliSecondsPer1Hours = timeToMillisecond();
			milliSecondsPer1Hours.setHours(1);
			var MILLISECONDS_PER_1HOUR = milliSecondsPer1Hours.getTime();
			//1時間の残りミリ秒
			REMAINING_TIME_OF_THE_HOUR = MILLISECONDS_PER_1HOUR - CURRENT_MILLISECOND_H;

			var currentMilliSecondT = timeToMillisecond();
			currentMilliSecondT.setHours(HOURS % TIME_PER_ATTRIBUTE);
			currentMilliSecondT.setMinutes(MINUTE);
			currentMilliSecondT.setSeconds(SECOND);
			var CURRENT_MILLISECOND_T = currentMilliSecondT.getTime();
			var milliSecondsPer4Hours = timeToMillisecond();
			milliSecondsPer4Hours.setHours(TIME_PER_ATTRIBUTE);
			var MILLISECONDS_PER_4HOUR = milliSecondsPer4Hours.getTime();
			//1刻(4時間)の残りミリ秒
			REMAINING_TIME_OF_THE_TIME = MILLISECONDS_PER_4HOUR - CURRENT_MILLISECOND_T;
		},
		getHourCountDown: function () {
			return REMAINING_TIME_OF_THE_HOUR;
		},
		getHourAttribute: function () {
			var THE_SUNS2 = HOURS % HOUR_PER_ATTRIBUTE;
			return HOUR_ATTRIBUTE_LIST[THE_SUNS2];
		},
		getTimeCountDown: function () {
			return REMAINING_TIME_OF_THE_TIME;
		},
		getTimeAttribute: function () {
			var THE_SUNS1 = Math.floor(HOURS / TIME_PER_ATTRIBUTE);
			return TIME_ATTRIBUTE_LIST[THE_SUNS1];
		}
	};
};

var eorzeaWeather = function () {
	var REMAINING_TIME_OF_THE_WEATHER = 0;
	//エオルゼアの天候変化(時)
	var HOUR_PER_WEATHER = 8;
	return {
		setTime: function (time) {
			var ed = localToEorzea();
			ed.setEtTime(time);
			var HOURS = ed.getHours();
			var MINUTE = ed.getMinutes();
			var SECOND = ed.getSeconds();

			var currentMilliSecond = timeToMillisecond();
			currentMilliSecond.setHours(HOURS % HOUR_PER_WEATHER);
			currentMilliSecond.setMinutes(MINUTE);
			currentMilliSecond.setSeconds(SECOND);
			var CURRENT_MILLISECOND = currentMilliSecond.getTime();
			var milliSecondsPer8Hours = timeToMillisecond();
			milliSecondsPer8Hours.setHours(HOUR_PER_WEATHER);
			var MILLISECONDS_PER_8HOUR = milliSecondsPer8Hours.getTime();
			//8時間の残りミリ秒
			REMAINING_TIME_OF_THE_WEATHER = MILLISECONDS_PER_8HOUR - CURRENT_MILLISECOND;
		},
		getWeatherCountDown: function () {
			return REMAINING_TIME_OF_THE_WEATHER;
		}
	};
};

//エオルゼアの月齢
var eorzeaMoon = function () {
	var DATE = 0;
	var REMAINING_TIME_OF_THE_MOON = 0;
	//エオルゼアの月齢変化(日)
	var DATES_PER_MOON = 4;
	//	var MOON_LIST = ["新月","三日月","上弦の月","十三夜","満月","十六夜","下弦の月","二十六夜"];
	var MOON_LIST = ["new", "new_crescent", "quarter", "new_gibbous", "full", "old_gibbous", "waning", "old_crescent"];
	return {
		setTime: function (time) {
			var ed = localToEorzea();
			ed.setEtTime(time);
			DATE = ed.getDate() + 1;
			var HOUR = ed.getHours();
			var MINUTE = ed.getMinutes();
			var SECOND = ed.getSeconds();

			var currentMilliSecond = timeToMillisecond();
			currentMilliSecond.setDays(DATE % DATES_PER_MOON);
			currentMilliSecond.setHours(HOUR);
			currentMilliSecond.setMinutes(MINUTE);
			currentMilliSecond.setSeconds(SECOND);
			var CURRENT_MILLISECOND = currentMilliSecond.getTime();
			var milliseconsPerDate = timeToMillisecond();
			milliseconsPerDate.setDays(DATES_PER_MOON);
			var MILLISECONDS_PER_4DATE = milliseconsPerDate.getTime();
			//4日の残りミリ秒
			REMAINING_TIME_OF_THE_MOON = MILLISECONDS_PER_4DATE - CURRENT_MILLISECOND;

		},
		getMoon: function () {
			var AGE_OF_THE_MOON = Math.ceil(DATE / DATES_PER_MOON) - 1;
			return MOON_LIST[AGE_OF_THE_MOON];
		},
		getTime: function () {
			return REMAINING_TIME_OF_THE_MOON;
		}
	};
};

//リーヴ受注券
var nextLeves = function () {
	var LEVES_COUNTDOWN = 0;
	return {
		setTime: function (localdate) {
			var newLeaves = new Date(localdate);
			newLeaves.setUTCHours(12, 0, 0, 0);
			if (localdate.getUTCHours() >= 12) {
				newLeaves.setUTCDate(newLeaves.getUTCDate() + 1);
				newLeaves.setUTCHours(0);
			}
			LEVES_COUNTDOWN = newLeaves.getTime() - localdate.getTime();
		},
		getTime: function () {
			return LEVES_COUNTDOWN;
		}
	};
};

//軍需品調達
var nextProvision = function () {
	var PROVISION_COUNTDOWN = 0;
	return {
		setTime: function (localdate) {
			var newProvision = new Date(localdate);
			newProvision.setUTCHours(20, 0, 0, 0);
			if (localdate.getUTCHours() >= 20) {
				newProvision.setUTCDate(newProvision.getUTCDate() + 1);
			}
			PROVISION_COUNTDOWN = newProvision.getTime() - localdate.getTime();
		},
		getTime: function () {
			return PROVISION_COUNTDOWN;
		}
	};
};

//コンテンツリセット
var nextContents = function () {
	var REFERENCE_DAY = 2;
	var CONTENTS_COUNTDOWN = 0;
	return {
		setTime: function (localdate) {
			var DAY = localdate.getUTCDay();
			var NEXT_REFERENCE_DAY = REFERENCE_DAY - DAY;
			if (NEXT_REFERENCE_DAY < 0) {
				NEXT_REFERENCE_DAY = 7 + NEXT_REFERENCE_DAY;
			}
			if (NEXT_REFERENCE_DAY == 0 && localdate.getUTCHours() >= 8) {
				NEXT_REFERENCE_DAY = 7;
			}
			var newContents = new Date(localdate);
			newContents.setUTCHours(8, 0, 0, 0);
			newContents.setUTCDate(newContents.getUTCDate() + NEXT_REFERENCE_DAY);
			CONTENTS_COUNTDOWN = newContents.getTime() - localdate.getTime();
		},
		getTime: function () {
			return CONTENTS_COUNTDOWN;
		}
	};
};

//デイリーリセット
var nextDaily = function () {
	var DAILY_COUNTDOWN = 0;
	return {
		setTime: function (localdate) {
			var newDaily = new Date(localdate);
			newDaily.setUTCHours(15, 0, 0, 0);
			if (localdate.getUTCHours() >= 15) {
				newDaily.setUTCDate(newDaily.getUTCDate() + 1);
			}
			DAILY_COUNTDOWN = newDaily.getTime() - localdate.getTime();
		},
		getTime: function () {
			return DAILY_COUNTDOWN;
		}
	};
};

//数値2桁表示
function doubleDigit(number) {
	if (number < 10) {
		number = "0" + number;
	}
	return number;
};
//数値3桁表示
function tripleDigit(number) {
	if (number < 10) {
		number = "00" + number;
	}
	else if (number < 100) {
		number = "0" + number;
	}
	return number;
};

function etData() {
	//地球時間の取得
	var LocalDate = new Date();
	//UNIX時間（エポックミリ秒）※基準時間1970/01/01/00:00:0000からの経過秒の取得
	var LocalUnix = LocalDate.getTime();
	var LtMonth = LocalDate.getMonth() + 1;
	var LtDate = LocalDate.getDate();
	var LtDay = LocalDate.getDay();
	var LtHour = LocalDate.getHours();
	var LtMinute = LocalDate.getMinutes();
	var LtSecond = LocalDate.getSeconds();

	//エオルゼア時間の取得
	var EorzeaDate = localToEorzea();
	EorzeaDate.setTime(LocalUnix);
	var EorzeaUnix = EorzeaDate.getTime();
	var EtSpeed = EorzeaDate.getSpeed();
	var EtMonth = EorzeaDate.getMonth() + 1;
	var EtDate = EorzeaDate.getDate() + 1;
	var EtHour = EorzeaDate.getHours();
	var EtMinute = EorzeaDate.getMinutes();
	var EtSecond = EorzeaDate.getSeconds();

	//新暦の取得
	var EorzeaNewCalendar = eorzeaNewCalendar();
	EorzeaNewCalendar.setTime(EorzeaUnix);
	var EtNewMonth = EorzeaNewCalendar.getMonth();
	var EtNewPolarity = EorzeaNewCalendar.getPolarity();
	var EtNewAttribute = EorzeaNewCalendar.getAttribute();

	//曜日の取得
	var EorzeaDay = eorzeaDay();
	EorzeaDay.setTime(EorzeaUnix);
	var EtDay = EorzeaDay.getDay();
	var RemainingDay = EorzeaDay.getTime();
	var RemainingLtDate = eorzeaToLocal();
	RemainingLtDate.setTime(RemainingDay);
	var RemainingLtHours = RemainingLtDate.getHours();
	var RemainingLtMinutes = RemainingLtDate.getMinutes();
	var RemainingLtSeconds = RemainingLtDate.getSeconds();
	var RemainingLtTime = RemainingLtDate.getTime();
	var RemainingEtDate = localToEorzea();
	RemainingEtDate.setTime(RemainingLtTime);
	var RemainingEtHours = RemainingEtDate.getHours();
	var RemainingEtMinutes = RemainingEtDate.getMinutes();
	var RemainingEtSeconds = RemainingEtDate.getSeconds();

	//刻・時間属性の取得
	var EorzeaHour = eorzeaHour();
	EorzeaHour.setTime(EorzeaUnix);
	var EtHourAttribute = EorzeaHour.getHourAttribute();
	var EtHourCountDown = EorzeaHour.getHourCountDown();
	var ltHourCountDown = eorzeaToLocal();
	ltHourCountDown.setTime(EtHourCountDown);
	var ltHCDHours = ltHourCountDown.getHours();
	var ltHCDMinutes = ltHourCountDown.getMinutes();
	var ltHCDSeconds = ltHourCountDown.getSeconds();
	var ltHCDTime = ltHourCountDown.getTime();
	var etHourCountDown = localToEorzea();
	etHourCountDown.setTime(ltHCDTime);
	var etHCDHours = etHourCountDown.getHours();
	var etHCDMinutes = etHourCountDown.getMinutes();
	var etHCDSeconds = etHourCountDown.getSeconds();
	var EtTimeAttribute = EorzeaHour.getTimeAttribute();
	var EtTimeCountDown = EorzeaHour.getTimeCountDown();
	var ltTimeCountDown = eorzeaToLocal();
	ltTimeCountDown.setTime(EtTimeCountDown);
	var ltTCDHours = ltTimeCountDown.getHours();
	var ltTCDMinutes = ltTimeCountDown.getMinutes();
	var ltTCDSeconds = ltTimeCountDown.getSeconds();
	var ltTCDTime = ltTimeCountDown.getTime();
	var etTimeCountDown = localToEorzea();
	etTimeCountDown.setTime(ltTCDTime);
	var etTCDHours = etTimeCountDown.getHours();
	var etTCDMinutes = etTimeCountDown.getMinutes();
	var etTCDSeconds = etTimeCountDown.getSeconds();

	//天候変更時間の取得
	var EorzeaWeather = eorzeaWeather();
	EorzeaWeather.setTime(EorzeaUnix);
	var EtWeatherCountDown = EorzeaWeather.getWeatherCountDown();
	var ltWeatherCountDown = eorzeaToLocal();
	ltWeatherCountDown.setTime(EtWeatherCountDown);
	var ltWCDHours = ltWeatherCountDown.getHours();
	var ltWCDMinutes = ltWeatherCountDown.getMinutes();
	var ltWCDSeconds = ltWeatherCountDown.getSeconds();
	var ltWCDTime = ltWeatherCountDown.getTime();
	var etWeatherCountDown = localToEorzea();
	etWeatherCountDown.setTime(ltWCDTime);
	var etWCDHours = etWeatherCountDown.getHours();
	var etWCDMinutes = etWeatherCountDown.getMinutes();
	var etWCDSeconds = etWeatherCountDown.getSeconds();

	//月齢変更時間の取得
	var EorzeaMoon = eorzeaMoon();
	EorzeaMoon.setTime(EorzeaUnix);
	var EtMoon = EorzeaMoon.getMoon();
	var EtMoonCountDown = EorzeaMoon.getTime();
	var ltMoonCountDown = eorzeaToLocal();
	ltMoonCountDown.setTime(EtMoonCountDown);
	var ltMCDHours = ltMoonCountDown.getHours();
	var ltMCDMinutes = ltMoonCountDown.getMinutes();
	var ltMCDSeconds = ltMoonCountDown.getSeconds();
	var ltMCDTime = ltMoonCountDown.getTime();
	var etMoonCountDown = localToEorzea();
	etMoonCountDown.setTime(ltMCDTime);
	var etMCDDates = etMoonCountDown.getDate();
	var etMCDHours = etMoonCountDown.getHours();
	var etMCDMinutes = etMoonCountDown.getMinutes();
	var etMCDSeconds = etMoonCountDown.getSeconds();

	//リーヴ受注券追加時間の取得
	var NextLeves = nextLeves();
	NextLeves.setTime(LocalDate);
	var LtLevesCountDown = NextLeves.getTime();
	var ltLevesCountDown = eorzeaToLocal();
	ltLevesCountDown.setLtTime(LtLevesCountDown);
	var ltLCDHours = ltLevesCountDown.getHours();
	var ltLCDMinutes = ltLevesCountDown.getMinutes();
	var ltLCDSeconds = ltLevesCountDown.getSeconds();
	var etLevesCountDown = localToEorzea();
	etLevesCountDown.setTime(LtLevesCountDown);
	var etLCDDates = etLevesCountDown.getDate();
	var etLCDHours = etLevesCountDown.getHours();
	var etLCDMinutes = etLevesCountDown.getMinutes();
	var etLCDSeconds = etLevesCountDown.getSeconds();

	//軍需品納品更新時間の取得
	var NextProvision = nextProvision();
	NextProvision.setTime(LocalDate);
	var LtProvisionCountDown = NextProvision.getTime();
	var ltProvisionCountDown = eorzeaToLocal();
	ltProvisionCountDown.setLtTime(LtProvisionCountDown);
	var ltPCDHours = ltProvisionCountDown.getHours();
	var ltPCDMinutes = ltProvisionCountDown.getMinutes();
	var ltPCDSeconds = ltProvisionCountDown.getSeconds();
	var etProvisionCountDown = localToEorzea();
	etProvisionCountDown.setTime(LtProvisionCountDown);
	var etPCDDates = etProvisionCountDown.getDate();
	var etPCDHours = etProvisionCountDown.getHours();
	var etPCDMinutes = etProvisionCountDown.getMinutes();
	var etPCDSeconds = etProvisionCountDown.getSeconds();

	//コンテンツリセット時間の取得
	var NextContents = nextContents();
	NextContents.setTime(LocalDate);
	var LtContentsCountDown = NextContents.getTime();
	var ltContentsCountDown = eorzeaToLocal();
	ltContentsCountDown.setLtTime(LtContentsCountDown);
	var ltCCDDates = ltContentsCountDown.getDate();
	var ltCCDHours = ltContentsCountDown.getHours();
	var ltCCDMinutes = ltContentsCountDown.getMinutes();
	var ltCCDSeconds = ltContentsCountDown.getSeconds();
	var etContentsCountDown = localToEorzea();
	etContentsCountDown.setTime(LtContentsCountDown);
	var etCCDMonths = etContentsCountDown.getMonth();
	var etCCDDates = etContentsCountDown.getDate();
	var etCCDHours = etContentsCountDown.getHours();
	var etCCDMinutes = etContentsCountDown.getMinutes();
	var etCCDSeconds = etContentsCountDown.getSeconds();

	//デイリークエスト更新時間の取得
	var NextDaily = nextDaily();
	NextDaily.setTime(LocalDate);
	var LtDailyCountDown = NextDaily.getTime();
	var ltDailyCountDown = eorzeaToLocal();
	ltDailyCountDown.setLtTime(LtDailyCountDown);
	var ltDCDHours = ltDailyCountDown.getHours();
	var ltDCDMinutes = ltDailyCountDown.getMinutes();
	var ltDCDSeconds = ltDailyCountDown.getSeconds();
	var etDailyCountDown = localToEorzea();
	etDailyCountDown.setTime(LtDailyCountDown);
	var etDCDDates = etDailyCountDown.getDate();
	var etDCDHours = etDailyCountDown.getHours();
	var etDCDMinutes = etDailyCountDown.getMinutes();
	var etDCDSeconds = etDailyCountDown.getSeconds();

	//表示
	var LtDayTag1 = "";
	var LtDayTag2 = "";
	if (LtDay == 0) { LtDayTag1 = '<span class="EorzeaRed">'; };
	if (LtDay == 6) { LtDayTag1 = '<span class="EorzeaBlue">'; };
	if (LtDayTag1 != "") { LtDayTag2 = '</span>'; };
	var POLARITY_LIST_TEXT = ["霊", "星"];
	var POLARITY_LIST = ["spirit", "star"];
	var EtNewPolarityText = POLARITY_LIST_TEXT[POLARITY_LIST.indexOf(EtNewPolarity)];
	var EtMonthIcon = ["01halone.png", "02menphina.png", "03thaliak.png", "04nymeia.png", "05llymlaen.png", "06oschon.png", "07byregot.png", "08rhalgr.png", "09azeyma.png", "10naldthal.png", "11nophica.png", "12althyk.png"];
	var WEEK_LIST_TEXT = ["霊極日", "風属日", "雷属日", "火属日", "土属日", "氷属日", "水属日", "星極日"];
	var WEEK_LIST = ["spirit", "wind", "lightning", "fire", "earth", "ice", "water", "star"];
	var EtDayIndex = WEEK_LIST.indexOf(EtDay);
	var EtDayNextIndex = EtDayIndex + 1;
	if (EtDay == "star") { EtDayNextIndex = 0; };
	var HOUR_ATTRIBUTE_LIST_TEXT = ["風属時", "雷属時", "火属時", "土属時", "氷属時", "水属時"];
	var HOUR_ATTRIBUTE_LIST = ["wind", "lightning", "fire", "earth", "ice", "water"];
	var EtHourAttributeIndex = HOUR_ATTRIBUTE_LIST.indexOf(EtHourAttribute);
	var EtHourAttributeNextIndex = EtHourAttributeIndex + 1;
	if (EtHourAttribute == "water") { EtHourAttributeNextIndex = 0; };
	var TIME_ATTRIBUTE_LIST_TEXT = ["氷の刻", "水の刻", "風の刻", "雷の刻", "火の刻", "土の刻"];
	var TIME_ATTRIBUTE_LIST = ["ice", "water", "wind", "lightning", "fire", "earth"];
	var EtTimeAttributeIndex = TIME_ATTRIBUTE_LIST.indexOf(EtTimeAttribute);
	var EtTimeAttributeNextIndex = EtTimeAttributeIndex + 1;
	if (EtTimeAttribute == "earth") { EtTimeAttributeNextIndex = 0; };
	var MOON_LIST_TEXT = ["新月", "三日月", "上弦の月", "十三夜", "満月", "十六夜", "下弦の月", "二十六夜"];
	var MOON_LIST = ["new", "new_crescent", "quarter", "new_gibbous", "full", "old_gibbous", "waning", "old_crescent"];
	var EtMoonIndex = MOON_LIST.indexOf(EtMoon);
	var EtMoonNextIndex = EtMoonIndex + 1;
	if (EtMoon == "old_crescent") { EtMoonNextIndex = 0; };
	var etNextMoonDays = "";
	if (etMCDDates > 0) { etNextMoonDays = doubleDigit(etMCDDates) + "日と"; };
	var ltNextWeeklyDays = "";
	if (ltCCDDates > 0) { ltNextWeeklyDays = doubleDigit(ltCCDDates) + "日と"; };
	var etNextWeeklyMonth = "";
	if (etCCDMonths > 0) { etNextWeeklyMonth = doubleDigit(etCCDMonths) + "ヶ月"; };
	var etNextWeeklyDays = "";
	if (etCCDDates > 0) { etNextWeeklyDays = doubleDigit(etCCDDates) + "日と"; };
	var etNextDailyDays = "";
	if (etDCDDates > 0) { etNextDailyDays = doubleDigit(etDCDDates) + "日と"; };
	var etNextLevesDays = "";
	if (etLCDDates > 0) { etNextLevesDays = doubleDigit(etLCDDates) + "日と"; };
	var etNextProvisionDays = "";
	if (etPCDDates > 0) { etNextProvisionDays = doubleDigit(etPCDDates) + "日と"; };

	//出力
	var LOCAL_TIME = document.getElementById("LocalTime");
	if (LOCAL_TIME != null) {
		LOCAL_TIME.className = "EorzeaBox1 Eorzea90";
		LOCAL_TIME.innerHTML =
			'LT ' + doubleDigit(LtMonth) + '/' + LtDayTag1 + doubleDigit(LtDate) + LtDayTag2 + ' ' + doubleDigit(LtHour) + ':' + doubleDigit(LtMinute) + ':' + doubleDigit(LtSecond);
	}
	var EORZEA_TIME = document.getElementById("EorzeaTime");
	if (EORZEA_TIME != null) {
		EORZEA_TIME.className = "EorzeaBox1 Eorzea90";
		EORZEA_TIME.innerHTML =
			'ET ' + doubleDigit(EtMonth) + '/' + doubleDigit(EtDate) + ' ' + doubleDigit(EtHour) + ':' + doubleDigit(EtMinute) + ':' + doubleDigit(EtSecond);
	}
	var EORZEA_MONTH = document.getElementById("EorzeaMonth");
	if (EORZEA_MONTH != null) {
		EORZEA_MONTH.className = "EorzeaBox1 eorzea_" + EtNewAttribute;
		EORZEA_MONTH.innerHTML =
			EtNewPolarityText + EtNewMonth + '月<img class="EorzeaIcon" src="http://blog.livedoor.jp/eomap/ffxivClock/month_icon/' + EtMonthIcon[EtMonth - 1] + '">(' + EtMonth + '月)<img class="EorzeaIcon" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + EtNewAttribute + '.png">';
	}
	var EORZEA_DATE = document.getElementById("EorzeaDate");
	if (EORZEA_DATE != null) {
		EORZEA_DATE.className = "EorzeaBox1 eorzea_" + EtDay;
		EORZEA_DATE.innerHTML =
			EtDate + '日(' + WEEK_LIST_TEXT[EtDayIndex] + ')<img class="EorzeaIcon" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + EtDay + '.png">' +
			'<div id="EorzeaDateCowntdown" class="EorzeaCountDown Eorzea70">' +
			doubleDigit(RemainingLtHours) + ':' + doubleDigit(RemainingLtMinutes) + ':' + doubleDigit(RemainingLtSeconds) +
			'<div>' +
			'ET ' + doubleDigit(RemainingEtHours) + ':' + doubleDigit(RemainingEtMinutes) + ':' + doubleDigit(RemainingEtSeconds) +
			'</div>' +
			'</div>' +
			'<div id="NextEorzeaDate" class="EorzeaNext Eorzea70 eorzea_' + WEEK_LIST[EtDayNextIndex] + '">' +
			'翌日 (' + WEEK_LIST_TEXT[EtDayNextIndex] + ')<img class="EorzeaIcon EorzeaFilter" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + WEEK_LIST[EtDayNextIndex] + '.png">' +
			'</div>';
	}
	var EORZEA_HOUR1 = document.getElementById("EorzeaHour1");
	if (EORZEA_HOUR1 != null) {
		EORZEA_HOUR1.className = "EorzeaBox1 eorzea_" + EtHourAttribute;
		EORZEA_HOUR1.innerHTML =
			EtHour + '時(' + HOUR_ATTRIBUTE_LIST_TEXT[EtHourAttributeIndex] + ')<img class="EorzeaIcon" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + EtHourAttribute + '.png">' +
			'<div id="EorzeaHourCountdown" class="EorzeaCountDown Eorzea70">' +
			doubleDigit(ltHCDHours) + ':' + doubleDigit(ltHCDMinutes) + ':' + doubleDigit(ltHCDSeconds) +
			'<div>' +
			'ET ' + doubleDigit(etHCDHours) + ':' + doubleDigit(etHCDMinutes) + ':' + doubleDigit(etHCDSeconds) +
			'</div>' +
			'</div>' +
			'<div id="NextEorzeaHour" class="EorzeaNext Eorzea70 eorzea_' + HOUR_ATTRIBUTE_LIST[EtHourAttributeNextIndex] + '">' +
			'翌属時 (' + HOUR_ATTRIBUTE_LIST_TEXT[EtHourAttributeNextIndex] + ')<img class="EorzeaIcon EorzeaFilter" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + HOUR_ATTRIBUTE_LIST[EtHourAttributeNextIndex] + '.png">' +
			'</div>';
	}
	var EORZEA_HOUR2 = document.getElementById("EorzeaHour2");
	if (EORZEA_HOUR2 != null) {
		EORZEA_HOUR2.className = "EorzeaBox1 eorzea_" + EtTimeAttribute;
		EORZEA_HOUR2.innerHTML =
			TIME_ATTRIBUTE_LIST_TEXT[EtTimeAttributeIndex] + '<img class="EorzeaIcon" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + EtTimeAttribute + '.png">' +
			'<div id="EorzeaHour2Countdown" class="EorzeaCountDown Eorzea70">' +
			doubleDigit(ltTCDHours) + ':' + doubleDigit(ltTCDMinutes) + ':' + doubleDigit(ltTCDSeconds) +
			'<div>' +
			'ET ' + doubleDigit(etTCDHours) + ':' + doubleDigit(etTCDMinutes) + ':' + doubleDigit(etTCDSeconds) +
			'</div>' +
			'</div>' +
			'<div id="NextEorzeaHour2" class="EorzeaNext Eorzea70 eorzea_' + TIME_ATTRIBUTE_LIST[EtTimeAttributeNextIndex] + '">' +
			'翌属刻 (' + TIME_ATTRIBUTE_LIST_TEXT[EtTimeAttributeNextIndex] + ')<img class="EorzeaIcon EorzeaFilter" src="http://blog.livedoor.jp/eomap/ffxivClock/attribute_icon/' + TIME_ATTRIBUTE_LIST[EtTimeAttributeNextIndex] + '.png">' +
			'</div>';
	}
	var EORZEA_MOON = document.getElementById("EorzeaMoon");
	if (EORZEA_MOON != null) {
		EORZEA_MOON.className = "EorzeaBox1";
		EORZEA_MOON.innerHTML =
			MOON_LIST_TEXT[EtMoonIndex] + '<img class="EorzeaIcon" src="http://blog.livedoor.jp/eomap/ffxivClock/moon_icon/' + EtMoon + '.png">' +
			'<div id="NextEorzeaMoonCowntdown" class="EorzeaCountDown Eorzea70">' +
			doubleDigit(ltMCDHours) + ':' + doubleDigit(ltMCDMinutes) + ':' + doubleDigit(ltMCDSeconds) +
			'<div>' +
			'ET ' + etNextMoonDays + doubleDigit(etMCDHours) + ':' + doubleDigit(etMCDMinutes) + ':' + doubleDigit(etMCDSeconds) +
			'</div>' +
			'</div>' +
			'<div id="NextEorzeaMoon" class="EorzeaNext Eorzea70">' +
			'翌月齢(' + MOON_LIST_TEXT[EtMoonNextIndex] + ')<img class="EorzeaIcon EorzeaFilter" src="http://blog.livedoor.jp/eomap/ffxivClock/moon_icon/' + MOON_LIST[EtMoonNextIndex] + '.png">' +
			'</div>';
	}
	var EORZEA_WEATHER = document.getElementById("EorzeaWeather");
	if (EORZEA_WEATHER != null) {
		EORZEA_WEATHER.className = "EorzeaBox1";
		EORZEA_WEATHER.innerHTML =
			'天候' +
			'<div id="NextEorzeaWeatherCowntdown" class="EorzeaCountDown Eorzea70">' +
			doubleDigit(ltWCDHours) + ':' + doubleDigit(ltWCDMinutes) + ':' + doubleDigit(ltWCDSeconds) +
			'<div>' +
			'ET ' + doubleDigit(etWCDHours) + ':' + doubleDigit(etWCDMinutes) + ':' + doubleDigit(etWCDSeconds) +
			'</div>' +
			'</div>';
	}
	var EORZEA_CONTENTS = document.getElementById("EorzeaContents");
	if (EORZEA_CONTENTS != null) {
		EORZEA_CONTENTS.className = "EorzeaBox1";
		EORZEA_CONTENTS.innerHTML =
			'コンテンツ' +
			'<div id="WeeklyReset" class="EorzeaContentsTitle Eorzea70">' +
			'ウィークリーリセット' +
			'<div id="WeeklyResetCountdown" class="EorzeaCountDown">' +
			ltNextWeeklyDays + doubleDigit(ltCCDHours) + ':' + doubleDigit(ltCCDMinutes) + ':' + doubleDigit(ltCCDSeconds) +
			'<div>' +
			'ET ' + etNextWeeklyMonth + etNextWeeklyDays + doubleDigit(etCCDHours) + ':' + doubleDigit(etCCDMinutes) + ':' + doubleDigit(etCCDSeconds) +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div id="DailyReset" class="EorzeaContentsTitle Eorzea70">' +
			'デイリーリセット' +
			'<div id="DailyResetCountdown" class="EorzeaCountDown">' +
			doubleDigit(ltDCDHours) + ':' + doubleDigit(ltDCDMinutes) + ':' + doubleDigit(ltDCDSeconds) +
			'<div>' +
			'ET ' + etNextDailyDays + doubleDigit(etDCDHours) + ':' + doubleDigit(etDCDMinutes) + ':' + doubleDigit(etDCDSeconds) +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div id="EorzeaLeves" class="EorzeaContentsTitle Eorzea70">' +
			'リーヴ受注券追加' +
			'<div id="EorzeaLevesCountdown" class="EorzeaCountDown">' +
			doubleDigit(ltLCDHours) + ':' + doubleDigit(ltLCDMinutes) + ':' + doubleDigit(ltLCDSeconds) +
			'<div>' +
			'ET ' + etNextLevesDays + doubleDigit(etLCDHours) + ':' + doubleDigit(etLCDMinutes) + ':' + doubleDigit(etLCDSeconds) +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div id="EorzeaProvision" class="EorzeaContentsTitle Eorzea70">' +
			'調達任務更新' +
			'<div id="EorzeaProvisionCountdown" class="EorzeaCountDown">' +
			doubleDigit(ltPCDHours) + ':' + doubleDigit(ltPCDMinutes) + ':' + doubleDigit(ltPCDSeconds) +
			'<div>' +
			'ET ' + etNextProvisionDays + doubleDigit(etPCDHours) + ':' + doubleDigit(etPCDMinutes) + ':' + doubleDigit(etPCDSeconds) +
			'</div>' +
			'</div>' +
			'</div>';
	}

	var EORZEA_TASK = document.getElementById("EorzeaTask");
	if (EORZEA_TASK != null) {
		EORZEA_TASK.innerHTML =
			'<div id="EorzeaProvisionCountdown" style="font-family: monospace;">' +
			doubleDigit(ltPCDHours) + '小时' + doubleDigit(ltPCDMinutes) + '分' + doubleDigit(ltPCDSeconds) +
			'秒后</div>';
	}

	setTimeout("etData()", EtSpeed);
};

function etData2() {
	var LocalDate = new Date();
	var NextProvision = nextProvision();
	NextProvision.setTime(LocalDate);
	var LtProvisionCountDown = NextProvision.getTime();
	var ltProvisionCountDown = eorzeaToLocal();
	ltProvisionCountDown.setLtTime(LtProvisionCountDown);
	var ltPCDHours = ltProvisionCountDown.getHours();
	var ltPCDMinutes = ltProvisionCountDown.getMinutes();
	var ltPCDSeconds = ltProvisionCountDown.getSeconds();
	return '<div id="EorzeaProvisionCountdown" style="font-family: monospace;">' +
		ltPCDHours + '小时' + ltPCDMinutes + '分' + ltPCDSeconds +
		'秒后</div>';
}

function etData3() {
	const LocalDate = new Date();
	const LocalUnix = LocalDate.getTime();

	const EorzeaDate = localToEorzea();
	EorzeaDate.setTime(LocalUnix);
	const EorzeaUnix = EorzeaDate.getTime();
	const EtSpeed = EorzeaDate.getSpeed();
	const EtMonth = EorzeaDate.getMonth() + 1;
	const EtDate = EorzeaDate.getDate() + 1;
	const EtHour = EorzeaDate.getHours();
	const EtMinute = EorzeaDate.getMinutes();
	const EtSecond = EorzeaDate.getSeconds();

	//新暦の取得
	const EorzeaNewCalendar = eorzeaNewCalendar();
	EorzeaNewCalendar.setTime(EorzeaUnix);
	const EtNewMonth = EorzeaNewCalendar.getMonth();
	const EtNewPolarity = EorzeaNewCalendar.getPolarity();
	const EtNewAttribute = EorzeaNewCalendar.getAttribute();

	//曜日の取得
	const EorzeaDay = eorzeaDay();
	EorzeaDay.setTime(EorzeaUnix);
	const EtDay = EorzeaDay.getDay();

	// //刻・時間属性の取得
	// const EorzeaHour = eorzeaHour();
	// EorzeaHour.setTime(EorzeaUnix);
	// const EtHourAttribute = EorzeaHour.getHourAttribute();
	// const EtTimeAttribute = EorzeaHour.getTimeAttribute();

	//月齢変更時間の取得
	const EorzeaMoon = eorzeaMoon();
	EorzeaMoon.setTime(EorzeaUnix);
	const EtMoon = EorzeaMoon.getMoon();

	const POLARITY_LIST_TEXT = ["霊", "星"];
	const POLARITY_LIST = ["spirit", "star"];
	const EtMonthIcon = ["01halone.png", "02menphina.png", "03thaliak.png", "04nymeia.png", "05llymlaen.png", "06oschon.png", "07byregot.png", "08rhalgr.png", "09azeyma.png", "10naldthal.png", "11nophica.png", "12althyk.png"];
	const EtMonthIconUrl = '/img/' + EtMonthIcon[EtMonth - 1];
	const EtNewPolarityText = POLARITY_LIST_TEXT[POLARITY_LIST.indexOf(EtNewPolarity)];
	const EtMonthImg = `<img style="vertical-align:middle;" src="${EtMonthIconUrl}">`

	const MONTH_ATTRIBUTE_LIST_TEXT = ["氷", "水", "風", "雷", "火", "土"];
	const MONTH_ATTRIBUTE_LIST = ["ice", "water", "wind", "lightning", "fire", "earth"];
	const EtMonthText = MONTH_ATTRIBUTE_LIST_TEXT[MONTH_ATTRIBUTE_LIST.indexOf(EtNewAttribute)];

	const WEEK_LIST_TEXT = ["霊極日", "風属日", "雷属日", "火属日", "土属日", "氷属日", "水属日", "星極日"];
	const WEEK_LIST = ["spirit", "wind", "lightning", "fire", "earth", "ice", "water", "star"];
	const EtDayText = WEEK_LIST_TEXT[WEEK_LIST.indexOf(EtDay)];

	// const HOUR_ATTRIBUTE_LIST_TEXT = ["風属時", "雷属時", "火属時", "土属時", "氷属時", "水属時"];
	// const HOUR_ATTRIBUTE_LIST = ["wind", "lightning", "fire", "earth", "ice", "water"];
	// const EtHourAttributeText = HOUR_ATTRIBUTE_LIST_TEXT[HOUR_ATTRIBUTE_LIST.indexOf(EtHourAttribute)];


	// const TIME_ATTRIBUTE_LIST_TEXT = ["氷の刻", "水の刻", "風の刻", "雷の刻", "火の刻", "土の刻"];
	// const TIME_ATTRIBUTE_LIST = ["ice", "water", "wind", "lightning", "fire", "earth"];
	// const EtTimeAttributeText = TIME_ATTRIBUTE_LIST_TEXT[TIME_ATTRIBUTE_LIST.indexOf(EtTimeAttribute)];


	const MOON_LIST_TEXT = ["新月", "三日月", "上弦の月", "十三夜", "満月", "十六夜", "下弦の月", "二十六夜"];
	const MOON_LIST = ["new", "new_crescent", "quarter", "new_gibbous", "full", "old_gibbous", "waning", "old_crescent"];
	const EtMoonText = MOON_LIST_TEXT[MOON_LIST.indexOf(EtMoon)];
	const EtMoonImg = `<img style="vertical-align:middle;" src="/img/${EtMoon}.png">`;

	return ` ${doubleDigit(EtMonth)}/${doubleDigit(EtDate)} ${doubleDigit(EtHour)}:${doubleDigit(EtMinute)} `
	// +		`${EtMonthImg}<span style="vertical-align:middle;">${EtNewPolarityText}${EtNewMonth}月(${EtMonthText}) ${EtDayText} </span>${EtMoonImg}`
}

function show() {
	const dom1 = document.querySelector('header.navbar')
	if (dom1) {
		const dom2 = document.querySelector('.site-name');
		if (dom2) {
			dom2.innerHTML = etData3();
		} else {
			//document.querySelector('div.theme-container > aside > ul.sidebar-links').style = 'max-height:70%;overflow-x:auto;overflow-y:auto;'
			//const d1 = document.createElement('span')
			//d1.id = 'showtime'
			//d1.style = 'vertical-align: middle; display: inline-block; top:85%; text-align: center; line-height: 2em;'
			//dom1.appendChild(d1)
		}
	}
	setTimeout("show()", 500)
}

show();