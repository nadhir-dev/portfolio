import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function CTA() {
  return (
    <section
      id="contact"
      className="flex items-center justify-center p-4 py-20"
    >
      <div className="relative w-full max-w-6xl bg-linear-to-bl from-indigo-600 to-indigo-900 rounded-2xl border border-indigo-500 px-6 py-16 pb-18 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-[40px]/13 font-medium text-white mb-8 max-w-2xl leading-tight">
          Have a project in mind?
          <br className="hidden md:block" /> Let&apos;s build it together.
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="bg-white text-gray-900 rounded-full px-6 py-3.5 text-sm flex items-center gap-2 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
          >
            Get In Touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>

          <Link
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full p-1.5 pr-5 flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <Image
              src="/my-avatar.jpg"
              alt="Avatar"
              height={60}
              width={60}
              className="size-9 rounded-full object-cover"
            />
            <div className="text-left flex flex-col justify-center gap-0.5">
              <span className="sm:text-sm text-xs  font-medium text-gray-900 leading-tight">
                Grab 15 minutes with me
                <span className="w-1.5 h-1.5 ml-2 bg-green-500 rounded-full inline-block"></span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
