import AnimeProvider, { SubType } from ".";
import { Format, Result } from "../..";
export default class AnimePahe extends AnimeProvider {
    id: string;
    url: string;
    formats: Format[];
    get subTypes(): SubType[];
    search(query: string): Promise<Result[] | undefined>;
}
