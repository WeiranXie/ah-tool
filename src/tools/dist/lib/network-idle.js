"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForNetworkIdle = exports.PuppeteerPendingRequests = void 0;
class PuppeteerPendingRequests {
    constructor(page, timeout, callback) {
        this._requests = new Set();
        this._page = page;
        this._timeout = timeout;
        this._callback = callback;
        this._onRequest = this._onRequest.bind(this);
        this._onRequestFailed = this._onRequestFailed.bind(this);
        this._onRequestFinished = this._onRequestFinished.bind(this);
        this._page.on('request', this._onRequest);
        this._page.on('requestfailed', this._onRequestFailed);
        this._page.on('requestfinished', this._onRequestFinished);
        this._setTimer();
    }
    _onRequest(request) {
        this._requests.add(request);
    }
    _onRequestFailed(request) {
        this._requests.delete(request);
        if (this._requests.size === 0) {
            this._setTimer();
        }
    }
    _onRequestFinished(request) {
        this._requests.delete(request);
        if (this._requests.size === 0) {
            this._setTimer();
        }
    }
    _setTimer() {
        if (this._timer)
            clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            if (this._requests.size === 0) {
                this._page.off('request', this._onRequest);
                this._page.off('requestfailed', this._onRequestFailed);
                this._page.off('requestfinished', this._onRequestFinished);
                this._callback();
            }
        }, this._timeout);
    }
    static waitForNetworkIdle(page, timeout) {
        return new Promise((resolve) => {
            new PuppeteerPendingRequests(page, timeout, resolve);
        });
    }
}
exports.PuppeteerPendingRequests = PuppeteerPendingRequests;
exports.waitForNetworkIdle = PuppeteerPendingRequests.waitForNetworkIdle.bind(null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1pZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9uZXR3b3JrLWlkbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBYSx3QkFBd0I7SUFPbkMsWUFBb0IsSUFBVSxFQUFFLE9BQWUsRUFBRSxRQUFvQjtRQU43RCxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQU96QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtRQUd6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRTVELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBR3pELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRU8sVUFBVSxDQUFDLE9BQW9CO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFvQjtRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM5QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDakI7SUFDSCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsT0FBb0I7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ2pCO0lBQ0gsQ0FBQztJQUVPLFNBQVM7UUFDZixJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtnQkFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTthQUNqQjtRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFVLEVBQUUsT0FBZTtRQUNuRCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3RELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBNURELDREQTREQztBQUVZLFFBQUEsa0JBQWtCLEdBQUcsd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBIn0=