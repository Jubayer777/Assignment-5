
//function for getting search result by user.
const searchResult=()=>{
    const getSearchInput= document.getElementById('item-search').value;
    document.getElementById('error-div').innerHTML='';
    if(getSearchInput!=''){
        //calling api for search items by name
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getSearchInput}`)
        .then(response=>response.json())
        .then(data=>displayItems(data))
        .catch(error=>errorMessage())
    }
}

//function to display alert  for invalid  item search
const errorMessage= ()=>{
    alert('Opps! Invalid Item');

    const errorDiv= document.getElementById('error-div');
    errorDiv.innerHTML=`
    <h4>Sorry! there is no such item available! try another one<h4>
    `;
    document.getElementById('item-search').value='';
}

//function to show the matching items
const displayItems= items=>{
    const itemsDiv= document.getElementById('items-div');
    itemsDiv.innerHTML='';
    document.getElementById('item-details-div').innerHTML='';
    const meal=items.meals;
    meal.forEach(item => {
        const singleItemDiv= document.createElement('div');
        const singleItemInfo=`
        <div class="single-item" onclick="itemDetails(${item.idMeal})">
            <img src='${item.strMealThumb}'>
            <h6>${item.strMeal}</h6>
        </div>`;
        singleItemDiv.innerHTML=singleItemInfo;
        itemsDiv.appendChild(singleItemDiv);
    });
    document.getElementById('item-search').value='';
}

//function to response to the click on specific item
const itemDetails=itemId=>{
    //calling api meal details by id for generating specific item details 
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
    .then(response=>response.json())
    .then(data=>singleItemDetails(data))
        
}
//function to display clicked item details 
const singleItemDetails= details=>{
    //Creating a div for displaying specific item details
    const itemDetailsDiv=document.getElementById('item-details-div');
    const item=details.meals[0];
    itemDetailsDiv.innerHTML =  
           `<img src='${item.strMealThumb}'>
            <h3>${item.strMeal}</h3>
            <h5>Ingredients</h5>`;

        // generating ingredient list
    const arr=Object.values(item);
    for(let i=9;i<=28;i++){
       if(arr[i]!=""){
           //creating paragraph elements for listing ingredient
           const paragraph=document.createElement('p');
           paragraph.innerText=arr[i];
           itemDetailsDiv.appendChild(paragraph);
       }
    } 
}



