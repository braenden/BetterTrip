import IComment from "./IComment";

interface ITrip {
    id: number;
    title: string;
    description: string;
    image_filename: string;
    username: string;
    user: {
        display_name: string;
        id: string;
    }
    //likes: number;
    //comments?: IComment[];

}

export default ITrip;