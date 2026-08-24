"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      date: "Aug 17, 2026",
      text: "“He is committed to meeting deadlines, hardworking, open to feedback, productive, and able to work well under pressure.”",
      name: "Ahmed Cheklat",
      role: "Frontend Developer.",
      img: "/ahmed_cheklat.jpg",
    },
    {
      id: 2,
      date: "Aug 17, 2026",
      text: "“Contributing significantly to the technical structure of the project, and proving himself a capable and adaptable member of the team.”",
      name: "Boudebza Ridha",
      role: "Frontend Developer.",
      img: "/ridha_boudebza.jpg",
    },

    // {
    //   id: 3,
    //   date: "Jun 10, 2026",
    //   text: "“PrebuiltUI makes frontend development faster, simpler and far more enjoyable for website projects.”",
    //   name: "Jack",
    //   role: "Facebook, Inc.",
    //   img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    // },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto ">
          <h1
            className="text-neutral-900 font-medium text-4xl md:text-[40px] text-center md:text-left"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Kind words from collaborators
          </h1>
          <p className="text-neutral-800 text-sm/6 mt-4 max-w-96 text-center md:text-left mx-auto md:mx-0 ">
            A few things past teammates and clients have said about working
            together.
          </p>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 md:mt-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-50 hover:-translate-y-1 transition duration-300 border border-zinc-200 rounded-2xl p-6 space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star text-transparent fill-[#FF8F20]"
                          aria-hidden="true"
                        >
                          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                        </svg>
                      ))}
                  </div>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>

                <p className="text-sm/6 text-neutral-600">{item.text}</p>

                <div className="flex items-center gap-4 mt-4">
                  <Image
                    src={item.img}
                    alt={`${item.name} avatar`}
                    width={200}
                    height={200}
                    sizes="200px"
                    className="w-13 h-13 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-neutral-700">{item.name}</p>
                    <p className="text-xs font-medium text-neutral-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
