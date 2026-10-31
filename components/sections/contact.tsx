"use client";

import * as React from "react";
import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Copy, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type {
    Topology,
    GeometryCollection,
    GeometryObject,
} from "topojson-specification";
import type { GeoPermissibleObjects } from "d3";
import { site } from "@/data/site";
import { initialContactState, type ContactState } from "@/lib/contact";
import { sendContactEmail } from "@/app/actions/contact";

const CONTACT_LINKS = [
    {
        icon: Phone,
        label: site.phone,
        value: site.phone,
    },
    {
        icon: Mail,
        label: site.email,
        value: site.email,
    },
    {
        icon: MapPin,
        label: site.address,
        value: site.address,
    },
    {
        icon: Linkedin,
        label: "Connect on LinkedIn",
        value:
            site.socials.find((social) => social.name === "LinkedIn")?.href ??
            "#",
    },
];

function CopyableContactLink({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    const [copied, setCopied] = useState(false);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimer.current) clearTimeout(resetTimer.current);
        };
    }, []);

    const handleCopy = async () => {
        const success = await copyToClipboard(value);
        if (!success) return;

        setCopied(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
            title={`Copy ${label}`}
            className="group flex items-center gap-3 w-fit text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
        >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 group-hover:border-brand/40 dark:group-hover:border-brand/40 group-hover:bg-brand/10 dark:group-hover:bg-brand/10 flex items-center justify-center shrink-0 transition-all duration-200">
                <Icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-brand dark:group-hover:text-brand transition-colors duration-200" />
            </div>
            <span>{label}</span>
            <span className="text-muted-foreground transition-colors group-hover:text-brand">
                {copied ? (
                    <Check className="w-3.5 h-3.5 text-brand" />
                ) : (
                    <Copy className="w-3.5 h-3.5" />
                )}
            </span>
            <span className="sr-only" aria-live="polite">
                {copied ? `${label} copied` : ""}
            </span>
        </button>
    );
}

interface GlobeWireframeProps {
    width?: number;
    height?: number;
    className?: string;
    strokeColor?: string;
    strokeWidth?: number;
    graticuleColor?: string;
    graticuleOpacity?: number;
    sphereOutlineColor?: string;
    sphereOutlineWidth?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    rotateToLocation?: string | [number, number];
    rotateCities?: string[];
    rotationSpeed?: number;
    initialRotation?: [number, number];
    enableInteraction?: boolean;
    showGraticule?: boolean;
    animationDuration?: number;
    startAsGlobe?: boolean;
    countryFillColor?: string;
    countryHoverColor?: string;
    variant?: "wireframe" | "wireframesolid" | "solid";
    scale?: number;
    backgroundColor?: string;
}

interface GeoFeature {
    type: string;
    geometry: GeometryObject;
    properties: Record<string, unknown>;
}

interface WorldAtlasTopology extends Topology {
    objects: {
        countries: GeometryCollection;
    };
}

interface CustomProjection extends d3.GeoProjection {
    alpha(value: number): CustomProjection;
    alpha(): number;
}

const cityCoordinates: Record<string, [number, number]> = {
    "san francisco": [37.7749, -122.4194],
    "new york": [40.7128, -74.006],
    london: [51.5074, -0.1278],
    tokyo: [35.6762, 139.6503],
    paris: [48.8566, 2.3522],
    moscow: [55.7558, 37.6176],
    dubai: [25.2048, 55.2708],
    singapore: [1.3521, 103.8198],
    sydney: [-33.8688, 151.2093],
    mumbai: [19.076, 72.8777],
    "los angeles": [34.0522, -118.2437],
    chicago: [41.8781, -87.6298],
};

function orthographicRaw(x: number, y: number): [number, number] {
    const cosy = Math.cos(y);
    return [cosy * Math.sin(x), Math.sin(y)];
}

function equirectangularRaw(lambda: number, phi: number): [number, number] {
    return [lambda, phi];
}

