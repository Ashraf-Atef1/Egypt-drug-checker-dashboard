import EditDrugForm from "@/components/edit-drug-form/EditDrugForm.component";
import { getDrugData } from "@/lib/api/edit-drug/editDrug.route";

export default async function EditDrug({
	searchParams,
}: {
	searchParams: { tradeName: string };
}) {
	const {
		data: [
			{
				tradeName,
				genericName,
				pharmacology,
				route,
				company,
				moreInformation: description,
			},
		],
	} = await getDrugData(searchParams.tradeName);
	return (
		<EditDrugForm
			tradeName={tradeName}
			genericName={genericName}
			pharmacology={pharmacology}
			route={route}
			company={company}
			description={description}
		/>
	);
}
