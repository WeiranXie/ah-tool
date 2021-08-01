"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.juitWebpackReportPlugin = exports.JuitWebpackReportPlugin = void 0;
const box_1 = require("./lib/box");
const colors_1 = require("./lib/colors");
function errorMessage(error) {
    let message = (error.stack && (error.hideStack === false)) ?
        error.message + error.stack : error.message;
    if (error.file) {
        message += `\n${colors_1.K}at ${colors_1.W}${colors_1.U}${error.file}${colors_1.X}`;
        if (error.loc) {
            const loc = error.loc;
            if (loc.start) {
                message += ` ${colors_1.K}(line=${loc.start.line}`;
                if (loc.start.column)
                    message += `,col=${loc.start.column}`;
                if (loc.end) {
                    message += ` \u2192 line=${loc.end.line}`;
                    if (loc.end.column)
                        message += `,col=${loc.end.column}`;
                }
            }
            message += `)${colors_1.X}`;
        }
    }
    return message;
}
class JuitWebpackReportPlugin {
    constructor() {
    }
    apply(compiler) {
        compiler.hooks.done.tapPromise('JuitWebpackReportPlugin', async (stats) => {
            const args = [];
            if (stats.hasWarnings()) {
                args.push(`Found ${colors_1.Y}${stats.compilation.warnings.length}${colors_1.X} warnings`);
                args.push(...stats.compilation.warnings.map(errorMessage));
            }
            if (stats.hasErrors()) {
                args.push(`Found ${colors_1.Y}${stats.compilation.errors.length}${colors_1.X} errors`);
                args.push(...stats.compilation.errors.map(errorMessage));
                args.push(`Compilation ${colors_1.R}failed${colors_1.X}!`);
            }
            else if (stats.hasWarnings()) {
                args.push(`Compilation ${colors_1.Y}has warnings${colors_1.X}!`);
            }
            else {
                args.push(`Compilation ${colors_1.G}succesful${colors_1.X}!`);
            }
            if (args.length) {
                console.log();
                await box_1.box(...args);
            }
        });
    }
}
exports.JuitWebpackReportPlugin = JuitWebpackReportPlugin;
exports.juitWebpackReportPlugin = new JuitWebpackReportPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1yZXBvcnRlci1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2VicGFjay1yZXBvcnRlci1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQStCO0FBRS9CLHlDQUFrRDtBQUVsRCxTQUFTLFlBQVksQ0FBQyxLQUFtQjtJQUN2QyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUE7SUFDL0MsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1FBQ2QsT0FBTyxJQUFJLEtBQUssVUFBQyxNQUFNLFVBQUMsR0FBRyxVQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFDLEVBQUUsQ0FBQTtRQUMvQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBVSxDQUFBO1lBQzVCLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDYixPQUFPLElBQUksSUFBSSxVQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDekMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU07b0JBQUUsT0FBTyxJQUFJLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFFM0QsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNYLE9BQU8sSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtvQkFDekMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU07d0JBQUUsT0FBTyxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtpQkFDeEQ7YUFDRjtZQUNELE9BQU8sSUFBSSxJQUFJLFVBQUMsRUFBRSxDQUFBO1NBQ25CO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNoQixDQUFDO0FBR0QsTUFBYSx1QkFBdUI7SUFDbEM7SUFFQSxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWtCO1FBQ3RCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFeEUsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFBO1lBRXpCLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsVUFBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxVQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7YUFDM0Q7WUFFRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLFVBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxTQUFTLENBQUMsQ0FBQTtnQkFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO2dCQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsVUFBQyxTQUFTLFVBQUMsR0FBRyxDQUFDLENBQUE7YUFDekM7aUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxVQUFDLGVBQWUsVUFBQyxHQUFHLENBQUMsQ0FBQTthQUMvQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsVUFBQyxZQUFZLFVBQUMsR0FBRyxDQUFDLENBQUE7YUFDNUM7WUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBRWYsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUNiLE1BQU0sU0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7YUFDbkI7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQWhDRCwwREFnQ0M7QUFHWSxRQUFBLHVCQUF1QixHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQSJ9