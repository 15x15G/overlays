export default class EorzeaClock {
    static ratio = 1440 / 70;
    date;
    constructor(ts) {
        if (ts !== undefined) {
            this.date = new Date(ts);
        } else {
            this.date = new Date(Date.now() * EorzeaClock.ratio);
        }
    }
    getHours() {
        return this.date.getUTCHours();
    }
    addHours(hourspan) {
        return new EorzeaClock(this.date.getTime() + hourspan * 3600000);
    }
    clone() {
        return this.addHours(0);
    }
    getMinutes() {
        return this.date.getUTCMinutes();
    }
    getSecends() {
        return this.date.getUTCSeconds();
    }
    getDays() {
        return Math.floor(this.date.getTime() / 86400000);
    }
    getLocalTime() {
        return new Date(this.date.getTime() / EorzeaClock.ratio);
    }
    toHourMinuteString() {
        const hour = this.getHours();
        const hs = `${hour < 10 ? "0" : ""}${hour}`;
        const min = this.getMinutes();
        const ms = `${min < 10 ? "0" : ""}${min}`;
        return `${hs}:${ms}`;
    }
    toHHmmssString() {
        const hour = this.getHours();
        const hs = `${hour < 10 ? "0" : ""}${hour}`;
        const min = this.getMinutes();
        const ms = `${min < 10 ? "0" : ""}${min}`;
        const sec = this.getSecends();
        const ss = `${sec < 10 ? "0" : ""}${sec}`;
        return `${hs}:${ms}:${ss}`;
    }
}

