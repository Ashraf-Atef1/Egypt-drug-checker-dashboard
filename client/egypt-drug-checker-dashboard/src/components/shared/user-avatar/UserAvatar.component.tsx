import { Avatar } from "@mui/material";
import { type IuserAvatar } from "./UserAvatar.model";
import Image from "next/image";
import goldenFrame from "@/assets/images/frame1.png";
import silverFrame from "@/assets/images/frame2.png";

// TODO: Use frameSrc to the image
export default function UserAvatar({ src, frameName, alt, size }: IuserAvatar) {
	let currentFrame = null;
	if (frameName === "Golden frame") {
		currentFrame = goldenFrame;
	} else if (frameName === "Silver frame") {
		currentFrame = silverFrame;
	}
	console.log("currentsrc\n", src);
	return (
		<div
			className="relative flex items-center justify-center"
			style={{ width: `${size}px`, height: `${size}px` }}
		>
			<Avatar alt={alt} src={src} sx={{ width: "90%", height: "90%" }}>
				{alt.slice(0, 2).toUpperCase() ?? ""}
			</Avatar>
			{currentFrame && (
				<Image
					src={currentFrame}
					alt={alt}
					layout="fill"
					className="absolute top-0 left-0 w-full h-full scale-150"
				/>
			)}
		</div>
	);
}
