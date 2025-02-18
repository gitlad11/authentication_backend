import { onDecrypt } from "../helpers/decrypt";
import { onEncrypt } from "../helpers/encrypt";
import { Link } from "../models/link";
var jwt = require('jsonwebtoken');

export const onDecrypLink = async (link: string, password: string) => {
    try {
       let result = await onDecrypt(link, password);
       return result;
    } catch(e){
      console.log(e)
    }
} 

export const createLink = async (link: string, expire: number, password: string) => {
    console.log(expire)
    try{
        let encrypted = await onEncrypt(link, password);
        let token = await jwt.sign({ encrypted : encrypted }, 'sh', { expiresIn: `${expire}s` });
        let l:any = { url : encrypted,
                      token: token,
                      expiresAt : expire,
                      createdAt : Date(),
                      clickCount : 0,
                        password : password}
        const li = new Link(l);
        return await li.save();
    } catch(e){
      console.error(e)
    }
  }

export const getLink = async (l:any) => {
  try{
    let link =  await Link.findOne({ _id : l._id }, {
      url: 1,
      token: 1,
      createdAt: 1,
      expiresAt: 1,
      clickCount: 1,
      password: 1,
      });
    console.log(link)
    var d = await Link.updateOne({ _id : l._id }, { $inc: { clickCount: 1 } });
        
    let decr = await onDecrypLink(link.url, link.password);
    return decr;
  } catch (e){

  }
}

export const getLinks = async () => {
    try{ 
      let links = await Link.find({}, {
        url: 1,
        token: 1,
        createdAt: 1,
        expiresAt: 1,
        clickCount: 1
    }).sort({_id:-1});

    var l = await links.map(async (i:any, index: number) => {
      try{ 
        await jwt.verify(i.token, 'sh')}
      catch(e) { 
        i['expired'] = true
       }
       })

    await Promise.all([
      l
    ]);
    return links

    } catch(e){
      console.error(e)
    }
}

export const deleteLink = async (id: string | undefined) => {
    try{ 
      return await Link.find({ '_id' : id }).remove().exec();
    } catch(e){
      console.error(e)
    }
  }