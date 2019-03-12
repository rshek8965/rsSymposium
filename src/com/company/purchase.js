function initialize()
{
    cartContents = document.getElementById("thecart");
	toggleOn = false;

	cart = [];

//	companyBanner = document.getElementById("banner");
	currentImage = document.getElementById("currentimg");
	nameOutput = document.getElementById("name");
	descriptionOutput = document.getElementById("description");
	reviewOutput = document.getElementById("all_reviews");

	customReview = document.getElementById("review");
	customRating = document.getElementById("rating");

	productList = [];
	currentProductIdx = 0;

	setData();
	setRelated();
	display();
}

function setData()
{
	productNames = PRODUCTS.split(";");
	productDescription = DESCRIPTIONS.split(";");
	productReview = REVIEWS.split(";");
	productImage = IMAGES.split(";");
	for (var i = 0; i < productNames.length; i++)
	{
		var product = {};
		product.name = productNames[i];
		product.description = productDescription[i];
		product.image = productImage[i];
		product.review = productReview[i];
		productList.push(product);
	}
}

function setRelated()
{
	var products = document.getElementsByClassName("relatedProduct");
	var productImage = IMAGES.split(";");
	for (var i = 0; i< products.length; i++)
		products[i].src = "images/" + productImage[i+1];
}

function selectProduct(product,idx)
{
	localStorage.currentItem = product;
	var currentProduct = productList[0];
	var newProduct = productList[idx];
	productList[0] = newProduct;
	productList[idx] = currentProduct;

	product.name = productList[idx].name;
	product.description = productList[idx].description;
	product.image = productList[idx].image;
	product.src = "images/" + productList[idx].image;
	product.review = productList[idx].review;
	display();
}

function addToCart()
{
	localStorage.cart += localStorage.currentItem;
}

function purchaseCartItems()
{
	localStorage.removeItem(cart);
}

function submitReview()
{
	var newReview = document.createElement("div");
	var text = document.createTextNode(customReview.value + " " + customRating.value + "/5");
	newReview.appendChild(text);
	document.getElementById("all_reviews").appendChild(newReview);
}

function cartToggle()
{
	toggleOn = !toggleOn;
	display()
}

function display()
{
    if (toggleOn)
	contents = "<hr align = 'right'>" + "on" + "<br />" + "<button onclick = 'purchaseCartItems();'>Purchase</button>";
    else
	contents = "";
    cartContents.innerHTML = contents;

	currentImage.src = "images/" + productList[currentProductIdx].image;
	nameOutput.innerHTML = productList[currentProductIdx].name;
	descriptionOutput.innerHTML = productList[currentProductIdx].description;
	reviewOutput.innerHTML = productList[currentProductIdx].review;
	companyBanner.src = "images/" + BANNER;
}