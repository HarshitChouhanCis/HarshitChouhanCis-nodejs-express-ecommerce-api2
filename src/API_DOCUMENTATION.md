# Complete Backend API CURL Collection

## Base URL

```bash
http://localhost:5000/api/v1
```

---

# User APIs

## Register User

```bash
curl --location 'http://localhost:5000/api/v1/users/register' \
--header 'Content-Type: application/json' \
--data '{
    "username":"harshit1",
    "email":"harshit@gmail.com",
    "fullName":"Harshit",
    "password":"Aa@123"
}'
```

---

## Login User

```bash
curl --location 'http://localhost:5000/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data '{
    "email":"harshit@gmail.com",
    "password":"Aa@123"
}'
``` 

--- 

## Get Current User

```bash
curl --location 'http://localhost:5000/api/v1/users/me' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

## Update User

```bash
curl --location --request PUT 'http://localhost:5000/api/v1/users/update' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "fullName":"Updated Name"
}'
```

---

## Reset Password

```bash
curl --location --request PUT 'http://localhost:5000/api/v1/users/reset-password' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "oldPassword":"Aa@123",
    "newPassword":"New@123"
}'
```

---

## Logout User

```bash
curl --location --request POST 'http://localhost:5000/api/v1/users/logout' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# User Profile APIs

## Create Profile

```bash
curl --location 'http://localhost:5000/api/v1/profile/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "bio":"Software Developer",
    "address":"Indore",
    "education":"B.Tech"
}'
```

---

## Get My Profile

```bash
curl --location 'http://localhost:5000/api/v1/profile/me' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Post APIs

## Create Post

```bash
curl --location 'http://localhost:5000/api/v1/posts/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--form 'caption="My first post"' \
--form 'image=@"/home/cis/Pictures/test.jpg"'
```

---

## Get All Posts

```bash
curl --location 'http://localhost:5000/api/v1/posts'
```

---

## Get Single Post

```bash
curl --location 'http://localhost:5000/api/v1/posts/POST_ID'
```

---

## Update Post

```bash
curl --location --request PUT 'http://localhost:5000/api/v1/posts/update/POST_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "caption":"Updated caption"
}'
```

---

## Delete Post

```bash
curl --location --request DELETE 'http://localhost:5000/api/v1/posts/delete/POST_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Comment APIs

## Create Comment

```bash
curl --location 'http://localhost:5000/api/v1/comments/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "post":"POST_ID",
    "message":"Nice post"
}'
```

---

## Reply Comment

```bash
curl --location 'http://localhost:5000/api/v1/comments/reply' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "commentId":"COMMENT_ID",
    "message":"Reply message"
}'
```

---

## Delete Comment

```bash
curl --location --request DELETE 'http://localhost:5000/api/v1/comments/delete/COMMENT_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Product APIs

## Create Product

```bash
curl --location 'http://localhost:5000/api/v1/products/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--form 'name="iPhone 15"' \
--form 'description="Apple Mobile"' \
--form 'price="80000"' \
--form 'stock="10"' \
--form 'image=@"/home/cis/Pictures/product.jpg"'
```

---

## Get All Products

```bash
curl --location 'http://localhost:5000/api/v1/products'
```

---

## Get Single Product

```bash
curl --location 'http://localhost:5000/api/v1/products/PRODUCT_ID'
```

---

## Update Product

```bash
curl --location --request PUT 'http://localhost:5000/api/v1/products/update/PRODUCT_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "price":90000
}'
```

---

## Delete Product

```bash
curl --location --request DELETE 'http://localhost:5000/api/v1/products/delete/PRODUCT_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Cart APIs

## Add To Cart

```bash
curl --location 'http://localhost:5000/api/v1/cart/add' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "productId":"PRODUCT_ID",
    "quantity":2
}'
```

---

## Get My Cart

```bash
curl --location 'http://localhost:5000/api/v1/cart' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

## Remove From Cart

```bash
curl --location --request DELETE 'http://localhost:5000/api/v1/cart/remove/CART_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Order APIs

## Create Order

```bash
curl --location 'http://localhost:5000/api/v1/orders/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "shippingAddress": {
        "address": "ABC Street",
        "city": "Indore",
        "state": "Madhya Pradesh",
        "country": "India",
        "pincode": "452001"
    },
    "paymentMethod": "COD"
}'
```

---

## Get My Orders

```bash
curl --location 'http://localhost:5000/api/v1/orders' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

## Cancel Order

```bash
curl --location --request PUT 'http://localhost:5000/api/v1/orders/cancel/ORDER_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Notification APIs

## Create Notification

```bash
curl --location 'http://localhost:5000/api/v1/notifications/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "user":"USER_ID",
    "title":"Order Placed",
    "message":"Your order placed successfully",
    "type":"ORDER"
}'
```

---

## Get Notifications

```bash
curl --location 'http://localhost:5000/api/v1/notifications' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Chat APIs

## Send Message

```bash
curl --location 'http://localhost:5000/api/v1/chat/send' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--form 'receiver="RECEIVER_ID"' \
--form 'message="Hello"' \
--form 'image=@"/home/cis/Pictures/chat.jpg"'
```

---

## Get Conversation

```bash
curl --location 'http://localhost:5000/api/v1/chat/RECEIVER_ID' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

---

# Role APIs

## Create Role

```bash
curl --location 'http://localhost:5000/api/v1/roles/create' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "name":"ADMIN",
    "permissions":[
        "CREATE_PRODUCT",
        "DELETE_PRODUCT"
    ]
}'
```

---

## Assign Role

```bash
curl --location 'http://localhost:5000/api/v1/roles/assign' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{
    "userId":"USER_ID",
    "roleId":"ROLE_ID"
}'
```

---

## Get All Roles

```bash
curl --location 'http://localhost:5000/api/v1/roles' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```
