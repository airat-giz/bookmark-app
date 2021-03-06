import { useField } from 'formik';

const CustomTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
  
    return (

      <div>

        <label htmlFor={props.id || props.name}>{label}</label>

        <input className="text-input" {...field} {...props} />

        {meta.touched && meta.error ? (
        <div className="input-error">{meta.error}</div>
        ) : null}
        
      </div>
    );
  };

  export default CustomTextInput
