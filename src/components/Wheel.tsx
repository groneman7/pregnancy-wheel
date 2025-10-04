import { describeArc } from "@/lib/utils";
import dayjs, { type Dayjs } from "dayjs";

const CENTER_X = 300;
const CENTER_Y = 300;
const RADIUS_OUTER = 230;
const RADIUS_INNER = 180;
const TICK_LONG = 32;
const TICK_SHORT = 16;

function createDaysArray() {
    const today = dayjs();
    const array: Dayjs[] = [];

    for (let i = -182; i < 183; i++) {
        array.push(today.add(i, "day"));
    }

    return array;
}

export function Wheel() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div className="PREGNANCY_WHEEL_CONTAINER">
            <svg
                width="600"
                height="600"
                viewBox="0 0 600 600">
                {/* Outer ring with months */}
                <g className="outer-ring">
                    {months.map((month, index) => {
                        const angle = index * 30 - 90; // 30 degrees per month
                        return (
                            <g key={month}>
                                {/* Month labels */}
                                <text
                                    x={CENTER_X}
                                    y={CENTER_Y}
                                    transform={`rotate(${angle + 15} 300 300) translate(0 -240)`}
                                    textAnchor="middle"
                                    fill="red"
                                    className="!text-red-500">
                                    {month}
                                </text>
                                {/* Month divider lines */}
                                <line
                                    x1="300"
                                    y1="50"
                                    x2="300"
                                    y2="80"
                                    transform={`rotate(${angle} 300 300)`}
                                    stroke="red"
                                    strokeWidth="2"
                                />
                            </g>
                        );
                    })}
                </g>

                {/* Outer ring */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={RADIUS_OUTER}
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

                {/* Day tick marks */}
                <g className="day-ticks">
                    {createDaysArray().map((date, i) => {
                        const angle = (i * 360) / 365 + 180;

                        const isMultipleOf5 = date.date() % 5 === 0;
                        const tickLength =
                            date.date() === 1 ? RADIUS_OUTER - RADIUS_INNER : isMultipleOf5 ? TICK_LONG : TICK_SHORT;

                        return (
                            <line
                                className={
                                    i === 0
                                        ? "stroke-red-500"
                                        : date.isSame(dayjs(), "day")
                                        ? "stroke-blue-500"
                                        : "stroke-black"
                                }
                                key={i}
                                x1={CENTER_X}
                                y1={CENTER_Y - RADIUS_INNER}
                                x2={CENTER_X}
                                y2={CENTER_Y - (RADIUS_INNER + tickLength)}
                                transform={`rotate(${angle} ${CENTER_X} ${CENTER_Y})`}
                            />
                        );
                    })}
                </g>

                {/* Inner colored sections */}
                <g className="trimester-sections">
                    {/* 1st Trimester (purple) */}
                    <path
                        d={describeArc(300, 300, 170, -90, 30)}
                        fill="#b388ff"
                        opacity="0.8"
                    />

                    {/* 2nd Trimester (pink) */}
                    <path
                        d={describeArc(300, 300, 170, 30, 150)}
                        fill="#ff80ab"
                        opacity="0.8"
                    />

                    {/* 3rd Trimester (cyan) */}
                    <path
                        d={describeArc(300, 300, 170, 150, 270)}
                        fill="#80deea"
                        opacity="0.8"
                    />
                </g>

                {/* Center white circle */}
                <circle
                    cx="300"
                    cy="300"
                    r="80"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                />

                {/* Pointer arrow */}
                <g
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
                </g>

                {/* Trimester labels */}
                <text
                    x="250"
                    y="170"
                    className="trimester-text"
                    fill="white">
                    1st Trimester
                </text>
                <text
                    x="350"
                    y="300"
                    className="trimester-text"
                    fill="white">
                    2nd Trimester
                </text>
                <text
                    x="200"
                    y="400"
                    className="trimester-text"
                    fill="white">
                    3rd Trimester
                </text>
            </svg>
        </div>
    );
}
