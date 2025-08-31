import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export function useNextJsRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return React.useMemo(
    () => ({
      pathname,
      searchParams,
      navigate: (href) => router.push(href),
    }),
    [router, pathname, searchParams]
  );
}
