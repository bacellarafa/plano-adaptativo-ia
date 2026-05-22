import { useCallback, useEffect, useRef, useState } from 'react';
import { StepContexto } from './StepContexto';
import { StepTematica } from './StepTematica';
import { StepAdaptacoes, type LearningProfile } from './StepAdaptacoes';
import { LoadingPlan } from './LoadingPlan';
import { PlanoGerado, type PlanoFormData } from './PlanoGerado';

// Default profiles reutilizados do StepAdaptacoes
const DEFAULT_PROFILES: LearningProfile[] = [
  {
    id: 'tdah',
    name: 'Alunos com transtorno do déficit de atenção (TDAH)',
    characteristics: [
      'Necessita de apoio frente a desafios novos',
      'Necessita de apoio para manter a atenção',
      'Necessita de apoio visual e/ou concretos',
      'Engaja-se melhor em atividades curtas',
    ],
  },
  {
    id: 'dislexia',
    name: 'Alunos com dislexia',
    characteristics: [
      'Necessita de apoio para manter a atenção',
      'Necessita de apoio visual e/ou concretos',
      'Beneficia-se de ambientes com menos estímulos',
      'Necessita de tempo ampliado para realizar atividades',
    ],
  },
  {
    id: 'tea',
    name: 'Alunos com Transtorno do Espectro Autista (TEA)',
    characteristics: [
      'Necessita de organização, rotina e previsibilidade',
      'Necessita de rotinas e combinados',
      'Beneficia-se da antecipação de mudanças',
      'Necessita de apoio em atividades em grupo',
    ],
  },
  {
    id: 'daltonismo',
    name: 'Alunos com daltonismo',
    characteristics: [
      'Necessita de apoio visual e/ou concretos',
      'Beneficia-se de ambientes com menos estímulos',
    ],
  },
  {
    id: 'baixa_visao',
    name: 'Alunos com baixa visão',
    characteristics: [
      'Necessita de apoio visual e/ou concretos',
      'Necessita de tempo ampliado para realizar atividades',
      'Beneficia-se de ambientes com menos estímulos',
    ],
  },
];

type FlowStep = 1 | 2 | 3 | 'loading' | 'result';

interface FormData {
  year: string;
  subject: string[];
  numLessons: string;
  lessonTime: string;
  topic: string;
  bnccSkills: string[];
  inclusivePlan: boolean;
  selectedProfiles: LearningProfile[];
  allProfiles: LearningProfile[];
  resources: string[];
}

const INITIAL_FORM: FormData = {
  year: '',
  subject: [],
  numLessons: '2',
  lessonTime: '50',
  topic: '',
  bnccSkills: [],
  inclusivePlan: false,
  selectedProfiles: [],
  allProfiles: DEFAULT_PROFILES,
  resources: [],
};

interface LessonPlanFlowProps {
  onClose: () => void;
}

const STEP_LABELS = [
  { num: 1, label: 'Contexto', hint: 'Turma, disciplina\ne duração' },
  { num: 2, label: 'Temática', hint: 'Tema e habilidade\nBNCC' },
  { num: 3, label: 'Adaptações', hint: 'Inclusão e\nrecursos' },
];

// Checkmark SVG path do Figma
const CHECKMARK_PATH = "M10.3391 0.4025C10.5906 0.116285 11.0227 0.0655031 11.3381 0.290196C11.6766 0.531527 11.7508 1.00067 11.5109 1.33707L4.91035 10.5373C4.78291 10.7144 4.58268 10.831 4.36152 10.8468C4.14627 10.8621 3.92746 10.7888 3.76973 10.631L0.370313 7.23063C0.0773116 6.93745 0.0760272 6.46255 0.370313 6.17106C0.662472 5.882 1.13759 5.87642 1.42988 6.17106L4.20723 8.94352L10.2912 0.463047L10.3391 0.4025Z";

function StepIndicator({ step }: { step: FlowStep }) {
  return (
    <div className="flex flex-col gap-1 shrink-0" style={{ width: 170 }}>
      {STEP_LABELS.map((s, idx) => {
        const active = step === s.num;
        const done = typeof step === 'number' ? step > s.num : false;
        const isDoneByLoading = step === 'loading' || step === 'result';
        const finalDone = done || isDoneByLoading;

        const lineColor = (finalDone || active) ? '#8600F4' : '#887E91';

        return (
          <div key={s.num} className="flex flex-col gap-1">
            {/* Step row */}
            <div className="flex items-center gap-4">
              {/* Circle */}
              <div className="relative shrink-0" style={{ width: 40, height: 40 }}>
                {finalDone ? (
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, background: '#F4E8FE', border: '2px solid #8600F4' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 11.8013 10.9991" fill="none">
                      <path d={CHECKMARK_PATH} fill="#8600F4" stroke="#8600F4" strokeWidth="0.3" />
                    </svg>
                  </div>
                ) : active ? (
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, background: '#8600F4' }}
                  >
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 20, lineHeight: 1.52, color: '#FFFCFF', margin: 0 }}>
                      {s.num}
                    </p>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, border: '2px solid #887E91', background: 'transparent' }}
                  >
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, lineHeight: 1.52, color: '#887E91', margin: 0 }}>
                      {s.num}
                    </p>
                  </div>
                )}
              </div>

              {/* Label */}
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: 1.52, color: '#0D0712', margin: 0, whiteSpace: 'nowrap' }}>
                {s.label}
              </p>
            </div>

            {/* Connector line + hint */}
            {idx < STEP_LABELS.length - 1 && (
              <div className="flex gap-4" style={{ minHeight: 52 }}>
                <div className="flex items-center justify-center" style={{ width: 40 }}>
                  <svg width="40" height="100%" preserveAspectRatio="none" viewBox="0 0 40 100" fill="none">
                    <path d="M20 1L20 99" stroke={lineColor} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: 1.52, color: '#494150', margin: 0, whiteSpace: 'pre-line' }}>
                  {s.hint}
                </p>
              </div>
            )}
            {idx === STEP_LABELS.length - 1 && (
              <div className="flex gap-4">
                <div style={{ width: 40 }} />
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: 1.52, color: '#494150', margin: 0, whiteSpace: 'pre-line' }}>
                  {s.hint}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── History & Saved types ─────────────────────────────────────────────────── */

interface PlanTags {
  year: string;
  subject: string[];
  bnccSkills: string[];
  adapted: boolean;
}

