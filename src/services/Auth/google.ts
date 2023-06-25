import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export class GoogleService {
    public static googleConfiguration = () => {
        GoogleSignin.configure({
            webClientId: '564064001500-d342vg9cicmp631n64sfk69p4a9cnt0s.apps.googleusercontent.com',
        });
    }
    
    
    public static googleLogin = async () => {       
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);        
        return auth().signInWithCredential(googleCredential);
    }
    
    public static googleLogout = async () => {
        await GoogleSignin.signOut()
    }  
}