import { useSortable } from '@dnd-kit/react/sortable';
import { useCallback, useRef } from 'react';

/**
 * A custom hook that combines the functionality of `useSortable` with a local ref to the DOM element.
 * This allows components to have access to both the sortable props and a direct reference to the DOM node.
 * Useful for components that need to interact with the DOM element directly (e.g., for click outside detection) while also being sortable.
 * @param props
 * @returns
 */
export const useSortableWithRef = <T extends HTMLElement>(
  props: Parameters<typeof useSortable>[0],
) => {
  const localRef = useRef<T | null>(null);
  const sortable = useSortable(props);
  const sortableRef = sortable.ref;
  const mergedRef = useCallback(
    (node: T | null) => {
      // dnd-kit ref
      if (typeof sortableRef === 'function') {
        sortableRef(node);
      }

      // local ref
      localRef.current = node;
    },
    [sortableRef],
  );

  return {
    ...sortable,
    ref: mergedRef,
    localRef,
  };
};
