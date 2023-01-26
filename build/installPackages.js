"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const ora_1 = __importDefault(require("ora"));
// promisify convert sync function to async function
const util_1 = require("util");
function installPackages(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const execP = (0, util_1.promisify)(child_process_1.exec);
        const spinner = (0, ora_1.default)('Installing packages...').start();
        try {
            const { stdout: stdout1, stderr: stderr1 } = yield execP(`cd ${dir} && yarn`);
            spinner.succeed();
            console.log(stdout1);
            console.error(stderr1);
            spinner.start('Starting dev server...');
            setTimeout(() => {
                spinner.succeed();
            }, 500);
            const server = (0, child_process_1.exec)(`cd ${dir} && yarn dev && pause`);
            server.stdout.on('data', (data) => process.stdout.write(data));
            server.stderr.on('data', (data) => process.stdout.write(data));
            server.on('close', (code) => {
                spinner.succeed();
            });
        }
        catch (err) {
            spinner.fail();
            console.error(err);
        }
    });
}
exports.default = installPackages;
