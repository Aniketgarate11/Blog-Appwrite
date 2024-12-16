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
      return true
        
    } catch (error) {
        console.log(" Appwrite Service :: deletePost :: error", error);
        return false;
    }
  }

  //for getting a single post
  async getPost(slug){
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log(" Appwrite Service :: getPost :: error", error);
            return false;
        }
  }

  //get list of documents
  //passing the default query that gets posts that are "active"
  async getPosts(query = [Query.equal("status" , "active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            query
        )
        
        
    } catch (error) {
        console.log(" Appwrite Service :: getPosts :: error", error)
        return false;
    }
  }


  //file upload Methods

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(" Appwrite Service :: uploadFile :: error", error);
        return  false;
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log(" Appwrite Service :: deleteFile :: error", error);
        return false;
    }
  }

  //fast respone no async await
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
  }
}

const service = new Service();

export default service;
