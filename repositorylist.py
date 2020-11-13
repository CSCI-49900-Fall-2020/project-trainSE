import pymongo
from pprint import pprint
import ssl; print(getattr(ssl, 'HAS_SNI', False))


##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client['trainSEDB']


def make_discipline(thenames):
    this_here = thenames[1]["disciplineTitle"]
    return this_here

def discipline_Link(thenames):
    this_here = thenames[1]["disciplineLink"]
    return this_here


def create_repository_list(collection):
    empty_array = []
    for items in collection:
        dict_obj = {
                'repository':items['repository'],
                'repoLink':items['repositoryLink']}
        
        #if items['repository'] not in empty_array:
        if dict_obj not in empty_array:
            
            empty_array.append(dict_obj)
            #empty_array.append(items['repository'])
        #print(empty_array)
    return empty_array

def main():
    collist = mydb.list_collection_names()
    collist.remove('users')
    collist.remove('domains')
    collist.remove('threads')
    collist.remove('repositories')
    mydb.repositories.delete_many({})
    for collection in collist:
        mycol = mydb[collection]
        ##rturns just discipline title and repository
        thenames = mycol.find({},{"disciplineTitle":1,"disciplineLink":1, "repository":1, "repositoryLink":1 ,"_id":0})
         
        discipline = make_discipline(thenames)
        
        discipline_link = discipline_Link(thenames)
        
        #print(thenames[2])
        this_is_it =create_repository_list(thenames)
        #print(this_is_it)
        this_is_it.remove({'repository': '', 'repoLink': ''})
        print(this_is_it)
        ###Debug line ####
        #print("The discipline: ",discipline,"Repositories in the discipline: ",this_is_it)
        #####
        dict_object = {
            'discipline': discipline,
            'disciplineLink':discipline_link,
            'repositories': this_is_it
            }
        
        result = mydb.repositories.insert_one(dict_object)
        print(result)
        

    #cur = mycol.find({},{__id:0})
    #print(mydb.languages.find({},{"repository":1,"_id":0})[2])
    


     
     

if __name__ == "__main__":
    main()
