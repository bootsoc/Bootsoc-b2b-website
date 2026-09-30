import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-[0.95rem] font-medium transition-[background-color,color,box-shadow,transform] duration-160 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-on-signal hover:bg-signal-press shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
  secondary: "bg-raise text-fg ring-1 ring-line hover:ring-fg/40",
  ghost: "text-fg hover:bg-raise",
};

function Inner({ children, icon, variant }: { children: React.ReactNode; icon?: boolean; variant: Variant }) {
  return (
    <>
      <span>{children}</span>
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "grid size-8 place-items-center rounded-full transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            variant === "primary" ? "bg-on-signal/10" : "bg-fg/10",
          )}
        >
          <ArrowUpRightIcon size={16} weight="bold" />
        </span>
      )}
    </>
  );
}

const pad = (icon?: boolean) => (icon ? "py-2 pl-6 pr-2 min-h-12" : "px-6 py-3 min-h-12");

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon,
  ...rest
}: BaseProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], pad(icon), className)} {...rest}>
      <Inner icon={icon} variant={variant}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  icon,
  ...rest
}: BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], pad(icon), className)} {...rest}>
      <Inner icon={icon} variant={variant}>
        {children}
      </Inner>
    </button>
  );
}
