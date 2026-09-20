document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const menu = document.querySelector('#navbarNav');
    const navContainer = document.querySelector('.navbar .container');

    if (navContainer && !navContainer.querySelector('.language-switcher')) {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';

        const selectWrap = document.createElement('div');
        selectWrap.className = 'language-select-wrap';
        selectWrap.innerHTML = `
            <button type="button" id="site-language" class="language-select-button" aria-label="Language selector" aria-expanded="false">
                <span class="language-current">Türkçe</span>
                <span class="language-select-arrow" aria-hidden="true"><i class="fas fa-chevron-down"></i></span>
            </button>
            <div class="language-dropdown-menu" role="menu" aria-label="Language options">
                <button type="button" class="language-option is-active" data-lang="tr" role="menuitem">Türkçe</button>
                <button type="button" class="language-option" data-lang="en-GB" role="menuitem">British English</button>
            </div>
        `;

        languageSwitcher.appendChild(selectWrap);
        navContainer.insertBefore(languageSwitcher, navContainer.firstChild);
    }

    const languageSelect = document.getElementById('site-language');
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageCurrent = document.querySelector('.language-current');
    const languageMenu = document.querySelector('.language-dropdown-menu');
    const languageOptions = document.querySelectorAll('.language-option');
    let isLanguageDropdownOpen = false;
    const STORAGE_KEY = 'cevrimicikodlama-language';
    const originalTextByNode = new WeakMap();
    const translations = {
        tr: {
            'Ana Sayfa': 'Ana Sayfa',
            'Eğitimler': 'Eğitimler',
            'Blog': 'Blog',
            'Ben Kimim?': 'Ben Kimim?',
            'Deneyimler': 'Deneyimler',
            'Hemen Başla': 'Hemen Başla',
            'GELECEĞİ SENİNLE': 'GELECEĞİ SENİNLE',
            'KODLUYORUZ!': 'KODLUYORUZ!',
            'İlkokuldan liseye; blok kodlama, Python ve Yapay Zeka ile tanışın.': 'İlkokuldan liseye; blok kodlama, Python ve Yapay Zeka ile tanışın.',
            'EĞİTİM PROGRAMLARIMIZ': 'EĞİTİM PROGRAMLARIMIZ',
            'Blok Kodlama': 'Blok Kodlama',
            'Eğlenceli bloklarla algoritma dünyasına adım at!': 'Eğlenceli bloklarla algoritma dünyasına adım at!',
            'Detaylar': 'Detaylar',
            'Lise seviyesinde gerçek dünya projeleri!': 'Lise seviyesinde gerçek dünya projeleri!',
            'Yapay Zeka': 'Yapay Zeka',
            'Kendi modellerini eğit, geleceği yönet!': 'Kendi modellerini eğit, geleceği yönet!',
            'Telefon: +90 530 054 64 32': 'Telefon: +90 530 054 64 32',
            'WhatsApp: Katıl': 'WhatsApp: Katıl',
            'YouTube: Kanalı İzle': 'YouTube: Kanalı İzle',
            'E-posta: mustafa.sancak2010@gmail.com': 'E-posta: mustafa.sancak2010@gmail.com',
            'Yukarı çık': 'Yukarı çık',
            'Tüm hakları saklıdır.': 'Tüm hakları saklıdır.',
            'Merhaba, Ben Mustafa Sancak': 'Merhaba, Ben Mustafa Sancak',
            'İçerik Geliştirme Uzmanı & Robotik ve Kodlama Eğitmeni': 'İçerik Geliştirme Uzmanı & Robotik ve Kodlama Eğitmeni',
            'Eğitmenlik ve Sosyal Sorumluluk Deneyimlerim': 'Eğitmenlik ve Sosyal Sorumluluk Deneyimlerim',
            'Gönüllü Fen Bilgisi Öğretmeni': 'Gönüllü Fen Bilgisi Öğretmeni',
            'Bilgisayar ve Yazılım Eğitimi Öğretmeni': 'Bilgisayar ve Yazılım Eğitimi Öğretmeni',
            'Kodlama Dünyasından İpuçları': 'Kodlama Dünyasından İpuçları',
            'Neden Blok Kodlama?': 'Neden Blok Kodlama?',
            'Başlangıç için en hızlı öğrenme yöntemi: kodu bloklarla görselleştirerek öğrenin.': 'Başlangıç için en hızlı öğrenme yöntemi: kodu bloklarla görselleştirerek öğrenin.',
            'Devamını Oku': 'Devamını Oku',
            'Python ile Proje Yap': 'Python ile Proje Yap',
            'Oyun, hesap makinesi ve ilk veri analiz projeni Python ile öğrenerek oluştur.': 'Oyun, hesap makinesi ve ilk veri analiz projeni Python ile öğrenerek oluştur.',
            'Yapay Zeka Temel Projeleri': 'Yapay Zeka Temel Projeleri',
            'Chatbot, sınıflandırma ve basit model örnekleriyle yapay zeka adımlarını keşfet.': 'Chatbot, sınıflandırma ve basit model örnekleriyle yapay zeka adımlarını keşfet.',
            'Kodlamaya Nereden Başlamalıyım?': 'Kodlamaya Nereden Başlamalıyım?',
            'Neden kodlama öğrenmek istiyorsun?': 'Neden kodlama öğrenmek istiyorsun?',
            'Eğer sadece merak ediyorsan Blok Tabanlı Programlama ile mantığı kavramak en iyisidir. Eğer kariyer hedefliyorsan Python ile başlamak sana kapıları açar.': 'Eğer sadece merak ediyorsan Blok Tabanlı Programlama ile mantığı kavramak en iyisidir. Eğer kariyer hedefliyorsan Python ile başlamak sana kapıları açar.',
            'Günde ne kadar vakit ayırabilirsin?': 'Günde ne kadar vakit ayırabilirsin?',
            'Kodlama bir kas gibidir. Günde sadece 30 dakika bile ayırsan, bir yılın sonunda devasa bir ilerleme kaydedersin. Düzenli çalışma, zekadan daha önemlidir.': 'Kodlama bir kas gibidir. Günde sadece 30 dakika bile ayırsan, bir yılın sonunda devasa bir ilerleme kaydedersin. Düzenli çalışma, zekadan daha önemlidir.',
            'Matematik bilmem gerekiyor mu?': 'Matematik bilmem gerekiyor mu?',
            'Büyük bir yanılgı! Kodlama için dahi olmana gerek yok. Temel mantık yürütme becerisi yeterlidir. Kalan her şeyi biz sana öğreteceğiz.': 'Büyük bir yanılgı! Kodlama için dahi olmana gerek yok. Temel mantık yürütme becerisi yeterlidir. Kalan her şeyi biz sana öğreteceğiz.',
            'Kararını Verdin mi?': 'Kararını Verdin mi?',
            'Ücretsiz tanıtım derslerimize katılmak ve sana en uygun programı belirlemek için formu doldur.': 'Ücretsiz tanıtım derslerimize katılmak ve sana en uygun programı belirlemek için formu doldur.',
            'Eğitim Başvuru Formunu Doldur': 'Eğitim Başvuru Formunu Doldur',
            'Python Nedir?': 'Python Nedir?',
            'Diğer Popüler Konularımız': 'Diğer Popüler Konularımız',
            'Sıradaki Adım: Yapay Zeka': 'Sıradaki Adım: Yapay Zeka',
            'Yapay zekanın temellerini öğrenin.': 'Yapay zekanın temellerini öğrenin.',
            'Blok Tabanlı Programlama': 'Blok Tabanlı Programlama',
            'Kod yazmanın eğlenceli ve kolay yolu.': 'Kod yazmanın eğlenceli ve kolay yolu.',
            'Python, temiz sözdizimi ve kolay öğrenilirliğiyle hem çocuklar hem gençler için mükemmel bir başlangıç dilidir. Haftalar içinde oyun yapabilen, veri çeken, grafik gösteren ve robotları kontrol eden temel Python kodları yazabiliriz. Kursumuzda "değişken", "döngü", "koşul" ve "fonksiyon" gibi temel kavramları blok mantığıyla ilişkilendirerek adım adım öğretiyoruz.': 'Python, temiz sözdizimi ve kolay öğrenilirliğiyle hem çocuklar hem gençler için mükemmel bir başlangıç dilidir. Haftalar içinde oyun yapabilen, veri çeken, grafik gösteren ve robotları kontrol eden temel Python kodları yazabiliriz. Kursumuzda "değişken", "döngü", "koşul" ve "fonksiyon" gibi temel kavramları blok mantığıyla ilişkilendirerek adım adım öğretiyoruz.',
            'Programlamanın gerçek dünyadaki kullanımı için mini projeler yapıyoruz: bir not hesabı programı, basit bir hesap makinesi, Python ile veri analizi grafikleri ve oyun mantığı. Her öğrenci kendi projesini geliştirirken mantıksal düşünme, problem çözme ve yaratıcılık becerilerini güçlendirir. Bu kurs aynı zamanda ileride yapay zeka ve web geliştirmeye geçiş için sağlam bir altyapı sunar.': 'Programlamanın gerçek dünyadaki kullanımı için mini projeler yapıyoruz: bir not hesabı programı, basit bir hesap makinesi, Python ile veri analizi grafikleri ve oyun mantığı. Her öğrenci kendi projesini geliştirirken mantıksal düşünme, problem çözme ve yaratıcılık becerilerini güçlendirir. Bu kurs aynı zamanda ileride yapay zeka ve web geliştirmeye geçiş için sağlam bir altyapı sunar.'
        },
        'en-GB': {
            'Ana Sayfa': 'Home',
            'Eğitimler': 'Courses',
            'Blog': 'Blog',
            'Ben Kimim?': 'About Me',
            'Deneyimler': 'Experience',
            'Hemen Başla': 'Get Started',
            'GELECEĞİ SENİNLE': 'WE BUILD THE FUTURE',
            'KODLUYORUZ!': 'WITH YOU!',
            'İlkokuldan liseye; blok kodlama, Python ve Yapay Zeka ile tanışın.': 'Discover block coding, Python, and Artificial Intelligence from primary school to secondary school.',
            'EĞİTİM PROGRAMLARIMIZ': 'OUR TRAINING PROGRAMMES',
            'Blok Kodlama': 'Block Coding',
            'Eğlenceli bloklarla algoritma dünyasına adım at!': 'Take your first step into the world of algorithms with fun blocks!',
            'Detaylar': 'Details',
            'Lise seviyesinde gerçek dünya projeleri!': 'Real-world projects at secondary-school level!',
            'Yapay Zeka': 'Artificial Intelligence',
            'Kendi modellerini eğit, geleceği yönet!': 'Train your own models and shape the future!',
            'Telefon: +90 530 054 64 32': 'Phone: +90 530 054 64 32',
            'WhatsApp: Katıl': 'WhatsApp: Join',
            'YouTube: Kanalı İzle': 'YouTube: Watch Channel',
            'E-posta: mustafa.sancak2010@gmail.com': 'Email: mustafa.sancak2010@gmail.com',
            'Yukarı çık': 'Scroll to top',
            'Tüm hakları saklıdır.': 'All rights reserved.',
            'Merhaba, Ben Mustafa Sancak': 'Hello, I am Mustafa Sancak',
            'İçerik Geliştirme Uzmanı & Robotik ve Kodlama Eğitmeni': 'Content Development Specialist & Robotics and Coding Instructor',
            'Eğitmenlik ve Sosyal Sorumluluk Deneyimlerim': 'Teaching and Social Responsibility Experience',
            'Gönüllü Fen Bilgisi Öğretmeni': 'Volunteer Science Teacher',
            'Bilgisayar ve Yazılım Eğitimi Öğretmeni': 'Computer and Software Education Teacher',
            'Kodlama Dünyasından İpuçları': 'Tips from the Coding World',
            'Neden Blok Kodlama?': 'Why Block Coding?',
            'Başlangıç için en hızlı öğrenme yöntemi: kodu bloklarla görselleştirerek öğrenin.': 'The fastest way to begin: learn by visualising code with blocks.',
            'Devamını Oku': 'Read More',
            'Python ile Proje Yap': 'Build Projects with Python',
            'Oyun, hesap makinesi ve ilk veri analiz projeni Python ile öğrenerek oluştur.': 'Create your first game, calculator, and data-analysis project by learning Python.',
            'Yapay Zeka Temel Projeleri': 'Foundations of AI Projects',
            'Chatbot, sınıflandırma ve basit model örnekleriyle yapay zeka adımlarını keşfet.': 'Explore the steps of AI using chatbots, classification, and simple model examples.',
            'Kodlamaya Nereden Başlamalıyım?': 'Where Should I Start with Coding?',
            'Neden kodlama öğrenmek istiyorsun?': 'Why do you want to learn coding?',
            'Eğer sadece merak ediyorsan Blok Tabanlı Programlama ile mantığı kavramak en iyisidir. Eğer kariyer hedefliyorsan Python ile başlamak sana kapıları açar.': 'If you are simply curious, block-based programming is the best way to understand the logic. If you are aiming for a career, starting with Python opens many doors for you.',
            'Günde ne kadar vakit ayırabilirsin?': 'How much time can you spare each day?',
            'Kodlama bir kas gibidir. Günde sadece 30 dakika bile ayırsan, bir yılın sonunda devasa bir ilerleme kaydedersin. Düzenli çalışma, zekadan daha önemlidir.': 'Coding is like a muscle. Even just 30 minutes a day can lead to huge progress over a year. Consistent practice matters more than intelligence.',
            'Matematik bilmem gerekiyor mu?': 'Do I need to know mathematics?',
            'Büyük bir yanılgı! Kodlama için dahi olmana gerek yok. Temel mantık yürütme becerisi yeterlidir. Kalan her şeyi biz sana öğreteceğiz.': 'That is a common misconception! You do not need to be a genius to code. Basic logical thinking is enough; we will teach you the rest.',
            'Kararını Verdin mi?': 'Have you made up your mind?',
            'Ücretsiz tanıtım derslerimize katılmak ve sana en uygun programı belirlemek için formu doldur.': 'Fill in the form to join our free introductory lessons and find the most suitable programme for you.',
            'Eğitim Başvuru Formunu Doldur': 'Fill Out the Training Application Form',
            'Python Nedir?': 'What is Python?',
            'Diğer Popüler Konularımız': 'Other Popular Topics',
            'Sıradaki Adım: Yapay Zeka': 'Next Step: Artificial Intelligence',
            'Yapay zekanın temellerini öğrenin.': 'Learn the fundamentals of artificial intelligence.',
            'Blok Tabanlı Programlama': 'Block-Based Programming',
            'Kod yazmanın eğlenceli ve kolay yolu.': 'The fun and easy way to write code.',
            'Python, temiz sözdizimi ve kolay öğrenilirliğiyle hem çocuklar hem gençler için mükemmel bir başlangıç dilidir. Haftalar içinde oyun yapabilen, veri çeken, grafik gösteren ve robotları kontrol eden temel Python kodları yazabiliriz. Kursumuzda "değişken", "döngü", "koşul" ve "fonksiyon" gibi temel kavramları blok mantığıyla ilişkilendirerek adım adım öğretiyoruz.': 'Python is an excellent starting language for both children and teenagers thanks to its clean syntax and ease of learning. Within weeks, we can write basic Python code that creates games, fetches data, displays graphs, and controls robots. In our course, we teach the core concepts such as "variables", "loops", "conditions", and "functions" by relating them to block logic step by step.',
            'Programlamanın gerçek dünyadaki kullanımı için mini projeler yapıyoruz: bir not hesabı programı, basit bir hesap makinesi, Python ile veri analizi grafikleri ve oyun mantığı. Her öğrenci kendi projesini geliştirirken mantıksal düşünme, problem çözme ve yaratıcılık becerilerini güçlendirir. Bu kurs aynı zamanda ileride yapay zeka ve web geliştirmeye geçiş için sağlam bir altyapı sunar.': 'We work on mini projects to show real-world uses of programming: a grade calculator, a simple calculator, data-analysis graphs with Python, and game logic. As each student develops their own project, they strengthen logical thinking, problem-solving, and creativity. This course also provides a solid foundation for later transition into artificial intelligence and web development.'
        }
    };

    function getPreferredLanguage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'en-GB' ? 'en-GB' : 'tr';
    }

    function setPreferredLanguage(language) {
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.lang = language === 'en-GB' ? 'en-GB' : 'tr';
        document.body.dataset.lang = language;

        if (languageCurrent) {
            languageCurrent.textContent = language === 'en-GB' ? 'British English' : 'Türkçe';
        }

        if (languageOptions.length) {
            languageOptions.forEach(function (option) {
                const isActive = option.dataset.lang === language;
                option.classList.toggle('is-active', isActive);
            });
        }

        if (languageSelect) {
            languageSelect.setAttribute('aria-expanded', String(isLanguageDropdownOpen));
        }

        applyLanguage(language);
    }

    function applyLanguage(language) {
        const map = translations[language] || translations.tr;

        function replaceTextNodes(node) {
            if (!node || !node.childNodes) {
                return;
            }

            Array.from(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    const currentText = child.textContent.trim();
                    if (!currentText) {
                        return;
                    }

                    const originalText = originalTextByNode.has(child)
                        ? originalTextByNode.get(child)
                        : currentText;

                    if (!originalTextByNode.has(child)) {
                        originalTextByNode.set(child, currentText);
                    }

                    const translated = map[originalText] || originalText;
                    if (translated !== child.textContent) {
                        child.textContent = translated;
                    }
                } else if (child.nodeType === 1 && !['SCRIPT', 'STYLE', 'SELECT', 'OPTION'].includes(child.tagName)) {
                    replaceTextNodes(child);
                }
            });
        }

        replaceTextNodes(document.body);

        const titleMap = {
            tr: 'Çevrimiçi Kodlama | Geleceği Kodla',
            'en-GB': 'Online Coding | Code the Future'
        };
        const currentTitle = document.title.trim();
        if (currentTitle && !currentTitle.includes('Online Coding') && !currentTitle.includes('Çevrimiçi')) {
            document.title = titleMap[language] || titleMap.tr;
        } else {
            document.title = titleMap[language] || titleMap.tr;
        }

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', language === 'en-GB'
                ? 'Online coding lessons and technology education for children and young people, with block coding, Python, and Artificial Intelligence programmes.'
                : 'Ege Üniversitesi mezunu eğitmenden kodlama dünyasına dair rehber içerikler. Çocuklar için programlama ve teknoloji tavsiyeleri.');
        }
    }

    if (languageSelect) {
        const syncLanguageState = function () {
            if (!languageSwitcher) {
                return;
            }
            languageSwitcher.classList.toggle('open', isLanguageDropdownOpen);
            languageSelect.setAttribute('aria-expanded', String(isLanguageDropdownOpen));
        };

        languageSelect.addEventListener('click', function (event) {
            event.stopPropagation();
            isLanguageDropdownOpen = !isLanguageDropdownOpen;
            syncLanguageState();
        });

        languageOptions.forEach(function (option) {
            option.addEventListener('click', function (event) {
                event.stopPropagation();
                const selectedLanguage = option.dataset.lang;
                setPreferredLanguage(selectedLanguage);
                isLanguageDropdownOpen = false;
                syncLanguageState();
            });
        });

        document.addEventListener('click', function (event) {
            if (languageSwitcher && !languageSwitcher.contains(event.target)) {
                isLanguageDropdownOpen = false;
                syncLanguageState();
            }
        });
    }

    if (toggler && menu) {
        const setMenuState = function (isOpen) {
            menu.classList.toggle('show', isOpen);
            toggler.classList.toggle('collapsed', !isOpen);
            toggler.setAttribute('aria-expanded', String(isOpen));
        };

        toggler.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            setMenuState(!menu.classList.contains('show'));
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 991) {
                    setMenuState(false);
                }
            });
        });

        document.addEventListener('click', function (event) {
            const clickedInsideMenu = menu.contains(event.target);
            const clickedToggler = toggler.contains(event.target);

            if (!clickedInsideMenu && !clickedToggler) {
                setMenuState(false);
            }
        });
    }

    setPreferredLanguage(getPreferredLanguage());
});
