document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            headerDemo: "See The Demo",
            heroTitle: `Don't just watch movies. <br class="hidden md:block" /> <span class="gold-accent">Learn from them.</span>`,
            heroSubtitle: "Project Socrates is a new perspective on cinema that turns entertainment into a tool for self-development.",
            heroButton: "Learn how it works",
            problemTitle: `"I just spent two hours of my life. <br class="hidden md:block" /> For what?"`,
            problemSubtitle: "Millions of people watch movies but rarely take away anything more than fleeting emotions. We solve the problem of 'wasted time' by turning passive viewing into a conscious experience.",
            problemCard1Title: "Forgotten Plot",
            problemCard1Text: "85% of viewers can't recall key plot details just one week later.",
            problemCard2Title: "Passive Fun",
            problemCard2Text: "Watching movies is often just a way to 'kill time' with no long-term benefit.",
            problemCard3Title: "Lost Lessons",
            problemCard3Text: "Every movie contains valuable lessons, but they remain hidden behind the plot.",
            solutionTitle: `We break down plots <br class="hidden md:block" /> into <span class="gold-accent">atoms of wisdom.</span>`,
            solutionSubtitle: "Our unique 6-agent AI system conducts a deep analysis of the script to uncover practical and valuable lessons for you.",
            agent1: "Analyst",
            agent1Desc: "Creates a summary",
            agent2: "Psychologist",
            agent2Desc: "Identifies problems",
            agent3: "Strategist",
            agent3Desc: "Describes the approach",
            agent4: "Mentor",
            agent4Desc: "Formulates a lesson",
            agent5: "Editor",
            agent5Desc: "Evaluates quality",
            agent6: "Marketer",
            agent6Desc: "Creates a value prop",
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
            problemCard1Title: "Zapomniana fabuła",
            problemCard1Text: "85% widzów nie pamięta kluczowych szczegółów fabuły już po tygodniu.",
            problemCard2Title: "Bierna rozrywka",
            problemCard2Text: "Oglądanie filmów to często tylko sposób na 'zabicie czasu', bez długoterminowych korzyści.",
            problemCard3Title: "Utracone lekcje",
            problemCard3Text: "Każdy film zawiera cenne lekcje, ale pozostają one ukryte za fabułą.",
            solutionTitle: `Rozkładamy fabuły <br class="hidden md:block" /> na <span class="gold-accent">atomy mądrości.</span>`,
            solutionSubtitle: "Nasz unikalny 6-agentowy system AI przeprowadza głęboką analizę scenariusza, aby odkryć dla Ciebie praktyczne i cenne lekcje.",
            agent1: "Analityk",
            agent1Desc: "Tworzy podsumowanie",
            agent2: "Psycholog",
            agent2Desc: "Identyfikuje problemy",
            agent3: "Strateg",
            agent3Desc: "Opisuje podejście",
            agent4: "Mentor",
            agent4Desc: "Formułuje lekcję",
            agent5: "Redaktor",
            agent5Desc: "Ocenia jakość",
            agent6: "Marketer",
            agent6Desc: "Tworzy wartość",
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

    setLanguage(currentLang);
});
