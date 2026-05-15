import { useState } from 'react';

export interface TematicaFormData {
  topic: string;
  bnccSkills: string[];
}

interface StepTematicaProps {
  formData: TematicaFormData;
  onChange: (data: Partial<TematicaFormData>) => void;
  selectedYear: string;
  selectedSubject: string;
}

interface BnccEntry {
  code: string;
  desc: string;
}

const BNCC_BY_SUBJECT: Record<string, BnccEntry[]> = {
  'Ciências': [
    { code: 'EF06CI01', desc: 'Classificar como homogêneas ou heterogêneas as misturas' },
    { code: 'EF06CI02', desc: 'Identificar evidências de transformações químicas' },
    { code: 'EF07CI01', desc: 'Discutir a natureza da água e seu ciclo' },
    { code: 'EF07CI02', desc: 'Investigar seres vivos do solo' },
    { code: 'EF08CI01', desc: 'Identificar os mecanismos de herança das características dos seres vivos' },
    { code: 'EF09CI01', desc: 'Investigar as transformações nucleares e implicações socioambientais' },
    { code: 'EF09CI02', desc: 'Relacionar sistemas sensoriais dos vertebrados com interação com o ambiente' },
    { code: 'EM13CNT101', desc: 'Analisar e utilizar interpretações sobre a dinâmica da Terra' },
    { code: 'EM13CNT201', desc: 'Construir e usar tabelas, gráficos e esquemas para comunicar dados' },
  ],
  'Matemática': [
    { code: 'EF06MA01', desc: 'Comparar e ordenar números naturais, inteiros negativos e racionais' },
    { code: 'EF06MA12', desc: 'Reconhecer que as medidas de determinadas grandezas podem ser expressas' },
    { code: 'EF07MA01', desc: 'Resolver e elaborar problemas com números naturais envolvendo potenciação' },
    { code: 'EF08MA01', desc: 'Resolver e elaborar problemas envolvendo porcentagem' },
    { code: 'EF09MA01', desc: 'Reconhecer e comparar segmentos racionais e irracionais' },
    { code: 'EM13MAT101', desc: 'Interpretar situações econômicas, sociais e das Ciências da Natureza' },
    { code: 'EM13MAT201', desc: 'Propor ou participar de ações para investigar desafios do mundo contemporâneo' },
  ],
  'Língua Portuguesa': [
    { code: 'EF06LP01', desc: 'Reconhecer e usar adequadamente a norma padrão em textos' },
    { code: 'EF06LP05', desc: 'Identificar e analisar a estrutura de textos argumentativos' },
    { code: 'EF07LP01', desc: 'Identificar, em textos lidos, marcas linguísticas que evidenciam o locutor' },
    { code: 'EF08LP01', desc: 'Analisar os efeitos de sentido dos modos e tempos verbais' },
    { code: 'EF09LP01', desc: 'Identificar efeitos de ironia ou humor em textos variados' },
    { code: 'EM13LGG101', desc: 'Compreender e analisar processos de produção e circulação de discursos' },
    { code: 'EM13LGG201', desc: 'Utilizar as diversas linguagens (artísticas, corporais e verbais)' },
  ],
  'História': [
    { code: 'EF06HI01', desc: 'Identificar diferentes formas de compreensão da noção de tempo' },
    { code: 'EF07HI01', desc: 'Explicar o significado de "modernidade" e suas principais características' },
    { code: 'EF08HI01', desc: 'Identificar os mecanismos e as dinâmicas de exploração e resistência' },
    { code: 'EF09HI01', desc: 'Descrever e contextualizar os principais aspectos da emergência do mundo contemporâneo' },
    { code: 'EM13CHS101', desc: 'Analisar e comparar diferentes formas de organização política' },
  ],
  'Geografia': [
    { code: 'EF06GE01', desc: 'Comparar modificações das paisagens nos lugares de vivência' },
    { code: 'EF07GE01', desc: 'Avaliar, por meio de exemplos extraídos dos livros didáticos' },
    { code: 'EF08GE01', desc: 'Descrever as rotas de exploração e as formas de ocupação do espaço' },
    { code: 'EF09GE01', desc: 'Analisar transformações territoriais, considerando o movimento de fronteiras' },
    { code: 'EM13CHS301', desc: 'Problematizar hábitos e práticas individuais e coletivos de produção' },
  ],
  'Inglês': [
    { code: 'EF06LI01', desc: 'Identificar o assunto de textos em língua inglesa de diferentes gêneros textuais' },
    { code: 'EF07LI01', desc: 'Localizar informações específicas em textos em língua inglesa' },
    { code: 'EF08LI01', desc: 'Identificar estratégias de leitura em textos em língua inglesa' },
    { code: 'EF09LI01', desc: 'Usar estratégias de leitura em língua inglesa como skimming e scanning' },
    { code: 'EM13LGG401', desc: 'Usar língua inglesa como língua de comunicação internacional' },
    { code: 'EM13LGG402', desc: 'Utilizar diferentes linguagens em situações de intercâmbio oral e escrito' },
  ],
  'Artes': [
    { code: 'EF06AR01', desc: 'Pesquisar, apreciar e analisar formas distintas das artes visuais' },
    { code: 'EF07AR01', desc: 'Pesquisar e analisar diferentes formas de expressão e linguagens artísticas' },
    { code: 'EF08AR01', desc: 'Pesquisar e analisar o contexto de diferentes matrizes estéticas e culturais' },
    { code: 'EF09AR01', desc: 'Pesquisar e analisar formas distintas das artes visuais tradicionais e contemporâneas' },
    { code: 'EM13LGG601', desc: 'Apropriar-se das linguagens artísticas, corporais e verbais' },
    { code: 'EM13LGG602', desc: 'Fruir e apreciar esteticamente diversas manifestações artísticas e culturais' },
  ],
  'Educação Física': [
    { code: 'EF06EF01', desc: 'Experimentar e fruir diferentes danças do contexto comunitário e regional' },
    { code: 'EF07EF01', desc: 'Experimentar e fruir modalidades esportivas, caracterizando-as como práticas corporais' },
    { code: 'EF08EF01', desc: 'Experimentar e fruir diversas modalidades esportivas coletivas' },
    { code: 'EF09EF01', desc: 'Experimentar e fruir práticas corporais de aventura na natureza' },
    { code: 'EM13LGG701', desc: 'Explorar diversas práticas corporais com base na experiência e no conhecimento' },
  ],
  'Biologia': [
    { code: 'EM13CNT101', desc: 'Analisar e representar as transformações e conservações nos sistemas biológicos' },
    { code: 'EM13CNT201', desc: 'Construir questões, elaborar hipóteses e previsões sobre fenômenos biológicos' },
    { code: 'EM13CNT301', desc: 'Construir e usar tabelas, gráficos e esquemas para comunicar dados' },
    { code: 'EM13CNT302', desc: 'Comunicar descobertas científicas por meio de diferentes linguagens e mídias' },
    { code: 'EM13CNT401', desc: 'Analisar e discutir modelos explicativos de fenômenos naturais e processos biológicos' },
  ],
  'Física': [
    { code: 'EM13CNT101', desc: 'Analisar transformações e conservações de energia em sistemas físicos' },
    { code: 'EM13CNT201', desc: 'Elaborar hipóteses sobre fenômenos físicos e interpretar resultados' },
    { code: 'EM13CNT301', desc: 'Usar modelos e linguagens para sistematizar dados e comunicar achados científicos' },
    { code: 'EM13CNT401', desc: 'Analisar e discutir modelos explicativos de fenômenos físicos do cotidiano' },
    { code: 'EM13CNT501', desc: 'Investigar e discutir o uso indevido de conceitos físicos no cotidiano' },
  ],
  'Química': [
    { code: 'EM13CNT101', desc: 'Analisar transformações energéticas em fenômenos naturais e processos industriais' },
    { code: 'EM13CNT201', desc: 'Elaborar hipóteses sobre fenômenos químicos e interpretar resultados' },
    { code: 'EM13CNT301', desc: 'Usar tabelas, gráficos e esquemas para comunicar dados de experimentos' },
    { code: 'EM13CNT401', desc: 'Investigar e discutir modelos atômico-moleculares e suas aplicações' },
    { code: 'EM13CNT501', desc: 'Discutir o uso de substâncias químicas no cotidiano e seus impactos' },
  ],
  'Filosofia': [
    { code: 'EM13CHS101', desc: 'Analisar e comparar diferentes formas de organização política e filosófica' },
    { code: 'EM13CHS201', desc: 'Analisar e caracterizar as linguagens filosóficas e suas formas de argumentação' },
    { code: 'EM13CHS301', desc: 'Problematizar hábitos e práticas individuais e coletivos à luz da Ética' },
    { code: 'EM13CHS401', desc: 'Identificar e analisar as relações entre sujeito, conhecimento e verdade' },
    { code: 'EM13CHS501', desc: 'Compreender e problematizar os fundamentos filosóficos da democracia' },
  ],
  'Sociologia': [
    { code: 'EM13CHS101', desc: 'Analisar diferentes formas de organização política, econômica e social' },
    { code: 'EM13CHS201', desc: 'Analisar e caracterizar as linguagens e práticas da cultura contemporânea' },
    { code: 'EM13CHS301', desc: 'Problematizar hábitos e práticas individuais e coletivos em perspectiva sociológica' },
    { code: 'EM13CHS501', desc: 'Compreender e problematizar os limites da democracia e os movimentos sociais' },
    { code: 'EM13CHS601', desc: 'Analisar criticamente as relações de produção e consumo na sociedade contemporânea' },
  ],
  'Redação': [
    { code: 'EF09LP01', desc: 'Identificar efeitos de ironia e humor em textos variados' },
    { code: 'EM13LGG101', desc: 'Compreender e analisar processos de produção e circulação de discursos' },
    { code: 'EM13LGG201', desc: 'Utilizar as diversas linguagens em diferentes contextos comunicativos' },
    { code: 'EM13LGG301', desc: 'Usar diferentes linguagens como recursos e produções culturais' },
    { code: 'EM13LGG401', desc: 'Empregar norma culta e adequação linguística em contextos formais de escrita' },
  ],
};

