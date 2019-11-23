function Osoba(jmeno, prijmeni, vaha = 75, vyska = 180, narozeni){
    this.jmeno = jmeno;
    this.prijmeni = prijmeni;
    this.vaha = vaha;
    this.vyska = vyska;
    this.narozeni = narozeni;

    this.celeJmeno = function(){
        return `${this.jmeno} ${this.prijmeni}`;
    }

    this.bmi = function(){
        return (this.vaha/(this.vyska/100)**2).toFixed(2);
    }

    this.roky = function(){
        let d1 = new Date();
        let d2 = new Date(this.narozeni);
        let i = false;
        if(d2<d1){
            if(d1.getDate() - d2.getDate() < 0)
                i = true;
            else if(d1.getMonth() - d2.getMonth() < 0)
                i = true;
            
            if (i==true)
                return (d1.getFullYear() - d2.getFullYear()) - 1;
            else
                return d1.getFullYear() - d2.getFullYear();
        }
        else{
            return '-';
        }

        
    }

    this.vizitka = function(){
        return `<h3>${this.celeJmeno()}</h3> 
                <p>Váha: <b>${this.vaha}</b></p>
                <p>Výška: <b>${this.vyska}</b></p>
                <p>BMI: <b>${this.bmi()}</b></p>
                <p>Datum narození: <b>${this.narozeni}</b></p>
                <p>Stáří: <b>${this.roky()} roků/let</b></p>`;
    }
}

const jmeno = document.getElementById('jmeno');
const prijmeni = document.getElementById('prijmeni');
const vaha = document.getElementById('vaha');
const vyska = document.getElementById('vyska');
const narozeni = document.getElementById('narozeni');
const potvrdit = document.getElementById('potvrdit');
const novy = document.getElementById('novy');
const smazat = document.getElementById('smazat');
const seznam = document.getElementById('seznam');
const vizitka = document.getElementById('vizitka');

// Objekt k uložení jedné osoby
let osoba = {};

// Osoby - pole objektů
let osoby = [];

let editace = false;

function reset(){
    jmeno.value = '';
    prijmeni.value = '';
    vaha.value = 75;
    vyska.value = 180;
    narozeni.value = '';

    editace = false;

    vizitka.innerHTML = '';
}

// Akce při stisku potvrdit
potvrdit.addEventListener('click', ()=>{
    osoba = new Osoba(jmeno.value, prijmeni.value, vaha.value, vyska.value, narozeni.value);

    if(!editace){
        osoby.push(osoba);

        let option = document.createElement('option');
        option.text = osoba.celeJmeno();
        seznam.add(option);
        editace = true;
        //seznam.selectedIndex = osoby.length;
    }

    else{
        osoby[seznam.selectedIndex] = osoba;
        seznam.getElementsByTagName('option')[seznam.selectedIndex].text = osoba.celeJmeno();
    }
    vizitka.innerHTML = osoba.vizitka();

    console.log(osoby);
})

smazat.addEventListener('click', ()=>{
    osoby.splice(seznam.selectedIndex,1);
    seznam.remove(seznam.selectedIndex);

    console.log(osoby);

    reset();
})

novy.addEventListener('click', ()=>{
    reset();
})

seznam.addEventListener('click', ()=>{
    //vizitka.innerHTML = osoby[seznam.selectedIndex].vizitka();
    osoba = osoby[seznam.selectedIndex];
    vizitka.innerHTML = osoba.vizitka();

    /*jmeno.value = osoby[seznam.selectedIndex].jmeno;
    prijmeni.value = osoby[seznam.selectedIndex].prijmeni;
    vaha.value = osoby[seznam.selectedIndex].vaha;
    vyska.value = osoby[seznam.selectedIndex].vyska;*/

    jmeno.value = osoba.jmeno;
    prijmeni.value = osoba.prijmeni;
    vaha.value = osoba.vaha;
    vyska.value = osoba.vyska;
    narozeni.value = osoba.narozeni;

    editace = true;
})