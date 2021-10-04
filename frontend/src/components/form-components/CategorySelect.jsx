import {useField} from 'formik';
import CreatableSelect from 'react-select/creatable';

const CategorySelect = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props.name);
    const { setValue, setTouched } = helpers;
    
    const handleFields = (selectedOption) => {
        if (Object.keys(selectedOption).includes('__isNew__')) {
            setValue({title: selectedOption.label.trim()}) 
        }
        else {
            setValue({title: selectedOption.label.trim(), id: selectedOption.value})
        }
    }
    
    return (

        <div>
            
            <label htmlFor={props.id || props.name}>{label}</label>
            
            <CreatableSelect className="select-input"
                    onChange={selectedOption => handleFields(selectedOption)}
                    options={props.options}
                    value={Object.keys(field.value).length > 0 ? field.value.id ? {label: field.value.title, value: field.value.id} : {label: field.value.title} : null}
                    onBlur={setTouched}
                    placeholder="Select category"
                    />
            
            {meta.touched && meta.error ? (
            <div className="input-error">{meta.error.title}</div>
            ) : null}

        </div>
    )
}

export default CategorySelect
