export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  features: string[];
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
      "Healthcare booking platform with real-time availability, doctor profiles, and appointment management.",
    description:
      "Mediora is a full-stack healthcare booking platform built to make finding a doctor and booking an appointment feel simple. The backend handles authentication, doctor schedules, appointment availability, feedback, email notifications, and real-time messaging. The frontend focuses on a clear booking flow, useful doctor profiles, and a responsive experience across devices.",
    year: "2026",
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
      "Doctor and patient authentication",
      "Appointment booking and schedule management",
      "Real-time messaging between patients and doctors",
      "Feedback and review flow",
      "Email notifications and containerized deployment",
    ],
    links: {
      code: "https://github.com/nadhir-dev/mediora-back",
    },
    image: "/projects_images/mediora_landing_page.jpg",
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    summary:
      "Online bookstore with an admin dashboard for inventory, orders, and sales.",
    description:
      "A full-stack bookstore and library management system covering both the customer-facing storefront and the admin side. Visitors can browse the catalog, while admins can manage inventory, orders, and sales from a dedicated dashboard. The project focuses on a clean frontend, a practical data model, and a workflow that stays simple as the catalog grows.",
    year: "2026",
    role: "Full-stack development",
    stack: [
      "React",
      "TypeScript",
      "Bun",
      "Elysia",
      "MongoDB",
      "Tailwind CSS",
    ],
    features: [
      "Book catalog and browsing experience",
      "Admin dashboard with inventory controls",
      "Order and sales management",
      "Responsive storefront and dashboard",
      "API-driven frontend and backend",
    ],
    links: {
      code: "https://github.com/nadhir-dev/library-system",
    },
    image: "/projects_images/library_dashboard.webp",
  },
  {
    slug: "management-system-landing-page",
    title: "Management System Landing Page",
    summary:
      "A focused landing page for a management system, designed around clarity and conversion.",
    description:
      "A responsive landing page built to present a management system clearly and guide visitors toward action. The page uses a dark visual direction, structured product messaging, and a clean section flow to explain the product without overwhelming the visitor. It was built with a mobile-first layout and careful attention to spacing, typography, and responsive behavior.",
    year: "2026",
    role: "Frontend development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Responsive, mobile-first layout",
      "Dark product-focused visual direction",
      "Structured feature and benefit sections",
      "Conversion-focused calls to action",
    ],
    links: {
      live: "https://management-system-landing-page.vercel.app/",
    },
    image: "/projects_images/dark_landing_page.jpg",
  },
  {
    slug: "older-portfolio",
    title: "Older Portfolio",
    summary:
      "An earlier portfolio experiment focused on motion, layout, and interaction.",
    description:
      "A previous portfolio build used to explore a bolder visual identity, motion, and interactive layouts. It experiments with large typography, smooth transitions, and a compact presentation of projects and skills, while keeping the experience responsive and easy to navigate.",
    year: "2026",
    role: "Design & frontend development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    features: [
      "Bold typography-led visual identity",
      "Motion and interaction experiments",
      "Compact project and skills presentation",
      "Responsive layout",
    ],
    links: {
      live: "https://older-portfolio-pi.vercel.app/",
    },
    image: "/projects_images/old_portfolio_hero.jpg",
  },
];
