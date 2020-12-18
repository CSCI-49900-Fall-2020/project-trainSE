##################################################
## Responsible for working on filtering youtube resources
##as of 3 or 4 months ago youtube made it impossible to scrape
##likes , comments, and views with Beautiful soup and scrapy.
##using the yotuube API costs a query and it has even less than
## the google queries so it limits the amount of videos i can actually check
##and gives me an error again after. 
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



##import requests, json, re
##import pprint
##h = {
##    'Host': 'www.youtube.com',
##    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0',
##    'Accept': '*/*',
##    'Accept-Language': 'en-US,pt;q=0.7,en;q=0.3',
##    'Referer': 'https://www.youtube.com/watch?v=eiRtB7CTxkI',
##}
##u = "https://www.youtube.com/watch?v=eiRtB7CTxkI"
##html = requests.get(u, headers=h).text
##file1 = open("MyFile.txt","a")
##file1.write(html)
###print(html)
### lets get the json object that contains all the info we need from the source code and convert it into a python dict that we can use later
##matches = re.findall(r'window\["ytInitialData"\] = (.*\}\]\}\}\});', html, re.IGNORECASE | re.DOTALL)
##print(matches)
##if matches:
##    j = json.loads(matches[0])
##    # browse the json object and search the info you need : https://jsoneditoronline.org/#left=cloud.123ad9bb8bbe498c95f291c32962aad2
##    # We are now ready to get the the number of subscribers (among other info):
##
##    subscribers = j['header']['c4TabbedHeaderRenderer']['subscriberCountText']['runs'][0]["text"]
##    print(subscribers)
##    # 110 subscribers
import requests
from bs4 import BeautifulSoup
url = 'https://www.youtube.com/watch?v=eiRtB7CTxkI'
url2 = 'https://www.youtube.com/user/tseries'
page = requests.get(url)
page2 = requests.get(url2)
print(page)
soup = BeautifulSoup(page.text, "html.parser")
soup2 = BeautifulSoup(page2.text, "html.parser")
pew = soup.findAll("a") #, {"class": "yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip"})
#tseries = soup2.findAll(“span”, {“class”: “yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip”})
print(pew[0])
#for subs in pew:
  #print(subs.get_text())
