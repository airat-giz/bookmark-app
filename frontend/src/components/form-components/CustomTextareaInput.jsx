import { useField } from 'formik';

const CustomTextareaInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
  
    return (

      <div>

        <label htmlFor={props.id || props.name}>{label}</label>

        <textarea className="text-input" {...field} {...props} />

        {meta.touched && meta.error ? (
        <div className="input-error">{meta.error}</div>
        ) : null}
        
      </div>
    );
  };

  export default CustomTextareaInput