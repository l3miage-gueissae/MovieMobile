import firestore from '@react-native-firebase/firestore';
import type { MiniComponent } from '../utils/models/miniComponent.model';
import { GoogleService } from '../Auth/google';

export interface doc {
    mail: string;
    shows: MiniComponent[]
}


export let User: any = null

//firestore

const FireBase: { store: doc | null } = { store: null }

export class UserService {



    private static saveUser = async () => {
        if (FireBase?.store)
            await firestore().collection('Users').doc(User?.uid).set(FireBase?.store)
    }

    public static setUser = async (user: any) => {
        //auth
        User = user
        //firestore
        const doc = await firestore().collection('Users').doc(User?.uid).get()
        if (!doc.exists) {
            FireBase.store = { mail: User?.uid, shows: [] }
            await this.saveUser()
        } else {
            FireBase.store = doc.data() as doc
        }

    }

    public static disconnectUser = async () => {
        FireBase.store = null
        await GoogleService.googleLogout()
   
    }

    public static likeShow = async (show: MiniComponent): Promise<boolean> => {
        if (this.connexionCheck()) {

            if (this.getShow(show) < 0 && FireBase.store) {
                FireBase.store.shows.unshift(show)
                return await this.saveUser().then(res => true)
                    .catch(err => false)
            }
            else {
                console.log('déjà like');
                return false
            }
        }
        return false

    }
    public static unLikeShow = async (show: MiniComponent): Promise<boolean> => {
        let indexToDelete: number = this.getShow(show)
        if (this.connexionCheck()) {
            if (indexToDelete >= 0 && FireBase.store) {
                FireBase.store.shows.splice(indexToDelete, 1)
                return await this.saveUser().then(res => true)
                    .catch(err => false)
            }
            else {
                console.log('pas like');
                return false
            }
        }
        return false

    }

    public static getShows = async () => {
        await this.firestoreCheck()
        return  FireBase.store?.shows || []
    }


    public static getShow = (show: MiniComponent): number => {
        return FireBase.store ? FireBase.store.shows.findIndex(e => e.id === show.id && e.type === show.type) : -5
    }

    private static connexionCheck = () => {
        const connected = User && User?.uid
        if (!connected)
            console.log('Utilisateur doit être connecté');
        return connected
    }

    public static firestoreCheck = async (): Promise<void> => {
        let countRejection = 0;
        return new Promise((resolve, reject) => {
            if (FireBase.store !== null) {
                resolve();
            } else {
                const checkVariable = setInterval(() => {
                    countRejection++
                    if (FireBase.store !== null) {
                        clearInterval(checkVariable);
                        resolve();

                    }
                    if (countRejection > 4) {
                        clearInterval(checkVariable);
                        // reject()
                        reject() // it is actually reject
                    }
                }, 1000);
            }
        })

    }
}