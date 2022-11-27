import {HiExclamation} from 'react-icons/hi';

interface TostProps {
	errorMessage: string;
}

export function Toast({errorMessage}: TostProps) {
	return (
		<div id="toast-warning" className="absolute top-5 right-2 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-50 shadow dark:bg-red-500 dark:text-gray-50" role="alert">
			<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg dark:bg-red-700 ">
				<HiExclamation size={25} />
			</div>
			<div className="ml-3 text-sm font-normal">{errorMessage}</div>
		</div>
	);
}
