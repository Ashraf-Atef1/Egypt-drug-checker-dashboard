export interface Iinput {
	type: string;
	inputType?: "contained" | "full" | "textarea";
	name: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder?: string;
	togglePasswordVisibility?: () => void;
	showPassword?: boolean;
	maxLength?: number;
	textarea?: boolean;
	readonly?:boolean;
}
