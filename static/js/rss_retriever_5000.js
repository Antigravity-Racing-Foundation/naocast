const RSS_URL = "https://svo.agracingfoundation.org/external/assets/naocast.rss";

//absolute piss, good luck bonk - ChaCheeseMonger
function renderFeedItems(rss) {
    console.log(rss);

    const list = document.getElementById("news_list");
    list.innerHTML = "";

    const template_news = document.getElementById("news-panel-template");

    rss[0].items.forEach((item, index) => {
        const clone = template_news.content.cloneNode(true);
        const panel = clone.querySelector(".panel");
        if (index % 2 === 0) panel.classList.add("bg-white");

        const nameEl = clone.querySelector(".news-name");
        nameEl.innerHTML = item.content;

        clone.querySelector(".description").textContent = item.desc;

        list.appendChild(clone);
    });
}

function fetchRssFeed() {
    fetch(RSS_URL)
        .then(response => !response.ok ? Promise.reject("API error") : response.text())
        .then(rss => {
            const rssParsed = new DOMParser().parseFromString(rss, 'application/xml');
            const data = Array.from(rssParsed.getElementsByTagName("channel"))
            .map(el => ({
                title: el.getElementsByTagName("title")[0].textContent,
                link: el.getElementsByTagName("link")[0].textContent,
                description: el.getElementsByTagName("description")[0].textContent,
                copyright: el.getElementsByTagName("copyright")[0]?.textContent,
                image: Array.from(el.getElementsByTagName("image"))
                .map(el => ({
                    url: el.getElementsByTagName("url")[0].textContent,
                    title: el.getElementsByTagName("title")[0].textContent,
                    link: el.getElementsByTagName("link")[0].textContent
                })),
                items: Array.from(rssParsed.getElementsByTagName("item"))
                .map(el => ({
                    title: el.getElementsByTagName("title")[0].textContent,
                    link: el.getElementsByTagName("link")[0].textContent,
                    description: el.getElementsByTagName("description")[0]?.textContent,
                    pubDate: el.getElementsByTagName("pubDate")[0]?.textContent,
                    author: el.getElementsByTagName("author")[0]?.textContent,
                    content: el.getElementsByTagName("content:encoded")[0].textContent
                }))
            }));

            renderFeedItems(data);
        })
        .catch(err => {
            console.error("API fetch failed:", err);
        });
}

fetchRssFeed();