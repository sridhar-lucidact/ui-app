import { isEqual, cloneDeep } from "lodash"
import { useRef } from "react"

export default function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>() 
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!isEqual(value, ref.current)) {
    ref.current =  cloneDeep(value)
  }

  return ref.current
}