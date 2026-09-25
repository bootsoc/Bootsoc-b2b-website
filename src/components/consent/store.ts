"use client";

import { useSyncExternalStore } from "react";
import {
  CONSENT_COOKIE,
  CONSENT_VERSION,
  GEO_COOKIE,
  VISITOR_COOKIE,
  defaultConsent,
  parseConsent,
  type ConsentRegime,
  type ConsentState,
} from "@/lib/consent";

type Snapshot = {
  ready: boolean;
  regime: ConsentRegime;
  location: string;
  consent: ConsentState;
  prefsOpen: boolean;
};

const serverSnapshot: Snapshot = {
  ready: false,
  regime: "optin",
  location: "XX",
  consent: defaultConsent("optin", false),
  prefsOpen: false,
};

let snapshot: Snapshot = serverSnapshot;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function writeCookie(name: string, value: string, days: number) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${days * 86400}; SameSite=Lax${secure}`;
}

function visitorId() {
  let id = readCookie(VISITOR_COOKIE);
  if (!id) {
    id = crypto.randomUUID();
    writeCookie(VISITOR_COOKIE, id, 365);
  }
  return decodeURIComponent(id);
}

function init() {
  if (snapshot.ready || typeof document === "undefined") return;
  const geo = decodeURIComponent(readCookie(GEO_COOKIE) ?? "optin.XX");
  const [regimeRaw, location = "XX"] = geo.split(".");
  const regime: ConsentRegime = regimeRaw === "optout" ? "optout" : "optin";
  const gpc = Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
  const stored = parseConsent(readCookie(CONSENT_COOKIE));
  // A GPC signal always overrides a stored "allow" for advertising (CCPA/CPRA opt-out preference signal).
  const consent = stored ? { ...stored, advertising: stored.advertising && !gpc, gpc } : defaultConsent(regime, gpc);
  snapshot = { ready: true, regime, location, consent, prefsOpen: false };
}

export const consentStore = {
  subscribe(listener: () => void) {
    init();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  get() {
    init();
    return snapshot;
  },
  save(choice: { analytics: boolean; advertising: boolean }) {
    const consent: ConsentState = {
      analytics: choice.analytics,
      advertising: choice.advertising && !snapshot.consent.gpc,
      gpc: snapshot.consent.gpc,
      decidedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    writeCookie(CONSENT_COOKIE, JSON.stringify(consent), 365);
    snapshot = { ...snapshot, consent, prefsOpen: false };
    emit();
    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: visitorId(),
        analytics: consent.analytics,
        advertising: consent.advertising,
        gpc: consent.gpc,
        version: CONSENT_VERSION,
      }),
      keepalive: true,
    }).catch(() => {});
  },
  openPrefs() {
    snapshot = { ...snapshot, prefsOpen: true };
    emit();
  },
  closePrefs() {
    snapshot = { ...snapshot, prefsOpen: false };
    emit();
  },
};

export function useConsent() {
  return useSyncExternalStore(consentStore.subscribe, consentStore.get, () => serverSnapshot);
}
