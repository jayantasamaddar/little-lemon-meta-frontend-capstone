export const TableCell = ({
  tag,
  id,
  children,
  title,
  className,
  colSpan,
  rowSpan,
}) => {
  const Element = ['td', 'th'].includes(tag) ? tag : 'td';
  return (
    <Element
      id={id}
      className={`LL-TableCell ${className ?? ''}`}
      title={title}
      colSpan={colSpan}
      rowSpan={rowSpan}
      role={Element === 'td' ? 'cell' : 'columnheader'}
    >
      {children}
    </Element>
  );
};