function interpolateProjection(
    raw0: (lambda: number, phi: number) => [number, number],
    raw1: (lambda: number, phi: number) => [number, number],
): CustomProjection {
    let t = 0;

    const createRawProjection = (
        alpha: number,
    ): ((lambda: number, phi: number) => [number, number]) => {
        return (lambda: number, phi: number): [number, number] => {
            const [x0, y0] = raw0(lambda, phi);
            const [x1, y1] = raw1(lambda, phi);
            return [x0 + alpha * (x1 - x0), y0 + alpha * (y1 - y0)];
        };
    };

    const projection = d3.geoProjection(
        createRawProjection(t),
    ) as unknown as CustomProjection;

    const alphaMethod = ((value?: number): CustomProjection | number => {
        if (value !== undefined) {
            t = +value;
            const newProjection = d3.geoProjection(
                createRawProjection(t),
            ) as unknown as CustomProjection;

            if (projection.scale()) newProjection.scale(projection.scale());
            if (projection.translate())
                newProjection.translate(projection.translate());
            if (projection.rotate()) newProjection.rotate(projection.rotate());
            if (projection.precision())
                newProjection.precision(projection.precision());

            newProjection.alpha = alphaMethod as CustomProjection["alpha"];

            return newProjection;
        }
        return t;
    }) as CustomProjection["alpha"];

    projection.alpha = alphaMethod;

    return projection;
}

