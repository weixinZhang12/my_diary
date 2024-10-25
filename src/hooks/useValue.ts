import { useState } from "react";
export interface Value<T> {
    value: T
}
function useValue<T>(data?: T) {
    const [state, setState] = useState<T>(data as T)
    class Value {
        public get value(): T {
            return state
        }

        public set value(v: T) {

            if (Array.isArray(v)) {
                setState([...v] as T)
            }
            else if (typeof v === 'object'&&v!==null&&!Array.isArray(v)) {
                setState({ ...state, ...v })
            }
            else {
                setState(v)
            }
        }
    }
    const states = new Value()

    return states
}

export default useValue