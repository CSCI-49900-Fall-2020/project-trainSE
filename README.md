Draft

# Open reSource Final Written Report

## Abstract

## Introduction

Whether it be contributing to an academic discussion or simply learning something new, everyone begins with a resource that supplies them with necessary background information. Finding that resource, however, is an arduous feat. Imagine navigating the maze of the Dewey Decimal System or tediously flip through thousands of pages in an encyclopedia without a guarantee that useful information will ever be found. Thankfully, the advent of the internet has revolutionized the way material is organized and shared, especially in academia.

Computer Science proves to be one of the most challenging majors offered by universities due to its abstract foundations and breadth/depth. But on the other side of the coin, it is also revered as the most open source discipline of study because of the tech community’s active collaboration and willingness to exchange knowledge. Just perform a tech-related search request on Google and your webpage is teeming with relevant links, videos, articles, and images. Yet, the aforementioned tedious page flipping is still evident in how one must perform a trial and error to find what they're actually looking for on the webpage. The first search result is sometimes a dense resource bogged down by jargon and complex phrasing that intimidates beginners. This issue worsens in the tech community where merely learning a new framework can be overwhelming due to extraneous tutorials that all teach the same thing. There lacks a platform that stores and moderates effective Computer Science resources and appeals to all experience levels.

Open reSource is a web app that would streamline how a techie moderates their self-learning by only presenting the best learning materials that other techie’s have found tremendously helpful.  The app’s name is a play on words with the open source community, but instead of collaborating on code, the tech community unites to approve the resources. We hypothesize that Open reSource can drastically reduce the research time of finding useful material, thus prioritizing one’s time to start learning instead of playing with process of elimination.


## Main Content Section

### Problem Recap

Open reSource draws inspiration from discussion sites such as Reddit and Stack Overflow. Both platforms have undoubtedly pioneered the mechanisms behind virtual collaborative discussion and online communities. Nonetheless, there exists some shortcomings in how each platform accomodates tech circles. For instance, the tech community’s voice on Reddit may be silenced by other popular subreddits. Overtime, a once popular tech thread may be abandoned by a lack of community engagement. By the same token, Stack Overflow is mostly a question and answer site for debugging and inquiries. The two knowledge markets support how a programmer learns and debugs, but neither really address how a programmer begins to learn and embark in CS in the first place. To worsen matters, an awkward learning gap perists in the tech space that intimidates beginners to pursue Computer Science. In a study conducted during the 2016-2017 school year in the UK, the Higher Education Statistics Agency (HESA) revealed that 9.8% of Computer Science majors drop out or switch majors because of the alarming difficulty levels and abstract concepts.

Open reSource aims to bridge the learning gap by providing the tech community a means to share and post effective CS resources they’ve stumbled upon during their research. Instead of allowing another programmer to excavate the depths of the Internet to find that hidden gem, a user can easily log onto Open reSource and post material they found extremely helpful to help reduce the research time for other programmers. A user can also explore the newest resources the tech community has collected and quickly begin their learning. Thus, a community is fostered and there is higher accountability for resources to be top tier, digestible, and easily accessible.

### General Idea

Upon using Open reSource, the web app first presents Computer Science domains ranging from languages, mathematics, databases, architecture, algorithms and data structures, and artificial intelligence. Within each domain exists 1-9 repositor(ies) and a repository is defined as a subset of a chosen domain. For instance, in the language domain, Open reSource supports the following repositories: Python, JavaScript, C++, Java, HTML/CSS, Swift (as these are all programming languages). After choosing the Python repository, threads are displayed and a thread is equivalent to a specific topic in Python such as "variables". We conveniently index threads by experience level, allowing users to determine their comfort in the repository and wisely deciding which resources to start with first. Upon choosing a thread, we start to funnel down to the actual resources and users can identify which resources the community approves by exploring like count, the comment section, etc. It's worth noting that our UI mimics the interface of Hackerrank, so users can find resources in a matter of 3-5 clicks, thus eliminating the need for a search bar and cognitive overhead.

A common misconception around Open reSource is whether it replaces one's own primary study method. Open reSource is not a tutorial marketplace, it is not a Khan Academy clone, and it is not a place with a structured curriculum to learn new topics in the same vein of Udemy or Coursera. It is a web app with a means to ***supplement*** one’s learning by crowdsourcing the opinions/submissions of the online community. So, a user exploring our site would require previous knowledge of tech concepts and define which domain of CS they’re studying. To clarify, an individual's single source of truth is usually from a textbook in university or a YouTube tutorial series. If the explanations in textbooks do not suffice (which is usually the case), they can explore Open reSource to find user approve learning materials.

We want to emphasize that there is power in auxiliary learning materials, even if it's a mere article or image/diagram. No one has strictly learned from one source. Instead, they usually digest 5-10 different interpretations until they can finally gauge an understanding of the topic, thus encouraging them to revisit their textbook's explanation and make connections.

### Technical Details

#### Kareem Hussein
***Choosing a Tech Stack:*** With an array of technologies roaming in the wild, it’s difficult to choose which frameworks and libraries will constitute as the working components of one’s project. Another layer of complexity is added when considering how to configure those components to actually interact and  exchange data with each other. Taking such factors into account, it’s important to choose a tech stack that will simplify and streamline the development process by minimizing the amount of languages a team may have to learn. That’s where Kareem suggested the MERN stack, a notable combination of technologies with an emphasis on one language: JavaScript. On a high level, the MERN stack was appealing because only JavaScript was needed to create server-side and client-side code, thus allowing the team to focus on the implementation instead of juggling several languages and their nuanced syntax. On a lower level, the MERN stack is an acronym for MongoDB, Express.js, React.js, and Node.js. At the database tier, the team wasn’t set on a certain schema for our data, so MongoDB’s flexibility to alter data fields helped to accommodate our ever-changing data format as the project grew in complexity. At the backend tier, Node.js served as our application server that set up the runtime execution environment and liberated JavaScript outside of the browser. Express.js was utilized on top of Node.js to organize our project’s APIs, middleware, routing, and managed HTTPS requests. At the front end tier, we knew we wanted repeated, modular UI components that can be easily reused and incorporated into larger components. Thus, React.js served as our “view” in MVC, while providing minimal local state management for updating our UI when needed. And the interactions between each layer of technology was as simple as setting up a proxy server, utilizing Mongoose connect middleware, or configuring environment variables. In short, the MERN stack proved to be a helpful end-to-end framework for the creation of a functional full stack web application.

***Redux and Global State Management:*** 

#### Olenka Quispe Huanca

#### Narvisha Sajjad

#### Ingmar Fjolla

#### Ismail El Baghdadi

## Conclusions and Further Work

## References
