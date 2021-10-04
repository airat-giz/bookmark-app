import {useField} from 'formik';
import CreatableSelect from 'react-select/creatable';

const TagsSelect = ({ label, ...props }) => {
    const [field, meta, helpers, validateField] = useField(props.name);
    const { setValue, setTouched } = helpers;

    function errorIndex() {
        if (Array.isArray(meta.error)) {
            return meta.error.findIndex(error => {
                return (typeof error === 'object')
            })
        }}

    const err = errorIndex()

    const handleFields = (selectedOption) => {

        const tags = selectedOption.map(tag => {

            if (Object.keys(tag).includes('__isNew__')) {
                return {'title': tag.label.trim()} 
            }
            else {
                return {'id': tag.value, 'title': tag.label.trim()}
            }
        })
        setValue(tags)
    };
    
    return (

        <div>

            <label htmlFor={props.id || props.name}>{label}</label>
            
            <CreatableSelect className="select-input"
                    onFocus={() => ((validateField, setTouched))}
                    isMulti
                    value={field.value.length > 0 ? field.value.map(tag => {return {label: tag.title, value: tag.id}}) : null}
                    onChange={selectedOption => handleFields(selectedOption)}
                    options={props.options}
                    placeholder="Select tags"
                    />
            
            {meta.touched && meta.error ? (
            <div className="input-error">{meta.error[err].title}</div>
            ) : null}

        </div>
    )
}

export default TagsSelect
