const RSS_URL = "https://svo.agracingfoundation.org/external/assets/naocast.rss";
let initialListFlashInterval = null;

//absolute piss, good luck bonk - ChaCheeseMonger
function renderFeedItems(rss, id) {
    console.log(rss);

    const list = document.getElementById("news_list");
    list.innerHTML = "";

    const template_news = document.getElementById("news-panel-template");

    const items = rss[0].items;
    let realId = items.length-id;

    items.forEach((item, index) => {
        const clone = template_news.content.cloneNode(true);
        const panel = clone.querySelector(".panel");

        //write article name
        const nameEl = clone.querySelector(".news-name");
        nameEl.textContent = item.title;
        nameEl.href = item.link;

        //highlight selected article
        const indicator = clone.querySelector(".selection");
        if(index == realId) {
            indicator.classList.replace("hidden", "block");
            nameEl.classList.replace("text-agrf-statement", "text-agrf-strike")
        }

        list.appendChild(clone);
        if (index < items.length - 1) list.insertAdjacentHTML("beforeend", '<hr class="border-t-3 border-nc-light-grey">');
    });

    list.scrollTo(0, localStorage.getItem("scrollPos"));
}

function renderArticle(rss, id) {
    const items = rss[0].items;
    let realId = items.length-id;

    //hide news picker and show news reader
    document.getElementById("news_picker").classList.add("hidden");
    document.getElementById("news_viewer").classList.replace("hidden", "block");

    const list = document.getElementById("news_article");
    list.innerHTML = "";

    const template_article = document.getElementById("news-article-template");

    const clone = template_article.content.cloneNode(true);

    //write <content:encoded> contents as html
    const nameEl = clone.querySelector(".content");
    nameEl.innerHTML = items[realId].content;

    list.appendChild(clone);

    if(list.innerText.includes("16th of June, 2025")) {
        list.innerHTML = list.innerHTML.replaceAll("ThatOneBonk", "ThatOneBonk [AGRF]");
    }
}

function fetchRssFeed() {
    fetch(RSS_URL)
        .then(response => !response.ok ? Promise.reject("API error") : response.text())
        .then(rss => {
            const urlParams = new URLSearchParams(window.location.search);
            var articleId = parseInt(urlParams.get("id"));

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

            renderFeedItems(data, articleId);
            if(articleId > 0) {
                renderArticle(data, articleId);
            }
        })
        .catch(err => {
            console.error("API fetch failed:", err);
        });
}

news_list.addEventListener("scroll", (event) => {
    localStorage.setItem("scrollPos", news_list.scrollTop);
})


fetchRssFeed();

const flashTargetsRetrieve = document.getElementsByClassName("initial-text");
let visible = true;

if (initialListFlashInterval) clearInterval(initialListFlashInterval);
    initialListFlashInterval = setInterval(() => {
    for (let el of flashTargetsRetrieve) {
        el.style.opacity = visible ? '0' : '1';
    }
    visible = !visible;
}, 250);