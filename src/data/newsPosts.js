// News posts data - sourced from Facebook page: EpiskopAndrejCilerdzic
// Each post contains locale-keyed text fields for multi-language support
// Supported locales: sr (Serbian Cyrillic), de (German), it (Italian), sr-latin (Serbian Latin)

const newsPosts = [
  {
    id: 'liturgija-trst-2026-03',
    date: '2026-03-15',
    title: {
      sr: 'Света Архијерејска Литургија у Трсту',
      de: 'Heilige Bischöfliche Liturgie in Triest',
      it: 'Santa Liturgia Episcopale a Trieste',
      'sr-latin': 'Sveta Arhijerejska Liturgija u Trstu'
    },
    summary: {
      sr: 'Његово Преосвештенство Епископ швајцарски Господин Андреј служио је Свету архијерејску Литургију у храму Светог Спиридона у Трсту.',
      de: 'Seine Exzellenz Bischof Andrej der Schweiz feierte die Heilige Bischöfliche Liturgie in der Kirche des Heiligen Spiridon in Triest.',
      it: 'Sua Eccellenza il Vescovo Andrej della Svizzera ha celebrato la Santa Liturgia Episcopale nella chiesa di San Spiridone a Trieste.',
      'sr-latin': 'Njegovo Preosveštenstvo Episkop švajcarski Gospodin Andrej služio je Svetu arhijerejsku Liturgiju u hramu Svetog Spiridona u Trstu.'
    },
    content: {
      sr: `Његово Преосвештенство Епископ швајцарски, Италије и Малте Господин Андреј служио је Свету архијерејску Литургију у храму Светог Спиридона у Трсту, треће недеље Великог поста – Недеље Крстопоклоне.

Саслуживали су протојереј-ставрофор Рашко Радовић и ђакон Миле Марковић. Епископ Андреј је за Литургијом проповедао о значењу Часног Крста и о томе како сваки човек носи свој крст, повлачећи паралелу са Симоном Киринејцем.

После Свете Литургије приређена је свечана трпеза у просторијама при храму, којој је присуствовао велики број верних. Владика Андреј се захвалио свим верницима на присуству и подсетио их на значај заједничке молитве и поста у овом светом периоду.`,
      de: `Seine Exzellenz Bischof Andrej der Schweiz, Italiens und Maltas feierte die Heilige Bischöfliche Liturgie in der Kirche des Heiligen Spiridon in Triest, am dritten Sonntag der Großen Fastenzeit – dem Sonntag der Kreuzverehrung.

Es konzelebrierten Erzpriester-Stavrophor Raško Radović und Diakon Mile Marković. Bischof Andrej predigte während der Liturgie über die Bedeutung des Ehrwürdigen Kreuzes und darüber, wie jeder Mensch sein eigenes Kreuz trägt, wobei er eine Parallele zu Simon von Kyrene zog.

Nach der Heiligen Liturgie wurde ein festliches Mahl in den Räumlichkeiten der Kirche vorbereitet, an dem eine große Anzahl von Gläubigen teilnahm. Bischof Andrej dankte allen Gläubigen für ihre Anwesenheit und erinnerte sie an die Bedeutung des gemeinsamen Gebets und des Fastens in dieser heiligen Zeit.`,
      it: `Sua Eccellenza il Vescovo Andrej della Svizzera, dell'Italia e di Malta ha celebrato la Santa Liturgia Episcopale nella chiesa di San Spiridone a Trieste, la terza domenica di Grande Quaresima – la Domenica della Venerazione della Croce.

Hanno concelebrato il protopresbitero-stavroforo Raško Radović e il diacono Mile Marković. Il Vescovo Andrej ha predicato durante la Liturgia sul significato della Santa Croce e su come ogni uomo porta la propria croce, tracciando un parallelo con Simone di Cirene.

Dopo la Santa Liturgia è stato preparato un pranzo festivo nei locali della chiesa, al quale ha partecipato un gran numero di fedeli. Il Vescovo Andrej ha ringraziato tutti i fedeli per la loro presenza e ha ricordato l'importanza della preghiera comune e del digiuno in questo periodo sacro.`,
      'sr-latin': `Njegovo Preosveštenstvo Episkop švajcarski, Italije i Malte Gospodin Andrej služio je Svetu arhijerejsku Liturgiju u hramu Svetog Spiridona u Trstu, treće nedelje Velikog posta – Nedelje Krstoppoklone.

Sasluživali su protojerej-stavrofor Raško Radović i đakon Mile Marković. Episkop Andrej je za Liturgijom propovedao o značenju Časnog Krsta i o tome kako svaki čovek nosi svoj krst, povlačeći paralelu sa Simonom Kirinijcem.

Posle Svete Liturgije priređena je svečana trpeza u prostorijama pri hramu, kojoj je prisustvovao veliki broj vernih. Vladika Andrej se zahvalio svim vernicima na prisustvu i podsetio ih na značaj zajedničke molitve i posta u ovom svetom periodu.`
    },
    images: ['/img/trieste-spiridone.jpg', '/img/image2.jpeg', '/img/image13.jpeg'],
    category: 'liturgija',
    location: {
      sr: 'Трст, Италија',
      de: 'Triest, Italien',
      it: 'Trieste, Italia',
      'sr-latin': 'Trst, Italija'
    }
  },
  {
    id: 'eboli-okrugli-sto-2026-03',
    date: '2026-03-17',
    title: {
      sr: 'Сећање на српске страдалнике из Еболија',
      de: 'Gedenken an die serbischen Opfer von Eboli',
      it: 'Memoria delle vittime serbe di Eboli',
      'sr-latin': 'Sećanje na srpske stradalnike iz Ebolija'
    },
    summary: {
      sr: 'Округли сто посвећен питању посмртних остатака 93 српска избеглица преминулих у логору у Еболију у Италији.',
      de: 'Runder Tisch zum Thema der sterblichen Überreste von 93 serbischen Flüchtlingen, die im Lager in Eboli in Italien verstorben sind.',
      it: 'Tavola rotonda dedicata alla questione dei resti mortali di 93 rifugiati serbi deceduti nel campo di Eboli in Italia.',
      'sr-latin': 'Okrugli sto posvećen pitanju posmrtnih ostataka 93 srpska izbeglica preminulih u logoru u Eboliju u Italiji.'
    },
    content: {
      sr: `У периоду од 15. до 17. марта 2026. године одржан је округли сто посвећен питању посмртних остатака 93 српска избеглица преминулих у логору у Еболију (Италија) између 1945. и 1947. године.

Њихови посмртни остаци су недавно пренесени из Барија у Трст. На скупу су учествовали истраживачи из Италије и Аустралије (путем видео-везе), који су представили историјске изворе и документацију о логору.

Разговарано је о идентификацији преминулих, о плановима за достојан споменик-крипту у Трсту, као и о сарадњи са међународним архивима и пројектом Eboli Research Project (eboli.org.au).

Епископ Андреј је нагласио важност чувања сећања на страдалнике и обећао пуну подршку Епархије у реализацији овог пројекта.`,
      de: `Vom 15. bis 17. März 2026 fand ein Runder Tisch statt, der der Frage der sterblichen Überreste von 93 serbischen Flüchtlingen gewidmet war, die zwischen 1945 und 1947 im Lager in Eboli (Italien) verstorben sind.

Ihre sterblichen Überreste wurden kürzlich von Bari nach Triest überführt. An der Tagung nahmen Forscher aus Italien und Australien (per Videokonferenz) teil, die historische Quellen und Dokumentation über das Lager präsentierten.

Es wurde über die Identifizierung der Verstorbenen, über Pläne für ein würdiges Denkmal-Krypta in Triest sowie über die Zusammenarbeit mit internationalen Archiven und dem Eboli Research Project (eboli.org.au) diskutiert.

Bischof Andrej betonte die Wichtigkeit der Bewahrung des Gedenkens an die Opfer und versprach volle Unterstützung der Eparchie bei der Umsetzung dieses Projekts.`,
      it: `Nel periodo dal 15 al 17 marzo 2026 si è tenuta una tavola rotonda dedicata alla questione dei resti mortali di 93 rifugiati serbi deceduti nel campo di Eboli (Italia) tra il 1945 e il 1947.

I loro resti mortali sono stati recentemente trasferiti da Bari a Trieste. All'incontro hanno partecipato ricercatori dall'Italia e dall'Australia (tramite videoconferenza), che hanno presentato fonti storiche e documentazione sul campo.

Si è discusso dell'identificazione dei defunti, dei piani per un degno monumento-cripta a Trieste, nonché della collaborazione con archivi internazionali e il progetto Eboli Research Project (eboli.org.au).

Il Vescovo Andrej ha sottolineato l'importanza di preservare la memoria delle vittime e ha promesso il pieno sostegno dell'Eparchia nella realizzazione di questo progetto.`,
      'sr-latin': `U periodu od 15. do 17. marta 2026. godine održan je okrugli sto posvećen pitanju posmrtnih ostataka 93 srpska izbeglica preminulih u logoru u Eboliju (Italija) između 1945. i 1947. godine.

Njihovi posmrtni ostaci su nedavno preneseni iz Barija u Trst. Na skupu su učestvovali istraživači iz Italije i Australije (putem video-veze), koji su predstavili istorijske izvore i dokumentaciju o logoru.

Razgovarano je o identifikaciji preminulih, o planovima za dostojan spomenik-kriptu u Trstu, kao i o saradnji sa međunarodnim arhivima i projektom Eboli Research Project (eboli.org.au).

Episkop Andrej je naglasio važnost čuvanja sećanja na stradalnike i obećao punu podršku Eparhije u realizaciji ovog projekta.`
    },
    images: ['/img/image8.jpeg', '/img/trieste-spiridone.jpg'],
    category: 'dogadjaj',
    location: {
      sr: 'Трст, Италија',
      de: 'Triest, Italien',
      it: 'Trieste, Italia',
      'sr-latin': 'Trst, Italija'
    }
  },
  {
    id: 'slava-studenata-2026-02',
    date: '2026-02-19',
    title: {
      sr: 'Епископ Андреј на Слави Удружења српских студената',
      de: 'Bischof Andrej beim Patronatstag des Vereins serbischer Studenten',
      it: 'Il Vescovo Andrej alla Slava dell\'Associazione degli studenti serbi',
      'sr-latin': 'Episkop Andrej na Slavi Udruženja srpskih studenata'
    },
    summary: {
      sr: 'Прослава крсне славе – Светог Фотија Цариградског – у храму Успења Пресвете Богородице у Цириху.',
      de: 'Feier des Patronatstages – des Heiligen Photius von Konstantinopel – in der Kirche Mariä Entschlafung in Zürich.',
      it: 'Celebrazione della Slava – di San Fozio di Costantinopoli – nella chiesa della Dormizione della Santissima Madre di Dio a Zurigo.',
      'sr-latin': 'Proslava krsne slave – Svetog Fotija Carigradskog – u hramu Uspenja Presvete Bogorodice u Cirihu.'
    },
    content: {
      sr: `Епископ швајцарски Господин Андреј присуствовао је прослави крсне славе Удружења српских студената у Швајцарској – Светог Фотија Цариградског – у храму Успења Пресвете Богородице у Цириху.

Владика је благословио славски колач и обратио се студентима поводом значаја вере и јединства у дијаспори. Потом је одржано предавање о историји српског студентског покрета у Швајцарској.

Саслуживао је протојереј-ставрофор др Мирослав Симијоновић. После богослужења приређена је свечана вечера на којој су студенти имали прилику да разговарају са Владиком о изазовима живота у дијаспори.

Удружење српских студената окупља младе Србе на студијама широм Швајцарске и негује српски идентитет и академску изузетност.`,
      de: `Bischof Andrej der Schweiz nahm an der Feier des Patronatstages des Vereins serbischer Studenten in der Schweiz teil – des Heiligen Photius von Konstantinopel – in der Kirche Mariä Entschlafung in Zürich.

Der Bischof segnete den Slavski-Kuchen und sprach die Studenten über die Bedeutung des Glaubens und der Einheit in der Diaspora an. Anschließend wurde ein Vortrag über die Geschichte der serbischen Studentenbewegung in der Schweiz gehalten.

Es konzelebrierte Erzpriester-Stavrophor Dr. Miroslav Simijović. Nach dem Gottesdienst wurde ein festliches Abendessen veranstaltet, bei dem die Studenten die Gelegenheit hatten, mit dem Bischof über die Herausforderungen des Lebens in der Diaspora zu sprechen.

Der Verein serbischer Studenten vereint junge Serben an Universitäten in der ganzen Schweiz und pflegt die serbische Identität und akademische Exzellenz.`,
      it: `Il Vescovo della Svizzera, Signor Andrej, ha partecipato alla celebrazione della Slava dell'Associazione degli studenti serbi in Svizzera – di San Fozio di Costantinopoli – nella chiesa della Dormizione della Santissima Madre di Dio a Zurigo.

Il Vescovo ha benedetto il pane della Slava e ha parlato agli studenti dell'importanza della fede e dell'unità nella diaspora. Successivamente si è tenuta una conferenza sulla storia del movimento studentesco serbo in Svizzera.

Ha concelebrato il protopresbitero-stavroforo dott. Miroslav Simijović. Dopo la funzione religiosa è stata organizzata una cena festiva durante la quale gli studenti hanno avuto l'opportunità di parlare con il Vescovo delle sfide della vita nella diaspora.

L'Associazione degli studenti serbi riunisce giovani serbi che studiano in tutta la Svizzera e coltiva l'identità serba e l'eccellenza accademica.`,
      'sr-latin': `Episkop švajcarski Gospodin Andrej prisustvovao je proslavi krsne slave Udruženja srpskih studenata u Švajcarskoj – Svetog Fotija Carigradskog – u hramu Uspenja Presvete Bogorodice u Cirihu.

Vladika je blagoslovio slavski kolač i obratio se studentima povodom značaja vere i jedinstva u dijaspori. Potom je održano predavanje o istoriji srpskog studentskog pokreta u Švajcarskoj.

Sasluživao je protojerej-stavrofor dr Miroslav Simijović. Posle bogosluženja priređena je svečana večera na kojoj su studenti imali priliku da razgovaraju sa Vladikom o izazovima života u dijaspori.

Udruženje srpskih studenata okuplja mlade Srbe na studijama širom Švajcarske i neguje srpski identitet i akademsku izuzetnost.`
    },
    images: ['/img/image13.jpeg', '/img/image5.jpeg'],
    category: 'dogadjaj',
    location: {
      sr: 'Цирих, Швајцарска',
      de: 'Zürich, Schweiz',
      it: 'Zurigo, Svizzera',
      'sr-latin': 'Cirih, Švajcarska'
    }
  },
  {
    id: 'srpski-institut-2026-02',
    date: '2026-02-26',
    title: {
      sr: 'Седница Управног одбора Српског института у Швајцарској',
      de: 'Sitzung des Vorstands des Serbischen Instituts in der Schweiz',
      it: 'Seduta del Consiglio direttivo dell\'Istituto serbo in Svizzera',
      'sr-latin': 'Sednica Upravnog odbora Srpskog instituta u Švajcarskoj'
    },
    summary: {
      sr: 'Састанак у Цириху са кључним члановима Управног одбора – др Јека Гордић и др Саша Бјелић.',
      de: 'Treffen in Zürich mit den wichtigsten Mitgliedern des Vorstands – Dr. Jeka Gordić und Dr. Saša Bjelić.',
      it: 'Riunione a Zurigo con i principali membri del Consiglio direttivo – dott.ssa Jeka Gordić e dott. Saša Bjelić.',
      'sr-latin': 'Sastanak u Cirihu sa ključnim članovima Upravnog odbora – dr Jeka Gordić i dr Saša Bjelić.'
    },
    content: {
      sr: `Седница Управног одбора Српског института у Швајцарској одржана је у Цириху. Састанку су присуствовали др Јека Гордић, председница Српског института, др Саша Бјелић, извршни директор, као и остали чланови Одбора.

Епископ Андреј је отворио седницу молитвом и пожелео успешан рад. Разматрана су питања сарадње са швајцарским институцијама и будућност млађих генерација у дијаспори.

На седници је књижевни круг „Златно перо Швајцарске" примљен као научни партнер Института. Договорено је да се организују редовна предавања и промоције књига српских аутора у Швајцарској.

Институт планира и организовање међународне научне конференције о доприносу српске дијаспоре у Швајцарској.`,
      de: `Die Sitzung des Vorstands des Serbischen Instituts in der Schweiz fand in Zürich statt. An dem Treffen nahmen Dr. Jeka Gordić, Präsidentin des Serbischen Instituts, Dr. Saša Bjelić, Geschäftsführer, sowie weitere Vorstandsmitglieder teil.

Bischof Andrej eröffnete die Sitzung mit einem Gebet und wünschte erfolgreiche Arbeit. Es wurden Fragen der Zusammenarbeit mit Schweizer Institutionen und die Zukunft der jüngeren Generationen in der Diaspora erörtert.

Auf der Sitzung wurde der Literaturkreis „Goldene Feder der Schweiz" als wissenschaftlicher Partner des Instituts aufgenommen. Es wurde vereinbart, regelmäßige Vorträge und Buchpräsentationen serbischer Autoren in der Schweiz zu organisieren.

Das Institut plant auch die Organisation einer internationalen wissenschaftlichen Konferenz über den Beitrag der serbischen Diaspora in der Schweiz.`,
      it: `La seduta del Consiglio direttivo dell'Istituto serbo in Svizzera si è tenuta a Zurigo. Alla riunione hanno partecipato la dott.ssa Jeka Gordić, presidente dell'Istituto serbo, il dott. Saša Bjelić, direttore esecutivo, e altri membri del Consiglio.

Il Vescovo Andrej ha aperto la seduta con una preghiera e ha augurato un lavoro proficuo. Sono state discusse questioni di collaborazione con istituzioni svizzere e il futuro delle giovani generazioni nella diaspora.

Durante la seduta il circolo letterario "Penna d'oro della Svizzera" è stato ammesso come partner scientifico dell'Istituto. È stato concordato di organizzare conferenze regolari e presentazioni di libri di autori serbi in Svizzera.

L'Istituto prevede anche l'organizzazione di una conferenza scientifica internazionale sul contributo della diaspora serba in Svizzera.`,
      'sr-latin': `Sednica Upravnog odbora Srpskog instituta u Švajcarskoj održana je u Cirihu. Sastanku su prisustvovali dr Jeka Gordić, predsednica Srpskog instituta, dr Saša Bjelić, izvršni direktor, kao i ostali članovi Odbora.

Episkop Andrej je otvorio sednicu molitvom i poželeo uspešan rad. Razmatrana su pitanja saradnje sa švajcarskim institucijama i budućnost mlađih generacija u dijaspori.

Na sednici je književni krug „Zlatno pero Švajcarske" primljen kao naučni partner Instituta. Dogovoreno je da se organizuju redovna predavanja i promocije knjiga srpskih autora u Švajcarskoj.

Institut planira i organizovanje međunarodne naučne konferencije o doprinosu srpske dijaspore u Švajcarskoj.`
    },
    images: ['/img/image12.jpeg'],
    category: 'dogadjaj',
    location: {
      sr: 'Цирих, Швајцарска',
      de: 'Zürich, Schweiz',
      it: 'Zurigo, Svizzera',
      'sr-latin': 'Cirih, Švajcarska'
    }
  },
  {
    id: 'poseta-zeneva-2026-03',
    date: '2026-03-04',
    title: {
      sr: 'Епископ Андреј у посети управи Реформаторске цркве у Женеви',
      de: 'Bischof Andrej zu Besuch bei der Leitung der Reformierten Kirche in Genf',
      it: 'Il Vescovo Andrej in visita alla direzione della Chiesa Riformata a Ginevra',
      'sr-latin': 'Episkop Andrej u poseti upravi Reformatorske crkve u Ženevi'
    },
    summary: {
      sr: 'Сусрет са руководством Евангеличко-реформаторске цркве ради јачања међуцрквених односа.',
      de: 'Treffen mit der Leitung der Evangelisch-Reformierten Kirche zur Stärkung der interkonfessionellen Beziehungen.',
      it: 'Incontro con la dirigenza della Chiesa Evangelica Riformata per il rafforzamento dei rapporti interconfessionali.',
      'sr-latin': 'Susret sa rukovodstvom Evangeličko-reformatorske crkve radi jačanja međucrkevnih odnosa.'
    },
    content: {
      sr: `Епископ швајцарски Господин Андреј посетио је управу Евангеличко-реформаторске цркве у Женеви, где се сусрео са Штефаном Келером (Stéphane Keller), Мартином Штукелберг (Martine Stuckelberg) и Патриком Мелисом (Patrick Mellis).

Разговарано је о међуцрквеним односима и материјалном опстанку обеју заједница. Посебно је истакнута историјска подршка коју Швајцарска реформаторска црква пружа од оснивања парохије у Женеви 2015. године.

Епископ Андреј је изразио захвалност за дугогодишњу гостопримљивост и сарадњу, и позвао на продубљивање екуменских веза у духу хришћанског братства.

Овај сусрет је део ширих настојања Епархије швајцарске да негује добре односе са свим хришћанским заједницама у Швајцарској.`,
      de: `Bischof Andrej der Schweiz besuchte die Leitung der Evangelisch-Reformierten Kirche in Genf, wo er sich mit Stéphane Keller, Martine Stuckelberg und Patrick Mellis traf.

Es wurde über interkonfessionelle Beziehungen und den materiellen Fortbestand beider Gemeinschaften gesprochen. Besonders hervorgehoben wurde die historische Unterstützung, die die Schweizerische Reformierte Kirche seit der Gründung der Gemeinde in Genf im Jahr 2015 leistet.

Bischof Andrej brachte seine Dankbarkeit für die langjährige Gastfreundschaft und Zusammenarbeit zum Ausdruck und rief zu einer Vertiefung der ökumenischen Beziehungen im Geiste christlicher Brüderlichkeit auf.

Dieses Treffen ist Teil der breiteren Bemühungen der Eparchie der Schweiz, gute Beziehungen zu allen christlichen Gemeinschaften in der Schweiz zu pflegen.`,
      it: `Il Vescovo della Svizzera, Signor Andrej, ha visitato la direzione della Chiesa Evangelica Riformata a Ginevra, dove ha incontrato Stéphane Keller, Martine Stuckelberg e Patrick Mellis.

Si è discusso dei rapporti interconfessionali e della sostenibilità materiale di entrambe le comunità. È stato particolarmente evidenziato il supporto storico che la Chiesa Riformata Svizzera fornisce dalla fondazione della parrocchia a Ginevra nel 2015.

Il Vescovo Andrej ha espresso gratitudine per la lunga ospitalità e collaborazione, e ha invitato ad approfondire i legami ecumenici nello spirito della fratellanza cristiana.

Questo incontro fa parte degli sforzi più ampi dell'Eparchia della Svizzera per coltivare buoni rapporti con tutte le comunità cristiane in Svizzera.`,
      'sr-latin': `Episkop švajcarski Gospodin Andrej posetio je upravu Evangeličko-reformatorske crkve u Ženevi, gde se susreo sa Štefanom Kelerom (Stéphane Keller), Martinom Štukelberg (Martine Stuckelberg) i Patrikom Melisom (Patrick Mellis).

Razgovarano je o međucrkevnim odnosima i materijalnom opstanku obeju zajednica. Posebno je istaknuta istorijska podrška koju Švajcarska reformatorska crkva pruža od osnivanja parohije u Ženevi 2015. godine.

Episkop Andrej je izrazio zahvalnost za dugogodišnju gostoprimljivost i saradnju, i pozvao na produbljivanje ekumenskih veza u duhu hrišćanskog bratstva.

Ovaj susret je deo širih nastojanja Eparhije švajcarske da neguje dobre odnose sa svim hrišćanskim zajednicama u Švajcarskoj.`
    },
    images: ['/img/geneva-temple.jpg', '/img/image10.jpeg'],
    category: 'dogadjaj',
    location: {
      sr: 'Женева, Швајцарска',
      de: 'Genf, Schweiz',
      it: 'Ginevra, Svizzera',
      'sr-latin': 'Ženeva, Švajcarska'
    }
  },
  {
    id: 'liturgija-cirih-2026-03',
    date: '2026-03-08',
    title: {
      sr: 'Недељна Литургија у храму Свете Тројице у Цириху',
      de: 'Sonntagsliturgie in der Heiligen Dreifaltigkeitskirche in Zürich',
      it: 'Liturgia domenicale nella chiesa della Santa Trinità a Zurigo',
      'sr-latin': 'Nedeljna Liturgija u hramu Svete Trojice u Cirihu'
    },
    summary: {
      sr: 'Редовна недељна Света Литургија у храму Свете Тројице у Цириху, друге недеље Великог поста.',
      de: 'Regelmäßige Sonntagsliturgie in der Heiligen Dreifaltigkeitskirche in Zürich, am zweiten Sonntag der Großen Fastenzeit.',
      it: 'Santa Liturgia domenicale regolare nella chiesa della Santa Trinità a Zurigo, la seconda domenica di Grande Quaresima.',
      'sr-latin': 'Redovna nedeljna Sveta Liturgija u hramu Svete Trojice u Cirihu, druge nedelje Velikog posta.'
    },
    content: {
      sr: `У храму Свете Тројице у Цириху служена је Света Литургија друге недеље Великог поста – Недеље Светог Григорија Паламе.

Служили су протојереј Бранимир Петковић и протојереј Ђорђе Лукић. Верницима је преношена порука о значају духовног подвига и молитве у периоду Великог поста.

Храм Свете Тројице у Цириху је централно место окупљања српске православне заједнице у Швајцарској и седиште Епархије швајцарске. Свете Литургије се служе сваке недеље и празником од 09:30 часова.

После Литургије верници су се окупили на заједничкој трпези у просторијама при храму.`,
      de: `In der Heiligen Dreifaltigkeitskirche in Zürich wurde die Heilige Liturgie des zweiten Sonntags der Großen Fastenzeit – des Sonntags des Heiligen Gregorius Palamas – gefeiert.

Es dienten Erzpriester Branimir Petković und Erzpriester Đorđe Lukić. Den Gläubigen wurde die Botschaft von der Bedeutung der geistlichen Leistung und des Gebets in der Zeit der Großen Fastenzeit vermittelt.

Die Heilige Dreifaltigkeitskirche in Zürich ist der zentrale Treffpunkt der serbisch-orthodoxen Gemeinschaft in der Schweiz und Sitz der Eparchie der Schweiz. Die Heilige Liturgie wird jeden Sonntag und an Feiertagen um 09:30 Uhr gefeiert.

Nach der Liturgie versammelten sich die Gläubigen zu einem gemeinsamen Mahl in den Räumlichkeiten der Kirche.`,
      it: `Nella chiesa della Santa Trinità a Zurigo è stata celebrata la Santa Liturgia della seconda domenica di Grande Quaresima – la Domenica di San Gregorio Palamas.

Hanno officato il protopresbitero Branimir Petković e il protopresbitero Đorđe Lukić. Ai fedeli è stato trasmesso il messaggio sull'importanza dell'impresa spirituale e della preghiera nel periodo della Grande Quaresima.

La chiesa della Santa Trinità a Zurigo è il luogo centrale di incontro della comunità ortodossa serba in Svizzera e sede dell'Eparchia della Svizzera. La Santa Liturgia viene celebrata ogni domenica e nei giorni festivi alle ore 09:30.

Dopo la Liturgia i fedeli si sono riuniti per un pasto comune nei locali della chiesa.`,
      'sr-latin': `U hramu Svete Trojice u Cirihu služena je Sveta Liturgija druge nedelje Velikog posta – Nedelje Svetog Grigorija Palame.

Služili su protojerej Branimir Petković i protojerej Đorđe Lukić. Vernicima je prenošena poruka o značaju duhovnog podviga i molitve u periodu Velikog posta.

Hram Svete Trojice u Cirihu je centralno mesto okupljanja srpske pravoslavne zajednice u Švajcarskoj i sedište Eparhije švajcarske. Svete Liturgije se služe svake nedelje i praznikom od 09:30 časova.

Posle Liturgije vernici su se okupili na zajedničkoj trpezi u prostorijama pri hramu.`
    },
    images: ['/img/image13.jpeg', '/img/image5.jpeg', '/img/image8.jpeg'],
    category: 'liturgija',
    location: {
      sr: 'Цирих, Швајцарска',
      de: 'Zürich, Schweiz',
      it: 'Zurigo, Svizzera',
      'sr-latin': 'Cirih, Švajcarska'
    }
  },
  {
    id: 'liturgija-rim-2026-02',
    date: '2026-02-15',
    title: {
      sr: 'Света Литургија у Риму на Сретење Господње',
      de: 'Heilige Liturgie in Rom am Fest Darstellung des Herrn',
      it: 'Santa Liturgia a Roma per la Presentazione del Signore',
      'sr-latin': 'Sveta Liturgija u Rimu na Sretenje Gospodnje'
    },
    summary: {
      sr: 'Прослава празника Сретења Господњег у Мисионарској парохији Светог Саве у Риму.',
      de: 'Feier des Festes Darstellung des Herrn in der Missionspfarrei des Heiligen Sava in Rom.',
      it: 'Celebrazione della festa della Presentazione del Signore nella parrocchia missionaria di San Sava a Roma.',
      'sr-latin': 'Proslava praznika Sretenja Gospodnjeg u Misionarskoj parohiji Svetog Save u Rimu.'
    },
    content: {
      sr: `На празник Сретења Господњег служена је Света Литургија у Мисионарској парохији Светог Саве у Риму, у цркви San Filippo Neri на Есквилину.

Служио је протојереј Роман Фишер. Након Литургије одржано је освећење свећа – Освећење свећа на Сретење, древни православни обичај.

Верници су се у великом броју одазвали позиву и присуствовали празничном богослужењу. Парохија у Риму окупља српске вернике из целе централне Италије и представља важно духовно средиште наше заједнице.`,
      de: `Am Fest Darstellung des Herrn wurde die Heilige Liturgie in der Missionspfarrei des Heiligen Sava in Rom, in der Kirche San Filippo Neri am Esquilin, gefeiert.

Es diente Erzpriester Roman Fischer. Nach der Liturgie fand die Kerzenweihe statt – die Kerzenweihe am Fest Darstellung des Herrn, ein alter orthodoxer Brauch.

Die Gläubigen folgten dem Aufruf zahlreich und nahmen am festlichen Gottesdienst teil. Die Gemeinde in Rom vereint serbische Gläubige aus ganz Mittelitalien und stellt ein wichtiges geistliches Zentrum unserer Gemeinschaft dar.`,
      it: `Per la festa della Presentazione del Signore è stata celebrata la Santa Liturgia nella parrocchia missionaria di San Sava a Roma, nella chiesa di San Filippo Neri all'Esquilino.

Ha officiato il protopresbitero Roman Fischer. Dopo la Liturgia si è svolta la benedizione delle candele – la benedizione delle candele per la Presentazione del Signore, un'antica usanza ortodossa.

I fedeli hanno risposto numerosi all'invito e hanno partecipato alla funzione festiva. La parrocchia di Roma riunisce i fedeli serbi di tutta l'Italia centrale e rappresenta un importante centro spirituale della nostra comunità.`,
      'sr-latin': `Na praznik Sretenja Gospodnjeg služena je Sveta Liturgija u Misionarskoj parohiji Svetog Save u Rimu, u crkvi San Filippo Neri na Eskvilinu.

Služio je protojerej Roman Fišer. Nakon Liturgije održano je osvećenje sveća – Osvećenje sveća na Sretenje, drevni pravoslavni običaj.

Vernici su se u velikom broju odazvali pozivu i prisustvovali prazničnom bogosluženju. Parohija u Rimu okuplja srpske vernike iz cele centralne Italije i predstavlja važno duhovno središte naše zajednice.`
    },
    images: ['/img/image2.jpeg', '/img/image4.jpeg'],
    category: 'liturgija',
    location: {
      sr: 'Рим, Италија',
      de: 'Rom, Italien',
      it: 'Roma, Italia',
      'sr-latin': 'Rim, Italija'
    }
  },
  {
    id: 'vladika-poseta-bazel-2026-02',
    date: '2026-02-08',
    title: {
      sr: 'Архијерејска посета парохији свих Светих у Базелу',
      de: 'Bischofsbesuch in der Allerheiligengemeinde in Basel',
      it: 'Visita episcopale alla parrocchia di Tutti i Santi a Basilea',
      'sr-latin': 'Arhijerejska poseta parohiji svih Svetih u Bazelu'
    },
    summary: {
      sr: 'Епископ Андреј посетио парохију у Базелу и служио Свету Литургију са протојерејем-ставрофором Милутином Николићем.',
      de: 'Bischof Andrej besuchte die Gemeinde in Basel und feierte die Heilige Liturgie mit Erzpriester-Stavrophor Milutin Nikolić.',
      it: 'Il Vescovo Andrej ha visitato la parrocchia a Basilea e ha celebrato la Santa Liturgia con il protopresbitero-stavroforo Milutin Nikolić.',
      'sr-latin': 'Episkop Andrej posetio parohiju u Bazelu i služio Svetu Liturgiju sa protojerejom-stavroforom Milutinom Nikolićem.'
    },
    content: {
      sr: `Његово Преосвештенство Епископ швајцарски Господин Андреј посетио је парохију Свих Светих у Базелу, где је служио Свету архијерејску Литургију у цркви Свети Албан.

Саслуживао је протојереј-ставрофор Милутин Николић, парох базелски. После Литургије Владика се обратио верницима и разговарао о плановима за унапређење парохијског живота.

Парохија у Базелу је једна од најстаријих српских православних парохија у Швајцарској и окупља вернике из ширег региона Базела и северне Швајцарске.

Епископ Андреј је изразио задовољство стањем парохије и охрабрио вернике да наставе са активним учешћем у црквеном животу.`,
      de: `Seine Exzellenz Bischof Andrej der Schweiz besuchte die Allerheiligengemeinde in Basel, wo er die Heilige Bischöfliche Liturgie in der St.-Alban-Kirche feierte.

Es konzelebrierte Erzpriester-Stavrophor Milutin Nikolić, Pfarrer von Basel. Nach der Liturgie sprach der Bischof die Gläubigen an und diskutierte Pläne zur Verbesserung des Gemeindelebens.

Die Gemeinde in Basel ist eine der ältesten serbisch-orthodoxen Gemeinden in der Schweiz und vereint Gläubige aus dem Großraum Basel und der nördlichen Schweiz.

Bischof Andrej brachte seine Zufriedenheit mit dem Zustand der Gemeinde zum Ausdruck und ermutigte die Gläubigen, ihre aktive Teilnahme am kirchlichen Leben fortzusetzen.`,
      it: `Sua Eccellenza il Vescovo della Svizzera, Signor Andrej, ha visitato la parrocchia di Tutti i Santi a Basilea, dove ha celebrato la Santa Liturgia Episcopale nella chiesa di Sant'Albano.

Ha concelebrato il protopresbitero-stavroforo Milutin Nikolić, parroco di Basilea. Dopo la Liturgia il Vescovo ha parlato ai fedeli e ha discusso i piani per il miglioramento della vita parrocchiale.

La parrocchia di Basilea è una delle più antiche parrocchie ortodosse serbe in Svizzera e riunisce i fedeli della grande area di Basilea e della Svizzera settentrionale.

Il Vescovo Andrej ha espresso la sua soddisfazione per lo stato della parrocchia e ha incoraggiato i fedeli a continuare con la partecipazione attiva alla vita ecclesiastica.`,
      'sr-latin': `Njegovo Preosveštenstvo Episkop švajcarski Gospodin Andrej posetio je parohiju Svih Svetih u Bazelu, gde je služio Svetu arhijerejsku Liturgiju u crkvi Sveti Alban.

Sasluživao je protojerej-stavrofor Milutin Nikolić, paroh bazelski. Posle Liturgije Vladika se obratio vernicima i razgovarao o planovima za unapređenje parohijskog života.

Parohija u Bazelu je jedna od najstarijih srpskih pravoslavnih parohija u Švajcarskoj i okuplja vernike iz šireg regiona Bazela i severne Švajcarske.

Episkop Andrej je izrazio zadovoljstvo stanjem parohije i ohrabrio vernike da nastave sa aktivnim učešćem u crkvenom životu.`
    },
    images: ['/img/image8.jpeg', '/img/image9.jpeg'],
    category: 'liturgija',
    location: {
      sr: 'Базел, Швајцарска',
      de: 'Basel, Schweiz',
      it: 'Basilea, Svizzera',
      'sr-latin': 'Bazel, Švajcarska'
    }
  }
];

export default newsPosts;
