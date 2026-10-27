import { cn } from "@/lib/utils";
import Image from "next/image";

interface ListItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
  color: "blue";
}

interface RollingTextItemProps {
  item: ListItem;
}

const colorClassMap: Record<ListItem["color"], string> = {
//   red: "text-red-500",
  blue: "text-blue-500 dark:text-blue-400",
//   green: "text-green-500",
//   yellow: "text-yellow-500",
};

function RollingTextItem({ item }: RollingTextItemProps) {
  return (
    <div className="group relative w-full cursor-pointer border-b border-neutral-200 dark:border-neutral-800 py-6">
      {/* Rolling text */}
      <div className="relative overflow-hidden h-[60px] md:h-20">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
          {/* State 1: Normal */}
          <div className="h-[60px] md:h-20 flex items-center">
            <h2 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
              {item.title}
            </h2>
          </div>

          {/* State 2: Hover (Italic + Color) */}
          <div className="h-[60px] md:h-20 flex items-center">
            <h2
              className={cn(
                "text-5xl md:text-7xl font-black uppercase tracking-tighter italic",
                colorClassMap[item.color]
              )}
            >
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Category Label */}
      <span className="absolute top-8 right-0 text-xs font-bold uppercase tracking-widest text-neutral-400 transition-opacity duration-300 group-hover:opacity-0 hidden md:block dark:text-neutral-500">
        {item.category}
      </span>

      {/* Image Reveal Effect */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-1/2 z-20 h-32 w-48 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl",
          "transition-all duration-500 ease-out",
          "opacity-0 scale-95 rotate-3 translate-x-4",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-x-0"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="12rem"
            className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-blue-600/15 mix-blend-overlay dark:bg-blue-500/20" />
        </div>
      </div>
    </div>
  );
}

function RollingTextList() {
  const items: ListItem[] = [
    {
      id: 1,
      title: "Discover",
      category: "Research",
      src: "/process_images/research.webp",
      alt: "Research and discovery",
      color: "blue",
    },
    {
      id: 2,
      title: "Design",
      category: "Experience",
      src: "/process_images/design.webp",
      alt: "Design exploration",
      color: "blue",
    },
    {
      id: 3,
      title: "Develop",
      category: "Engineering",
      src: "/process_images/engieering.webp",
      alt: "Engineering and development",
      color: "blue",
    },
    {
      id: 4,
      title: "Deploy",
      category: "Launch",
      src: "/process_images/deployment.webp",
      alt: "Deployment and launch",
      color: "blue",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-3xl px-6 py-12 transition-colors dark:bg-neutral-950 dark:text-neutral-100">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-brand">
        Process
      </h2>
      <div className="w-full flex flex-col">
        {items.map((item) => (
          <RollingTextItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export { RollingTextList };
