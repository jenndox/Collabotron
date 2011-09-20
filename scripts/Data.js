var peopleData = ['Gary,Flake,6/27/2005,External,Ray Ozzie,Management,10/21/2010,External,Startup',
'Adam,Sheppard,2/8/2006,,Gary Flake,Incubations,9/19/2008,External,8/9ths',
'Alfred,Astort,2/13/2006,Seadragon,,UX,8/6/2008,Internal,,,,http://www.linkedin.com/in/astort',
'Avi,Dunn,2/13/2006,Seadragon,Daniel Tomko,Seadragon,11/5/2010,Internal,Bing UX,Dev',
'Blaise,Aguera y Arcas,2/13/2006,Seadragon,Gary Flake,Seadragon,7/16/2008,Internal,Bing AugRea,Dev,http://www.facebook.com/blaisea',
'David,Gedye,2/13/2006,Seadragon,Gary Flake,Photosynth,8/1/2008,Internal,Bing AugRea',
'Ian,Gilman,2/13/2006,Seadragon,Jay Senior,Seadragon,1/15/2010,External,Mozilla,Dev',
'Jonathan,Dughi,2/13/2006,Seadragon,David Gedye,Photosynth,8/1/2008,Internal,Bing AugRea',
'Julian,Walker,2/13/2006,Seadragon,Jay Senior,Seadragon,9/19/2008,Internal,Bing AugRea,Dev,http://facebook.com/julianwa,http://www.linkedin.com/in/julianrwalker',
'Brett,Brewer,2/20/2006,Internal,Gary Flake,Management,11/5/2010,Internal,Bing UX',
'Patrice,Simard,2/23/2006,,Gary Flake,Research,4/6/2009,Internal,Bing AdCenter',
'Jennifer,Janzen,2/24/2006,Internal,Gary Flake,Management,11/5/2010,Internal,Bing UX',
'Olivier,Garamfalvi,2/27/2006,Internal,Jay Senior,Seadragon,9/3/2010,External,Amazon,Dev',
'Aleksander,Kolcz,3/28/2006,,Patrice Simard,Research,4/6/2009,Reorg v1',
'Brett,Martin,3/28/2006,,Patrice Simard,Research,7/16/2010,External',
'Chau,Luu,3/28/2006,,Patrice Simard,Research,8/25/2008,Internal',
'Drew,Steedly,3/28/2006,,Patrice Simard,Research,9/8/2008,Internal,Bing AugRea',
'Kumar,Chellapilla,3/28/2006,,Patrice Simard,Research,4/6/2009,Internal,Bing AdCenter',
'Mukund,Narasimhan,3/28/2006,,Patrice Simard,Research,5/2/2008,External,Facebook',
'Paul,Viola,3/28/2006,,Patrice Simard,Research,5/2/2008,Internal,Bing Relevance',
'Radoslav,Nickolov,3/28/2006,,Patrice Simard,Research,4/6/2009,External,ITB',
'Steve,Beck,3/28/2006,,Eugene Kuerner,Engineering,5/2/2008,Internal',
'Steven,Drucker,3/28/2006,Internal,Patrice Simard,Research,4/6/2009,Reorg v1,Research',
'Bruno,Bozza,4/28/2006,,Steve Beck,Engineering,4/6/2009,Internal,Microsoft STB',
'Michael,Revow,4/28/2006,,Patrice Simard,Research,6/23/2008,Internal,Bing Relevance',
'Vadims,Cugunovs,4/28/2006,,Patrice Simard,Research,4/6/2009,Internal,Bing AugRea',
'Alexey,Maykov,5/26/2006,,Patrice Simard,Research,4/6/2009,External,Facebook',
'Gang,Hua,5/26/2006,,Patrice Simard,Research,4/6/2009,Reorg v1,Nokia Research',
'Raj,Jain,5/26/2006,,Steve Beck,Engineering,4/6/2009,Reorg v1',
'Dennis,DeCoste,7/28/2006,,Patrice Simard,Research,9/26/2008,External',
'Max,Chickering,7/28/2006,,Patrice Simard,Research,4/6/2009,Internal,Bing AdCenter',
'Lutz,Gerhard,8/18/2006,Internal,Bill Crow,Seadragon,1/15/2010,Internal,Bing Mobile,PM',
'Bernard,Mangold,9/11/2006,External,Gary Flake,Engineering,5/15/2009,Internal,Business Platform Division',
'Aamer,Hydrie,11/1/2006,,Patrice Simard,Research,4/6/2009,Internal,Bing UX',
'Anton,Mityagin,11/1/2006,,Patrice Simard,Research,4/6/2009,Reorg v1,Qualcomm',
'Aparna,Lakshmiratan,11/1/2006,,Patrice Simard,Research,4/6/2009,Reorg v1',
'Jong,Huang,11/1/2006,,Eugene Kuerner,Engineering,8/22/2007,Internal',
'Kevin,Humphreys,11/1/2006,Internal,Patrice Simard,Research,4/6/2009,Internal,Bing Relevance',
'Ken,Perkins,12/4/2006,Internal,Jay Girotto,Seadragon,11/5/2010,Internal,Bing UX,PM',
'Karim,Farouki,12/28/2006,Internal,Gary Flake,Incubations,11/9/2009,Internal,MS Tag',
'Matthew,Hurst,12/28/2006,,Patrice Simard,Research,4/6/2009,Internal,Bing Mobile ',
'Siddhartha,Puri,12/28/2006,Internal,Patrice Simard,Research,4/6/2009,Internal,Bing AdCenter',
'Tim,Sullivan,2/5/2007,,Brett Brewer,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'David,Nister,2/9/2007,,Patrice Simard,Research,4/6/2009,Internal,Bing AugRea',
'Tracy,Ard,2/9/2007,Internal,Steve Beck,Engineering,4/6/2009,Internal,Bing AugRea',
'Katie,Messerly,2/19/2007,Internal,Karim Farouki,Seahorse,12/14/2009,Internal,Windows UX,PM',
'Daniel,Tomko,2/23/2007,,Tim Sullivan,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Jeff,Weir,3/1/2007,Internal,Chuck Cummins,UX,10/6/2010,Internal,Windows XDR',
'Dan,Giambalvo,3/19/2007,Internal,Daniel Tomko,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Jay,Senior,3/19/2007,Internal,Tim Sullivan,Seadragon,8/25/2010,Internal,Brazil,Dev',
'Ari,Lazier,3/28/2007,,Karim Farouki,Seahorse,11/16/2007,External,Startup,PM',
'Derek,Mehlhorn,3/28/2007,,Karim Farouki,Seahorse,12/11/2009,Internal,Windows,PM',
'Max,Slade,4/5/2007,,Brett Brewer,Seahorse,11/5/2010,Internal,Bing UX,Test',
'John,Lynn,4/16/2007,,Max Slade,Seahorse,11/5/2010,Internal,Bing UX,Test',
'Greg,Swedberg,4/30/2007,,Karim Farouki,Seahorse,9/19/2008,Internal,,PM',
'Tao,Xu,4/30/2007,Internal,Patrice Simard,Research,8/11/2008,Internal',
'Jonathan,Bergeron,5/15/2007,,Patrice Simard,Research,4/6/2009,Internal,Bing UX',
'Seth,Bridge,5/21/2007,External,Bernard Mangold,Engineering,12/31/2009,External,Limewire',
'Andrew,Rothbart,5/29/2007,External,Ralph Ruiz,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Tammara,Turner,5/29/2007,Internal,Randy Granovetter,Incubations,4/6/2009,Reorg v1',
'Shepherd,Yang,6/4/2007,Internal,Chuck Cummins,UX,11/5/2010,Internal,Bing UX',
'Chris,Dickens,6/11/2007,External,Max Slade,Seahorse,12/11/2009,Internal,XBOX,Test',
'Andre,Mohr,7/2/2007,Internal,Don Lindsey,UX,4/27/2009,External,AOL',
'Denis,Charles,7/2/2007,Internal,Max Chickering,Research,4/6/2009,Internal,Bing AdCenter',
'Joshua,Podolak,7/16/2007,External,,Photosynth,8/1/2008,External,D.E. Shaw ',
'Dave,Steckler,7/20/2007,Internal,Sidd Puri,Research,4/6/2009,Internal,Windows Phone Camera,Dev,http://www.facebook.com/davesteckler',
'Amir,Akbarzedeh,7/30/2007,External,Michael Revow,Research,4/6/2009,Internal,Bing AugRea',
'Dong,Xin,7/30/2007,External,Surajit Chaudhuri,Research,4/6/2009,Reorg v1',
'Dan,Leventhal,8/6/2007,External,Daniel Tomko,Seahorse,9/15/2009,External,UW,Dev',
'Beatriz,Diaz Acosta,8/7/2007,Internal,Ken Perkins,Seadragon,8/6/2010,Internal,MSR ERP,Test',
'Guy,Shani,8/13/2007,External,Chris Meek,Research,4/6/2009,Reorg v1',
'Josh,Cutler,8/20/2007,Internal,Sidd Puri,Research,4/6/2009,External,Startup',
'Sunil,Gowda,8/20/2007,External,Steve Beck,Engineering,3/6/2009,External,RIM',
'Kelli,Marks,8/23/2007,Internal,Gary Flake,Management,3/28/2008,Internal',
'Eric,Stollnitz,9/7/2007,Internal,Matt Uyttendaele,Research,4/6/2009,Reorg v1,MSR IVM',
'Bob,Crocco,9/17/2007,Internal,Olivier Garamfalvi,Seadragon,3/1/2010,Internal,XBOX Incubations,Dev',
'Jesse,Wang,9/24/2007,Internal,Max Slade,Seadragon,11/5/2010,Internal,Bing UX,Test',
'Adam,Szofran,10/1/2007,Internal,Jay Senior,Seadragon,4/18/2008,Internal,Flight Simulator,Dev',
'Ahmad,Bilal,10/8/2007,Internal,Doug Boyce,Engineering,4/6/2009,Reorg v1',
'Doug,Boyce,10/8/2007,Internal,Steve Beck,Engineering,4/6/2009,Reorg v1',
'Greg,Buehrer,10/8/2007,External,Kumar Chellapilla,Research,4/6/2009,Reorg v1',
'Gavin,Lazarow,10/11/2007,Internal,,,4/6/2009,Internal,Bing AugRea',
'Marcus,Leal,10/15/2007,Brazil,Michael Revow,Research,4/6/2009,External,Google',
'Neil,Enns,10/15/2007,Internal,Karim Farouki,Seahorse,9/5/2008,Internal,Office,PM',
'Ryan,Burkhardt,10/15/2007,Internal,Randy Granovetter,Incubations,4/6/2009,Reorg v1',
'Bill,Crow,10/22/2007,Internal,Gary Flake,Management,8/6/2010,Internal,MSR Robotics',
'Lerrick,Salonga,10/22/2007,External,David Vos,Ops,11/5/2010,Internal,Bing UX',
'Orry,Soegiono,10/22/2007,Internal,Don Lindsey,UX,8/13/2010,Internal,Windows XDR',
'Nick,Peine,10/25/2007,Internal,Max Slade,Seahorse,11/5/2010,Internal,Bing UX,Test',
'Anne-Marie,Meredith,11/1/2007,Internal,Tammara Turner,Incubations,4/6/2009,Reorg v1',
'Andrea,Rafanelli,11/5/2007,Internal,Bradley Delahunty,Seahorse,11/5/2010,Internal,Bing UX,Test',
'Dragos,Manolescu,11/5/2007,Internal,Steve Beck,Engineering,4/6/2009,Reorg v1',
'Ralph,Ruiz,11/5/2007,Internal,Tim Sullivan,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Dev',
'Radu,Margarint,11/12/2007,Internal,Tim Sullivan,Seahorse,1/8/2010,Internal,MS Tag,Dev',
'Scott,Imig,11/15/2007,Internal,Robert Rounthwaite,Research,4/6/2009,Reorg v1',
'Gonzalo,Ramos,11/19/2007,External,Steven Drucker,Research,4/6/2009,Internal,Bing AugRea',
'Scott,Fynn,11/19/2007,Internal,David Gedye,Photosynth,8/1/2008,Internal,Bing AugRea',
'Jenn,Lin,11/30/2007,Internal,Max Slade,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Test,http://www.facebook.com/jenndox,http://www.linkedin.com/pub/jennifer-lin/2/92b/605,Jenndox',
'Bert,Molinari,12/3/2007,Internal,David Gedye,Photosynth,8/1/2008,Internal,Bing AugRea',
'Dipankar,Ray,12/3/2007,Internal,Michael Revow,Research,4/6/2009,Reorg v1',
'Nathan,Wilfert,12/3/2007,Internal,David Gedye,Photosynth,8/1/2008,Internal,Bing AugRea',
'Andrew,Cox,1/7/2008,Internal,Daniel Tomko,Seahorse,11/5/2010,Internal,Silverlight Graphics,Dev',
'David,LaVallee,1/7/2008,External,Don Lindsey,UX,7/3/2009,External,ATT',
'Justin,Rudd,1/7/2008,External,Tracy Ard,Engineering,4/6/2009,External,Startup',
'Cindy,Bi,1/14/2008,Internal,Doug Boyce,Engineering,4/6/2009,Reorg v1',
'Greg,Linden,1/14/2008,External,Aamer Hydrie,Research,4/6/2009,Reorg v1',
'Stuart,Czerwinski,1/21/2008,External,Seth Bridge,Ops,8/19/2008,External',
'Dan,Cory,1/28/2008,External,Jay Girotto,Seadragon,11/5/2010,External,Startup,PM',
'Shannon,Yao,1/28/2008,Internal,Doug Boyce,Engineering,4/6/2009,External,UW',
'Adam,Lydick,1/30/2008,Internal,Rafael Sagula,Research,5/4/2009,Internal',
'Sami,Iqram,2/4/2008,Internal,Doug Boyce,Engineering,4/6/2009,Reorg v1,MS Tag',
'Rodney,Kinney,2/18/2008,External,Michael Revow,Research,4/6/2009,Reorg v1',
'Balaji,Valady Viswanathan,2/25/2008,Internal,Doug Boyce,Engineering,4/6/2009,Reorg v1',
'Constantin,Mihai,2/25/2008,Internal,Rafael Sagula,Engineering,4/6/2009,Internal,Bing AugRea',
'Stuart,Rivchun,2/25/2008,Internal,Alex Daley,Incubations,5/8/2009,External,Microsoft Store Online',
'Vijay,Dialani,2/25/2008,External,Sidd Puri,Research,4/6/2009,Reorg v1',
'David,Vos,3/24/2008,External,Brett Brewer,Ops,11/5/2010,Internal,Bing UX',
'Keith,Babinec,3/24/2008,External,Seth Bridge,Ops,5/8/2009,External',
'Joshua,Edwards,3/31/2008,Internal,Alex Daley,Incubations,6/22/2009,Internal,PBX',
'James,Darpinian,4/7/2008,External,Ken Perkins,Seadragon,9/10/2010,External,Google,Dev',
'Ken,Reppart,4/7/2008,Internal,David Gedye,Photosynth,8/1/2008,Internal,Bing Mobile Perf and Reliability ',
'Melinda,Minch,4/16/2008,Internal,Ken Perkins,Seadragon,5/14/2010,External,Startup,Test',
'Giridhar,Kumaran,4/21/2008,External,Dennis DeCoste,Research,4/6/2009,Reorg v1',
'Eduardo,Oliveira,4/28/2008,Brazil,Aamer Hydrie,Research,4/6/2009,Reorg v1',
'Kevin,Hanes,4/28/2008,External,Ian Gilman,Seadragon,1/15/2010,External,Mozilla',
'Peter,Sibley,4/28/2008,External,Bert Molinari,Photosynth,8/1/2008,Internal,Bing AugRea',
'Chengjie,Tu,5/5/2008,Internal,Olivier Garamfalvi,Seadragon,11/21/2008,Internal,Windows Codecs,Dev',
'Sheri,Panabaker,5/12/2008,Internal,Don Lindsey,UX,4/23/2010,Internal,Microsoft Hardware',
'Ben,Vanik,5/19/2008,External,Tim Sullivan,Seadragon,11/5/2010,Internal,Bing UX,Dev',
'Dan,Hou,5/19/2008,External,Bert Molinari,Photosynth,8/1/2008,Internal,Bing AugRea',
'Sean,Dunn,6/2/2008,Internal,Olivier Garamfalvi,Seadragon,12/11/2009,External,Mozilla,Dev',
'Brent,Ingraham,6/18/2008,Internal,Bernard Mangold,Engineering,4/6/2009,Reorg v1,MS Tag',
'Chuck,Cummins,6/18/2008,External,Brett Brewer,UX,11/5/2010,Internal,Bing UX',
'Graham,Sheldon,6/21/2008,Internal,Aamer Hydrie,Research,4/6/2009,Internal,Bing UX',
'Jesse,Vernon,7/8/2008,Internal,Tim Sullivan,Seahorse,2/12/2010,External,Startup,Dev',
'Aseem,Kishore,7/14/2008,External,Tim Sullivan,Seadragon,11/5/2010,Internal,Bing UX,Dev,http://www.facebook.com/aseem.kishore,http://www.linkedin.com/in/akishore',
'Alan,Wu,7/21/2008,External,Andrew Miner,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Dev',
'Andi,Fein,7/21/2008,Internal,Daniel Tomko,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Dev',
'Boyd,Ferris,7/28/2008,External,Bradley Delahunty,Seadragon,11/5/2010,Internal,Silverlight PivotViewer,Test',
'Reid,Andersen,7/28/2008,Internal,Kumar Chellapilla,Research,4/6/2009,Reorg v1',
'Evan,Hirsch,8/4/2008,Internal,Don Lindsey,UX,5/8/2009,External,THQ',
'Vitor,Carvalho,8/18/2008,Brazil,Dennis DeCoste,Research,4/6/2009,Startup,Startup',
'Matt,Deeds,8/25/2008,Internal,Ghir,Research,4/6/2009,Internal,Bing Mobile Perf and Reliability',
'Aleksandar,Uzelac,9/1/2008,Internal,Patrice Simard,Research,4/6/2009,Internal,Windows HIP',
'Aleksandar,Antonijevic,9/1/2008,Internal,Patrice Simard,Research,4/6/2009,Internal,Windows PAC',
'Kevyn,Collins-Thompson,9/1/2008,Internal,Susan Dumais,Research,4/6/2009,Reorg v1',
'Jyoti,Gawade,9/2/2008,Internal,Beatriz Diaz Acosta,Seadragon,6/25/2010,Internal,Microsoft,Test',
'Mircea,Cimpoi,9/4/2008,Internal,Bodin Dresevic,Research,4/6/2009,Internal,Bing AugRea',
'Jonas,Boli,9/8/2008,Internal,Katie Messerly,Seahorse,3/26/2010,External,Peru NGO,PM',
'Uma,Raghavan,9/15/2008,Internal,,Engineering,4/6/2009,External,Amazon',
'Logan,Hilman,9/22/2008,External,John Lynn,Seahorse,11/5/2010,Internal,Bing UX,Test',
'Sudipta,Sinha,9/22/2008,External,Drew Steedly,Research,4/6/2009,Reorg v1,MSR IVM',
'Jay,Girotto,10/8/2008,Internal,Brett Brewer,Seahorse,11/5/2010,Internal,Bing UX,PM',
'Mike,Rorke,10/13/2008,Internal,Jesse Wang,Seadragon,11/5/2010,Internal,Bing UX,Test',
'Amir,Padovitz,10/20/2008,Internal,Matthew Hurst,Research,4/6/2009,Internal,Bing Mobile',
'Asta,Roseway,11/3/2008,Internal,Don Lindsey,UX,4/2/2010,Internal,MSR',
'Nate,Bruneau,11/3/2008,Internal,Seth Bridge,Ops,5/8/2009,Internal,Information Services',
'Akshay,Java,11/10/2008,External,Matthew Hurst,Research,4/6/2009,Internal,Bing Mobile ',
'John,Pham,11/17/2008,External,Seth Bridge,Ops,4/30/2010,External,Personal',
'Pete,Schroeder,11/17/2008,Internal,John Lynn,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Test',
'Kelli,McGee,11/26/2008,Internal,Brett Brewer,Management,11/5/2010,Internal,Bing UX',
'Ashish,Gupta,12/1/2008,External,Jay Girotto,Seahorse,9/30/2009,External,,PM',
'Rowland,Brown,12/15/2008,Internal,Evan Hirsch,UX,3/26/2010,External,Artefact',
'Bodin Dresevic,Dresevic,1/1/2009,Internal,Patrice Simard,Research,4/6/2009,Reorg v1',
'Troy,Schauls,1/5/2009,Internal,Jay Girotto,Seahorse,3/26/2010,External,Startup,PM',
'Alex,Weinstein,1/12/2009,Internal,Jay Girotto,Seahorse,11/5/2010,Internal,Bing UX,PM',
'Jeff,Petkau,1/12/2009,External,Eduardo Oliveira,Research,4/6/2009,Reorg v1',
'Alex,Ingerman,1/15/2009,Internal,Katie Messerly,Seahorse,3/1/2010,Internal,Bing Relevance,PM',
'Mark,Bramley,1/15/2009,External,Tim Sullivan,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Matt,Jubelirer,1/29/2009,External,Brett Brewer,Management,11/5/2010,Internal,Bing UX',
'Gordon,Roberts,2/2/2009,External,Graham Sheldon,Research,4/6/2009,Reorg v1',
'Frederick,Fourie,2/23/2009,Internal,Beatriz Diaz Acosta,Seadragon,5/7/2010,Internal,MSR Robotics,Test',
'Abhishek,Kumar,3/2/2009,Internal,Sheri Panabaker,UX,5/21/2010,External,IMDB',
'Bryan,Ressler,3/2/2009,Internal,Eduardo Oliveira,Research,4/6/2009,Reorg v1',
'Divya,Tyam,3/2/2009,External,Brent Ingraham,Engineering,4/6/2009,Reorg v1',
'Alexander,Zotov,5/5/2009,Internal,Daniel Tomko,Seahorse,11/5/2010,Internal,Bing Relevance,Dev',
'Andrew,Miner,5/18/2009,External,Karim Farouki,Seahorse,10/29/2010,External,Startup,PM',
'Deergha,Sahni,5/21/2009,Internal,Daniel Tomko,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Ritchie,Hughes,5/26/2009,Internal,Bradley Delahunty,Seahorse,11/5/2010,Internal,Bing UX,Test,http://www.facebook.com/ritchie.hughes,http://www.linkedin.com/in/ritchiehughes',
'Adam,Bronsther,6/15/2009,Internal,Sheri Panabaker,UX,10/15/2010,Internal,Office',
'Karan,Singh,6/19/2009,Internal,Aseem Kishore,Seadragon,11/5/2010,Internal,Bing UX,Dev',
'Steve,Kihslinger,6/29/2009,Internal,Olivier Garamfalvi,Seadragon,6/4/2010,Internal,Office,Dev',
'Paul,Jones,8/3/2009,Seadragon,Jay Senior,Seadragon,11/5/2010,Internal,Bing UX,Dev',
'Mario,Guimaraes,8/10/2009,Brazil,Jesse Wang,Seadragon,11/5/2010,Internal,Bing UX,Test',
'Goldie,Chaudhuri,9/8/2009,Internal,Jay Girotto,Seadragon,11/5/2010,Internal,Bing UX,PM',
'Bryan,Kraus,12/30/2009,Internal,Ralph Ruiz,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Dev',
'David,Lemphers,2/1/2010,Internal,Jay Girotto,Seahorse,9/10/2010,External,PricewaterhouseCoopers,PM',
'Bradley,Delahunty,2/15/2010,Internal,Max Slade,Seahorse,11/5/2010,Internal,Bing UX,Test',
'Lilia,Paradis,2/15/2010,Internal,John Lynn,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Test,http://www.facebook.com/golilia,http://www.linkedin.com/profile/view?id=13463244,liliap',
'Guy,Shahine,3/1/2010,Internal,Daniel Tomko,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Henry,Zhang,3/1/2010,Internal,Ralph Ruiz,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Dev',
'Angela,Wise,3/15/2010,Internal,Jay Girotto,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,PM',
'Deserae,Ryan,3/19/2010,Internal,Matt Jubelirer,Management,11/5/2010,Internal,Bing UX',
'Bhadresh,Prajapati,4/12/2010,Internal,Ralph Ruiz,Seahorse,11/5/2010,Internal,Silverlight PivotViewer,Dev',
'Aaron,Dail,5/3/2010,External,Daniel Tomko,Seahorse,11/5/2010,Internal,Bing UX,Dev',
'Tom,Yip,5/10/2010,Internal,John Lynn,Seahorse,11/5/2010,Internal,Bing UX,Test',
'Rohan,Mutagi,5/17/2010,Internal,Aseem Kishore,Seadragon,11/5/2010,Internal,Bing UX,Dev',
'Kevin,Boske,5/24/2010,External,Jay Girotto,Seadragon,11/5/2010,Internal,Bing UX,PM,,http://www.linkedin.com/in/kevinboske,@kilteddad',
'Steve,Hollasch,5/24/2010,External,Aseem Kishore,Seadragon,11/5/2010,Internal,Bing UX,Dev',
'Giacomo,Ferrari,6/14/2010,External,Ralph Ruiz,Live Labs,11/5/2010,Internal,Silverlight PivotViewer',
'Lilia,Gutnik,7/1/2010,Internal,Jay Girotto,Live Labs,11/5/2010,Internal,Bing UX,PM',
'Tony,Lew,7/1/2010,Internal,Chuck Cummins,UX,11/5/2010,Internal,Bing UX',
'Seth,OBrien,7/12/2010,External,Aseem Kishore,Live Labs,11/5/2010,Internal,Bing UX,Dev',
'Janine,Perret,8/9/2010,External,Jay Girotto,Seahorse,11/5/2010,Internal,Bing UX,PM',
'BK,Chung,8/16/2010,Internal,Bradley Delahunty,Seahorse,11/5/2010,Internal,Bing UX,Test,http://facebook.com/bkchung,http://linkedin.com/in/bkchung',
'Vikram,Deodhar,8/23/2010,Internal,Jenn Lin,Live Labs,11/5/2010,Internal,Bing UX,Test',
'Daniel,Rathbone,9/13/2010,External,Jenn Lin,Live Labs,11/5/2010,Internal,Bing UX,Test',
'Daniel,Gasienica,10/4/2010,External,Aseem Kishore,Live Labs,11/5/2010,Internal,Bing UX,Dev,http://www.facebook.com/daniel.gasienica,http://www.linkedin.com/in/gasienica',
'Matt,Shaw,10/11/2010,,David Vos,Ops,11/5/2010,Internal,Bing UX',
'Aaron,Hoff,,,,,4/6/2009,Reorg v1',
'Amir,Padovitz,,Internal,Matthew Hurst,Research,4/6/2009,Internal,Bing Mobile and Local',
'Alex,Daley,,,Bernard Mangold,Incubations,8/7/2009,External,Casey Research',
'Ana,Mitrovic,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Andrew,Galen,,,,,4/6/2009,Reorg v1',
'Asela,Gunawardana,,,,Research,4/6/2009,Reorg v1',
'Bill,Ramsey,,,,,10/10/2007,Internal',
'Bogdan,Radakovic,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Bojan,Zivkovic,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Damon,Wickersham,,,Brett Martin,,6/26/2009,Internal,Microsoft EE',
'Daniel,Liebling,,,,,4/6/2009,Reorg v1',
'Dejan,Lukacevic,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Djordje,Nijemcevic,,,Bodin Dresevic,Research,4/6/2009,Internal,Bing AugRea',
'Don,Lindsay,,Internal,Gary Flake,UX,2/13/2009,External,RIM',
'Eduarda,Mendes Rodrigues,,,,,4/6/2009,Reorg v1',
'Ivan,Mitic,,,,,4/6/2009,Reorg v1',
'Jaime,Teevan,,,,Research,4/6/2009,Reorg v1',
'James,Scott,,,,,4/6/2009,Reorg v1',
'Katrina,Zuccaro,,Internal,Randy Granovetter,Incubations,4/6/2009,Reorg v1',
'Magdalena,Cocovic,,,Bodin Dresevic,Research,4/6/2009,Internal,Courier; Bing AugRea',
'Mike,Deem,,,Steve Beck,Engineering,4/6/2009,Reorg v1',
'Mikhail,Bilenko,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Milan,Vugdelija,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Nikola,Todic,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Paul,Bennett,,,,Research,4/6/2009,Reorg v1',
'Rafael,Sagula,,,,Engineering,4/10/2009,Internal,Bing AugRea',
'Ronnie,Chaiken,,,,Research,10/10/2007,Internal',
'Sasa,Galic,,,Bodin Dresevic,Research,4/6/2009,Reorg v1',
'Sergey,Chub,,,,Engineering,10/3/2008,Internal',
'Seth,Deepak,,Internal,,,4/6/2009,Reorg v1',
'Sonja,Knoll,,,,Research,4/6/2009,Reorg v1',
'Srinath,Vasireddy,,,Eugene Kuerner,Engineering,10/19/2007,Internal',
'Steve,Bush,,,,Research,4/6/2009,Reorg v1',
'Sudipta,Sengupta,,,,,4/6/2009,Reorg v1',
'Tim,McCord,,,Seth Bridge,Ops,1/31/2007,External',
'Tony,Biag,,,Steve Beck,Engineering,4/6/2009,Internal,WP7',
'Vlado,Zaric,,,Bodin Dresevic,Research,4/6/2009,Reorg v1'];