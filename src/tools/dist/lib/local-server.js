"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalServer = void 0;
const path_1 = __importDefault(require("path"));
const mime_types_1 = require("mime-types");
const fs_1 = require("fs");
const logger_1 = require("./logger");
const log = logger_1.logger('local-server');
function makeResponse(path, body) {
    const contentType = mime_types_1.lookup(path) || undefined;
    const headers = { 'content-type': contentType, 'content-length': body.length };
    const response = { status: 200, contentType, headers, body };
    return response;
}
async function createLocalServer(baseDir, baseUrl) {
    function resolve(relative) {
        return path_1.default.normalize(path_1.default.join(baseDir, relative));
    }
    const index = resolve('/index.html');
    const indexResponse = makeResponse(index, await fs_1.promises.readFile(index));
    return async function serveLocally(request) {
        const url = request.url();
        if (url === baseUrl) {
            log.debug(`Returning index file for ${url} [type=${request.resourceType()},mime=${indexResponse.contentType}]`);
            await request.respond(indexResponse);
            return true;
        }
        if (!url.startsWith(baseUrl))
            return false;
        const path = new URL(url).pathname;
        const file = resolve(path);
        try {
            const stat = await fs_1.promises.stat(file);
            const response = stat.isDirectory() ?
                makeResponse(file, await fs_1.promises.readFile(file + '/index.html')) :
                makeResponse(file, await fs_1.promises.readFile(file));
            log.debug(`Serving local file "${path}" for ${url} [type=${request.resourceType()},mime=${response.contentType}]`);
            await request.respond(response);
            return true;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                log.debug(`Returning index file for ${url} [type=${request.resourceType()},mime=${indexResponse.contentType}]`);
                await request.respond(indexResponse);
                return true;
            }
            else {
                throw error;
            }
        }
    };
}
exports.createLocalServer = createLocalServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sb2NhbC1zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXVCO0FBQ3ZCLDJDQUFtQztBQUNuQywyQkFBbUM7QUFHbkMscUNBQWlDO0FBQ2pDLE1BQU0sR0FBRyxHQUFHLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUVsQyxTQUFTLFlBQVksQ0FBQyxJQUFZLEVBQUUsSUFBWTtJQUM5QyxNQUFNLFdBQVcsR0FBRyxtQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQTtJQUM3QyxNQUFNLE9BQU8sR0FBRyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQzlFLE1BQU0sUUFBUSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFBO0lBQzVELE9BQU8sUUFBUSxDQUFBO0FBQ2pCLENBQUM7QUFFTSxLQUFLLFVBQVUsaUJBQWlCLENBQUMsT0FBZSxFQUFFLE9BQWU7SUFFdEUsU0FBUyxPQUFPLENBQUMsUUFBZ0I7UUFDL0IsT0FBTyxjQUFJLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUdELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNwQyxNQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sYUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBRW5FLE9BQU8sS0FBSyxVQUFVLFlBQVksQ0FBQyxPQUFvQjtRQUNyRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7UUFHekIsSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsVUFBVSxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDL0csTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFHRCxJQUFJLENBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUE7UUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRzFCLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLGFBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxhQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxhQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDN0MsR0FBRyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxTQUFTLEdBQUcsVUFBVSxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsUUFBUSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbEgsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQy9CLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsVUFBVSxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7Z0JBQy9HLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDcEMsT0FBTyxJQUFJLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxNQUFNLEtBQUssQ0FBQTthQUNaO1NBQ0Y7SUFDSCxDQUFDLENBQUE7QUFDSCxDQUFDO0FBNUNELDhDQTRDQyJ9