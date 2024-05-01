import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const GetInternetStatus = () => {
    const [isConnected, setConnected] = useState(true);
    useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setConnected(state.isConnected);
			if (!state.isConnected) {
				showAlert();
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const showAlert = () => {
		Alert.alert(
			'Internet Connection',
			'You are offline. Some features may not be available.'
		);
	};

}

export default GetInternetStatus;