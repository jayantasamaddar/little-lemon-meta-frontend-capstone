import { useId } from 'react';
import { TableBody, TableRow, TableHeader, TableCell } from './components';
import './Table.css';

const Table = ({
  id,
  className,
  children,
  columns,
  rows,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const accessibilityProps = {
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
  };

  const row_id = useId();

  return (
    <table
      role="table"
      id={id}
      className={`LL-Table ${className ?? ''}`}
      {...accessibilityProps}
    >
      {rows && columns && (
        <TableBody>
          {columns && <TableHeader data={columns} />}
          {rows.map((row, index) => (
            <TableRow key={row_id} data={row} rowID={row_id} />
          ))}
        </TableBody>
      )}
    </table>
  );
};

Table.Cell = TableCell;
Table.Body = TableBody;
Table.Header = TableHeader;
Table.Row = TableRow;

export { Table };
