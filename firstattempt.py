from bs4 import BeautifulSoup
import urllib.request
import nltk
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from nltk.tokenize import word_tokenize

####Global variables -> last day checked, so resources submitted after a certain day + time
####will be checked

def getlinktext(url):
    parser = 'html.parser' # or 'lxml' (preferred) or 'html5lib', if installed 
    #link = urllib.request.urlopen(url)
    link=urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0'})
    infile=urllib.request.urlopen(link).read()
    #print(infile)
    data = infile.decode('ISO-8859-1') # Read the content as string decoded with ISO-8859-1
    #soup = BeautifulSoup(data, parser, from_encoding=data.info().get_param('charset'))
    soup = BeautifulSoup(data, parser)
    #print(soup.get_text())
    stringsoup = str(soup.get_text())
    return stringsoup



def workontext():
    stringsoup = getlinktext("https://www.w3schools.com/sql/sql_examples.asp")
    #tokenized_text=sent_tokenize(stringsoup)
    tokenized_text=word_tokenize(stringsoup)
    #print(tokenized_text)
    stop_words=set(stopwords.words("english"))
    filtered_sent=[]
    for w in tokenized_text:
        if w not in stop_words:
            filtered_sent.append(w)
    fdist = FreqDist(filtered_sent)
    print(tokenized_text)
    print(fdist.most_common(5))
    
    
    #print(tokenized_text)


workontext()
#stop_words=set(stopwords.words("english"))
#print(stop_words)
