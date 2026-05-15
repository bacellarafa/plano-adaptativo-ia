import svgPaths from "./svg-p1c1rskxvt";

function Step() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="step">
      <div className="bg-[#f4e8fe] relative rounded-[100000px] shrink-0 size-[40px]" data-name="Steps - complementos">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Checkmark">
            <div className="absolute inset-[20%_15%_15.01%_14.99%]" data-name="Vector">
              <div className="absolute inset-[-2.88%_-2.68%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8013 10.9991">
                  <path d={svgPaths.p2e694080} fill="var(--fill-0, #8600F4)" id="Vector" stroke="var(--stroke-0, #8600F4)" strokeWidth="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#8600f4] border-solid inset-0 pointer-events-none rounded-[100000px]" />
      </div>
      <p className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[1.52] not-italic relative shrink-0 text-[#0d0712] text-[16px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
        Contexto
      </p>
    </div>
  );
}

function StepIndicator() {
  return (
    <div className="h-full min-h-[52px] relative shrink-0 w-[40px]" data-name="Step indicator">
      <div className="absolute inset-[-1.02%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 100">
          <g id="Step indicator">
            <path d="M20 1L20 99" id="Vector 2" stroke="var(--stroke-0, #8600F4)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function StepContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-[52px] relative w-full" data-name="Step container">
      <StepIndicator />
      <div className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#494150] text-[14px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
        <p className="leading-[1.52] mb-0 whitespace-pre">{`Breve descrição `}</p>
        <p className="leading-[1.52] whitespace-pre">aqui (opcional)</p>
      </div>
    </div>
  );
}

function Steps1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-[96px] relative w-full z-[3]" data-name="steps">
      <Step />
      <StepContainer />
    </div>
  );
}

function Step1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="step">
      <div className="bg-[#8600f4] content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[100000px] shrink-0 size-[40px]" data-name="Steps - complementos">
        <p className="font-['Poppins:semibold',sans-serif] leading-[1.52] not-italic relative shrink-0 text-[#fffcff] text-[20px] text-center w-full">2</p>
      </div>
      <p className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[1.52] not-italic relative shrink-0 text-[#0d0712] text-[16px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
        Temática
      </p>
    </div>
  );
}

function StepIndicator1() {
  return (
    <div className="h-full min-h-[52px] relative shrink-0 w-[40px]" data-name="Step indicator">
      <div className="absolute inset-[-1.02%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 100">
          <g id="Step indicator">
            <path d="M20 1L20 99" id="Vector 2" stroke="var(--stroke-0, #887E91)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function StepContainer1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-[52px] relative w-full" data-name="Step container">
      <StepIndicator1 />
      <div className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#494150] text-[14px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
        <p className="leading-[1.52] mb-0 whitespace-pre">{`Breve descrição `}</p>
        <p className="leading-[1.52] whitespace-pre">aqui (opcional)</p>
      </div>
    </div>
  );
}

function Steps2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-[96px] relative w-full z-[2]" data-name="steps">
      <Step1 />
      <StepContainer1 />
    </div>
  );
}

function Step2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="step">
      <div className="relative rounded-[100000px] shrink-0 size-[40px]" data-name="Steps - complementos">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
          <p className="font-['Poppins:regular',sans-serif] leading-[1.52] not-italic relative shrink-0 text-[#887e91] text-[20px] text-center w-full">3</p>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#887e91] border-solid inset-0 pointer-events-none rounded-[100000px]" />
      </div>
      <p className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[1.52] not-italic relative shrink-0 text-[#0d0712] text-[16px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
        Adaptações
      </p>
    </div>
  );
}

function StepIndicator2() {
  return <div className="relative self-stretch shrink-0 w-[40px]" data-name="Step indicator" />;
}

function StepContainer2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Step container">
      <StepIndicator2 />
      <div className="font-['Plus_Jakarta_Sans:regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#494150] text-[14px] whitespace-nowrap" style={{ fontFeatureSettings: "'liga' 0" }}>
        <p className="leading-[1.52] mb-0 whitespace-pre">{`Breve descrição `}</p>
        <p className="leading-[1.52] whitespace-pre">aqui (opcional)</p>
      </div>
    </div>
  );
}

function Steps3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[1]" data-name="steps">
      <Step2 />
      <StepContainer2 />
    </div>
  );
}

export default function Steps() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] isolate items-start relative size-full" data-name="Steps">
      <Steps1 />
      <Steps2 />
      <Steps3 />
    </div>
  );
}