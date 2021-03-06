import React from 'react';

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
      <div>
        <h1>{courseName}</h1>
      </div>
  );

export default Header;