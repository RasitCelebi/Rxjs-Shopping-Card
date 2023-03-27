import { products } from "./productList.js";
import { authStateFB, signOutUserFB } from "./fbase.js";
const { range, filter, map } = rxjs;

let cardContainerr;
let addCartButton, selectedItemCount, countContainer, selectedCardContainer, cardContainer,
    delAllItem, findForm, valueForm, filtreContainer, filtreIcon, parentCartElement, signIn, register, logOut,
    cart, filteredItems, user;




document.addEventListener("DOMContentLoaded", onCreated());

function onCreated() {

  cardContainerr = document.querySelector("#cardContainer");

  if (cardContainerr) {
    elementBuilder();
    init();
    auth();

    countContainer.addEventListener("click", toggleShoppingCard);
    delAllItem.addEventListener("click", delAllElement);
    findForm.addEventListener("submit", searchCart);
    filtreContainer.addEventListener("click", deleteFilter);
    signIn.addEventListener("click", loginTextFunction);
    logOut.addEventListener("click", logOutFunc);

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

    let elementDivPriceCont = document.createElement('div');
    let attrClassPriceCont = document.createAttribute('class');
    attrClassPriceCont.value = "priceContainer"
    elementDivPriceCont.setAttributeNode(attrClassPriceCont);
    elementDivProp.appendChild(elementDivPriceCont);

    let elementSpanPrice = document.createElement('span');
    let attrClassSpanPrice = document.createAttribute('class');
    attrClassSpanPrice.value = "price"
    elementSpanPrice.setAttributeNode(attrClassSpanPrice);
    elementDivPriceCont.appendChild(elementSpanPrice);

    let elementSpanPricePercent = document.createElement('span');
    elementSpanPricePercent.textContent = "save %20"
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
    elementSpanReview.textContent = "20k reviews"
    elementSpan.appendChild(elementSpanReview);

    let elementDivButtonCont = document.createElement('div');
    elementDivButtonCont.setAttribute("class", "buttonContainer");
    elementDivProp.appendChild(elementDivButtonCont);

    let elementButtonPrimary = document.createElement('button');
    elementButtonPrimary.setAttribute("class", "button-primary");
    elementButtonPrimary.textContent = "Add to Cart";
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

    //daha önce src yoktu ama setAttribute diyerek oluşturabildik. Belki varsayılan olarak boş hücredir.
    elementImg.setAttribute("src", image);
    elementH2.textContent = title;
    elementSpanPriceDis.textContent = "₺ " + price + ".00";;
    elementSpanPrice.textContent = "₺ " + (price * 1.25) + ".00";

  });
}

function init() {
  addCartButton = document.querySelectorAll(".buttonContainer");
  selectedItemCount = document.querySelector("#selectedItemCount");
  countContainer = document.querySelector("#countContainer");
  selectedCardContainer = document.querySelector("#selectedCardContainer");
  cardContainer = document.querySelector("#cardContainer");
  delAllItem = document.querySelector("#delAllItem");
  findForm = document.querySelector("#findForm");
  valueForm = document.querySelector("#valueForm");
  filtreContainer = document.querySelector("#filtreContainer");
  filtreIcon = document.querySelector("#filtreIcon");
  parentCartElement = document.querySelector("#cartItem");
  signIn = document.querySelector("#signIn");
  register = document.querySelector("#register");
  logOut = document.querySelector("#logOut");
  cart = [];
  filteredItems = [];
}

async function auth() {

  const result = await authStateFB();
  user = result;

  if (user == null) {
    signIn.href = "login.html"
  } else {
    toggleLogOutButton();
    signIn.textContent = user.email;
    signIn.href = "#"
  }

}

async function logOutFunc() {

  event.preventDefault();
  const message = await signOutUserFB();

  alert("Account " + message[1] + " logged out.");

  toggleLogOutButton();
  signIn.textContent = "Sign In";
  user = null;
  signIn.href = "login.html"

};

function toggleLogOutButton() {
  logOut.classList.toggle('hidden');
  logOut.classList.toggle('flex');

  register.classList.toggle('hidden');
  register.classList.toggle('flex');
}

function loginTextFunction() {

  if (user !== null) {
    alert("Account mail : " + user.email);
  }

}

function toggleShoppingCard() {
  selectedCardContainer.classList.toggle('hidden');
  selectedCardContainer.classList.toggle('flex');
  cardContainer.classList.toggle('w-[100%]');
  cardContainer.classList.toggle('w-[65%]');
};

addCartButton.forEach((btn, index) => {
  btn.addEventListener("click", function () {

    if (filteredItems.length > 0) {
      alert("End the filtering process. then add to cart.")
    } else {
      addtocart(index);
    }
  });
});

function addtocart(index) {
  cart.unshift({ ...products[index] });
  displaycart("noFilter");

  filtreIcon.innerHTML = 0;
  filtreContainer.style.color = "white";
  valueForm.value = "";

}

