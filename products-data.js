/**
 * Moharykat — shared product catalog
 */
const PRODUCTS = [
  {
    id: "bundle-v6",
    titleAr: "DODGE CHARGER V6 بكج فرامل بريمبو",
    titleEn: "DODGE CHARGER V6 Brembo Brake Bundle",
    descAr: "فحمات بريمبو أمامية وخلفية + ستائر DHELL هدية",
    descEn: "Brembo front & rear pads + free DHELL sunshades",
    price: 379.5,
    originalPrice: 550,
    image: "assets/bundles/bundle-v6.png",
    url: "product.html",
  },
  {
    id: "brembo-p18034",
    titleAr: "Brembo P 18 034",
    titleEn: "Brembo P 18 034",
    descAr: "طقم فحمات أمامي - أداء ثابت",
    descEn: "Front Brake Pads - Consistent Performance",
    price: 280,
    originalPrice: 450,
    image: "assets/products/brembo-p18034-front.png",
    url: "product.html",
  },
  {
    id: "brembo-p23175",
    titleAr: "Brembo P 23 175",
    titleEn: "Brembo P 23 175",
    descAr: "طقم فحمات خلفي - دودج تشارجر",
    descEn: "Rear Brake Pads - Dodge Charger",
    price: 220,
    image: "assets/products/brembo-p23175-rear.png",
    url: "product.html",
  },
  {
    id: "dhell-sunshades",
    titleAr: "Dhell Sunshades",
    titleEn: "Dhell Sunshades",
    descAr: "طقم ستائر ماركة ظل لسيارات دودج",
    descEn: "Dhell Sunshade Set for Dodge",
    price: 99,
    image: "assets/products/dhell-sunshades.png",
    url: "product.html",
  },
  {
    id: "brembo-p37018",
    titleAr: "Brembo P 37 018",
    titleEn: "Brembo P 37 018",
    descAr: "طقم فحمات أمامي رياضي",
    descEn: "Sport Front Brake Pads",
    price: 350,
    image: "assets/products/brembo-p37018-front.png",
    url: "product.html",
  },
  {
    id: "bundle-v8",
    titleAr: "بكج أداء دودج V8 المتكامل",
    titleEn: "Dodge V8 Complete Bundle",
    descAr: "فحمات بريمبو + ستائر DHELL هدية",
    descEn: "Brembo pads + free DHELL sunshades",
    price: 379.5,
    originalPrice: 650,
    image: "assets/bundles/bundle-v8-57.png",
    url: "product.html",
  },
];

function getProductById(id) {
  return PRODUCTS.find(function (p) {
    return p.id === id;
  });
}

function getProductsMap() {
  var map = {};
  PRODUCTS.forEach(function (p) {
    map[p.id] = p;
  });
  return map;
}

// Side Cart Drawer Logic
window.openSideCart = () => {
  const drawer = document.getElementById('sideCartDrawer');
  const overlay = document.getElementById('sideCartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('overflow-hidden');
  }
};

window.closeSideCart = () => {
  const drawer = document.getElementById('sideCartDrawer');
  const overlay = document.getElementById('sideCartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
  }
};

// Add to Cart Button Event Trigger
const addToCartBtn = document.getElementById('addToCartBtn');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.getAttribute('data-product-id');
    const qtyInput = document.getElementById('qty');
    const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

    if (window.MoharykatCart && MoharykatCart.addToCart) {
      MoharykatCart.addToCart(productId, quantity);
    }

    // Open Side Cart Drawer instead of toast
    openSideCart();
  });
}

// Update all generic Add to Cart buttons
document.querySelectorAll('button').forEach(btn => {
  if (btn !== addToCartBtn && btn.textContent.includes('أضف للسلة')) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSideCart();
    });
  }
});