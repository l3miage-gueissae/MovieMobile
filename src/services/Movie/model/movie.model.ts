
import type { genre } from "../../Genre/model/genre.model"
import type { loading } from "../../utils/models/loading.model"
import type { video } from "./video.model"
export interface Movie {
    id:number,
    imagesPath:loading<string[]>
    videos:loading<video[]>
    title:string
    description:string,
    category:loading<genre[]>,
    provider:loading<any[]>
    credits:loading<any[]>
    recomendation: loading<any[]>
    similarity: loading<any[]>
    opinions:loading<any[]>
    voteAverage:number
    state : string // new , soom , realesed ... pour plus tard
    // action 
    isLike:boolean
}