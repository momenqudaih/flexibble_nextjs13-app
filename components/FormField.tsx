type Props = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
};

const FormField = ({
    type,
    title,
    state,
    placeholder,
    isTextArea,
    setState,
}: Props) => {
    return (
        <div className="flexStart flex-col w-full gap-4">
            <label htmlFor="" className="w-full text-gray-100">
                {title}
            </label>

            {isTextArea ? (
                <textarea
                    required
                    className="form_field-input"
                    placeholder={placeholder}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                ></textarea>
            ) : (
                <input
                    type={type || 'text'}
                    required
                    className="form_field-input"
                    placeholder={placeholder}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    );
};

export default FormField;
