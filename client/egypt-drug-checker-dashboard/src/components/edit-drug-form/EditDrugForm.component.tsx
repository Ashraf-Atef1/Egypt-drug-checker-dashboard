"use client"
import { Typography as MUtypography } from "@mui/material";
import { useState, useMemo, Fragment } from "react";
import { fonts } from "@/utils/theme/fonts";
import { type IeditDrugForm, type IeditDrugFormData } from "./EditDrugForm.model";
import colors from "@/utils/theme/colors";
import Field from "./field/Field.component"
import Input from "../shared/input/Input.component";
import { editDrugData } from "@/lib/api/edit-drug/editDrug.route";
import TextButton from "../shared/text-button/TextButton.component";
import { useRouter } from "next/navigation";
const EditDrugForm = ({
    tradeName,
    genericName,
    pharmacology,
    route,
    company,
    description
}: IeditDrugForm) => {
    const router = useRouter();
    const genericNameArray = useMemo(() => genericName.split('+'), [genericName]);

    const [formData, setFormData] = useState<IeditDrugFormData>({
        tradeName,
        genericName: genericNameArray,
        pharmacology,
        route,
        company,
        moreInformation: description
    });
    function constructDrugEditSuggestion() {
        const drugEditSuggestion = {
            ...formData,
            genericName: formData.genericName.join('+'),
        };

        const { tradeName, ...otherFields } = drugEditSuggestion;

        return {
            tradeName: tradeName,
            suggestion: { ...otherFields }
        };
    }
    function goToPreviousReviewPage()
    {
       // router.push('/review/1');
       router.back();
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const drugEditSuggestion = constructDrugEditSuggestion();
        editDrugData(drugEditSuggestion);
       // console.log(drugEditSuggestion);
        goToPreviousReviewPage();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Check if the input belongs to the "genericName" array
        if (name.startsWith('genericName')) {
            const index = parseInt(name.replace('genericName', ''), 10);

            // Update the specific index within the genericName array
            setFormData((prevFormData) => {
                const updatedGenericNames = [...prevFormData.genericName];
                updatedGenericNames[index] = value; // Update the value at the specific index
                return {
                    ...prevFormData,
                    genericName: updatedGenericNames,
                };
            });
        } else {
            // For other inputs, update as usual
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <MUtypography
                variant="subtitle1"
                component="h2"
                sx={{ fontWeight: fonts.weight.bold }}
            >
                Edit the drug information:
            </MUtypography>

            <form
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit}
            >
                <Field label="Trade name: ">
                    <Input
                        type="text"
                        name="tradeName"
                        value={formData.tradeName}
                        onChange={handleInputChange}
                        readonly
                    />
                </Field>



                <Field label="Generic name: ">
                    <div className="flex gap-4 flex-wrap">
                        {formData.genericName.map((value, index) => (
                            <Fragment key={index}>
                                <div>
                                    <Input
                                        type="text"
                                        inputType="contained"
                                        name={`genericName${index}`}
                                        value={value}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* Only add the "+" separator if it's not the last item */}
                                {index < formData.genericName.length - 1 && (
                                    <MUtypography sx={{ fontWeight: fonts.weight.extraBold, color: colors.primary }}>+</MUtypography>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </Field>
                <Field label="Pharmacology: ">
                    <Input
                        type="text"
                        name="pharmacology"
                        value={formData.pharmacology}
                        onChange={handleInputChange}
                    />
                </Field>

                <Field label="Route: ">
                    <Input
                        type="text"
                        name="route"
                        value={formData.route}
                        onChange={handleInputChange}
                    />
                </Field>


                <Field label="Company: ">
                    <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                    />
                </Field>


                <Field label="Description: ">
                    <Input
                        type="text"
                        name="moreInformation"
                        value={formData.moreInformation}

                        onChange={handleInputChange}
                        textarea
                    />
                </Field>

                <div className="flex items-center justify-center mb-4 gap-4">
                    <TextButton
                        buttonType="full"
                        type="button"
                        color="info"
                        onClick={()=>{
                            goToPreviousReviewPage();
                        }}
                    >
                        Cancel
                    </TextButton>
                    <TextButton
                        buttonType="full"
                        type="submit"
                    >
                        Confirm
                    </TextButton>

                </div>
            </form>
        </div >
    );
};

export default EditDrugForm;
