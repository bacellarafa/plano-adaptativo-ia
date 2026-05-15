import { useState } from 'react';
import type { LearningProfile } from './StepAdaptacoes';
import type { PreviousPlan } from './StepContexto';

export interface PlanoFormData {
  year: string;
  subject: string;
  numLessons: string;
  lessonTime: string;
  topic: string;
  bnccSkills: string[];
  inclusivePlan: boolean;
  resources: string[];
  linkedPlan: PreviousPlan | null;
  selectedProfiles: LearningProfile[];
}

interface PlanoGeradoProps {
  formData: PlanoFormData;
  onRegenerate: () => void;
  onSave?: () => void;
}

const PROFILE_PALETTE = [
  { bg: '#F4E8FE', border: '#8600F4', text: '#8600F4' },
  { bg: '#FFF0E3', border: '#FF7500', text: '#FF7500' },
  { bg: '#FFE3F2', border: '#FF0098', text: '#FF0098' },
  { bg: '#EFF7ED', border: '#277713', text: '#277713' },
  { bg: '#E8EAF6', border: '#3949AB', text: '#3949AB' },
];

type ProfileWithColor = LearningProfile & { chipColor: typeof PROFILE_PALETTE[number] };

const ICON_CHEVRON_LG = 'M6.28281 6.27969C5.98906 6.57344 5.51406 6.57344 5.22344 6.27969L0.220312 1.27969C-0.0734375 0.985937 -0.0734375 0.510937 0.220312 0.220312C0.514062 -0.0703125 0.989062 -0.0734375 1.27969 0.220312L5.74844 4.68906L10.2172 0.220312C10.5109 -0.0734375 10.9859 -0.0734375 11.2766 0.220312C11.5672 0.514062 11.5703 0.989062 11.2766 1.27969L6.27656 6.27969H6.28281Z';

