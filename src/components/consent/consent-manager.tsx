"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { consentStore, useConsent } from "@/components/consent/store";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const LINKEDIN_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export function ConsentManager() {
  const { ready, regime, consent, prefsOpen } = useConsent();
  const showBanner = ready && !consent.decidedAt && !prefsOpen;

  // Keep Google Consent Mode v2 in sync with the visitor's choice.
  useEffect(() => {
    if (!ready || !GA_ID) return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.advertising ? "granted" : "denied",
      ad_user_data: consent.advertising ? "granted" : "denied",
      ad_personalization: consent.advertising ? "granted" : "denied",
    });
  }, [ready, consent.analytics, consent.advertising]);

  return (
    <>
      {GA_ID && ready && consent.analytics && (
        <>
          <Script id="gtag-consent" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'${consent.advertising ? "granted" : "denied"}',ad_user_data:'${consent.advertising ? "granted" : "denied"}',ad_personalization:'${consent.advertising ? "granted" : "denied"}'});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
          {/* The queue above records the page view immediately; the 170 KB library itself waits for browser idle. */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        </>
      )}
      {LINKEDIN_ID && ready && consent.advertising && (
        <Script id="linkedin-insight" strategy="lazyOnload">
          {`window._linkedin_partner_id="${LINKEDIN_ID}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      )}

      <AnimatePresence>
        {showBanner && (
          <motion.section
            aria-label="Cookie choices"
            // Rises from the edge it lives on, and leaves faster than it arrived (the visitor has already decided).
            initial={{ opacity: 0, y: "30%" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
            exit={{ opacity: 0, y: "20%", transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
            className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-xl rounded-[1.5rem] bg-raise/95 p-1.5 ring-1 ring-line shadow-[0_24px_80px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:bottom-4"
          >
            <div className="rounded-[calc(1.5rem-6px)] bg-bg/60 p-4 sm:p-5">
              {regime === "optin" ? (
                <>
                  <h2 className="font-medium">Your cookie choices</h2>
                  <p className="mt-1.5 text-[13px] leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">
                    We use essential cookies to run this site. With your permission we&apos;d also use analytics and
                    advertising cookies to understand visits and measure campaigns. Nothing optional loads until you choose.{" "}
                    <Link href="/cookies" className="underline underline-offset-2 hover:text-fg">
                      Cookie policy
                    </Link>
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4">
                    <BannerButton onClick={() => consentStore.save({ analytics: false, advertising: false })}>Reject all</BannerButton>
                    <BannerButton onClick={() => consentStore.openPrefs()}>Customize</BannerButton>
                    <BannerButton onClick={() => consentStore.save({ analytics: true, advertising: true })}>Accept all</BannerButton>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-medium">Privacy notice</h2>
                  <p className="mt-1.5 text-[13px] leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">
                    We use cookies for analytics and to measure advertising. You can opt out of the sale or sharing of
                    personal information at any time.
                    {consent.gpc && " We detected a Global Privacy Control signal and have turned off advertising cookies."}{" "}
                    <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
                      Privacy policy
                    </Link>
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
                    <BannerButton onClick={() => consentStore.openPrefs()}>Manage choices</BannerButton>
                    <BannerButton onClick={() => consentStore.save({ analytics: consent.analytics, advertising: consent.advertising })}>
                      Got it
                    </BannerButton>
                  </div>
                </>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <PreferencesDialog />
    </>
  );
}

function BannerButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  // Accept and reject share one visual weight: UK ICO guidance requires rejecting to be as easy as accepting.
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 whitespace-nowrap rounded-full bg-fg px-3 text-sm font-medium text-bg transition-transform active:scale-[0.98] sm:px-4"
    >
      {children}
    </button>
  );
}

function PreferencesDialog() {
  const { prefsOpen, consent } = useConsent();
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState({ analytics: consent.analytics, advertising: consent.advertising });

  const [wasOpen, setWasOpen] = useState(prefsOpen);
  if (prefsOpen !== wasOpen) {
    setWasOpen(prefsOpen);
    if (prefsOpen) setDraft({ analytics: consent.analytics, advertising: consent.advertising });
  }

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (prefsOpen && !d.open) d.showModal();
    if (!prefsOpen && d.open) d.close();
  }, [prefsOpen]);

  return (
    <dialog
      ref={ref}
      onClose={() => consentStore.closePrefs()}
      aria-labelledby="prefs-title"
      className="prefs-dialog m-auto w-[min(34rem,calc(100vw-2rem))] rounded-[1.5rem] bg-raise p-0 text-fg ring-1 ring-line backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 id="prefs-title" className="display-md text-3xl">
          Privacy choices
        </h2>
        <p className="mt-2 text-sm text-muted">
          Choose which optional cookies we may use. You can change this any time from &ldquo;Your privacy choices&rdquo; in the footer.
        </p>
        <ul className="mt-6 grid gap-3">
          <PrefRow
            title="Strictly necessary"
            body="Security, load balancing and remembering these choices. Always on."
            checked
            disabled
          />
          <PrefRow
            title="Analytics"
            body="Google Analytics 4 with IP truncation, to understand which pages help visitors."
            checked={draft.analytics}
            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
          />
          <PrefRow
            title="Advertising and sharing"
            body={
              consent.gpc
                ? "Turned off because your browser sends a Global Privacy Control signal."
                : "LinkedIn Insight Tag for B2B campaign measurement. Turning this off opts you out of the sale or sharing of personal information."
            }
            checked={draft.advertising && !consent.gpc}
            disabled={consent.gpc}
            onChange={(v) => setDraft((d) => ({ ...d, advertising: v }))}
          />
        </ul>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => consentStore.save({ analytics: false, advertising: false })}
            className="min-h-11 rounded-full px-5 text-sm font-medium ring-1 ring-line hover:bg-raise-2"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={() => consentStore.save(draft)}
            className="min-h-11 rounded-full bg-signal px-5 text-sm font-medium text-on-signal hover:bg-signal-press"
          >
            Save choices
          </button>
        </div>
      </div>
    </dialog>
  );
}

function PrefRow({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li>
      <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl bg-bg/60 p-4 ring-1 ring-line has-[:disabled]:cursor-not-allowed">
        <span>
          <span className="block text-sm font-medium">{title}</span>
          <span className="mt-1 block text-sm text-muted">{body}</span>
        </span>
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            type="checkbox"
            role="switch"
            className="peer sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
          />
          <span className="h-7 w-12 rounded-full bg-line transition-colors peer-checked:bg-signal peer-disabled:opacity-60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal" />
          <span className="absolute left-1 top-1 size-5 rounded-full bg-fg transition-[transform,background-color] duration-200 ease-out peer-checked:translate-x-5 peer-checked:bg-on-signal" />
        </span>
      </label>
    </li>
  );
}
