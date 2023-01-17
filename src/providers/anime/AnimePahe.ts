import * as colors from "colors";
import { config } from "../../config";
import Anime, { SearchResponse } from "./Anime";

export default class AnimePahe extends Anime {
    constructor() {
        super("https://animepahe.com", "AnimePahe");
    }

    public async search(query:string): Promise<Array<SearchResponse>> {
        const req = await this.fetch(`${this.baseUrl}/api?m=search&q=${encodeURIComponent(query)}`);
        const data = req.json();

        if (!data.data) {
            if (config.crawling.debug) {
                console.log(colors.cyan("[CrunchyRoll]") + colors.red("Unable to parse data for " + query + "."));
            }
            return [];
        }
        return data.data.map((item:Result) => ({
            id: item.session,
            title: item.title,
            img: item.poster,
            url: `${this.baseUrl}/anime/${item.session}`
        }));
    }
}

interface Result {
    id: number;
    title: string;
    type: string;
    episodes: number;
    status: string;
    season: string;
    year: number;
    score: number;
    poster: string;
    session: string;
}