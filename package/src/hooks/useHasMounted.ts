import { useEffect, useState } from "react";

/**
 * Hook to check if component has mounted on client side
 * Prevents hydration mismatches with animations
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
