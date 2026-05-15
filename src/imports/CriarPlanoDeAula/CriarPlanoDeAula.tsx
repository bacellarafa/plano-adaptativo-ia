import svgPaths from "./svg-dv9jivfixs";
import imgAvatar from "./e27dfa2b9cdb625ff364c104c1612553df96ed6a.png";
import imgImage12 from "./b91c7e8fb0829461ce2381c4e4534912ff8e9859.png";
import imgTudoProntoParaCriarmosAlgoIncrivel from "./e0f8aa73b1a6130ac64002507b588e3aefe7ff6c.png";
import { imgTitle } from "./svg-qtuuu";

function Header() {
  return (
    <div className="absolute bg-white content-stretch flex h-[64px] items-center justify-between px-[24px] right-[-1px] top-[84px] w-[1226px]" data-name="header">
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0" data-name="menu iônica">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="bars-regular">
          <div className="absolute inset-[14.06%_6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 17.25">
              <path d={svgPaths.p97d6d00} fill="var(--fill-0, #FF7500)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="font-['Poppins:Regular',sans-serif] leading-[1.24] not-italic relative shrink-0 text-[#ff7500] text-[15px] tracking-[0.15px] whitespace-nowrap">Menu</p>
      </div>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-[140px]" data-name="DROP_SELETOR_COLEGIO">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#787878] text-[16px] tracking-[0.5px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
          <p className="leading-[1.56]">Colégio iônica</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="angle-down-regular">
          <div className="absolute inset-[31.24%_15.63%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9992 6.00258">
              <path d={svgPaths.p1f693500} fill="var(--fill-0, #FF7500)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 size-[44px]" data-name="avatar">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="44" src={imgAvatar} width="44" />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-0">
      <div className="overflow-clip relative rounded-[800px] shrink-0 size-[32px]" data-name="NAVIGATORS">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[24px] top-1/2" data-name="circle-question-regular">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
              <path d={svgPaths.p31f60270} fill="var(--fill-0, #494150)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandRegular() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-name="expand-regular">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand-regular">
          <path d={svgPaths.pb0bfc80} fill="var(--fill-0, #494150)" id="ï¦" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative self-stretch shrink-0">
      <div className="overflow-clip relative rounded-[800px] shrink-0 size-[32px]" data-name="NAVIGATORS">
        <ExpandRegular />
      </div>
      <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[800px] shrink-0 size-[32px]" data-name="NAVIGATORS">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="xmark-regular">
          <div className="absolute inset-[18.67%_18.75%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9984 15.0391">
              <path d={svgPaths.p1097f200} fill="var(--fill-0, #0D0712)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Header">
      <Frame5 />
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col font-['Poppins:regular',sans-serif] gap-[16px] items-center justify-center leading-[1.36] not-italic pb-[4px] relative shrink-0 text-center w-full">
      <p className="bg-center bg-clip-text bg-cover bg-no-repeat relative shrink-0 text-[40px] text-[transparent] w-full" style={{ backgroundImage: `url('${imgTudoProntoParaCriarmosAlgoIncrivel}')` }}>
        Tudo pronto para criarmos algo incrível?
      </p>
      <p className="relative shrink-0 text-[#0d0712] text-[18px] w-full">{`Para começar, escolha o que quer fazer com a minha inteligência artificial `}</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="magnifying-glass-regular">
        <div className="absolute inset-[6.27%_8.21%]" data-name="Union">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0573 20.9899">
            <path d={svgPaths.p14448180} fill="var(--fill-0, #4E008E)" id="Union" />
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:regular',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#4e008e] text-[20px]">
        <p className="leading-[1.52]">{`Buscar materiais `}</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="square-list-regular">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
            <path d={svgPaths.p36e40400} fill="var(--fill-0, #4E008E)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:regular',sans-serif] justify-center leading-[0] min-w-px not-italic relative text-[#4e008e] text-[20px]">
        <p className="leading-[1.52]">{`Criar questões `}</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="calendar-lines-pen-regular-full">
        <div className="absolute inset-[10%_3.64%_5%_10.02%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.7216 20.4">
            <path d={svgPaths.p2ffedf00} fill="var(--fill-0, #4E008E)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Poppins:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4e008e] text-[20px] w-[197px]">
        <p className="leading-[1.52]">Criar plano de aula</p>
      </div>
      <div className="bg-[#f6f0fb] content-stretch flex h-[28px] items-center justify-center px-[12px] py-[8px] relative rounded-[100000px] shrink-0" data-name="Badge">
        <div aria-hidden="true" className="absolute border border-[#d3cadb] border-solid inset-0 pointer-events-none rounded-[100000px]" />
        <p className="font-['Plus_Jakarta_Sans:semibold',sans-serif] leading-[1.36] not-italic relative shrink-0 text-[#0d0712] text-[12px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
          Novo
        </p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function CardCa() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[8px] shrink-0 w-[376px]" data-name="CARD CA">
      <div aria-hidden="true" className="absolute border border-[#a096a9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame7 />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d0712] text-[14px] w-full" style={{ fontFeatureSettings: "'liga' 0" }}>
        <p className="leading-[1.52]">Crie planos de aula personalizados por ano, tema, componente curricular e perfis de aprendizagem</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-center flex flex-[1_0_0] flex-wrap gap-[24px] items-center justify-center min-h-px relative w-full">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[8px] shrink-0 w-[376px]" data-name="CARD BI">
        <div aria-hidden="true" className="absolute border border-[#a096a9] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame3 />
        <div className="flex flex-col font-['Plus_Jakarta_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d0712] text-[14px] w-full" style={{ fontFeatureSettings: "'liga' 0" }}>
          <p className="leading-[1.52]">{`Busque temas e encontre conteúdos, atividades e outros recursos dos seus materiais `}</p>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[8px] shrink-0 w-[376px]" data-name="CARD CA">
        <div aria-hidden="true" className="absolute border border-[#a096a9] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <Frame6 />
        <div className="flex flex-col font-['Plus_Jakarta_Sans:regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d0712] text-[14px] w-full" style={{ fontFeatureSettings: "'liga' 0" }}>
          <p className="leading-[1.52]">Crie questões personalizadas por tema, componente e ano, com base nos seus materiais</p>
        </div>
      </div>
      <CardCa />
    </div>
  );
}

function Body() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Body">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[8px] py-[24px] relative size-full">
        <Frame />
        <Frame4 />
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Disclaimer">
      <p className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[1.36] not-italic relative shrink-0 text-[#494150] text-[10px] text-center w-full" style={{ fontFeatureSettings: "'liga' 0" }}>
        Todos os resultados construídos aqui têm como única fonte os conteúdos elaborados por especialistas da FTD Educação. Recursos de IA podem cometer erros. Por isso, é bom checar as respostas.
      </p>
    </div>
  );
}