function displaycart(type) {
  let index = 0, total = 0;

  if (type === "noFilter") {
    document.getElementById("selectedItemCount").innerHTML = cart.length;
    if (cart.length == 0) {
      document.getElementById('cartItem').innerHTML = "Your cart is empty";
      document.getElementById("total").innerHTML = "₺ " + 0 + ".00";
    }
    else {
      parentCartElement.textContent = "";

      cart.map((items) => {
        let { image, title, price } = items;
        total = total + price;

        selectedCardBuilder(image, title, price, index);

      });

      let deleteCartButton = document.querySelectorAll(".deleteItem");
      deleteCartButton.forEach((btn, index) => {
        btn.addEventListener("click", function () {

          delElement(index);
        });

      });

    }
  } else {

    document.getElementById("selectedItemCount").innerHTML = cart.length;
    filtreIcon.innerHTML = filteredItems.length;
    if (filteredItems.length == 0) {
      document.getElementById('cartItem').innerHTML = "All cards containing the words you searched for have been removed.";
      document.getElementById("total").innerHTML = "₺ " + 0 + ".00";
    }
    else {

      parentCartElement.textContent = "";

      filteredItems.map((items) => {
        let { image, title, price } = items;
        total = total + price;
        console.log("total : " + total);
        selectedCardBuilder(image, title, price, index);
      });

    }

  }

  document.getElementById("total").textContent = "₺ " + total + ".00";

}

function selectedCardBuilder(image, title, price, index) {

  let classAttrCardItem = document.createAttribute('class');
  let classAttrRowImg = document.createAttribute('class');
  let classAttrRowImgChild = document.createAttribute('class');
  let classAttrIcon = document.createAttribute('class');

  let srcAttrRowImgChild = document.createAttribute('src');

  let styleAttrP = document.createAttribute('style');
  let styleAttrH2 = document.createAttribute('style');

  let onClickAttrIcon = document.createAttribute('onclick');

  let newDivElementCardItem = document.createElement('div');
  let newDivElementRowImg = document.createElement('div');

  let newImgElement = document.createElement('img');
  let newPElement = document.createElement('p');
  let newH2Element = document.createElement('h2');
  let newIElementRowImg = document.createElement('i');

  classAttrCardItem.value = "cart-item";
  classAttrRowImg.value = "row-img";
  classAttrRowImgChild.value = "rowimg";
  classAttrIcon.value = "fa-solid fa-trash deleteItem";

  srcAttrRowImgChild.value = image;

  styleAttrP.value = "font-size: 12px;";
  styleAttrH2.value = "font-size: 15px;";

  onClickAttrIcon.value = "delElement(" + (index++) + ")";

  newDivElementCardItem.setAttributeNode(classAttrCardItem);
  newDivElementRowImg.setAttributeNode(classAttrRowImg);
  newImgElement.setAttributeNode(classAttrRowImgChild);
  newImgElement.setAttributeNode(srcAttrRowImgChild);
  newDivElementCardItem.setAttributeNode(classAttrCardItem);

  newPElement.setAttributeNode(styleAttrP);
  newH2Element.setAttributeNode(styleAttrH2);
  newIElementRowImg.setAttributeNode(onClickAttrIcon);
  newIElementRowImg.setAttributeNode(classAttrIcon);
  newPElement.textContent = title;
  newH2Element.textContent = "₺ " + price + ".00";


  // #control#
  newDivElementRowImg.appendChild(newImgElement);

  newDivElementCardItem.appendChild(newDivElementRowImg);
  newDivElementCardItem.appendChild(newPElement);
  newDivElementCardItem.appendChild(newH2Element);
  newDivElementCardItem.appendChild(newIElementRowImg);

  parentCartElement.appendChild(newDivElementCardItem);
}

function deleteFilter() {

  filtreIcon.innerHTML = 0;
  filtreContainer.style.color = "white";
  valueForm.value = "";

  displaycart("noFilter");
  filteredItems = [];

}

function searchCart(event) {

  event.preventDefault();
  filtreIcon.innerHTML = 0;
  filtreContainer.style.color = "white";

  if (cart.length > 0) { 

    let soughtValue = valueForm.value;

    filteredItems = [];

    if (soughtValue.trim().length > 0) { 


      filteredItems = cart.filter(filterCallback);
      console.log(filteredItems);


      console.log("uzunluk : " + filteredItems.length);

      if (filteredItems.length < 1) { 

        parentCartElement.textContent = "There is no such item in the cart.";
        document.getElementById("total").innerHTML = "₺ " + 0 + ".00";
        filtreContainer.style.color = "red";
        console.log(filtreContainer.getAttribute("style"));


      } else {
        console.log("buraya girdi");
        displaycart();
      };

    } else {
      alert("Just searching for spaces doesn't make sense . Write a word.");
      valueForm.value = "";
    }

  } else {
    alert("Add data to cart first");
    valueForm.value = "";
  }

}

function filterCallback(item) {

  console.log(item.title + " ve " + valueForm.value.toUpperCase());

  return item.title.toUpperCase().includes(valueForm.value.toUpperCase());

}

function delElement(a, type) {

  if (filteredItems.length > 0) {

    alert("End the filtering process. Then delete all cards.")

  } else {

    let selectedItemLength = cart.length;

    cart.splice(a, 1);
    displaycart("noFilter");

  }

}

function delAllElement() {

  if (filteredItems.length > 0) {

    alert("End the filtering process. Then delete all cards.")

  } else {

    let selectedItemLength = cart.length;

    if (selectedItemLength > 0) {
      cart.splice(0, selectedItemLength);
      displaycart("noFilter");
      filtreContainer.style.color = "white";
      filtreIcon.innerHTML = 0;

    } else {
      alert("Your shopping cart is empty")
    }

  }





}
