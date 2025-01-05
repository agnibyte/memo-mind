import TopHeader from "@/common/layout/topHeader";

export default function CommonLayout({ children }) {
	console.log('heeeee')
	return (
		<>
			<TopHeader />
			{/* <MainHeader isMobile={children.props.isMobile} /> */}
			{children}
		</>
	);
}
