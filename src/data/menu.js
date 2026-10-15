export const CATEGORIES = [
  { slug: "starters", label: "Starters", emoji: "🥟" },
  { slug: "mains", label: "Mains", emoji: "🍛" },
  { slug: "desserts", label: "Desserts", emoji: "🍮" },
  { slug: "drinks", label: "Drinks", emoji: "🥭" },
];

export const DISHES = [
  { id: 1, category: "starters", name: "Paneer Tikka", price: 280, veg: true, spice: 2, rating: 4.7, emoji: "🧀", description: "Cottage cheese cubes marinated in yogurt and spices, charred in a clay tandoor.", ingredients: ["Paneer", "Yogurt", "Bell peppers", "Kashmiri chilli", "Chaat masala"] },
  { id: 2, category: "starters", name: "Chicken 65", price: 320, veg: false, spice: 3, rating: 4.6, emoji: "🍗", description: "Crispy, fiery South Indian fried chicken tossed with curry leaves and green chillies.", ingredients: ["Chicken", "Curry leaves", "Green chilli", "Ginger", "Garlic"] },
  { id: 3, category: "starters", name: "Veg Samosa", price: 120, veg: true, spice: 1, rating: 4.4, emoji: "🥟", description: "Golden pastry parcels stuffed with spiced potato and peas, served with mint chutney.", ingredients: ["Potato", "Green peas", "Cumin", "Coriander", "Flour"] },
  { id: 4, category: "starters", name: "Fish Amritsari", price: 360, veg: false, spice: 2, rating: 4.5, emoji: "🐟", description: "Gram-flour battered fish fillets with ajwain, fried until perfectly crisp.", ingredients: ["Basa fillet", "Gram flour", "Ajwain", "Lemon", "Chaat masala"] },
  { id: 5, category: "mains", name: "Chettinad Chicken Curry", price: 420, veg: false, spice: 3, rating: 4.8, emoji: "🍛", description: "A bold, aromatic curry from Tamil Nadu made with freshly roasted and ground spices.", ingredients: ["Chicken", "Star anise", "Black pepper", "Coconut", "Shallots"] },
  { id: 6, category: "mains", name: "Butter Paneer Masala", price: 340, veg: true, spice: 1, rating: 4.6, emoji: "🧈", description: "Silky tomato-cashew gravy with soft paneer finished with butter and cream.", ingredients: ["Paneer", "Tomato", "Cashew", "Butter", "Kasuri methi"] },
  { id: 7, category: "mains", name: "Hyderabadi Dum Biryani", price: 450, veg: false, spice: 2, rating: 4.9, emoji: "🍚", description: "Basmati rice and marinated mutton slow-cooked under a sealed dough crust.", ingredients: ["Basmati rice", "Mutton", "Saffron", "Fried onions", "Mint"] },
  { id: 8, category: "mains", name: "Veg Dum Biryani", price: 330, veg: true, spice: 2, rating: 4.3, emoji: "🥘", description: "Seasonal vegetables layered with fragrant rice and cooked on dum.", ingredients: ["Basmati rice", "Carrot", "Beans", "Saffron", "Ghee"] },
  { id: 9, category: "mains", name: "Dal Makhani", price: 290, veg: true, spice: 1, rating: 4.7, emoji: "🫘", description: "Black lentils simmered overnight with butter and cream until deeply velvety.", ingredients: ["Black lentils", "Kidney beans", "Butter", "Cream", "Tomato"] },
  { id: 10, category: "mains", name: "Malabar Fish Curry", price: 440, veg: false, spice: 2, rating: 4.5, emoji: "🍲", description: "Tangy coconut-based Kerala fish curry flavoured with kokum and curry leaves.", ingredients: ["Seer fish", "Coconut milk", "Kokum", "Curry leaves", "Turmeric"] },
  { id: 11, category: "desserts", name: "Gulab Jamun", price: 140, veg: true, spice: 0, rating: 4.8, emoji: "🍮", description: "Soft milk dumplings soaked in cardamom-rose sugar syrup, served warm.", ingredients: ["Khoya", "Sugar syrup", "Cardamom", "Rose water", "Pistachio"] },
  { id: 12, category: "desserts", name: "Rasmalai", price: 160, veg: true, spice: 0, rating: 4.6, emoji: "🥛", description: "Delicate cottage cheese discs floating in chilled saffron-scented milk.", ingredients: ["Chenna", "Milk", "Saffron", "Cardamom", "Almonds"] },
  { id: 13, category: "desserts", name: "Kulfi Falooda", price: 180, veg: true, spice: 0, rating: 4.4, emoji: "🍨", description: "Dense, slow-cooked Indian ice cream with rose syrup, vermicelli and basil seeds.", ingredients: ["Milk", "Pistachio", "Rose syrup", "Vermicelli", "Basil seeds"] },
  { id: 14, category: "drinks", name: "Mango Lassi", price: 110, veg: true, spice: 0, rating: 4.7, emoji: "🥭", description: "Thick yogurt blended with ripe Alphonso mango and a touch of cardamom.", ingredients: ["Alphonso mango", "Yogurt", "Sugar", "Cardamom"] },
  { id: 15, category: "drinks", name: "Filter Coffee", price: 90, veg: true, spice: 0, rating: 4.6, emoji: "☕", description: "Strong South Indian decoction coffee with frothy milk, served in a dabarah set.", ingredients: ["Coffee decoction", "Milk", "Jaggery"] },
  { id: 16, category: "drinks", name: "Masala Chai", price: 70, veg: true, spice: 1, rating: 4.5, emoji: "🍵", description: "Assam tea simmered with ginger, cardamom, cloves and fresh milk.", ingredients: ["Assam tea", "Ginger", "Cardamom", "Cloves", "Milk"] },
];

export const getDishById = (id) => DISHES.find((d) => d.id === Number(id));
export const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;
