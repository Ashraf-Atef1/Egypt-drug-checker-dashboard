import { type IinputField } from "./InputField.model";
import MUtypography from '@mui/material/Typography';
import Input from "../input/Input.component";
import { fonts } from "@/utils/theme/fonts";
export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  togglePasswordVisibility,
  showPassword,
  labelBold
}: IinputField) {

  return (
    <label className={"flex flex-col flex-grow md:flex-row gap-2 relative md:justify-center md:items-center w-full"}>

      <MUtypography
        sx={{
          minWidth: 150,
          fontWeight: labelBold ? fonts.weight.bold : 'normal'
        }}
      >
        {label}
      </MUtypography>
      <div className=' relative w-full'>

        <Input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          togglePasswordVisibility={togglePasswordVisibility}
          showPassword={showPassword}
        />
      </div>
    </label>

  );
};

