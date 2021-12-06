// @TODO: Move to sw-web-shared

export const GetDatatableItems = (state) => {
  return Object.keys(state.rows.idRowsLookup).reduce(
    (prev, key) => {
      const member = state.rows.idRowsLookup[key];
      if (!member?.locked) {
        prev.newItems = [...prev.newItems, member];
      }

      prev.allItems = [...prev.allItems, member];

      return prev;
    },
    {
      newItems: [],
      allItems: [],
    }
  );
};

export const LockDatatableItems = (items) => {
  return items.map((member, index) => {
    return {
      ...member,
      id: index,
      locked: true,
    };
  });
};
