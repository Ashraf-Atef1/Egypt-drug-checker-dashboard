export interface IeditDrugForm {
    tradeName: string;
    genericName: string;
    pharmacology: string;
    route: string;
    company: string;
    description: string;
}

export interface IeditDrugFormData {
    tradeName: string;
    genericName: string[];
    pharmacology: string;
    route: string;
    company: string;
    moreInformation: string;
}

