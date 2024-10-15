import { getMyData } from "@/lib/api/profile/profile.router";
import EditProfileForm from "@/components/edit-profile-form/EditProfileForm.component"
export const dynamic = 'force-dynamic'

export default async function EditProfile() {

    //chore: get from redux
    const {
        userData: { user },
    } = await getMyData();
    return <EditProfileForm
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        image={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user-image/${user.userImage}`}
    />
}
