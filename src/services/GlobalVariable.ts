export const APIurl = 'https://api.themoviedb.org/3'
export const APItoken = '3bbc79e4d8b6b486a77f1b2e36797ff8'
export const APIbackroundImage = 'https://image.tmdb.org/t/p'


export let APPlanguage: 'fr-FR' | 'en' = 'fr-FR'
export let LocationUser: 'FR' | 'EN' = 'FR'





export type responseSuccess<T> = {success:true,data:T} | {success:false, codeError:number, error:string}