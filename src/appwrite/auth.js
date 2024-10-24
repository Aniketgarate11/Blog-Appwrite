import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
  }

  // to create an Account
  async createAccount({ email, password , name}){
    try {
         const userAccount = await this.account.create(ID.unique(), email , password);

         if (userAccount) {

            // return userAccount
            //call another method to create and login at creation
            return this.login(email,password)
            
         } else {
             return userAccount
         }
        
    } catch (error) {
        console.log(" Appwrite Service :: createAccount :: error", error)
    }
  }
 
  // to login 
  async login({email , password}){
    try {

       return await this.account.createEmailPasswordSession(email , password)
        
    } catch (error) {
        console.log(" Appwrite Service :: loginAccount :: error", error)
        
    }
  }

  //to check if user is authorized i.e loged in or not
  async checkAuthenticationState(){
    try {
        return this.account.get()
        
    } catch (error) {
        console.log(" Appwrite Service :: checkAuthenticationState :: error", error)
    }

    return null; 
  }

  async logout(){
    try {
        return this.account.deleteSessions()
        
    } catch (error) {
        console.log(" Appwrite Service :: logout :: error", error)
    }
  }
}

const authService = new AuthService();

export default authService;
