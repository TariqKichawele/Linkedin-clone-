import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";


const ProfilePage = () => {
    const { username } = useParams();

    const queryClient = useQueryClient();

    const { data: authUser } = useQuery({
        queryKey: ['authUser']
    });

    const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
        queryKey: ['userProfile', username],
        queryFn: async () => axiosInstance.get(`/users/${username}`),
    });

    const { mutate: updateProfile } = useMutation({
        mutationFn: async (updatedData) => {
            await axiosInstance.put("/users/profile", updatedData);
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries(['userProfile', username]);
        }
    });

    if(isUserProfileLoading) return null;
    
    const isOwnProfile = authUser.username === userProfile.data.username;
    const userData = isOwnProfile ? authUser : userProfile.data;

    const handleSave = (updatedData) => {
        updateProfile(updatedData)
    };

  return (
    <div className='max-w-4xl mx-auto p-4'>
		<ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
		<AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
		<ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
		<EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
		<SkillsSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
	</div>
  )
}

export default ProfilePage