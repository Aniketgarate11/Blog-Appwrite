import conf from "../conf/conf.js";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

      this.databases = new Databases(this.client)
      this.bucket = new Storage(this.client)
  }

  async createPost({title, slug, content, image, status, userId}){
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                image,
                status,
                userId
            }
        )
        
    } catch (error) {
        console.log(" Appwrite Service :: createPost :: error", error)
    }
  }

  async updatePost(slug,{title, content, image, status}){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                image,
                status
            }
        )
        
    } catch (error) {
        console.log(" Appwrite Service :: updatePost :: error", error)
    }
  }

  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
        
    } catch (error) {
        console.log(" Appwrite Service :: deletePost :: error", error);
        return false;
    }
  }
}

const service = new Service();

export default service;
