export const TableBody = ({ className, id, children }) => {
  return (
    <tbody id={id} className={`LL-TableBody ${className || ''}`}>
      {children}
    </tbody>
  );
};