interface HistoryItem {
  id: string;
  date: string;
  title: string;
  tags: PlanTags;
  isNew?: boolean;
  snapshot?: PlanoFormData;
}

interface SavedPlan {
  id: string;
  date: string;
  title: string;
  tags: PlanTags;
  isNew?: boolean;
  snapshot?: PlanoFormData;
}

const DEFAULT_TAGS: PlanTags = {
  year: '1º Ano – Ensino Fundamental',
  subject: ['Ciências'],
  bnccSkills: ['EM13LGG100', 'EM13LGG101', 'EM13LGG102'],
  adapted: true,
};

const MOCK_HISTORY: HistoryItem[] = [
  { id: '1', date: '20/05 às 17:46', title: 'Introdução á Fotossíntese', tags: DEFAULT_TAGS },
  { id: '2', date: '20/05 às 17:46', title: 'O Ciclo da Água', tags: DEFAULT_TAGS },
  { id: '3', date: '20/05 às 17:46', title: 'Cadeia Alimentar', tags: DEFAULT_TAGS },
];

const MOCK_SAVED: SavedPlan[] = [
  { id: '1', date: '20/05 às 17:46', title: 'Introdução á Fotossíntese', tags: DEFAULT_TAGS },
  { id: '2', date: '20/05 às 17:46', title: 'O Ciclo da Água', tags: DEFAULT_TAGS },
  { id: '3', date: '20/05 às 17:46', title: 'Cadeia Alimentar', tags: DEFAULT_TAGS },
];

/* ── Plan tags component ─────────────────────────────────────────────────── */

function PlanTagList({ tags }: { tags: PlanTags }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
      {/* Year tag */}
      <span
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 12,
          fontWeight: 500,
          color: '#494150',
          background: '#fff',
          border: '1px solid #D3CADB',
          borderRadius: 4,
          padding: '2px 8px',
          whiteSpace: 'nowrap',
        }}
      >
        {tags.year}
      </span>
      {/* Subject tags (one chip per subject) */}
      {tags.subject.map((subj) => (
        <span
          key={subj}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            color: '#494150',
            background: '#fff',
            border: '1px solid #D3CADB',
            borderRadius: 4,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          {subj}
        </span>
      ))}
      {/* BNCC skill tags */}
      {tags.bnccSkills.map((skill) => (
        <span
          key={skill}
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            color: '#8600F4',
            background: '#F4E8FE',
            border: '1px solid #D3CADB',
            borderRadius: 4,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          {skill}
        </span>
      ))}
      {/* Adapted tag */}
      {tags.adapted && (
        <span
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            color: '#494150',
            background: '#fff',
            border: '1px solid #D3CADB',
            borderRadius: 4,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          Adaptado
        </span>
      )}
    </div>
  );
}

/* ── Search bar ──────────────────────────────────────────────────────────── */

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div
      className="flex items-center gap-2 px-4 mb-4"
      style={{
        height: 44,
        border: '1px solid #D3CADB',
        borderRadius: 100,
        background: '#fff',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="#A096A9" strokeWidth="1.4" />
        <path d="M11.5 11.5L15 15" stroke="#A096A9" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Buscar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 outline-none bg-transparent"
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 14,
          color: '#0D0712',
        }}
      />
    </div>
  );
}

/* ── Characteristics & Icon paths ─────────────────────────────────────────── */

const ALL_CHARACTERISTICS = [
  'Necessita de apoio frente a desafios novos',
  'Necessita de apoio para manter a atenção',
  'Necessita de apoio visual e/ou concretos',
  'Engaja-se melhor em atividades curtas',
  'Necessita de apoio em atividades em grupo',
  'Necessita de rotinas e combinados',
  'Engaja-se em conteúdos de seu interesse',
  'Fragilidade para lidar com frustrações',
  'Necessita de organização, rotina e previsibilidade',
  'Requer pausas e oportunidades de movimento',
  'Necessita de apoio em situações de espera',
  'Beneficia-se de ambientes com menos estímulos',
  'Beneficia-se da antecipação de mudanças',
  'Necessita de tempo ampliado para realizar atividades',
];

const ICON_CLOSE = "M13.9861 0.182992C13.8689 0.0658222 13.7099 0 13.5442 0C13.3785 0 13.2195 0.0658222 13.1023 0.182992L7.08584 6.19941L1.06942 0.182992C0.952215 0.0658222 0.793272 0 0.627544 0C0.461816 0 0.302874 0.0658222 0.185669 0.182992C0.0684997 0.300196 0.0026775 0.459139 0.0026775 0.624867C0.0026775 0.790594 0.0684997 0.949537 0.185669 1.06674L6.20209 7.08316L0.185669 13.0997C0.127074 13.1576 0.0805052 13.2265 0.0486414 13.3024C0.0167776 13.3784 0.000247693 13.4599 2.76245e-06 13.5423C-0.000242168 13.6247 0.0158026 13.7063 0.0472141 13.7824C0.0786256 13.8586 0.124784 13.9278 0.183034 13.986C0.241284 14.0443 0.310476 14.0905 0.38663 14.1219C0.462784 14.1533 0.544397 14.1693 0.626775 14.1691C0.709152 14.1688 0.790669 14.1523 0.866635 14.1204C0.9426 14.0886 1.01152 14.042 1.06942 13.9834L7.08584 7.96699L13.1023 13.9834L13.1495 14.0266C13.2696 14.1242 13.4216 14.1738 13.5761 14.1658C13.7306 14.1578 13.8767 14.0928 13.9861 13.9834C14.0955 13.874 14.1605 13.7279 14.1685 13.5734C14.1765 13.4189 14.1268 13.2669 14.0293 13.1468L13.9861 13.0997L7.96967 7.08316L13.9861 1.06674C14.1033 0.949537 14.1691 0.790594 14.1691 0.624867C14.1691 0.459139 14.1033 0.300196 13.9861 0.182992Z";
const ICON_CB16_BG = "M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z";
const ICON_CB16_CHECK = "M4.25389 7.36619C3.92476 7.69631 3.90422 8.25077 4.25943 8.58041L6.3538 10.6753C6.68491 11.0283 7.2475 11.0498 7.57734 10.67L11.7225 6.52462C12.1004 6.19641 12.081 5.63776 11.7331 5.30601C11.403 4.9565 10.8523 4.97811 10.5236 5.3047L6.9727 8.85785L5.48202 7.36593L5.48099 7.36491C5.14224 7.02869 4.59394 7.02871 4.25518 7.36489L4.25389 7.36619Z";
const ICON_CB16_EMPTY = "M4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V12C15.5 13.933 13.933 15.5 12 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4C0.5 2.067 2.067 0.5 4 0.5Z";
const ICON_PLUS_14 = "M7.75 0.75C7.75 0.334375 7.41563 0 7 0C6.58437 0 6.25 0.334375 6.25 0.75V6.25H0.75C0.334375 6.25 0 6.58437 0 7C0 7.41563 0.334375 7.75 0.75 7.75H6.25V13.25C6.25 13.6656 6.58437 14 7 14C7.41563 14 7.75 13.6656 7.75 13.25V7.75H13.25C13.6656 7.75 14 7.41563 14 7C14 6.58437 13.6656 6.25 13.25 6.25H7.75V0.75Z";

