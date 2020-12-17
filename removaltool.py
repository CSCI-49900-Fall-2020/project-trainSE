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
    mycol = mydb[collection]
    items = mycol.find()
    for item in items:
        #pprint(item)
        #print(item['likes'])
        if item['likes'] <= -5:
            current_item = item
            mycol.delete_one(item)
            
            
            
