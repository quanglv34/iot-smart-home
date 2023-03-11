function AppPage({ title, actions, content, children }) {
	return <div className="mx-auto max-w-4xl py-16">{children}</div>;
}

function Header({ children }) {
	return (
		<div className="mb-8 flex flex-row items-center justify-between">
			{children}
		</div>
	);
}

function HeaderActions({ children }) {
	return <div className="grid grid-flow-col gap-2 self-start">{children}</div>;
}

function HeaderTitle({ title, children }) {
	return (
		<>
			{title && (
				<h1 className="block text-4xl font-bold capitalize items">{title}</h1>
			)}
			{children}
		</>
	);
}

AppPage.Header = Header
AppPage.HeaderActions = HeaderActions;
AppPage.HeaderTitle = HeaderTitle;

export default AppPage
