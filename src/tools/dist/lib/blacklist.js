"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistInterceptor = void 0;
const logger_1 = require("./logger");
const log = logger_1.logger('blacklist');
async function blacklistInterceptor(request) {
    const type = request.resourceType();
    const url = request.url();
    if (!url.match(/^https?:\/\//))
        return false;
    if (type === 'image') {
        await request.abort();
        return true;
    }
    const hostname = new URL(url).hostname;
    if (hostname.match(/\.(contentful\.com|ctfassets\.net|juit\.com|juitnow\.com)$/)) {
        log.debug(`Allowing request for ${url} to continue [type=${type}]`);
        await request.continue();
    }
    else {
        log.debug(`Blocking request for ${url} [type=${type}]`);
        await request.abort();
    }
    return true;
}
exports.blacklistInterceptor = blacklistInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhY2tsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9ibGFja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEscUNBQWlDO0FBQ2pDLE1BQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUV4QixLQUFLLFVBQVUsb0JBQW9CLENBQUMsT0FBb0I7SUFDN0QsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ25DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUd6QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUc1QyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDcEIsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDckIsT0FBTyxJQUFJLENBQUE7S0FDWjtJQUdELE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtJQUN0QyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsRUFBRTtRQUNoRixHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLHNCQUFzQixJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0tBQ3pCO1NBQU07UUFDTCxHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUN2RCxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtLQUN0QjtJQUdELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQXpCRCxvREF5QkMifQ==