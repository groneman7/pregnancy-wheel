import { useState } from "react";
import { Wheel } from "@/components/Wheel";

export function App() {
    const [offset, setOffset] = useState(0);
    return (
        <div className="flex gap-2">
            <Wheel offset={offset} />
            <div className="flex flex-col gap-2">
                <button onClick={() => setOffset((o) => o + 1)}>Increase</button>
                <button onClick={() => setOffset((o) => o - 1)}>Decrease</button>
            </div>
        </div>
    );
}
