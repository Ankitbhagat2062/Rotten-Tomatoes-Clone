window.onload = () => {
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

            const movieData = await fetch("./movie.json").then(res => res.json());
            const categories = Object.keys(movieData);
            renderMovieSections(categories, movieData)
            renderSlides(categories, movieData);
            startSlideShow(categories, movieData);
            // startMovie(categories, movieData);

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
        if (!videos || videos.length === 0) return ""; // Ensure there is at least one movie

        const video = videos[0]; // Get only the first movie from each category
        return `
<div class="slide" style="background-image: url('${video.image.image1}');">
<div class="overlay">
<h2>${video.name}</h2>
<p>${video.description.desc1}</p>
</div>
</div>`;
    };

    const startSlideShow = (categories, data) => {
        // let currentCategoryIndex = 0, currentMovieIndex = 0, currentImageIndex = 1;
        let currentCategoryIndex = Math.floor(Math.random() * categories.length)

        const categoryName = categories[currentCategoryIndex];
        const movies = data[categoryName];

        let currentMovieIndex = Math.floor(Math.random() * movies.length), currentImageIndex = 1;

        if (!movies || movies.length === 0) return;
        const movie = movies[currentMovieIndex];
        console.log(currentCategoryIndex, currentMovieIndex)
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
            observer.disconnect(); // Stop observing after finding slides
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
        // const dot = document.querySelector(".dot");
        // dot.classList.add("active")
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

        // ✅ Generate movie cards inside section-content
        container.innerHTML = movies.map(movie => createCardHTML(movie)).join("");

        // ✅ Get movie cards after inserting them
        const movieCards = Array.from(container.querySelectorAll('.movie-card'));

        if (movieCards.length === 0) {
            console.error(`Error: No movie cards found in section #${id}`);
            return;
        }

        let currentIndex = 0;

        // ✅ Update content every 3 seconds
        setInterval(() => {
            movieCards.forEach((card, index) => {
                const itemIndex = (currentIndex + index) % movies.length; // Cycle through movies
                const item = movies[itemIndex];

                // ✅ Update the image
                const imgElement = card.querySelector('img');
                if (imgElement) {
                    imgElement.src = item.img;
                    imgElement.alt = item.name;
                }
                // ✅ Update the video data attribute
                card.setAttribute('data-video', item.video);
                card.setAttribute('data-audio', item.audio);

                // ✅ Update the title
                const titleElement = card.querySelector('p');
                if (titleElement) {
                    titleElement.textContent = item.name;
                }

                // ✅ Update additional movie info
                const movieInfoElement = card.querySelector('.movie-info');
                if (movieInfoElement) {
                    movieInfoElement.innerHTML = `
    <p class="rating">${item.rating}</p>
    <p class="title">${item.name}</p>
    <button class="watchlist-btn">
        <a href="${item.watchlist}">+WATCHLIST</a>
    </button>
`;
                }
            });

            // ✅ Move to the next set of items in the `movies` array
            currentIndex = (currentIndex + 1) % movies.length;
        }, 3000);
    };
    let player;

    // Extract YouTube Video ID from URL
    function extractYouTubeID(url) {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([^#&?]*))/);
        return match ? match[1] : null;
    }

    // Create the YouTube Player instance (iframe version)
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
                mute: 0,  // Ensure video starts unmuted
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
    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            console.log('video is playing');
        }
    }


    // Stop YouTube Player by removing iframe
    function stopYouTubePlayer() {
        const youtubePlayerDiv = document.getElementById("youtube-player");
        youtubePlayerDiv.innerHTML = ""; // Remove iframe to stop the video
    }

    // Initialize the video modal
    const initializeVideoModal = () => {
        const videoModal = document.createElement("div");
        videoModal.classList.add("video-modal");
        videoModal.innerHTML = `<div class="video-container">
    <div class="youtube-player">
        <div id="youtube-player"></div>
    </div>
    <video id="video-player" controls autoplay muted crossorigin="anonymous" style="display: none;">
        
        <source id="video-source" src="" type="video/mp4">
    </video>
    <audio id="audio-player" controls style="display: none;">
        <source id="audio-source" src="" type="audio/mp3">
    </audio>
    <div class="video-details"></div>
    <span class="close-modal">&times;</span>
</div>`;
        document.body.appendChild(videoModal);

        const videoPlayer = videoModal.querySelector("#video-player");
        const youtubePlayer = videoModal.querySelector("#youtube-player");
        const videoSource = videoModal.querySelector("#video-source");
        const audioPlayer = videoModal.querySelector("#audio-player");
        const audioSource = videoModal.querySelector("#audio-source");

        const videoContent = videoModal.querySelector("#video-content");
        document.querySelectorAll(".movie-card").forEach(card => {
            card.addEventListener("click", async () => {
                const videoUrl = card.getAttribute("data-video");
                const audioUrl = card.getAttribute("data-audio");

                console.log("Video URL:", videoUrl);
                console.log("Audio URL:", audioUrl);

                // ✅ Check video file size before adding audio

                if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
                    const videoId = extractYouTubeID(videoUrl);
                    if (player) {
                        player.loadVideoById(videoId);
                    } else {
                        createYouTubePlayer(videoId);
                    }
                    videoModal.classList.add("active");
                }
                else if (videoUrl.includes("https://go.screenpal.com") || videoUrl.includes("https://imdb-video.media-imdb.com") || videoUrl.includes("https://vidsrc.cc")) {
                    console.log("Embedding ScreenPal video...");
                    youtubePlayer.innerHTML = `
                       <iframe src="${videoUrl}" width="800" height="450"  frameborder="0" allowfullscreen>   </iframe>
                        `;
                    videoModal.classList.add("active");
                }
                else {
                    const trimmedVideoUrl = videoUrl.trim();

                    console.log("VideoUrl does not include youtube.com or youtu.be, it includes: ");
                    const fileSize = await getFileSize(videoUrl);
                    console.log(`Video File Size: ${fileSize} MB`);

                    // ✅ Check if the video has audio
                    const hasAudio = await checkIfVideoHasAudio(videoUrl);
                    console.log("Has Audio:", hasAudio);

                    // ✅ Set video source
                    videoPlayer.load(); // Load new video
                    videoSource.src = videoUrl;

                    // ✅ Only add audio if file size > 25MB
                    if (fileSize > 25 || !hasAudio) {
                        audioPlayer.load();
                        audioSource.src = audioUrl;
                    } else {
                        audioSource.src = "";
                        audioPlayer.style.display = "none"; // Hide audio for small videos
                    }

                    videoPlayer.style.display = "block";
                    videoModal.classList.add("active");

                    // ✅ Attempt autoplay
                    videoPlayer.muted = true;
                    videoPlayer.play()
                        .then(() => {
                            console.log("Video autoplayed successfully.");
                            videoPlayer.muted = false;
                            if (fileSize > 25 || !hasAudio) {
                                return audioPlayer.play();
                            }
                        })
                        .catch(error => {
                            console.error("Autoplay failed:", error)
                            if (error.name === "AbortError") {
                                console.log("Playback was interrupted.");
                            }
                        });

                    // ✅ Sync video and audio playback
                    videoPlayer.addEventListener("timeupdate", () => {
                        if ((fileSize > 25 || !hasAudio) && Math.abs(videoPlayer.currentTime - audioPlayer.currentTime) > 0.1) {
                            audioPlayer.currentTime = videoPlayer.currentTime;
                        }
                    });

                    videoPlayer.addEventListener("play", () => (fileSize > 25 || !hasAudio) && audioPlayer.play());
                    videoPlayer.addEventListener("pause", () => (fileSize > 25 || !hasAudio) && audioPlayer.pause());
                }

            });
        });

        // ✅ Close modal event listener
        videoModal.addEventListener("click", (e) => {
            if (e.target === videoModal || e.target.classList.contains("close-modal")) {
                videoModal.classList.remove("active");

                if (player) {
                    player.stopVideo();
                    player.destroy();
                    player = null;
                }
                stopYouTubePlayer();

                videoPlayer.pause();
                videoPlayer.load();
                videoSource.src = "";
                videoPlayer.style.display = "none";

                audioPlayer.pause();
                audioPlayer.load();
                audioSource.src = "";
                audioPlayer.style.display = "none";
            }
        });

    };

    // ✅ Function to get file size in MB
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
    // ✅ Function to check if a video has audio
    const checkIfVideoHasAudio = async (url) => {
        return new Promise((resolve) => {
            const testVideo = document.createElement("video");
            testVideo.src = url;
            testVideo.muted = true;
            testVideo.addEventListener("loadedmetadata", () => {
                // Firefox supports `mozHasAudio`
                const hasAudio = testVideo.mozHasAudio ||
                    testVideo.webkitAudioDecodedByteCount > 0 ||
                    (testVideo.audioTracks && testVideo.audioTracks.length > 0);
                resolve(hasAudio);
            });
            testVideo.addEventListener("error", () => resolve(false));
        });
    };
    // Load the YouTube API script
    function loadYouTubeAPI() {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }

    // Initialize the video modal once YouTube API is ready
    window.onYouTubeIframeAPIReady = initializeVideoModal;
    loadYouTubeAPI();

    // Setup the search feature for filtering movie cards
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

                    clonedCard.addEventListener("click", async () => {
                        const videoModal = document.querySelector('.video-modal')

                        // Listen for clicks on movie cards
                        const videoPlayer = videoModal.querySelector("#video-player");
                        const videoSource = videoModal.querySelector("#video-source");
                        const audioPlayer = videoModal.querySelector("#audio-player");
                        const audioSource = videoModal.querySelector("#audio-source");
                        searchResults.querySelectorAll(".movie-card").forEach(async (card) => {
                            console.log(clonedCard)
                            const videoUrl = card.getAttribute("data-video");
                            const audioUrl = card.getAttribute("data-audio");

                            console.log("Video URL:", videoUrl);
                            console.log("Audio URL:", audioUrl);

                            // ✅ Check video file size before adding audio

                            if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
                                const videoId = extractYouTubeID(videoUrl);
                                if (player) {
                                    player.loadVideoById(videoId);
                                } else {
                                    createYouTubePlayer(videoId);
                                }
                                videoModal.classList.add("active");
                                videoPlayer.style.display = "none";
                                console.log(`VideoUrl includes ${videoUrl}`)
                            } else {
                                // Trim spaces or other unnecessary characters from the URL
                                const trimmedVideoUrl = videoUrl.trim();

                                console.log("VideoUrl does not include youtube.com or youtu.be, it includes: ");

                                // ✅ Check the URL before proceeding
                                const fileSize = await getFileSize(trimmedVideoUrl);
                                console.log(`Video File Size: ${fileSize} MB`);

                                // ✅ Set video source
                                videoPlayer.load(); // Load new video
                                videoSource.src = trimmedVideoUrl;

                                // ✅ Only add audio if file size > 25MB
                                if (fileSize > 25) {
                                    audioPlayer.load();
                                    audioSource.src = audioUrl;
                                    audioPlayer.style.display = "block"; // Show audio only if needed
                                } else {
                                    audioSource.src = "";
                                    audioPlayer.style.display = "none"; // Hide audio for small videos
                                }

                                videoPlayer.style.display = "block";
                                videoModal.classList.add("active");

                                // ✅ Attempt autoplay
                                videoPlayer.muted = true;
                                videoPlayer.play()
                                    .then(() => {
                                        console.log("Video autoplayed successfully.");
                                        videoPlayer.muted = false;
                                        if (fileSize > 25) {
                                            return audioPlayer.play();
                                        }
                                    })
                                    .catch(error => console.error("Autoplay failed:", error));

                                // ✅ Sync video and audio playback
                                videoPlayer.addEventListener("timeupdate", () => {
                                    if (fileSize > 25 && Math.abs(videoPlayer.currentTime - audioPlayer.currentTime) > 0.1) {
                                        audioPlayer.currentTime = videoPlayer.currentTime;
                                    }
                                });

                                videoPlayer.addEventListener("play", () => fileSize > 25 && audioPlayer.play());
                                videoPlayer.addEventListener("pause", () => fileSize > 25 && audioPlayer.pause());
                            }
                        });

                        // ✅ Close modal event listener
                        videoModal.addEventListener("click", (e) => {
                            if (e.target === videoModal || e.target.classList.contains("close-modal")) {
                                videoModal.classList.remove("active");

                                if (player) {
                                    player.stopVideo();
                                    player.destroy();
                                    player = null;
                                }
                                stopYouTubePlayer();

                                videoPlayer.pause();
                                videoPlayer.load();
                                videoSource.src = "";
                                videoPlayer.style.display = "none";

                                audioPlayer.pause();
                                audioPlayer.load();
                                audioSource.src = "";
                                audioPlayer.style.display = "none";
                            }
                        });
                    })
                }
            });
        });
    };


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
  <a href="${video.watchlist}">+WATCHLIST</a>
</button>
</div>
</div>`;

    const getMoviesByCategory = async (category) => {
        try {
            const data = await fetch("./movie.json").then(res => res.json());
            return data[category] || [];
        } catch (error) {
            console.error("Error fetching movie data:", error);
            return [];
        }
    };

    main();
};

