"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = document.querySelector<HTMLElement>(".cursor");
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const cleanups: Array<() => void> = [];

    const setActiveNav = (id: string) => {
      navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());

    if (cursor) {
      const moveCursor = (event: MouseEvent) => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      };
      const activateCursor = () => cursor.classList.add("is-visible");
      const hideCursor = () => cursor.classList.remove("is-visible");
      const hoverable = document.querySelectorAll<HTMLElement>("a, button, summary, [data-magnetic]");
      const addHoverState = () => cursor.classList.add("is-hovering");
      const removeHoverState = () => cursor.classList.remove("is-hovering");

      window.addEventListener("mousemove", moveCursor);
      window.addEventListener("mouseenter", activateCursor);
      window.addEventListener("mouseleave", hideCursor);
      hoverable.forEach((element) => {
        element.addEventListener("mouseenter", addHoverState);
        element.addEventListener("mouseleave", removeHoverState);
      });

      cleanups.push(() => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseenter", activateCursor);
        window.removeEventListener("mouseleave", hideCursor);
        hoverable.forEach((element) => {
          element.removeEventListener("mouseenter", addHoverState);
          element.removeEventListener("mouseleave", removeHoverState);
        });
      });
    }

    if (reduceMotion) {
      return () => cleanups.forEach((cleanup) => cleanup());
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const animationContext = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 42,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.to(".hero-card-main", {
        yPercent: 10,
        rotate: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-stage",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-card-small", {
        yPercent: -18,
        rotate: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-stage",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-stamp", {
        yPercent: -24,
        rotation: 6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-stage",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".orbit-three", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.fromTo(
        ".signal-lines span",
        { scaleX: 0.15, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".signal-card-large",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((element) => {
        const move = (event: MouseEvent) => {
          const bounds = element.getBoundingClientRect();
          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;
          gsap.to(element, { x: x * 0.12, y: y * 0.12, duration: 0.35, ease: "power3.out" });
        };
        const reset = () => gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" });
        element.addEventListener("mousemove", move);
        element.addEventListener("mouseleave", reset);
        cleanups.push(() => {
          element.removeEventListener("mousemove", move);
          element.removeEventListener("mouseleave", reset);
        });
      });

    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.clearTimeout(refresh);
      animationContext.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
