import pandas as pd

noun_df = pd.read_excel(r'filepath_to_nouns.xlsx')

total_json = 'var NOUN_DB = {'
for d in range(1,6):
    total_json += str(d) + ": {"
    for w in noun_df[noun_df['Declension']==d].index:
        total_json += "'" + w + "': {"
        for case in noun_df.columns[[1,3,4,5,6,7,8,9,10,11,12, 13]]:
            total_json += "'"+case + "': '" + noun_df[case].loc[w] + "',"
        total_json += '},'
    total_json += '},'
total_json += '}'
