import type { media_type } from '../../Movie/model/trending.model'

export interface MiniComponent {
    picture:string,
    id:number,
    type: media_type // don't use ALL
}