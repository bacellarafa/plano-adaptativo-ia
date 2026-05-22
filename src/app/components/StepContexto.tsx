export interface ContextoFormData {
  year: string;
  subject: string[];
  numLessons: string;
  lessonTime: string;
}

interface StepContextoProps {
  formData: ContextoFormData;
  onChange: (data: Partial<ContextoFormData>) => void;
}

const ENSINO_FUNDAMENTAL = [
  { label: '1º Ano', value: '1º Ano – Ensino Fundamental' },
  { label: '2º Ano', value: '2º Ano – Ensino Fundamental' },
  { label: '3º Ano', value: '3º Ano – Ensino Fundamental' },
  { label: '4º Ano', value: '4º Ano – Ensino Fundamental' },
  { label: '5º Ano', value: '5º Ano – Ensino Fundamental' },
  { label: '6º Ano', value: '6º Ano – Ensino Fundamental' },
  { label: '7º Ano', value: '7º Ano – Ensino Fundamental' },
  { label: '8º Ano', value: '8º Ano – Ensino Fundamental' },
  { label: '9º Ano', value: '9º Ano – Ensino Fundamental' },
];

const ENSINO_MEDIO = [
  { label: '1º Ano', value: '1º Ano – Ensino Médio' },
  { label: '2º Ano', value: '2º Ano – Ensino Médio' },
  { label: '3º Ano', value: '3º Ano – Ensino Médio' },
];

const SUBJECTS = [
  'Artes',
  'Ciências',
  'Educação Física',
  'Geografia',
  'História',
  'Língua Portuguesa',
  'Matemática',
  'Língua Espanhola',
  'Língua Inglesa',
];

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

