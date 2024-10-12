export interface IstoreItem {
	title: string;
	coins: number;
	children: React.ReactNode;
	buttonValue: string;
	onClick: () => void;
}
