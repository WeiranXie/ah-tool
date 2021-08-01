"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheResponseInterceptor = exports.cacheRequestInterceptor = void 0;
const logger_1 = require("./logger");
const log = logger_1.logger('request-cache');
const cache = new Map();
async function cacheRequestInterceptor(request) {
    const url = request.url();
    const type = request.resourceType();
    const method = request.method();
    const response = cache.get(`${method}|${url}`);
    if (!response)
        return false;
    log.debug(`Returning cached response for ${method} ${url} [type=${type}]`);
    await request.respond(response);
    return true;
}
exports.cacheRequestInterceptor = cacheRequestInterceptor;
function cacheResponseInterceptor(response) {
    const request = response.request();
    const url = request.url();
    const method = request.method();
    const key = `${method}|${url}`;
    if (cache.has(key))
        return;
    const type = request.resourceType();
    const status = response.status();
    const headers = response.headers();
    if (url.match(/^https?:\/\//) &&
        ((method === 'GET') || (method === 'OPTIONS')) &&
        (status >= 200) && (status < 300)) {
        if (status === 204) {
            log.debug(`Caching response for ${method} ${url} [type=${type}]`);
            cache.set(key, { status, headers });
        }
        else {
            response.buffer().then((body) => {
                log.debug(`Caching response for ${method} ${url} [type=${type}]`);
                cache.set(key, { status, headers, body });
            }).catch((error) => {
                log.debug(`Error response for ${method} ${url} [type=${type}]`, error);
            });
        }
    }
    else {
        log.debug(`Not caching response for ${method} ${url} [type=${type},status=${status}]`);
    }
}
exports.cacheResponseInterceptor = cacheResponseInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcmVxdWVzdC1jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBaUM7QUFDakMsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRW5DLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUF1QyxDQUFBO0FBRXJELEtBQUssVUFBVSx1QkFBdUIsQ0FBQyxPQUFvQjtJQUNoRSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDekIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ25DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUUvQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDOUMsSUFBSSxDQUFFLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUU1QixHQUFHLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxNQUFNLElBQUksR0FBRyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUE7SUFDMUUsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQy9CLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQVhELDBEQVdDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsUUFBc0I7SUFDN0QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRWxDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN6QixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7SUFFL0IsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7SUFDOUIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU07SUFFMUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ25DLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNoQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUE7SUFFbEMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUMzQixDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1FBQ25DLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixNQUFNLElBQUksR0FBRyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUE7WUFDakUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtTQUNwQzthQUFNO1lBQ0wsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM5QixHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixNQUFNLElBQUksR0FBRyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUE7Z0JBQ2pFLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzNDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFzQixNQUFNLElBQUksR0FBRyxVQUFVLElBQUksR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3hFLENBQUMsQ0FBQyxDQUFBO1NBQ0g7S0FDRjtTQUFNO1FBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsTUFBTSxJQUFJLEdBQUcsVUFBVSxJQUFJLFdBQVcsTUFBTSxHQUFHLENBQUMsQ0FBQTtLQUN2RjtBQUNILENBQUM7QUE5QkQsNERBOEJDIn0=