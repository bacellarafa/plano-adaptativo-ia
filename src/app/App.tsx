import '../styles/fonts.css';
import '../DsOnsCoreWeb/styles.css';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AppHeader } from './components/AppHeader';
import { HomePanel } from './components/HomePanel';
import { LessonPlanFlow } from './components/LessonPlanFlow';

type Screen = 'home' | 'lesson_plan';

function FooterDisclaimer() {
  return (
    <div
      className="flex items-center gap-2 shrink-0 px-6"
      style={{
        height: 40,
        borderTop: '1px solid #E7DFEE',
        background: '#FFFCFF',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="6.5" cy="6.5" r="5.5" stroke="#A096A9" strokeWidth="1.2" />
        <path d="M6.5 5.5V6M6.5 7.5V9" stroke="#A096A9" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="6.5" cy="5.5" r="0.5" fill="#A096A9" />
      </svg>
      <p
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 11,
          color: '#6E6576',
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        Todos os resultados construídos aqui têm como única fonte os conteúdos elaborados por especialistas da FTD Educação. Recursos de IA podem cometer erros. Por isso, é bom checar as respostas.
      </p>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const handleSelectAction = (action: 'buscar' | 'questoes' | 'plano') => {
    if (action === 'plano') {
      setScreen('lesson_plan');
    }
  };

  const handleClosePanel = () => {
    setScreen('home');
  };

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: '#F5F5F5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      {/* Sidebar */}
      <Sidebar screen={screen} onNavigate={setScreen} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {screen === 'home' && (
          <div className="flex flex-1 relative overflow-hidden">
            <HomePanel
              onSelectAction={handleSelectAction}
              onClose={handleClosePanel}
            />
          </div>
        )}

        {screen === 'lesson_plan' && (
          <>
            <AppHeader />
            <div className="flex flex-1 overflow-hidden">
              <LessonPlanFlow onClose={handleClosePanel} />
            </div>
          </>
        )}

        <FooterDisclaimer />
      </div>
    </div>
  );
}
