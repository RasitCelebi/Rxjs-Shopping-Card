import { products } from "./productList.js";
/* const { range, filter, map } = rxjs;

range(1, 200)
  .pipe(
    filter((x) => x % 2 === 1),
    map((x) => x + x)
  )
  .subscribe((x) => console.log(x)); */

console.log(products);

let cardContainerr;

document.addEventListener("DOMContentLoaded", onCreated());



function onCreated() {

  cardContainerr = document.querySelector("#cardContainer");

  if (cardContainerr) {
    elementBuilder();
  } else {
    console.log("!!!container not found");
  }

};

function elementBuilder() {
  products.forEach((cards) => {

      let { image, title, price } = cards;

      let elementDivCard = document.createElement('div');
      let attrClassCard = document.createAttribute('class');
      attrClassCard.value = "card"
      elementDivCard.setAttributeNode(attrClassCard);
      cardContainerr.appendChild(elementDivCard);

      let elementImg = document.createElement('img');
      let attrClassImg = document.createAttribute('class');
      attrClassImg.value = "image"
      elementImg.setAttributeNode(attrClassImg);
      elementDivCard.appendChild(elementImg);

      let elementDivProp = document.createElement('div');
      let attrClassProperties = document.createAttribute('class');
      attrClassProperties.value = "propertiesContainer"
      elementDivProp.setAttributeNode(attrClassProperties);
      elementDivCard.appendChild(elementDivProp);

      let elementDivBadgeCont = document.createElement('div');
      let attrClassBadgeCont = document.createAttribute('class');
      attrClassBadgeCont.value = "badgeContainer"
      elementDivBadgeCont.setAttributeNode(attrClassBadgeCont);
      elementDivProp.appendChild(elementDivBadgeCont);

      let elementSpanx = document.createElement('span');
      let elementSpany = document.createElement('span');
      let attrClassSpan = document.createAttribute('class');
      attrClassSpan.value = "badge"
      elementSpanx.setAttributeNode(attrClassSpan);
      elementSpany.setAttribute("class", "badge");
      elementDivBadgeCont.appendChild(elementSpanx);
      elementDivBadgeCont.appendChild(elementSpany);

      let elementH2 = document.createElement('h2');
      let attrClassH2 = document.createAttribute('class');
      let attrTitleH2 = document.createAttribute('title');
      attrClassH2.value = "product-title"
      attrTitleH2.value = title
      elementH2.setAttributeNode(attrClassH2);
      elementH2.setAttributeNode(attrTitleH2);
      elementDivProp.appendChild(elementH2);

      let elementSpanPriceDis = document.createElement('span');
      let attrClassSpanPriceDis = document.createAttribute('class');
      attrClassSpanPriceDis.value = "discountedPrice"
      elementSpanPriceDis.setAttributeNode(attrClassSpanPriceDis);
      elementDivProp.appendChild(elementSpanPriceDis);

      let elementDivPriceCont= document.createElement('div');
      let attrClassPriceCont = document.createAttribute('class');
      attrClassPriceCont.value = "priceContainer"
      elementDivPriceCont.setAttributeNode(attrClassPriceCont);
      elementDivProp.appendChild(elementDivPriceCont);

      let elementSpanPrice = document.createElement('span');
      let attrClassSpanPrice = document.createAttribute('class');
      attrClassSpanPrice.value = "price"
      elementSpanPrice.setAttributeNode(attrClassSpanPrice);
      elementDivPriceCont.appendChild(elementSpanPriceDis);

      let elementSpanPricePercent = document.createElement('span');
      let attrClassSpanPricePercent = document.createAttribute('class');
      attrClassSpanPricePercent.value = "discount-percent"
      elementSpanPricePercent.setAttributeNode(attrClassSpanPricePercent);
      elementDivPriceCont.appendChild(elementSpanPricePercent);

      let elementSpan = document.createElement('span');
      elementDivProp.appendChild(elementSpan);

      let elementI = document.createElement('i');
      elementI.setAttribute("class", "fa-solid fa-star");
      elementSpan.appendChild(elementI);

      let elementI2 = document.createElement('i');
      elementI2.setAttribute("class", "fa-solid fa-star");
      elementSpan.appendChild(elementI2);

      let elementI3 = document.createElement('i');
      elementI3.setAttribute("class", "fa-solid fa-star");
      elementSpan.appendChild(elementI3);

      let elementI4 = document.createElement('i');
      elementI4.setAttribute("class", "fa-solid fa-star-half-stroke");
      elementSpan.appendChild(elementI4);

      let elementI5 = document.createElement('i');
      elementI5.setAttribute("class", "fa-regular fa-star");
      elementSpan.appendChild(elementI5); 

      let elementSpanReview = document.createElement('span');
      elementSpanReview.setAttribute("class", "countReviews");
      elementSpanReview.textContent="20k reviews"
      elementSpan.appendChild(elementSpanReview);

      let elementDivButtonCont = document.createElement('div');
      elementDivButtonCont.setAttribute("class", "buttonContainer");
      elementDivProp.appendChild(elementDivButtonCont);

      let elementButtonPrimary = document.createElement('button');
      elementButtonPrimary.setAttribute("class", "button-primary");
      elementButtonPrimary.textContent="Add to Cart";
      elementDivButtonCont.appendChild(elementButtonPrimary);

      let elementButtonIcon1 = document.createElement('button');
      elementButtonIcon1.setAttribute("class", "button-icon");
      elementDivButtonCont.appendChild(elementButtonIcon1);

      let elementIBut = document.createElement('i');
      elementIBut.setAttribute("class", "fa-solid fa-heart opacity-50");
      elementButtonIcon1.appendChild(elementIBut);

      let elementButtonIcon2 = document.createElement('button');
      elementButtonIcon2.setAttribute("class", "button-icon");
      elementDivButtonCont.appendChild(elementButtonIcon2);

      let elementIBut2 = document.createElement('i');
      elementIBut2.setAttribute("class", "fa-solid fa-eye");
      elementButtonIcon2.appendChild(elementIBut2);






    

      //answerDiv.textContent = answer;

      //faqH2tag.textContent = quest;

  });
}

let addCartButton = document.querySelectorAll(".button-primary");
let itemCount = document.querySelector("#count");
let cardContainer = document.querySelector("#cardContainer");
let selectedCardContainer = document.querySelector("#selectedCardContainer");
let itemContainer = document.querySelector("#itemContainer");
let delAllItem = document.querySelector("#delAllItem");
let findForm = document.querySelector("#findForm");
let valueForm = document.querySelector("#valueForm");
let card = document.querySelectorAll(".card");
let selectedItemCount = 0, i = 0;
let parentCartElement = document.querySelector("#cartItem");

products.forEach((item, index) => {
  card[index].querySelector('img').src = item.image;
  card[index].querySelector('div h2').textContent = item.title;
  card[index].querySelectorAll('div div span')[2].textContent = "₺ " + item.price + ".00";
  let x = parseInt(item.price, 10);
  card[index].querySelectorAll('div div span')[3].textContent = "₺ " + (x * 1.25) + ".00";
});