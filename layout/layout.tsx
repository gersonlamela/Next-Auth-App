import styles from '../styles/Layout.module.css';
interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	return (
		<div className="flex h-screen bg-blue-400">
			<div className="m-auto bg-slate-50 rounded-md w-96 h-auto ">
				<div className="right flex flex-col justify-evenly ">
					<div className="text-center py-10">{props.children}</div>
				</div>
			</div>
		</div>
	);
}
