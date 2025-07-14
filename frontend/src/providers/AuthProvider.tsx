import { useAuth } from "@clerk/clerk-react";
import { Disc3} from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken, userId } = useAuth();
	const [loading, setLoading] = useState(true);

    useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken();
				updateApiToken(token);

			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();
	}, [getToken, userId]);

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Disc3 className='size-10 text-purple-400 animate-spin' />
			</div>
		);

	return <>{children}</>;
};
export default AuthProvider;