function MenuUnificadoDesk() {
  return (
    <div className="absolute bg-[#fffcff] bottom-[-1px] content-stretch drop-shadow-[0px_4px_6px_rgba(13,7,18,0.16)] flex flex-col h-[683px] items-center justify-between p-[24px] right-[-1px] rounded-bl-[24px] rounded-tl-[24px] w-[1224px]" data-name="MENU UNIFICADO - DESK">
      <Header1 />
      <Body />
      <Disclaimer />
    </div>
  );
}

function TabTitle() {
  return (
    <div className="absolute contents left-[132.07px] top-[16.88px]" data-name="tab-title">
      <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] h-[22.5px] justify-center leading-[0] left-[1637.04px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1504.965px_-109.916px] mask-size-[214.509px_22.5px] not-italic text-[13.5px] text-white top-[138.04px] w-[289.647px]" style={{ maskImage: `url('${imgTitle}')` }}>
        <p className="leading-[normal]">Figma</p>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="absolute contents left-[78.75px] top-[9px]" data-name="tab">
      <div className="absolute h-[38.25px] left-[78.75px] top-[9px] w-[310.25px]" data-name="tab">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 310.25 38.25">
          <path d={svgPaths.p2a005680} fill="var(--fill-0, #35363A)" id="tab" />
        </svg>
      </div>
      <TabTitle />
      <div className="absolute h-[8.921px] left-[355.16px] top-[23.73px] w-[9.61px]" data-name="tab-close-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.61028 8.92107">
          <path d={svgPaths.pf213500} fill="var(--fill-0, white)" id="tab-close-icon" />
        </svg>
      </div>
    </div>
  );
}