const DEFAULT_BNCC: BnccEntry[] = [
  { code: 'EF09CI01', desc: 'Investigar as transformações nucleares e implicações socioambientais' },
  { code: 'EF09CI02', desc: 'Relacionar sistemas sensoriais dos vertebrados com o ambiente' },
  { code: 'EM13CNT101', desc: 'Analisar e utilizar interpretações sobre a dinâmica da Terra' },
  { code: 'EM13CNT201', desc: 'Construir e usar tabelas, gráficos e esquemas para comunicar dados' },
  { code: 'EM13CNT301', desc: 'Construir questões, elaborar hipóteses e coletar dados' },
  { code: 'EF06CI01', desc: 'Classificar como homogêneas ou heterogêneas as misturas' },
];

const SUGGESTIONS_BY_SUBJECT: Record<string, { title: string; desc: string }[]> = {
  'Ciências': [
    { title: 'Fotossíntese', desc: 'Produção de energia nas plantas' },
    { title: 'Ciclo da Água', desc: 'Evaporação, condensação e precipitação' },
    { title: 'Cadeia Alimentar', desc: 'Relações tróficas nos ecossistemas' },
  ],
  'Matemática': [
    { title: 'Frações', desc: 'Operações com frações e decimais' },
    { title: 'Geometria', desc: 'Figuras planas e sólidos geométricos' },
    { title: 'Álgebra', desc: 'Expressões e equações algébricas' },
  ],
  'Língua Portuguesa': [
    { title: 'Redação Dissertativa', desc: 'Estrutura e argumentação no texto' },
    { title: 'Gêneros Textuais', desc: 'Identificação e produção de gêneros' },
    { title: 'Concordância Verbal', desc: 'Regras e casos especiais' },
  ],
  'História': [
    { title: 'Era das Navegações', desc: 'Expansão marítima europeia' },
    { title: 'Revolução Industrial', desc: 'Transformações sociais e econômicas' },
    { title: 'Segunda Guerra Mundial', desc: 'Causas, desenvolvimento e consequências' },
  ],
  'Geografia': [
    { title: 'Biomas Brasileiros', desc: 'Características e biodiversidade' },
    { title: 'Urbanização', desc: 'Crescimento das cidades no Brasil' },
    { title: 'Clima e Vegetação', desc: 'Relações entre clima e fauna/flora' },
  ],
  'Inglês': [
    { title: 'Reading Comprehension', desc: 'Estratégias de leitura em inglês' },
    { title: 'Present Perfect', desc: 'Uso e formação do tempo verbal' },
    { title: 'Vocabulary Building', desc: 'Ampliação de vocabulário contextualizado' },
  ],
  'Artes': [
    { title: 'Arte Contemporânea', desc: 'Movimentos e expressões artísticas atuais' },
    { title: 'Expressão Plástica', desc: 'Técnicas de pintura, escultura e colagem' },
    { title: 'Teatro e Drama', desc: 'Criação e encenação de peças teatrais' },
  ],
  'Educação Física': [
    { title: 'Esportes Coletivos', desc: 'Regras, estratégias e fair play' },
    { title: 'Consciência Corporal', desc: 'Postura, equilíbrio e coordenação motora' },
    { title: 'Jogos e Brincadeiras', desc: 'Cultura lúdica e tradições populares' },
  ],
  'Biologia': [
    { title: 'Genética', desc: 'Hereditariedade e leis de Mendel' },
    { title: 'Ecossistemas', desc: 'Relações ecológicas e cadeias alimentares' },
    { title: 'Sistema Nervoso', desc: 'Estrutura e funcionamento neurológico' },
  ],
  'Física': [
    { title: 'Cinemática', desc: 'Movimento, velocidade e aceleração' },
    { title: 'Eletromagnetismo', desc: 'Campos elétricos e magnéticos' },
    { title: 'Ondas e Som', desc: 'Propagação e fenômenos ondulatórios' },
  ],
  'Química': [
    { title: 'Reações Químicas', desc: 'Tipos, balanceamento e estequiometria' },
    { title: 'Tabela Periódica', desc: 'Organização dos elementos químicos' },
    { title: 'Soluções', desc: 'Concentração, diluição e misturas' },
  ],
  'Filosofia': [
    { title: 'Ética e Moral', desc: 'Fundamentos filosóficos da conduta humana' },
    { title: 'Filosofia Política', desc: 'Estado, poder e democracia' },
    { title: 'Epistemologia', desc: 'Teoria do conhecimento e verdade' },
  ],
  'Sociologia': [
    { title: 'Estratificação Social', desc: 'Classes, desigualdade e mobilidade' },
    { title: 'Cultura e Sociedade', desc: 'Identidade, diversidade e cultura' },
    { title: 'Movimentos Sociais', desc: 'Ação coletiva e transformação social' },
  ],
  'Redação': [
    { title: 'Dissertação-Argumentativa', desc: 'Estrutura e estratégias argumentativas' },
    { title: 'Coesão e Coerência', desc: 'Elementos conectivos e organização textual' },
    { title: 'Proposta de Intervenção', desc: 'Resolução de problemas sociais no ENEM' },
  ],
};

