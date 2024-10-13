"use client";
import { Typography as MUtypography } from "@mui/material";
import { useState } from "react";
import { fonts } from "@/utils/theme/fonts";
import { type IsignUpFormData } from "./SignUpForm.model";
import colors from "@/utils/theme/colors";
import InputField from "../shared/input-field/InputField.component";
import TextButton from "../shared/text-button/TextButton.component";
import Link from "next/link";
import { signUp } from "@/lib/api/sign-up/signUp.router";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/store/user/user.slice";
const SignUpForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState<IsignUpFormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { confirmPassword, ...signUpData } = formData;
			const userData = await signUp(signUpData);
			console.log("userData\n", userData);
			dispatch(setUser(userData.user));
			router.push("/home");
		}
	};

	return (
		<div className="shadow-xl max-w-lg mx-auto flex flex-col justify-center items-center px-4 py-10 gap-6 rounded-xl">
			<MUtypography
				variant="h4"
				component="h2"
				sx={{ fontWeight: fonts.weight.extraBold, color: colors.primary }}
			>
				Sign Up
			</MUtypography>

			<form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
				<InputField
					label="First Name:"
					type="text"
					name="firstName"
					value={formData.firstName}
					onChange={handleInputChange}
					placeholder="Enter your first name"
				/>

				<InputField
					label="Last Name:"
					type="text"
					name="lastName"
					value={formData.lastName}
					onChange={handleInputChange}
					placeholder="Enter your last name"
				/>

				<InputField
					label="Email:"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Enter your email"
				/>

				<InputField
					label="Password:"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Enter your password"
					showPassword={showPassword}
					togglePasswordVisibility={() => setShowPassword(!showPassword)}
				/>

				<InputField
					label="Confirm Password:"
					type="password"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleInputChange}
					placeholder="Confirm your password"
					showPassword={showConfirmPassword}
					togglePasswordVisibility={() =>
						setShowConfirmPassword(!showConfirmPassword)
					}
				/>

				{error && <p className="text-error text-xs italic mb-4">{error}</p>}

				<div className="flex items-center justify-between mb-4">
					<p className="text-sm">
						Have an account?
						<Link href="/login" className="text-primary hover:underline">
							Login
						</Link>
					</p>
				</div>

				<div className="flex items-center justify-center mb-4">
					<TextButton buttonType="contained" type="submit">
						Sign Up
					</TextButton>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
