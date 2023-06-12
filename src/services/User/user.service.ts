import firestore from '@react-native-firebase/firestore';
import type { MiniComponent } from '../utils/models/miniComponent.model';

export interface doc {
    mail: string;
    shows: MiniComponent[]
}
//auth
export let User: any = undefined
//firestore
let FirestoreUser: doc | undefined = undefined

const saveUser = async () => {
    if (FirestoreUser)
        await firestore().collection('Users').doc(User.uid).set(FirestoreUser)
}

export const setUser = async (user: any) => {
    //auth
    User = user
    //firestore
    const doc = await firestore().collection('Users').doc(User.uid).get()
    if (!doc.exists) {
        FirestoreUser = { mail: User.uid, shows: [] }
        saveUser()
    } else {
        FirestoreUser = doc.data() as doc
    }
}

export const likeShow = async (show: MiniComponent): Promise<boolean>=> {
    if (connexionCheck()) {
        
        if (getShow(show) < 0 && FirestoreUser) {
            FirestoreUser.shows.push(show)
            return await saveUser().then(res => true)
                .catch(err => false)
        }
        else {
            console.log('déjà like');
            return false
        }
    }
    return false

}
export const unLikeShow = async (show: MiniComponent): Promise<boolean>=> {
    let indexToDelete:number = getShow(show)    
    if (connexionCheck()) {
        if (indexToDelete >= 0 && FirestoreUser) {
            FirestoreUser.shows.splice(indexToDelete,1)
            return await saveUser().then(res => true)
                .catch(err => false)
        }
        else {
            console.log('pas like');
            return false
        }
    }
    return false

}

export const getShows = () => {
    return FirestoreUser?.shows || []
}

export const getShow = (show: MiniComponent):number => {
    return  FirestoreUser? FirestoreUser.shows.findIndex(e => e.id === show.id && e.type === show.type) : -5
}

const connexionCheck = () => {
    const connected = User && User.uid
    if (!connected)
        console.log('Utilisateur doit être connecté');
    return connected
}