/** Pill chip for year/subject selection */
function SelectChip({ label, selected, onClick, disabled }: { label: string; selected: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={disabled && !selected ? undefined : onClick}
      disabled={disabled && !selected}
      className="border transition-colors"
      style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: 13,
        fontWeight: selected ? 600 : 400,
        color: selected ? '#8600F4' : disabled ? '#BAB0C3' : '#494150',
        background: selected ? '#F4E8FE' : '#fff',
        borderColor: selected ? '#8600F4' : '#D3CADB',
        borderRadius: 100,
        padding: '6px 16px',
        whiteSpace: 'nowrap',
        cursor: disabled && !selected ? 'not-allowed' : 'pointer',
        opacity: disabled && !selected ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
}

/** Stepper with purple filled ± buttons, matching Figma exactly */
function Stepper({
  value,
  onChange,
  min,
  max,
  step,
  defaultVal,
}: {
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
}) {
  const n = parseInt(value) || defaultVal;
  const atMin = n <= min;
  const atMax = n >= max;
  return (
    <div
      className="flex items-stretch"
      style={{ border: '1px solid #D3CADB', borderRadius: 8, background: '#fff', overflow: 'hidden', height: 52 }}
    >
      {/* − button */}
      <button
        onClick={() => onChange(String(Math.max(min, n - step)))}
        disabled={atMin}
        className="flex items-center justify-center border-0 cursor-pointer shrink-0"
        style={{
          width: 52,
          background: atMin ? '#E7DFEE' : '#8600F4',
          borderRadius: 0,
          transition: 'background 0.15s',
        }}
      >
        <svg width="16" height="3" viewBox="0 0 16 3" fill="none">
          <path d="M1 1.5H15" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Value */}
      <div className="flex-1 flex items-center justify-center">
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 600, color: '#0D0712' }}>
          {n}
        </span>
      </div>
      {/* + button */}
      <button
        onClick={() => onChange(String(Math.min(max, n + step)))}
        disabled={atMax}
        className="flex items-center justify-center border-0 cursor-pointer shrink-0"
        style={{
          width: 52,
          background: atMax ? '#E7DFEE' : '#8600F4',
          borderRadius: 0,
          transition: 'background 0.15s',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1V15M1 8H15" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

import { useState } from 'react';

export function StepContexto({ formData, onChange }: StepContextoProps) {
  const [anoOpen, setAnoOpen] = useState(true);
  const [componenteOpen, setComponenteOpen] = useState(false);

  const selectYear = (v: string) => onChange({ year: v });
  const toggleSubject = (s: string) => {
    const current = formData.subject;
    if (current.includes(s)) {
      onChange({ subject: current.filter((x) => x !== s) });
    } else if (current.length < 3) {
      onChange({ subject: [...current, s] });
    }
  };
  const atSubjectLimit = formData.subject.length >= 3;

  return (
    <div className="flex flex-col gap-0">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#0D0712' }}>
          Contexto da aula
        </h2>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#A096A9' }}>
          *Campos obrigatórios
        </span>
      </div>

      {/* Ano / Série accordion */}
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
          </div>
          {/* Selected value shown as text when collapsed */}
          {formData.year && !anoOpen && (
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: '#494150', marginRight: 8, flexShrink: 0 }}>
              {formData.year}
            </span>
          )}
          <DsChevron open={anoOpen} color={anoOpen ? '#8600F4' : '#494150'} />
        </button>
        <SepLine />

        {anoOpen && (
          <div className="px-4 pb-4 pt-2">
            <p className="mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#494150' }}>
              Ensino Fundamental
            </p>
            <div className="flex flex-wrap gap-2">
              {ENSINO_FUNDAMENTAL.map((item) => (
                <SelectChip
                  key={item.value}
                  label={item.label}
                  selected={formData.year === item.value}
                  onClick={() => selectYear(formData.year === item.value ? '' : item.value)}
                />
              ))}
            </div>

            <p className="mt-4 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#494150' }}>
              Ensino Médio
            </p>
            <div className="flex flex-wrap gap-2">
              {ENSINO_MEDIO.map((item) => (
                <SelectChip
                  key={item.value}
                  label={item.label}
                  selected={formData.year === item.value}
                  onClick={() => selectYear(formData.year === item.value ? '' : item.value)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Componente curricular accordion */}
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
          </div>
          {/* Selected chips + count when collapsed */}
          {!componenteOpen && (
            <div className="flex items-center gap-1.5 mr-2 shrink-0 flex-wrap">
              {formData.subject.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#8600F4',
                    background: '#F4E8FE',
                    border: '1px solid #D3CADB',
                    borderRadius: 4,
                    padding: '2px 8px',
                  }}
                >
                  {s}
                </span>
              ))}
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: formData.subject.length > 0 ? '#494150' : '#A096A9' }}>
                {formData.subject.length}/3 selecionados
              </span>
            </div>
          )}
          <DsChevron open={componenteOpen} color={componenteOpen ? '#8600F4' : '#494150'} />
        </button>
        <SepLine />

        {componenteOpen && (
          <div className="px-4 pb-4 pt-3">
            {atSubjectLimit && (
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#8600F4', fontWeight: 600, marginBottom: 8 }}>
                Limite atingido. Remova um componente para selecionar outro.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((subj) => (
                <SelectChip
                  key={subj}
                  label={subj}
                  selected={formData.subject.includes(subj)}
                  onClick={() => toggleSubject(subj)}
                  disabled={atSubjectLimit && !formData.subject.includes(subj)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quantidade de aulas + Duração da aula */}
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#0D0712' }}>
            Quantidade de aulas<span style={{ color: '#8600F4' }}>*</span>
          </p>
          <Stepper
            value={formData.numLessons}
            onChange={(v) => onChange({ numLessons: v })}
            min={1}
            max={20}
            step={1}
            defaultVal={2}
          />
        </div>

        <div className="flex-1">
          <p className="mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#0D0712' }}>
            Duração da aula (minutos)<span style={{ color: '#8600F4' }}>*</span>
          </p>
          <Stepper
            value={formData.lessonTime}
            onChange={(v) => onChange({ lessonTime: v })}
            min={5}
            max={300}
            step={5}
            defaultVal={50}
          />
        </div>
      </div>
      <p className="mt-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576', lineHeight: 1.5 }}>
        Ex.: 2 aulas de 30 minutos geram um roteiro de 60 minutos
      </p>
    </div>
  );
}
