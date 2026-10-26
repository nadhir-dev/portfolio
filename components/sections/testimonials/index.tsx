import TestimonialsSection from "./testimonials";

export default function Testimonials() {
    return (
        <section id="testimonials" className="flex w-full items-center justify-center bg-background px-6 py-20 text-foreground md:py-24">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mx-auto mb-20 max-w-xl text-center">
                    <p className="font-medium text-brand text-sm uppercase tracking-widest">
                        Testimonials
                    </p>
                    <h2 className="mt-3 text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
                        Kind words from <span className="text-brand">collaborators</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        A few things past teammates and clients have said about working together.
                    </p>
                </div>
                <TestimonialsSection />
            </div>
        </section>
    );
}
