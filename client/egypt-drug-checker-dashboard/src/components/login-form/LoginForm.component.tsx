"use client";
import { Typography as MUtypography } from "@mui/material";
import { useState } from "react";
import { fonts } from "@/utils/theme/fonts";
import { type IloginformData } from "./LoginForm.model";
import colors from "@/utils/theme/colors";
import InputField from "../shared/input-field/InputField.component";
import TextButton from "../shared/text-button/TextButton.component";
import Link from "next/link";
import { login } from "@/lib/api/login/login.router";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/user/user.slice";

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState<IloginformData>({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = await login(formData);
		dispatch(setUser(userData.user));
		router.push("/home");
	};

	return (
		<div className="shadow-xl max-w-lg mx-auto flex flex-col justify-center items-center px-4 py-10 gap-6 rounded-xl">
			<MUtypography
				variant="h4"
				component="h2"
				sx={{ fontWeight: fonts.weight.extraBold, color: colors.primary }}
			>
				Login
			</MUtypography>

			<form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
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

				<a href="#" style={{ color: colors.primary }}>
					Forget password
				</a>

				<div className="flex items-center justify-between mb-4">
					<p className="text-sm">
						Do not have an account?
						<Link href="/sign-up" className="text-primary hover:underline">
							Sign Up
						</Link>
					</p>
				</div>

				<div className="flex items-center justify-center mb-4">
					<TextButton buttonType="contained" type="submit">
						Login
					</TextButton>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
