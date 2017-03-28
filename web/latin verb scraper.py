from bs4 import BeautifulSoup
import urllib.request
import pandas as pd

root_url = 'http://latindictionary.wikidot.com/verb:'
verb_list = [l.rstrip() for l in open(r'/Users/edwardkish/Desktop/latin_verbs.txt', 'r')]

i=1-1
vocab = pd.DataFrame()
for verb in verb_list:
    try:
        new_entry = pd.DataFrame(index=[i], columns=['Label', 'Definition', 'Present Indicative Active','Present Indicative Passive',
                                                    'Imperfect Indicative Active','Future Indicative Active'])
        #Get Soup
        full_url = root_url + verb.lower()
        with urllib.request.urlopen(full_url) as response:
            html = response.read()
        soup = BeautifulSoup(html,'lxml')
        definition = soup.p.strong.string
        entries = [x.string for x in soup.table.findAll('td')]
        #Create new entry
        new_entry.loc[i,'Label'] = verb
        new_entry.loc[i,'Definition'] = definition
        new_entry.loc[i,'Present Indicative Active'] = entries[1:30:5]
        new_entry.loc[i,'Present Indicative Passive'] = entries[3:33:5]
        new_entry.loc[i,'Imperfect Indicative Active'] = entries[31:61:5]
        new_entry.loc[i,'Future Indicative Active'] = entries[61:91:5]
        #Add to vocab
        vocab = pd.concat([vocab, new_entry])
    except:
        print("Didn't like ",verb)
    i+=1
    
vocab.to_json()