const DEFAULT_SUGGESTIONS = [
  { title: 'Fotossíntese', desc: 'Sugestão com base no ano e disciplina' },
  { title: 'Ciclo da Água', desc: 'Sugestão com base no ano e disciplina' },
  { title: 'Cadeia Alimentar', desc: 'Sugestão com base no ano e disciplina' },
];

// DS icon paths — same as StepAdaptacoes
const ICON_CB20_BG = 'M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z';
const ICON_CB20_CHECK = 'M5.31736 9.20848C4.90595 9.62112 4.88028 10.3142 5.32428 10.7262L7.94224 13.3449C8.35614 13.786 9.05937 13.813 9.47168 13.3382L14.6532 8.15651C15.1256 7.74624 15.1012 7.04793 14.6663 6.63325C14.2538 6.19635 13.5654 6.22336 13.1546 6.63161L8.71587 11.073L6.85252 9.20814L6.85124 9.20687C6.4278 8.7866 5.74242 8.78662 5.31898 9.20685L5.31736 9.20848Z';
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

function Cb20({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
        <svg className="absolute inset-0 w-full h-full" fill="none" viewBox="0 0 20 20">
          <clipPath id="cb20tematica">
            <rect width="20" height="20" fill="white" />
          </clipPath>
          <g clipPath="url(#cb20tematica)">
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

export function StepTematica({ formData, onChange, selectedYear, selectedSubject }: StepTematicaProps) {
  const [bnccOpen, setBnccOpen] = useState(false);
  const [bnccSearch, setBnccSearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const suggestions = SUGGESTIONS_BY_SUBJECT[selectedSubject] ?? DEFAULT_SUGGESTIONS;
  const bnccList = BNCC_BY_SUBJECT[selectedSubject] ?? DEFAULT_BNCC;
  const filtered = bnccSearch
    ? bnccList.filter((b) => b.code.toLowerCase().includes(bnccSearch.toLowerCase()) || b.desc.toLowerCase().includes(bnccSearch.toLowerCase()))
    : bnccList;

  const toggleBncc = (code: string) => {
    const current = formData.bnccSkills;
    if (current.includes(code)) {
      onChange({ bnccSkills: current.filter((c) => c !== code) });
    } else if (current.length < 3) {
      onChange({ bnccSkills: [...current, code] });
    }
  };

  const atLimit = formData.bnccSkills.length >= 3;

  return (
    <div className="flex flex-col gap-0">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#0D0712' }}>
          Temática
        </h2>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#A096A9' }}>
          * Campos com asterisco são obrigatórios
        </span>
      </div>

      {/* Tema da aula */}
      <div className="mb-1">
        <p className="mb-1.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0D0712' }}>
          Tema da aula<span style={{ color: '#8600F4' }}>*</span>
        </p>
        <input
          type="text"
          placeholder="Ex.: Ciclo da Água"
          value={formData.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
          className="w-full px-4 py-2.5 outline-none"
          style={{
            border: '1px solid #D3CADB',
            borderRadius: 8,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            color: '#0D0712',
            background: '#fff',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#8600F4')}
          onBlur={(e) => (e.target.style.borderColor = '#D3CADB')}
        />
        <p className="mt-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#6E6576' }}>
          Descreva o tema da aula ou escolha entre as sugestões abaixo
          {selectedSubject && <span style={{ color: '#8600F4', fontWeight: 600 }}> para {selectedSubject}</span>}
        </p>
      </div>

      {/* Suggestions */}
      <div className="flex gap-3 mb-5 mt-3">
        {suggestions.map((sug) => {
          const sel = formData.topic === sug.title;
          return (
            <button
              key={sug.title}
              onClick={() => onChange({ topic: sug.title })}
              className="flex-1 p-3 text-left border rounded-lg cursor-pointer transition-all"
              style={{
                background: sel ? '#F4E8FE' : '#fff',
                borderColor: sel ? '#8600F4' : '#D3CADB',
                borderRadius: 8,
              }}
            >
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, color: sel ? '#8600F4' : '#494150', marginBottom: 4 }}>
                {sug.title}
              </p>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#A096A9' }}>
                {sug.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* BNCC accordion — horizontal line pattern, DS Cb20 checkboxes */}
      <div className="flex flex-col w-full mb-3">
        <SepLine />
        <button
          className="w-full flex items-center border-0 cursor-pointer bg-transparent"
          style={{ padding: 16, gap: 8 }}
          onClick={() => setBnccOpen(!bnccOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M3 10H17M3 15H12" stroke={bnccOpen ? '#8600F4' : '#494150'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 16, color: bnccOpen ? '#8600F4' : '#494150', whiteSpace: 'nowrap' }}>
              Habilidades BNCC
            </span>
            <div
              className="flex items-center justify-center shrink-0"
              style={{ border: '1px solid #0D0712', borderRadius: 10000, height: 28, paddingLeft: 12, paddingRight: 12 }}
            >
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#0D0712' }}>
                opcional
              </span>
            </div>
          </div>
          <span style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 12,
            color: bnccOpen ? '#8600F4' : '#494150',
            fontWeight: formData.bnccSkills.length > 0 ? 600 : 400,
            flexShrink: 0,
          }}>
            {formData.bnccSkills.length}/3 selecionadas
          </span>
          <DsChevron open={bnccOpen} color={bnccOpen ? '#8600F4' : '#494150'} />
        </button>
        <SepLine />

        {bnccOpen && (
          <div>
            {/* Search */}
            <div className="px-4 pt-3 pb-2">
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{ border: '1px solid #D3CADB', borderRadius: 8, background: '#fff', transition: 'border-color 0.15s' }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="#A096A9" strokeWidth="1.3" />
                  <path d="M11 11L13.5 13.5" stroke="#A096A9" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar habilidade BNCC…"
                  value={bnccSearch}
                  onChange={(e) => setBnccSearch(e.target.value)}
                  className="flex-1 border-0 outline-none bg-transparent"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: '#0D0712' }}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => { const p = e.target.closest<HTMLDivElement>('div[style]'); if (p) p.style.borderColor = '#8600F4'; }}
                  onBlur={(e) => { const p = e.target.closest<HTMLDivElement>('div[style]'); if (p) p.style.borderColor = '#D3CADB'; }}
                />
                {bnccSearch && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setBnccSearch(''); }}
                    className="border-0 bg-transparent cursor-pointer"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 1L9 9M9 1L1 9" stroke="#A096A9" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {atLimit && (
              <div className="px-4 pb-2">
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: '#8600F4', fontWeight: 600 }}>
                  Limite atingido. Remova uma habilidade para selecionar outra.
                </p>
              </div>
            )}

            <div className="px-4 pb-4 flex flex-col gap-1.5">
              {filtered.length === 0 ? (
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, color: '#A096A9', padding: '8px 0' }}>
                  Nenhuma habilidade encontrada.
                </p>
              ) : (
                filtered.map((b) => {
                  const checked = formData.bnccSkills.includes(b.code);
                  const disabled = !checked && atLimit;
                  return (
                    <button
                      key={b.code}
                      onClick={() => toggleBncc(b.code)}
                      disabled={disabled}
                      className="flex items-start gap-3 text-left border-0 cursor-pointer rounded-lg px-3 py-2.5 w-full transition-colors"
                      style={{
                        background: checked ? '#E7DFEE' : disabled ? '#F9F7FB' : 'transparent',
                        borderRadius: 8,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        border: 'none',
                      }}
                    >
                      <div className="mt-0.5 shrink-0">
                        <Cb20 checked={checked} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 13, fontWeight: 700, color: checked ? '#8600F4' : disabled ? '#A096A9' : '#0D0712' }}>
                          {b.code}
                        </span>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: checked ? '#8600F4' : disabled ? '#C4BCC9' : '#6E6576', marginLeft: 6 }}>
                          {b.desc}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upload */}
      <div className="mt-1">
        <p className="mb-2 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#0D0712' }}>
          Importar base
          <span
            className="flex items-center justify-center"
            style={{ border: '1px solid #0D0712', borderRadius: 10000, height: 24, paddingLeft: 10, paddingRight: 10, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, fontWeight: 600, color: '#0D0712' }}
          >
            opcional
          </span>
        </p>
        <div
          className="flex flex-col items-center justify-center gap-3 py-8 px-5 rounded-xl text-center cursor-pointer transition-all"
          style={{
            border: `1.5px dashed ${isDragging ? '#8600F4' : '#D3CADB'}`,
            borderRadius: 12,
            background: isDragging ? '#F4E8FE' : '#FFFCFF',
          }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="4" width="24" height="32" rx="3" stroke="#8600F4" strokeWidth="1.6" />
            <path d="M20 14V26M15 20L20 14L25 20" stroke="#8600F4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, color: '#6E6576' }}>
            Arraste e solte os arquivos aqui ou
          </p>
          <button
            className="px-5 py-2 rounded-lg cursor-pointer transition-colors"
            style={{ background: '#8600F4', border: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff' }}
          >
            Selecione
          </button>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 11, color: '#A096A9', lineHeight: 1.7 }}>
            <p>Tamanho máximo: 10MB</p>
            <p>Arquivos permitidos: PDF, PNG e JPEG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
