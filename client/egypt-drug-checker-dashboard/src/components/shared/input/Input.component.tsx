"use client";
import { type Iinput } from "./Input.model";
import MUiconButton from "@mui/material/IconButton";
import MUvisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MUvisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function Input({
	type,
	inputType = "full",
	name,
	value,
	onChange,
	placeholder,
	togglePasswordVisibility,
	showPassword,
	maxLength = 100,
	textarea,
	readonly
}: Iinput) {
	if (textarea) {
		return (
			<textarea
				className={
					"w-full bg-input p-3 text-xs focus:outline-primary min-w-auto max-w-auto"
				}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required
			/>
		);
	}
	return (
		<>
			<input
				className={
					"w-full bg-input p-3 text-xs focus:outline-primary min-w-auto max-w-auto"
				}
				type={type === "password" && showPassword ? "text" : type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required

				style={{
					fieldSizing: inputType === "contained" ? "content" : "initial",
				} as React.CSSProperties}
				maxLength={Number(maxLength) ?? 100}
				disabled={readonly}
			/>

			{togglePasswordVisibility && (
				<MUiconButton
					sx={{ position: "absolute", right: 2 }}
					onClick={togglePasswordVisibility}
				>
					{showPassword ? (
						<MUvisibilityOffOutlinedIcon color="primary" />
					) : (
						<MUvisibilityOutlinedIcon color="primary" />
					)}
				</MUiconButton>
			)}
		</>
	);
}
