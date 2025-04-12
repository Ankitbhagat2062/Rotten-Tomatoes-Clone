function showMoreCards() {
    const MoviesContainer = document.querySelector('.Movies-Container');
    const moviesLists = document.querySelectorAll('.Movies-List');
    let hasRemainingCards = false;

    moviesLists.forEach(list => {
        const hiddenCards = Array.from(list.querySelectorAll('.hidden-cards[style="display: none;"]'));
        hiddenCards.slice(0, 3).forEach(card => {
            card.style.display = 'block';
        });
        if (hiddenCards.length > 3) {
            hasRemainingCards = true;
        }
    });
    MoviesContainer.querySelector('.fa-chevron-down').style.display = hasRemainingCards ? 'block' : 'none';
    MoviesContainer.querySelector('#show-less-btn').classList.remove('hidden');
}
function showLessCards() {
    const MoviesContainer = document.querySelector('.Movies-Container');
    const moviesLists = document.querySelectorAll('.Movies-List');
    let hasRemainingVisibleCards = false;

    moviesLists.forEach(list => {
        const visibleCards = Array.from(list.querySelectorAll('.hidden-cards[style="display: block;"]'));
        visibleCards.slice(-3).forEach(card => {
            card.style.display = 'none';
        });
        const remainingVisible = Array.from(list.querySelectorAll('.hidden-cards[style="display: block;"]'));
        if (remainingVisible.length > 0) {
            hasRemainingVisibleCards = true;
        }
    });
    MoviesContainer.querySelector('.fa-chevron-down').style.display = 'block';
    if (!hasRemainingVisibleCards) {
        MoviesContainer.querySelector('#show-less-btn').classList.add('hidden');
    }
}
function showMoreEpisode() {
    const moviesLists = document.querySelector('.episode-content');
    let hasRemainingCards = false;

    moviesLists.forEach(list => {
        const hiddenCards = Array.from(list.querySelectorAll('.hidden-cards[style="display: none;"]'));
        hiddenCards.slice(0, 3).forEach(card => {
            card.style.display = 'block';
        });
        if (hiddenCards.length > 3) {
            hasRemainingCards = true;
        } 
    });
    moviesLists.querySelector('.showMoreEpisode-down').style.display = hasRemainingCards ? 'block' : 'none';
    moviesLists.querySelector('#show-less-Episode').classList.remove('hidden');
}
function showLessEpisode() {
    const moviesLists = document.querySelector('.episode-content');
    let hasRemainingVisibleCards = false;

    moviesLists.forEach(list => {
        const visibleCards = Array.from(list.querySelectorAll('.hidden-cards[style="display: block;"]'));
        visibleCards.slice(-3).forEach(card => {
            card.style.display = 'none';
        });
        const remainingVisible = Array.from(list.querySelectorAll('.hidden-cards[style="display: block;"]'));
        if (remainingVisible.length > 0) {
            hasRemainingVisibleCards = true;
        }
    });
    moviesLists.querySelector('.showMoreEpisode-down').style.display = 'block';
    if (!hasRemainingVisibleCards) {
        moviesLists.querySelector('#show-less-Episode').classList.add('hidden');
    }
}





