import { useState } from "react";

function useSta<T>(data?: T) {
    const [state, setState] = useState<T>(data as T)
    class State {
        public get value(): T {
            return state
        }

        public set value(v: T) {
            setState(v)
        }
    }
    const states = new State()

    return states
}

export default useSta