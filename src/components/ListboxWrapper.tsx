import React from "react";
const ListboxWrapper = ({children}: { children: React.ReactNode}) => (
  <div className="w-[260px] border-none px-1 py-2 rounded-none border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default ListboxWrapper;