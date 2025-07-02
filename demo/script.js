import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD8qY7SKXv336GDbvJ650wybqIZ6qr2WE0",
    authDomain: "my-movie-database-61616.firebaseapp.com",
    projectId: "my-movie-database-61616",
    storageBucket: "my-movie-database-61616.firebasestorage.app",
    messagingSenderId: "596195744183",
    appId: "1:596195744183:web:50ea49f0817b7990237032"
};

const translations = {
    en: {
        backToHome: "Back to Home",
        mainTitle: `Your intellectual assistant <br class="hidden md:block" /> in your <span class="gold-accent">Netflix</span>.`,
        mainSubtitle: "Select a movie to reveal its description, then click 'Socrates Analysis' to see the deep lessons it offers.",
        loading: "Loading movies from the database...",
        error: "Failed to load data. Please check your Firebase configuration and internet connection.",
        carouselAll: "All Analyzed Films",
        carouselTopRated: "Top Rated",
        carouselRecent: "Recent Hits",
        carouselClassics: "Classics (Pre-2000)",
        watchButton: "Watch",
        socratesButton: "Socrates Analysis",
        backButton: "← Back to Overview",
        analysisTitle: "Socrates Analysis",
        noMovies: "No completed movies found."
    },
    pl: {
        backToHome: "Wróć do Głównej",
        mainTitle: `Twój intelektualny asystent <br class="hidden md:block" /> w Twoim <span class="gold-accent">Netflix</span>.`,
        mainSubtitle: "Wybierz film, aby zobaczyć jego opis, a następnie kliknij 'Socrates Analysis', aby poznać głębokie lekcje, które oferuje.",
        loading: "Ładowanie filmów z bazy danych...",
        error: "Nie udało się załadować danych. Sprawdź konfigurację Firebase i połączenie internetowe.",
        carouselAll: "Wszystkie przeanalizowane filmy",
        carouselTopRated: "Najwyżej oceniane",
        carouselRecent: "Nowości",
        carouselClassics: "Klasyki (Przed 2000)",
        watchButton: "Oglądaj",
        socratesButton: "Socrates Analysis",
        backButton: "← Wróć do opisu",
        analysisTitle: "Socrates Analysis",
        noMovies: "Nie znaleziono ukończonych filmów."
    }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const carouselContainer = document.getElementById('carousel-container');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const langSwitcher = document.getElementById('lang-switcher');

let moviesData = [];
let currentLang = localStorage.getItem('socrates_lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('socrates_lang', lang);
    document.documentElement.lang = lang;
    
    langSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    const openPanel = document.querySelector('.details-panel');
    const wasOpen = !!openPanel;
    if (wasOpen) closeAllDetails();
    
    renderCarousels();
}

function categorizeMovies(movies) {
    const categories = {
        topRated: [],
        recent: [],
        classics: []
    };
    const currentYear = new Date().getFullYear();

    movies.forEach(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        if (movie.rating >= 8.0) {
            categories.topRated.push(movie);
        }
        if (releaseYear >= currentYear - 5) {
            categories.recent.push(movie);
        }
        if (releaseYear < 2000) {
            categories.classics.push(movie);
        }
    });
    return categories;
}

function renderCarousels() {
    carouselContainer.innerHTML = '';
    const categorizedMovies = categorizeMovies(moviesData);

    createCarousel(translations[currentLang].carouselAll, moviesData);
    if (categorizedMovies.topRated.length > 0) {
        createCarousel(translations[currentLang].carouselTopRated, categorizedMovies.topRated);
    }
    if (categorizedMovies.recent.length > 0) {
        createCarousel(translations[currentLang].carouselRecent, categorizedMovies.recent);
    }
    if (categorizedMovies.classics.length > 0) {
        createCarousel(translations[currentLang].carouselClassics, categorizedMovies.classics);
    }
}

function createCarousel(title, movies) {
    if (movies.length === 0) return;
    const carousel = document.createElement('div');
    carousel.className = 'carousel-container';
    const titleEl = document.createElement('h3');
    titleEl.className = 'carousel-title';
    titleEl.textContent = title;
    carousel.appendChild(titleEl);
    const row = document.createElement('div');
    row.className = 'poster-row';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'poster-card';
        card.innerHTML = `<img src="${movie.poster_url}" alt="${movie.title}" data-id="${movie.id}" onerror="this.onerror=null;this.src='https://placehold.co/500x750/1f1f1f/444?text=No+Image';">`;
        row.appendChild(card);
    });
    carousel.appendChild(row);
    carouselContainer.appendChild(carousel);
}