// function showMoreEpisode() {
//     const EpisodesList = document.querySelectorAll('.episode-content');
//     let hasRemaininghiddenCards = false;
//     EpisodesList.forEach(list => {
//         const hiddenCards = Array.from(list.querySelectorAll('.hidden-cards'));
//         hiddenCards.slice(0, 3).forEach(card => {
//             if (card.style.display = 'none') {
//                 card.style.display = 'flex';
//             }
//             else {
//                 card.style.display = 'flex';
//             }
//         });
//         if (hiddenCards.length > 3) {
//             hasRemaininghiddenCards = true;
//         }
//         list.querySelector('.showMoreEpisode-down').style.display = hasRemaininghiddenCards ? 'block' : 'none';
//         list.querySelector('#show-less-Episode').classList.remove('hidden')
//     });
// }
// function showLessEpisode() {
//     const EpisodesList = document.querySelectorAll('.episode-content');
//     let hasRemainingVisibleCards = false;
//     EpisodesList.forEach(list => {
//         const visibleCards = Array.from(list.querySelectorAll('.hidden-cards[style="display: flex;"]'));
//         visibleCards.slice(-3).forEach(card => {
//             card.style.display = 'none';
//         });
//         const remainingVisible = Array.from(list.querySelectorAll('.hidden-cards[style="display: flex;"]'));
//         if (remainingVisible.length > 0) {
//             hasRemainingVisibleCards = true;
//         }
//         list.querySelector('.showMoreEpisode-down').style.display = 'block';
//         if (!hasRemainingVisibleCards) {
//             list.querySelector('#show-less-Episode').classList.add('hidden')
//         }
//     });
// }
async function handlePlayButtonClick(videoUrl) {
    const videoModal = document.querySelector('.video-modal');
    const youtubePlayer = videoModal.querySelector('#youtube-player');
    const videoSource = videoModal.querySelector('#video-source');
    const videoPlayer = videoModal.querySelector('#video-player');
    const audioPlayer = videoModal.querySelector("#audio-player");
    const audioSource = videoModal.querySelector("#audio-source");
    const loadingScreen = videoModal.querySelector('#loading-screen');
    videoModal.classList.add('active');

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        const videoId = extractYouTubeID(videoUrl);
        if (player) {
            player.loadVideoById(videoId);
        } else {
            createYouTubePlayer(videoId);
        }
    }
    else if (videoUrl.includes("https://raw.githubusercontent.com")) {
        console.log("GitHub raw video detected. Showing loading screen...");
        const addItem = async (item) => {
            await randomDelay();
            let div = document.createElement("div");
            div.innerHTML = item;
            document.body.append(div)
        }

        const randomDelay = () => {
            return new Promise((resolve, reject) => {
                timeout = 1 + 6 * Math.random();
                setTimeout(() => {
                    resolve()
                }, timeout * 1000);
            })
        }

        // async function main() {
        let load = setInterval(() => {
            let last = loadingScreen.getElementsByTagName("div");
            last = last[last.length - 1]
            if (last.innerHTML.endsWith("...")) {
                last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3)
            }
            else {

                last.innerHTML = last.innerHTML + "."
            }

        }, 100);
        let text = [""]
        for (const item of text) {
            await addItem(item)
        }

        await randomDelay()

        loadingScreen.style.display = "flex";
        videoPlayer.style.display = "block";

        videoPlayer.load();
        videoSource.src = videoUrl;

        const fileSize = await getFileSize(videoUrl);
        console.log(`Video File Size: ${fileSize} MB`);

        const hasAudio = await checkIfVideoHasAudio(videoUrl);
        console.log("Final Has Audio Check:", hasAudio);

        videoPlayer.addEventListener("waiting", () => {
            console.log("Video is buffering...");
            loadingScreen.style.display = "flex";
        });

        videoPlayer.addEventListener("playing", () => {
            console.log("Video started playing. Hiding loading screen...");
            loadingScreen.style.display = "none";
            clearInterval(load)
        });

        if (fileSize > 25 && !hasAudio) {
            console.log("Adding external audio.");
            audioPlayer.load();
            audioSource.src = audioUrl;
        }
        else {
            console.log("Video has built-in audio.");
            audioSource.src = "";
            audioPlayer.style.display = "none";
        }
        videoPlayer.muted = true;
        videoPlayer.play()
            .then(() => {
                console.log("Video autoplayed successfully.");
                videoPlayer.muted = false;
                if (fileSize > 25 || !hasAudio) {
                    return audioPlayer.play();
                }
            })
            .catch(error => console.error("Autoplay failed:", error));

        videoPlayer.addEventListener("timeupdate", () => {
            if ((fileSize > 25 || !hasAudio) && Math.abs(videoPlayer.currentTime - audioPlayer.currentTime) > 0.1) {
                audioPlayer.currentTime = videoPlayer.currentTime;
            }
        });

        videoPlayer.addEventListener("play", () => (fileSize > 25 && !hasAudio) && audioPlayer.play());
        videoPlayer.addEventListener("pause", () => (fileSize > 25 && !hasAudio) && audioPlayer.pause());
    }
    else {
        youtubePlayer.innerHTML = `<iframe src="${videoUrl}" sandbox="allow-same-origin allow-scripts" width="640" height="360" frameborder="0" allowfullscreen></iframe>`;
    }
}

let currentSlide = 0;


const main = async () => {
    try {
        const [favouriteMovies, nowInTheaters, latestInStreaming, tvShows, allTimeFavorites] = await Promise.all([
            getMoviesByCategory("Frightful-Favorites"),
            getMoviesByCategory("Now-In-Theaters"),
            getMoviesByCategory("Latest-In-Streaming"),
            getMoviesByCategory("Tv-Shows"),
            getMoviesByCategory("All-Time-Favorites")
        ]);

        const movieData = await fetch("https://raw.githubusercontent.com/Ankitbhagat2062/Rotten-Tomatoes-Clone/main/movie.json").then(res => res.json());
        const categories = Object.keys(movieData);
        renderMovieSections(categories, movieData)
        renderSlides(categories, movieData);
        startSlideShow(categories, movieData);

        updateSection("Frightful-Favorites", favouriteMovies);
        updateSection("Now-In-Theaters", nowInTheaters);
        updateSection("Tv-Shows", tvShows);
        updateSection("Latest-In-Streaming", latestInStreaming);
        updateSection("All-Time-Favorites", allTimeFavorites);

        loadYouTubeAPI();
        window.onYouTubeIframeAPIReady = initializeVideoModal;
        initializeVideoModal();
        setupSearchFeature();
    } catch (error) {
        console.error("Error in main function:", error);
    }
};

