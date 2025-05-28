// import Footer from "@/common/layout/footer";
import TopHeader from "@/components/layouts/topHeader";

export default function CommonLayout({ children }) {
console.log( children)
	return (
		<>
			<TopHeader />
			{/* <MainHeader isMobile={children.props.isMobile} /> */}
			{children}
			{/* {process.env.NEXT_PUBLIC_BRAND_NAME == "fastrack" ? (
				<FtFooter isMobile={children.props.isMobile} />
			) : (
				<Footer />
			)} */}
		</>
	);
}
