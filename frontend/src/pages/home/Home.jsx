import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";


const Home = () => {
	return (
		<>
		
		<div className='flex sm:h-[450px] md:h-[550px] p-2  w-full justify-between rounded-lg overflow-hidden  bg-clip-padding '>
			<Sidebar />
			<MessageContainer />
		</div>
		</>
	);
};
export default Home;
