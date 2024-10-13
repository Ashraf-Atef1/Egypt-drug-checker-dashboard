import { type Ifield } from "./Field.model";
import { fonts } from "@/utils/theme/fonts";
import {colors} from "@/utils/theme/colors"
import MUtypography from '@mui/material/Typography';
export default function Field({
  label,
  children
}: Ifield) {
  return (
    <label className="flex flex-col flex-grow md:flex-row gap-2 relative md:justify-center md:items-center w-full">

      <MUtypography sx={{ minWidth: 150, fontWeight: fonts.weight.extraBold, color:colors.primary }}>{label} </MUtypography>

      <div className=' relative w-full'>

        {children}
      </div>
    </label>

  );
};

