import './Heading.css';

const ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const SIZE_OPTIONS = ['xs', 'sm', 'standard', 'base', 'm', 'lg', 'xl', '2xl'];

export const Heading = ({ tag = 'h2', size, align = 'left', children }) => {
  let computedSize = 'text-';
  const computedAlign = ['left', 'right', 'center'].includes(align)
    ? align
    : 'left';
  const Element = ELEMENTS.includes(tag) ? tag : 'h2';

  if (size && SIZE_OPTIONS.includes(size)) computedSize += size;
  else {
    switch (Element) {
      case 'h1':
        computedSize += 'xl';
        break;
      case 'h2':
        computedSize += 'lg';
        break;
      case 'h3':
        computedSize += 'm';
        break;
      case 'h4':
        computedSize += 'base';
        break;
      case 'h5':
        computedSize += 'standard';
        break;
      case 'h6':
        computedSize += 'sm';
        break;
      default:
        break;
    }
  }

  const classList = `${computedSize} ${computedAlign}`;

  return <Element className={classList}>{children}</Element>;
};
