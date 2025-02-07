import { User } from "../models/user";
import { genSaltSync, hashSync } from "bcrypt-ts";
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

export const authUsers = async (e: String, p: String) => {
  try{
    let verify = await User.find({
      email: e,
    });
    console.log(verify)
    if(verify.length > 0){
      let t = await bcrypt.compare(p, verify[0].password)
      if(!t){
        return { error : "Пароль не верный!" }
      }
    } else {
      return { error : "Пользователь не найден!" }
    }
    let token = await jwt.sign({ email: e }, 'sh'); 
    console.log(token)
      return token
    } catch(e){
      console.error(e)
    }
}

export const authenticateUser = async (token: String) => {
  let decoded = await jwt.verify(token, 'sh');
  try{ 
    return await User.find({
      email: decoded.email,
    }, {
      name: 1,
      email: 1,
      role: 1
  }).sort({_id:-1});

  } catch(e){
    console.error(e)
  }
}

export const createUser = async (n: String, e: String, p: String, r: String) => {

    try{
        const v = await User.find({ email : e })
        if(v.length > 0){
          return { error : "Такой пользователь уже есть!" }
        } else {
          let hash = await bcrypt.hash(p.toString(),10)
          const user = new User({
            name : n,
            email: e,
            password: hash,
            role: r,
          });
          await user.save();
          let token = await jwt.sign({ email: e }, 'sh');
          return  token;
        }
    } catch(e){
      console.error(e)
    }
  }

export const getUsers = async () => {
    try{ 
      return await User.find({}, {
        name: 1,
        email: 1,
        role: 1
    }).sort({_id:-1});
    } catch(e){
      console.error(e)
    }
}
export const deleteUser = async (id: string | undefined) => {
    try{ 
      return await User.find({ '_id' : id }).remove().exec();
    } catch(e){
      console.error(e)
    }
  }