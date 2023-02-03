# Table of Contents

- [Table of Contents](#table-of-contents)
- [Table](#table)
- [Table: Design Patterns](#table-design-patterns)
  - [Simple Table: Passing rows and columns to create tables](#simple-table-passing-rows-and-columns-to-create-tables)
  - [Composite Table: Table using Composite Components](#composite-table-table-using-composite-components)

---

# Table

The Table Component creates a simple table.

```ts
interface TableProps {
  /** Unique identifier for the Table component */
  id;
  /** ClassName attribute of the Table component */
  className: string;
  /** Collection representing columns for the Table */
  columns?: Columns[];
  /** Collection representing rows for the Table */
  rows?: Rows[];
  /** When choosing the Data Pattern composite */
  children?: typeof TableBody | typeof TableBody[];
  /** Accessible label for the table */
  ariaLabel;
  /** ID of the descriptor for the table */
  ariaDescribedBy;
}
```

---

# Table: Design Patterns

There are two design patterns that can be used to create tables.

## Simple Table: Passing rows and columns to create tables

**Syntax**:

```jsx
<Table rows={rows} columns={columns} />
```

Where,

1. **`columns`** refer to the first row: i.e. the table header row, each element representing a column head.
2. **`rows`** refer the table refers to the remaining rows of the table.

**The columns data model**

```ts
interface ColumnName<T> {
  /**
   * Name attribute of each Table Header cell (second unique ID)
   * Used to refer to the same field of a row cell.
   */
  name: T;
}

interface Column extends ColumnName {
  /** Unique identifier of each Table Header cell. Used in `key` when using map */
  id: string | number;
  /** The visible accessible display value of the Table Header */
  label: string;
}

type Columns = Column[];
```

The rows have been kept simple to use as-is received from a form.
In every single row, the name property of every column will be used as keys to represent values of every corresponding cell.

```ts
interface Row<T, V extends { [K in keyof T]: { [L: string]: string | number | Date } }> {
  [K in keyof T]: ColumnName<V[K]>
}

type Rows = Row[];
```

---

## Composite Table: Table using Composite Components

We can make group areas in tables and have more freedom when using this pattern. More complicated and may require more fine-tuning. For a readymade, simple option, go for the Simple Table.

The following is an example of a Table with 1 x Header and 2 x Rows

**Syntax**:

```jsx
<Table>
  <TableBody>
    <TableHeader>
      <TableCell>Booking ID</TableCell>
      <TableCell>First Name</TableCell>
      <TableCell>Last Name</TableCell>
      <TableCell>Reservation Date</TableCell>
      <TableCell>Reservation Time</TableCell>
      <TableCell>Guests</TableCell>
      <TableCell>Occasion</TableCell>
    </TableHeader>

    <TableRow>
      <TableCell>12345</TableCell>
      <TableCell>John</TableCell>
      <TableCell>Doe</TableCell>
      <TableCell>2023-03-19</TableCell>
      <TableCell>18:00</TableCell>
      <TableCell>5</TableCell>
      <TableCell>Engagement</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>67890</TableCell>
      <TableCell>Jason</TableCell>
      <TableCell>Bourne</TableCell>
      <TableCell>2023-04-11</TableCell>
      <TableCell>21:00</TableCell>
      <TableCell>2</TableCell>
      <TableCell>Anniversary</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

> **Tips**:
>
> - Multiple **`TableBody`** sections can be used under one **`Table`**
> - For everyday use cases, the first pattern using `rows` and `columns` should suffice.
> - A simple use case could be to categorize the but having the necessity to interject to add an image or media or any element to a row or cell that is out of the normal. That can be done here.

---
