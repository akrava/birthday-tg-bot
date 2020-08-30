import cheerio from "cheerio";
import got from "got";

export async function greetings(name: string, yearOld: number) {
    return `Happy birthday, dear ${name}!\n`
        + `Wishing you many happiness for the coming years ahead.\n`
        + `Congratulations on your ${yearOld}th birthday. `
        + (yearOld == 20 ? "Oh no, so old..." : "")
        + (await getRandomText())
    ;
}

// Author: https://github.com/kostiantynlelikov
const baseURL = 'http://pozd.org/dr';
const getRandomNumber = (num: number) => Math.floor(Math.random() * num) + 1  

async function getRandomText() {
    try {
        const response = await got(baseURL, { timeout: 1000 });
        const $ = cheerio.load(response.body);
        const length = $('.pz>.content').length;
        const randomNumber = getRandomNumber(length);
        return "\n\n" + $('.pz>.content').slice(randomNumber, randomNumber + 1).text()
    } catch (e) {
        return "";
    }
   
}

// getRandomText().then((data) => {console.log(data)});