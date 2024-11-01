// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Video Modal
const movieCards = document.querySelectorAll('.movie-card');
const videoModal = document.createElement('div');
videoModal.classList.add('video-modal');
videoModal.innerHTML = `<video controls id="video-player" crossorigin="anonymous"></video>
                        <span class="close-modal">&times;</span>`;
document.body.appendChild(videoModal);

const videoPlayer = videoModal.querySelector('#video-player');
const closeModal = videoModal.querySelector('.close-modal');

movieCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.getAttribute('data-video');
        videoPlayer.src = videoSrc;
        videoModal.classList.add('active');
        videoPlayer.play();
    });
});

closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.src = '';
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.src = '';
    }
});

// Sample movie data for each section
const frightfulFavoritesData = [
    { img: 'images/hocus-pocus.jpg', title: 'Hocus and Pocus', video: 'videos/video-hocus-pocus.mp4'},
    { img: 'images/agatha.jpg', title: 'Agatha All Along', video: 'videos/video-agatha.mp4'},
    { img: 'images/deadpool-wolverin.jpg', title: 'Deadpool and Wolverine', video: 'videos/video-deadpool-wolverine.mp4'},
    { img: 'images/image4.webp', title: 'Venom The Last Dance', video: 'videos/venom3.mkv'},
    { img: 'images/burton.jpg', title: "Tim Burton's The Nightmare before Christmas", video: 'videos/video-burton.mp4'},
    // Add more items as needed
];

const nowInTheatersData = [
    { img: 'path/to/emilia-periz.jpg', title: 'Emilia Pérez', video: 'videos/emilia-perez.mp4', audienceScore: '85%', criticScore: '--',watchlistLink:'https://ankitbhagat2062.github.io/Online-tools/' },
    { img: 'path/to/john-wick.jpg', title: 'John Wick', video: 'videos/john-wick.mkv', audienceScore: '86%', criticScore: '81%',watchlistLink:'https://ankitbhagat2062.github.io/Ultra-Edit/' },
    { img: 'path/to/Spider-Man-No-Way-Home.jpeg', title: 'Spider-Man No Way Home', video: 'videos/Spider-Man-No-Way-Home.mkv', audienceScore: '85%', criticScore: '80%', watchlistLink:'https://ankitbhagat2062.github.io/Online-tools/' },
    { img: 'path/to/venom2.jpeg', title: 'The Venom 2 (II)', video: 'videos/venom2.mkv', audienceScore: '95%', criticScore: '86%', watchlistLink:'https://ankitbhagat2062.github.io/Online-tools/' },
    // Add more items as needed
];

const latestInStreamingData = [
    { img: 'path/to/streaming-movie2.jpg', title: 'Thor Love and Thunder', video: 'videos/thor-love.mp4', audienceScore: '88%', criticScore: '82%',watchlistLink:'https://ankitbhagat2062.github.io/ankitswebsite/' },
    { img: 'path/to/streaming-movie1.jpg', title: 'The Marvels', video: 'videos/marvels.mp4', audienceScore: '75%', criticScore: '80%' ,watchlistLink:'https://ankitbhagat2062.github.io/Flappy-Bird/'},
    { img: 'path/to/hulk2003.jpg', title: 'The Hulk', video: 'videos/hulk.mkv', audienceScore: '75%', criticScore: '80%' ,watchlistLink:'https://ankitbhagat2062.github.io/Flappy-Bird/'},
    { img: 'path/to/ironman2.avif', title: 'The Iron Man Two', video: 'videos/ironman2.mp4', audienceScore: '85%', criticScore: '89%' ,watchlistLink:'https://ankitbhagat2062.github.io/Flappy-Bird/'},
    // Add more items as needed
];

