"use client";
import { Typography as MUtypography } from "@mui/material";
import { useState } from "react";
import { fonts } from "@/utils/theme/fonts";
import {
    type IeditProfileFormData,
    type IeditProfileForm,
} from "./EditProfileForm.model";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/user/user.slice";
import TextButton from "../shared/text-button/TextButton.component";
import InputField from "../shared/input-field/InputField.component";
import UserAvatar from "../shared/user-avatar/UserAvatar.component";
import { setMyImage, setMyData, setUserData, setImage, deleteMyImage, deleteUserImage } from "@/lib/api/user/user.router";
import { useRouter } from "next/navigation";
const EditProfileForm = ({
    userId,
    firstName,
    lastName,
    email,
    image,
}: // removeChangePassword,
    IeditProfileForm) => {
    // Handler for file input change
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState<IeditProfileFormData>({
        firstName,
        lastName,
        email,
        image,
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]; // Get the first selected file
            if (file) {
                console.log(file);
                setSelectedImage(file);
                setFormData({
                    ...formData,
                    ["image"]: URL.createObjectURL(file),
                });
            }
        }
    };
    const triggerFileInput = () => {
        document.getElementById('hiddenFileInput')?.click();
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) {
            let res = await setMyData({
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });


            if (formData.image === "deleteImage")//delete image
            {
                res = await deleteMyImage();
            } else {
                if (selectedImage)
                    res = await setMyImage(selectedImage);

            }

            dispatch(setUser(res.user));
            console.log(formData.image);
            router.back();

            console.log("Form submitted", formData);
        } else {
            //use data layer setUserData ..
            await setUserData(userId, {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
            if (formData.image === "deleteImage")//delete image
            {
                await deleteUserImage(userId);
            } else {
                if (selectedImage)
                    await setImage(userId, selectedImage);

            }

            router.push("/users");
            router.refresh();
            console.log("khaled inside setUserData")
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <MUtypography
                variant="subtitle1"
                component="h2"
                sx={{ fontWeight: fonts.weight.bold }}
            >
                Edit information:
            </MUtypography>

            <div className="flex justify-center items-center gap-8">
                <UserAvatar src={formData.image} alt={formData.firstName} size={150} />
                <div className="flex flex-col items-center justify-center mb-4 gap-4">
                    <TextButton buttonType="full" type="button" onClick={triggerFileInput}>
                        Change Image
                    </TextButton>
                    <TextButton
                        buttonType="full"
                        type="button"
                        color="info"
                        onClick={() => {
                            setFormData({
                                ...formData,
                                ["image"]: "deleteImage",
                            });
                        }}
                    >
                        Delete Image
                    </TextButton>
                </div>
            </div>
            <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} id="hiddenFileInput"
                    style={{ display: 'none' }} />

                <InputField
                    label="First name: "
                    type="text"
                    name={"firstName"}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={formData.firstName}
                    labelBold
                ></InputField>

                <InputField
                    label="Last name: "
                    type="text"
                    name={"lastName"}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={formData.firstName}
                    labelBold
                ></InputField>
                <InputField
                    label="Email: "
                    type="email"
                    name={"email"}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={formData.firstName}
                    labelBold
                ></InputField>

                {/* {
                !removeChangePassword && <a href="#" style={{ color: colors.primary, fontWeight: fonts.weight.bold }}>Change password</a>
                } */}
                <div className="flex items-center justify-center mb-4 gap-4">
                    <TextButton buttonType="full" type="button" color="info" onClick={() => {
                        router.back();
                    }}>
                        Cancel
                    </TextButton>
                    <TextButton buttonType="full" type="submit">
                        Confirm
                    </TextButton>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
