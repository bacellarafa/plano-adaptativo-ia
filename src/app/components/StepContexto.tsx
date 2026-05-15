import { useState } from 'react';

export interface PreviousPlan {
  id: string;
  title: string;
  subject: string;
  year: string;
  date: string;
}

export interface ContextoFormData {
  year: string;
  subject: string;
  numLessons: string;
  lessonTime: string;
  linkedPlan: PreviousPlan | null;
}

interface StepContextoProps {
  formData: ContextoFormData;
  onChange: (data: Partial<ContextoFormData>) => void;
}

const ENSINO_FUNDAMENTAL = ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano', '6º Ano', '7º Ano', '8º Ano', '9º Ano'];
const ENSINO_MEDIO = ['1º Ano EM', '2º Ano EM', '3º Ano EM'];

const SUBJECTS = [
  'Língua Portuguesa', 'Matemática', 'Ciências', 'História', 'Geografia',
  'Artes', 'Educação Física', 'Inglês', 'Biologia', 'Física', 'Química',
  'Filosofia', 'Sociologia', 'Redação',
];

const PREVIOUS_PLANS: PreviousPlan[] = [
  { id: '1', title: 'Fotossíntese e processos de respiração celular', subject: 'Ciências', year: '7º Ano EF', date: '10/04/2025' },
  { id: '2', title: 'Ciclo da Água e impactos ambientais', subject: 'Ciências', year: '6º Ano EF', date: '02/04/2025' },
  { id: '3', title: 'Frações e números decimais', subject: 'Matemática', year: '5º Ano EF', date: '25/03/2025' },
  { id: '4', title: 'A Era das Grandes Navegações', subject: 'História', year: '7º Ano EF', date: '18/03/2025' },
];

const ICON_RADIO_ON = 'M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C1.44801e-07 4.47715 4.47715 1.44806e-07 10 0ZM10 7.14355C8.42223 7.14355 7.14355 8.42223 7.14355 10C7.14358 11.5778 8.42224 12.8564 10 12.8564C11.5777 12.8564 12.8564 11.5777 12.8564 10C12.8564 8.42224 11.5778 7.14358 10 7.14355Z';
const ICON_CHEVRON_LG = 'M6.28281 6.27969C5.98906 6.57344 5.51406 6.57344 5.22344 6.27969L0.220312 1.27969C-0.0734375 0.985937 -0.0734375 0.510937 0.220312 0.220312C0.514062 -0.0703125 0.989062 -0.0734375 1.27969 0.220312L5.74844 4.68906L10.2172 0.220312C10.5109 -0.0734375 10.9859 -0.0734375 11.2766 0.220312C11.5672 0.514062 11.5703 0.989062 11.2766 1.27969L6.27656 6.27969H6.28281Z';

function SepLine() {
  return (
    <svg style={{ display: 'block', width: '100%', height: 1, overflow: 'visible', flexShrink: 0 }} viewBox="0 0 1 1" preserveAspectRatio="none">
      <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#BAB0C3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function DsChevron({ open, color = '#494150' }: { open: boolean; color?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: 20, height: 20, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
    >
      <svg
        style={{ position: 'absolute', top: '36.26%', left: '21.2%', right: '21.32%', bottom: '31.24%', width: '57.48%', height: '32.5%' }}
        viewBox="0 0 11.5 6.5"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d={ICON_CHEVRON_LG} fill={color} />
      </svg>
    </div>
  );
}

function RadioCircle({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 20 20" fill="none">
          <path d={ICON_RADIO_ON} fill="#32A124" />
        </svg>
      </div>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="7.5" stroke="#BAB0C3" />
    </svg>
  );
}

interface StepperProps {
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  display: (n: number) => string;
  icon: React.ReactNode;
}

