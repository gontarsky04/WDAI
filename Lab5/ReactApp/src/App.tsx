import Formularz from "./Components/Formularze/Formularz";
import NowyKoszyk from "./Components/Koszyk/NowyKoszyk";
import Licznik from "./Components/Liczniki/Licznik"
import NowyLicznik from "./Components/Liczniki/NowyLicznik";
import Haslo from "./Components/Formularze/Haslo";
import Logowanie from "./Components/Formularze/Logowanie";
import Ternary from "./Components/Inne/Ternary";
import Aktualizacja from "./Components/Inne/Aktualizacja";
import Studenci from "./Components/Studenci/Studenci";
import StudentManager from "./Components/Studenci/StudentManager";
import Dodawanie from "./Components/Studenci/Dodawanie";
import Licznik2 from "./Components/Efekty/Licznik2";
import Tytul from "./Components/Efekty/Tytul";
import Odliczanie from "./Components/Efekty/Odliczanie";
import Komentarz from "./Components/Produkty/Komentarz";
import Komentarze from "./Components/Produkty/Komentarze";

function App() {
  return (
      <>

            <Licznik></Licznik>
            <NowyKoszyk></NowyKoszyk>
            <NowyLicznik></NowyLicznik>
            <Formularz></Formularz>
            <Haslo></Haslo>
            <Logowanie></Logowanie>
            <Ternary></Ternary>,
            <Aktualizacja></Aktualizacja>
            <Studenci></Studenci>
            <StudentManager></StudentManager>
            <Licznik2></Licznik2>
            <Tytul></Tytul>
            <Odliczanie></Odliczanie>
            <Komentarze></Komentarze>

      </>
  );
}

export default App;