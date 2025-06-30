import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 9;

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
      {/* Main Image Display */}
      <div className="relative mb-8">
        <img 
          src={`/gallery-${currentImage}.jpg`} 
          alt={`Galerie foto ${currentImage} z představení Picturam`} 
          className="w-full h-[600px] object-cover rounded-xl shadow-2xl"
        />
        
        {/* Navigation Arrows */}
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

        {/* Image Counter */}
        <div className="absolute bottom-6 right-6 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-lg font-medium">
          {currentImage} / {totalImages}
        </div>
      </div>

      {/* Thumbnail Navigation */}
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
              src={`/gallery-${num}.jpg`} 
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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { key: 'overview', label: 'Přehled', icon: '🏠' },
    { key: 'o-predstaveni', label: 'O představení', icon: '🎭' },
    { key: 'tym', label: 'Tým', icon: '👥' },
    { key: 'kontakt', label: 'Kontakt', icon: '📞' },
    { key: 'galerie', label: 'Galerie', icon: '🖼️' },
    { key: 'cv', label: 'O autorce', icon: '📋' }
  ];

  const teamInfo = [
    { role: "Choreografie a režie", names: "Eva Rezová" },
    { role: "Interpretace", names: "Adam Rameš, David Kodys, Jakub Kohout, Jakub Sedláček, Jan Drahokoupil" },
    { role: "Hudba", names: "Sarah Jedličková, Alesandro Marcello, G. B. Pergolesi, P. I. Tchaikovsky" },
    { role: "Scénografie", names: "Ivo Jedlička" },
    { role: "Kostým", names: "Polina Akhmetzhanova" },
    { role: "Light design", names: "Tomáš Morávek" },
    { role: "Produkce", names: "Natálie Matysková, Samuel Loj" }
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
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center animate-bounce">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
        <svg 
          className="w-6 h-6 opacity-75" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-0">
      {/* Hero Section with Background Image */}
      <section className="min-h-screen flex flex-col text-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/main-hero-image.jpg" 
            alt="Picturam - Současný tanec inspirovaný Poslední večeří" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="max-w-4xl mx-auto px-8 text-center">
            
            {/* Centered text content */}
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-xl">
                  <div className="text-4xl mb-3">🎭</div>
                  <h3 className="text-xl font-bold mb-2">Žánr</h3>
                  <p>Současný tanec</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-xl">
                  <div className="text-4xl mb-3">⏱️</div>
                  <h3 className="text-xl font-bold mb-2">Délka</h3>
                  <p>40 minut</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-xl">
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="text-xl font-bold mb-2">Obsazení</h3>
                  <p>5 tanečníků</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-red-500 bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-8 w-12 h-12 bg-purple-400 bg-opacity-20 rounded-full animate-ping"></div>
      </section>

      {/* About Section */}
      <OverviewSection title="O představení" id="about" delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-purple-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Premiéra</h3>
              <p className="text-lg text-gray-700">1. 5. 2023, PONEC - divadlo pro tanec, Praha</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Inspirace</h3>
              <p className="text-gray-700 leading-relaxed">
                Choreografie vychází z výtvarného umění a zkoumá převedení statického obrazu 
                do jevištní živé podoby. Inspirací se stal známý obraz <strong>Poslední večeře</strong> 
                slavného malíře Leonarda Da Vinci.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-transform"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <img 
              src="/performance-scene-1.jpg" 
              alt="Hlavní scéna z představení Picturam" 
              className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </OverviewSection>

      {/* Performance Images */}
      <OverviewSection title="" id="images" delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="group">
              <img 
                src={`/gallery-${num}.jpg`} 
                alt={`Foto ${num} z představení Picturam`} 
                className="w-full h-[32rem] object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </OverviewSection>

      {/* Team Preview */}
      <OverviewSection title="Tvůrčí tým" id="team-preview" delay={500}>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                ER
              </div>
              <h3 className="text-xl font-bold text-gray-800">Eva Rezová</h3>
              <p className="text-gray-600">Choreografie a režie</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                5
              </div>
              <h3 className="text-xl font-bold text-gray-800">Tanečníci</h3>
              <p className="text-gray-600">Adam, David, Jakub, Jakub, Jan</p>
            </div>
          </div>
        </div>
      </OverviewSection>

      {/* Contact Preview */}
      <OverviewSection title="Kontakt" id="contact-preview" delay={700}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-12 rounded-3xl shadow-xl">
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
                <span className="text-xl">📐</span>
                <div>
                  <strong>Prostor:</strong> min. 12 × 12 × 6 m
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">🎵</span>
                <div>
                  <strong>Zvuk:</strong> reprodukovaná hudba
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">🪑</span>
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
              <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-red-500 pb-3">O představení</h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
                <strong className="text-gray-800">Premiéra inscenace:</strong><br />
                <span className="text-gray-700">1. 5. 2023, PONEC - divadlo pro tanec, Praha</span>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-3 mb-4">Anotace</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
                  <p className="text-gray-700 leading-relaxed">
                    Choreografie vychází z výtvarného umění a zkoumá převedení statického obrazu do jevištní živé podoby. 
                    Inspirací pro choreografii se stal známý obraz <strong>Poslední večeře</strong> slavného malíře Leonarda Da Vinci. 
                    Téma se zabývá historickou podobou obrazu, jejím rozpracováním a zasazením do současného světa mužského společenství.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-3 mb-4">Klíčová slova</h3>
                <div className="flex flex-wrap gap-3">
                  {keywords.map((keyword, index) => (
                    <span key={index} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-800 border-b-4 border-red-500 pb-3 mb-4">Technické informace</h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Prostor:</strong> min. 12 × 12 × 6 m, černý baletizol, černé výkryty
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Scénografie:</strong> 4× stůl o rozměrech 76 × 139 × 60 cm - kovová konstrukce a překližková deska, 
                    během představení je s nimi manipulováno; dále několik drobnějších rekvizit
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Zvuk:</strong> reprodukovaná hudba
                  </p>
                  <p className="text-gray-700 italic">
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
                src="/rehearsal-1.jpg" 
                alt="Foto ze zkoušky 1" 
                className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
              />
              <img 
                src="/rehearsal-2.jpg" 
                alt="Foto ze zkoušky 2" 
                className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        );

      case 'tym':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-red-500 pb-3">Tvůrčí tým</h2>
            
            <div className="space-y-4">
              {teamInfo.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <strong className="text-gray-800 text-lg">{member.role}:</strong><br />
                  <span className="text-gray-600">{member.names}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'kontakt':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-red-500 pb-3">Kontakt</h2>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
              <p className="text-gray-700 leading-relaxed">
                Pro objednání představení, technické dotazy nebo další informace nás neváhejte kontaktovat. 
                Rádi zodpovíme všechny vaše otázky týkající se představení Picturam.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl text-center shadow-lg">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
                  <h4 className="text-red-500 text-xl font-bold mb-3">Natálie Matysková</h4>
                  <p className="text-gray-700 mb-2"><strong>Pozice:</strong> Produkce</p>
                  <p className="text-gray-700">
                    <strong>Telefon:</strong>{' '}
                    <a 
                      href="tel:+420739740163" 
                      className="text-gray-800 hover:text-red-500 transition-colors"
                    >
                      +420 739 740 163
                    </a>
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-red-500 shadow-lg">
                  <h4 className="text-red-500 text-xl font-bold mb-3">Eva Rezová</h4>
                  <p className="text-gray-700 mb-2"><strong>Pozice:</strong> Choreografka</p>
                  <p className="text-gray-700">
                    <strong>Telefon:</strong>{' '}
                    <a 
                      href="tel:+420739748687" 
                      className="text-gray-800 hover:text-red-500 transition-colors"
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
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-red-500 pb-3">Galerie</h2>
            
            <h3 className="text-2xl font-bold text-gray-700">Fotografie z představení</h3>
            
            <ImageCarousel />
          </div>
        );

      case 'cv':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-red-500 pb-3">CV - Eva Rezová</h2>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border-l-4 border-red-500 shadow-lg">
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Tanci se věnuje již od dětství. Během studia na konzervatoři Duncan Centre se účastnila projektu 
                  <strong><em> Svěcení jara</em></strong> v nastudování Jiřího Bartovance, které slavilo úspěchy v Czech Center New York 
                  i na českých festivalech. Dále se podílela na projektu japonské choreografky Yoshiko Chuma v rámci 
                  pražské výstavy Secret Journey. Jako tanečnice a choreografka byla součástí projektu na festivalu 
                  v Takaoka v Japonsku.
                </p>
                <p>
                  Vytvořila choreografii ke <strong><em>Koncertu pro Mr. Shakespeara</em></strong> s hudbou Daniela Fikejze v rámci 
                  Letních shakespearovských slavností 2022. S divadlem J.K.Tyla spolupracovala jako choreografka na 
                  muzikálu <strong><em>Kouzelné hodinky doktora Kronera</em>, <em>Kozí válka</em> a <em>Company</em></strong>.
                </p>
                <p>
                  Zúčastnila se studijních pobytů na Royal Conservatoire Antwerp v Belgii a na National Taiwan 
                  University of Arts. V současnosti se jako interpretka a choreografka účastní mnoha uměleckých 
                  projektů a zároveň se věnuje pedagogické činnosti.
                </p>
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
      {/* Sidebar */}
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
                }}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentSection === item.key
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
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
        </div>
      </div>

      {/* Mobile menu button */}
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

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
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

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
            <p className="mb-2">© 2025 Picturam - Současný tanec</p>
            <p className="italic">Inspirováno dílem Leonarda Da Vinci "Poslední večeře"</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PicturamWebsite;