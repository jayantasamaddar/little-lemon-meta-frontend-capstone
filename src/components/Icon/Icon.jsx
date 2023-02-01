import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Icon = ({ src, title, ...props }) => {
  return (
    <div className="LL-Icon">
      <FontAwesomeIcon title={title} icon={src} {...props} />
    </div>
  );
};
