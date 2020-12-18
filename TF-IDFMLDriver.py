##################################################
## Responsible for removing items that do NOT
##Pass our criteria. Using a term frequency
##inverse document frequency approach with
##token checking
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


import pymongo
import ssl; print(getattr(ssl, 'HAS_SNI', False))
from pprint import pprint
import Thefinishedanalyzer

##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client['trainSEDB']


def main():
    print(mydb)
    collist = mydb.list_collection_names()
    collist.remove('users')
    collist.remove('domains')
    collist.remove('threads')
    collist.remove('filteredlinks')
    #print(collist)

    for collection in collist:
        #print(collection)
        mycol = mydb[collection]
        items = mycol.find()
        for item in items:
            if (item['resourceType'] == "Article"):
                repostitory = item['repository']
                thread = item['threadTitle']
                link = item['resourceLink']
                Thefinishedanalyzer.testing(repostitory,thread,link)
                

    

if __name__ == "__main__":
    main() 
            