function closeAllDetails() {
    const openPanel = document.querySelector('.details-panel');
    if (openPanel) openPanel.remove();
}

function openDetails(event) {
    const target = event.target;
    if (target.tagName !== 'IMG') return;
    closeAllDetails();
    const movieId = target.dataset.id;
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    const parentRow = target.closest('.poster-row').parentElement;
    const detailsPanel = document.createElement('div');
    detailsPanel.className = 'details-panel';
    const overviewContent = `<p class="mt-4 text-gray-300">${movie.overview}</p><div class="mt-6 flex items-center gap-4"><button class="bg-white text-black font-bold py-2 px-6 rounded-md flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg><span data-translate="watchButton">${translations[currentLang].watchButton}</span></button><button class="socrates-btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-3.91 19.85A10 10 0 0 0 12 2zM2 12h5m7 0h5m-7 7v-5m0-5V2"/></svg><span data-translate="socratesButton">${translations[currentLang].socratesButton}</span></button></div>`;
    let analysisHTML = `<p class="text-gray-400">Analysis for this movie is not ready yet.</p>`;
    if (movie.socrates_analysis && movie.socrates_analysis.length > 0) {
        analysisHTML = movie.socrates_analysis.map(analysis => `<div class="analysis-card"><h4 class="text-lg font-bold text-white">${analysis.title}</h4><p class="text-gray-300 mt-2">${analysis.value_proposition}</p></div>`).join('');
    }
    const socratesContent = `<div class="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3"><svg class="gold-accent" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-3.91 19.85A10 10 0 0 0 12 2zM2 12h5m7 0h5m-7 7v-5m0-5V2"/></svg><h3 class="text-2xl font-bold text-white" data-translate="analysisTitle">${translations[currentLang].analysisTitle}</h3></div><div class="space-y-4">${analysisHTML}</div><div class="mt-8"><button class="back-btn btn-secondary" data-translate="backButton">${translations[currentLang].backButton}</button></div>`;
    detailsPanel.innerHTML = `<div style="background-image: linear-gradient(to top, #181818, rgba(24,24,24,0.7)), url(${movie.backdrop_url}); background-size: cover; background-position: center; padding: 3rem 4%;"><h2 class="text-4xl font-bold">${movie.title}</h2><p class="text-gray-400 mt-2">${new Date(movie.release_date).getFullYear()} | Rating: ${movie.rating.toFixed(1)}</p></div><div class="details-info-container p-8"><div class="info-view overview-view">${overviewContent}</div><div class="info-view socrates-view hidden-view">${socratesContent}</div></div>`;
    parentRow.insertAdjacentElement('afterend', detailsPanel);
    
    setTimeout(() => {
        detailsPanel.classList.add('open');
        // FIXED: Scroll the panel into view after it starts opening
        setTimeout(() => {
            detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
    }, 10);
}

function toggleAnalysisView(event) {
    const button = event.target.closest('button');
    if (!button) return;
    const detailsPanel = button.closest('.details-panel');
    if (!detailsPanel) return;
    const overviewView = detailsPanel.querySelector('.overview-view');
    const socratesView = detailsPanel.querySelector('.socrates-view');
    if (button.classList.contains('socrates-btn')) {
        overviewView.classList.add('hidden-view');
        socratesView.classList.remove('hidden-view');
    } else if (button.classList.contains('back-btn')) {
        socratesView.classList.add('hidden-view');
        overviewView.classList.remove('hidden-view');
    }
}

langSwitcher.addEventListener('click', (e) => {
    if (e.target.matches('.lang-btn')) setLanguage(e.target.dataset.lang);
});
carouselContainer.addEventListener('click', openDetails);
document.body.addEventListener('click', (e) => {
    if (e.target.closest('.socrates-btn, .back-btn')) toggleAnalysisView(e);
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const moviesRef = collection(db, "movies");
        const q = query(moviesRef, where("status", "==", "Completed"), limit(100));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            loadingState.innerHTML = `<p data-translate="noMovies">No completed movies found.</p>`;
            setLanguage(currentLang);
            return;
        }
        querySnapshot.forEach((doc) => {
            moviesData.push({ id: doc.id, ...doc.data() });
        });
        loadingState.style.display = 'none';
        setLanguage(currentLang);
    } catch (error) {
        console.error("Error fetching movies: ", error);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        setLanguage(currentLang);
    }
});