const tvShowsData = [
    { img: 'path/to/tvshow1.jpeg', title: 'Friends Season 1', video: 'videos/friends-season1.mp4', audienceScore: '89%', criticScore: '90%',watchlistLink:'https://ankitbhagat2062.github.io/Geometric-Dash-The-Endless-Runner/' },
    { img: 'path/to/tvshow2.jpg', title: 'Breaking Bad', video: 'videos/breaking-brad.mp4', audienceScore: '95%', criticScore: '92%' , watchlistLink:'https://ankitbhagat2062.github.io/Tic-Tac-Toe/'},
    { img: 'path/to/tvshow3.png', title: 'Loki Season 1 Episode 1', video: 'videos/loki.mkv', audienceScore: '98%', criticScore: '99%',watchlistLink:'https://ankitbhagat2062.github.io/Watch-Movies/' },
    // Add more items as needed
];
const allTimeFavoritesData= [
    { img: 'path/to/favorite1.webp', title: 'Batman - The Dark Knight', video: 'videos/the-dark-knight.mp4', audienceScore: '89%', criticScore: '90%' , watchlistLink:'https://ankitbhagat2062.github.io/Super-Mario-The-Immortal/' },
    { img: 'path/to/favorite2.jpg', title: 'Avengers Infinity War', video: 'videos/ironman2.mp4', audienceScore: '95%', criticScore: '92%', watchlistLink: 'https://ankitbhagat2062.github.io/Netflix-Clone/' },
    { img: 'path/to/favorite3.avif', title: 'The GodFather', video: 'videos/venom2.mkv', audienceScore: '98%', criticScore: '99%' , watchlistLink: 'https://ankitbhagat2062.github.io/My-Portfolio/' },
    { img: 'path/to/favorite4.jpg', title: 'The ShawShank Redemption', video: 'videos/shawshank-redemption.mp4', audienceScore: '92%', criticScore: '98%', watchlistLink: 'https://ankitbhagat2062.github.io/StreamFlix/' },
    // Add more items as needed
];

// Function to rotate through the movie data for a specific section
function rotateContent(sectionSelector, data) {
    const sectionContent = document.querySelector(`${sectionSelector} .section-content`);
    const movieCards = sectionContent.querySelectorAll('.movie-card');

    let currentIndex = 0;

    // Update content every second
    setInterval(() => {
        movieCards.forEach((card, index) => {
            const item = data[(currentIndex + index) % data.length]; // Rotate each card's data

            // Update the image
            const imgElement = card.querySelector('img');
            imgElement.src = item.img;
            imgElement.alt = item.title;

            // Update the video data attribute
            card.setAttribute('data-video', item.video);

            // Update the title
            const titleElement = card.querySelector('p');
            titleElement.textContent = item.title;

            // Update additional movie info (for sections with ratings, etc.)
            const movieInfoElement = card.querySelector('.movie-info');
            if (movieInfoElement) {
                // Update rating information for sections with movie-info
                movieInfoElement.innerHTML = `
                    <div class="ratings">
                        <span class="audience-score">🍅${item.audienceScore || ''}</span>
                        <span class="critic-score">🍿${item.criticScore || ''}</span>
                    </div>
                    <p class="title">${item.title}</p>
                    <button class="watchlist-btn">+ WATCHLIST</button>
                `;
            }
        });

        // Move to the next set of items in the data array
        currentIndex = (currentIndex + 1) % data.length;
    }, 3000);
}

// Initialize rotation for each section

// Function to rotate through the movie data for the all-time favorites section specifically with unique links
function rotateAllTimeFavoritesContent(sectionSelector, data) {
    const sectionContent = document.querySelector(`${sectionSelector} .section-content`);
    const movieCards = sectionContent.querySelectorAll('.movie-card');

    let currentIndex = 0;

    // Update content every second
    setInterval(() => {
        movieCards.forEach((card, index) => {
            const item = data[(currentIndex + index) % data.length]; // Rotate each card's data

            // Update the image
            const imgElement = card.querySelector('img');
            imgElement.src = item.img;
            imgElement.alt = item.title;

            // Update the video data attribute
            card.setAttribute('data-video', item.video);

            // Update the title
            const titleElement = card.querySelector('p');
            titleElement.textContent = item.title;

            // Update additional movie info (for sections with ratings, etc.)
            const movieInfoElement = card.querySelector('.movie-info');
            if (movieInfoElement) {
                movieInfoElement.innerHTML = `
                    <div class="ratings">
                        <span class="audience-score">🍅${item.audienceScore || ''}</span>
                        <span class="critic-score">🍿${item.criticScore || ''}</span>
                    </div>
                    <p class="title">${item.title}</p>
                    <button class="watchlist-btn" onclick="window.open('${item.watchlistLink}', '_blank')">+ WATCHLIST</button>
                `;
            }
        });

        // Move to the next set of items in the data array
        currentIndex = (currentIndex + 1) % data.length;
    }, 3000);
}



