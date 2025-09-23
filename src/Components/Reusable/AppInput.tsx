import { useTheme } from '../../contexts/ThemeContextProvider';
import Error from './Error';

type AppInputProps = {
    label: string;
    type: string;
    placeholder: string;
    labelStyle?: string;
    inputStyle?: string;
    wrapperStyle?: string;
    required?: boolean
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string
}
const AppInput = ({ label, type, placeholder, labelStyle, inputStyle, wrapperStyle, required = false, value, onChange, error }: AppInputProps) => {
    
   const {theme} = useTheme()
   const isLight = theme === "light"

    return (
        <div className={`w-full ${wrapperStyle}`}>
            <span className='flex gap-1'><label className={`block mb-2 ${isLight ? "text-black" : "text-white"} ${labelStyle}`}>{label}</label> {required && <span className='text-red-500'>*</span>}</span>
            <input 
                value={value}
                onChange={onChange}
                required={required}
                type={type} 
                placeholder={placeholder} 
                className={`w-full ${isLight ? "text-black" : "text-white"} p-2 rounded border border-gray-300 outline-0 ${inputStyle} ${error && 'border-red-500'}`}
            />
            {error && <Error error={error} />}
        </div>
    );
}

export default AppInput;