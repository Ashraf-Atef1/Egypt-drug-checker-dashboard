export interface IinputField {
	label: string;
	type: string;
	name: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	placeholder: string;
	togglePasswordVisibility?: () => void;
	showPassword?: boolean;
	labelBold?: boolean;
}