function GlobeWireframe({
    width,
    height,
    className = "aspect-square w-full max-w-150",
    strokeColor = "currentColor",
    strokeWidth = 1.0,
    graticuleColor = "currentColor",
    graticuleOpacity = 0.2,
    sphereOutlineColor = "currentColor",
    sphereOutlineWidth = 1,
    autoRotate = true,
    autoRotateSpeed = 0.5,
    rotateToLocation,
    rotateCities = [],
    rotationSpeed = 3000,
    initialRotation = [0, 0],
    enableInteraction = true,
    showGraticule = true,
    startAsGlobe = true,
    countryFillColor,
    countryHoverColor,
    variant = "wireframe",
    scale = 1,
    backgroundColor,
}: GlobeWireframeProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress] = useState(startAsGlobe ? 0 : 100);
    const [worldData, setWorldData] = useState<GeoFeature[]>([]);
    const [rotation, setRotation] = useState<[number, number]>(initialRotation);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouse, setLastMouse] = useState([0, 0]);
    const [isVisible, setIsVisible] = useState(false);
    const rotationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const rotationAnimFrame = useRef<number | null>(null);
    const rotationStartTime = useRef<number | null>(null);
    const rotationFrom = useRef<[number, number]>([0, 0]);
    const rotationTo = useRef<[number, number]>([0, 0]);
    const animationFrame = useRef<number | null>(null);
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const resizeObserver = useRef<ResizeObserver | null>(null);
    const rotationRef = useRef(rotation);

    useEffect(() => {
        rotationRef.current = rotation;
    }, [rotation]);

    const useResponsive = !width && !height;
    const finalWidth = useResponsive ? dimensions.width : width || 800;
    const finalHeight = useResponsive ? dimensions.height : height || 500;

    const defaultStrokeColor = strokeColor || "currentColor";
    const defaultGraticuleColor = graticuleColor || "currentColor";
    const defaultSphereOutlineColor = sphereOutlineColor || "currentColor";
    const defaultCountryFillColor =
        countryFillColor || (variant === "solid" ? "currentColor" : "none");
    const defaultBackgroundColor = backgroundColor || "transparent";

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const updateDimensions = () => {
            if (container && useResponsive) {
                const width = container.offsetWidth || 300;
                setDimensions({ width, height: width });
            }
        };

        updateDimensions();

        if (useResponsive) {
            resizeObserver.current = new ResizeObserver(updateDimensions);
            resizeObserver.current.observe(container);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 },
        );

        observer.observe(container);

        return () => {
            if (resizeObserver.current) {
                resizeObserver.current.disconnect();
            }
            observer.unobserve(container);
        };
    }, [useResponsive]);

    useEffect(() => {
        const loadWorldData = async () => {
            try {
                const response = await fetch(
                    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
                );
                const world = (await response.json()) as WorldAtlasTopology;
                const countries = feature(world, world.objects.countries)
                    .features as GeoFeature[];
                setWorldData(countries);
            } catch (error) {
                console.error("Error loading world data:", error);
                const fallbackData: GeoFeature[] = [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-180, -90],
                                    [180, -90],
                                    [180, 90],
                                    [-180, 90],
                                    [-180, -90],
                                ],
                            ],
                        } as unknown as GeometryObject,
                        properties: {},
                    },
                ];
                setWorldData(fallbackData);
            }
        };
        loadWorldData();
    }, []);

    useEffect(() => {
        if (!autoRotate || !isVisible || isDragging || rotateCities.length > 0) {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
                animationFrame.current = null;
            }
            return;
        }

        const rotate = () => {
            setRotation((prev) => [(prev[0] + autoRotateSpeed) % 360, prev[1]]);
            animationFrame.current = requestAnimationFrame(rotate);
        };

        animationFrame.current = requestAnimationFrame(rotate);

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [autoRotate, autoRotateSpeed, isVisible, isDragging, rotateCities.length]);

    const animateRotationTo = useCallback(
        (target: [number, number], duration = 1200) => {
            if (rotationAnimFrame.current) {
                cancelAnimationFrame(rotationAnimFrame.current);
            }

            rotationFrom.current = rotationRef.current;
            rotationTo.current = target;
            rotationStartTime.current = performance.now();

            const animate = (time: number) => {
                const elapsed = time - (rotationStartTime.current || 0);
                const t = Math.min(elapsed / duration, 1);

                const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

                const lon =
                    rotationFrom.current[0] +
                    (rotationTo.current[0] - rotationFrom.current[0]) * eased;

                const lat =
                    rotationFrom.current[1] +
                    (rotationTo.current[1] - rotationFrom.current[1]) * eased;

                setRotation([lon, lat]);

                if (t < 1) {
                    rotationAnimFrame.current = requestAnimationFrame(animate);
                }
            };

            rotationAnimFrame.current = requestAnimationFrame(animate);
        },
        [],
    );

    useEffect(() => {
        if (rotateCities.length === 0 || !isVisible) return;

        const rotateToNextCity = () => {
            const nextIndex = (currentCityIndex + 1) % rotateCities.length;
            const city = rotateCities[nextIndex].toLowerCase();
            const coordinates = cityCoordinates[city];

            if (coordinates) {
                animateRotationTo(
                    [-coordinates[1], -coordinates[0]],
                    rotationSpeed * 0.6,
                );
                setCurrentCityIndex(nextIndex);
            }
        };

        const city = rotateCities[currentCityIndex].toLowerCase();
        const coordinates = cityCoordinates[city];

        if (coordinates) {
            animateRotationTo(
                [-coordinates[1], -coordinates[0]],
                rotationSpeed * 0.6,
            );
        }

        rotationInterval.current = setInterval(rotateToNextCity, rotationSpeed);

        return () => {
            if (rotationInterval.current) clearInterval(rotationInterval.current);
        };
    }, [
        rotateCities,
        currentCityIndex,
        rotationSpeed,
        isVisible,
        animateRotationTo,
    ]);

    useEffect(() => {
        if (!rotateToLocation) return;

        let coordinates: [number, number];
        if (typeof rotateToLocation === "string") {
            const city = rotateToLocation.toLowerCase();
            coordinates = cityCoordinates[city] || [0, 0];
        } else {
            coordinates = rotateToLocation;
        }

        setRotation([-coordinates[1], -coordinates[0]]);
    }, [rotateToLocation]);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!enableInteraction) return;
        setIsDragging(true);
        const rect = svgRef.current?.getBoundingClientRect();
        if (rect) {
            setLastMouse([event.clientX - rect.left, event.clientY - rect.top]);
        }
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDragging || !enableInteraction) return;
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const currentMouse = [event.clientX - rect.left, event.clientY - rect.top];
        const dx = currentMouse[0] - lastMouse[0];
        const dy = currentMouse[1] - lastMouse[1];

        const t = progress / 100;
        let sensitivity: number;

        if (variant === "wireframe") {
            sensitivity = t < 0.5 ? 0.5 : 0.25;
        } else {
            sensitivity = 0.5;
        }

        setRotation((prev) => [
            prev[0] + dx * sensitivity,
            Math.max(-90, Math.min(90, prev[1] - dy * sensitivity)),
        ]);

        setLastMouse(currentMouse);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (!svgRef.current || worldData.length === 0 || !isVisible) return;
        if (useResponsive && dimensions.width === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        let finalCountryFill = "none";
        let finalStrokeWidth = strokeWidth;
        let finalOpacity = 1.0;
        let renderGraticule = showGraticule;
        let finalGraticuleOpacity = graticuleOpacity;
        let finalSphereOutlineWidth = sphereOutlineWidth;

        if (variant === "wireframe") {
            finalCountryFill = "none";
            finalStrokeWidth = strokeWidth;
            finalOpacity = 1.0;
            renderGraticule = showGraticule;
            finalGraticuleOpacity = graticuleOpacity;
            finalSphereOutlineWidth = sphereOutlineWidth;
        } else if (variant === "wireframesolid") {
            finalCountryFill = "none";
            finalStrokeWidth = strokeWidth;
            finalOpacity = 1.0;
            renderGraticule = false;
            finalGraticuleOpacity = 0;
            finalSphereOutlineWidth = 1.5;
        } else if (variant === "solid") {
            finalCountryFill = defaultCountryFillColor;
            finalStrokeWidth = strokeWidth * 0.5;
            finalOpacity = 0.3;
            renderGraticule = false;
            finalGraticuleOpacity = 0;
            finalSphereOutlineWidth = 1.5;
        }

        if (defaultBackgroundColor !== "transparent") {
            const radius = (Math.min(finalWidth, finalHeight) / 2) * scale * 0.9;
            svg
                .append("circle")
                .attr("cx", finalWidth / 2)
                .attr("cy", finalHeight / 2)
                .attr("r", radius)
                .attr("fill", defaultBackgroundColor);
        }

        let projection: d3.GeoProjection | CustomProjection;
        const path = d3.geoPath();

        if (variant === "wireframe") {
            const t = progress / 100;
            const alpha = Math.pow(t, 0.5);

            const baseScale = Math.min(finalWidth, finalHeight) / 2;
            const scaleRange = d3
                .scaleLinear()
                .domain([0, 1])
                .range([baseScale * 0.9 * scale, baseScale * 0.54 * scale]);
            const baseRotate = d3.scaleLinear().domain([0, 1]).range([0, 0]);

            projection = interpolateProjection(orthographicRaw, equirectangularRaw)
                .scale(scaleRange(alpha))
                .translate([finalWidth / 2, finalHeight / 2])
                .rotate([baseRotate(alpha) + rotation[0], rotation[1]])
                .precision(0.1);

            (projection as CustomProjection).alpha(alpha);
            path.projection(projection);
        } else {
            projection = d3
                .geoOrthographic()
                .scale((Math.min(finalWidth, finalHeight) / 2) * scale * 0.9)
                .translate([finalWidth / 2, finalHeight / 2])
                .rotate([rotation[0], rotation[1]])
                .precision(0.1);

            path.projection(projection);
        }

        if (renderGraticule && finalGraticuleOpacity > 0) {
            try {
                const graticule = d3.geoGraticule();
                const graticulePath = path(graticule());
                if (graticulePath) {
                    svg
                        .append("path")
                        .datum(graticule())
                        .attr("d", graticulePath)
                        .attr("fill", "none")
                        .attr("stroke", defaultGraticuleColor)
                        .attr("stroke-width", 1)
                        .attr("opacity", finalGraticuleOpacity);
                }
            } catch (error) {
                console.error("Error creating graticule:", error);
            }
        }

        svg
            .selectAll(".country")
            .data(worldData)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", (d: GeoFeature) => {
                try {
                    const pathString = path(d as unknown as GeoPermissibleObjects);
                    if (!pathString) return "";
                    if (
                        typeof pathString === "string" &&
                        (pathString.includes("NaN") || pathString.includes("Infinity"))
                    ) {
                        return "";
                    }
                    return pathString;
                } catch {
                    return "";
                }
            })
            .attr("fill", finalCountryFill)
            .attr("stroke", defaultStrokeColor)
            .attr("stroke-width", finalStrokeWidth)
            .attr("opacity", finalOpacity)
            .style("visibility", function (this: SVGPathElement) {
                const pathData = d3.select(this).attr("d");
                return pathData && pathData.length > 0 && !pathData.includes("NaN")
                    ? "visible"
                    : "hidden";
            })
            .on("mouseenter", function (this: SVGPathElement) {
                if (countryHoverColor && variant === "solid") {
                    d3.select(this).attr("fill", countryHoverColor);
                }
            })
            .on("mouseleave", function (this: SVGPathElement) {
                if (variant === "solid") {
                    d3.select(this).attr("fill", finalCountryFill);
                }
            });

        try {
            const sphereOutline = path({ type: "Sphere" });
            if (sphereOutline) {
                svg
                    .append("path")
                    .datum({ type: "Sphere" })
                    .attr("d", sphereOutline)
                    .attr("fill", "none")
                    .attr("stroke", defaultSphereOutlineColor)
                    .attr("stroke-width", finalSphereOutlineWidth)
                    .attr("opacity", variant === "wireframe" ? 1.0 : 0.8);
            }
        } catch (error) {
            console.error("Error creating sphere outline:", error);
        }
    }, [
        worldData,
        progress,
        rotation,
        isVisible,
        finalWidth,
        finalHeight,
        defaultStrokeColor,
        strokeWidth,
        defaultGraticuleColor,
        graticuleOpacity,
        defaultSphereOutlineColor,
        sphereOutlineWidth,
        showGraticule,
        defaultCountryFillColor,
        countryHoverColor,
        variant,
        scale,
        defaultBackgroundColor,
        useResponsive,
        dimensions.width,
    ]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <svg
                ref={svgRef}
                width={finalWidth}
                height={finalHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={
                    useResponsive
                        ? "w-full h-full opacity-0 transition-opacity duration-1000"
                        : ""
                }
                style={{
                    cursor: enableInteraction
                        ? isDragging
                            ? "grabbing"
                            : "grab"
                        : "default",
                    opacity: useResponsive ? (dimensions.width > 0 ? 1 : 0) : 1,
                }}
            />
        </div>
    );
}

