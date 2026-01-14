import products from './products';

interface Product {
 name: string;
 price: number;
 preOrder: string;
}

let product: Product | undefined = products[0];
let productName: string;
const findProduct = products.find((p) => p.name === 'fanny pack');
let shipping : number = 0;
let shippingAddress: string = "Friedrichstraße 10, Berlin, 10117";
let taxPercent: number;
let taxTotal: number;
let total: number;

let shoppingCart: Product[] = [];

if (!findProduct) {
  throw new Error("Produkt 'fanny pack' wurde nicht gefunden!");
}

product = findProduct;

{
  let checkPreOrder = (element : Product) => 
  {
    if (element.preOrder === 'true') { console.log("You'll get notified when it's sent."); } 
    else { console.log("It has no pre order option.")}
    console.log("\n");
  }

  const freeShipping = (element: Product) => {
    shipping = element.price >= 25 ? 0 : 5;
    if (shipping === 0) {
      console.log("We provide free shipping for this product.");
    }
  };

  taxPercent = shippingAddress === 'New York' ? 0.1 : 0.05;
  taxTotal = product.price * taxPercent; 
  total = product.price + taxTotal + shipping;

  const createReceipt = () => {
    const receipt = `
      Your receipt:
        Product:           ${product?.name}
        Price:             ${product?.price}
        Shipping:          ${shipping}
        Tax (${taxPercent * 100}%): ${taxTotal.toFixed(2)}
        Total:             ${total.toFixed(2)}
        Shipping address:  ${shippingAddress}
    `;
    console.log(receipt);
  };

  checkPreOrder(product);
  freeShipping(product);
  createReceipt();
}