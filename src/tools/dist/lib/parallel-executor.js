"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelExecutor = void 0;
class ParallelExecutor {
    constructor(concurrency) {
        this.index = 0;
        this.results = [];
        this.promises = new Array(concurrency);
        for (let i = 0; i < concurrency; i++)
            this.promises[i] = Promise.resolve();
    }
    get parallelism() {
        return this.promises.length;
    }
    enqueue(task) {
        let resolve;
        let reject;
        this.results.push(new Promise((resolver, rejector) => {
            resolve = resolver;
            reject = rejector;
        }));
        this.index = (this.index + 1) % this.promises.length;
        this.promises[this.index] = this.promises[this.index].then(() => {
            return Promise.resolve().then(() => task()).then(resolve, reject);
        });
    }
    await() {
        return Promise.all(this.results.splice(0));
    }
}
exports.ParallelExecutor = ParallelExecutor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWxsZWwtZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3BhcmFsbGVsLWV4ZWN1dG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsZ0JBQWdCO0lBTTNCLFlBQVksV0FBbUI7UUFKdkIsVUFBSyxHQUFXLENBQUMsQ0FBQTtRQUVqQixZQUFPLEdBQWlCLEVBQUUsQ0FBQTtRQUdoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFnQixXQUFXLENBQUMsQ0FBQTtRQUNyRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRztZQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzdFLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQzdCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBMEI7UUFDaEMsSUFBSSxPQUE0QixDQUFBO1FBQ2hDLElBQUksTUFBNEIsQ0FBQTtRQUVoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUN0RCxPQUFPLEdBQUcsUUFBUSxDQUFBO1lBQ2xCLE1BQU0sR0FBRyxRQUFRLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVILElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDOUQsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNuRSxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsQ0FBQztDQUNGO0FBakNELDRDQWlDQyJ9