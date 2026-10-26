import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
    quote: string;
    name: string;
    role: string;
    company: string;
    image: string;
};

const testimonials: Testimonial[] = [
    {
        quote:
            "He is committed to meeting deadlines, hardworking, open to feedback, productive, and able to work well under pressure.",
        image: "/ahmed_cheklat.jpg",
        name: "Ahmed Cheklat",
        role: "Frontend Developer",
        company: "Collaborator",
    },
    {
        quote:
            "Contributing significantly to the technical structure of the project, and proving himself a capable and adaptable member of the team.",
        image: "/ridha_boudebza.jpg",
        name: "Boudebza Ridha",
        role: "Frontend Developer",
        company: "Collaborator",
    },
    {
        quote:
            "Nadhir is a reliable collaborator who communicates clearly and follows through. He cares about the details, adapts quickly, and makes the people around him better.",
        image: "/bentabet_elhabib.jpg",
        name: "Habib Bentabet",
        role: "Developer",
        company: "Collaborator",
    },
];

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute top-0 left-0 z-1 size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 stroke-muted-foreground",
                className,
            )}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
    );
}

export function TestimonialsSection() {
    return (
        <div className="mx-auto -mt-10 grid w-full max-w-6xl gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    index={index}
                    key={testimonial.name}
                    testimonial={testimonial}
                />
            ))}
        </div>
    );
}

function TestimonialCard({
    testimonial,
    index,
    className,
    ...props
}: React.ComponentProps<"figure"> & {
    testimonial: Testimonial;
    index: number;
}) {
    const { quote, name, role, company, image } = testimonial;

    return (
        <figure
            className={cn(
                "group relative flex flex-col justify-between gap-6 px-8 pt-8 pb-6 shadow-xs md:translate-y-[calc(3rem*var(--t-card-index))]",
                "dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
                className,
            )}
            style={
                {
                    "--t-card-index": index % 2,
                } as React.CSSProperties
            }
            {...props}
        >
            <div className="absolute -inset-y-4 -left-px w-px bg-border" />
            <div className="absolute -inset-y-4 -right-px w-px bg-border" />
            <div className="absolute -inset-x-4 -top-px h-px bg-border" />
            <div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />
            <DecorIcon />

            <blockquote className="flex gap-4">
                <QuoteIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 stroke-1 text-muted-foreground"
                />

                <p className="flex-1 font-normal text-base text-muted-foreground leading-relaxed">
                    {quote}
                </p>
            </blockquote>

            <figcaption className="flex items-center gap-3">
                <Avatar className="size-10 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background transition-shadow group-hover:ring-foreground/20">
                    <AvatarImage alt={`${name}'s profile picture`} src={image} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <cite className="font-medium text-foreground text-sm not-italic">
                        {name}
                    </cite>
                    <p className="text-muted-foreground text-xs">
                        {role}, <span className="text-foreground/80">{company}</span>
                    </p>
                </div>
            </figcaption>
        </figure>
    );
}

export default TestimonialsSection;