const renderMovieSections = (categories, data) => {
    const movieAlbumContainer = document.querySelector("#movies .movie-section");
    movieAlbumContainer.innerHTML = categories.map(category => createMovieAlbumHTML(category, data[category])).join("");
};

const renderSlides = (categories, data) => {
    const slideContainer = document.querySelector("#Slide .Slide-container");
    slideContainer.innerHTML = categories.map(category => createSlideHTML(category, data[category])).join("");
};

const createSlideHTML = (category, videos) => {
    if (!videos || videos.length === 0) return "";

    const video = videos[0];
    return `
<div class="slide" style="background-image: url('${video.image.image1}');">
<div class="overlay">
<h2>${video.name}</h2>
<p>${video.description.desc1}</p>
</div>
</div>`;
};

const startSlideShow = (categories, data) => {
    let currentCategoryIndex = Math.floor(Math.random() * categories.length)
    const categoryName = categories[currentCategoryIndex];
    const movies = data[categoryName];
    let currentMovieIndex = Math.floor(Math.random() * movies.length), currentImageIndex = 1;

    if (!movies || movies.length === 0) return;
    const movie = movies[currentMovieIndex];
    const imageKeys = Object.keys(movie.image);
    setInterval(() => {
        if (currentImageIndex > imageKeys.length) {
            currentImageIndex = 1;
        }
        updateSlide(movie, currentImageIndex);
        currentImageIndex++;
    }, 800);
    const Slide = document.querySelector("#Slide");
    let dots = document.createElement('div')
    dots.classList.add('dots')
    Slide.appendChild(dots)
    for (let d = 0; d < imageKeys.length; d++) {
        let dot = document.createElement('div')
        dot.classList.add('dot')
        dots.appendChild(dot)
    }
};

