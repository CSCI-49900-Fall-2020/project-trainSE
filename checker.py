from bs4 import BeautifulSoup
import urllib.request
import pymongo
import ssl; print(getattr(ssl, 'HAS_SNI', False))
from requests_html import HTMLSession
from newspaper import Article


##mongodb stuff##
client = pymongo.MongoClient("mongodb+srv://admin-kareem:Hunter1000@cluster0-mkcpg.mongodb.net/trainSEDB?retryWrites=true&w=majority")
mydb = client['trainSEDB']

##more mongo stuff
#print(mydb)
collist = mydb.list_collection_names()
collist.remove('users')
collist.remove('domains')
collist.remove('threads')
collist.remove('filteredlinks')
#print(collist)
###


##i think i can keep this global
#parser = 'html.parser' # or 'lxml' (preferred) or 'html5lib', if installed 
#resp = urllib.request.urlopen("https://www.w3schools.com/python/python_variables.asp")

#soup = BeautifulSoup(resp, parser, from_encoding=resp.info().get_param('charset'))

#print(soup.get_text())
##for link in soup.find_all('a'):
##    print(link.get('href'))

def article(url):
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    #print(article.authors)
    print(article.keywords)
    #print(article.summary)
    
def articlecheck(resource):
    return "hi"

def videocheck(resource):
    vid_likes = []
    vid = urllib.request.urlopen(resource)
    soup = BeautifulSoup(vid, parser, from_encoding=vid.info().get_param('charset'))
    
    likes = soup.find("span", class_="like-button-renderer").span.button.text  
    print(likes)
    #print(soup)
    

def main():
    for collection in collist:
        mycol = mydb[collection]
        items = mycol.find()
        for item in items:
            if(item['resourceType'] == "Article"):
                #print(item['resourceLink'])
                article(item['resourceLink'])
                #continue
            elif(item['resourceType'] == "Video"):
                #print(item['resourceLink'])
                #videocheck(item['resourceLink'])
                continue
    
    

if __name__ == "__main__":
    main()

##def article(url):
##    article = Article(url)
##    article.download()
##    article.parse()
##    article.nlp()
##    print(article.authors)
##    print(article.keywords)
##    print(article.summary)
##    
##    
##
##article("https://realpython.com/python-variables/")


