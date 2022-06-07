

var curentpage = 1;
let totalPage;
function getuser(page){
    fetch('https://reqres.in/api/users?page='+page,{
        method: 'GET'
    })
    .then(function(item){
        if (item.status!=200){
            throw item.status;
        }
        return item.json();
    })
    .then(function(item2){
        
        let fragm = document.createDocumentFragment();
        item2.data.forEach(itemm => {
            let lii = document.createElement('li');
            let sp = document.createElement('span');
            sp.textContent = itemm.first_name;
            sp.classList.add('spantext')
            let image = document.createElement('img')
            image.classList.add('imigi')
            image.src = itemm.avatar;
            lii.appendChild(image);
            lii.appendChild(sp);
            fragm.appendChild(lii);
        })
        document.getElementById('listi').innerHTML = "";
        document.getElementById('listi').appendChild(fragm);
        totalPage = item2.total_pages;
    })
    .catch(function(eror){
    if (eror == 404){
        let pp = document.createElement('p');
        pp.textContent = 'server eror';
        document.querySelector('.api').appendChild(pp);
    }
    else {
        let pp = document.createElement('p');
        pp.textContent = 'page not found';
        document.querySelector('.api').appendChild(pp);
    }
})
}
document.getElementById('lodback').addEventListener('click',function(){
    if (curentpage==1){
        return;
    }
    curentpage--;
    getuser(curentpage);
})
document.getElementById('lodmori').addEventListener('click',function(){
    if (totalPage==curentpage){
        return;
    }
    curentpage++;
    getuser(curentpage);
})

getuser(curentpage);

// 

let divwraper = document.querySelector('.post');
let postwraper = document.querySelector('.overlei');
let contenti = document.getElementById('contenti');
let closed = document.getElementById('close');

let postnAdd = document.querySelector('.iconi');
let formi = document.getElementById('submit');

function ajaxi(url,colback){
    let requesti = new XMLHttpRequest();
    requesti.open('GET',url);
    requesti.addEventListener('load',function(){
        let resfonsi = JSON.parse(requesti.responseText);
        colback(resfonsi);
        

    })
    
    requesti.send();
}
ajaxi('https://jsonplaceholder.typicode.com/posts',function(resfonsi){
    getResfonsi(resfonsi);
});

function getResfonsi(resfonsi){
    resfonsi.forEach(item3 => {
        getdiv(item3);

      })
}

function postDelet(id){
    let url = 'https://jsonplaceholder.typicode.com/posts/'+id;
    fetch(url,{
        method: 'DELET',
    })
    .then(respons => respons.json())
    .then(requesti => {
        console.log(requesti);
    })
}

function getdiv(item){
    let divi = document.createElement('div');
    let divDelet = document.createElement('div');
    divDelet.classList.add('div-delet')
    divDelet.setAttribute('data-id',item.id)
    divi.classList.add('posti2');
    divDelet.textContent = 'delet';
    divi.setAttribute('data-id', item.id);
    divi.classList.add('deleiti'+item.id)
    let h33 = document.createElement('h3');
    let h22 = document.createElement('h2');
    h33.textContent = item.id;
    h22.textContent = item.title;
    divi.appendChild(h33);
    divi.appendChild(h22);  
    divi.appendChild(divDelet);   

    divDelet.addEventListener('click',function(event){
        event.stopPropagation();
        postDelet(event.target.getAttribute('data-id'));
        document.querySelector('.deleiti'+event.target.getAttribute('data-id')).remove();
    })

    divi.addEventListener('click',function(event){
    
        aktivi(event.target.getAttribute('data-id'));
          
    }); 
    
    divwraper.appendChild(divi);
 
   
}
function aktivi(id){
    postwraper.classList.add('activ')
    let url = 'https://jsonplaceholder.typicode.com/posts/'+id;
    ajaxi(url,function(requesti){
       postFunction(requesti);
    })
    console.log(id);

}

function postFunction(item){
    let spani = document.createElement('span');
    
    spani.classList.add('span-texti')
    spani.innerText ='პოსტის ნომერი: '+ item.userId;

    let posti = document.createElement('p');

    posti.textContent = item.body;
    posti.classList.add('sost-text')
    contenti.innerHTML = "";
    contenti.appendChild(spani);
    contenti.appendChild(posti);
}

closed.addEventListener('click',function(){
    postwraper.classList.remove('activ');
})



postnAdd.addEventListener('click',function(){
    document.querySelector('.sekci-3').classList.add('activ-2')
})

formi.addEventListener('submit',function(event){
    event.preventDefault();
    let formreques = {
        title: event.target[0].value,
        body: event.target[1].value
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formreques),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
            document.querySelector('.sekci-3').classList.remove('activ-2')
        });

    console.log(formreques);
   
})
// .................................................................

// let mainwraper = document.getElementById('post-blok wraper');
// let oveerlay = document.getElementById('overlay-post');
// let closeOverlay = document.getElementById('closeOverlay');

// function ajaxi(){

//     let requesti = new XMLHttpRequest();  // vqmint motxovnis obieqts
//     requesti.open('GET','https://jsonplaceholder.typicode.com/posts'); // mivdivart get metodit
//     requesti.addEventListener('load',function(){                        //tu warmatebit mivediT ra minda moxdes
//         let data = JSON.parse(requesti.responseText);                  // datas gadavcemt request obieqtshi arsebul informarmacia gaparsuls

//         data.forEach(element => {
//             createPost(element);
//         });
//     })
//     requesti.send();
// }

// function createPost(item){            //funqcia romelic qmnis ert mtilian divs da masshi agdebs erti obieqtis informacias da asev am erti obieqtidan gamoaqvs am obieqtis id
//     let divWraper = document.createElement('div');
//         divWraper.classList.add('posti2');
//         divWraper.setAttribute('data-id', item.id);
//         let h33 = document.createElement('h3');
//         let h22 = document.createElement('h2');
//         h33.textContent = item.id;
//         h22.textContent = item.title;
        
//         divWraper.appendChild(h33);
//         divWraper.appendChild(h22);  
        
//         divWraper.addEventListener('click',function(event){
//             let id = event.target.getAttribute('data-id');
//             openOverlay(id);
//         })
//         mainwraper.appendChild(divWraper);
// }

// function openOverlay(id){
//     oveerlay.classList.add('activ');
//     console.log(id);
// }

// closeOverlay.addEventListener('click',function(){
//     oveerlay.classList.remove('activ');
// })

// ajaxi();