import React from 'react';

const JUSTIFY_OPTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-evenly',
  'space-around',
  'space-between',
];
const ALIGN_OPTS = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'];

const Stack = ({
  className,
  children,
  vertical,
  justify,
  align,
  gap,
  basis,
}) => {
  const styles = {
    position: 'relative',
    display: 'flex',
    flexDirection: vertical ? 'column' : undefined,
    justifyContent: JUSTIFY_OPTS.includes(justify) ? justify : 'center',
    alignItems: ALIGN_OPTS.includes(align) ? align : 'flex-start',
    gap,
    flexBasis: basis,
  };

  return (
    <div role="group" className={`stack ${className ?? ''}`} style={styles}>
      {children}
    </div>
  );
};

Stack.Item = Stack;

export { Stack };
