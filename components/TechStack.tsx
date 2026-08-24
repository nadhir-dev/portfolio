import icons from "@/data/tech-icons";

export default function LogoMarquee() {
  return (
    <div
      id="skills"
      className="overflow-hidden w-full relative max-w-6xl mx-auto select-none "
    >
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      <div className="marquee-inner">
        <div className="flex h-40">
          {[...icons, ...icons].map(({ component: Logo, name }, i) => (
            <Logo
              key={`${name}-${i}`}
              className="h-10 w-10 mx-6 shrink-0"
              draggable="false"
              aria-label={`${name} icon`}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
// export default function TechStack() {
//   return (
//     <section className="flex flex-col items-center justify-center px-4 md:px-0">
//       <h2 className="text-4xl/12 font-bold text-gray-800 max-w-md text-center">
//         Trusted by world’s leading companies
//       </h2>
//       <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mt-14">
//         {icons.map(({ name, component: Logo }) => (
//           <div
//             key={name}
//             className="grid place-content-center aspect-square size-15 bg-gray-50 border border-gray-200 rounded-md"
//           >
//             <Logo className="w-10 h-10" />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
