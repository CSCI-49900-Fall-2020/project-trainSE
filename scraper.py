from googleapiclient.discovery import build
import json
from pprint import pprint
import pymongo
import ssl; print(getattr(ssl, 'HAS_SNI', False))


##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client['trainSEDB']
#print(mydb)
#print(client.list_database_names())

#searchenginestuff
my_api_key = "AIzaSyA8ipaAKobz5-EYwY1rUHsL5cIgTsD2h5Q"
my_cse_id = "6748c9bbbc3e0e2da"


#initial google search function, returns top 20 results
def google_searcher(search_term,api_key,searchengine_id):
    first_results = build("customsearch", "v1", developerKey=api_key).cse()
    returnme=[]
    for i in range(1,20,10):
        results = first_results.list(q=search_term,cx=searchengine_id,start=i).execute()
        returnme+=results['items']
    return returnme ##returns array with returnme['title']['link']



#adds to mongodb 
def add_to_db(listofitems,thread,repository,level,searchterm,collectionname):
    collist = mydb.list_collection_names()
    if collectionname in collist:
        print(collist)
        mycol = mydb[collectionname]


    #BIG DEBUG LINE
##    mycol.insert_one({
##            'resourceTitle':'aye',  #literal title from google
##            'thread':'' ,  #this is what u should change for each search
##            'repository':'',  #this 
##            'level':'',     #this
##            'link':'',
##            'rating':0,             
##            'comments':[],
##            'search term':''
##        })
    #BIG DEBUG LINE
        
    #current_collection = str(collectionname)
    #print(collectionname)
##    if "architectures" not in collist: 
##        mycol = mydb["architectures"]
##    else:
##        mcol = mydb["architectures"]

        
    empty_dict = {}
    #mycol = mydb[str(current_collection)]
    for item in listofitems:
        empty_dict={
            'resourceTitle':item['title'],  #literal title from google
            'thread': thread,  #this is what u should change for each search
            'repository':repository,  #this 
            'level':level,     #this
            'link':item['link'],
            'rating':0,             
            'comments':[],
            'search term':searchterm
        }
        #mcol = mydb["architectures"]
        result = mycol.insert_one(empty_dict)
        print(result.inserted_id)
##        #print(item)

        

def main():
    print(mydb) #just check if its connected
    #returns an array with a dictionary inside

    ###
    #Depending how many search terms we have available, we can use this one or the one below
    ##if you only want to add 2 or 3, use this one below. If u have a large list
    ##in front of u , comment this out and uncomment out one below##

    search_term = input("enter a search variable:  ")
    collection_name= input("enter the discipline: ") #this will be theories, maths, etc 
    thread_name = input("enter a thread name (Python Functions, C++ OOP): ")
    difficulty_level = input("enter a difficulty level (Beginner,Intermediate,Expert): ")
    repository_name = input("enter a repository name (Python,C++): ")

    #collection = mydb[collection_name]
    #print(collection)
    #print(str(collection_name))
    first_search = google_searcher(search_term,my_api_key,my_cse_id)
    collist = mydb.list_collection_names()
    if collection_name not in collist:
        mydb[collection_name].insert_one({
                'resourceTitle':'',  #literal title from google
                'thread':'' ,  #this is what u should change for each search
                'repository':'',  #this 
                'level':'',     #this
                'link':'',
                'rating':0,             
                'comments':[],
                'search term':''
            })
    add_to_db(first_search,thread_name,repository_name,difficulty_level,search_term,collection_name)



    #mydb[collection_name].insert_one({'yo': 'hello'})
    #print(mydb.list_collection_names())



    
##    x = 100
##    for i in range(100):
##        print("You have: ",x," searches left. Watch out for that search engine cap!")
##        search_term = input("enter a search variable:  ")
##        thread_name = input("enter a thread name (Python Functions, C++ OOP): ")
##        difficulty_level = input("enter a difficulty level (Beginner,Intermediate,Expert): ")
##        repository_name = input("enter a repository name (Python,C++): ")
##        
##        first_search = google_searcher(search_term,my_api_key,my_cse_id)
##        add_to_db(first_search)
##        x-=1
        

     

if __name__ == "__main__":
    main()







