import { ReactNode } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectMenuProps<Value> {
  name?: string;
  value?: Value;
  onChange?: (newValue: Value) => void;
  className?: string;
  id?: string;
  lista?: Option[];
  children?: ReactNode;
}

const SelectMenu = (props: SelectMenuProps<any>) => {
  const { lista, ...restProps } = props;

  const options = lista?.map((option, index) => {
    return (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <select 
    className={props.className}
    onChange={props.onChange}
    id={props.id} value={props.value} name={props.name} {...restProps} >
      {options}
    </select>
  );
};

export default SelectMenu;
