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
from bs4 import BeautifulSoup
import urllib.request
import nltk
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords, treebank
from nltk.tokenize import word_tokenize
from collections import Counter
import random
import numpy
import re
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import csv
import os
from time import time

def wordprev(thing, key):
	return thing.get(key)

def genBOW(allwords):
	cnt = Counter()
	uniquewords = []
	for i in allwords:
		if i not in uniquewords:
			uniquewords.append(i)
	bag = numpy.zeros(len(uniquewords))
	for word in allwords:
		cnt[word]+=1
	z=0
	for item in uniquewords:
		bag[z] = cnt[item]/len(allwords)
		z+=1
	result = {uniquewords[g]:bag[g] for g in range(len(uniquewords))}
	return result

def identity_tokenizer(text):
    return text

def genwordlist(url):
	html = urllib.request.urlopen(url).read()
	soup = BeautifulSoup(html, 'html.parser')

	strips = list(soup.stripped_strings)
	print(strips)
	return strips

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

def workontext(items):
    #stringsoup = getlinktext("https://www.w3schools.com/sql/sql_examples.asp")
    #tokenized_text=sent_tokenize(stringsoup)
    tokenized_text=word_tokenize(items)
    return tokenized_text

def dothis(repository,thread,link):
        
        p = getlinktext("https://realpython.com/python-variables/")
        p = getlinktext(link)
        tokenized_text = workontext(p)
        #print(tokenized_text)


        vectorizer = TfidfVectorizer(analyzer='word', use_idf=True, tokenizer=identity_tokenizer, preprocessor=identity_tokenizer, token_pattern=None, stop_words=None, lowercase=False)
        X = vectorizer.fit_transform([tokenized_text])
        Xasarray = X.toarray()

        t0 = time()
        X_train = vectorizer.fit_transform(Xasarray)
        #duration = time() - t0
        #print("n_samples: %d, n_features: %d" % X_train.shape)
        #print("duration:  %d"  % duration)

        haha = genBOW(tokenized_text)
        print(haha)
        #for item,b in haha.items():
                #print(b)
        #labled_words = ([(word, 'good') for word in haha])
##        labled_words = ([(word, 'good') if float(b)>.01 else (word, 'bad') for word,b in haha.items()])
##        random.shuffle(labled_words)
##        print(labled_words)

#dothis()
def testing(repository,thread,link):
        dothis(repository,thread,link)
        #print(repository,thread,link)

        
##featuresets = [wordprev(haha,key) for haha,key in labled_words]
##
##train_set, test_set = featuresets[100:], featuresets[:100]
##classifier = nltk.NaiveBayesClassifier.train(train_set)
##
##print(classifier.classify(wordprev(haha,'SQL')))
##print(nltk.classify.accuracy(classifier, test_set))
##
## does not work anymore, link download is not working, model is incomplete
## 
##token = RegexpTokenizer(r'[a-zA-Z0-9]+')
##cv = CountVectorizer(lowercase=True,stop_words='english',ngram_range = (1,1),tokenizer = token.tokenize)
##text_counts= cv.fit_transform(data['Phrase'])
##clf = MultinomialNB().fit(X_train, y_train)
##predicted= clf.predict(X_test)
##print("MultinomialNB Accuracy:",metrics.accuracy_score(y_test, predicted))