function SepLine() {
  return (
    <svg style={{ display: 'block', width: '100%', height: 1, overflow: 'visible', flexShrink: 0 }} viewBox="0 0 1 1" preserveAspectRatio="none">
      <line x1="0" y1="0.5" x2="1" y2="0.5" stroke="#BAB0C3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function DsChevron({ open, color = '#8600F4' }: { open: boolean; color?: string }) {
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

function getAdaptation(sectionId: string, profile: LearningProfile, topic: string): string {
  const name = profile.name;
  const map: Record<string, string> = {
    tema: `Texto com adaptação para ${name}: o conteúdo de "${topic}" será apresentado com recursos visuais e linguagem simplificada.`,
    conteudo: `Texto com adaptação para ${name}: os tópicos serão divididos em etapas menores com exemplos do cotidiano.`,
    metodologia: `Texto com adaptação para ${name}: instruções claras, pausas estratégicas e reforço positivo durante as atividades.`,
    sequencias: `Texto com adaptação para ${name}: atividades com roteiro visual passo a passo e tempo adicional para conclusão.`,
    avaliacoes: `Texto com adaptação para ${name}: avaliação oral ou por portfólio quando necessário.`,
    recursos: `Texto com adaptação para ${name}: materiais em formatos acessíveis — fonte ampliada, áudio ou tátil conforme a necessidade.`,
  };
  return map[sectionId] ?? `Texto com adaptação para ${name}.`;
}

function buildSectionContent(sectionId: string, formData: PlanoFormData): string {
  const topic = formData.topic || 'Fotossíntese';
  const num = formData.numLessons || '2';
  const time = formData.lessonTime || '50';
  const totalMin = (parseInt(num) || 2) * (parseInt(time) || 50);
  const subject = formData.subject || 'Ciências';

  const map: Record<string, string> = {
    tema: `Compreensão da etapa química da ${topic.toLowerCase()}, detalhando os processos principais, conceitos-chave e a relação com o currículo de ${subject}.`,
    duracao: `${num} aula${parseInt(num) > 1 ? 's' : ''} (${totalMin} minutos no total)`,
    conteudo: `• Introdução e contextualização do tema "${topic}"\n• Conceitos fundamentais e terminologia específica\n• Relação com conhecimentos prévios dos alunos\n• Aprofundamento progressivo dos conteúdos\n• Síntese e consolidação da aprendizagem`,
    metodologia: `Aula baseada em metodologias ativas, iniciando com Exposição Dialogada utilizando recursos visuais, seguida de Aprendizagem Baseada em Projetos (PBL) em microescala, onde os alunos realizarão atividades práticas para consolidar a compreensão de ${topic}.`,
    sequencias: `1. Retomada (15 min): perguntas rápidas sobre conhecimentos prévios\n2. Exposição dialogada (25 min): apresentação dos conceitos principais de ${topic}\n3. Atividade prática (40 min): exploração ativa do conteúdo em pequenos grupos\n4. Sistematização (20 min): mapa mental coletivo na lousa`,
    avaliacoes: `Avaliação formativa durante a atividade prática (observação de colaboração e compreensão) e Ticket de Saída escrito ao final, onde cada aluno registra um aprendizado e uma dúvida sobre "${topic}".`,
    recursos: formData.resources.length > 0
      ? `• Lousa digital ou projetor multimídia\n• Fichas impressas com diagrama do conteúdo\n${formData.resources.map(r => `• ${r}`).join('\n')}`
      : `• Lousa digital ou projetor multimídia\n• Fichas impressas com diagrama do conteúdo\n• Materiais para atividade prática`,
  };
  return map[sectionId] ?? '';
}

/* ── Section body ─────────────────────────────────────────────────────────── */

function SectionBody({
  content,
  profiles,
  sectionId,
  topic,
}: {
  content: string;
  profiles: ProfileWithColor[];
  sectionId: string;
  topic: string;
}) {
  const lines = content.split('\n');

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#494150', lineHeight: 1.7 }}>
      <div className="space-y-0.5">
        {lines.map((line, i) => {
          const isBullet = line.startsWith('•') || line.startsWith('-');
          const isNumbered = /^\d+\./.test(line);
          if (isBullet) {
            return (
              <div key={i} className="flex gap-2">
                <span style={{ color: '#8600F4', flexShrink: 0 }}>•</span>
                <span>{line.replace(/^[•\-]\s*/, '')}</span>
              </div>
            );
          }
          if (isNumbered) {
            const m = line.match(/^(\d+\.\s*)(.*)/);
            return (
              <div key={i} className="flex gap-2">
                <span style={{ color: '#8600F4', flexShrink: 0, minWidth: 20 }}>{m?.[1]}</span>
                <span>{m?.[2] ?? line}</span>
              </div>
            );
          }
          return <p key={i} style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{line}</p>;
        })}
      </div>

      {/* Adaptation lines with profile name badge for accessibility */}
      {profiles.map((profile) => (
        <div key={profile.id} className="flex gap-2 mt-2 items-start">
          <span style={{ color: profile.chipColor.text, flexShrink: 0, lineHeight: 1.7 }}>•</span>
          <div className="flex flex-wrap items-baseline gap-x-1.5">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '1px 7px',
                borderRadius: 9999,
                fontSize: 10,
                fontWeight: 700,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                background: profile.chipColor.bg,
                border: `1px solid ${profile.chipColor.border}`,
                color: profile.chipColor.text,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                lineHeight: 1.5,
              }}
            >
              {profile.name}
            </span>
            <span style={{ color: profile.chipColor.text }}>
              {getAdaptation(sectionId, profile, topic)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Plan Section ──────────────────────────────────────────────────────────── */

interface SectionProps {
  id: string;
  title: string;
  icon: (color: string) => React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isEditing: boolean;
  editValue: string;
  onEdit: () => void;
  onEditChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  showBadge?: boolean;
  children: React.ReactNode;
}

function PlanSection({
  title, icon, isOpen, onToggle,
  isEditing, editValue, onEdit, onEditChange, onSave, onCancel,
  showBadge,
  children,
}: SectionProps) {
  const titleColor = isOpen ? '#8600F4' : '#494150';
  const iconColor = isOpen ? '#8600F4' : '#494150';

  return (
    <div>
      <SepLine />
      <button
        className="w-full flex items-center gap-2 border-0 cursor-pointer transition-colors hover:bg-[#F6F0FB] bg-transparent"
        style={{ padding: 16 }}
        onClick={onToggle}
      >
        {icon(iconColor)}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 16, color: titleColor, whiteSpace: 'nowrap' }}>
            {title}
          </span>
          {showBadge && (
            <span
              className="px-2 py-0.5 rounded-full shrink-0"
              style={{ background: '#EDE9F2', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 500, color: '#6E6576' }}
            >
              Adaptado
            </span>
          )}
        </div>
        <DsChevron open={isOpen} color={iconColor} />
      </button>
      <SepLine />

      {isOpen && (
        <div className="py-3">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full p-3 rounded-lg outline-none resize-none"
                style={{
                  border: '1.5px solid #8600F4',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: 14,
                  color: '#0D0712',
                  lineHeight: 1.65,
                  minHeight: 100,
                  boxShadow: '0 0 0 3px rgba(134,0,244,0.08)',
                }}
                value={editValue}
                onChange={(e) => onEditChange(e.target.value)}
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="px-3 py-1.5 rounded-lg border cursor-pointer transition-colors hover:bg-[#F6F0FB]"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#494150',
                    borderColor: '#D3CADB',
                    background: '#fff',
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={onSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-0 cursor-pointer transition-opacity hover:opacity-90"
                  style={{ background: '#4E008E', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, fontWeight: 600, color: '#fff' }}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4 8.5L11 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div>{children}</div>
              <div className="flex justify-end">
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors hover:bg-[#F6F0FB]"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#494150',
                    borderColor: '#D3CADB',
                    background: '#fff',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z" stroke="#494150" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Editar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */

export function PlanoGerado({ formData, onRegenerate, onSave }: PlanoGeradoProps) {
  const [openSections, setOpenSections] = useState<string[]>(['tema', 'duracao', 'conteudo', 'metodologia', 'sequencias', 'avaliacoes', 'recursos']);
  const [activeProfiles, setActiveProfiles] = useState<Set<string>>(new Set());
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [savedValues, setSavedValues] = useState<Record<string, string>>({});
  const [exportOpen, setExportOpen] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const toggleSection = (id: string) =>
    setOpenSections((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleProfile = (id: string) => {
    setActiveProfiles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isOpen = (id: string) => openSections.includes(id);

  const startEdit = (sectionId: string) => {
    const current = savedValues[sectionId] ?? buildSectionContent(sectionId, formData);
    setEditValues((prev) => ({ ...prev, [sectionId]: current }));
    setEditingSection(sectionId);
    if (!openSections.includes(sectionId)) setOpenSections((prev) => [...prev, sectionId]);
  };

  const saveEdit = (sectionId: string) => {
    setSavedValues((prev) => ({ ...prev, [sectionId]: editValues[sectionId] ?? '' }));
    setEditingSection(null);
  };

  const cancelEdit = () => setEditingSection(null);
  const getContent = (id: string) => savedValues[id] ?? buildSectionContent(id, formData);

  const topic = formData.topic || 'Fotossíntese';
  const num = formData.numLessons || '2';
  const hasInclusive = formData.inclusivePlan && formData.selectedProfiles.length > 0;
  const linkedPlan = formData.linkedPlan;
  const bnccCodes = formData.bnccSkills;

  const tags = [
    formData.year || '1º Ano EF',
    formData.subject || 'Ciências',
    ...(bnccCodes.length ? bnccCodes.slice(0, 3) : ['EF05CI07', 'EF05CI08']),
  ];

  // Map each profile to its palette color by index
  const profilesWithColor: ProfileWithColor[] = formData.selectedProfiles.map((p, i) => ({
    ...p,
    chipColor: PROFILE_PALETTE[i % PROFILE_PALETTE.length],
  }));

  const activeProfileList = profilesWithColor.filter((p) => activeProfiles.has(p.id));

  const sectionProps = (id: string) => ({
    id,
    isOpen: isOpen(id),
    onToggle: () => toggleSection(id),
    isEditing: editingSection === id,
    editValue: editValues[id] ?? '',
    onEdit: () => startEdit(id),
    onEditChange: (v: string) => setEditValues((prev) => ({ ...prev, [id]: v })),
    onSave: () => saveEdit(id),
    onCancel: cancelEdit,
  });

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div style={{ flexShrink: 0, paddingLeft: 28, paddingRight: 28, paddingTop: 20, paddingBottom: 16, borderBottom: '1px solid #E7DFEE' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 20, color: '#0D0712', lineHeight: 1.3 }}>
            {linkedPlan ? (
              <>
                <span style={{ color: '#494150' }}>Continuação: </span>
                {topic}
              </>
            ) : topic}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 8 }}>
            {/* Feedback buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setFeedback((f) => f === 'like' ? null : 'like')}
                title="Gostei"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 34, height: 34, borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                  border: `1.5px solid ${feedback === 'like' ? '#0F9F4F' : '#D3CADB'}`,
                  background: feedback === 'like' ? '#EFF7ED' : '#F6F0FB',
                }}
              >
                <IcoThumbUp active={feedback === 'like'} />
              </button>
              <button
                onClick={() => setFeedback((f) => f === 'dislike' ? null : 'dislike')}
                title="Não gostei"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 34, height: 34, borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                  border: `1.5px solid ${feedback === 'dislike' ? '#C62828' : '#D3CADB'}`,
                  background: feedback === 'dislike' ? '#FFEBEE' : '#F6F0FB',
                }}
              >
                <IcoThumbDown active={feedback === 'dislike'} />
              </button>
            </div>

            <div style={{ width: 1, height: 22, background: '#E7DFEE', flexShrink: 0 }} />

            <button
              onClick={onRegenerate}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 6, border: 0, background: 'transparent', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#8600F4', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <IcoRegenerate />
              Gerar novamente
            </button>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'stretch', border: '1.5px solid #4E008E', borderRadius: 8 }}>
              <button
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 6, paddingLeft: 12, paddingRight: 12, background: 'transparent', border: 0, borderRadius: '6px 0 0 6px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#4E008E', height: 34, transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F4E8FE'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <IcoDownload color="#4E008E" />
                Exportar
              </button>
              <div style={{ width: 1.5, background: '#4E008E', flexShrink: 0 }} />
              <button
                onClick={() => setExportOpen((v) => !v)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 0, borderRadius: '0 6px 6px 0', width: 30, height: 34, transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F4E8FE'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" style={{ transform: exportOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <path d="M1 1L4.5 4.5L8 1" stroke="#4E008E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {exportOpen && (
                <div
                  style={{ position: 'absolute', zIndex: 20, display: 'flex', flexDirection: 'column', top: 'calc(100% + 6px)', right: 0, minWidth: 188, background: '#fff', borderRadius: 8, boxShadow: '0 4px 16px rgba(13,7,18,0.14)', overflow: 'hidden', border: '1.5px solid #D3CADB' }}
                >
                  <button
                    onClick={() => setExportOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left', width: '100%', gap: 10, paddingLeft: 16, paddingRight: 16, background: '#F6F0FB', border: 0, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#4E008E', height: 44, transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F4E8FE'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#F6F0FB'}
                  >
                    <IcoDocx color="#4E008E" />
                    Exportar em .DOCX
                  </button>
                  <button
                    onClick={() => setExportOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left', width: '100%', gap: 10, paddingLeft: 16, paddingRight: 16, background: '#fff', border: 0, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#4E008E', height: 44, transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F4E8FE'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    <IcoPdf color="#4E008E" />
                    Exportar em .PDF
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onSave}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 8, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: 0, background: '#4E008E', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <IcoSave />
              Salvar plano
            </button>
          </div>
        </div>

        {/* Linked plan */}
        {linkedPlan && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M5 7.5C5.4 8.1 6 8.5 6.7 8.5H8.5C9.6 8.5 10.5 7.6 10.5 6.5C10.5 5.4 9.6 4.5 8.5 4.5H7.5" stroke="#8600F4" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M8 5.5C7.6 4.9 7 4.5 6.3 4.5H4.5C3.4 4.5 2.5 5.4 2.5 6.5C2.5 7.6 3.4 8.5 4.5 8.5H5.5" stroke="#8600F4" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#8600F4', fontWeight: 500 }}>
              Vinculado a: <strong>{linkedPlan.title}</strong>
            </span>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 9999,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                background: i <= 1 ? '#F6F0FB' : '#8600F4',
                color: i <= 1 ? '#494150' : '#fff',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Profile chips with indexed palette colors */}
        {hasInclusive && (
          <div>
            <p style={{ marginBottom: 2, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13, color: '#494150' }}>
              Adaptações ativas no plano
            </p>
            <p style={{ marginBottom: 8, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#6E6576' }}>
              Selecione um perfil de aprendizagem para visualizar as respectivas adaptações no plano de aula
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {profilesWithColor.map((profile) => {
                const isActive = activeProfiles.has(profile.id);
                return (
                  <button
                    key={profile.id}
                    onClick={() => toggleProfile(profile.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      gap: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 6,
                      paddingBottom: 6,
                      borderRadius: 9999,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 400,
                      background: isActive ? profile.chipColor.bg : '#fff',
                      border: `1px solid ${isActive ? profile.chipColor.border : '#D3CADB'}`,
                      color: isActive ? profile.chipColor.text : '#494150',
                      transition: 'all 0.2s',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="5.5" cy="4.5" r="2" stroke={isActive ? profile.chipColor.text : '#A096A9'} strokeWidth="1.2" />
                      <path d="M1.5 11C1.5 9.07 3.32 7.5 5.5 7.5S9.5 9.07 9.5 11" stroke={isActive ? profile.chipColor.text : '#A096A9'} strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {profile.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sections — horizontal line pattern */}
      <div className="flex-1 overflow-y-auto px-7 py-2">

        <PlanSection {...sectionProps('tema')} title="Tema/Conteúdo da aula" icon={(c) => <IcoTema color={c} />} showBadge={activeProfileList.length > 0}>
          <SectionBody content={getContent('tema')} profiles={activeProfileList} sectionId="tema" topic={topic} />
        </PlanSection>

        <PlanSection {...sectionProps('duracao')} title="Duração estimada" icon={(c) => <IcoClock color={c} />}>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#494150', lineHeight: 1.6, margin: 0 }}>
            {getContent('duracao')}
          </p>
        </PlanSection>

        <PlanSection {...sectionProps('conteudo')} title="Conteúdo programático" icon={(c) => <IcoList color={c} />} showBadge={activeProfileList.length > 0}>
          <SectionBody content={getContent('conteudo')} profiles={activeProfileList} sectionId="conteudo" topic={topic} />
        </PlanSection>

        <PlanSection {...sectionProps('metodologia')} title="Metodologia" icon={(c) => <IcoCheck color={c} />} showBadge={activeProfileList.length > 0}>
          <SectionBody content={getContent('metodologia')} profiles={activeProfileList} sectionId="metodologia" topic={topic} />
        </PlanSection>

        <PlanSection {...sectionProps('sequencias')} title="Aulas e sequências didáticas" icon={(c) => <IcoSequence color={c} />} showBadge={activeProfileList.length > 0}>
          <SectionBody content={getContent('sequencias')} profiles={activeProfileList} sectionId="sequencias" topic={topic} />
        </PlanSection>

        <PlanSection {...sectionProps('avaliacoes')} title="Avaliações" icon={(c) => <IcoAssessment color={c} />} showBadge={activeProfileList.length > 0}>
          <SectionBody content={getContent('avaliacoes')} profiles={activeProfileList} sectionId="avaliacoes" topic={topic} />
        </PlanSection>

        <PlanSection {...sectionProps('recursos')} title="Recursos" icon={(c) => <IcoResources color={c} />} showBadge={activeProfileList.length > 0}>
          <SectionBody content={getContent('recursos')} profiles={activeProfileList} sectionId="recursos" topic={topic} />
        </PlanSection>

        {/* Final closing separator */}
        <SepLine />
      </div>
    </div>
  );
}

/* ── Icon helpers ────────────────────────────────────────────────────────── */

function IcoRegenerate() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2 7.5C2 4.46 4.46 2 7.5 2C9.6 2 11.4 3.1 12.4 4.8" stroke="#8600F4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 7.5C13 10.54 10.54 13 7.5 13C5.4 13 3.6 11.9 2.6 10.2" stroke="#8600F4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 3.5L12.5 4.8L11 7" stroke="#8600F4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 11.5L2.5 10.2L4 8" stroke="#8600F4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoDownload({ color = '#494150' }: { color?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 10V11C1.5 11.55 1.95 12 2.5 12H10.5C11.05 12 11.5 11.55 11.5 11V10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6.5 1.5V8.5M4 6L6.5 8.5L9 6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoSave() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1.2" />
      <path d="M3.5 6.5L5.5 8.5L9.5 4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoTema({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect x="2" y="2" width="13" height="13" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M5 6H12M5 9H9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IcoClock({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <circle cx="8.5" cy="8.5" r="6.5" stroke={color} strokeWidth="1.4" />
      <path d="M8.5 5V8.5L11 10.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoList({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect x="2" y="2" width="13" height="13" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M5 6.5H12M5 9.5H12M5 12.5H8.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IcoCheck({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <circle cx="8.5" cy="8.5" r="6.5" stroke={color} strokeWidth="1.4" />
      <path d="M5.5 8.5L7.5 10.5L11.5 6.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoSequence({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M3 4H14M3 8H14M3 12H9.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 10L15 13L12 16" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoAssessment({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect x="2" y="2" width="13" height="13" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M5 8.5L7.5 11L12 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoResources({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <circle cx="6.5" cy="6.5" r="3" stroke={color} strokeWidth="1.4" />
      <circle cx="11.5" cy="11.5" r="3" stroke={color} strokeWidth="1.4" />
      <path d="M9 8L8 9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IcoDocx({ color = '#494150' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="8" height="11" rx="1" stroke={color} strokeWidth="1.2" />
      <path d="M4 4H8M4 6.5H8M4 9H6.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M8 1V4H11" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoPdf({ color = '#494150' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="8" height="11" rx="1" stroke={color} strokeWidth="1.2" />
      <path d="M4 4H6.5C7.3 4 7.3 5.5 6.5 5.5H4M4 4V5.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7.5H5.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M8 1V4H11" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoThumbUp({ active }: { active: boolean }) {
  const color = active ? '#0F9F4F' : '#494150';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M5 14H11.5C12.05 14 12.5 13.55 12.5 13L13.5 8C13.5 7.45 13.05 7 12.5 7H9V3C9 2.45 8.55 2 8 2C7.45 2 7 2.45 7 3V5L5 7.5V14Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill={active ? '#EFF7ED' : 'none'}
      />
      <path d="M5 7.5H3C2.45 7.5 2 7.95 2 8.5V13C2 13.55 2.45 14 3 14H5V7.5Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill={active ? '#EFF7ED' : 'none'}
      />
    </svg>
  );
}

function IcoThumbDown({ active }: { active: boolean }) {
  const color = active ? '#C62828' : '#494150';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11 2H4.5C3.95 2 3.5 2.45 3.5 3L2.5 8C2.5 8.55 2.95 9 3.5 9H7V13C7 13.55 7.45 14 8 14C8.55 14 9 13.55 9 13V10.5L11 8V2Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill={active ? '#FFEBEE' : 'none'}
      />
      <path d="M11 8.5H13C13.55 8.5 14 8.05 14 7.5V3C14 2.45 13.55 2 13 2H11V8.5Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill={active ? '#FFEBEE' : 'none'}
      />
    </svg>
  );
}
