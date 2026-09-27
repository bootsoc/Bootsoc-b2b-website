"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Wordmark } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { primaryNav } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const menuId = useId();
  const megaId = useId();
  const megaRef = useRef<HTMLLIElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Close menus on route change. Adjusting state during render is React's recommended pattern here.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setSolutionsOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!solutionsOpen && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolutionsOpen(false);
        setOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setSolutionsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [solutionsOpen, open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-signal px-4 py-2 text-on-signal focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4" style={{ viewTransitionName: "site-header" }}>
        <div className="shell">
          <div
            className={cn(
              "flex h-16 items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-expo",
              scrolled || open
                ? "bg-bg/75 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.45)] ring-1 ring-line backdrop-blur-xl"
                : "bg-transparent",
            )}
          >
            <Link href="/" className="shrink-0 text-signal" aria-label="BootSoc home">
              <Wordmark className="h-6 md:h-7 [[data-theme=light]_&]:text-fg" />
            </Link>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1" onPointerLeave={() => setHovered(null)}>
                <li className="relative" ref={megaRef} onPointerEnter={() => setHovered("solutions")}>
                  <NavPill show={hovered === "solutions"} reduce={reduce} />
                  <button
                    type="button"
                    aria-expanded={solutionsOpen}
                    aria-controls={megaId}
                    onClick={() => setSolutionsOpen((v) => !v)}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors",
                      isActive("/solutions") ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    Solutions
                    <CaretDownIcon
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className={cn("transition-transform duration-300", solutionsOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.div
                        id={megaId}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.35, ease }}
                        className="absolute left-1/2 top-full mt-3 w-[min(46rem,90vw)] -translate-x-1/2 origin-top rounded-[1.5rem] bg-raise/95 p-1.5 ring-1 ring-line shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl"
                      >
                        <div className="grid grid-cols-[1fr_15rem] gap-1.5">
                          <ul className="grid grid-cols-2 gap-1 rounded-[calc(1.5rem-6px)] bg-bg/60 p-2">
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/solutions/${s.slug}`}
                                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-raise-2"
                                >
                                  <span className="block text-sm font-medium text-fg">{s.product ?? s.name}</span>
                                  <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
                                    {s.product ? s.name : s.summary}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/audience-estimator"
                            className="group flex flex-col justify-between rounded-[calc(1.5rem-6px)] bg-signal p-4 text-on-signal"
                          >
                            <span className="display-md text-2xl">How big is your in-market audience?</span>
                            <span className="mt-6 text-sm font-medium underline decoration-on-signal/30 underline-offset-4 group-hover:decoration-on-signal">
                              Size your audience
                            </span>
                          </Link>
                        </div>
                        <div className="px-3 pb-2 pt-3">
                          <div className="flex flex-wrap justify-between gap-3">
                            <Link href="/solutions" className="text-sm text-muted hover:text-fg">
                              Compare all solutions
                            </Link>
                            <Link href="/report" className="text-sm text-muted hover:text-fg">
                              Free: 2026 B2B lead quality report
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                {primaryNav.slice(1).map((item) => (
                  <li key={item.href} className="relative" onPointerEnter={() => setHovered(item.href)}>
                    <NavPill show={hovered === item.href} reduce={reduce} />
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "relative block whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors",
                        isActive(item.href) ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <Link
                href="/contact"
                className="hidden min-h-11 items-center rounded-full bg-signal px-5 whitespace-nowrap text-sm font-medium text-on-signal transition-colors hover:bg-signal-press sm:inline-flex"
              >
                Book a strategy call
              </Link>
              <button
                type="button"
                className="relative grid size-11 place-items-center rounded-full ring-1 ring-line xl:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute h-[1.5px] w-5 bg-fg transition-transform duration-500 ease-out-expo",
                    open ? "rotate-45" : "-translate-y-[4px]",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute h-[1.5px] w-5 bg-fg transition-transform duration-500 ease-out-expo",
                    open ? "-rotate-45" : "translate-y-[4px]",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-bg/95 pb-10 pt-28 backdrop-blur-2xl xl:hidden"
          >
            <nav aria-label="Mobile" className="shell">
              <ul className="grid gap-1">
                {[{ label: "All solutions", href: "/solutions" }, ...primaryNav.slice(1), { label: "Contact", href: "/contact" }].map(
                  (item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease }}
                    >
                      <Link href={item.href} className="display block py-2 text-5xl">
                        {item.label}
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-2"
              >
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/solutions/${s.slug}`} className="text-muted hover:text-fg">
                      {s.product ?? s.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
              <Link
                href="/contact"
                className="mt-10 inline-flex min-h-12 items-center rounded-full bg-signal px-6 font-medium text-on-signal"
              >
                Book a strategy call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Shared hover pill that glides between nav items (Motion layoutId). */
function NavPill({ show, reduce }: { show: boolean; reduce: boolean | null }) {
  if (!show) return null;
  return (
    <motion.span
      layoutId="nav-pill"
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-raise ring-1 ring-line"
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
    />
  );
}
