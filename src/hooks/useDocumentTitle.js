import { useEffect } from "react";

// Custom hook: sets the browser tab title for each page
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Spice Route` : "Spice Route";
  }, [title]);
}
