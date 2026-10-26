"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import {
  Calendar,
  Command as CommandIcon,
  FolderKanban,
  Github,
  HelpCircle,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MessageSquareQuote,
  Moon,
  Orbit,
  Sun,
  User,
  Workflow,
  Wrench,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { site } from "@/data/site";

function socialHref(name: string) {
  return site.socials.find((social) => social.name === name)?.href ?? "#";
}

const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export function CommandMenuTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
      aria-label="Open command menu"
      title="Open command menu (⌘K)"
      className="flex size-8 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
    >
      <CommandIcon className="size-4" />
    </button>
  );
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [commandInputActive, setCommandInputActive] = useState(false);
  const [contentStyle, setContentStyle] = useState<CSSProperties>({});
  const router = useRouter();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setCommandInputActive(false);
      setContentStyle({});
    }
  };

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    if (isTouch) return;

    const frame = requestAnimationFrame(() => {
      document
        .querySelector<HTMLInputElement>('[data-slot="command-input"]')
        ?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    let frame: number | null = null;
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    const update = () => {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        frame = null;

        if (isMobile && commandInputActive) {
          setContentStyle({
            top: `${visualViewport.offsetTop + 120}px`,
            maxHeight: `${Math.max(240, visualViewport.height - 136)}px`,
          });
        } else {
          setContentStyle({});
        }
      });
    };

    update();
    visualViewport.addEventListener("resize", update);
    visualViewport.addEventListener("scroll", update);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      visualViewport.removeEventListener("resize", update);
      visualViewport.removeEventListener("scroll", update);
    };
  }, [open, commandInputActive]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (
        !open &&
        event.key === "Tab" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        !isEditableTarget(event.target) &&
        document.activeElement === document.body
      ) {
        event.preventDefault();
        toggleTheme();
      }
    };

    const onOpen = () => setOpen(true);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-menu", onOpen);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, [open, toggleTheme]);

  const goToSection = (id: string) => {
    setOpen(false);
    window.setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${id}`);
      }
    }, 50);
  };

  const goToProject = (slug: string) => {
    setOpen(false);
    router.push(`/projects/${slug}`);
  };

  const openLink = (href: string) => {
    setOpen(false);
    if (href.startsWith("mailto:")) {
      window.location.href = href;
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        contentStyle={contentStyle}
      >
        <CommandInput
          placeholder="Search sections, projects, and links..."
          onFocus={() => setCommandInputActive(true)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigate">
            <CommandItem onSelect={() => goToSection("home")}>
              <Home />
              Home
            </CommandItem>
            <CommandItem onSelect={() => goToSection("about")}>
              <User />
              About
            </CommandItem>
            <CommandItem onSelect={() => goToSection("projects")}>
              <FolderKanban />
              Projects
            </CommandItem>
            <CommandItem onSelect={() => goToSection("skills")}>
              <Wrench />
              Skills
            </CommandItem>
            <CommandItem onSelect={() => goToSection("process")}>
              <Workflow />
              Process
            </CommandItem>
            <CommandItem onSelect={() => goToSection("testimonials")}>
              <MessageSquareQuote />
              Testimonials
            </CommandItem>
            <CommandItem onSelect={() => goToSection("community")}>
              <Orbit />
              Community
            </CommandItem>
            <CommandItem onSelect={() => goToSection("faq")}>
              <HelpCircle />
              FAQ
            </CommandItem>
            <CommandItem onSelect={() => goToSection("contact")}>
              <Mail />
              Contact
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Projects">
            <CommandItem onSelect={() => goToProject("mediora")}>
              <FolderKanban />
              Mediora
            </CommandItem>
            <CommandItem onSelect={() => goToProject("library-management-system")}>
              <FolderKanban />
              Library Management System
            </CommandItem>
            <CommandItem onSelect={() => openLink(socialHref("GitHub"))}>
              <Github />
              GitHub repositories
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Connect">
            <CommandItem onSelect={() => openLink(`mailto:${site.email}`)}>
              <Mail />
              Email me
            </CommandItem>
            <CommandItem onSelect={() => openLink(site.bookingUrl)}>
              <Calendar />
              Book a call
            </CommandItem>
            <CommandItem onSelect={() => openLink(socialHref("LinkedIn"))}>
              <Linkedin />
              LinkedIn
            </CommandItem>
            <CommandItem onSelect={() => openLink(socialHref("Instagram"))}>
              <Instagram />
              Instagram
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={toggleTheme}>
              <Sun className="dark:hidden" />
              <Moon className="hidden dark:block" />
              Toggle theme
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
