import requests, json, pprint
from bs4 import BeautifulSoup
mainlist = []
index = 1
for k in range(1,19):
    data = requests.get('https://www.hindisoch.com/funnyjokes/sms/santa-banta-jokes-hindi/page/' + str(k));
    parse = BeautifulSoup(data.text, 'html.parser')
    data1 = parse.find('div', class_ = 'article')
    data2 = data1.find('div', attrs = {'id': 'content_box', 'class': None})
    data3 = data2.findAll('article')
    for i in data3:
        maindic = {}
        data4 = i.find('div', class_ = 'front-view-content full-post')
        maindata = data4.text
        maindic[index] = maindata
        mainlist.append(maindic)
        index+=1
# pprint.pprint(mainlist)
with open('jokes1.json', 'w') as file:
    dumping = json.dumps(mainlist)
    file.write(dumping)
