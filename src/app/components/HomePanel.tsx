type ActionType = 'buscar' | 'questoes' | 'plano';

interface HomePanelProps {
  onSelectAction: (action: ActionType) => void;
  onClose: () => void;
}

export function HomePanel({ onSelectAction, onClose }: HomePanelProps) {
  return (
    <div className="flex-1 flex items-start justify-end overflow-hidden relative">
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(13,7,18,0.64)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative h-full flex flex-col"
        style={{ width: 'calc(100% - 0px)', background: '#FFFCFF', borderRadius: '0px 0 0 0px', boxShadow: '0 4px 24px rgba(13,7,18,0.18)' }}
      >
        {/* Panel header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-2 shrink-0">
          <button className="flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer" style={{ width: 32, height: 32 }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="10" stroke="#494150" strokeWidth="1.8"/>
              <path d="M11 8V8.5M11 11V15" stroke="#494150" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="11" cy="8.5" r="0.8" fill="#494150"/>
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer" style={{ width: 32, height: 32 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 3H9V9H3V3ZM13 3H19V9H13V3ZM3 13H9V19H3V13ZM13 13H19V19H13V13Z" stroke="#494150" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer hover:bg-[#F6F0FB]"
              style={{ width: 32, height: 32 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="#0D0712" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Panel body */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 pb-8">
          {/* Title */}
          <div className="text-center">
            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: 40,
                lineHeight: 1.36,
                background: 'linear-gradient(90deg,#4E008E 0%,#FF0098 50%,#FF7500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Tudo pronto para criarmos algo incrível?
            </h1>
            <p
              className="mt-3"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 18, color: '#0D0712', lineHeight: 1.36 }}
            >
              Para começar, escolha o que quer fazer com a minha inteligência artificial
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap gap-6 items-center justify-center w-full max-w-[900px]">
            {/* Buscar materiais */}
            <button
              onClick={() => onSelectAction('buscar')}
              className="flex flex-col gap-4 p-6 rounded-lg text-left cursor-pointer border-0 transition-all hover:shadow-md"
              style={{ width: 376, background: '#fff', border: '1px solid #A096A9', borderRadius: 8 }}
            >
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#4E008E" strokeWidth="1.8"/>
                  <path d="M16 16L21 21" stroke="#4E008E" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, color: '#4E008E', lineHeight: 1.52 }}>
                  Buscar materiais
                </span>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#0D0712', lineHeight: 1.52 }}>
                Busque temas e encontre conteúdos, atividades e outros recursos dos seus materiais
              </p>
            </button>

            {/* Criar questões */}
            <button
              onClick={() => onSelectAction('questoes')}
              className="flex flex-col gap-4 p-6 rounded-lg text-left cursor-pointer border-0 transition-all hover:shadow-md"
              style={{ width: 376, background: '#fff', border: '1px solid #A096A9', borderRadius: 8 }}
            >
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#4E008E" strokeWidth="1.8"/>
                  <path d="M7 8H17M7 12H14M7 16H11" stroke="#4E008E" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, color: '#4E008E', lineHeight: 1.52 }}>
                  Criar questões
                </span>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#0D0712', lineHeight: 1.52 }}>
                Crie questões personalizadas por tema, componente e ano, com base nos seus materiais
              </p>
            </button>

            {/* Criar plano de aula */}
            <button
              onClick={() => onSelectAction('plano')}
              className="flex flex-col gap-4 p-6 rounded-lg text-left cursor-pointer border-0 transition-all hover:shadow-md"
              style={{ width: 376, background: '#fff', border: '1px solid #A096A9', borderRadius: 8 }}
            >
              <div className="flex items-center gap-2 flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="#4E008E" strokeWidth="1.6"/>
                  <circle cx="7" cy="8.5" r="1.3" fill="#4E008E"/>
                  <circle cx="7" cy="12" r="1.3" fill="#4E008E"/>
                  <circle cx="7" cy="15.5" r="1.3" fill="#4E008E"/>
                  <path d="M10.5 8.5H17M10.5 12H17M10.5 15.5H14" stroke="#4E008E" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, color: '#4E008E', lineHeight: 1.52 }}>
                  Criar plano de aula
                </span>
                <span
                  className="ml-2 flex items-center justify-center px-3"
                  style={{
                    height: 28,
                    background: '#F6F0FB',
                    border: '1px solid #D3CADB',
                    borderRadius: 100000,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: 12,
                    color: '#0D0712',
                  }}
                >
                  Novo
                </span>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#0D0712', lineHeight: 1.52 }}>
                Crie planos de aula personalizados por ano, tema, componente curricular e perfis de aprendizagem
              </p>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-8 pb-4 shrink-0">
          
        </div>
      </div>
    </div>
  );
}
