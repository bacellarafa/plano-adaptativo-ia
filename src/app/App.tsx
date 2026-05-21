import '../styles/fonts.css';
import '../DsOnsCoreWeb/styles.css';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomePanel } from './components/HomePanel';
import { LessonPlanFlow } from './components/LessonPlanFlow';

type Screen = 'home' | 'lesson_plan';

export function FooterDisclaimer() {
  return (
    <div
      className="flex items-center justify-center gap-2 shrink-0 px-6"
      style={{
        height: 40,
        borderTop: '1px solid #E7DFEE',
        background: '#FFFCFF',
      }}
    >
      <p
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 11,
          color: '#6E6576',
          lineHeight: 1.4,
          margin: 0,
          textAlign: 'center',
        }}
      >
        Recursos de IA podem cometer erros. Por isso, é bom checar as respostas.
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

  // Home: iônica shell (sidebar + header) stays visible
  if (screen === 'home') {
    return (
      <div
        className="flex h-full overflow-hidden"
        style={{ background: '#F5F5F5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        <Sidebar screen={screen} onNavigate={setScreen} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="flex flex-1 relative overflow-hidden">
            <HomePanel
              onSelectAction={handleSelectAction}
              onClose={handleClosePanel}
            />
          </div>
          <FooterDisclaimer />
        </div>
      </div>
    );
  }

  // Lesson plan flow: runs outside iônica (no sidebar, no header)
  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: '#FFFCFF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      <LessonPlanFlow onClose={handleClosePanel} />
      <FooterDisclaimer />
    </div>
  );
}
