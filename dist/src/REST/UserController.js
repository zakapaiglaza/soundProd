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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserParser_1 = require("../Modules/UserParser");
class UserController {
    static getUsersSupAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumUrl = req.body.albumUrl;
            try {
                const users = yield UserParser_1.UserParser.getUsersSupAlbum(albumUrl);
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
