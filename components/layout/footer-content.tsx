"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { site } from "@/data/site"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Keyboard,
  Linkedin,
  Send,
} from "lucide-react"

const socialHref = (name: string) =>
  site.socials.find((social) => social.name === name)?.href ?? "#"

const tiktokHref = site.socials.find((social) => social.name === "TikTok")?.href

function CopyableContactRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [])

  const handleCopy = async () => {
    const success = await copyToClipboard(value)
    if (!success) return

    setCopied(true)
    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}: ${value}`}
      title={`Copy ${label.toLowerCase()}`}
      className="group flex w-fit max-w-full items-center gap-1.5 rounded-md py-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
    >
      <span className="shrink-0 font-semibold text-neutral-950 dark:text-neutral-50">
        {label}:
      </span>
      <span className="truncate text-neutral-600 dark:text-neutral-400">
        {value}
      </span>
      <span className="shrink-0 text-neutral-500 transition-colors group-hover:text-brand dark:text-neutral-400">
        {copied ? (
          <Check className="h-3.5 w-3.5 text-brand" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied` : ""}
      </span>
    </button>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function Shortcut({ keys, label }: { keys: string[]; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex items-center gap-1">
        {keys.map((key) => (
          <kbd
            key={key}
            className="rounded border border-neutral-200/80 bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-neutral-700 dark:border-neutral-800/80 dark:bg-neutral-900 dark:text-neutral-300"
          >
            {key}
          </kbd>
        ))}
      </span>
      <span>{label}</span>
    </span>
  )
}

function FooterContent() {
  return (
    <footer className="relative mt-20 border-t border-neutral-200/80 bg-white/80 font-sans text-neutral-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-colors dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:text-neutral-400 dark:shadow-[0_8px_32px_rgb(0,0,0,0.4)] md:mt-28">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">Nadhir Bendraou</h2>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              I&apos;m available for freelance, remote work, and collaborations. Tell me what you&apos;re working on.
            </p>
            <form
              action={site.newsletterUrl || undefined}
              method="post"
              target={site.newsletterUrl ? "_blank" : undefined}
              className="relative mx-auto w-full max-w-sm"
            >
              <Input
                type="email"
                name="email"
                required
                disabled={!site.newsletterUrl}
                placeholder={
                  site.newsletterUrl
                    ? "Your email for the newsletter"
                    : "Newsletter coming soon"
                }
                className="h-10 rounded-full pr-12 backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-60"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!site.newsletterUrl}
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
              {!site.newsletterUrl && (
                <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-500">
                  Newsletter soon.
                </p>
              )}
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-neutral-950 dark:text-neutral-50">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/#home" className="block text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200">
                Home
              </Link>
              <Link href="/#about" className="block text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200">
                About
              </Link>
              <Link href="/#projects" className="block text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200">
                Projects
              </Link>
              <Link href="/#skills" className="block text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200">
                Skills
              </Link>
              <Link href="/#contact" className="block text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200">
                Contact
              </Link>
              {site.resumeUrl ? (
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Resume
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-1 text-neutral-400 dark:text-neutral-600"
                >
                  Resume
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              )}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-neutral-950 dark:text-neutral-50">Contact</h3>
            <address className="space-y-2 text-sm not-italic">
              <CopyableContactRow
                label="Phone"
                value={site.phone}
              />
              <CopyableContactRow
                label="Email"
                value={site.email}
              />
              <CopyableContactRow
                label="Address"
                value={site.address}
              />
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-neutral-950 dark:text-neutral-50">Follow me</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={socialHref("GitHub")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                        className: "rounded-full",
                      })}
                    >
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View my GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={socialHref("Instagram")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                        className: "rounded-full",
                      })}
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow me on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {tiktokHref ? (
                      <a
                        href={tiktokHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "outline",
                          size: "icon",
                          className: "rounded-full",
                        })}
                      >
                        <TikTokIcon className="h-4 w-4" />
                        <span className="sr-only">TikTok</span>
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        title="TikTok link coming soon"
                        className={buttonVariants({
                          variant: "outline",
                          size: "icon",
                          className:
                            "cursor-not-allowed rounded-full opacity-40",
                        })}
                      >
                        <TikTokIcon className="h-4 w-4" />
                        <span className="sr-only">
                          TikTok link coming soon
                        </span>
                      </span>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {tiktokHref
                        ? "Follow me on TikTok"
                        : "TikTok link coming soon"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={socialHref("LinkedIn")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                        className: "rounded-full",
                      })}
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with me on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-6 border-t pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 md:justify-start">
            <span className="inline-flex items-center gap-2 font-medium text-neutral-950 dark:text-neutral-50">
              <Keyboard className="h-4 w-4" />
              Shortcuts
            </span>
            <Shortcut keys={["⌘K", "Ctrl K"]} label="Command menu" />
            <Shortcut keys={["Tab"]} label="Toggle theme" />
            <Shortcut keys={["Esc"]} label="Close menu" />
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-center md:flex-row">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © 2026 Nadhir Bendraou. All rights reserved.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="gap-2 rounded-full"
            >
              Back to top
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { FooterContent }
