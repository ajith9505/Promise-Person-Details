//getting element by DOM
const row = document.querySelector('.row');
const page = document.querySelector('.pagination');

//api key and url for fetch data
const url = 'https://fakerapi.it/api/v1/persons?_quantity=54';

let current_page = 1;
let items_per_page = 6;

//function for feych data
function fetchData(){
    fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
        display_details(data['data'],row,current_page);
        pagenation_setup(data['data'],page);
    })
    .catch((error) => console.log('OOPS ERORR!!! : '+error));
}

//function for display the data 
function display_details(data, element, current_page) {
    element.innerHTML = '';
    current_page --;

    let start = items_per_page*current_page;
    let end = start+items_per_page;

    current_page_items = data.slice(start,end);

    current_page_items.map((person) => {
        //creating elements by DOM
        element.innerHTML +=`<div class="col-12 col-lg-6 col-md-6 col-xl-6 col-xxl-3">
                            <div class='card m-3'>
                            <div class="card-title bg-dark-subtle text-center"><h4>${person['firstname']} ${person['lastname']}</h4></div>
                            <div class="card-body">
                                <div class='card-text'>
                                    <div>Email : ${person['email']}</div>
                                    <div>Phone : ${person['phone']}</div>
                                    <div>Gender : ${person['gender']}</div>
                                    <div>DOB : ${person['birthday']}</div>
                                    <div>Address : ${person['address']['buildingNumber']}, 
                                                    ${person['address']['street']}, 
                                                    ${person['address']['streetName']}, 
                                                    ${person['address']['city']}</div>
                                    <div>Zipcode : ${person['address']['zipcode']}</div>
                                    <div>Country : ${person['address']['country']}</div>
                                <div>
                            </div>
                            </div>
                            </div>`
    })
}

//setup pagination buttons
function pagenation_setup(data,element){
    const total_page = Math.ceil(data.length/items_per_page);

    for(let i=1; i<=total_page; i++){
        let btn = pagigination_buttons(data,i);
        element.appendChild(btn);
    }
}

//function for buttons
function pagigination_buttons(data,page){
    let button = document.createElement('button');
    button.innerText = page;
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('m-1');

    if(current_page==page) button.classList.add('active');

    button.addEventListener('click',()=>{
        display_details(data,row,page);

        document.querySelector('button.active').classList.remove('active');
        button.classList.add('active');
    })
    return button;
}

fetchData();