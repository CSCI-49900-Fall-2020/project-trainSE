##################################################
## Responsible for removing items with -10 likes +
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

##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client['trainSEDB']

print(mydb)
collist = mydb.list_collection_names()
collist.remove('users')
collist.remove('domains')
collist.remove('threads')
collist.remove('filteredlinks')
print(collist)

for collection in collist:
    print(collection)
    mycol = mydb[collection]
    items = mycol.find()
    for item in items:
        #pprint(item)
        #print(item['likes'])
        totalLikes = item['likes']
        #print(totalLikes)
        if item['likes'] <= -10:
            current_item = item
            #print(current_item)
            mydb.filteredlinks.insert_one(current_item)
            deleted = mycol.delete_one(item)
            print(deleted)
            
            
            