const FormDots = React.forwardRef<
    React.ComponentRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref,
    ) => {
        const isHorizontal = orientation === "horizontal";
        return (
            <SeparatorPrimitive.Root
                ref={ref}
                decorative={decorative}
                orientation={orientation}
                className={cn(
                    "shrink-0 flex items-center justify-center overflow-hidden",
                    isHorizontal ? "w-full" : "h-full",
                    className,
                )}
                {...props}
            >
                <div
                    className={cn("relative", isHorizontal ? "w-full h-4" : "h-full w-4")}
                >
                    <div
                        className={cn(
                            "absolute inset-0 bg-repeat",
                            "text-neutral-400 dark:text-white/20",
                        )}
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
                            backgroundSize: isHorizontal ? "6px 100%" : "100% 6px",
                            maskImage: isHorizontal
                                ? "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
                                : "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                        }}
                    />
                </div>
            </SeparatorPrimitive.Root>
        );
    },
);
FormDots.displayName = "FormDots";

interface ContactProps {
    title?: string;
    subtitle?: string;
    description?: string;
    className?: string;
}

export default function Contact({
    title = "Let's work together",
    subtitle = "Contact",
    description = "Have a project, question, or just want to say hi? Send me a message and I'll get back to you.",
    className,
}: ContactProps) {
    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        message: "",
    });
    const { toast } = useToast();
    const submitContactWithReset = useCallback(
        async (previousState: ContactState, formData: FormData) => {
            try {
                const nextState = await sendContactEmail(previousState, formData);

                if (nextState.success) {
                    setForm({ name: "", company: "", email: "", message: "" });
                    toast({
                        title: "Message sent",
                        description:
                            "Thanks for reaching out — I'll contact you ASAP.",
                        variant: "success",
                    });
                } else if (!nextState.errors) {
                    toast({
                        title: "Message not sent",
                        description: nextState.message,
                        variant: "error",
                    });
                }

                return nextState;
            } catch {
                const message = "Something went wrong. Please try again.";

                toast({
                    title: "Message not sent",
                    description: message,
                    variant: "error",
                });

                return { success: false, message };
            }
        },
        [toast],
    );
    const [contactState, submitContact, isSubmitting] = useActionState(
        submitContactWithReset,
        initialContactState,
    );

    useEffect(() => {
        const onAskQuestion = (event: Event) => {
            const message = (
                event as CustomEvent<{ message?: string }>
            ).detail?.message;

            if (message) {
                setForm((current) => ({ ...current, message }));
            }

        };

        window.addEventListener("ask-question", onAskQuestion);
        return () => window.removeEventListener("ask-question", onAskQuestion);
    }, []);

    return (
        <section
            id="contact"
            className={cn(
                "relative w-full bg-zinc-50 dark:bg-zinc-950 overflow-hidden mt-20 pb-28 md:pb-32",
                className,
            )}
        >
            <div className="relative mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center text-center gap-4 mb-12">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand/10 border border-brand/30">
                        <span className="text-sm text-brand font-medium">
                            {subtitle}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white">
                        {title.split(" ").map((word, index, words) => (
                            <span
                                key={`${word}-${index}`}
                                className={
                                    index === words.length - 1
                                        ? "text-brand"
                                        : undefined
                                }
                            >
                                {word}
                                {index < words.length - 1 ? " " : ""}
                            </span>
                        ))}
                    </h2>

                    <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-md">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
                    <div className="flex flex-col gap-6">
                        <div className="hidden flex-col gap-1 lg:flex">
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                Get in touch
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                                Reach out via any channel below — click any contact to copy it.
                                I usually reply within {site.responseTime}.
                            </p>
                        </div>

                        <div className="hidden flex-col gap-3 lg:flex">
                            {CONTACT_LINKS.map(({ icon, label, value }) => (
                                <CopyableContactLink
                                    key={label}
                                    icon={icon}
                                    label={label}
                                    value={value}
                                />
                            ))}
                        </div>

                        <div className="relative overflow-hidden h-52">
                            <GlobeWireframe
                                className="w-full aspect-square max-w-full absolute top-0 left-0"
                                variant="wireframesolid"
                                autoRotate
                                autoRotateSpeed={0.45}
                                strokeWidth={0.6}
                                graticuleOpacity={0.12}
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-zinc-50 dark:from-zinc-950 to-transparent" />
                        </div>
                    </div>

                    <div
                        id="contact-form"
                        className="flex flex-col gap-5 rounded-2xl border border-neutral-200/80 bg-white/80 p-6 font-sans shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-colors dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:shadow-[0_8px_32px_rgb(0,0,0,0.4)] sm:p-8"
                    >
                        <form action={submitContact} className="flex flex-col gap-5">
                            <div>
                                <h3 className="mb-0.5 text-lg font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                                    Send a message
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Fill out the form and I&apos;ll get back to you promptly.
                                </p>
                            </div>

                            <FormDots />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={(event) =>
                                            setForm({ ...form, name: event.target.value })
                                        }
                                        placeholder="Your name"
                                        className="w-full rounded-full border border-neutral-200/80 bg-neutral-100/70 px-4 py-2.5 text-[13px] font-medium tracking-tight text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200/60 dark:border-neutral-800/80 dark:bg-neutral-900/70 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/60"
                                    />
                                    {contactState.errors?.name ? (
                                        <p className="text-xs text-red-600 dark:text-red-400">
                                            {contactState.errors.name}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={(event) =>
                                            setForm({ ...form, company: event.target.value })
                                        }
                                        placeholder="Company (optional)"
                                        className="w-full rounded-full border border-neutral-200/80 bg-neutral-100/70 px-4 py-2.5 text-[13px] font-medium tracking-tight text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200/60 dark:border-neutral-800/80 dark:bg-neutral-900/70 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/60"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={(event) =>
                                        setForm({ ...form, email: event.target.value })
                                    }
                                    placeholder="you@example.com"
                                    className="w-full rounded-full border border-neutral-200/80 bg-neutral-100/70 px-4 py-2.5 text-[13px] font-medium tracking-tight text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200/60 dark:border-neutral-800/80 dark:bg-neutral-900/70 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/60"
                                />
                                {contactState.errors?.email ? (
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        {contactState.errors.email}
                                    </p>
                                ) : null}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    value={form.message}
                                    onChange={(event) =>
                                        setForm({ ...form, message: event.target.value })
                                    }
                                    placeholder="Type your message here"
                                    rows={4}
                                    className="w-full resize-none rounded-2xl border border-neutral-200/80 bg-neutral-100/70 px-4 py-3 text-[13px] font-medium tracking-tight text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200/60 dark:border-neutral-800/80 dark:bg-neutral-900/70 dark:text-neutral-100 dark:placeholder:text-neutral-400 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/60"
                                />
                                {contactState.errors?.message ? (
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        {contactState.errors.message}
                                    </p>
                                ) : null}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="group h-10 w-fit rounded-full bg-neutral-950 px-6 text-[13px] font-medium tracking-tight text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-white"
                            >
                                {isSubmitting ? "Sending..." : "Submit"}
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>

                            {contactState.message && !contactState.success ? (
                                <p
                                    role="status"
                                    aria-live="polite"
                                    className="text-sm text-red-600 dark:text-red-400"
                                >
                                    {contactState.message}
                                </p>
                            ) : null}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
