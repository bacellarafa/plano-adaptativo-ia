import svgPaths from "./svg-ho9wvfou16";
import imgIcon from "./8398f4618f64765205a075dedd96dd7fd62b29ae.png";

function Frame1() {
  return (
    <div className="bg-[#f6f0fb] content-stretch flex items-center p-[8px] relative rounded-[4px] shrink-0">
      <div className="relative shrink-0 size-[16px]" data-name="Icon">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIcon} />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#f6f0fb] content-stretch flex items-center p-[8px] relative rounded-[4px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[12.49%_12.49%_12.49%_12.24%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0423 12.0017">
            <path d={svgPaths.p2f89df00} fill="var(--fill-0, #494150)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full">
      <Frame1 />
      <Frame2 />
    </div>
  );
}