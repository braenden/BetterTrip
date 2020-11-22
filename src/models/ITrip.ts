import IComment from "./IComment";

interface IPost {
    id: number;
    title: string;
    description: string;
    username: string;
    user: {
        display_name: string;
    }
    //likes: number;
    //comments?: IComment[];

}

export default IPost;