function TabsBar() {
  return (
    <div className="absolute contents inset-[0_0_45.06%_0]" data-name="tabs-bar">
      <div className="absolute bg-[#202124] inset-[0_0_47.33%_0]" data-name="background" />
      <div className="absolute left-[389px] size-[13.5px] top-[21.38px]" data-name="new-tab-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
          <path d={svgPaths.p12184400} fill="var(--fill-0, #BEC1C5)" id="new-tab-icon" />
        </svg>
      </div>
      <Tab />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute contents inset-[52.67%_0_0.92%_0]" data-name="background">
      <div className="absolute bg-[#35363a] inset-[52.67%_0_0.92%_0]" data-name="background" />
      <div className="absolute bg-[#282828] inset-[98.45%_0_0.92%_0]" data-name="separator" />
    </div>
  );
}

function Actions() {
  return (
    <div className="absolute h-[14.625px] left-[17.44px] top-[60.19px] w-[87.188px]" data-name="actions">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87.1875 14.625">
        <g id="actions">
          <path clipRule="evenodd" d={svgPaths.p2c1cc800} fill="var(--fill-0, #F1F3F4)" fillRule="evenodd" id="back-arrow-icon" />
          <path clipRule="evenodd" d={svgPaths.p3d4edf00} fill="var(--fill-0, #86888A)" fillRule="evenodd" id="forward-arrow-icon" />
          <path d={svgPaths.p3801f00} fill="var(--fill-0, #F1F3F4)" id="refresh-icon" />
        </g>
      </svg>
    </div>
  );
}

function AddressBar() {
  return (
    <div className="absolute contents left-[8.89%] right-[3.62%] top-[47px]" data-name="address-bar">
      <div className="absolute bg-[#202124] h-[31.5px] left-[121.5px] right-[49.5px] rounded-[15.75px] top-[47px]" data-name="address-bar-background" />
      <div className="absolute h-[11.813px] left-[137.25px] top-[57.13px] w-[9px]" data-name="secure-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11.8125">
          <path clipRule="evenodd" d={svgPaths.p2f717970} fill="var(--fill-0, #EAEAEA)" fillRule="evenodd" id="secure-icon" />
        </svg>
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="absolute contents inset-[52.67%_0_0.92%_0]" data-name="toolbar">
      <Background />
      <Actions />
      <AddressBar />
      <div className="absolute h-[14.625px] right-[23.06px] top-[60.3px] w-[3.375px]" data-name="menu-icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.375 14.625">
          <g id="menu-icon">
            <path d={svgPaths.p2a0fc500} fill="var(--fill-0, #F1F3F4)" />
            <path d={svgPaths.p8d56200} fill="var(--fill-0, #F1F3F4)" />
            <path d={svgPaths.p22b54400} fill="var(--fill-0, #F1F3F4)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-[102px] size-[16px] top-[19px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame 238243">
          <rect fill="var(--fill-0, #FF7500)" height="16" id="Rectangle 6474" rx="2" width="16" />
          <path d={svgPaths.p356a4e00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function HeaderUrl() {
  return (
    <div className="-translate-x-1/2 absolute h-[86px] left-1/2 top-[-1px] w-[1366px]" data-name="HEADER URL">
      <TabsBar />
      <Toolbar />
      <div className="absolute h-[58.5px] left-[83.25px] top-[2.25px] w-[76.5px]" data-name="CleanShot 2020-02-25 at 15.02 1" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[160px] not-italic text-[#f3f6f8] text-[13.5px] top-[64px] whitespace-nowrap">
        <p className="leading-[normal]">{`https://ux.souionica.com.br/home`}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[127px] not-italic text-[#f3f6f8] text-[16px] top-[26.5px] whitespace-nowrap">
        <p className="leading-[normal]">Home | Colégio iônica</p>
      </div>
      <Frame1 />
    </div>
  );
}

export default function CriarPlanoDeAula() {
  return (
    <div className="bg-[#f5f5f5] border border-[#6e6576] border-solid overflow-clip relative rounded-[16px] size-full" data-name="Criar plano de aula">
      <div className="absolute bg-[rgba(0,0,0,0.64)] h-[768px] left-[139px] top-[-1px] w-[1226px]" data-name="Backgrround 64%" />
      <Header />
      <div className="absolute h-[682px] left-[-1px] top-[84px] w-[142px]" data-name="image 12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.88%] left-[-2.11%] max-w-none top-[-0.59%] w-[964.08%]" src={imgImage12} />
        </div>
      </div>
      <MenuUnificadoDesk />
      <HeaderUrl />
    </div>
  );
}