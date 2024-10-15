import { getUserData } from "@/lib/api/profile/profile.router";

import EditProfileForm from "@/components/edit-profile-form/EditProfileForm.component"
export default async function EditProfile({
	params: { userId },
}: {
	params: { userId: string };
}){
    //need endpoint to get userdata from userId
    const {userData} = await getUserData(userId);
    console.log("khaled inside EditProfile")
   console.log(userData);
    // return <p>{userId}</p>
    return <EditProfileForm
        userId={userData.user.userId}
        firstName={userData.user.firstName}
        lastName={userData.user.lastName}
        email={userData.user.email}
        image={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user-image/${userData.user.userImage}`}
    />
 
}

