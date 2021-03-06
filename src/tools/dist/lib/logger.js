"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const colors_1 = require("./colors");
var Level;
(function (Level) {
    Level[Level["debug"] = 1] = "debug";
    Level[Level["info"] = 2] = "info";
    Level[Level["warn"] = 3] = "warn";
    Level[Level["error"] = 4] = "error";
    Level[Level["off"] = 5] = "off";
})(Level || (Level = {}));
exports.logger = (() => {
    let level = Level.info;
    function getLogLevel() {
        if (level <= Level.debug)
            return 'debug';
        if (level <= Level.info)
            return 'info';
        if (level <= Level.warn)
            return 'warn';
        if (level <= Level.error)
            return 'error';
        return 'off';
    }
    function setLogLevel(l) {
        const newLevel = Level[l] || Level.info;
        if (newLevel != level)
            level = newLevel;
    }
    function date() {
        const date = new Date();
        const h = date.getHours().toString().padStart(2, '0');
        const m = date.getMinutes().toString().padStart(2, '0');
        const s = date.getSeconds().toString().padStart(2, '0');
        const S = date.getMilliseconds().toString().padStart(3, '0');
        return `${colors_1.K}${h}:${m}:${s}.${S}${colors_1.X}`;
    }
    function logger(prefix) {
        const pfx = prefix ? `${colors_1.K}[${colors_1.C}${prefix}${colors_1.K}]${colors_1.X}` : '';
        const log = prefix ? {
            debug: (...args) => void ((level <= Level.debug) && console.debug(date(), `${colors_1.B}DEBUG${colors_1.X}`, pfx, ...args)),
            info: (...args) => void ((level <= Level.info) && console.info(date(), `${colors_1.G}INFO${colors_1.X} `, pfx, ...args)),
            warn: (...args) => void ((level <= Level.warn) && console.warn(date(), `${colors_1.Y}WARN${colors_1.X} `, pfx, ...args)),
            error: (...args) => void ((level <= Level.error) && console.error(date(), `${colors_1.R}ERROR${colors_1.X}`, pfx, ...args)),
        } : {
            debug: (...args) => void ((level <= Level.debug) && console.debug(date(), `${colors_1.B}DEBUG${colors_1.X}`, ...args)),
            info: (...args) => void ((level <= Level.info) && console.info(date(), `${colors_1.G}INFO${colors_1.X} `, ...args)),
            warn: (...args) => void ((level <= Level.warn) && console.warn(date(), `${colors_1.Y}WARN${colors_1.X} `, ...args)),
            error: (...args) => void ((level <= Level.error) && console.error(date(), `${colors_1.R}ERROR${colors_1.X}`, ...args)),
        };
        return Object.freeze(Object.assign(log, {
            get level() { return getLogLevel(); },
            get isDebugEnabled() { return level <= Level.debug; },
            get isInfoEnabled() { return level <= Level.info; },
            get isWarnEnabled() { return level <= Level.warn; },
            get isErrorEnabled() { return level <= Level.error; },
        }));
    }
    return Object.freeze(Object.defineProperties(logger, {
        level: { get: getLogLevel, set: setLogLevel },
    }));
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EscUNBQThDO0FBTTlDLElBQUssS0FNSjtBQU5ELFdBQUssS0FBSztJQUNSLG1DQUFTLENBQUE7SUFDVCxpQ0FBUyxDQUFBO0lBQ1QsaUNBQVMsQ0FBQTtJQUNULG1DQUFTLENBQUE7SUFDVCwrQkFBUyxDQUFBO0FBQ1gsQ0FBQyxFQU5JLEtBQUssS0FBTCxLQUFLLFFBTVQ7QUFrQ1ksUUFBQSxNQUFNLEdBQVcsQ0FBQyxHQUFHLEVBQUU7SUFDbEMsSUFBSSxLQUFLLEdBQVUsS0FBSyxDQUFDLElBQUksQ0FBQTtJQUU3QixTQUFTLFdBQVc7UUFDbEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUs7WUFBRSxPQUFPLE9BQU8sQ0FBQTtRQUN4QyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSTtZQUFFLE9BQU8sTUFBTSxDQUFBO1FBQ3RDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJO1lBQUUsT0FBTyxNQUFNLENBQUE7UUFDdEMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUs7WUFBRSxPQUFPLE9BQU8sQ0FBQTtRQUN4QyxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFXO1FBQzlCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFBO1FBQ3ZDLElBQUksUUFBUSxJQUFJLEtBQUs7WUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFBO0lBQ3pDLENBQUM7SUFFRCxTQUFTLElBQUk7UUFDWCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzVELE9BQU8sR0FBRyxVQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQUMsRUFBRSxDQUFBO0lBQ3RDLENBQUM7SUFFRCxTQUFTLE1BQU0sQ0FBQyxNQUFlO1FBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFDLElBQUksVUFBQyxHQUFHLE1BQU0sR0FBRyxVQUFDLElBQUksVUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUV2RCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxVQUFDLFFBQVEsVUFBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDaEgsSUFBSSxFQUFHLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBRSxJQUFJ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