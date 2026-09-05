import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card } from "../../../../components/ui/card";

export const BlockchainIntegrationSection = (): JSX.Element => {
  const features = [
    {
      icon: "/mingcute-link-fill.svg",
      title: "QR Batch Tracking System",
      hindiTitle: "अटल क्यूआर बैच प्रमाणन",
      description:
        "Cryptographically signed QR codes generated for every coal batch with downloadable PDF passports containing weight, grade, and extraction timestamp.",
    },
    {
      icon: "/mdi-file-edit.svg",
      title: "OCR Shift Log Conversion",
      hindiTitle: "हस्तलिखित बहीखाता डिजिटलीकरण",
      description:
        "Instant multi-lingual OCR extraction converting handwritten pithead journals into structured searchable audit registries.",
    },
  ];

  return (
    <section id="safety" className="relative flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 w-full bg-[#120726] overflow-hidden gap-12">
      {/* Ambient Halos */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#FF7A00]/12 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Left Frame */}
      <div className="relative z-10 w-full lg:w-[500px] flex items-center justify-center order-2 lg:order-1">
        <div className="relative p-2 rounded-3xl bg-gradient-to-tr from-[#FF7A00] via-[#F5D061] to-[#00A896] shadow-2xl shadow-black/80">
          <div className="rounded-[22px] overflow-hidden border-2 border-[#F5D061]/60 bg-[#1A0B36] relative">
            <img
              className="h-[440px] w-full object-cover"
              alt="QR tracking technology interface"
              src="/image-8.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120726] via-transparent to-transparent opacity-70"></div>
            
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#120726]/90 border border-[#F5D061] text-[#F5D061] text-xs font-bold font-['Rajdhani',sans-serif] tracking-wider uppercase shadow-md">
              💎 100% SHUDDH DATA
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="relative z-10 flex flex-col items-start gap-6 w-full lg:w-[560px] order-1 lg:order-2">
        <div className="truck-art-badge text-xs">
          <span>✨ अटल पारदर्शिता • BLOCKCHAIN PROVENANCE</span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-['Rozha_One',serif] text-3xl sm:text-4xl lg:text-5xl text-[#FFF8E7] leading-tight tracking-wide">
            QR Provenance & <br />
            <span className="desi-text-gold">Cryptographic Logs</span>
          </h2>

          <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-[#FFF8E7]/80 leading-relaxed">
            Eliminate supply chain fraud and missing manifests. Every ton of mined coal receives an immutable digital passport from subterranean shaft to shipment railway wagons.
          </p>
        </div>

        <div className="flex flex-col gap-5 w-full mt-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#260E45]/80 border border-[#F5D061]/30 hover:border-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all duration-300 shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#E11D74] border border-[#F5D061]/50 p-2.5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FF7A00]/30">
                <img
                  className="w-full h-full object-contain filter brightness-125"
                  alt={feature.title}
                  src={feature.icon}
                />
              </div>

              <div className="flex flex-col">
                <div className="text-[11px] font-['Rajdhani',sans-serif] font-bold text-[#F5D061] tracking-wider uppercase">
                  {feature.hindiTitle}
                </div>
                <h3 className="font-['Rozha_One',serif] text-lg text-[#FFF8E7]">
                  {feature.title}
                </h3>
                <p className="font-['Poppins',sans-serif] text-sm text-[#FFF8E7]/70 leading-normal mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
