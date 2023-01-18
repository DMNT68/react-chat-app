import React from 'react';
import { SearchBox } from './SearchBox';
import { SideBar } from './SideBar';

export const InboxPeople = () => {
  return (
    <div>
      <div className="inbox_people">
        {/* <!-- Searchbox inicio --> */}
        <SearchBox />
        {/* <!-- Searchbox Fin --> */}

        {/* <!-- Sidebar inicio --> */}
        <SideBar />
        {/* <!-- Sidebar Fin --> */}
      </div>
    </div>
  );
};
