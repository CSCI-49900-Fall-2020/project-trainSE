##################################################
## Responsible for acquiring initial resources
##A clone and an attempt to bypass the google Query limit for the day
## worked initially but now both say i've reached query limit regardless
##of time passed. Maybe google will limit IP for a week idk
###############################################
##################################################
## 
## Copyright: Not Applicable (Steal from me)
## Credits: God and the python docs
## License: 
## Version: 1.0.0
## Mmaintainer: None Required
## 
##################################################



from googleapiclient.discovery import build
import json
from pprint import pprint
import pymongo
import ssl; print(getattr(ssl, 'HAS_SNI', False))
from datetime import datetime


##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client['trainSEDB']
#print(mydb)
#print(client.list_database_names())

#searchenginestuff
my_api_key = "AIzaSyBi-mpG2ukWabhNfoMd-UAwSX3AfZRDD28"
my_cse_id = "3a76448f784c4928f"


#initial google search function, returns top 20 results
def google_searcher(search_term,api_key,searchengine_id):
    first_results = build("customsearch", "v1", developerKey=api_key).cse()
    returnme=[]
    for i in range(1,30,10):
        results = first_results.list(q=search_term,cx=searchengine_id,start=i).execute()
        returnme+=results['items']
    return returnme ##returns array with returnme['title']['link']

def fixformat(item):
    return item.replace(' ', '-').lower()

def linktype(links):
    if "youtube" in links:
        return "Video"
    return "Article"

#adds to mongodb 
def add_to_db(listofitems,thread,repository,level,searchterm,collectionname,real_title):
    collist = mydb.list_collection_names()
    if collectionname in collist:
        print(collist)
        mycol = mydb[collectionname]
        
    empty_dict = {}
    #mycol = mydb[str(current_collection)]
    for item in listofitems:
        empty_dict={
            'resourceTitle':item['title'],  #literal title from google
            'resourceLink':item['link'],
            'resourceType':linktype(item['link']),
            'threadTitle': thread,  #this is what u should change for each search
            'threadLink':fixformat(thread) ,
            'repository':repository,  #this 
            'repositoryLink':fixformat(repository),
            'difficultyLevel':level,     #this
            'disciplineTitle': real_title,
            'disciplineLink':fixformat(real_title),
            'rating':0,
            'likes':0,
            'submittedWhen':"December 13 2020 at 5:58 PM",
            'submittedBy':"Open REsource",
            'likedBy':[],
            'comments':[],
            'timestamp':datetime.utcnow(),
            'search term':searchterm
        }
        #mcol = mydb["architectures"]
        result = mycol.insert_one(empty_dict)
        print(result.inserted_id)
##        #print(item)

        

def main():
    print(mydb) #just check if its connected
  #  mydb.algorithmanddatastructures.delete_many({})
    #returns an array with a dictionary inside
##    mydb.architectures.delete_many({})
##    mydb.databases.delete_many({})
##    mydb.languages.delete_many({})
##    mydb.algorithmanddatastructures.delete_many({})
##    mydb.artificalintelligences.delete_many({})
##    mydb.mathematics.delete_many({})
##    

    ###
    #Depending how many search terms we have available, we can use this one or the one below
    ##if you only want to add 2 or 3, use this one below. If u have a large list
    ##in front of u , comment this out and uncomment out one below##

    search_term = input("enter a search variable:  ")
    #collection_name= input("enter the discipline(algorithmanddatastructures,architectures,databases,languages,mathematics: ") #this will be theories, maths, etc 
    thread_name = input("enter a thread name (Functions, OOP, conditionals): ")
    #difficulty_level = input("enter a difficulty level (Beginner,Intermediate,Expert): ")
    #repository_name = input("enter a repository name (Python,C++): ")
    #discipline_title = input("enter the disciple title")

    
    collection_name= "architectures"
    difficulty_level = "Beginner"
    repository_name = "x86"
    discipline_title = "Architecture"
        
    #collection = mydb[collection_name]
    #print(collection)
    #print(str(collection_name))
    first_search = google_searcher(search_term,my_api_key,my_cse_id)
    collist = mydb.list_collection_names()
    if collection_name not in collist:
        mydb[collection_name].insert_one({
                'resourceTitle':'',  #literal title from google
                'resourceLink':'',
                'resourceType':'',
                'threadTitle':'' ,  #this is what u should change for each search
                'threadLink':'' ,
                'repository':'',  #this 
                'repositoryLink':'',
                'difficultylevel':'',     #this
                'disciplineTitle':'',
                'disciplineLink':'',
                'rating':0,
                'likes':0,
                'submittedWhen':'',
                'submittedBy':'',
                'likedBy':[],
                'comments':[],
                'timestamp':datetime.utcnow(),
                'search term':'',
                
            })
    add_to_db(first_search,thread_name,repository_name,difficulty_level,search_term,collection_name,discipline_title)



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
        

     
while True:
        
    if __name__ == "__main__":
        main()

#print(datetime.now())
#x = datetime.datetime.now()
#print(x)
#print(datetime.utcnow())
#print(datetime.now(timezone.utc))



######UPDATING REPOSTITOIES QUICK
##collection = mydb['mathematics']
##
##myquery = { "repositoryLink":  "calculus-i"}
##newvalues = { "$set": { "repositoryLink": "calculus-1" } }
##collection.update_many(myquery, newvalues)

