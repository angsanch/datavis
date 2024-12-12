import React, { useEffect, useState, MutableRefObject } from "react";

type Size = {
  width?: number;
  height?: number;
};

function useSize(ref: MutableRefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>({});

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

type ResizerProps = {
  extRef: MutableRefObject<HTMLElement | null>;
  func: Function;
  refGetter?: Function;
};

const Resizer: React.FC<ResizerProps> = ({ extRef, func, refGetter }) => {
  const { width, height } = useSize(extRef);
  const ref = refGetter ? refGetter() : null;

  useEffect(() => {
    setTimeout(() => {
      func(width, height, ref);
    }, 100);
  }, [height, width]);

  return null;
};

export default Resizer;
