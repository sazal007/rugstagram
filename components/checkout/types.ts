export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  shippingMethod: "standard" | "express";
}

export interface ShippingOption {
  id: "standard" | "express";
  label: string;
  price: string;
  time: string;
}

export interface CheckoutCartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
