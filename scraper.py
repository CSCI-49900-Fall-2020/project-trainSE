from googleapiclient.discovery import build
import json
from pprint import pprint
import pymongo
import ssl; print(getattr(ssl, 'HAS_SNI', False))


##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client["trainSEDB"]
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
def add_to_db(listofitems,thread,repository,level):
    collist = mydb.list_collection_names()
    if "Thread_Collection" not in collist:
        mycol = mydb["Thread Collection"]
    empty_dict = {}
    for item in listofitems:
        empty_dict={
            'resourceTitle':item['title'],  #literal title from google
            'thread': thread,  #this is what u should change for each search
            'repository':repository,  #this 
            'level':level,     #this
            'link':item['link'],
            'rating':0,             
            'comments':[]           
        }
        result = mydb.Thread_Collection.insert_one(empty_dict)
        print(result.inserted_id)
        #print(item)

        

def main():
    print(mydb) #just check if its connected
    #returns an array with a dictionary inside

    ###
    #Depending how many search terms we have available, we can use this one or the one below
    ##if you only want to add 2 or 3, use this one below. If u have a large list
    ##in front of u , comment this out and uncomment out one below##

    search_term = input("enter a search variable:  ")

    thread_name = input("enter a thread name (Python Functions, C++ OOP): ")
    difficulty_level = input("enter a difficulty level (Beginner,Intermediate,Expert): ")
    repository_name = input("enter a repository name (Python,C++): ")

    first_search = google_searcher(search_term,my_api_key,my_cse_id)
    add_to_db(first_search,thread_name,difficulty_level,repository_name)

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

#for item in guess_check:
    #print(item['title'],item['link'])

##empty_dict = {}
##for item in guess_check:
##    empty_dict+={
##        'resourceTitle':item['title'],
##        'thread': "Functions",
##        'repository':"Python",
##        'level':"Beginner",
##        'link':item['link'],
##        'rating':0,
##        'comments':[]
##    }
##    print(item)
##    
##print(empty_dict)

##resourceTitle: "Conditionals Tutorial"
##thread: "Conditionals"
##repository: "Python"
##level: "Beginner"
##link: something.url
##rating: 4.0
##comments: [ ]


##
##for item in guess_check['items']:
##    print(item['title'],item['link'])


##
##def google_search(search_term, api_key, cse_id, **kwargs):
##    service = build("customsearch", "v1", developerKey=api_key)
##    res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()
##    return res
##
##result = google_search("Python functions tutorials", my_api_key, my_cse_id)
##for x in result["url"]:
##    print(x)

    
#pprint(result)
##data = result.json()
##for results in data['results']:
##    print(results['url'])

