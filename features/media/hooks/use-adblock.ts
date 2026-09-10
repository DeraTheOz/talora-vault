"use client";

import { useEffect } from "react";

export function useAdblock() {
  useEffect(() => {
    const originalOpen = window.open;

    window.open = (...args: [string | URL | undefined, string?, string?]) => {
      console.warn("[AdBlock] Blocked popup:", args[0]);

      return {
        focus: () => {},
        blur: () => {},
        close: () => {},
        closed: false,
        location: { href: "" },
      } as unknown as Window;
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const originalWrite = document.write.bind(document);
    document.write = (...args: string[]) => {
      console.warn(
        "[AdBlock] Blocked document.write:",
        args[0]?.substring(0, 100),
      );
      return undefined;
    };

    const isAdLikeElement = (element: Element) => {
      // Never block the app's own dialogs/overlays
      if (element.closest?.("[data-talora-modal], [data-talora-overlay]"))
        return false;

      const text = `${element.id} ${element.className} ${
        element.getAttribute("aria-label") ?? ""
      }`;

      const src =
        element instanceof HTMLIFrameElement ||
        element instanceof HTMLScriptElement ||
        element instanceof HTMLImageElement
          ? element.src
          : "";

      const href = element instanceof HTMLAnchorElement ? element.href : "";

      const style = window.getComputedStyle(element);
      const zIndex = Number.parseInt(style.zIndex, 10);

      const suspiciousText =
        /ad|ads|popup|popunder|popover|banner|overlay|underlay|sponsor|track|redirect/i.test(
          text,
        );

      const suspiciousUrl =
        /ad|ads|popup|popunder|click|track|redirect|sponsor/i.test(
          `${src} ${href}`,
        );

      const suspiciousLayer =
        (style.position === "fixed" || style.position === "absolute") &&
        zIndex > 9999 &&
        (style.inset === "0px" ||
          (style.top === "0px" &&
            style.left === "0px" &&
            style.width === "100%" &&
            style.height === "100%"));

      return suspiciousText || suspiciousUrl || suspiciousLayer;
    };

    const removeAdLikeNode = (node: Node) => {
      if (!(node instanceof Element)) return;

      if (isAdLikeElement(node)) {
        console.warn("[AdBlock] Removed injected ad element:", node);
        node.remove();
        return;
      }

      node
        .querySelectorAll("iframe, script, img, a, div, section")
        .forEach((child) => {
          if (isAdLikeElement(child)) {
            console.warn("[AdBlock] Removed injected ad element:", child);
            child.remove();
          }
        });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(removeAdLikeNode);

        if (
          mutation.type === "attributes" &&
          mutation.target instanceof HTMLElement
        ) {
          if (isAdLikeElement(mutation.target)) {
            console.warn(
              "[AdBlock] Removed ad via attribute change:",
              mutation.target,
            );
            mutation.target.remove();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["onclick", "onerror", "href", "src", "style"],
    });

    return () => {
      window.open = originalOpen;
      document.write = originalWrite;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      observer.disconnect();
    };
  }, []);
}