// Initialize rotation for each section

let isSearching = false;
let rotationIntervals = [];

function rotateSectionContent(sectionSelector, data) {
    const sectionContent = document.querySelector(`${sectionSelector} .section-content`);
    const movieCards = sectionContent.querySelectorAll('.movie-card');

    let currentIndex = 0;

    const intervalId = setInterval(() => {
        if (!isSearching) {
            movieCards.forEach((card, index) => {
                const item = data[(currentIndex + index) % data.length];
                card.setAttribute('data-title', item.title.toLowerCase());

                const imgElement = card.querySelector('img');
                imgElement.src = item.img;
                imgElement.alt = item.title;
                card.setAttribute('data-video', item.video);

                const titleElement = card.querySelector('p');
                titleElement.textContent = item.title;

                const movieInfoElement = card.querySelector('.movie-info');
                if (movieInfoElement) {
                    movieInfoElement.innerHTML = `
                        <div class="ratings">
                            <span class="audience-score">🍅${item.audienceScore || ''}</span>
                            <span class="critic-score">🍿${item.criticScore || ''}</span>
                        </div>
                        <p class="title">${item.title}</p>
                        <button class="watchlist-btn" onclick="window.open('${item.watchlistLink}', '_blank')">+ WATCHLIST</button>
                    `;
                }
            });

            currentIndex = (currentIndex + 1) % data.length;
        }
    }, 1000);

    rotationIntervals.push(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const allSections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const isSearching = searchTerm.length > 0;

        if (isSearching) {
            console.log("Search term entered, changing layout...");

            rotationIntervals.forEach(clearInterval); // Stop auto rotation

            searchResults.style.display = 'flex'; // Show search results container
            searchResults.innerHTML = ''; // Clear previous search results
            allSections.forEach(section => section.classList.add('hidden')); // Hide all other sections

            const allMovieCards = document.querySelectorAll('.movie-card');
            let foundMatch = false;

            allMovieCards.forEach(card => {
                const title = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    const clone = card.cloneNode(true);
                    searchResults.appendChild(clone);
                    foundMatch = true;
                }
            });

            if (!foundMatch) {
                searchResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
            }

            // Add column layout to header for vertical display
            header.classList.add('column-layout'); 
            console.log("Added 'column-layout' class to header.");

        } else {
            console.log("Search term cleared, resetting layout...");

            rotationIntervals = [];
            rotateSectionContent('.tv-shows', tvShowsData);
            rotateSectionContent('.latest-in-streaming', latestInStreamingData);
            rotateSectionContent('.now-in-theaters', nowInTheatersData);
            rotateSectionContent('.all-time-favorites', allTimeFavoritesData);

            // Reset layout
            searchResults.style.display = 'none';
            allSections.forEach(section => section.classList.remove('hidden'));

            header.classList.remove('column-layout'); // Remove column layout from header
            console.log("Removed 'column-layout' class from header.");
        }
    });
       
    rotateAllTimeFavoritesContent('.all-time-favorites', allTimeFavoritesData);
    rotateContent('.frightful-favorites', frightfulFavoritesData);    
    rotateContent('.now-in-theaters', nowInTheatersData);
    rotateContent('.latest-in-streaming', latestInStreamingData);
    rotateContent('.tv-shows', tvShowsData);
    rotateContent('.all-time-favorites', allTimeFavoritesData);
});

