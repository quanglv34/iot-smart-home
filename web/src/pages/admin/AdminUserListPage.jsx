import { useQuery } from "@tanstack/react-query";
import { fetchListUsers } from "../../api/user";
import AdminUserCreateUserButton from "../../components/AdminUserCreateUserButton";
import { UserTableList } from "../../components/AdminUserTable";
import AppPage from "../../layouts/AppPage";

export default function AdminUserListPage() {
	const { data, isLoading, refetch } = useQuery(["users"], fetchListUsers);
	return (
		<AppPage>
			<AppPage.Header>
				<AppPage.HeaderTitle title={"Users"}></AppPage.HeaderTitle>
				<AppPage.HeaderActions>
					<AdminUserCreateUserButton key={1} refetch={refetch} />
				</AppPage.HeaderActions>
			</AppPage.Header>
			<UserTableList data={data} isLoading={isLoading} />
		</AppPage>
	);
}
