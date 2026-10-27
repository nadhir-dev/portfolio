import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion";
import {
    SupportContactCard,
    type SupportAvatar,
} from "./support-contact-card";

type FAQItem = {
    value: string;
    question: string;
    answer: string;
};

const faqItems: ReadonlyArray<FAQItem> = [
    {
        value: "account",
        question: "What services do you offer?",
        answer:
            "I build full-stack products and frontends across web, desktop, and mobile — websites, platforms, dashboards, and custom software. I also work on ML and AI engineering, from model experiments to production APIs.",
    },
    {
        value: "collaboration",
        question: "How do you usually work?",
        answer:
            "I start with a short discovery call, then break the work into clear milestones. You get regular updates and a working build at every stage.",
    },
    {
        value: "offline",
        question: "How long does a project take?",
        answer:
            "It depends on scope. A landing page can take a few days; a full-stack product usually takes a few weeks. I'll give you a realistic timeline before we start.",
    },
    {
        value: "security",
        question: "What tech stack do you use?",
        answer:
            "Mostly Next.js, ElysiaJS, Bun, Drizzle ORM, TypeScript, Python, and PostgreSQL, with Docker when needed. I choose the smallest stack that fits the product and stays easy to maintain.",
    },
    {
        value: "storage",
        question: "Do you work with clients remotely?",
        answer:
            "Yes. I'm a student at ESI SBA and a freelancer based in Algeria, open to remote work worldwide. I usually reply within minutes to hours.",
    },
    {
        value: "platforms",
        question: "Do you build desktop and mobile apps?",
        answer:
            "Yes. I work across web, desktop, and mobile frontends, plus the backend, database, and deployment behind them.",
    },
    {
        value: "learning",
        question: "What are you currently learning?",
        answer:
            "Math, computer science, algorithms, and ML/AI engineering. I also create content about what I learn and share it online.",
    },
    {
        value: "billing",
        question: "How do we get started?",
        answer:
            "Send me a short message about your project, timeline, and budget. If it's a good fit, we'll schedule a call and define the first milestone.",
    },
];

// Support team avatars; `className` z-indexes control their overlap order in AvatarGroup.
const supportAvatars: ReadonlyArray<SupportAvatar> = [
    {
        src: "/my-avatar.jpg",
        alt: "Nadhir Bendraou",
        fallback: "NB",
        className: "z-1",
    },
    {
        src: "/ahmed_cheklat.jpg",
        alt: "Ahmed Cheklat",
        fallback: "AC",
        className: "z-2",
    },
    {
        src: "/ridha_boudebza.jpg",
        alt: "Boudebza Ridha",
        fallback: "BR",
        className: "z-3",
    },
];

export function FAQ() {
    return (
        <section className="relative flex w-full justify-center bg-white pt-16 pb-32 text-foreground md:pb-40 transition-colors dark:bg-neutral-950">
            <div className="flex w-full max-w-6xl flex-col items-center gap-10">
                <div className="flex flex-col gap-2 text-center">
                    <p className="text-pretty text-sm leading-relaxed text-brand">
                        FAQ
                    </p>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl xl:text-4xl dark:text-neutral-300">
                        Questions, <span className="text-brand">answered.</span>
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        A few things clients usually ask before we start working together.
                    </p>
                </div>

                <Accordion className="w-full max-w-4xl">
                    {faqItems.map((item) => (
                        <AccordionItem
                            key={item.value}
                            value={item.value}
                            className="border-neutral-200/70 dark:border-neutral-800/70"
                        >
                            <AccordionTrigger className="text-neutral-700 md:text-base dark:text-neutral-400">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-neutral-500 md:text-base leading-relaxed dark:text-neutral-400">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <SupportContactCard supportAvatars={supportAvatars} />
            </div>
        </section>
    );
}

export default FAQ;
