const videos = [
    {
        id: "sgXiffBN034",
        title: "PTC_RTK-Provincial Training Center director",
        sub: "YouTube · Featured",
    },
    {
        id: "8cbHtZ2bbP4",
        title: "PTC_RTK-Success Student",
        sub: "YouTube · Popular"
    },
    {
        id: "Frj52mFEv5c",
        title: "PTC_RTK-Promote disability girl to get training",
        sub: "YouTube · Music"
    },
    {
        id: "Sm2IDpwcsfs",
        title: "Video Title 4",
        sub: "YouTube · Trending",
    },
    {
        id: "6BncrXJJ9iA",
        title: "Video Title 5",
        sub: "YouTube · Viral"
    },
];

const mainWrap = document.getElementById("main-wrap");
const mainPlayer = document.getElementById("main-player");
const mainThumb = document.getElementById("main-thumb");
const mainTitle = document.getElementById("main-title");
const mainSub = document.getElementById("main-sub");
const watchLink = document.getElementById("watch-link");

let currentIndex = 0;

function loadVideo(index) {
    currentIndex = index;
    const v = videos[index];
    mainWrap.classList.remove("playing");
    mainPlayer.src = "";
    mainThumb.src = `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`;
    mainThumb.onerror = () => {
        mainThumb.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
    };
    mainTitle.textContent = v.title;
    mainSub.textContent = v.sub;
    watchLink.href = `https://www.youtube.com/watch?v=${v.id}`;
    document.querySelectorAll(".yt-item").forEach((el, i) => {
        el.classList.toggle("active", i === index);
    });
}

function playVideo() {
    const v = videos[currentIndex];
    mainPlayer.src = `https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&rel=0`;
    mainWrap.classList.add("playing");
}

mainWrap.addEventListener("click", (e) => {
    if (e.target.closest(".watch-link")) return;
    if (!mainWrap.classList.contains("playing")) playVideo();
});

const sidebar = document.getElementById("sidebar");
videos.forEach((v, i) => {
    const item = document.createElement("div");
    item.className = "yt-item" + (i === 0 ? " active" : "");
    item.innerHTML = `
          <div class="yt-thumb">
            <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${v.title}" />
          </div>
          <div class="yt-item-meta">
            <h3>${v.title}</h3>
            <p>${v.sub}</p>
          </div>
        `;
    item.addEventListener("click", () => loadVideo(i));
    sidebar.appendChild(item);
});

// Auto play on page load (muted to allow autoplay in browsers)
loadVideo(0);
playVideo();