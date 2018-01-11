# Smart kontrakt wspierający organizację spotkań / eventów / meetupów

#### ADRESOWANY PROBLEM

Podstawowym problemem organizatorów meetup jest frekwencja. Szczególnie darmowe spotkania borykają się z problemem dużej ilości zarejestrowanych osób i niskim, poniżej 50%, wskaźnikiem faktycznie obecnych na spotkaniu w stosunku do zarejestrowanych. Wpływa to negatywnie na koszty spotkania. Duża liczba potencjalnych a mała rzeczywistych uczestników oznacza zbędne koszty ponoszone na rezerwację odpowiednich venue, przygotowywana ilość gadżetów lub poczęstunku. Dodatkowo utrudnia znalezienie speakerów i sponsorów/partnerów, którzy oczekują gwarantowanej ilości uczestników.

**ROZWIĄZANIE**

Zachęcanie do uczestnictwa w spotkaniach przez nagradzanie za obecność na spotkaniu. Nagrodą jest token oparty o blockchain ETH przyznawany po potwierdzeniu obecności uczestnika na spotkaniu. Organizator może opcjonalnie może przyznawać token za inne aktywności:

* aktywność na spotkaniu (zadawanie pytań w sesja Q&A)

* wypełnienie ankiet post-spotkaniowych

* zaproponowanie mówców na spotkanie 

* polecenie spotkania innym uczestnikom, którzy przyjdą

Posiadacze tokenów będą nagradzani również na innych/kolejnych spotkaniach, nagrody mogą (ale nie muszą) się wiązać z utratą tokenów. Zakres nagród / świadczeń zależy od organizatorów spotkań, przykłady:

* priorytet przy uczestnictwie w spotkaniach z ograniczoną ilością miejsc (bez transakcji na tokenie)

* zniżki na spotkania płatne (z lub bez transakcji na tokenie)

* możliwość opłacania udziału tokenami  (transakcja na tokenie)

* dodatkowe bonusy np: gadżety, dostęp do materiałów po-spotkaniowych (z lub bez transakcji na tokenie)

* możliwość rezerwacji miejsca na spotkaniu przez blokadę tokena, który jest oddawany w momencie pojawienia się uczestnika na spotkaniu, i konsumowany w momencie nieobecności (transakcja na tokenie) 

Ułatwienia dla organizatorów:

* zwiększenie % osób biorących udział do zarejestrowanych: motywacja przez nagrody lub groźbę utraty tokena 

* zwiększenie aktywności uczestników

* możliwość oszacowania prawdopodobieństwa uczestnictwa (na bazie ilości tokenów uczestnika)

* *(opcja) możliwość sprzedaży tokenów*

Opcje opłacania/rezerwacji będą mogły być wykorzystywane po wprowadzeniu odpowiedniej ilości tokenów do obiegu oraz przekonaniu uczestników do posiadania portfela Ethereum. 

#### ZAGROŻENIA  / WYZWANIA`

* bardzo mała ilość osób posiada portfele ETH, mały zasięg potencjalnych użytkowników smart kontrakt

* konieczność opłacenia przez organizatorów kosztów wykonania transakcji przydzielenia tokena

* konieczność posiadania przez uczestników ETH przy akcjach inicjowanych przez uczestnika: płacenie, rezerwacja do opłacenia transakcji i duży próg wejścia aby zdobyć ETH

* konieczne zmiany w obecnych systemach rezerwacji/rejestracji konferencji

## Funkcjonalności realizowane przez smart kontrakt

#### ZAŁOŻENIA

1. Smart kontrakt ma umożliwiać realizację wielu spotkań. 

2. Przechowuje bazę posiadaczy tokenów spotkaniowych i umożliwia zarządzanie nimi

3. Token jest tworzony tylko przez obecność uczestnika na spotkaniu.

4. Wyróżniliśmy  dwa rodzaje smart kontraków: 

    1. dla wsparcia spotkań darmowych,

    2. dla wsparcia spotkań płatnych. 

W zależności od wersji smart kontrakt różni się od siebie, przy czym "część zasadnicza" pozostaje taka sama. 

5. Utworzenie smart kontraktu tworzy inicjalnie ustaloną ilość tokenów (dla organizatora do nagradzania dodatkowych aktywności). Z założenia ilość nie jest duża, konto powinno być zasilane przez aktywności "zużywające" tokeny uczestników (usługi płatne).

6. Posiadacze mogą przekazywać sobie tokeny dowolnie.

7. Kontrakt posiada bazę usług płatnych z określoną ceną w tokenach, baza jest zarządzalna przez organizatora 

8. Token ma czas życia określany przy tworzeniu kontraktu 

9. Zakładam, że osoby developujące dodadzą standardowe  wymagania dotyczące spójności danych, zabezpieczenia, możliwości aktualizacji kontraktu itp. ;)

10. Zakładamy możliwość wymiany tokenów pomiędzy smart kontrktamy tego typu 

#### DOSTĘPNE FUNKCJONALNOŚCI

1. Utworzenie spotkania przez organizatora

	Wywołuje: organizator

Parametry: Nazwa spotkania / maksymalna liczba subskrypcji / termin zapisów od-do / ilość tokenów przyznawanych za obecność / opcja rejestracji by uczestnik on-off / opcja potwierdzania obecności by uczestnik on-off / ilość tokenów dodatkowych / kody potwierdzające on-off / kody potwierdzające wspólny lub indywidualne / wartość kodu wspólnego dla całego spotkania

Opis/uwagi: 

