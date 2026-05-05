# Diagramas — Sistema de E‑commerce

## 📘 Diagrama de Clases (PlantUML)

```plantuml
@startuml
class User {
  id
  name
  email
}

class Customer
class Admin

class Product {
  id
  name
  price
  stock
}

class Category {
  id
  name
}

class Cart {
  id
}

class Order {
  id
  status
  total
}

class Payment {
  method
  amount
}

class Shipment {
  carrier
  trackingNumber
}

User <|-- Customer
User <|-- Admin

Customer "1" -- "1" Cart
Cart "1" -- "*" Product
Product "*" -- "1" Category

Customer "1" -- "*" Order
Order "1" -- "1" Payment
Order "1" -- "1" Shipment
@enduml
