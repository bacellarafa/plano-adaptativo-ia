import { useEffect, useState } from 'react';

const STEPS = [
  'Analisando o currículo e a série selecionada...',
  'Buscando habilidades BNCC relacionadas...',
  'Estruturando o conteúdo programático...',
  'Elaborando atividades e metodologias...',
  'Revisando e finalizando o plano de aula...',
];

interface LoadingPlanProps {
  onComplete: () => void;
}

export function LoadingPlan({ onComplete }: LoadingPlanProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5">
      {/* Spinner */}
      <div
        className="rounded-full"
        style={{
          width: 56,
          height: 56,
          border: '3.5px solid #E7DFEE',
          borderTopColor: '#FF0098',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: '#FF0098', textAlign: 'center' }}>
        Construindo seu plano de aula... (Passo {step + 1} de {STEPS.length})
      </h2>
      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#6E6576', textAlign: 'center', maxWidth: 420 }}>
        {STEPS[step]}
      </p>
      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#A096A9', textAlign: 'center', maxWidth: 440 }}>
        Continue navegando na iônica. Quando pronto, seu plano de aula será salvo no Histórico e você receberá uma notificação
      </p>
    </div>
  );
}