function Cb16({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 16 16">
          <path d={ICON_CB16_BG} fill="#32A124" />
          <path d={ICON_CB16_CHECK} fill="#FFFCFF" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
      <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 16 16">
        <path d={ICON_CB16_EMPTY} stroke="#BAB0C3" />
      </svg>
    </div>
  );
}

/* ── Three-dot context menu ─────────────────────────────────────────────────── */

interface MenuAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

function ItemMenu({ actions }: { actions: MenuAction[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="border-0 bg-transparent cursor-pointer flex items-center justify-center rounded-md transition-colors hover:bg-[#F6F0FB]"
        style={{ width: 30, height: 30 }}
      >
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
          <circle cx="2" cy="2" r="2" fill="#8600F4" />
          <circle cx="2" cy="8" r="2" fill="#8600F4" />
          <circle cx="2" cy="14" r="2" fill="#8600F4" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 z-30 flex flex-col overflow-hidden rounded-lg"
          style={{
            top: 'calc(100% + 4px)',
            minWidth: 180,
            background: '#fff',
            boxShadow: '0 4px 16px rgba(13,7,18,0.14)',
            border: '1.5px solid #E7DFEE',
          }}
        >
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setOpen(false); action.onClick(); }}
              className="flex items-center gap-3 text-left border-0 cursor-pointer transition-colors hover:bg-[#F6F0FB]"
              style={{
                paddingLeft: 14, paddingRight: 14, height: 40, background: 'transparent',
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 500,
                color: action.danger ? '#C62828' : '#0D0712',
              }}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Full-screen plan view (from History / Saved) ────────────────────────── */

function PlanFullScreenView({
  item,
  onBack,
  onRegenerate,
  onSave,
}: {
  item: HistoryItem | SavedPlan;
  onBack: () => void;
  onRegenerate?: () => void;
  onSave?: () => void;
}) {
  const formData: PlanoFormData = item.snapshot ?? {
    year: item.tags.year,
    subject: item.tags.subject,
    numLessons: '2',
    lessonTime: '50',
    topic: item.title,
    bnccSkills: item.tags.bnccSkills,
    inclusivePlan: item.tags.adapted,
    resources: [],
    selectedProfiles: [],
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Plan header bar */}
      <div
        className="flex items-center gap-4 shrink-0 px-7 py-3"
        style={{ borderBottom: '1px solid #E7DFEE' }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 shrink-0 border-0 bg-transparent cursor-pointer"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#8600F4' }}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M14 7H2M2 7L7 2M2 7L7 12" stroke="#8600F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </button>
        <div className="flex-1" />
        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 border-0 cursor-pointer px-4"
              style={{
                height: 36,
                background: '#fff',
                border: '1.5px solid #D3CADB',
                borderRadius: 8,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#494150',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7C1 3.69 3.69 1 7 1C9.09 1 10.93 2.05 12 3.65V1M12 7C12 10.31 9.31 13 6 13C3.91 13 2.07 11.95 1 10.35V13" stroke="#494150" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Gerar novamente
            </button>
          )}
          {onSave && (
            <button
              onClick={onSave}
              className="flex items-center gap-1.5 border-0 cursor-pointer px-4"
              style={{
                height: 36,
                background: '#8600F4',
                borderRadius: 8,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
              }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M1 2C1 1.45 1.45 1 2 1H10C10.55 1 11 1.45 11 2V13L6 10.5L1 13V2Z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              Salvar
            </button>
          )}
        </div>
      </div>
      {/* Plan content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <PlanoGerado formData={formData} onRegenerate={onRegenerate ?? (() => {})} />
      </div>
    </div>
  );
}

/* ── CreateProfileModal ──────────────────────────────────────────────────── */

interface CreateProfileModalProps {
  onClose: () => void;
  onSave: (profile: LearningProfile) => void;
  initialProfile?: LearningProfile;
}

function CreateProfileModal({ onClose, onSave, initialProfile }: CreateProfileModalProps) {
  const [name, setName] = useState(initialProfile?.name ?? '');
  const [selectedChars, setSelectedChars] = useState<string[]>(initialProfile?.characteristics ?? []);
  const [nameInputBorder, setNameInputBorder] = useState('#887e91');

  const isEditing = !!initialProfile;
  const canSave = name.trim().length > 0 && selectedChars.length > 0;
  const atLimit = selectedChars.length >= 4;

  const toggleChar = (c: string) => {
    if (selectedChars.includes(c)) {
      setSelectedChars(selectedChars.filter((x) => x !== c));
    } else if (!atLimit) {
      setSelectedChars([...selectedChars, c]);
    }
  };

  const handleSave = () => {
    if (!canSave) return;
    const id = initialProfile?.id ?? Date.now().toString();
    onSave({ id, name: name.trim(), characteristics: selectedChars });
    onClose();
  };

  const leftCol = ALL_CHARACTERISTICS.slice(0, 7);
  const rightCol = ALL_CHARACTERISTICS.slice(7);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(81,81,81,0.82)', paddingTop: 80, paddingBottom: 40 }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-4 shrink-0"
        style={{
          width: 712,
          background: '#fffcff',
          borderRadius: 24,
          boxShadow: '0px 4px 6px rgba(13,7,18,0.16)',
          paddingTop: 16,
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center cursor-pointer border-0 bg-transparent"
          style={{ top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}
        >
          <div style={{ position: 'relative', width: 20, height: 20 }}>
            <svg style={{ position: 'absolute', inset: '14.58%', width: '70.84%', height: '70.86%' }} viewBox="0 0 14.17 14.17" fill="none">
              <path d={ICON_CLOSE} fill="#494150" />
            </svg>
          </div>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 px-2 py-1">
          <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 20, color: '#0d0712', lineHeight: 1.52 }}>
            {isEditing ? 'Editar perfil de aprendizagem' : 'Criar perfil de aprendizagem'}
          </p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#494150', lineHeight: 1.52 }}>
            Nomeie o perfil e marque as características que melhor representam esse aluno ou grupo
          </p>
        </div>

        {/* Nome do perfil */}
        <div className="px-2">
          <div className="flex flex-col gap-2">
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0d0712', lineHeight: 1.52 }}>
              Nome do perfil*
            </p>
            <div
              className="relative flex items-center"
              style={{ background: '#fffcff', border: `1px solid ${nameInputBorder}`, borderRadius: 8, height: 48 }}
            >
              <input
                type="text"
                placeholder="Ex.: Alunos com TDAH, Turma do reforço, Alunos com dislexia"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#0d0712', padding: '0 16px' }}
                onFocus={() => setNameInputBorder('#8600F4')}
                onBlur={() => setNameInputBorder('#887e91')}
                autoFocus
              />
              {name && (
                <button
                  onClick={() => setName('')}
                  className="flex items-center justify-center border-0 bg-transparent cursor-pointer shrink-0"
                  style={{ width: 20, height: 20, marginRight: 16, position: 'relative' }}
                >
                  <svg style={{ position: 'absolute', inset: '14.58%', width: '70.84%', height: '70.86%' }} viewBox="0 0 14.17 14.17" fill="none">
                    <path d={ICON_CLOSE} fill="#494150" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="flex flex-col gap-2 px-2">
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0d0712', lineHeight: 1.52 }}>
            Características do perfil*
          </p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 10, color: '#494150', lineHeight: 1.36 }}>
            Escolha até 4 características por perfil ({selectedChars.length}/4)
          </p>
          <div className="flex gap-2 pt-2 px-2 overflow-hidden" style={{ background: '#f6f0fb', borderRadius: 8 }}>
            {/* Left column */}
            <div className="flex flex-col gap-2 pb-2" style={{ width: 316 }}>
              {leftCol.map((c) => {
                const checked = selectedChars.includes(c);
                const disabled = !checked && atLimit;
                return (
                  <button
                    key={c}
                    onClick={() => !disabled && toggleChar(c)}
                    disabled={disabled}
                    className="flex items-center gap-[11px] text-left border-0"
                    style={{
                      background: 'white', border: '1px solid #f2f4f6', borderRadius: 10,
                      width: 316, minHeight: 49, paddingTop: 13, paddingBottom: 13, paddingLeft: 13, paddingRight: 13,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Cb16 checked={checked} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: disabled ? '#bab0c3' : '#494150', lineHeight: 1.36, flex: 1 }}>
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-2 pb-2" style={{ width: 318 }}>
              {rightCol.map((c) => {
                const checked = selectedChars.includes(c);
                const disabled = !checked && atLimit;
                return (
                  <button
                    key={c}
                    onClick={() => !disabled && toggleChar(c)}
                    disabled={disabled}
                    className="flex items-center gap-[11px] text-left border-0"
                    style={{
                      background: 'white', border: '1px solid #f2f4f6', borderRadius: 10,
                      width: 318, minHeight: 49, paddingTop: 13, paddingBottom: 13, paddingLeft: 13, paddingRight: 13,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Cb16 checked={checked} />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: disabled ? '#bab0c3' : '#494150', lineHeight: 1.36, flex: 1 }}>
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center justify-center cursor-pointer border-0 bg-transparent"
              style={{ border: '2px solid #4e008e', borderRadius: 8, height: 48, paddingLeft: 24, paddingRight: 24 }}
            >
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#4e008e', letterSpacing: 0.25, lineHeight: 1.36 }}>
                Cancelar
              </span>
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="flex items-center justify-center border-0"
              style={{
                background: canSave ? '#4e008e' : '#e7dfee', borderRadius: 8, height: 48,
                paddingLeft: 24, paddingRight: 24, cursor: canSave ? 'pointer' : 'not-allowed',
              }}
            >
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: canSave ? '#fffcff' : '#a096a9', letterSpacing: 0.25, lineHeight: 1.36 }}>
                {isEditing ? 'Salvar alterações' : 'Criar perfil'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Profiles tab ────────────────────────────────────────────────────────── */

interface ProfilesTabProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
  profileSearch: string;
  setProfileSearch: (v: string) => void;
  filteredProfiles: LearningProfile[];
}

function ProfilesTab({ formData, onChange, profileSearch, setProfileSearch, filteredProfiles }: ProfilesTabProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<LearningProfile | null>(null);

  const handleDelete = (id: string) => {
    onChange({
      allProfiles: formData.allProfiles.filter((p) => p.id !== id),
      selectedProfiles: formData.selectedProfiles.filter((p) => p.id !== id),
    });
  };

  const handleCreateProfile = (profile: LearningProfile) => {
    onChange({ allProfiles: [...formData.allProfiles, profile] });
  };

  const handleUpdateProfile = (updated: LearningProfile) => {
    onChange({
      allProfiles: formData.allProfiles.map((p) => p.id === updated.id ? updated : p),
      selectedProfiles: formData.selectedProfiles.map((p) => p.id === updated.id ? updated : p),
    });
  };

  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto px-7 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, color: '#0d0712', margin: 0 }}>
              Perfis de aprendizagem
            </h2>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#494150', margin: '4px 0 0', lineHeight: 1.5 }}>
              Um perfil representa alunos com dificuldades comuns e que precisam de adaptações. Se houver alunos diferentes, crie perfis distintos.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 cursor-pointer border-0 shrink-0"
            style={{ background: '#8600F4', borderRadius: 8, height: 40, paddingLeft: 20, paddingRight: 20, marginLeft: 16 }}
          >
            <div className="relative shrink-0 overflow-hidden" style={{ width: 16, height: 16 }}>
              <svg style={{ position: 'absolute', inset: '10%', width: '80%', height: '80%' }} viewBox="0 0 14 14" fill="none">
                <path d={ICON_PLUS_14} fill="#fff" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: 0.25, lineHeight: 1.36, whiteSpace: 'nowrap' }}>
              Novo perfil
            </span>
          </button>
        </div>

        <SearchBar value={profileSearch} onChange={setProfileSearch} />

        {/* Profile list */}
        {filteredProfiles.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ paddingBottom: 80 }}>
            <IonicaAtomIcon />
            <div className="flex flex-col items-center gap-1 text-center">
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: '#0D0712', margin: 0 }}>
                Nenhum perfil criado ainda
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#6E6576', margin: 0 }}>
                Crie perfis para adaptar seus planos de aula
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 border-0 cursor-pointer"
              style={{ background: '#8600F4', borderRadius: 8, height: 44, paddingLeft: 20, paddingRight: 20, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#fff' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1V11M1 6H11" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Novo perfil
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-start gap-3 py-4"
                style={{ borderBottom: '1px solid #E7DFEE' }}
              >
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576', margin: 0 }}>
                    20/05 às 17:46
                  </p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#8600F4', margin: '2px 0 4px' }}>
                    {profile.name}
                  </p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: '#494150', margin: 0, lineHeight: 1.5 }}>
                    {profile.characteristics.join(' • ')}
                  </p>
                </div>
                {/* Edit button */}
                <button
                  onClick={() => setEditingProfile(profile)}
                  className="border-0 bg-transparent cursor-pointer shrink-0 flex items-center justify-center rounded-md transition-colors hover:bg-[#F6F0FB]"
                  style={{ width: 32, height: 32 }}
                  title="Editar perfil"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.5 1.5L14.5 4.5L5.5 13.5H2.5V10.5L11.5 1.5Z" stroke="#494150" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(profile.id)}
                  className="border-0 bg-transparent cursor-pointer shrink-0 flex items-center justify-center rounded-md transition-colors hover:bg-[#FFEBEE]"
                  style={{ width: 32, height: 32 }}
                  title="Remover perfil"
                >
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                    <path d="M1 4H13M4.5 4V2.5C4.5 2.22 4.72 2 5 2H9C9.28 2 9.5 2.22 9.5 2.5V4M5.5 7V13M8.5 7V13M2 4L2.5 14C2.5 14.55 2.95 15 3.5 15H10.5C11.05 15 11.5 14.55 11.5 14L12 4H2Z" stroke="#C62828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              className="mt-6 px-6 py-2.5 rounded-lg cursor-pointer self-end"
              style={{ border: '1.5px solid #D3CADB', background: 'transparent', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#494150' }}
            >
              Carregar mais
            </button>
          </div>
        )}
      </div>

      {/* Create modal */}
      {showCreateModal && (
        <CreateProfileModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateProfile}
        />
      )}

      {/* Edit modal */}
      {editingProfile && (
        <CreateProfileModal
          onClose={() => setEditingProfile(null)}
          onSave={(updated) => { handleUpdateProfile(updated); setEditingProfile(null); }}
          initialProfile={editingProfile}
        />
      )}
    </>
  );
}

/* ── Main flow ──────────────────────────────────────────────────────────── */

export function LessonPlanFlow({ onClose }: LessonPlanFlowProps) {
  const [step, setStep] = useState<FlowStep>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [activeTab, setActiveTab] = useState<'new' | 'history' | 'saved' | 'profiles'>('new');
  const [history, setHistory] = useState<HistoryItem[]>(MOCK_HISTORY);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(MOCK_SAVED);
  const [showAlert, setShowAlert] = useState(false);
  const [newHistoryCount, setNewHistoryCount] = useState(0);
  const [newSavedCount, setNewSavedCount] = useState(0);
  const [viewingPlan, setViewingPlan] = useState<HistoryItem | SavedPlan | null>(null);
  const [editingSavedId, setEditingSavedId] = useState<string | null>(null);
  const [editingSavedTitle, setEditingSavedTitle] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [savedSearch, setSavedSearch] = useState('');
  const [profileSearch, setProfileSearch] = useState('');

  const filteredHistory = historySearch
    ? history.filter((h) => h.title.toLowerCase().includes(historySearch.toLowerCase()))
    : history;

  const filteredSaved = savedSearch
    ? savedPlans.filter((s) => s.title.toLowerCase().includes(savedSearch.toLowerCase()))
    : savedPlans;

  const filteredProfiles = profileSearch
    ? formData.allProfiles.filter((p) => p.name.toLowerCase().includes(profileSearch.toLowerCase()))
    : formData.allProfiles;

  const updateForm = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const isStep1Valid = !!formData.year && formData.subject.length > 0 && !!formData.numLessons && !!formData.lessonTime;
  const isStep2Valid = !!formData.topic;
  const isStep3Valid = true;

  const canContinue =
    (step === 1 && isStep1Valid) ||
    (step === 2 && isStep2Valid) ||
    (step === 3 && isStep3Valid);

  const handleContinue = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep('loading');
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 'result') setStep(3);
  };

  const buildPlanTags = useCallback((): PlanTags => ({
    year: formData.year || '1º Ano – Ensino Fundamental',
    subject: formData.subject.length > 0 ? formData.subject : ['Ciências'],
    bnccSkills: formData.bnccSkills,
    adapted: formData.inclusivePlan || formData.selectedProfiles.length > 0,
  }), [formData]);

  const handleLoadingComplete = useCallback(() => {
    setStep('result');
    const snapshot: PlanoFormData = {
      year: formData.year,
      subject: formData.subject,
      numLessons: formData.numLessons,
      lessonTime: formData.lessonTime,
      topic: formData.topic,
      bnccSkills: formData.bnccSkills,
      inclusivePlan: formData.inclusivePlan,
      resources: formData.resources,
      selectedProfiles: formData.selectedProfiles,
    };
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ' às'),
      title: formData.topic || 'Novo plano de aula',
      tags: buildPlanTags(),
      isNew: true,
      snapshot,
    };
    setHistory((prev) => [newItem, ...prev]);
    setNewHistoryCount((prev) => prev + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, [formData, buildPlanTags]);

  const handleRegenerate = () => { setStep('loading'); };

  const isFormStep = step === 1 || step === 2 || step === 3;
  const showBack = step === 2 || step === 3 || step === 'result';

  const handleSavePlan = () => {
    const snapshot: PlanoFormData = {
      year: formData.year,
      subject: formData.subject,
      numLessons: formData.numLessons,
      lessonTime: formData.lessonTime,
      topic: formData.topic,
      bnccSkills: formData.bnccSkills,
      inclusivePlan: formData.inclusivePlan,
      resources: formData.resources,
      selectedProfiles: formData.selectedProfiles,
    };
    const newSaved: SavedPlan = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ' às'),
      title: formData.topic || 'Novo plano de aula',
      tags: buildPlanTags(),
      isNew: true,
      snapshot,
    };
    setSavedPlans((prev) => [newSaved, ...prev]);
    setNewSavedCount((prev) => prev + 1);
  };

  const handleTabChange = (key: typeof activeTab) => {
    setActiveTab(key);
    setViewingPlan(null);
    if (key === 'history') {
      setNewHistoryCount(0);
      setHistory((prev) => prev.map((item) => ({ ...item, isNew: false })));
    } else if (key === 'saved') {
      setNewSavedCount(0);
      setSavedPlans((prev) => prev.map((item) => ({ ...item, isNew: false })));
    }
  };

  /* saved plan edit helpers */
  const startEditSaved = (item: SavedPlan) => {
    setEditingSavedId(item.id);
    setEditingSavedTitle(item.title);
  };
  const commitEditSaved = () => {
    if (!editingSavedId) return;
    setSavedPlans((prev) => prev.map((p) => p.id === editingSavedId ? { ...p, title: editingSavedTitle } : p));
    setEditingSavedId(null);
  };
  const cancelEditSaved = () => setEditingSavedId(null);

  /* saved plan delete */
  const deleteSaved = (id: string) => {
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
  };

  /* saved plan duplicate */
  const duplicateSaved = (item: SavedPlan) => {
    const copy: SavedPlan = {
      ...item,
      id: Date.now().toString(),
      title: `Cópia de ${item.title}`,
      date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ' às'),
      isNew: false,
    };
    setSavedPlans((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  /* history remove */
  const removeHistory = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 relative" style={{ background: '#fff' }}>
      {/* Alert */}
      {showAlert && (
        <div className="absolute top-4 left-1/2 z-50" style={{ transform: 'translateX(-50%)', width: 600, maxWidth: '90%' }}>
          <div className="bg-[#aeffd3] flex items-start overflow-clip rounded-[4px]" style={{ boxShadow: '0px 4px 8px 0px rgba(120,120,120,0.12)' }}>
            <div className="bg-[#0f9f4f] shrink-0" style={{ width: 2, alignSelf: 'stretch' }} />
            <div className="flex-1 p-4">
              <div className="flex gap-4 items-start w-full">
                <div className="shrink-0" style={{ width: 20, height: 20 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.1914 0.273633C17.5898 0.64082 17.5898 1.23457 17.1914 1.5666L6.87891 11.8791C6.54688 12.2775 5.95312 12.2775 5.58594 11.8791L0.27457 6.5666C-0.0915234 6.23457 -0.0915234 5.64082 0.27457 5.27363C0.640625 4.91035 1.23438 4.91035 1.60039 5.27363L6.25 9.92598L15.8984 0.273633C16.2656 -0.0912109 16.8594 -0.0912109 17.1914 0.273633Z" fill="#0F9F4F" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0d0712', lineHeight: 1.4, margin: 0 }}>
                    Plano de aula criado com sucesso!
                  </p>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="shrink-0 border-0 bg-transparent cursor-pointer flex items-center justify-center"
                  style={{ width: 20, height: 20 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13.9861 0.182992C13.8689 0.0658222 13.7099 0 13.5442 0C13.3785 0 13.2195 0.0658222 13.1023 0.182992L7.08584 6.19941L1.06942 0.182992C0.952215 0.0658222 0.793272 0 0.627544 0C0.461816 0 0.302874 0.0658222 0.185669 0.182992C0.0684997 0.300196 0.0026775 0.459139 0.0026775 0.624867C0.0026775 0.790594 0.0684997 0.949537 0.185669 1.06674L6.20209 7.08316L0.185669 13.0997C0.127074 13.1576 0.0805052 13.2265 0.0486414 13.3024C0.0167776 13.3784 0.000247693 13.4599 2.76245e-06 13.5423C-0.000242168 13.6247 0.0158026 13.7063 0.0472141 13.7824C0.0786256 13.8586 0.124784 13.9278 0.183034 13.986C0.241284 14.0443 0.310476 14.0905 0.38663 14.1219C0.462784 14.1533 0.544397 14.1693 0.626775 14.1691C0.709152 14.1688 0.790669 14.1523 0.866635 14.1204C0.9426 14.0886 1.01152 14.042 1.06942 13.9834L7.08584 7.96699L13.1023 13.9834L13.1495 14.0266C13.2696 14.1242 13.4216 14.1738 13.5761 14.1658C13.7306 14.1578 13.8767 14.0928 13.9861 13.9834C14.0955 13.874 14.1605 13.7279 14.1685 13.5734C14.1765 13.4189 14.1268 13.2669 14.0293 13.1468L13.9861 13.0997L7.96967 7.08316L13.9861 1.06674C14.1033 0.949537 14.1691 0.790594 14.1691 0.624867C14.1691 0.459139 14.1033 0.300196 13.9861 0.182992Z" fill="#787878" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center px-6 shrink-0 gap-1" style={{ borderBottom: '1px solid #E7DFEE', height: 52 }}>
        {[
          { key: 'new', label: '+ Criar plano de aula', icon: null, badge: 0 },
          { key: 'history', label: 'Histórico', icon: <IconHistory />, badge: newHistoryCount },
          { key: 'saved', label: 'Planos salvos', icon: <IconSaved />, badge: newSavedCount },
          { key: 'profiles', label: 'Perfis de aprendizagem', icon: <IconProfiles />, badge: 0 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key as typeof activeTab)}
            className="flex items-center gap-1.5 px-2 py-3.5 border-0 cursor-pointer transition-colors"
            style={{
              background: 'transparent',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 13,
              fontWeight: activeTab === tab.key ? 600 : 500,
              color: activeTab === tab.key ? '#8600F4' : '#6E6576',
              borderBottom: `2.5px solid ${activeTab === tab.key ? '#8600F4' : 'transparent'}`,
              marginBottom: -1,
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.badge > 0 && (
              <div className="flex items-center justify-center rounded-full shrink-0" style={{ background: '#FF0098', width: 18, height: 18, marginLeft: 4 }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 10, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {tab.badge}
                </span>
              </div>
            )}
          </button>
        ))}
        <div className="flex-1" />
        {/* Help / info button */}
        <button
          className="flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer hover:bg-[#F6F0FB]"
          style={{ width: 32, height: 32 }}
          title="Ajuda"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#A096A9" strokeWidth="1.4" />
            <path d="M7 9.5V10" stroke="#A096A9" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M7 4.5C7 4.5 5.5 4.5 5.5 6C5.5 7 6.5 7.25 7 7.5C7.5 7.75 7.5 8 7.5 8.5" stroke="#A096A9" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Loading */}
      {activeTab === 'new' && step === 'loading' && (
        <LoadingPlan onComplete={handleLoadingComplete} />
      )}

      {/* Result */}
      {activeTab === 'new' && step === 'result' && (
        <PlanoGerado formData={formData} onRegenerate={handleRegenerate} onSave={handleSavePlan} />
      )}

      {/* ── History tab ─────────────────────────────────────────────── */}
      {activeTab === 'history' && !viewingPlan && (
        <div className="flex flex-col flex-1 overflow-y-auto px-7 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, color: '#0d0712', margin: 0 }}>
              Histórico dos planos de aula criados por você
            </h2>
            <button
              onClick={() => setHistory([])}
              className="border-0 bg-transparent cursor-pointer"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#8600F4' }}
            >
              Excluir histórico
            </button>
          </div>

          <SearchBar value={historySearch} onChange={setHistorySearch} />

          {filteredHistory.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ paddingBottom: 80 }}>
              <IonicaAtomIcon />
              <div className="flex flex-col items-center gap-1 text-center">
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: '#0D0712', margin: 0 }}>
                  Crie seu primeiro plano de aula
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#6E6576', margin: 0 }}>
                  Ao criar planos de aula, seu histórico fica aqui
                </p>
              </div>
              <button
                onClick={() => handleTabChange('new')}
                className="flex items-center gap-2 border-0 cursor-pointer"
                style={{ background: '#8600F4', borderRadius: 8, height: 44, paddingLeft: 20, paddingRight: 20, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#fff' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Criar plano de aula
              </button>
            </div>
          ) : (
            <>
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 py-4 cursor-pointer hover:bg-[#FDFAFF] transition-colors rounded-lg px-2 -mx-2"
                  style={{ borderBottom: '1px solid #E7DFEE' }}
                  onClick={() => setViewingPlan(item)}
                >
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576', margin: 0 }}>
                      {item.date}
                    </p>
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 500, color: '#0d0712', margin: '2px 0 0' }}>
                      {item.title}
                    </p>
                    <PlanTagList tags={item.tags} />
                  </div>
                  <ItemMenu
                    actions={[
                      {
                        label: 'Visualizar',
                        icon: <IcoEye />,
                        onClick: () => setViewingPlan(item),
                      },
                      {
                        label: 'Remover',
                        icon: <IcoTrash />,
                        onClick: () => removeHistory(item.id),
                        danger: true,
                      },
                    ]}
                  />
                </div>
              ))}
              <button
                className="mt-6 px-6 py-2.5 rounded-lg cursor-pointer self-end"
                style={{ border: '1.5px solid #D3CADB', background: 'transparent', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#494150' }}
              >
                Carregar mais
              </button>
            </>
          )}
        </div>
      )}

      {/* History full-screen plan view */}
      {activeTab === 'history' && viewingPlan && (
        <PlanFullScreenView
          item={viewingPlan}
          onBack={() => setViewingPlan(null)}
        />
      )}

      {/* ── Saved tab ───────────────────────────────────────────────── */}
      {activeTab === 'saved' && !viewingPlan && (
        <div className="flex flex-col flex-1 overflow-y-auto px-7 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 20, color: '#0d0712', margin: 0 }}>
              Planos de aula que você salvou para acessar mais tarde
            </h2>
          </div>

          <SearchBar value={savedSearch} onChange={setSavedSearch} />

          {filteredSaved.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ paddingBottom: 80 }}>
              <IonicaAtomIcon />
              <div className="flex flex-col items-center gap-1 text-center">
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 16, fontWeight: 700, color: '#0D0712', margin: 0 }}>
                  Nenhum plano salvo ainda
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#6E6576', margin: 0 }}>
                  Ao salvar um plano de aula, ele aparece aqui
                </p>
              </div>
              <button
                onClick={() => handleTabChange('new')}
                className="flex items-center gap-2 border-0 cursor-pointer"
                style={{ background: '#8600F4', borderRadius: 8, height: 44, paddingLeft: 20, paddingRight: 20, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#fff' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Criar plano de aula
              </button>
            </div>
          ) : (
            <>
              {filteredSaved.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 py-4 cursor-pointer hover:bg-[#FDFAFF] transition-colors rounded-lg px-2 -mx-2"
                  style={{ borderBottom: '1px solid #E7DFEE' }}
                  onClick={() => setViewingPlan(item)}
                >
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576', margin: 0 }}>
                      {item.date}
                    </p>
                    {editingSavedId === item.id ? (
                      <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                        <input
                          value={editingSavedTitle}
                          onChange={(e) => setEditingSavedTitle(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') commitEditSaved(); if (e.key === 'Escape') cancelEditSaved(); }}
                          autoFocus
                          className="flex-1 outline-none rounded-md px-2 py-1"
                          style={{
                            fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 500, color: '#0d0712',
                            border: '1.5px solid #8600F4', background: '#fff', minWidth: 0,
                          }}
                        />
                        <button
                          onClick={commitEditSaved}
                          className="border-0 cursor-pointer rounded-md px-3 py-1 shrink-0"
                          style={{ background: '#4E008E', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#fff' }}
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelEditSaved}
                          className="border-0 bg-transparent cursor-pointer shrink-0"
                          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576' }}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 500, color: '#0d0712', margin: '2px 0 0' }}>
                        {item.title}
                      </p>
                    )}
                    <PlanTagList tags={item.tags} />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <ItemMenu
                      actions={[
                        {
                          label: 'Visualizar',
                          icon: <IcoEye />,
                          onClick: () => setViewingPlan(item),
                        },
                        {
                          label: 'Editar título',
                          icon: <IcoPencil />,
                          onClick: () => startEditSaved(item),
                        },
                        {
                          label: 'Duplicar',
                          icon: <IcoDuplicate />,
                          onClick: () => duplicateSaved(item),
                        },
                        {
                          label: 'Excluir',
                          icon: <IcoTrash />,
                          onClick: () => deleteSaved(item.id),
                          danger: true,
                        },
                      ]}
                    />
                  </div>
                </div>
              ))}
              <button
                className="mt-6 px-6 py-2.5 rounded-lg cursor-pointer self-end"
                style={{ border: '1.5px solid #D3CADB', background: 'transparent', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#494150' }}
              >
                Carregar mais
              </button>
            </>
          )}
        </div>
      )}

      {/* Saved full-screen plan view */}
      {activeTab === 'saved' && viewingPlan && (
        <PlanFullScreenView
          item={viewingPlan}
          onBack={() => setViewingPlan(null)}
        />
      )}

      {/* Profiles tab */}
      {activeTab === 'profiles' && (
        <ProfilesTab
          formData={formData}
          onChange={updateForm}
          profileSearch={profileSearch}
          setProfileSearch={setProfileSearch}
          filteredProfiles={filteredProfiles}
        />
      )}

      {/* Form steps */}
      {activeTab === 'new' && isFormStep && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center justify-between px-7 pt-5 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 200, fontSize: 32, lineHeight: 1.2 }}>
                <span style={{ color: '#4E008E' }}>Criar </span>
                <span style={{ background: 'linear-gradient(90deg, #8600F4 0%, #FF0098 50%, #FF7500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  plano de aula
                </span>
              </h1>
              <button
                className="flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer"
                style={{ width: 28, height: 28 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#A096A9" strokeWidth="1.4" />
                  <path d="M7 5.5V6M7 8V10" stroke="#A096A9" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="7" cy="5.5" r="0.6" fill="#A096A9" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              {showBack && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 border-0 bg-transparent cursor-pointer"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: '#8600F4' }}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M14 7H2M2 7L7 2M2 7L7 12" stroke="#8600F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Voltar
                </button>
              )}
              {step === 3 ? (
                <button
                  onClick={canContinue ? handleContinue : undefined}
                  disabled={!canContinue}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-0 transition-all"
                  style={{
                    background: canContinue ? 'linear-gradient(135deg, #8600F4 0%, #FF0098 100%)' : '#E7DFEE',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700,
                    color: canContinue ? '#fff' : '#A096A9', cursor: canContinue ? 'pointer' : 'not-allowed',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5 1L8.8 5.2L13 7.5L8.8 9.8L7.5 14L6.2 9.8L2 7.5L6.2 5.2L7.5 1Z" fill={canContinue ? 'white' : '#A096A9'} />
                  </svg>
                  Criar plano de aula
                </button>
              ) : (
                <button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all"
                  style={{
                    background: canContinue ? '#8600F4' : '#E7DFEE',
                    borderColor: canContinue ? '#8600F4' : '#E7DFEE',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600,
                    color: canContinue ? '#fff' : '#A096A9', cursor: canContinue ? 'pointer' : 'default',
                  }}
                >
                  Continuar
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M2 7H14M10 2L14 7L10 12" stroke={canContinue ? 'white' : '#D3CADB'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Stepper + content */}
          <div className="flex gap-8 flex-1 overflow-hidden px-7 pb-6">
            <StepIndicator step={step} />
            <div style={{ width: 1, background: '#E7DFEE', flexShrink: 0 }} />
            <div className="flex-1 overflow-y-auto pr-2">
              {step === 1 && (
                <StepContexto
                  formData={{ year: formData.year, subject: formData.subject, numLessons: formData.numLessons, lessonTime: formData.lessonTime }}
                  onChange={updateForm}
                />
              )}
              {step === 2 && (
                <StepTematica
                  formData={{ topic: formData.topic, bnccSkills: formData.bnccSkills }}
                  onChange={updateForm}
                  selectedYear={formData.year}
                  selectedSubject={formData.subject[0] ?? ''}
                />
              )}
              {step === 3 && (
                <StepAdaptacoes
                  formData={{ inclusivePlan: formData.inclusivePlan, selectedProfiles: formData.selectedProfiles, allProfiles: formData.allProfiles, resources: formData.resources }}
                  onChange={updateForm}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ── Iônica atom empty-state icon ───────────────────────────────────────── */

function IonicaAtomIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center nucleus */}
      <circle cx="48" cy="48" r="10" fill="#8600F4" />
      {/* Orbit 1 – horizontal ellipse */}
      <ellipse cx="48" cy="48" rx="44" ry="18" stroke="#BAB0C3" strokeWidth="1.8" fill="none" />
      {/* Orbit 2 – rotated 60° */}
      <ellipse cx="48" cy="48" rx="44" ry="18" stroke="#BAB0C3" strokeWidth="1.8" fill="none"
        transform="rotate(60 48 48)" />
      {/* Orbit 3 – rotated 120° */}
      <ellipse cx="48" cy="48" rx="44" ry="18" stroke="#BAB0C3" strokeWidth="1.8" fill="none"
        transform="rotate(120 48 48)" />
      {/* Small electron dots */}
      <circle cx="92" cy="48" r="4" fill="#BAB0C3" />
      <circle cx="25" cy="12" r="4" fill="#BAB0C3" />
      <circle cx="25" cy="84" r="4" fill="#BAB0C3" />
    </svg>
  );
}

/* ── Tab icons ───────────────────────────────────────────────────────────── */

function IconHistory() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.5 4V7.5L10 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSaved() {
  return (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
      <path d="M2 2C2 1.45 2.45 1 3 1H11C11.55 1 12 1.45 12 2V13.5L7 11L2 13.5V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function IconProfiles() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="5.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 13C1 10.79 3.02 9 5.5 9C7.98 9 10 10.79 10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 6H14M12.5 4.5V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Context menu action icons ───────────────────────────────────────────── */

function IcoEye() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7C1 7 3 3 7 3C11 3 13 7 13 7C13 7 11 11 7 11C3 11 1 7 1 7Z" stroke="#494150" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="7" cy="7" r="1.5" stroke="#494150" strokeWidth="1.3" />
    </svg>
  );
}

function IcoTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5H12M5 3.5V2.5C5 2.22 5.22 2 5.5 2H8.5C8.78 2 9 2.22 9 2.5V3.5M5.5 6V11M8.5 6V11M3 3.5L3.5 12H10.5L11 3.5H3Z" stroke="#C62828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoPencil() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z" stroke="#494150" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoDuplicate() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1" stroke="#494150" strokeWidth="1.3" />
      <path d="M3 10V3C3 2.45 3.45 2 4 2H11" stroke="#494150" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
