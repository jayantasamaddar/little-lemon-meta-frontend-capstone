import { memo } from 'react';
import { TableCell } from '../TableCell';

export const TableHeader = memo(({ data }) => {
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
