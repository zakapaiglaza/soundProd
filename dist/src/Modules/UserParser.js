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
exports.UserParser = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class UserParser {
    static getUsersSupAlbum(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(url)
                .then(res => {
                const html = res.data;
                const $ = cheerio_1.default.load(html);
                const supBox = $('#pgBd > div.trackView.leftMiddleColumns.has-art > div.middleColumn > div.collected-by.tralbum.collectors > div.deets.populated > div.no-writing');
                const supporters = [];
                supBox.find('a').each((index, element) => {
                    if (index < 10) {
                        const support = $(element).attr('href');
                        if (support !== undefined) {
                            const firstSplit = support.split("/");
                            const finalName = firstSplit.pop().split("?")[0];
                            supporters.push(support);
                            console.log('поддержавшие альбом :>> ', finalName);
                        }
                    }
                    else {
                        return false;
                    }
                });
                return supporters;
            })
                .catch(error => {
                throw error;
            });
        });
    }
}
exports.UserParser = UserParser;
