"use client";
import PageCounter from "@/components/shared/page-counter/PageCounter.component";
import UserAvatar from "@/components/shared/user-avatar/UserAvatar.component";
import StoreItem from "@/components/store/store-item/StoreItem.component";
import DoctorUser from "@/assets/images/doctor-user.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { buyItem, getStoreItems, setFrame } from "@/lib/api/store/store.route";
import { type IstoreItem } from "./store.model";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/user/user.slice";

export default function StorePage() {
	const [storeItems, setStoreItems] = useState<IstoreItem[]>([]);
	const dispatch = useAppDispatch();
	const myData = useAppSelector((state) => state.user);
	useEffect(() => {
		getStoreItems().then((items) => setStoreItems(items.items));
	}, []);
	console.log("myData111", myData);
	const handelClick = async (itemId: string) => {
		const item = myData?.items?.find(
			(item: { _id: string }) => item._id === itemId
		);
		if (!item) {
			const { user } = await buyItem(itemId);
			dispatch(setUser(user));
		} else {
			if (item.type === "frame") {
				if (item.name !== myData?.currentFrame) {
					const { user } = await setFrame(item.name);
					dispatch(setUser(user));
				} else {
					const { user } = await setFrame("");
					dispatch(setUser(user));
				}
			}
		}
	};
	if (!myData) return <div>Loading...</div>;
	const getButtonValue = (itemId: string) => {
		const item = myData?.items?.find(
			(item: { _id: string }) => item._id === itemId
		);
		if (item) {
			if (item.type === "frame") {
				if (item.name !== myData?.currentFrame) {
					return "Use";
				} else {
					return "Remove";
				}
			} else {
				return "Owned";
			}
		} else {
			return "Buy";
		}
	};

	return (
		<section className="flex flex-col gap-6">
			<PageCounter title="Shop items" value={3} />
			<main className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
				{storeItems.map((item, index) => (
					<StoreItem
						key={index}
						title={item.name}
						coins={item.price}
						buttonValue={getButtonValue(item._id)}
						onClick={() => handelClick(item._id)}
					>
						{item.type === "frame" ? (
							<UserAvatar
								frameName={item.name}
								src={""}
								alt={String(myData?.firstName)}
								size={150}
							/>
						) : (
							<Image src={DoctorUser} alt={item.name} />
						)}
					</StoreItem>
				))}
			</main>
		</section>
	);
}
