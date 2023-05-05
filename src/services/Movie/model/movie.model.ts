
import type { loading } from "../../utils/models/loading.model"
export interface Movie {
    id:number,
    imagesPath:loading<string[]>
    videos:loading<any[]>
    description:string,
    category:loading<string[]>,
    provider:loading<any[]>
    people:loading<any[]>
    recomendation: loading<any[]>
    similarity: loading<any[]>
    opinions:loading<any[]>
}