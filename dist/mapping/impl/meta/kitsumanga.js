"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const _1 = __importDefault(require("."));
class KitsuManga extends _1.default {
    id = "kitsu";
    url = "https://kitsu.io";
    formats = ["MANGA" /* Format.MANGA */, "ONE_SHOT" /* Format.ONE_SHOT */, "NOVEL" /* Format.NOVEL */];
    kitsuApiUrl = "https://kitsu.io/api/edge";
    async search(query) {
        const results = [];
        const searchUrl = `/manga?filter[text]=${encodeURIComponent(query)}`;
        const req = await (0, axios_1.default)(this.kitsuApiUrl + searchUrl, {
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        }).catch((err) => {
            return null;
        });
        if (!req) {
            return results;
        }
        const data = req.data;
        if (data.data.length > 0) {
            data.data.forEach((result) => {
                const altTitles = [];
                if (result.attributes.titles.en_jp) {
                    altTitles.push(result.attributes.titles.en_jp);
                }
                if (result.attributes.titles.ja_jp) {
                    altTitles.push(result.attributes.titles.ja_jp);
                }
                if (result.attributes.titles.en_us) {
                    altTitles.push(result.attributes.titles.en_us);
                }
                if (result.attributes.titles.en) {
                    altTitles.push(result.attributes.titles.en);
                }
                if (result.attributes.titles.en_kr) {
                    altTitles.push(result.attributes.titles.en_kr);
                }
                if (result.attributes.titles.ko_kr) {
                    altTitles.push(result.attributes.titles.ko_kr);
                }
                if (result.attributes.titles.en_cn) {
                    altTitles.push(result.attributes.titles.en_cn);
                }
                if (result.attributes.titles.zh_cn) {
                    altTitles.push(result.attributes.titles.zh_cn);
                }
                results.push({
                    title: result.attributes.titles.en_us || result.attributes.titles.en_jp || result.attributes.titles.ja_jp || result.attributes.titles.en || result.attributes.titles.en_kr || result.attributes.titles.ko_kr || result.attributes.titles.en_cn || result.attributes.titles.zh_cn || result.attributes.canonicalTitle || result.attributes.slug,
                    altTitles: altTitles,
                    id: result.id,
                    img: result.attributes.posterImage.original,
                    year: result.attributes.startDate ? new Date(result.attributes.startDate).getFullYear() : 0,
                    providerId: this.id,
                });
            });
            return results;
        }
        else {
            return results;
        }
    }
}
exports.default = KitsuManga;
