import AdminUserCreateUserButton from "../../components/AdminUserCreateUserButton";
import { UserTableList } from "../../components/AdminUserTable";
import AppPage from "../../layouts/AppPage";

export default function AdminUserListPage() {
	return <AppPage title="Users" content={<UserTableList />} actions={[<AdminUserCreateUserButton key={1}/>]} />;
}
