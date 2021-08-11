import React, { useEffect, useState } from 'react';
import { XCircleIcon, ViewGridIcon, MinusIcon } from '@heroicons/react/outline';

function App() {
	const [isOpen, setOpen] = useState(false);
	const [isSent, setSent] = useState(false);

	const [fromMain, setFromMain] = useState<string | null>(null);

	const handleToggle = () => {
		if (isOpen) {
			setOpen(false);
			setSent(false);
		} else {
			setOpen(true);
			setFromMain(null);
		}
	};
	const sendMessageToElectron = () => {
		window.Main.sendMessage('message', "Hello I'm from React World");
		setSent(true);
	};

	useEffect(() => {
		if (isSent)
			window.Main.on('message', (fromMain: string) => {
				setFromMain(fromMain);
			});
	}, [fromMain, isSent]);
	const CloseApp = () => {
		window.Main.sendMessage('closeApp', 'true');
	};
	const maximize = () => {
		window.Main.sendMessage('maximize', 'true');
	};
	const minimize = () => {
		window.Main.sendMessage('minimize', 'true');
	};

	return (
		<div className=' flex flex-col items-center h-screen'>
			{/* Title bar */}
			<div className='drag bg-gray-900 h-8 flex w-full  justify-end items-center'>
				<button
					onClick={minimize}
					className='no-drag h-4 w-4 mr-1 '
					title='minimize'>
					<MinusIcon className='h-4 w-4 text-gray-600 hover:text-blue-500' />
				</button>
				<button
					onClick={maximize}
					className='no-drag h-4 w-4 mr-1 '
					title='maximize'>
					<ViewGridIcon className='h-4 w-4 text-gray-600 hover:text-blue-500' />
				</button>
				<button
					onClick={CloseApp}
					className='no-drag h-4 w-4 mr-1'
					title='close'>
					<XCircleIcon className='h-4 w-4 text-gray-600 hover:text-red-500' />
				</button>
			</div>

			<div className='bg-gray-800 h-full flex w-full flex-col justify-center items-center space-y-4'>
				<h1 className='text-2xl text-gray-200'>
					Vite + React + Typescript + Electron + Tailwind
				</h1>
				<button
					className='bg-yellow-400 py-2 px-4 rounded focus:outline-none shadow hover:bg-yellow-200'
					onClick={handleToggle}>
					Click Me
				</button>
				{isOpen && (
					<div className='flex flex-col space-y-4 items-center'>
						<div className='flex space-x-3'>
							<h1 className='text-xl text-gray-50'>
								💝 Welcome 💝, now send a massage to the Main 📩📩
							</h1>
							<button
								onClick={sendMessageToElectron}
								className=' bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300'>
								Send
							</button>
						</div>
						{isSent && (
							<div>
								<h4 className=' text-green-500'>Massage sent!!</h4>
							</div>
						)}
						{fromMain && (
							<div>
								{' '}
								<h4 className=' text-yellow-200'>{fromMain}</h4>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
