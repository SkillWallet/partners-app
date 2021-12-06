import { useRef, useMemo } from "react";

// @TODO: Move to sw-web-shared

export const useDatatableApiRef = (tableColumns) => {
  const apiRef = useRef(null);
  const _columns = useMemo(() => {
    const columns = tableColumns(() => apiRef);
    return columns.concat({
      field: "__HIDDEN__",
      width: 0,
      minWidth: 0,
      flex: 0,
      sortable: false,
      renderCell: (params) => {
        apiRef.current = params.api;
        return null;
      },
    });
  }, [tableColumns]);

  return { apiRef, columns: _columns };
};
