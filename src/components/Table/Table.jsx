import { memo } from 'react';
import './Table.css';

const TableBody = memo(({ className, id, children }) => {
  return (
    <tbody id={id} className={`LL-TableBody ${className || ''}`}>
      {children}
    </tbody>
  );
});

const TableCell = memo(
  ({ tag, id, children, title, className, colSpan, rowSpan }) => {
    const Element = ['td', 'th'].includes(tag) ? tag : 'td';
    return (
      <Element
        id={id}
        className={`LL-TableCell ${className ?? ''}`}
        title={title}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {children}
      </Element>
    );
  }
);

const TableHead = memo(({ data }) => {
  return (
    <tr className="LL-TableSectionHead">
      {data.map(({ id, label, name, colSpan }) => (
        <TableCell tag="th" key={id ?? name} colSpan={colSpan}>
          {label}
        </TableCell>
      ))}
    </tr>
  );
});

const TableRow = ({ data, rowID }) => {
  return (
    <tr className="LL-TableSectionRow">
      {Object.entries(data).map(([key, val]) => (
        <TableCell key={`${key}-${rowID}-${val}`}>{val}</TableCell>
      ))}
    </tr>
  );
};

const Table = ({
  id,
  className,
  columns,
  rows,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const accessibilityProps = {
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
  };
  return (
    <table
      id={id}
      className={`LL-Table ${className ?? ''}`}
      {...accessibilityProps}
    >
      {rows && columns && (
        <TableBody>
          {columns && <TableHead data={columns} />}
          {rows?.map((row, index) => (
            <TableRow data={row} rowID={index} />
          ))}
        </TableBody>
      )}
    </table>
  );
};

Table.TableCell = TableCell;
Table.TableBody = TableBody;
Table.TableHead = TableHead;
Table.TabeRow = TableRow;

export { Table };