function Stepper({ value, onChange, min, max, step, defaultVal, display, icon }: StepperProps) {
  const n = parseInt(value) || defaultVal;
  return (
    <div
      className="flex items-center"
      style={{ border: '1px solid #D3CADB', borderRadius: 8, background: '#fff', height: 44 }}
    >
      <button
        onClick={() => onChange(String(Math.max(min, n - step)))}
        className="flex items-center justify-center border-0 cursor-pointer transition-colors hover:bg-[#F4E8FE]"
        style={{ width: 44, height: '100%', background: 'transparent', borderRight: '1px solid #E7DFEE', borderRadius: '8px 0 0 8px', flexShrink: 0 }}
      >
        <svg width="14" height="3" viewBox="0 0 14 3" fill="none">
          <path d="M1 1.5H13" stroke="#8600F4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex-1 flex items-center justify-center gap-2">
        {icon}
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#0D0712' }}>
          {display(n)}
        </span>
      </div>
      <button
        onClick={() => onChange(String(Math.min(max, n + step)))}
        className="flex items-center justify-center border-0 cursor-pointer transition-colors hover:bg-[#F4E8FE]"
        style={{ width: 44, height: '100%', background: 'transparent', borderLeft: '1px solid #E7DFEE', borderRadius: '0 8px 8px 0', flexShrink: 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="#8600F4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function StepContexto({ formData, onChange }: StepContextoProps) {
  const [anoOpen, setAnoOpen] = useState(true);
  const [componenteOpen, setComponenteOpen] = useState(false);
  const [vincularEnabled, setVincularEnabled] = useState(formData.linkedPlan !== null);
  const [vincularDropdownOpen, setVincularDropdownOpen] = useState(false);

  const toggleVincular = () => {
    const next = !vincularEnabled;
    setVincularEnabled(next);
    if (!next) {
      setVincularDropdownOpen(false);
      onChange({ linkedPlan: null });
    }
  };

  const selectPlan = (plan: PreviousPlan) => {
    onChange({ linkedPlan: plan, year: plan.year, subject: plan.subject });
    setVincularDropdownOpen(false);
  };

  const selectYear = (y: string) => onChange({ year: y });
  const selectSubject = (s: string) => onChange({ subject: s });

  const groupIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="5" cy="5.5" r="2.2" stroke="#8600F4" strokeWidth="1.3" />
      <circle cx="11" cy="5.5" r="2.2" stroke="#8600F4" strokeWidth="1.3" />
      <path d="M1.5 13.5C1.5 11.3 3.2 9.5 5 9.5" stroke="#8600F4" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14.5 13.5C14.5 11.3 12.8 9.5 11 9.5" stroke="#8600F4" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8 9.5V13.5" stroke="#8600F4" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );

  const clockIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#8600F4" strokeWidth="1.3" />
      <path d="M8 4.5V8L10.5 9.5" stroke="#8600F4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-0">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#0D0712' }}>
          Contexto da aula
        </h2>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#A096A9' }}>
          * Campos com asterisco são obrigatórios
        </span>
      </div>

      {/* Vincular card — same toggle architecture as "Criar plano inclusivo" */}
      <button
        onClick={toggleVincular}
        className="flex items-center gap-4 text-left cursor-pointer border-0 w-full mb-6"
        style={{
          background: vincularEnabled ? '#F4E8FE' : 'white',
          border: `1px solid ${vincularEnabled ? '#8600F4' : '#D3CADB'}`,
          borderRadius: 16,
          padding: 16,
          transition: 'background 0.15s, border-color 0.15s',
        }}
      >
        {/* Link icon */}
        <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.5 14.5C11.3 15.3 12.5 15.5 13.5 15L17 11.5C18.1 10.4 18.1 8.6 17 7.5C15.9 6.4 14.1 6.4 13 7.5L11.5 9" stroke={vincularEnabled ? '#8600F4' : '#494150'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 9.5C12.7 8.7 11.5 8.5 10.5 9L7 12.5C5.9 13.6 5.9 15.4 7 16.5C8.1 17.6 9.9 17.6 11 16.5L12.5 15" stroke={vincularEnabled ? '#8600F4' : '#494150'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0D0712', lineHeight: 1.52 }}>
            Vincular a um plano de aula anterior
          </p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 10, color: '#0D0712', lineHeight: 1.36, marginTop: 4 }}>
            Opcional: Importe turma, disciplina e contexto de uma aula já gerada para continuar o assunto.
          </p>
        </div>
        {/* Radio indicator */}
        <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
          {vincularEnabled ? (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 20 20" fill="none">
              <path d={ICON_RADIO_ON} fill="#32A124" />
            </svg>
          ) : (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#494150" strokeWidth="2" />
            </svg>
          )}
        </div>
      </button>

      {/* Plan list — visible when vincularEnabled (same architecture as profiles in StepAdaptacoes) */}
      {vincularEnabled && (
        <div className="flex flex-col gap-3 mb-6">
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0D0712', lineHeight: 1.52 }}>
            Plano anterior
          </p>
          <div className="relative">
            {/* Dropdown trigger */}
            <button
              onClick={() => setVincularDropdownOpen(!vincularDropdownOpen)}
              className="w-full flex items-center justify-between cursor-pointer border-0"
              style={{
                background: vincularDropdownOpen ? '#F4E8FE' : '#FFFCFF',
                border: `1px solid ${vincularDropdownOpen ? '#8600F4' : '#BAB0C3'}`,
                borderRadius: 8,
                height: 48,
                paddingLeft: 16,
                paddingRight: 16,
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <span
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  color: formData.linkedPlan ? '#0D0712' : '#A096A9',
                  lineHeight: 1.52,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 'calc(100% - 32px)',
                  textAlign: 'left',
                }}
              >
                {formData.linkedPlan ? formData.linkedPlan.title : 'Selecione'}
              </span>
              <DsChevron open={vincularDropdownOpen} color={vincularDropdownOpen ? '#8600F4' : '#494150'} />
            </button>

            {/* Plan options */}
            {vincularDropdownOpen && (
              <div
                className="absolute z-10 w-full flex flex-col"
                style={{
                  top: 'calc(100% + 4px)',
                  background: '#FFFCFF',
                  borderRadius: 8,
                  padding: 8,
                  boxShadow: '0px 2px 8px rgba(13,7,18,0.16)',
                }}
              >
                {PREVIOUS_PLANS.map((plan) => {
                  const sel = formData.linkedPlan?.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={(e) => { e.stopPropagation(); selectPlan(plan); }}
                      className="flex items-center gap-3 text-left cursor-pointer border-0 w-full"
                      style={{
                        background: sel ? '#E7DFEE' : 'white',
                        borderRadius: 8,
                        minHeight: 56,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 16,
                        paddingRight: 16,
                        transition: 'background 0.1s',
                      }}
                    >
                      <RadioCircle selected={sel} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, color: sel ? '#8600F4' : '#0D0712', marginBottom: 2 }}>
                          {plan.title}
                        </p>
                        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#6E6576' }}>
                          {plan.subject} · {plan.year} · {plan.date}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ano / Série accordion — horizontal line pattern */}
      <div className="flex flex-col w-full">
        <SepLine />
        <button
          className="w-full flex items-center justify-between border-0 cursor-pointer bg-transparent"
          style={{ padding: 16 }}
          onClick={() => setAnoOpen(!anoOpen)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="7" cy="8" r="2.5" stroke={anoOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" />
              <circle cx="13" cy="8" r="2.5" stroke={anoOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" />
              <path d="M3 16C3 13.8 4.8 12 7 12" stroke={anoOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" strokeLinecap="round" />
              <path d="M17 16C17 13.8 15.2 12 13 12" stroke={anoOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" strokeLinecap="round" />
              <path d="M10 12V16" stroke={anoOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 16, color: anoOpen ? '#8600F4' : '#494150', whiteSpace: 'nowrap' }}>
              Ano / Série<span style={{ color: '#8600F4' }}>*</span>
            </span>
            {formData.year && (
              <span className="px-2 py-0.5 rounded-full" style={{ background: '#F4E8FE', fontSize: 11, fontWeight: 600, color: '#8600F4', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {formData.year}
              </span>
            )}
          </div>
          <DsChevron open={anoOpen} color={anoOpen ? '#8600F4' : '#494150'} />
        </button>
        <SepLine />

        {anoOpen && (
          <div className="px-4 pb-4">
            <p className="mt-3 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#494150', opacity: 0.8 }}>
              Ensino Fundamental
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              {ENSINO_FUNDAMENTAL.map((year) => {
                const val = `${year} EF`;
                const sel = formData.year === val;
                return (
                  <button
                    key={year}
                    onClick={() => selectYear(sel ? '' : val)}
                    className="flex items-center gap-2 border-0 bg-transparent cursor-pointer"
                  >
                    <RadioCircle selected={sel} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: '#494150' }}>
                      {year}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#494150', opacity: 0.8 }}>
              Ensino Médio
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              {ENSINO_MEDIO.map((year) => {
                const sel = formData.year === year;
                return (
                  <button
                    key={year}
                    onClick={() => selectYear(sel ? '' : year)}
                    className="flex items-center gap-2 border-0 bg-transparent cursor-pointer"
                  >
                    <RadioCircle selected={sel} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: sel ? 600 : 400, fontSize: 13, color: '#494150' }}>
                      {year.replace(' EM', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Componente curricular accordion — horizontal line pattern */}
      <div className="flex flex-col w-full mb-5">
        <SepLine />
        <button
          className="w-full flex items-center justify-between border-0 cursor-pointer bg-transparent"
          style={{ padding: 16 }}
          onClick={() => setComponenteOpen(!componenteOpen)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="2" width="14" height="16" rx="2" stroke={componenteOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" />
              <path d="M7 7H13M7 10.5H11" stroke={componenteOpen ? '#8600F4' : '#494150'} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 16, color: componenteOpen ? '#8600F4' : '#494150', whiteSpace: 'nowrap' }}>
              Componente curricular<span style={{ color: '#8600F4' }}>*</span>
            </span>
            {formData.subject && (
              <span className="px-2 py-0.5 rounded-full" style={{ background: '#F4E8FE', fontSize: 11, fontWeight: 600, color: '#8600F4', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {formData.subject}
              </span>
            )}
          </div>
          <DsChevron open={componenteOpen} color={componenteOpen ? '#8600F4' : '#494150'} />
        </button>
        <SepLine />

        {componenteOpen && (
          <div className="px-4 pb-4 pt-3">
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((subj) => {
                const sel = formData.subject === subj;
                return (
                  <button
                    key={subj}
                    onClick={() => selectSubject(sel ? '' : subj)}
                    className="px-3 py-1.5 rounded-full border cursor-pointer transition-colors"
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 13,
                      fontWeight: sel ? 600 : 400,
                      color: sel ? '#8600F4' : '#494150',
                      background: sel ? '#F4E8FE' : '#fff',
                      borderColor: sel ? '#8600F4' : '#D3CADB',
                    }}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Qtd. de aulas + Tempo da aula — unified stepper design */}
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#0D0712' }}>
            Qtd. de aulas<span style={{ color: '#8600F4' }}>*</span>
          </p>
          <Stepper
            value={formData.numLessons}
            onChange={(v) => onChange({ numLessons: v })}
            min={1}
            max={20}
            step={1}
            defaultVal={2}
            display={(n) => n === 1 ? '1 aula' : `${n} aulas`}
            icon={groupIcon}
          />
        </div>

        <div className="flex-1">
          <p className="mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#0D0712' }}>
            Tempo da aula (min.)<span style={{ color: '#8600F4' }}>*</span>
          </p>
          <Stepper
            value={formData.lessonTime}
            onChange={(v) => onChange({ lessonTime: v })}
            min={5}
            max={300}
            step={5}
            defaultVal={50}
            display={(n) => `${n} min`}
            icon={clockIcon}
          />
        </div>
      </div>
      <p className="mt-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576', lineHeight: 1.5 }}>
        Se a aula dura 30 min. e você quer trabalhar o tema em 2 aulas, a IA estrutura um roteiro de 60 min., organizando dinâmicas e explicações.
      </p>
    </div>
  );
}
