import axios from 'axios';
import cheerio from 'cheerio';

export class UserParser {
    static async getUsersSupAlbum(url: string): Promise<string[]> {
        return await axios.get(url)
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);

                const supBox = $('#pgBd > div.trackView.leftMiddleColumns.has-art > div.middleColumn > div.collected-by.tralbum.collectors > div.deets.populated > div.no-writing');
                const supporters: string[] = [];

                supBox.find('a').each((index, element) => {
                    if (index < 10) {
                        const support = $(element).attr('href');
                        if (support !== undefined) {
                            const firstSplit: string[] = support.split("/");
                            const finalName: string = firstSplit.pop()!.split("?")[0];
                            supporters.push(support);
                            console.log('поддержавшие альбом :>> ', finalName);
                        }
                    } else {
                        return false;
                    }
                });

                return supporters;
            })
            .catch(error => {
                throw error;
            });
    }
}
