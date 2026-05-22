import { useState } from 'react';

// DS iônica SVG path data
const ICON_PERSON = "M15.2438 14.985C14.5275 13.2338 12.8063 12 10.8 12H8.4C6.39375 12 4.6725 13.2338 3.95625 14.985C2.62125 13.5863 1.8 11.6888 1.8 9.6C1.8 5.29125 5.29125 1.8 9.6 1.8C13.9088 1.8 17.4 5.29125 17.4 9.6C17.4 11.6888 16.5788 13.5825 15.2438 14.985ZM13.74 16.2113C12.54 16.965 11.1225 17.4 9.6 17.4C8.0775 17.4 6.66 16.965 5.45625 16.2113C5.73 14.835 6.945 13.8 8.4 13.8H10.8C12.255 13.8 13.47 14.835 13.7438 16.2113H13.74ZM9.6 19.2C14.9025 19.2 19.2 14.9025 19.2 9.6C19.2 4.2975 14.9025 0 9.6 0C4.2975 0 0 4.2975 0 9.6C0 14.9025 4.2975 19.2 9.6 19.2ZM9.6 9C8.77125 9 8.1 8.32875 8.1 7.5C8.1 6.67125 8.77125 6 9.6 6C10.4288 6 11.1 6.67125 11.1 7.5C11.1 8.32875 10.4288 9 9.6 9ZM6.3 7.5C6.3 9.3225 7.7775 10.8 9.6 10.8C11.4225 10.8 12.9 9.3225 12.9 7.5C12.9 5.6775 11.4225 4.2 9.6 4.2C7.7775 4.2 6.3 5.6775 6.3 7.5Z";
const ICON_RADIO_ON = "M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C1.44801e-07 4.47715 4.47715 1.44806e-07 10 0ZM10 7.14355C8.42223 7.14355 7.14355 8.42223 7.14355 10C7.14358 11.5778 8.42224 12.8564 10 12.8564C11.5777 12.8564 12.8564 11.5777 12.8564 10C12.8564 8.42224 11.5778 7.14358 10 7.14355Z";
const ICON_CHEVRON_SM = "M5.02625 5.02375C4.79125 5.25875 4.41125 5.25875 4.17875 5.02375L0.17625 1.02375C-0.05875 0.78875 -0.05875 0.40875 0.17625 0.17625C0.41125 -0.05625 0.79125 -0.05875 1.02375 0.17625L4.59875 3.75125L8.17375 0.17625C8.40875 -0.05875 8.78875 -0.05875 9.02125 0.17625C9.25375 0.41125 9.25625 0.79125 9.02125 1.02375L5.02125 5.02375H5.02625Z";
const ICON_CHEVRON_LG = "M6.28281 6.27969C5.98906 6.57344 5.51406 6.57344 5.22344 6.27969L0.220312 1.27969C-0.0734375 0.985937 -0.0734375 0.510937 0.220312 0.220312C0.514062 -0.0703125 0.989062 -0.0734375 1.27969 0.220312L5.74844 4.68906L10.2172 0.220312C10.5109 -0.0734375 10.9859 -0.0734375 11.2766 0.220312C11.5672 0.514062 11.5703 0.989062 11.2766 1.27969L6.27656 6.27969H6.28281Z";
const ICON_RESOURCES = "M5.38437 5.5H9.61562L7.5 1.97188L5.38437 5.5ZM7.5 0C7.85 0 8.17812 0.184375 8.35625 0.484375L11.3562 5.48438C11.5406 5.79375 11.5469 6.17813 11.3687 6.49063C11.1906 6.80313 10.8594 7 10.5 7H4.5C4.14062 7 3.80625 6.80625 3.63125 6.49375C3.45625 6.18125 3.45937 5.79688 3.64375 5.4875L6.64375 0.4875C6.82187 0.184375 7.15 0 7.5 0ZM3.5 14C4.60312 14 5.5 13.1031 5.5 12C5.5 10.8969 4.60312 10 3.5 10C2.39687 10 1.5 10.8969 1.5 12C1.5 13.1031 2.39687 14 3.5 14ZM3.5 8.5C5.43437 8.5 7 10.0656 7 12C7 13.9344 5.43437 15.5 3.5 15.5C1.56562 15.5 0 13.9344 0 12C0 10.0656 1.56562 8.5 3.5 8.5ZM10 13.5H13V10.5H10V13.5ZM9.75 9H13.25C13.9406 9 14.5 9.55938 14.5 10.25V13.75C14.5 14.4406 13.9406 15 13.25 15H9.75C9.05937 15 8.5 14.4406 8.5 13.75V10.25C8.5 9.55938 9.05937 9 9.75 9Z";
const ICON_CB20_BG = "M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z";
const ICON_CB20_CHECK = "M5.31736 9.20848C4.90595 9.62112 4.88028 10.3142 5.32428 10.7262L7.94224 13.3449C8.35614 13.786 9.05937 13.813 9.47168 13.3382L14.6532 8.15651C15.1256 7.74624 15.1012 7.04793 14.6663 6.63325C14.2538 6.19635 13.5654 6.22336 13.1546 6.63161L8.71587 11.073L6.85252 9.20814L6.85124 9.20687C6.4278 8.7866 5.74242 8.78662 5.31898 9.20685L5.31736 9.20848Z";
const ICON_CB16_BG = "M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z";
const ICON_CB16_CHECK = "M4.25389 7.36619C3.92476 7.69631 3.90422 8.25077 4.25943 8.58041L6.3538 10.6753C6.68491 11.0283 7.2475 11.0498 7.57734 10.67L11.7225 6.52462C12.1004 6.19641 12.081 5.63776 11.7331 5.30601C11.403 4.9565 10.8523 4.97811 10.5236 5.3047L6.9727 8.85785L5.48202 7.36593L5.48099 7.36491C5.14224 7.02869 4.59394 7.02871 4.25518 7.36489L4.25389 7.36619Z";
const ICON_CB16_EMPTY = "M4 0.5H12C13.933 0.5 15.5 2.067 15.5 4V12C15.5 13.933 13.933 15.5 12 15.5H4C2.067 15.5 0.5 13.933 0.5 12V4C0.5 2.067 2.067 0.5 4 0.5Z";
const ICON_PLUS_14 = "M7.75 0.75C7.75 0.334375 7.41563 0 7 0C6.58437 0 6.25 0.334375 6.25 0.75V6.25H0.75C0.334375 6.25 0 6.58437 0 7C0 7.41563 0.334375 7.75 0.75 7.75H6.25V13.25C6.25 13.6656 6.58437 14 7 14C7.41563 14 7.75 13.6656 7.75 13.25V7.75H13.25C13.6656 7.75 14 7.41563 14 7C14 6.58437 13.6656 6.25 13.25 6.25H7.75V0.75Z";
const ICON_CLOSE = "M13.9861 0.182992C13.8689 0.0658222 13.7099 0 13.5442 0C13.3785 0 13.2195 0.0658222 13.1023 0.182992L7.08584 6.19941L1.06942 0.182992C0.952215 0.0658222 0.793272 0 0.627544 0C0.461816 0 0.302874 0.0658222 0.185669 0.182992C0.0684997 0.300196 0.0026775 0.459139 0.0026775 0.624867C0.0026775 0.790594 0.0684997 0.949537 0.185669 1.06674L6.20209 7.08316L0.185669 13.0997C0.127074 13.1576 0.0805052 13.2265 0.0486414 13.3024C0.0167776 13.3784 0.000247693 13.4599 2.76245e-06 13.5423C-0.000242168 13.6247 0.0158026 13.7063 0.0472141 13.7824C0.0786256 13.8586 0.124784 13.9278 0.183034 13.986C0.241284 14.0443 0.310476 14.0905 0.38663 14.1219C0.462784 14.1533 0.544397 14.1693 0.626775 14.1691C0.709152 14.1688 0.790669 14.1523 0.866635 14.1204C0.9426 14.0886 1.01152 14.042 1.06942 13.9834L7.08584 7.96699L13.1023 13.9834L13.1495 14.0266C13.2696 14.1242 13.4216 14.1738 13.5761 14.1658C13.7306 14.1578 13.8767 14.0928 13.9861 13.9834C14.0955 13.874 14.1605 13.7279 14.1685 13.5734C14.1765 13.4189 14.1268 13.2669 14.0293 13.1468L13.9861 13.0997L7.96967 7.08316L13.9861 1.06674C14.1033 0.949537 14.1691 0.790594 14.1691 0.624867C14.1691 0.459139 14.1033 0.300196 13.9861 0.182992Z";

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

