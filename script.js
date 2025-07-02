document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            headerDemo: "See The Demo",
            heroTitle: `Don't just watch movies. <br class="hidden md:block" /> <span class="gold-accent">Learn from them.</span>`,
            heroSubtitle: "Project Socrates is a new perspective on cinema that turns entertainment into a tool for self-development.",
            heroButton: "Learn how it works",
            problemTitle: `"I just spent two hours of my life. <br class="hidden md:block" /> For what?"`,
            problemSubtitle: "Millions of people watch movies but rarely take away anything more than fleeting emotions. We solve the problem of 'wasted time' by turning passive viewing into a conscious experience.",
            solutionTitle: `We break down plots <br class="hidden md:block" /> into <span class="gold-accent">atoms of wisdom.</span>`,
            solutionSubtitle: "Our unique 6-agent AI system conducts a deep analysis of the script to uncover practical and valuable lessons for you.",
            demoTitle: "See It in Action",
            demoSubtitle: "Explore the interactive demo to see how Project Socrates integrates with a familiar interface.",
            demoButton: "Launch Interactive Demo"
        },
        pl: {
            headerDemo: "Zobacz Demo",
            heroTitle: `Nie tylko oglądaj filmy. <br class="hidden md:block" /> <span class="gold-accent">Ucz się od nich.</span>`,
            heroSubtitle: "Project Socrates to nowe spojrzenie na kino, które zamienia rozrywkę w narzędzie do samorozwoju.",
            heroButton: "Dowiedz się, jak to działa",
            problemTitle: `"Właśnie straciłem dwie godziny życia. <br class="hidden md:block" /> Po co?"`,
            problemSubtitle: "Miliony ludzi oglądają filmy, ale rzadko wynoszą z nich coś więcej niż ulotne emocje. Rozwiązujemy problem 'straconego czasu', zamieniając bierne oglądanie w świadome doświadczenie.",
            solutionTitle: `Rozkładamy fabuły <br class="hidden md:block" /> na <span class="gold-accent">atomy mądrości.</span>`,
            solutionSubtitle: "Nasz unikalny 6-agentowy system AI przeprowadza głęboką analizę scenariusza, aby odkryć dla Ciebie praktyczne i cenne lekcje.",
            demoTitle: "Zobacz w Akcji",
            demoSubtitle: "Odkryj interaktywne demo, aby zobaczyć, jak Project Socrates integruje się ze znanym interfejsem.",
            demoButton: "Uruchom Interaktywne Demo"
        }
    };

    const langSwitcher = document.getElementById('lang-switcher');
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
    }

    langSwitcher.addEventListener('click', (e) => {
        if (e.target.matches('.lang-btn')) {
            setLanguage(e.target.dataset.lang);
        }
    });

    // Set initial language on page load
    setLanguage(currentLang);
});
