import { memo } from 'react';
import { TableCell } from '../TableCell';

export const TableRow = memo(({ data, rowID }) => {
  return (
    <tr className="LL-TableSectionRow" role="row">
      {Object.entries(data).map(([key, val]) => (
        <TableCell key={`${key}-${rowID}-${val}`}>{val}</TableCell>
      ))}
    </tr>
  );
});
