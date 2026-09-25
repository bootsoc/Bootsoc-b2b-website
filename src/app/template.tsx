import { ViewTransition } from "react";

/** Templates remount on every navigation, so each page gets a soft enter/exit view transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
