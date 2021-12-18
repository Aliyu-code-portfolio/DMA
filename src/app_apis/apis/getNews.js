import { API_KEY } from './api';



export async function getNews(local) {
    if (local) {
        const url = `https://newsapi.org/v2/top-headlines?country=ng&apiKey=${API_KEY}`;
        let result = await fetch(url).then((response) => response.json()).catch((e) => console.log(e));
        return result.articles;
    }
    else {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
        let result = await fetch(url).then((response) => response.json()).catch((e) => console.log(e));
        return result.articles;
    }

}
export async function searchNews(key, date) {

    const url = `https://newsapi.org/v2/everything?q=${key}&from=${date}&sortBy=popularity&apiKey=${API_KEY}`;
    let result = await fetch(url).then((response) => response.json()).catch((e) => console.log(e));
    return result.articles;

}