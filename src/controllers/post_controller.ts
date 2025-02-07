import { Post } from "../models/post";

export const createPost = async (n: String, d: String) => {

    try{
          const post = new Post({
            name : n,
            likes: [],
            desc: d,
            status: 'created',
          });
          await post.save();
          return  await post.save();
    } catch(e){
      console.error(e)
    }
  }

export const getUsers = async () => {
    try{ 
      return await Post.find({}).sort({_id:-1});
    } catch(e){
      console.error(e)
    }
}