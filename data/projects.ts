export type ProjectContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "code"; code: string; language?: string; filename?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type ProjectScreenshot = {
  src?: string;
  alt: string;
  caption: string;
};

export type ProjectCaseStudy = {
  screenshots: ProjectScreenshot[];
};

export type ProjectSection = {
  id: string;
  label: string;
  title: string;
  blocks: ProjectContentBlock[];
};

export type ProjectTeamMember = {
  name: string;
  handle: string;
  image: string;
  role?: string;
  verified?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  releasedAt?: string;
  duration?: string;
  role: string;
  stack: string[];
  features: string[];
  content?: ProjectContentBlock[];
  sections?: ProjectSection[];
  team?: ProjectTeamMember[];
  caseStudy?: ProjectCaseStudy;
  links: {
    live?: string;
    code?: string;
  };
  image: string;
};

export const projects: Project[] = [
  {
    slug: "mediora",
    title: "Mediora",
    summary:
      "Healthcare booking platform with doctor verification, real-time availability, paid appointments, and secure messaging.",
    description:
      "Mediora is a full-stack healthcare platform that connects patients with verified doctors. Patients can search for a specialist, check live availability, book and pay for an appointment, and chat with their doctor before the visit. Doctors manage their profile, working hours, services, time off, and appointment queue from a dedicated dashboard, while admins review certification documents before an account goes live.",
    year: "2026",
    releasedAt: "July 14, 2026",
    role: "Backend & full-stack development",
    stack: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Redis",
      "Docker",
      "Next.js",
      "TypeScript",
    ],
    features: [
      "Email-verified patient and doctor accounts with Google OAuth",
      "Admin review flow for doctor certification documents",
      "Working days, rest times, leaves, and special schedules",
      "Paid appointments through Chargily with webhook settlement",
      "Real-time WebSocket chat with typing and read receipts",
      "Post-appointment feedback and doctor ratings",
      "Rate limiting, GZip compression, and containerized deployment",
    ],
    content: [
      {
        type: "paragraph",
        text: "The API is organized by domain: authentication, doctor approval, users, schedules, appointments, chat, and feedback. Each domain has its own router, schemas, service layer, and models, so the business rules stay testable and separate from the HTTP layer.",
      },
      {
        type: "paragraph",
        text: "FastAPI and Pydantic fit the async booking and chat endpoints because the request schemas double as validation and API documentation. PostgreSQL and SQLAlchemy keep appointments, schedules, and payments transactional, while Redis handles token revocation, rate limiting, and short-lived availability data. The Next.js and TypeScript clients share the same request shapes as the API, which kept the patient and doctor dashboards in sync.",
      },
    ],
    sections: [
      {
        id: "authentication",
        label: "Authentication",
        title: "Authentication & onboarding",
        blocks: [
          {
            type: "paragraph",
            text: "Sign-up starts with an email check, sends a verification token, and only then lets the user set a password. Passwords are hashed with Argon2 and exchanged for short-lived access tokens plus refresh tokens backed by Redis. Google OAuth is supported for both the web app and a mobile client.",
          },
          {
            type: "list",
            items: [
              "Email verification and duplicate email/username checks",
              "Password strength rules, reset tokens, and authenticated password changes",
              "JWT access and refresh flow with server-side token revocation",
              "Role-aware access for patients, doctors, and admins",
            ],
          },
        ],
      },
      {
        id: "doctor-verification",
        label: "Verification",
        title: "Doctor verification workflow",
        blocks: [
          {
            type: "paragraph",
            text: "A doctor cannot accept appointments until an admin reviews their request. Applicants submit their specialty, clinic details, and documents such as a medical degree and employment certificate. Files are uploaded to Cloudinary, and the admin queue shows pending requests, waiting time, and each document before approval or rejection.",
          },
          {
            type: "list",
            items: [
              "Certification request with document uploads",
              "Admin approval queue with status filters and search",
              "Approve or reject with a reviewable history",
              "Wallet and earnings tracking for approved doctors",
            ],
          },
        ],
      },
      {
        id: "scheduling",
        label: "Scheduling",
        title: "Schedules, services & availability",
        blocks: [
          {
            type: "paragraph",
            text: "Doctors define their weekly working days, consultation hours, breaks, maximum patients per day, and time off. They can also publish one-off special schedules and leave periods. Availability checks combine the weekly schedule, exceptions, existing appointments, and service duration so a slot is never double-booked.",
          },
          {
            type: "code",
            language: "python",
            filename: "src/services/availability.py",
            code: 'async def available_slots(\n    doctor_id: UUID,\n    service_id: UUID,\n    day: date,\n) -> list[time]:\n    schedule = await get_schedule(doctor_id, day)\n    if schedule is None:\n        return []\n\n    booked = await get_booked_slots(doctor_id, day)\n    duration = await get_service_duration(service_id)\n    leaves = await get_leave_blocks(doctor_id, day)\n\n    return [\n        slot\n        for slot in build_slots(schedule, duration)\n        if slot not in booked\n        and not overlaps(slot, duration, leaves)\n    ]',
          },
        ],
      },
      {
        id: "appointments",
        label: "Appointments",
        title: "Appointments & payments",
        blocks: [
          {
            type: "paragraph",
            text: "Booking creates a Chargily checkout session with a 30-minute limit. A webhook settles the payment, moves the appointment into a confirmed state, and the patient is redirected back into the app. Failed or expired sessions release the slot. Doctors approve settled appointments, and either side can cancel according to the appointment state.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Patient selects a doctor, service, and available slot",
              "Backend creates a Chargily product, price, and checkout session",
              "Webhook verifies the payment and settles the appointment",
              "Doctor approves the appointment or the patient cancels it",
            ],
          },
        ],
      },
      {
        id: "messaging",
        label: "Chat & feedback",
        title: "Real-time chat and feedback",
        blocks: [
          {
            type: "paragraph",
            text: "A token-authenticated WebSocket endpoint powers the chat. Clients can send messages, mark conversations as read, broadcast typing state, and keep the connection alive with ping frames. Conversation history and recent contacts are paginated over REST, and patients can leave a rating and comment after an appointment is completed.",
          },
          {
            type: "list",
            items: [
              "Send, read, typing, and ping events",
              "Recent contacts and paginated message history",
              "Feedback is tied to completed appointments",
              "Average rating and review counts exposed on doctor profiles",
            ],
          },
        ],
      },
    ],
    team: [
      {
        name: "Nadhir Bendraou",
        handle: "nadhir",
        role: "Backend & full-stack",
        image: "/my-avatar.jpg",
        verified: true,
      },
      {
        name: "Bentabet Elhabib",
        handle: "elhabib",
        role: "Full-stack",
        image: "/bentabet_elhabib.jpg",
        verified: true,
      },
    ],
    caseStudy: {
      screenshots: [
        {
          src: "/med/mediora-landing.jpg",
          alt: "Mediora landing page with a headline, services, and calls to action",
          caption:
            "Landing page: the public entry point into the booking platform.",
        },
        {
          src: "/med/mediora-signup-security.jpg",
          alt: "Mediora account setup with password strength and security guidance",
          caption:
            "Account setup: email verification, password rules, and security guidance.",
        },
        {
          src: "/med/mediora-doctor-dashboard.jpg",
          alt: "Mediora doctor dashboard with availability, stats, and feedback",
          caption:
            "Doctor dashboard: availability control, daily stats, and patient feedback.",
        },
        {
          src: "/med/mediora-doctor-profile.jpg",
          alt: "Mediora doctor profile and practice management form",
          caption:
            "Profile and practice management: working days, hours, breaks, and services.",
        },
        {
          src: "/med/mediora-chat.jpg",
          alt: "Mediora real-time chat between a doctor and a patient",
          caption:
            "Real-time chat with typing indicators, message history, and shared documents.",
        },
        {
          src: "/med/mediora-admin-approval.jpg",
          alt: "Mediora admin practitioner approval queue",
          caption:
            "Admin queue for reviewing new doctor registrations and waiting time.",
        },
        {
          src: "/med/mediora-admin-review.jpg",
          alt: "Mediora admin review of doctor certification documents",
          caption:
            "Certification review with documents, admin notes, and approve/reject actions.",
        },
      ],
    },
    links: {
      code: "https://github.com/nadhir-dev/mediora-back",
    },
    image: "/med/mediora-landing.jpg",
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    summary:
      "A typed bookstore API with catalog search, stock-aware orders, acquisition requests, comments, and a clean admin surface.",
    description:
      "A complete bookstore backend built with Bun and Elysia. Customers can search the catalog by title, author, or ISBN, inspect a book, leave a rating, and place an order with home or bureau delivery. Behind the API is a full admin workflow for stock, orders, authors, and acquisition requests, plus a typed OpenAPI reference documented at /docs.",
    year: "2026",
    releasedAt: "May 25, 2026",
    role: "Backend API development",
    stack: [
      "Bun",
      "Elysia",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Docker",
    ],
    features: [
      "Paginated catalog search across title, author, and ISBN",
      "Stock validation and duplicate pending-order protection",
      "Order status transitions that adjust inventory",
      "Book acquisition requests with acquire/reject review",
      "Comments, ratings, and aggregated review scores",
      "Signed Cloudinary uploads for book covers",
      "JWT cookie authentication and OpenAPI documentation",
    ],
    content: [
      {
        type: "paragraph",
        text: "The API is intentionally small and typed end to end. Elysia route schemas validate query strings, params, and request bodies before a handler runs, while Mongoose models keep the library domain explicit. The server ships as a single Bun process with an OpenAPI reference at /docs.",
      },
      {
        type: "paragraph",
        text: "Bun keeps the API, seed script, and Docker image small, and Elysia's schema-first routes gave me validation and the OpenAPI reference from one definition. MongoDB and Mongoose fit the document-shaped catalog and order data without needing a migration for every content change.",
      },
    ],
    sections: [
      {
        id: "catalog",
        label: "Catalog",
        title: "Catalog & discovery",
        blocks: [
          {
            type: "paragraph",
            text: "The catalog endpoint resolves author matches first, then searches books by title, ISBN, or author reference. Results are paginated with total pages, next/previous flags, and author documents populated. A single book can be fetched by Mongo ID or ISBN, which keeps the storefront and admin views on the same route.",
          },
          {
            type: "list",
            items: [
              "Search by title, ISBN, or author name",
              "Pagination metadata for storefront and admin tables",
              "Book details with populated authors, stock, and ratings",
              "Author search with prefix matching",
            ],
          },
        ],
      },
      {
        id: "orders",
        label: "Orders",
        title: "Orders & stock control",
        blocks: [
          {
            type: "paragraph",
            text: "Placing an order validates every line against live stock before creating the customer and order. To avoid accidental duplicates, the same phone number cannot open a second pending order with an identical set of books. When an order moves through pending, sold, delivered, or canceled, inventory and reporting stay in sync.",
          },
          {
            type: "code",
            language: "ts",
            filename: "src/routes/orders.ts",
            code: 'export const orderRoutes = new Elysia({ prefix: "/orders" })\n  .post(\n    "/",\n    async ({ body, status }) => {\n      for (const item of body.items) {\n        const book = await Book.findById(item.bookId);\n\n        if (!book) {\n          return status(404, `Book ${item.bookId} not found`);\n        }\n\n        if (book.quantity < item.quantity) {\n          return status(\n            409,\n            `Not enough stock for "${book.title}", only ${book.quantity} left`,\n          );\n        }\n      }\n\n      return createOrder(body);\n    },\n    {\n      body: t.Object({\n        phone: t.String(),\n        items: t.Array(\n          t.Object({\n            bookId: t.String(),\n            quantity: t.Integer({ minimum: 1 }),\n          }),\n        ),\n      }),\n    },\n  );',
          },
        ],
      },
      {
        id: "requests",
        label: "Requests",
        title: "Acquisition requests",
        blocks: [
          {
            type: "paragraph",
            text: "Customers can suggest a title that is missing from the catalog. The request records title, author, and notes, and warns when a matching title already has stock. Admins filter requests by status and mark them acquired or rejected, keeping the suggestion queue short and actionable.",
          },
        ],
      },
      {
        id: "auth",
        label: "Auth & tooling",
        title: "Auth, uploads & tooling",
        blocks: [
          {
            type: "paragraph",
            text: "The users plugin issues JWT cookies at register and login, keeps the token httpOnly, and exposes a /me endpoint for the current session, with passwords hashed using bcrypt. Cover images use a signed Cloudinary upload flow, and uploaded files are served through Elysia's static plugin. The project includes a seed script with authors, books, customers, orders, requests, and comments for local development.",
          },
          {
            type: "list",
            items: [
              "JWT cookie auth with /register, /login, and /me",
              "Signed uploads and static file serving",
              "OpenAPI reference at /docs",
              "Docker image based on oven/bun:alpine on port 8000",
            ],
          },
        ],
      },
    ],
    caseStudy: {
      screenshots: [
        {
          src: "/library_management/library-catalog.webp",
          alt: "BiblioAdmin storefront catalog with book covers and filters",
          caption:
            "Storefront catalog with search, stock badges, ratings, and cart actions.",
        },
        {
          src: "/library_management/library-book-detail.webp",
          alt: "Book detail page with description, stock, and reviews",
          caption:
            "Book detail: metadata, description, stock, cart, favorites, and reviews.",
        },
        {
          src: "/library_management/library-cart.webp",
          alt: "Cart and reservation summary with delivery options",
          caption:
            "Cart with quantity controls, delivery choice, and reservation total.",
        },
        {
          src: "/library_management/library-inventory-light.webp",
          alt: "Inventory management form in light mode",
          caption:
            "Inventory management: add books, upload covers, and inspect recent stock.",
        },
        {
          src: "/library_management/library-inventory-dark.webp",
          alt: "Inventory management form in dark mode",
          caption:
            "The same admin surfaces keep their hierarchy in dark mode.",
        },
        {
          src: "/library_management/library-inventory-table.webp",
          alt: "Recent inventory table with stock counts",
          caption:
            "Recent inventory with stock state and quantity at a glance.",
        },
        {
          src: "/library_management/library-orders.webp",
          alt: "Book orders table with status filters and delivery details",
          caption:
            "Orders: filters by state, delivery details, and per-order inspection.",
        },
        {
          src: "/library_management/library-requests.webp",
          alt: "Acquisition requests queue with pending recommendations",
          caption:
            "Acquisition requests with requester notes and acquire/reject actions.",
        },
      ],
    },
    links: {
      code: "https://github.com/nadhir-dev/library-system-backend",
    },
    image: "/library_management/library-catalog.webp",
  },
  {
    slug: "management-system-landing-page",
    title: "Management System Landing Page",
    summary:
      "A polished product landing page for a management platform, built around a clear narrative and a strong trial conversion path.",
    description:
      "A responsive landing page that presents a management system without overwhelming the visitor. The page moves from a focused hero into product features, social proof, metrics, testimonials, an FAQ, and a final trial call to action. It uses a dark launch theme with a green accent, custom gradient lighting, and a layout that holds together from mobile to wide desktop.",
    year: "2026",
    role: "Frontend design & development",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Hero with trial call to action and trust signals",
      "Alternating feature sections with dashboard previews",
      "Metrics band, testimonials, and FAQ accordion",
      "Persistent header CTA and closing conversion panel",
      "Responsive layout with a consistent dark visual system",
      "Light and dark themes with a smooth toggle",
    ],
    sections: [
      {
        id: "structure",
        label: "Page structure",
        title: "Page structure",
        blocks: [
          {
            type: "paragraph",
            text: "The page follows a deliberate narrative order. The hero states the promise and the primary action, features explain the product with large dashboard visuals, metrics provide scale, and testimonials reduce risk before the FAQ answers the remaining objections. The final CTA repeats the trial offer in a contained panel.",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Hero: headline, trial CTA, demo link, and trust markers",
              "Features: shared inbox, instant answers, and reporting",
              "Metrics: completed projects, return on investment, and downloads",
              "Testimonials, FAQ, and a closing trial panel",
            ],
          },
        ],
      },
      {
        id: "visual-system",
        label: "Visual system",
        title: "Visual system",
        blocks: [
          {
            type: "paragraph",
            text: "A near-black canvas keeps the dashboard imagery in focus, while the green accent is reserved for primary actions and small highlights. Poppins carries the headings, the grid stays generous, and every section reuses the same spacing and card language so the page feels like one product rather than a collection of blocks.",
          },
          {
            type: "list",
            items: [
              "Dark launch theme with a single green accent",
              "Poppins typography and consistent section rhythm",
              "Soft radial lighting behind the hero and CTA",
              "Light and dark variants that preserve contrast",
            ],
          },
        ],
      },
      {
        id: "conversion",
        label: "Conversion",
        title: "Conversion details",
        blocks: [
          {
            type: "paragraph",
            text: "Calls to action appear in the header, hero, and closing panel, always paired with the same trial language. Trust signals sit directly under the hero, while the FAQ removes friction around setup, tracking, and team size. The layout stays readable on small screens without hiding the primary action.",
          },
        ],
      },
    ],
    caseStudy: {
      screenshots: [
        {
          src: "/professional_landing_page/management-landing-hero-dark.jpg",
          alt: "Management system landing page hero in dark mode",
          caption:
            "Dark hero with the trial call to action and trust markers.",
        },
        {
          src: "/professional_landing_page/management-landing-hero-light.jpg",
          alt: "Management system landing page hero in light mode",
          caption:
            "The light variant keeps the same hierarchy and green accent.",
        },
        {
          src: "/professional_landing_page/management-landing-features.jpg",
          alt: "Management system landing page feature section",
          caption:
            "Feature section with dashboard previews and supporting product copy.",
        },
        {
          src: "/professional_landing_page/management-landing-metrics-and-testimonials.jpg",
          alt: "Management system landing page metrics and testimonial",
          caption:
            "Metrics band followed by social proof and a customer testimonial.",
        },
        {
          src: "/professional_landing_page/management-landing-faq-and-cta.jpg",
          alt: "Management system landing page FAQ and closing call to action",
          caption:
            "FAQ and the closing trial panel that repeats the primary action.",
        },
      ],
    },
    links: {
      live: "https://management-system-landing-page.vercel.app/",
      code: "https://github.com/nadhir-dev/management-system-landing-page",
    },
    image: "/professional_landing_page/management-landing-hero-dark.jpg",
  },
  {
    slug: "older-portfolio",
    title: "Older Portfolio",
    summary:
      "An earlier portfolio experiment built around motion, a command menu, and a bolder visual identity.",
    description:
      "A previous portfolio build used to explore a more expressive direction: a dark dotted landscape, large typography, animated theme transitions, and a compact work list. It brought together a command menu, a hero with floating technology icons, project previews, testimonials, and a contact section. I never finished it. Halfway through, I kept second-guessing whether it was interactive enough or good enough, and the scope kept growing until I moved on. It never made it to production, but the interaction work carried forward into the portfolio I finally shipped.",
    year: "2026",
    role: "Design & frontend development",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    features: [
      "Animated theme toggle with view-transition shapes",
      "Keyboard-driven command menu",
      "Scroll reveals and hover project previews",
      "Dotted map and layered hero lighting",
      "Compact work list with article-style case studies",
    ],
    sections: [
      {
        id: "motion",
        label: "Motion",
        title: "Motion & interaction",
        blocks: [
          {
            type: "paragraph",
            text: "Motion was used to give the page a sense of depth rather than to decorate it. Sections reveal as they enter the viewport, project rows respond to hover, and the theme toggle animates a circular reveal with the View Transitions API. The effects degrade gracefully when reduced motion is requested or the API is unavailable.",
          },
          {
            type: "list",
            items: [
              "Scroll-triggered reveals with Motion",
              "Animated theme toggle using document.startViewTransition",
              "Hover previews that follow the project list",
              "Reduced-motion fallbacks for the main transitions",
            ],
          },
        ],
      },
      {
        id: "interface",
        label: "Interface",
        title: "Interface details",
        blocks: [
          {
            type: "paragraph",
            text: "The hero combines a dotted world map, soft light rays, and a floating technology cluster around the portrait. Navigation collapses into a command menu for quick jumps between sections, while project entries open into article-style pages with long-form notes and screenshots.",
          },
        ],
      },
      {
        id: "unfinished",
        label: "Unfinished",
        title: "Why it never shipped",
        blocks: [
          {
            type: "paragraph",
            text: "This build never made it to production. I would get halfway, decide it wasn't interactive enough or polished enough, and start rethinking the whole direction instead of finishing the version in front of me.",
          },
          {
            type: "paragraph",
            text: "The hard part wasn't the code. I was using the portfolio to prove too many things at once. The current portfolio finally shipped because I narrowed the scope and accepted that a focused site is better than an unfinished impressive one.",
          },
          {
            type: "quote",
            text: "The project taught me that taste without a finish line just becomes another restart.",
          },
        ],
      },
      {
        id: "lessons",
        label: "Takeaways",
        title: "What carried forward",
        blocks: [
          {
            type: "paragraph",
            text: "The older portfolio was a useful constraint: it proved which interactions were worth keeping and which were noise. The command menu, the dark-first theme, and the project-first structure survived into the current portfolio, while the heavier visual effects were scaled back for clarity and performance.",
          },
          {
            type: "quote",
            text: "The best parts of this build were the parts that made navigation faster, not the parts that made the page move.",
          },
        ],
      },
    ],
    caseStudy: {
      screenshots: [
        {
          src: "/older_portfolio/older-portfolio-hero.jpg",
          alt: "Older portfolio hero with a large headline and navigation",
          caption:
            "Hero with the bolder typography, status badge, and primary calls to action.",
        },
        {
          src: "/older_portfolio/older-portfolio-about-and-work.jpg",
          alt: "Older portfolio about section and project preview",
          caption:
            "About card with the experience timeline, technology stack, and a project preview.",
        },
        {
          src: "/older_portfolio/older-portfolio-testimonials-and-cta.jpg",
          alt: "Older portfolio testimonial and contact call to action",
          caption:
            "Testimonial block and the closing contact panel with the orbit portrait.",
        },
      ],
    },
    links: {
      live: "https://older-portfolio-pi.vercel.app/",
      code: "https://github.com/nadhir-dev/older-portfolio",
    },
    image: "/older_portfolio/older-portfolio-hero.jpg",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    summary:
      "This site: a content-driven Next.js portfolio with a command menu, theme system, and a Resend contact workflow.",
    description:
      "The portfolio you are reading is built as a single-page home with dedicated case-study routes. Content lives in typed data files, sections compose the home page, and the project pages render long-form notes, screenshots, and technology details from the same source. The site is designed dark-first, with a no-flash theme script, a keyboard command menu, and a contact form that sends mail through a server action. It took several attempts to get here: every earlier version hit a point where it felt too static, not interactive enough, or simply not good enough, and I would start over. This is the first version I was proud to ship.",
    year: "2026",
    role: "Design & full-stack development",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Bun",
      "Resend",
    ],
    features: [
      "Content-driven sections powered by typed data files",
      "Dark-first theme with a no-flash initialization script",
      "Keyboard command menu with section and social shortcuts",
      "Animated theme toggle and scroll reveals",
      "Resend-powered contact form with server-side validation",
      "Dynamic Open Graph image, JSON-LD, sitemap, and robots",
      "Static project routes generated from project data",
    ],
    sections: [
      {
        id: "content",
        label: "Content model",
        title: "Content-driven structure",
        blocks: [
          {
            type: "paragraph",
            text: "Profile details, social links, and every project entry live in data files. The home page composes section components around that content, while the project route reads the same project array to generate static params, metadata, and case-study pages. Adding a project means adding one typed object, not touching page markup.",
          },
        ],
      },
      {
        id: "experience",
        label: "Experience",
        title: "Navigation & theme",
        blocks: [
          {
            type: "paragraph",
            text: "The command menu is available with Cmd/Ctrl+K and exposes sections, projects, social links, and theme controls. The theme toggle animates with the View Transitions API when available, and a small inline script applies the stored preference before paint so the page never flashes the wrong theme.",
          },
          {
            type: "list",
            items: [
              "Cmd/Ctrl+K command palette with keyboard navigation",
              "Tab shortcut to toggle the theme outside form fields",
              "Animated theme transition with a fallback path",
              "Skip link and semantic landmarks for accessibility",
            ],
          },
        ],
      },
      {
        id: "journey",
        label: "The journey",
        title: "From restarts to shipped",
        blocks: [
          {
            type: "paragraph",
            text: "I went through more versions of this site than I can count. Each one started with a clear idea and then hit the same wall halfway through: it felt too static, not interactive enough, or simply not good enough. I would rebuild instead of finishing.",
          },
          {
            type: "paragraph",
            text: "This version shipped because I stopped trying to prove everything at once. The difference was narrowing the scope, keeping the interactions that helped people navigate, and accepting the rest as future work.",
          },
          {
            type: "quote",
            text: "The portfolio I'm proud of didn't come from adding more. It came from finally deciding what was enough.",
          },
        ],
      },
      {
        id: "delivery",
        label: "SEO & contact",
        title: "SEO, metadata & contact",
        blocks: [
          {
            type: "paragraph",
            text: "Every route defines canonical metadata, Open Graph and Twitter cards, and JSON-LD for the person, site, and projects. The project routes are statically generated, included in the sitemap, and expose breadcrumb structured data. The contact form validates on the server, escapes user input before building the email, and reports a clear unconfigured state when the Resend key is missing.",
          },
          {
            type: "list",
            items: [
              "Per-project metadata and canonical URLs",
              "Person, WebSite, CreativeWork, and BreadcrumbList JSON-LD",
              "Dynamic Open Graph image and web app manifest",
              "Server action with validation and HTML escaping",
            ],
          },
        ],
      },
    ],
    caseStudy: {
      screenshots: [
        {
          src: "/portfolio/portfolio-hero.webp",
          alt: "This portfolio home page hero",
          caption:
            "Home page hero with the dark-first visual system and primary navigation.",
        },
        {
          src: "/portfolio/portfolio-light-mode.webp",
          alt: "This portfolio home page in light mode",
          caption:
            "The same home page in light mode, driven by semantic theme tokens.",
        },
        {
          src: "/portfolio/portfolio-projects.webp",
          alt: "This portfolio selected work section",
          caption:
            "Selected work list with project summaries and hover previews.",
        },
        {
          src: "/portfolio/portfolio-about.webp",
          alt: "This portfolio about section with a large editorial statement",
          caption:
            "About section with a scroll-reveal statement and quick personal context.",
        },
        {
          src: "/portfolio/portfolio-skills.webp",
          alt: "This portfolio skills marquee with technology icons",
          caption:
            "Skills marquee with accessible, pausable technology badges.",
        },
        {
          src: "/portfolio/portfolio-process.webp",
          alt: "This portfolio process section with rolling text rows",
          caption:
            "Process section: discover, design, develop, and deploy.",
        },
        {
          src: "/portfolio/portfolio-contact.webp",
          alt: "This portfolio contact section with a form and globe",
          caption:
            "Contact section with copyable details, a wireframe globe, and the message form.",
        },
        {
          src: "/portfolio/portfolio-command-menu.webp",
          alt: "This portfolio command menu open over the home page",
          caption:
            "The Cmd/Ctrl+K command menu for sections, projects, and social links.",
        },
        {
          src: "/portfolio/portfolio-mobile.webp",
          alt: "This portfolio mobile layout",
          caption:
            "Mobile layout with the compact navigation island and responsive hero.",
        },
        {
          src: "/portfolio/portfolio-case-study.webp",
          alt: "The Portfolio project case-study page",
          caption:
            "This very case-study page, generated from the same typed project data.",
        },
      ],
    },
    links: {},
    image: "/portfolio/portfolio-hero.webp",
  },
];