const RESOURCES = [
  'Lousa digital',
  'Projetor multimídia',
  'Chromebooks / Tablets',
  'Material impresso',
  'Laboratório de ciências',
  'Biblioteca',
  'Material de arte',
  'Instrumentos musicais',
];

export interface LearningProfile {
  id: string;
  name: string;
  characteristics: string[];
}

export const DEFAULT_PROFILES: LearningProfile[] = [
  {
    id: 'tdah',
    name: 'TDAH',
    characteristics: [
      'Necessita de apoio frente a desafios novos',
      'Necessita de apoio para manter a atenção',
      'Necessita de apoio visual e/ou concretos',
      'Engaja-se melhor em atividades curtas',
    ],
  },
  {
    id: 'dislexia',
    name: 'Dislexia',
    characteristics: [
      'Necessita de apoio para manter a atenção',
      'Necessita de apoio visual e/ou concretos',
      'Beneficia-se de ambientes com menos estímulos',
      'Necessita de tempo ampliado para realizar atividades',
    ],
  },
  {
    id: 'tea',
    name: 'TEA',
    characteristics: [
      'Necessita de organização, rotina e previsibilidade',
      'Necessita de rotinas e combinados',
      'Beneficia-se da antecipação de mudanças',
      'Necessita de apoio em atividades em grupo',
    ],
  },
  {
    id: 'daltonismo',
    name: 'Daltonismo',
    characteristics: [
      'Necessita de apoio visual e/ou concretos',
      'Beneficia-se de ambientes com menos estímulos',
    ],
  },
  {
    id: 'baixa_visao',
    name: 'Baixa visão',
    characteristics: [
      'Necessita de apoio visual e/ou concretos',
      'Necessita de tempo ampliado para realizar atividades',
      'Beneficia-se de ambientes com menos estímulos',
    ],
  },
];

