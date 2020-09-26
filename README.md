# TrainSE: Training resources for software engineering projects

## Group Members
- Narvisha Sajjad
- Kareem Hussein
- Ingmar Fjolla
- Olenka Quispe Huanca
- Ismail El Baghdadi
- [Group Authored Details](https://github.com/CSCI-49900-Fall-2020/project-trainSE/wiki)

## Introduction
- The internet has become the new repertoire of indispensable information and open source education. The “Google it” phrase is easily the most recurrent answer to virtually any question. And with a quick search, the webpage is teeming with links, videos, articles, and images related to your search request. Regardless of Google’s most advanced algorithms scavenging for information related to one’s query, too much resources can be a bad thing. The end user must excavate the depths of the internet, performing a trial and error of which resources are actually beneficial. This issue worsens in the tech community where merely learning a new framework can be overwhelming due to the overabundance of extraneous tutorials.

- TrainSE would serve as a web app with repositories containing the most relevant, highly favorable resources and tutorials for beginner, intermediate, and experienced programmers. Unlike Stack Overflow being mainly used for debugging issues, TrainSE provides the tech community with a more efficient, streamlined way to self-learn. High quality software engineering resources are better organized than what Google generally presents to the webpage, resources are monitored by moderators, and there is higher accountability of quality in this age of tutorial culture. We hope this project can present a clear introduction of coding to beginners while more experienced users can receive quality, top tier information around advanced topics.

## List of features
- [Original Project Proposal](https://docs.google.com/document/d/1tGa5GxtLnlMOByaU7yLQRKUboxcACghlc5asTOULlHQ/edit)
- Web app will have a semi-automated functionality to populate resources
- Flexible search functionality - there should be some classification of the resources in the repository so that relevant resources are easy to find (search filtering algorithm is yet to be decided upon)
- The web app will maintain users
  - Users can range from admins to moderators to regular end users - each with their own permissions for updating materials
  - User’s profile page will present what domains of comp sci they are self-learning in
  - Maybe implement follower/following functionality (less similar to Instagram but more resemblent of Reddit’s architecture)
- Users can create repositories aka “threads in a specific domain of comp sci” and the resources specific to that thread will be located there
  - A Python repository can be categorized into beginning, intermediate, and advanced, and these repositories can be further expanded upon to hold specific resources and niche topics
- Ability to add new resources and create. This will be done by our “moderator” users. In theory we will have sections so for example in the python beginner section dealing with pandas- if a user submits a tutorial they believe is helpful, a moderator can look and approve it OR our automated tools can check depending on the type of tutorial it is
- Users can post comments detailing the effectiveness of the learning resources and allow for more discussion regarding how the resource may improve
- Possibly implement a rating system of the resources
  -  Resources whose ratings are below a certain threshold are at the risk of being deleted

## Test Plan
- Our web app has no means of quantitative data to accurately measure how useful it is to the computer science community. Aside from a rating system, there needs to be a more concise approach to test the practicality of TrainSE. One approach is to conduct a case study around novice programmers in computer science. We would present them with a typical entry level project in comp sci (mainly in the domain of web development): creating their own basic portfolio website. This obviously requires basic knowledge in HTML/CSS/JS. A control group would consist of beginners relying on search engines, such as Google, to scavenge for resources they find helpful and thorough enough to build their own website while having a basic understanding of the “under the hood” operations a browser performs to render their website. An experimental group would comprise of beginners relying on our TrainSE platform which is intended to neatly display applicable resources (videos, articles, links, images, etc.). We would then issue a survey to both groups describing their overall experience in using TrainSE versus a search engine, how quickly useful resources were found, and how clear/thorough said resources were. Clearly, we hypothesize that TrainSE surpasses search engines in the ability to find relevant, community approved comp sci resources.
- Note that our definition of relevant and useful is very specific. We believe that extraneous resources are plaguing the efficiency and confidence of the comp sci community. For instance, a comp sci student learning about interrupts for their OS course is encouraged to google and research. Although Google makes their best attempt to gather relevant resources, a lot of that information is heavily bogged down by OS-specific jargon and complex examples. Therefore, we define relevant as resources that are not only thorough, but are indexed by experience level so end users can progress the varying levels of complexity around interrupts.
