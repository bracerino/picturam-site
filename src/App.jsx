import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 9;

  const photoAuthors = [
    "Author 1", "Author 2", "Author 3", "Author 4", "Author 5", 
    "Author 6", "Author 7", "Author 8", "Author 9"
  ];

  const nextImage = () => {
    setCurrentImage(prev => prev === totalImages ? 1 : prev + 1);
  };

  const prevImage = () => {
    setCurrentImage(prev => prev === 1 ? totalImages : prev - 1);
  };

  const goToImage = (imageNum) => {
    setCurrentImage(imageNum);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative mb-8">
        <img 
          src={`/picturam-site/gallery-${currentImage}.jpg`} 
          alt={`Galerie foto ${currentImage} z představení Picturam`} 
          className="w-full h-[600px] object-cover rounded-xl shadow-2xl"
        />
        
        <button 
          onClick={prevImage}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-6 right-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-lg font-medium">
          {currentImage} / {totalImages}
        </div>

        <div className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
          Foto: {photoAuthors[currentImage - 1]}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
        {Array.from({ length: totalImages }, (_, index) => index + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToImage(num)}
            className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
              currentImage === num 
                ? 'ring-4 ring-red-500 scale-105' 
                : 'hover:scale-105 opacity-70 hover:opacity-100'
            }`}
          >
            <img 
              src={`/picturam-site/gallery-${num}.jpg`} 
              alt={`Náhled foto ${num}`} 
              className="w-full h-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const PicturamWebsite = () => {
  const [currentSection, setCurrentSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.person) {
        setSelectedPerson(event.state.person);
      } else {
        setSelectedPerson(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigationItems = [
    { key: 'overview', label: 'Přehled' },
    { key: 'o-predstaveni', label: 'O představení' },
    { key: 'tym', label: 'Tým' },
    { key: 'galerie', label: 'Galerie' },
    { key: 'film', label: 'Film' },
    { key: 'kontakt', label: 'Kontakt' }
  ];

  const teamInfo = [
    { 
      role: "Choreografie a režie", 
      names: "Eva Rezová",
      people: [
        { 
          name: "Eva Rezová", 
          about: `Tanci se věnuje již od dětství. Během studia na konzervatoři Duncan Centre se účastnila projektu Svěcení jara v nastudování Jiřího Bartovance, které slavilo úspěchy v Czech Center New York i na českých festivalech. Dále se podílela na projektu japonské choreografky Yoshiko Chuma v rámci pražské výstavy Secret Journey. Jako tanečnice a choreografka byla součástí projektu na festivalu v Takaoka v Japonsku.

Vytvořila choreografii ke Koncertu pro Mr. Shakespeara s hudbou Daniela Fikejze v rámci Letních shakespearovských slavností 2022. S divadlem J.K.Tyla spolupracovala jako choreografka na muzikálu Kouzelné hodinky doktora Kronera, Kozí válka a Company.

Zúčastnila se studijních pobytů na Royal Conservatoire Antwerp v Belgii a na National Taiwan University of Arts. V současnosti se jako interpretka a choreografka účastní mnoha uměleckých projektů a zároveň se věnuje pedagogické činnosti.` 
        }
      ]
    },
    { 
      role: "Interpretace", 
      names: "Adam Rameš, David Kodys, Jakub Kohout, Jakub Sedláček, Jan Drahokoupil",
      people: [
        { name: "Adam Rameš", about: "" },
        { name: "David Kodys", about: "" },
        { name: "Jakub Kohout", about: "" },
        { name: "Jakub Sedláček", about: "" },
        { name: "Jan Drahokoupil", about: "" }
      ]
    },
    { 
      role: "Hudba", 
      names: "Alesandro Marcello, G. B. Pergolesi, P. I. Tchaikovsky",
      people: [
        { name: "Alesandro Marcello", about: "" },
        { name: "G. B. Pergolesi", about: "" },
        { name: "P. I. Tchaikovsky", about: "" }
      ]
    },
    { 
      role: "Sound design", 
      names: "Sarah Jedličková",
      people: [
        { 
          name: "Sarah Jedličková", 
          about: `Sarah Jedličková – violoncello / hudební režie
Sarah Jedličková působí jako violoncellistka, hudební režisérka a performerka. Vystudovala hru na violoncello na Pražské konzervatoři pod vedením Michala Kaňky a hudební režii na Hudební a taneční fakultě AMU v Praze, kde v roce 2023 dokončila magisterské studium a pokračuje v doktorském programu.

V akademickém roce 2020/2021 absolvovala stáž na Sibeliově akademii v Helsinkách, kde se věnovala elektroakustické kompozici a hře na violoncello. V roce 2022 obdržela Cenu Hlávkovy nadace.

Jako interpretka se představila na sólových recitálech v České republice, Makedonii, Kanadě a Finsku a pravidelně vystupuje na koncertech Nadace Bohuslava Martinů. Hudební režii realizuje ve spolupráci se sólisty (Svetlana Smolina, Vladimir Milošević, Gert Hecher), komorními soubory (Kukal Quartet, Corvus Quartet) i orchestry, jako je Barokní orchestr Pražské konzervatoře nebo Český národní symfonický orchestr.

Dlouhodobě se zajímá o mezioborovou tvorbu a sound design. Spolupracovala např. na projektech UMPRUM.wav (Salone del Mobile, Miláno), Picturam (taneční představení Evi Rezové), Out of Comfort (Michaela Dzurovčínová), Schena Maaro (módní performance pro návrhářku Sylvii Leitmannovou) či Protagonista (Jan Razima).` 
        }
      ]
    },
    { 
      role: "Scénografie", 
      names: "Ivo Jedlička",
      people: [
        { name: "Ivo Jedlička", about: "" }
      ]
    },
    { 
      role: "Kostým", 
      names: "Polina Akhmetzhanova",
      people: [
        { name: "Polina Akhmetzhanova", about: "" }
      ]
    },
    { 
      role: "Light design", 
      names: "Tomáš Morávek",
      people: [
        { name: "Tomáš Morávek", about: "" }
      ]
    },
    { 
      role: "Produkce", 
      names: "Natálie Matysková, Samuel Loj",
      people: [
        { 
          name: "Natálie Matysková", 
          about: `Natálie Matysková (*1996)
Vystudovala Pražskou taneční konzervatoř a poté bakalářský a magisterský program oboru Choreografie na Katedře tance HAMU, vzdělání si doplnila dvouletým studiem Divadelní produkce na DAMU. Čtyři roky působila jako pedagog tanečního oboru na ZUŠ Litoměřice, v současnosti učí tanec na ZUŠ Ilji Hurníka v Praze a vede produkční praxe na Katedře tance HAMU.

Kromě pedagogiky se věnuje produkci tanečních projektů – je výkonnou ředitelkou uměleckého kolektivu Dočasná Company a spoluorganizátorkou několika dalších projektů. Méně často, ale s o to větší radostí, se věnuje také interpretaci, v současnosti účinkuje v inscenacích Jak Zojka pomohla Zemi dýchat (Dočasná Company) a Vánoce s Choreou (Chorea Bohemica).` 
        },
        { name: "Samuel Loj", about: "" }
      ]
    }
  ];

  const keywords = ["tanec", "mužská energie", "dynamika", "síla", "agrese", "napětí", "očištění"];

  const ImagePlaceholder = ({ children, className = "", style = {} }) => (
    <div 
      className={`flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-400 rounded-xl text-gray-600 font-medium ${className}`}
      style={style}
    >
      {children}
    </div>
  );

  const OverviewSection = ({ title, children, id, delay = 0 }) => (
    <section 
      id={id}
      className={`min-h-screen flex items-center py-20 transform transition-all duration-1000 ${
        scrollY > delay ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="w-full">
        <h2 className="text-5xl font-bold text-gray-800 mb-12 text-center">{title}</h2>
        {children}
      </div>
    </section>
  );

  const ScrollIndicator = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
      <div className="flex flex-col items-center">
        <p className="text-sm font-light tracking-[0.2em] mb-4 opacity-80">POKRAČUJTE</p>
        <div className="flex flex-col space-y-2">
          <svg 
            className="w-6 h-6 opacity-40"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{
              animation: 'fadeInOut 3s ease-in-out infinite',
              animationDelay: '0s'
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-6 h-6 opacity-60"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{
              animation: 'fadeInOut 3s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-6 h-6 opacity-80"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{
              animation: 'fadeInOut 3s ease-in-out infinite',
              animationDelay: '1s'
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-0">
      <section className="min-h-screen flex flex-col text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/picturam-site/main-hero-image.jpg" 
            alt="Picturam - Současný tanec inspirovaný Poslední večeří" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="max-w-4xl mx-auto px-8 text-center">
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in drop-shadow-2xl">
                Picturam
              </h1>
              <p className="text-2xl md:text-3xl mb-6 italic opacity-90 drop-shadow-lg">
                Současný tanec inspirovaný dílem Leonarda Da Vinci
              </p>
              <p className="text-lg mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                Choreografie zkoumá převedení statického obrazu "Poslední večeře" 
                do živé jevištní podoby v současném světě mužského společenství
              </p>
            </div>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Žánr</h3>
              <p className="text-gray-600">Současný tanec</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Délka</h3>
              <p className="text-gray-600">40 minut</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Obsazení</h3>
              <p className="text-gray-600">5 tanečníků</p>
            </div>
          </div>
        </div>
      </section>

      <OverviewSection title="O představení" id="about" delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Premiéra</h3>
              <p className="text-lg text-gray-200">1. 5. 2023, PONEC - divadlo pro tanec, Praha</p>
            </div>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Inspirace</h3>
              <p className="text-gray-200 leading-relaxed">
                Choreografie vychází z výtvarného umění a zkoumá převedení statického obrazu 
                do jevištní živé podoby. Inspirací se stal známý obraz <strong>Poslední večeře </strong> 
                slavného malíře Leonarda Da Vinci.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-transform"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <img 
              src="/picturam-site/performance-scene-1.jpg" 
              alt="Hlavní scéna z představení Picturam" 
              className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </OverviewSection>

      <OverviewSection title="" id="images" delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="group">
              <img 
                src={`/picturam-site/gallery-${num}.jpg`} 
                alt={`Foto ${num} z představení Picturam`} 
                className="w-full h-[32rem] object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </OverviewSection>

      <OverviewSection title="Kontakt" id="contact-preview" delay={500}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6">Objednejte si představení</h3>
            <p className="text-lg mb-8 opacity-90">
              Pro objednání představení, technické dotazy nebo další informace nás neváhejte kontaktovat.
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:picturam.eva.rez@gmail.com"
                className="flex items-center space-x-3 text-lg hover:text-gray-200 transition-colors"
              >
                <span className="text-2xl">📧</span>
                <span>picturam.eva.rez@gmail.com</span>
              </a>
              <div className="flex items-center space-x-3 text-lg">
                <span className="text-2xl">📞</span>
                <span>+420 739 740 163 (Produkce)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Technické požadavky</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3">
                <div>
                  <strong>Prostor:</strong> min. 12 × 12 × 6 m
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div>
                  <strong>Zvuk:</strong> reprodukovaná hudba
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div>
                  <strong>Scénografie:</strong> 4× stůl + rekvizity
                </div>
              </div>
            </div>
          </div>
        </div>
      </OverviewSection>
    </div>
  );

  const renderDetailSection = () => {
    switch (currentSection) {
      case 'o-predstaveni':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3">O představení</h2>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3 mb-4">Anotace</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-gray-700 shadow-lg">
                  <p className="text-gray-700 leading-relaxed">
                    Choreografie vychází z výtvarného umění a zkoumá převedení statického obrazu do jevištní živé podoby. 
                    Inspirací pro choreografii se stal známý obraz <strong>Poslední večeře</strong> slavného malíře Leonarda Da Vinci. 
                    Téma se zabývá historickou podobou obrazu, jejím rozpracováním a zasazením do současného světa mužského společenství.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3 mb-4">Představení</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-gray-700 shadow-lg">
                  <div className="space-y-3 text-gray-700">
                    <p><strong>1. 5. 2023</strong> Premiéra, Ponec-divadlo pro tanec, Praha</p>
                    <p><strong>27. 5. 2023</strong> Nová generace, divadlo DISK, Praha</p>
                    <p><strong>23. 6. 2023</strong> festival Siraex, Klášterec nad Ohří</p>
                    <p><strong>1. 10. 2023</strong> Nová generace, divadlo DISK, Praha</p>
                    <p><strong>20. 7. 2024</strong> festival Kukokli, kostel Navštívení Panny Marie, Horní Vítkov</p>
                    <p><strong>27. 11. 2024</strong> představení u příležitosti návratu gotické dřevořezby večeře Páně, kostel Narození svatého Jana Křtitele, Zeměchy</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3 mb-4">Klíčová slova</h3>
                <div className="flex flex-wrap gap-3">
                  {keywords.map((keyword, index) => (
                    <span key={index} className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3 mb-4">Technické požadavky inscenace</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-gray-700 shadow-lg space-y-6">
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Prostor</h4>
                    <div className="text-gray-700 leading-relaxed space-y-2">
                      <p><strong>Rozměry:</strong> min 12 × 12 m</p>
                      <p><strong>Podlaha:</strong> černý baletizol</p>
                      <p><strong>Výkryty:</strong> černé sametové výkryty po stranách s možností vstupu na jeviště z několika bodů, černý sametový horizont ve dvou kusech - možnost uprostřed rozevřít na mezeru o šířce cca 1 m</p>
                      <p><strong>Adaptabilita:</strong> lze taktéž adaptovat na nedivadelní prostory</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Scénografie a rekvizity (vše vozíme vlastní)</h4>
                    <div className="text-gray-700 leading-relaxed space-y-2">
                      <p><strong>Stoly:</strong> 4× stoly o rozměrech 76 × 139 × 60 cm - kovová konstrukce a překližková deska, nohy stolů jsou podlepeny filcem, aby klouzaly po baletizolu; během představení je s nimi manipulováno</p>
                      <p><strong>Černo-zlatá látka:</strong> o rozměrech cca 11 × 1,5 m</p>
                      <p><strong>Tibetská mísa a palička:</strong> mísa je naplněna vodou</p>
                      <p><strong>Bílá látka:</strong> o rozměrech cca 20 × 1 m</p>
                      <p><strong>Karafa s červeným vínem:</strong> víno je na konci představení částečně vyléváno, většinu tekutiny ovšem vsákne bílá látka</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Zvuk</h4>
                    <div className="text-gray-700 leading-relaxed space-y-2">
                      <p><strong>Živý mix:</strong> odbavuje Sarah Jedličková; v případě její nepřítomnosti lze mít hudbu v jednom tracku na flashdisku (v takovém případě potřebujeme zajistit zvukaře)</p>
                      <p><strong>Aparatura:</strong> standardní zvuková aparatura divadla + 1 sběrný mikrofon pro snímání zvuku tibetské mísy (pouze v případě živého mixu)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Světla</h4>
                    <div className="text-gray-700 leading-relaxed space-y-2">
                      <p>Na další straně přiložen lightplot z premiéry, jsme ovšem schopni přizpůsobit se technickým možnostem divadla/prostoru</p>
                      <p><strong>Světelný technik:</strong> v tvůrčím týmu nemáme světelného technika - potřebujeme jej ideálně zajistit, po domluvě jej může zajistit také projekt sám</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Další technika</h4>
                    <div className="text-gray-700 leading-relaxed">
                      <p><strong>Hazer</strong></p>
                    </div>
                  </div>

                  <p className="text-gray-700 italic pt-4 border-t border-gray-300">
                    Lightplot a další detaily technických požadavků jsou k nalezení v{' '}
                    <a 
                      href="https://docs.google.com/document/d/1j46pklQYYJqYjDM6avl7JyuczVnZjuhz-93g9Sop0ic/edit?tab=t.0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-500 underline hover:text-red-600"
                    >
                      online technickém rideru
                    </a>.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <img 
                src="/picturam-site/rehearsal-1.jpg" 
                alt="Foto ze zkoušky 1" 
                className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
              />
              <img 
                src="/picturam-site/rehearsal-2.jpg" 
                alt="Foto ze zkoušky 2" 
                className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        );

      case 'tym':
        return (
          <div className="space-y-8">
            {selectedPerson ? (
              <div className="space-y-6">
                <button 
                  onClick={() => {
                    setSelectedPerson(null);
                    window.history.pushState(null, '', '#tym');
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Zpět na tým</span>
                </button>
                
                <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3">{selectedPerson.name}</h2>
                
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      {selectedPerson.name === "Natálie Matysková" ? (
                        <img 
                          src="/picturam-site/natmat.png" 
                          alt="Natálie Matysková" 
                          className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                      ) : selectedPerson.name === "Eva Rezová" ? (
                        <img 
                          src="/picturam-site/everez.png" 
                          alt="Eva Rezová" 
                          className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-sm">
                          Foto
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">O osobě</h3>
                        {selectedPerson.about ? (
                          <div className="bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed whitespace-pre-line">
                            {selectedPerson.about}
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-4 rounded-lg text-gray-500 italic">
                            Informace budou doplněny později
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3">Tvůrčí tým</h2>
                
                <div className="space-y-6">
                  {teamInfo.map((section, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{section.role}</h3>
                      <div className="flex flex-wrap gap-3">
                        {section.people.map((person, personIndex) => (
                          <button
                            key={personIndex}
                            onClick={() => {
                              setSelectedPerson(person);
                              window.history.pushState({ person }, '', `#tym-${person.name.toLowerCase().replace(/\s+/g, '-')}`);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 hover:shadow-md"
                          >
                            {person.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'kontakt':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3">Kontakt</h2>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-gray-700 shadow-lg">
              <p className="text-gray-700 leading-relaxed">
                Pro objednání představení, technické dotazy nebo další informace nás neváhejte kontaktovat. 
                Rádi zodpovíme všechny vaše otázky týkající se představení Picturam.
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6 rounded-xl text-center shadow-lg">
              <h4 className="text-xl font-bold mb-3">📧 Email projektu</h4>
              <p className="text-lg">
                <a 
                  href="mailto:picturam.eva.rez@gmail.com" 
                  className="text-white underline hover:text-gray-200 transition-colors"
                >
                  picturam.eva.rez@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📞 Telefonní kontakty</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border-l-4 border-gray-700 shadow-lg">
                  <div className="flex items-center space-x-6 mb-4">
                    <img 
                      src="/picturam-site/natmat.png" 
                      alt="Natálie Matysková" 
                      className="w-24 h-24 rounded-full object-cover shadow-lg flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-gray-700 text-2xl font-bold">Natálie Matysková</h4>
                      <p className="text-gray-600 text-lg"><strong>Pozice:</strong> Produkce</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    <strong>Telefon:</strong>{' '}
                    <a 
                      href="tel:+420739740163" 
                      className="text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      +420 739 740 163
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border-l-4 border-gray-700 shadow-lg">
                  <div className="flex items-center space-x-6 mb-4">
                    <img 
                      src="/picturam-site/everez.png" 
                      alt="Eva Rezová" 
                      className="w-24 h-24 rounded-full object-cover shadow-lg flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-gray-700 text-2xl font-bold">Eva Rezová</h4>
                      <p className="text-gray-600 text-lg"><strong>Pozice:</strong> Choreografka</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg">
                    <strong>Telefon:</strong>{' '}
                    <a 
                      href="tel:+420739748687" 
                      className="text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      +420 739 748 687
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'galerie':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3">Galerie</h2>
            
            <h3 className="text-2xl font-bold text-gray-700">Fotografie z představení</h3>
            
            <ImageCarousel />
          </div>
        );

      case 'film':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-700 pb-3">Film</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Trailer</h3>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/EZF-TwQdalw"
                    title="Picturam - Film Trailer"
                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-700 pb-2">Ceny</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-500 italic">
                    Informace budou doplněny později
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-700 pb-2">Tvůrčí tým filmu</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-500 italic">
                    Informace budou doplněny později
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-700 pb-2">Poděkování</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-500 italic">
                    Informace budou doplněny později
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Picturam</h1>
            <p className="text-gray-300 text-sm">Současný tanec</p>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentSection(item.key);
                  setIsSidebarOpen(false);
                  setSelectedPerson(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentSection === item.key
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-12 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold text-sm text-gray-300 mb-2">Rychlý kontakt</h3>
            <a 
              href="mailto:picturam.eva.rez@gmail.com"
              className="text-xs text-gray-400 hover:text-white transition-colors block mb-1"
            >
              📧 picturam.eva.rez@gmail.com
            </a>
            <a 
              href="tel:+420739740163"
              className="text-xs text-gray-400 hover:text-white transition-colors block"
            >
              📞 +420 739 740 163
            </a>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold text-sm text-gray-300 mb-3">Jazyk / Language</h3>
            <div className="flex space-x-3">
              <a 
                href="https://bracerino.github.io/picturam-site/"
                className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                title="Čeština"
              >
                <span className="text-sm font-bold text-white">CZ</span>
              </a>
              <a 
                href="https://bracerino.github.io/en-picturam-site/"
                className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                title="English"
              >
                <span className="text-sm font-bold text-white">EN</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`h-0.5 bg-white transform transition-transform ${isSidebarOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
          <div className={`h-0.5 bg-white transition-opacity ${isSidebarOpen ? 'opacity-0' : ''}`}></div>
          <div className={`h-0.5 bg-white transform transition-transform ${isSidebarOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
        </div>
      </button>

      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 lg:ml-64">
        <div className="min-h-screen">
          {currentSection === 'overview' ? (
            renderOverview()
          ) : (
            <div className="max-w-6xl mx-auto px-6 py-12">
              {renderDetailSection()}
            </div>
          )}
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
            <p className="mb-2">© 2025 Picturam - Současný tanec</p>
            <p className="italic">Inspirováno dílem Leonarda Da Vinci "Poslední večeře"</p>
          </div>
        </footer>

        <style jsx>{`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
      </main>
    </div>
  );
};

export default PicturamWebsite;
