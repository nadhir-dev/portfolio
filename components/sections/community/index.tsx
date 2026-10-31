"use client";

import Image from 'next/image';
import { BrainCircuit, CloudCog, Code2, Laptop, MessageSquareText } from 'lucide-react';
import CommunityOrbit, { type OrbitItem, type OrbitStat, type OrbitTag } from './orbit';

function ThreadAvatar() {
    return (
        <span className="relative flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded-full bg-[#dfe6f5]">
            <Image
                src="/my-avatar.jpg"
                alt="Nadhir Bendraou"
                fill
                sizes="22px"
                draggable={false}
                className="translate-y-[8%] scale-[1.1] object-cover object-top"
            />
        </span>
    );
}

const items: OrbitItem[] = [
    // Anneau extérieur, de gauche à droite.
    { kind: 'status', ring: 'outer', angle: 132, label: 'Open to remote work' },
    { kind: 'card', ring: 'outer', angle: 112.6, emoji: '🚀', badge: '10+' },
    { kind: 'pill', ring: 'outer', angle: 90, icon: <ThreadAvatar />, label: 'Full-stack + AI' },
    { kind: 'pill', ring: 'outer', angle: 67.6, icon: '⭐', label: '25+ Technologies' },
    { kind: 'avatar', ring: 'outer', angle: 50.9, src: "/ahmed_cheklat.jpg", alt: "Ahmed Cheklat", color: '#c4bceb' },
    { kind: 'pill', ring: 'outer', angle: 35.2, icon: <MessageSquareText size={13} strokeWidth={2} />, label: '5+ Collaborators' },
    // Anneau intérieur, de gauche à droite.
    { kind: 'avatar', ring: 'inner', angle: 137.2, src: "/ridha_boudebza.jpg", alt: "Boudebza Ridha", color: '#ffdcb6' },
    { kind: 'pill', ring: 'inner', angle: 116.6, icon: '🔥', label: '10+ Projects' },
    { kind: 'avatar', ring: 'inner', angle: 90, src: "/my-avatar.jpg", alt: "Nadhir Bendraou", color: '#c0cef3', size: 48 },
    { kind: 'card', ring: 'inner', angle: 63.3, emoji: '📦' },
    { kind: 'check', ring: 'inner', angle: 41.8 },
];

const stats: OrbitStat[] = [
    { value: '10+', label: 'Projects' },
    { value: '25+', label: 'Technologies' },
    { value: '5+', label: 'Collaborators' },
];

const tags: OrbitTag[] = [
    { icon: <Code2 strokeWidth={2} />, label: 'Full-stack', href: '#projects' },
    { icon: <BrainCircuit strokeWidth={2} />, label: 'AI/ML', href: '#skills' },
    { icon: <CloudCog strokeWidth={2} />, label: 'DevOps', href: '#skills' },
    { icon: <Laptop strokeWidth={2} />, label: 'Remote', href: '#contact' },
];

export default function Community() {
    return (
        <div id="community" className="w-full">
            <CommunityOrbit
                items={items}
                stats={stats}
                headline={
                    <>
                        From first commit
                        <br className="hidden sm:block" /> to production.
                    </>
                }
                tags={tags}
            />
        </div>
    );
}