export interface AdaptacoesFormData {
  inclusivePlan: boolean;
  selectedProfiles: LearningProfile[];
  allProfiles: LearningProfile[];
  resources: string[];
}

interface StepAdaptacoesProps {
  formData: AdaptacoesFormData;
  onChange: (data: Partial<AdaptacoesFormData>) => void;
}

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

function Cb20({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 20 20">
          <clipPath id="cb20clip">
            <rect width="20" height="20" fill="white" />
          </clipPath>
          <g clipPath="url(#cb20clip)">
            <path d={ICON_CB20_BG} fill="#32A124" />
            <path d={ICON_CB20_CHECK} fill="#FFFCFF" fillRule="evenodd" clipRule="evenodd" />
          </g>
        </svg>
      </div>
    );
  }
  return (
    <div className="relative shrink-0" style={{ width: 20, height: 20, borderRadius: 4, border: '2px solid #BAB0C3' }} />
  );
}

interface CreateProfileModalProps {
  onClose: () => void;
  onSave: (profile: LearningProfile) => void;
}

function CreateProfileModal({ onClose, onSave }: CreateProfileModalProps) {
  const [name, setName] = useState('');
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  const [nameInputBorder, setNameInputBorder] = useState('#887e91');

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
    onSave({ id: Date.now().toString(), name: name.trim(), characteristics: selectedChars });
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
            Criar perfil de aprendizagem
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
                      background: 'white',
                      border: '1px solid #f2f4f6',
                      borderRadius: 10,
                      width: 316,
                      minHeight: 49,
                      paddingTop: 13,
                      paddingBottom: 13,
                      paddingLeft: 13,
                      paddingRight: 13,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Cb16 checked={checked} />
                    <span
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 12,
                        color: disabled ? '#bab0c3' : '#494150',
                        lineHeight: 1.36,
                        flex: 1,
                      }}
                    >
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
                      background: 'white',
                      border: '1px solid #f2f4f6',
                      borderRadius: 10,
                      width: 318,
                      minHeight: 49,
                      paddingTop: 13,
                      paddingBottom: 13,
                      paddingLeft: 13,
                      paddingRight: 13,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Cb16 checked={checked} />
                    <span
                      style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 12,
                        color: disabled ? '#bab0c3' : '#494150',
                        lineHeight: 1.36,
                        flex: 1,
                      }}
                    >
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
                background: canSave ? '#4e008e' : '#e7dfee',
                borderRadius: 8,
                height: 48,
                paddingLeft: 24,
                paddingRight: 24,
                cursor: canSave ? 'pointer' : 'not-allowed',
              }}
            >
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: canSave ? '#fffcff' : '#a096a9', letterSpacing: 0.25, lineHeight: 1.36 }}>
                Criar perfil
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StepAdaptacoes({ formData, onChange }: StepAdaptacoesProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const selectedProfiles: LearningProfile[] = formData.selectedProfiles ?? [];
  const allProfiles: LearningProfile[] = formData.allProfiles ?? DEFAULT_PROFILES;
  const inclusivePlan = formData.inclusivePlan ?? false;
  const resources: string[] = formData.resources ?? [];

  const toggleResource = (r: string) => {
    if (resources.includes(r)) {
      onChange({ resources: resources.filter((x) => x !== r) });
    } else if (resources.length < 5) {
      onChange({ resources: [...resources, r] });
    }
  };

  const atProfileLimit = selectedProfiles.length >= 4;

  const toggleProfile = (profile: LearningProfile) => {
    if (selectedProfiles.find((p) => p.id === profile.id)) {
      onChange({ selectedProfiles: selectedProfiles.filter((p) => p.id !== profile.id) });
    } else if (!atProfileLimit) {
      onChange({ selectedProfiles: [...selectedProfiles, profile] });
    }
  };

  const handleCreateProfile = (profile: LearningProfile) => {
    onChange({
      allProfiles: [...allProfiles, profile],
      selectedProfiles: [...selectedProfiles, profile],
    });
  };

  const atResourceLimit = resources.length >= 5;

  const dropdownTriggerLabel =
    selectedProfiles.length === 0
      ? 'Selecione'
      : selectedProfiles.length === 1
      ? 'Selecionado (1)'
      : `Selecionados (${selectedProfiles.length})`;

  return (
    <div className="flex flex-col">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, color: '#0d0712', lineHeight: 1.36 }}>
          Adaptações
        </h2>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#494150' }}>
          *Campos obrigatórios
        </span>
      </div>

      {/* Criar plano inclusivo card */}
      <button
        onClick={() => {
          const next = !inclusivePlan;
          onChange({ inclusivePlan: next });
          if (!next) setDropdownOpen(false);
        }}
        className="flex items-center gap-4 text-left cursor-pointer border-0 w-full mb-6"
        style={{
          background: inclusivePlan ? '#f4e8fe' : 'white',
          border: `1px solid ${inclusivePlan ? '#8600f4' : '#d3cadb'}`,
          borderRadius: 16,
          padding: 16,
          transition: 'background 0.15s, border-color 0.15s',
        }}
      >
        {/* Person icon */}
        <div className="relative shrink-0 overflow-hidden" style={{ width: 24, height: 24 }}>
          <svg style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%' }} viewBox="0 0 19.2 19.2" fill="none">
            <path d={ICON_PERSON} fill={inclusivePlan ? '#8600F4' : '#494150'} />
          </svg>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0d0712', lineHeight: 1.52 }}>
            Adaptar para diferentes perfis
          </p>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 10, color: '#0d0712', lineHeight: 1.36, marginTop: 4 }}>
            Ative a opção para selecionar ou criar um perfil de inclusão
          </p>
        </div>
        {/* Radio indicator */}
        <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
          {inclusivePlan ? (
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

      {/* Profiles section — always visible; disabled when inclusivePlan is OFF */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Label */}
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: inclusivePlan ? '#0d0712' : '#BAB0C3', lineHeight: 1.52 }}>
          Perfis de aprendizagem*
        </p>
        {/* Dropdown trigger */}
        <div className="relative">
          <button
            onClick={() => inclusivePlan && setDropdownOpen(!dropdownOpen)}
            disabled={!inclusivePlan}
            className="w-full flex items-center justify-between border-0"
            style={{
              background: !inclusivePlan ? '#F6F0FB' : dropdownOpen ? '#f4e8fe' : '#fffcff',
              border: `1px solid ${!inclusivePlan ? '#E7DFEE' : dropdownOpen ? '#8600f4' : '#bab0c3'}`,
              borderRadius: 8,
              height: 48,
              paddingLeft: 16,
              paddingRight: 16,
              cursor: inclusivePlan ? 'pointer' : 'default',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, color: inclusivePlan ? '#0d0712' : '#BAB0C3', lineHeight: 1.52 }}>
              {dropdownTriggerLabel}
            </span>
            <div
              style={{
                position: 'relative',
                width: 16,
                height: 16,
                overflow: 'hidden',
                flexShrink: 0,
                transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              <svg
                style={{ position: 'absolute', top: '36.26%', left: '21.2%', right: '21.32%', bottom: '31.24%', width: '57.48%', height: '32.5%' }}
                viewBox="0 0 9.2 5.2"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d={ICON_CHEVRON_SM} fill={!inclusivePlan ? '#BAB0C3' : dropdownOpen ? '#8600F4' : '#494150'} />
              </svg>
            </div>
          </button>

          {/* Options list */}
          {dropdownOpen && inclusivePlan && (
            <div
              className="absolute z-10 w-full flex flex-col"
              style={{
                top: 'calc(100% + 4px)',
                background: '#fffcff',
                borderRadius: 8,
                padding: 8,
                boxShadow: '0px 2px 2px rgba(13,7,18,0.16)',
              }}
            >
              {allProfiles.length === 0 ? (
                <div className="px-4 py-5 flex items-center justify-center">
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: '#6E6576', textAlign: 'center' }}>
                    Nenhum perfil de aprendizagem criado.{' '}
                    <button
                      onClick={(e) => { e.stopPropagation(); setDropdownOpen(false); setShowModal(true); }}
                      className="border-0 bg-transparent cursor-pointer"
                      style={{ color: '#8600F4', fontWeight: 700, fontSize: 13, fontFamily: 'Plus Jakarta Sans, sans-serif', textDecoration: 'underline' }}
                    >
                      Criar perfil de aprendizagem
                    </button>
                  </p>
                </div>
              ) : (
                <>
                  {atProfileLimit && (
                    <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#8600F4', fontWeight: 600, padding: '6px 16px 2px' }}>
                      Limite de 4 perfis atingido.
                    </p>
                  )}
                  {allProfiles.map((profile) => {
                    const sel = !!selectedProfiles.find((p) => p.id === profile.id);
                    const disabled = !sel && atProfileLimit;
                    return (
                      <button
                        key={profile.id}
                        onClick={(e) => { e.stopPropagation(); if (!disabled) toggleProfile(profile); }}
                        disabled={disabled}
                        className="flex items-center gap-3 text-left border-0 w-full"
                        style={{
                          background: sel ? '#e7dfee' : disabled ? '#F9F7FB' : 'white',
                          borderRadius: 8,
                          height: 48,
                          paddingLeft: 16,
                          paddingRight: 8,
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          transition: 'background 0.1s',
                        }}
                      >
                        <Cb20 checked={sel} />
                        <div className="flex-1 overflow-hidden min-w-0">
                          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: disabled ? '#BAB0C3' : '#8600f4', lineHeight: 1.52 }}>
                            {profile.name}
                          </span>
                          {profile.characteristics.length > 0 && (
                            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 14, color: disabled ? '#D3CADB' : '#494150', lineHeight: 1.52, marginLeft: 4 }}>
                              {profile.characteristics.slice(0, 2).join('  •  ')}
                              {profile.characteristics.length > 2 ? '  •  ...' : ''}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>

        {/* Helper text + Novo perfil — only when toggle is ON */}
        {inclusivePlan && (
          <div className="flex items-center justify-between">
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#6E6576', lineHeight: 1.36 }}>
              Escolha até 4 perfis para adaptar o plano
            </p>
            <button
              onClick={() => { setDropdownOpen(false); setShowModal(true); }}
              className="flex items-center justify-center gap-2 cursor-pointer border-0 bg-transparent"
              style={{
                border: '2px solid #4e008e',
                borderRadius: 8,
                height: 40,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <div className="relative shrink-0 overflow-hidden" style={{ width: 20, height: 20 }}>
                <svg style={{ position: 'absolute', inset: '15%', width: '70%', height: '70%' }} viewBox="0 0 14 14" fill="none">
                  <path d={ICON_PLUS_14} fill="#4E008E" />
                </svg>
              </div>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#4e008e', letterSpacing: 0.25, lineHeight: 1.36 }}>
                Novo perfil
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Recursos accordion — horizontal line separators (no border box) */}
      <div className="flex flex-col w-full">
        {/* Top separator line */}
        <svg style={{ display: 'block', width: '100%', height: 1, overflow: 'visible' }} viewBox="0 0 1 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#BAB0C3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Header row */}
        <button
          onClick={() => setResourcesOpen(!resourcesOpen)}
          className="w-full flex items-center gap-2 cursor-pointer border-0 bg-transparent"
          style={{ padding: 16 }}
        >
          {/* Resources icon */}
          <div className="relative shrink-0 overflow-hidden" style={{ width: 20, height: 20 }}>
            <svg
              style={{ position: 'absolute', top: '10%', left: '12.5%', right: '15%', bottom: '12.5%', width: '72.5%', height: '77.5%' }}
              viewBox="0 0 14.5 15.5"
              fill="none"
            >
              <path d={ICON_RESOURCES} fill={resourcesOpen ? '#8600F4' : '#494150'} />
            </svg>
          </div>
          {/* Label */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 16, color: resourcesOpen ? '#8600F4' : '#494150', lineHeight: 1.52, whiteSpace: 'nowrap' }}>
              Recursos{' '}
              <span style={{ fontWeight: 400, color: resourcesOpen ? '#8600F4' : '#494150' }}>(opcional)</span>
            </span>
          </div>
          {/* Counter */}
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 12, color: resourcesOpen ? '#8600F4' : '#494150', lineHeight: 1.36, flexShrink: 0 }}>
            {resources.length}/5 selecionadas
          </span>
          {/* Chevron */}
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              width: 20,
              height: 20,
              transform: resourcesOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          >
            <svg
              style={{ position: 'absolute', top: '36.26%', left: '21.2%', right: '21.32%', bottom: '31.24%', width: '57.48%', height: '32.5%' }}
              viewBox="0 0 11.5 6.5"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d={ICON_CHEVRON_LG} fill={resourcesOpen ? '#8600F4' : '#494150'} />
            </svg>
          </div>
        </button>

        {/* Bottom separator line */}
        <svg style={{ display: 'block', width: '100%', height: 1, overflow: 'visible' }} viewBox="0 0 1 1" preserveAspectRatio="none">
          <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#BAB0C3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Resource chips when open */}
        {resourcesOpen && (
          <div className="flex flex-wrap gap-2 pt-3 px-2 pb-3">
            {atResourceLimit && (
              <p className="w-full mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#8600F4', fontWeight: 600 }}>
                Limite de 5 recursos atingido.
              </p>
            )}
            {RESOURCES.map((r) => {
              const sel = resources.includes(r);
              const disabled = !sel && atResourceLimit;
              return (
                <button
                  key={r}
                  onClick={() => toggleResource(r)}
                  disabled={disabled}
                  className="px-3 py-1.5 rounded-full border cursor-pointer"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 13,
                    fontWeight: sel ? 600 : 400,
                    color: sel ? '#8600F4' : disabled ? '#BAB0C3' : '#494150',
                    background: sel ? '#F4E8FE' : disabled ? '#F9F7FB' : 'white',
                    borderColor: sel ? '#8600F4' : disabled ? '#E7DFEE' : '#D3CADB',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    border: `1px solid ${sel ? '#8600F4' : disabled ? '#E7DFEE' : '#D3CADB'}`,
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Create profile modal */}
      {showModal && (
        <CreateProfileModal onClose={() => setShowModal(false)} onSave={handleCreateProfile} />
      )}
    </div>
  );
}