Tworzy spotkanie 

2. Subskrybuj się na spotkanie (organizator)

	Wywołuje: organizator

	Parametry: id spotkania / adres uczestnika

Opis/uwagi: Zapisuje uczestnika na spotkanie. W przypadku włączonej opcji kodów zapisuje kod jednolity lub generuje indywidualny.

	

3. Subskrybuj się na spotkanie (uczestnik)

	Wywołuje: uczestnik

	Parametry: spotkanie

Opis/uwagi: Zapisuje uczestnika na spotkanie. W przypadku włączonej opcji kodów zapisuje kod jedno`lity lub generuje indywidualny.

Opcja ideowo dużo lepsza ale mocno utrudniająca użytkowanie w początkowym okresie wdrażania smart kontraktu. 

	

4. Potwierdzenie obecności (organizator)

Wywołuje: organizator

Podajemy: spotkanie / uczestnik

Opis/uwagi:  W tym momencie następuje kreacja tokenów i przesłanie ich do wskazanych uczestnika. Potwierdzenie obecności przez organizatora nie wymaga podania kodów.

	

5. Potwierdzenie obecności  (uczestnik)

	Wywołuje: uczestnik  

	Podajemy: spotkanie / kod potwierdzenia

Opis/uwagi: Następuje potwierdzenie obecności jeśli kod potwierdzenia zgadza się z zapisanym. W tym momencie następuje kreacja tokenów i przesłanie ich do wskazanych uczestnika.

Opcja ideowo dużo lepsza od potwierdzania przez organizatora ale mocno utrudniająca użytkowanie w początkowym okresie wdrażania smart kontraktu. 

6. Sprawdź kod potwierdzenia

	Wywołuje: organizator

	Podajemy: spotkanie / uczestnik

Opis/uwagi: zwracany jest kod potwierdzenia wygenerowany dla uczestnika przy subskrypcji na spotkanie. 

7. Przelej tokeny za aktywność

	Wywołuje: organizator

Podajemy: spotkanie / adres uczestnika / ilość tokenów

Opis/uwagi: nagroda dla uczestnika za dodatkową aktywność, następuje przekazanie wskazanej ilości tokenów z portfela organizatora do uczestnika.

8. Zamknięcie spotkania 

	Wywołuje: organizator

Podajemy: spotkanie

Opis/uwagi: zamykana jest możliwość potwierdzania obecności oraz subskrypcji dodatkowej tokenów.

9. Przekazanie tokena 

	Wywołuje: uczestnik / organizator

Podajemy: ilość tokenów / adres docelowy

Opis/uwagi: 

Następuje przekazanie wskazanej ilości tokenów z portfela inicjatora do adresu docelowego. Oczywiście wcześniej następuje sprawdzenie czy inicjator posiada odpowiednią ilość tokenów

10. Zapłać tokenem (za usługę płatną) 

	Wywołuje: uczestnik 

Podajemy: usługa

Opis/uwagi:następuje rezerwacja tokenów (ilość zależy od usługi) na wew. koncie w kontrakcie, oczywiście z sprawdzeniem czy uczestnik posiada ich odpowiednią ilość

To najprostsza wersja płatności całkowitej/częściowej za różne usługi przez rezerwację tokenów.

11. Sprawdź rezerwację (za usługę płatną) 

	Wywołuje: organizator

Podajemy: usługa / adres uczestnika

Opis/uwagi: sprawdzenie czy rezerwacja istnieje

12. Zrealizuj rezerwację za usługę płatną

	Wywołuje: organizator

Podajemy: usługa / adres uczestnika

Opis/uwagi: jeśli istnieje rezerwacja na tą usługę u tego uczestnika to następuje przelanie tokenów zarezerwowanych na konto organizatora, jeśli istnieje kilka takich rezerwacji to realizujemy dowolną.

13. Odwołaj rezerwację

	Wywołuje: organizator / uczestnik

Podajemy: usługa / adres uczestnika

Opis/uwagi: jeśli istnieje rezerwacja na tą usługę u tego uczestnika to następuje  jej zwolnienie, czyli przelanie tokenów zarezerwowanych z powrotem na konto uczestnika. Jesli istnieje kilka takich rezerwacji to zwalniamy dowolną.

14. Dodaj usługę płatną

	Wywołuje: organizator

Podajemy: nazwa / koszt (ilosć tokenów) / data obowiązywania (od - do, przy czym do może być nieokreślone)

Opis/uwagi: dodaje do kontraktu usługę płatną

15. Zmodyfikuj usługę płatną

	Wywołuje: organizator

Podajemy: nazwa / koszt /, data obowiązywania (od - do, przy czym do może być nieokreślone)

Opis/uwagi: modyfikuje wskazaną usługę 

16. Usuń usługę płatną

	Wywołuje: organizator

Podajemy: nazwa

Opis/uwagi: usuwa usługę

17. Sprawdź ilość tokenów

	Wywołuje: organizator, uczestnik

Podajemy: uczestnika

Opis/uwagi: zwraca ilość tokenów uczestnika

[TODO:]do dopisania funkcjonalności związane z:

* wymianą tokenów pomiędzy kontraktami (kantor?)

* zapisem na spotkanie z rezerwacja tokena przy nieobecności

## Kwestie prawne

Zidentyfikowaliśm poniższe kwestie prawne do opracowania:

* zapisy w regulaminie spotkań używających smart kontraktu

* kwestie podatkowe związane z otrzymaniem tokenu oraz wydatkowaniem na usługę płatną

