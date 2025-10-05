import { Fragment } from "react";
import { describeArc, cn, describeArc2 } from "@/lib/utils";
import dayjs, { type Dayjs } from "dayjs";

const WIDTH = 1024;
const HEIGHT = 896;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const RADIUS_LABEL = (WIDTH > HEIGHT ? HEIGHT / 2 : WIDTH / 2) - 40;
const RADIUS_OUTER = RADIUS_LABEL + 20;
const RADIUS_MIDDLE = RADIUS_OUTER - 40;
const RADIUS_INNER = RADIUS_OUTER - 108;
const DEG_PER_DAY = 360 / 365;
const TICK_LONG = 32;
const TICK_SHORT = 16;

function createDaysArray() {
    const today = dayjs();
    const array: Dayjs[] = [];

    // for (let i = -182; i < 183; i++) {
    //     array.push(today.add(i, "day"));
    // }

    for (let i = 0; i < 365; i++) {
        array.push(today.add(i, "day"));
    }

    return array;
}

export function Wheel() {
    const days = createDaysArray();
    const monthStartIdx = days.reduce<number[]>((acc, d, i) => {
        if (d.date() === 1) acc.push(i);
        return acc;
    }, []);

    const monthArcs = monthStartIdx.map((startIdx, mi) => {
        const startDate = days[startIdx];
        const daysInMonth = startDate.daysInMonth();

        const startAngle = angle(startIdx);
        const endAngle = startAngle + daysInMonth * DEG_PER_DAY;

        const id = `month-arc-${mi}`;
        const d = describeArc(CENTER_X, CENTER_Y, RADIUS_LABEL, startAngle, endAngle, true);

        // Optional: compute mid-angle if you want to do flipping logic
        // const midAngle = startAngle + (endAngle - startAngle) / 2;

        return {
            id,
            d,
            label: startDate.format("MMMM").toUpperCase(),
            // midAngle,
        };
    });

    function angle(i: number, offset: number = 0) {
        return (i + offset) * DEG_PER_DAY;
    }

    return (
        <div className="PREGNANCY_WHEEL_CONTAINER select-none cursor-default">
            <svg
                width={WIDTH}
                height={HEIGHT}
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                {/* Outer ring */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={RADIUS_OUTER}
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                />
                {/* Middle ring */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={RADIUS_MIDDLE}
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                />
                {/* Inner ring */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={RADIUS_INNER}
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                />

                <g className="month-arcs">
                    {monthArcs.map((arc) => (
                        <Fragment key={arc.id}>
                            {/* the invisible path that text follows */}
                            <path
                                id={arc.id}
                                d={arc.d}
                                fill="none"
                                stroke="transparent"
                                pointerEvents="none"
                            />
                            {/* the label that follows the arc */}
                            <text className="font-bold">
                                <textPath
                                    href={`#${arc.id}`}
                                    startOffset="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle">
                                    {arc.label}
                                </textPath>
                            </text>
                        </Fragment>
                    ))}
                </g>

                {/* Day tick marks */}
                <g className="day-ticks">
                    {days.map((date, i) => {
                        const isMultipleOf5 = date.date() % 5 === 0;
                        const tickLength =
                            date.date() === 1 ? RADIUS_OUTER - RADIUS_INNER : isMultipleOf5 ? TICK_LONG : TICK_SHORT;

                        return (
                            <>
                                <line
                                    className={cn(
                                        "stroke-black",
                                        date.isSame(dayjs(), "day") && "stroke-blue-600 stroke-2",
                                        date.month() === 0 && date.date() === 1 && "stroke-red-600 stroke-2",
                                        date.month() === 11 && date.date() === 31 && "stroke-emerald-600 stroke-2"
                                    )}
                                    key={i}
                                    x1={CENTER_X}
                                    y1={CENTER_Y - RADIUS_INNER}
                                    x2={CENTER_X}
                                    y2={CENTER_Y - (RADIUS_INNER + tickLength)}
                                    transform={`rotate(${angle(i)} ${CENTER_X} ${CENTER_Y})`}
                                />
                                {isMultipleOf5 && date.date() !== 30 && (
                                    <text
                                        className="text-[9px]"
                                        x={CENTER_X}
                                        y={CENTER_Y - (RADIUS_INNER + tickLength + 6)}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${angle(i)} ${CENTER_X} ${CENTER_Y})`}
                                        fontFamily="system-ui, sans-serif"
                                        fill="black">
                                        {date.date()}
                                    </text>
                                )}
                            </>
                        );
                    })}
                </g>

                {/* Inner colored sections */}
                <g className="trimester-sections">
                    {/* 1st Trimester (purple) */}
                    <path
                        className="fill-violet-600/40"
                        d={describeArc2(CENTER_X, CENTER_Y, RADIUS_INNER, angle(98 * 0), angle(98 * 1))}
                    />
                    {/* 2nd Trimester (purple) */}
                    <path
                        className="fill-pink-400/50"
                        d={describeArc2(CENTER_X, CENTER_Y, RADIUS_INNER, angle(98 * 1), angle(98 * 2))}
                    />
                    {/* 3rd Trimester (purple) */}
                    <path
                        className="fill-cyan-400/40"
                        d={describeArc2(CENTER_X, CENTER_Y, RADIUS_INNER, angle(98 * 2), angle(98 * 3))}
                    />
                </g>

                {/* Center white circle */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={RADIUS_INNER / 3}
                    fill="white"
                    // stroke="black"
                    strokeWidth="1"
                />

                {/* Pointer arrow */}
                {/* <g
                    className="pointer"
                    transform="rotate(-45 300 300)">
                    <path
                        d="M 300 220 L 310 250 L 300 240 L 290 250 Z"
                        fill="black"
                    />
                    <line
                        x1="300"
                        y1="250"
                        x2="300"
                        y2="180"
                        stroke="black"
                        strokeWidth="3"
                    />
                </g> */}
            </svg>
        </div>
    );
}
