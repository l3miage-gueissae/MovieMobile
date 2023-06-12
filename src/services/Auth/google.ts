import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const googleConfiguration = () => {
    GoogleSignin.configure({
        webClientId: '564064001500-d342vg9cicmp631n64sfk69p4a9cnt0s.apps.googleusercontent.com',
    });
}


export const googleLogin = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}