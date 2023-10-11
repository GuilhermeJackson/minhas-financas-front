
interface FormGroupProps {
    id?: string;
    label: string;
    htmlFor?: string;
    children?: React.ReactNode;
}

function FormGroup(props: FormGroupProps) {

    return (
        <div className="form-group" id={props.id}>
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup;