"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Espresso",
    description: "A classic espresso shot with rich, bold flavor and perfect crema.",
    price: 250,
    image: "/images/espresso.jpg",
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "A smooth, creamy cappuccino with perfectly steamed milk and light froth.",
    price: 400,
    image: "/images/cappuccino.jpg",
  },
  {
    id: "3",
    name: "Latte",
    description: "A creamy latte with velvety smooth texture and beautiful latte art.",
    price: 300,
    image: "/images/latte.jpg",
  },
  {
    id: "4",
    name: "Americano",
    description: "A bold and smooth coffee with hot water, perfect for coffee purists.",
    price: 200,
    image: "/images/americano.jpg",
  },
  {
    id: "5",
    name: "Mocha",
    description: "Rich coffee blended with premium chocolate and steamed milk.",
    price: 450,
    image: "/images/mocha.jpg",
  },
  {
    id: "6",
    name: "Macchiato",
    description: "Espresso 'marked' with a dollop of perfectly foamed milk.",
    price: 350,
    image: "/images/macchiato.jpg",
  },
]

const heroImages = ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"]

export default function CoffeeShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ]
      }
    })
  }

  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/coffee-beans-bg.jpg"
          alt="Coffee beans background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-amber-800/95 via-amber-700/95 to-amber-600/95 backdrop-blur-sm text-white p-4 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">☕ Coffee Shop</h1>
            <div className="flex items-center space-x-6">
              <a
                href="#home"
                className="hover:text-amber-200 transition-colors duration-300 font-medium hidden sm:block"
              >
                Home
              </a>
              <a
                href="#menu"
                className="hover:text-amber-200 transition-colors duration-300 font-medium hidden sm:block"
              >
                Menu
              </a>
              <Button
                variant="ghost"
                className="text-white hover:text-amber-200 hover:bg-white/10 relative transition-all duration-300"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {getTotalItems() > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white hover:bg-red-600 animate-pulse">{getTotalItems()}</Badge>
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative mt-8 mb-12">
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden rounded-xl mx-4 md:mx-8 shadow-2xl">
            <div className="relative w-full h-full">
              <Image
                src={heroImages[currentSlide] || "/placeholder.svg"}
                alt={`Coffee shop atmosphere ${currentSlide + 1}`}
                fill
                className="object-cover transition-all duration-1000 ease-in-out"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                    Welcome to Our Coffee Shop
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl drop-shadow-md opacity-90">
                    Freshly brewed coffee crafted with passion
                  </p>
                  <Button
                    className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                    onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore Menu
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-12 bg-white/95 backdrop-blur-sm mx-4 md:mx-8 rounded-xl shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Our Premium Coffee Menu</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our carefully curated selection of premium coffee beverages, each crafted with the finest beans
                and expert technique
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white/95 backdrop-blur-sm border-0 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl md:text-3xl font-bold text-amber-700">Rs{product.price}</span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your Cart</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                  className="hover:bg-gray-100 rounded-full p-2"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto max-h-96">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500">Your cart is empty</p>
                    <p className="text-gray-400 mt-2">Add some delicious coffee to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                              quality={80}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                            <p className="text-amber-700 font-semibold">Rs{item.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 p-0 rounded-full border-2 hover:bg-red-50 hover:border-red-300"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-lg min-w-[3rem] text-center bg-gray-100 px-3 py-1 rounded-full">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 p-0 rounded-full border-2 hover:bg-green-50 hover:border-green-300"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 rounded-full px-4 py-2"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50/80 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-left">
                      <p className="text-gray-600">Total Items: {getTotalItems()}</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-800">Total: Rs{getTotalPrice()}</p>
                    </div>
                    <div className="space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsCartOpen(false)}
                        className="px-6 py-3 rounded-full font-semibold"
                      >
                        Continue Shopping
                      </Button>
                      <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gradient-to-r from-amber-800/95 via-amber-700/95 to-amber-600/95 backdrop-blur-sm text-white py-12 mt-12 mx-4 md:mx-8 rounded-xl shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">☕ Coffee Shop</h3>
              <p className="text-lg md:text-xl font-semibold mb-2">&copy; 2024 Coffee Shop</p>
              <p className="mb-6 text-amber-100">Contact us: support@coffeeshop.com | Phone: +1 (555) 123-4567</p>
              <div className="flex justify-center space-x-8">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors duration-300 font-medium text-lg"
                >
                  �Instagram
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors duration-300 font-medium text-lg"
                >
                  📘 Facebook
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors duration-300 font-medium text-lg"
                >
                  🐦 Twitter
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
