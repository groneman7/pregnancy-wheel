import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function polar(cx: number, cy: number, r: number, deg: number) {
    // Make 0° at top, clockwise positive
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

export function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number, cw?: boolean) {
    const start = polar(cx, cy, r, startDeg);
    const end = polar(cx, cy, r, endDeg);

    // Normalize delta in [0, 360)
    const delta = (((endDeg - startDeg) % 360) + 360) % 360;

    const largeArcFlag = delta > 180 ? 1 : 0;
    const sweepFlag = cw ? 1 : 0;

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

export function describeArc2(x: number, y: number, r: number, startDeg: number, endDeg: number, cw?: boolean): string {
    const start = polar(x, y, r, endDeg);
    const end = polar(x, y, r, startDeg);

    const largeArcFlag = endDeg - startDeg <= 180 ? "0" : "1";
    const sweepFlag = cw ? 1 : 0; // 👈 toggle arc direction

    return `M ${x} ${y} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y} Z`;
}