const observer = new MutationObserver(() => {
    const dots = document.querySelectorAll(".dot");
    if (dots.length > 0) {
        observer.disconnect();
        startSlideAnimation(dots);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

function startSlideAnimation(dots) {
    let currentIndex = 0;
    setInterval(() => {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
        currentIndex = (currentIndex + 1) % dots.length;
    }, 800);
}

const updateSlide = (movie, imageIndex) => {
    const slideElement = document.querySelector(".slide");
    if (!slideElement) return;
    slideElement.classList.add("active")
    slideElement.style.backgroundImage = `url('${movie.image[`image${imageIndex}`]}')`;
    slideElement.querySelector(".overlay").innerHTML = `<h2>${movie.name}</h2><p>${movie.description[`desc${imageIndex}`]}</p> `;
};

const updateSection = (id, movies) => {
    const section = document.getElementById(id);
    if (!section) {
        console.error(`Error: Section #${id} not found.`);
        return;
    }
    const container = section.querySelector(".section-content");
    if (!container) {
        console.error(`Error: .section-content in #${id} not found.`);
        return;
    }

    container.innerHTML = movies.map(movie => createCardHTML(movie)).join("");
    const movieCards = Array.from(container.querySelectorAll('.movie-card'));

    if (movieCards.length === 0) {
        console.error(`Error: No movie cards found in section #${id}`);
        return;
    }

    let currentIndex = 0;
    setInterval(() => {
        movieCards.forEach((card, index) => {
            const itemIndex = (currentIndex + index) % movies.length;
            const item = movies[itemIndex];

            const imgElement = card.querySelector('img');
            if (imgElement) {
                imgElement.src = item.img;
                imgElement.alt = item.name;
            }
            card.setAttribute('data-video', item.video);
            card.setAttribute('data-audio', item.audio);

            const titleElement = card.querySelector('p');
            if (titleElement) {
                titleElement.textContent = item.name;
            }

            const movieInfoElement = card.querySelector('.movie-info');
            if (movieInfoElement) {
                movieInfoElement.innerHTML = `
                    <p class="rating">${item.rating}</p>
                    <p class="title">${item.name}</p>
                    <button class="watchlist-btn">
                        +WATCHLIST
                    </button>
                    `;
            }
        });
        currentIndex = (currentIndex + 1) % movies.length;
    }, 3000);
};

let player;

function extractYouTubeID(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([^#&?]*))/);
    return match ? match[1] : null;
}

function createYouTubePlayer(videoId) {
    player = new YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: videoId,
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 0,
            rel: 0,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            playsinline: 1,
            cc_load_policy: 0,
            mute: 0,
            loop: 0,
            playlist: videoId,
            start: 0,
            color: "red",
            hl: "en",
            origin: window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('video is playing');
    }
}

function stopYouTubePlayer() {
    const youtubePlayerDiv = document.getElementById("youtube-player");
    youtubePlayerDiv.innerHTML = "";
}

const initializeVideoModal = () => {
    const videoModal = document.createElement("div");
    videoModal.classList.add("video-modal");
    videoModal.innerHTML = `<div class="video-container">
            <div style="color: white;height: 100vh;;display:none;align-items: center;justify-content: center;" id="loading-screen"> 
                <div>Loading video...</div>
            </div>
            <div class="youtube-player">
                <div id="youtube-player"></div>
            </div>
            <video id="video-player" controls autoplay muted crossorigin="anonymous" style="display: none;">
                <source id="video-source" src="" type="video/mp4">
            </video>
            <audio id="audio-player" controls style="display: none;">
                <source id="audio-source" src="" type="audio/mp3">
            </audio>
            <span class="close-modal">&times;</span>
        </div>`;
    document.body.appendChild(videoModal);

    const videoPlayer = videoModal.querySelector("#video-player");
    const videoSource = videoModal.querySelector("#video-source");
    const audioPlayer = videoModal.querySelector("#audio-player");
    const audioSource = videoModal.querySelector("#audio-source");
    const loadingScreen = videoModal.querySelector("#loading-screen");
    const playlist = document.getElementById('playlist')
    const youtubePlayer = videoModal.querySelector("#youtube-player");

    document.querySelectorAll(".movie-card").forEach(card => {
        const movieInfoElement = card.querySelector('.movie-info');
        card.addEventListener('click', async (e) => {
            setUpCloneCard(card)
        });
    });

    playlist.addEventListener("click", (e) => {
        if (e.target === playlist || e.target.classList.contains("close-modal")) {
            document.querySelector('.playlist-section').innerHTML = ""
            document.body.style.overflow = "auto"
            playlist.querySelector('.close-modal').classList.add('hidden')
        }
    });
};

const getFileSize = async (url) => {
    try {
        const response = await fetch(url, { method: "HEAD" });
        const size = response.headers.get("content-length");
        return size ? (size / (1024 * 1024)).toFixed(2) : 0;
    } catch (error) {
        console.error("Failed to get file size:", error);
        return 0;
    }
};

const checkIfVideoHasAudio = async (url) => {
    return new Promise((resolve) => {
        const testVideo = document.createElement("video");
        testVideo.src = url;
        testVideo.muted = true;

        testVideo.addEventListener("canplaythrough", () => {
            console.log("Checking if video has audio...");
            const hasAudio =
                testVideo.webkitAudioDecodedByteCount > 0 ||
                (testVideo.audioTracks && testVideo.audioTracks.length > 0);

            console.log("Has Audio Detected:", hasAudio);
            resolve(hasAudio);
        });

        testVideo.addEventListener("error", () => {
            console.warn("Error loading video. Assuming no audio.");
            resolve(false);
        });

        testVideo.play().catch(() => { });
    });
};

function loadYouTubeAPI() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
const setupSearchFeature = () => {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        searchResults.style.display = searchTerm ? "grid" : "none";
        searchResults.innerHTML = "";

        document.querySelectorAll(".movie-card").forEach(card => {
            if (card.querySelector(".title").textContent.toLowerCase().includes(searchTerm)) {
                const clonedCard = card.cloneNode(true);
                searchResults.appendChild(clonedCard);

                clonedCard.addEventListener('click', (e) => {
                    setUpCloneCard(clonedCard)
                })
                const playlist = document.getElementById('playlist')
                playlist.addEventListener("click", (e) => {
                    if (e.target === playlist || e.target.classList.contains("close-modal")) {
                        document.querySelector('.playlist-section').innerHTML = ""
                        document.body.style.overflow = "auto"
                        playlist.querySelector('.close-modal').classList.add('hidden')
                    }
                });
            }
        });
    });
};

const setUpCloneCard = async (clonedCard) => {
    const movieInfoElement = clonedCard.querySelector('.movie-info');
    const movieName = movieInfoElement.querySelector('.title').textContent
    const videoModal = document.querySelector(".video-modal");
    const youtubePlayer = videoModal.querySelector("#youtube-player");
    const videoPlayer = videoModal.querySelector("#video-player");
    const videoSource = videoModal.querySelector("#video-source");
    const audioPlayer = videoModal.querySelector("#audio-player");
    const audioSource = videoModal.querySelector("#audio-source");
    const loadingScreen = videoModal.querySelector("#loading-screen");
    let Data = await fetch('https://raw.githubusercontent.com/Ankitbhagat2062/Rotten-Tomatoes-Clone/main/movie.json').then(res => res.json())
    clonedCard.style.display = "none";
    let movieData = null;
    for (const category in Data) {
        movieData = Data[category].find(item => item.name === movieName);
        if (movieData) break;
    }

    const createEpisodeHTML = (episode, index) => {
        const hiddenClass = index >= 3 ? 'hidden-cards' : 'flex';
        const style = index >= 3 ? "display: none" : "";
        return `
                <div class="episode-card items-start space-x-4 my-4 ${hiddenClass}"style="${style}"data-video="${episode.video}">
                    <div class="flex items-center space-x-4">
                        <img style="max-width: 100%;width: 300px; height: 100px;aspect-ratio: 3 / 1;" src="${episode.img}" alt="Episode thumbnail" class="object-cover object-center">

                    </div>    
                    <div>
                        <h3 class="text-lg font-bold">${episode.name}</h3>
                        <p class="text-gray-400">${episode.description}</p>
                        <p class="text-gray-400">52m</p>
                        <div id="episode-3" class="episode-video w-full h-64 mt-2"></div>
                    </div>
                </div>`
    };

    const getMatchScore = (movie) => {
        if (!movie.genre) return 0; // Handle undefined genre
        let genreArray = (movieData.genre).split(/[\s,]+/).map(g => g.trim());
        let currentMovieArray = (movie.genre.split(/[\s,]+/).map(c => c.trim()))

        let matches = new Set();

        if (genreArray.includes("MCU") && genreArray.includes("Movies")) {
            currentMovieArray.forEach(c => {
                if (c.startsWith("MCU")) {
                    matches.add("MCU");
                }
            });
        }

        genreArray.forEach(g => {
            let firstWord = g.split(" ")[0];
            currentMovieArray.forEach(c => {
                if (c.startsWith(firstWord)) {
                    matches.add(firstWord);
                }
            });
        });

        return matches.size;
    };

    const sortedMovies = Object.keys(Data).flatMap(category =>
        Data[category]).filter(movie =>
            movie.name !== movieName && getMatchScore(movie) > 0).sort((a, b) =>
                getMatchScore(b) - getMatchScore(a));

    const countGenreMatches = (genre1, genre2) => {
        if (!genre1 || !genre2) return 0; // Handle undefined genres
        const genres1 = genre1.split(/[\s,]+/).map(g => g.trim());
        const genres2 = genre2.split(/[\s,]+/).map(g => g.trim());
        const matchCount = genres1.filter(g1 => genres2.some(g2 => g2.startsWith(g1.split(" ")[0]))).length;
        // console.log(`Genre matches: ${matchCount} " ${genres1}" " ${genres2}"`); // Log number of matches
        return matchCount;
    };
    let movieIndex = 0;
    const createMovieHTML = (movie) => {
        countGenreMatches(movieData.genre, movie.genre)
        const hiddenClass = movieIndex >= 3 ? 'hidden-cards' : '';
        const style = movieIndex >= 3 ? 'display: none;' : '';
        movieIndex++;
        return `
<div data-video="${movie.video}" class="movie relative bg-gray-800 rounded-lg overflow-hidden w-full flex-shrink-0 ${hiddenClass}" style="${style}" 
     onmouseover="this.querySelector('.play-button').classList.remove('hidden')" 
     onmouseout="this.querySelector('.play-button').classList.add('hidden')">

    <img alt="Movie poster for Jugra" class="w-full h-48" src="${movie.img}"/>
    <div class="p-4">
        <div class="flex justify-between items-center mb-2">
            <div style="cursor:pointer;position:absolute;top: 30%;left: 50%;" class="play-button hidden flex items-center justify-between circular-button" 
                 onclick="handlePlayButtonClick(this.closest('.movie').getAttribute('data-video'))">
                <img style="filter:invert(1)" src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg" alt="Play icon" class="w-4 h-4">
            </div>


            <div class="flex flex-wrap items-center space-x-2">
                <p class="name flex-grow min-w-0 whitespace-nowrap">${movie.name}</p>
                <span class="duration whitespace-nowrap">${movie.duration}</span>
                <span class="text-sm whitespace-nowrap">${movie.age}+</span>
                <span class="text-sm bg-gray-700 px-2 py-1 rounded whitespace-nowrap">HD</span>
                <span class="text-sm">${movie.ReleaseDate}</span>
                <button class="circular-button whitespace-nowrap">
                    <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/add.svg" alt="Add icon" class="w-4 h-4">
                </button>
            </div>
        </div>
        <p class="text-sm">
            ${movie.description["desc1"]}
        </p>
    </div>
</div>`
    }
    const createEpiosdeAlbumHTML = (movieData) => {
        if (movieData.name.includes("Season")) {
            const season =
                `<div style="position: relative;" class="overflow-auto playlist bg-black text-white font-sans relative">
                <div class="header-section">
                    <video class="background-video" muted loop>
                        <source
                            src="${movieData.video}"
                            type="video/mp4">
                    </video>
                    <img src="${movieData.img}"
                        alt="Loki background image" class="background-image">
                    <div class="relative z-10 text-center">
                        <p class="italic text-xl font-bold w-3/4 mx-auto">${movieData.description["desc2"]}</p>
                        <div class="flex justify-center space-x-4 my-4">
                            <button id="next-episode-button" class="bg-white text-black px-4 py-2 rounded flex items-center">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg"
                                    alt="Play icon" class="w-4 h-4 mr-2">
                                Next Episode
                            </button>
                            <button class="circular-button">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/add.svg"
                                    alt="Add icon" class="w-4 h-4">
                            </button>
                            <button class="circular-button">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/like.svg"
                                    alt="Like icon" class="w-4 h-4 like-icon">
                            </button>
                            <button id="volume-button" class="volume-button">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/volume.svg"
                                    alt="Volume icon" class="w-4 h-4 volume-icon">
                            </button>
                        </div>
                    </div>
                </div>
               <div class="p-6">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
                        <div class="flex items-center flex-col space-x-2">
                            <div class="flex w-full items-center space-x-2">
                                <span>${movieData.ReleaseDate}</span>
                                <span>${movieData.type} Movie</span>
                                <span class="bg-gray-700 px-2 py-1 rounded">HD</span>
                            </div>
                            <!-- Episode Announcement -->
                            <div class="my-4">
                                <h2 class="text-xl font-bold">New episode coming on Wednesday</h2>
                                <p class="mt-2">${movieData.description["desc3"]}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-center space-x-2">
                            <div class="flex w-full items-center space-x-2 mt-2 md:mt-0">
                                <span class="bg-gray-700 px-2 py-1 rounded">${movieData.age}+</span>
                                <span>${movieData.show}Movies</span>
                            </div>
                              <!-- Cast and Genres -->
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
                                <div>
                                    <p><span class="font-bold">Cast : </span> ${movieData.cast}<span
                                        class="text-gray-400">more</span></p>
                                    <p><span class="font-bold">Genres : </span> ${movieData.genre}</p>
                                    <p><span class="font-bold">This show is : </span> ${movieData.show}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <!-- Episodes List -->
                    <div class="flex justify-between items-center my-4">
                        <h2 class="text-xl font-bold">Episodes</h2>
                        <h2 class="text-xl font-bold">${movieData.name}</h2>
                    </div>
                    <div class="episode-content border-t border-gray-700 mt-2 pt-2">
                        ${movieData.episode.map((episode, index) => createEpisodeHTML(episode, index)).join("")}
                        <div class="flex justify-center mt-4">
                            <i class="showMoreEpisode-down fa-chevron-down fas text-2xl cursor-pointer" onclick="showMoreEpisode()">
                            </i>
                        </div>
                        <div class="flex justify-center mt-4 hidden" id="show-less-Episode">
                            <button class="bg-gray-700 text-white py-2 px-4 rounded" onclick="showLessEpisode()">
                                Show Less Episode
                            </button>
                        </div>
                    </div>
        <div class="p-6 bg-black text-white">
            <h2 class="text-xl font-bold mb-4">
                More Like This
            </h2>
            <div class="flex flex-col justify-center items-center Movies-Container">
                <div class="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 Movies-List">
                    ${sortedMovies.map((movie, index) => createMovieHTML(movie, index)).join("")}
                </div>
                <div class="flex justify-center mt-4">
                    <i class="fas fa-chevron-down text-2xl cursor-pointer" onclick="showMoreCards()"></i>
                </div>
                <div class="flex justify-center mt-4 hidden" id="show-less-btn">
                    <button class="bg-gray-700 text-white py-2 px-4 rounded" onclick="showLessCards()">
                        Show Less
                    </button>
                </div>
            </div>
            <div class="mb-8">
                <h3 class="text-xl font-bold mb-2">
                    About <span class="text-white"> ${movieData.name} </span>
                </h3>
                <p>
                    <span class="font-semibold"> Director: </span> Abhinay Deo
                </p>
                <p>
                    <span class="font-semibold">Cast : </span>${movieData.cast}
                </p>
                <p>
                    <span class="font-semibold">
                        Writer:
                    </span>
                    Parveez Shaikh, Aseem Arorra
                </p>
                <p>
                    <span class="font-semibold">
                        Genres:
                    </span>
                   ${movieData.genre}
                </p>
                <p>
                    <span class="font-semibold">
                        This movie is:
                    </span>
                    ${movieData.type}
                </p>
                <p>
                    <span class="font-semibold">
                        Maturity rating:
                    </span>
                    ${movieData.age}+ ${movieData.type} Recommended for ages ${movieData.age} and up
                </p>
            </div>
        </div>
                            </div>
                        </div>`
            return season
        }
        else {
            const season =
                `<div data-video="${movieData.video}"  style="position: relative;" class="overflow-auto playlist bg-black text-white font-sans relative">
                <div class="header-section">
                    <video class="background-video" muted loop>
                        <source
                            src="${movieData.trailer}"
                            type="video/mp4">
                    </video>
                    <img src="${movieData.img}"
                        alt="Loki background image" class="background-image">
                    <div class="relative z-10 text-center">
                        <p class="italic text-xl font-bold w-3/4 mx-auto">${movieData.description["desc1"]}</p>
                        <h1 class="italic font-bold w-3/4 mx-auto">${movieData.name}</h1>
                        <div class="flex justify-center space-x-4 my-4">
                            <button id="next-episode-button" class="bg-white text-black px-4 py-2 rounded flex items-center">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/play.svg"
                                    alt="Play icon" class="w-4 h-4 mr-2">
                                Play
                            </button>
                            <button class="circular-button">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/add.svg"
                                    alt="Add icon" class="w-4 h-4">
                            </button>
                            <button class="circular-button">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/like.svg"
                                    alt="Like icon" class="w-4 h-4 like-icon">
                            </button>
                            <button id="volume-button" class="volume-button">
                                <img src="https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/volume.svg"
                                    alt="Volume icon" class="w-4 h-4 volume-icon">
                            </button>
                        </div>
                    </div>
                </div>
                <div class=" mx-auto p-4 relative z-10">
                    <!-- Show Details -->
                <div class="p-6">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
                        <div class="flex items-center flex-col space-x-2">
                            <div class="flex w-full items-center space-x-2">
                                <span>${movieData.ReleaseDate}</span>
                                <span>${movieData.type} Movie</span>
                                <span class="bg-gray-700 px-2 py-1 rounded">HD</span>
                            </div>
                            <!-- Episode Announcement -->
                            <div class="my-4">
                                <h2 class="text-xl font-bold">New episode coming on Wednesday</h2>
                                <p class="mt-2">${movieData.description["desc1"]}${movieData.description["desc2"]}</p>
                                <p class="mt-2">${movieData.description["desc3"]}${movieData.description["desc4"]}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-center space-x-2">
                            <div class="flex w-full items-center space-x-2 mt-2 md:mt-0">
                                <span class="bg-gray-700 px-2 py-1 rounded">${movieData.age}+</span>
                                <span>${movieData.type}</span>
                            </div>
                              <!-- Cast and Genres -->
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
                                <div>
                                    <p><span class="font-bold">Cast : </span> ${movieData.cast}<span
                                        class="text-gray-400">more</span></p>
                                    <p><span class="font-bold">Genres : </span> ${movieData.genre}</p>
                                    <p><span class="font-bold">This show is : </span> ${movieData.show}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
        <div class="p-6 bg-black text-white">
            <h2 class="text-xl font-bold mb-4">
                More Like This
            </h2>
            <div class="flex flex-col justify-center items-center Movies-Container">
                <div class="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 Movies-List">
                      ${sortedMovies.map((movie, index) => createMovieHTML(movie, index)).join("")}
                </div>
                <div class="flex justify-center mt-4">
                    <i class="fas fa-chevron-down text-2xl cursor-pointer" onclick="showMoreCards()"></i>
                </div>
                <div class="flex justify-center mt-4 hidden" id="show-less-btn">
                    <button class="bg-gray-700 text-white py-2 px-4 rounded" onclick="showLessCards()">
                        Show Less
                    </button>
                </div>
            </div>
        <div class="mb-8">
            <h3 class="text-xl font-bold mb-2">
                About
                <span class="text-white">
                ${movieData.name}
                </span>
            </h3>
            <p>
                <span class="font-semibold">
                    Director:
                </span>
                Abhinay Deo
            </p>
            <p>
                <span class="font-semibold">
                    Cast:
                </span>
                ${movieData.cast}
            </p>
            <p>
                <span class="font-semibold">
                    Writer:
                </span>
                Parveez Shaikh, Aseem Arorra
            </p>
            <p>
                <span class="font-semibold">
                    Genres:
                </span>
               ${movieData.genre}
            </p>
            <p>
                <span class="font-semibold">
                    This movie is:
                </span>
                ${movieData.type}
            </p>
            <p>
                <span class="font-semibold">
                    Maturity rating:
                </span>
                ${movieData.age}+ violence Recommended for ages ${movieData.age} and up
            </p>
        </div>
    </div>
    </div>
                    </div>`
            return season
        }
    };
    const renderPlaylistSections = (categories) => {
        const movieAlbumContainer = document.querySelector("#playlist .playlist-section");
        movieAlbumContainer.innerHTML = createEpiosdeAlbumHTML(categories)
    };
    renderPlaylistSections(movieData)
    const video = document.querySelector('.background-video');
    const volumeButton = document.getElementById('volume-button');
    const episodeCards = document.querySelectorAll('.episode-card');
    const nextEpisodeButton = document.getElementById('next-episode-button');
    document.querySelector('.header-section').addEventListener('mouseover', async () => {
        try {
            await video.play();
        } catch (error) {
            console.log('Video play failed:', error);
        }
    });

    document.querySelector('.header-section').addEventListener('mouseout', async () => {
        try {
            await video.pause();
        } catch (error) {
            console.log('Video pause failed:', error);
        }
    });

    volumeButton.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            volumeButton.querySelector('img').src = 'https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/volume.svg';
        } else {
            video.muted = true;
            volumeButton.querySelector('img').src = 'https://raw.githubusercontent.com/Ankitbhagat2062/GAAC-Bot-Assets/main/songs/img/mute.svg';
        }
    });

    episodeCards.forEach(card => {
        const videoUrl = card.getAttribute("data-video");
        card.addEventListener("click", () => {
            youtubePlayer.innerHTML = `<iframe src="${videoUrl}" sandbox="allow-same-origin allow-scripts" width="640" height="360" frameborder="0" allowfullscreen></iframe>`;
            videoModal.classList.add("active");
        });
    });

    videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal || e.target.classList.contains("close-modal")) {
            videoModal.classList.remove("active");
            youtubePlayer.innerHTML = '';
        }
    });

    nextEpisodeButton.addEventListener('click', () => {
        if (movieData.name.includes("Season")) {
            const firstEpisode = document.querySelector('.episode-card:not(.hidden-cards)');
            if (firstEpisode) {
                const episodeUrl = firstEpisode.getAttribute("data-video");
                youtubePlayer.innerHTML = `<iframe src="${episodeUrl}" sandbox="allow-same-origin allow-scripts" width="640" height="360" frameborder="0" allowfullscreen></iframe>`;
                videoModal.classList.add("active");
            }
        }
        else {
            const Movie = document.querySelector('.playlist');
            const MovieUrl = Movie.getAttribute("data-video");
            youtubePlayer.innerHTML = `<iframe src="${MovieUrl}" sandbox="allow-same-origin allow-scripts" width="640" height="360" frameborder="0" allowfullscreen></iframe>`;
            videoModal.classList.add("active");
        }
    });
    document.querySelectorAll('.play-button').forEach((playButton) => {
        if (playButton) {
            playButton.addEventListener('click', async (e) => {
                if (e.currentTarget.closest('.movie')) {
                    videoUrl = e.currentTarget.closest('.movie').getAttribute('data-video');
                    handlePlayButtonClick(videoUrl);
                }
            });
        }
    });
    document.body.style.overflow = "hidden"
    playlist.querySelector('.close-modal').classList.remove('hidden')
}

const createMovieAlbumHTML = (category, videos) => `
<section id=${category} class="${category} section">
<div class="section-header section-title">
<h2>${category}</h2>
<a href="#" class="stream-now">STREAM NOW</a>
</div>
<div class="section-content">
${videos.map(createCardHTML).join("")}
</div>
</section>`;

const createCardHTML = (video) => `
        <div class="movie-card" data-audio="${video.audio}" data-video="${video.video}">
            <img src="${video.img}" alt="${video.name}">
            <div class="play-button">▶</div>
            <div class="movie-info">
                <p class="rating">${video.rating}</p>
                <p class="title">${video.name}</p>
                <button class="watchlist-btn">
                    +WATCHLIST
                </button>
            </div>
        </div>`;

const getMoviesByCategory = async (category) => {
    try {
        const data = await fetch("https://raw.githubusercontent.com/Ankitbhagat2062/Rotten-Tomatoes-Clone/main/movie.json").then(res => res.json());
        return data[category] || [];
    } catch (error) {
        return [];
    }
};

main();

