const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dbConfig = require("./config/dbConfig");
const GoogleUser = require("./models/GoogleUser");
const session = require("express-session");
const initSocketServer = require("./sockets/socketServer");

// Import các route và controllers
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const paymentRoute = require("./routes/paymentRoute");
const reviewRouter = require("./routes/reviewRoute");

//import models
const Store = require("./models/Store");
const Product = require("./models/Product");
const Chat = require("./models/Chat");

const app = express();

// Sử dụng express-session
app.use(
  session({
    secret: "secret_key", // Thay đổi "secret_key" bằng một chuỗi bất kỳ
    resave: false,
    saveUninitialized: true,
  })
);
// Middleware passport.initialize() và passport.session() phải được sử dụng sau express-session
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng middleware để xử lý các yêu cầu JSON
app.use(bodyParser.json());

// Kết nối đến cơ sở dữ liệu MongoDB từ dbConfig
dbConfig.once("open", () => {
  console.log("MongoDB connected");
});
dbConfig.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "104607557430-tt28f2e11sdpcrhd90icr487uqmjjtk5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://localhost:3000/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        let existingUser = await GoogleUser.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          let newGoogleUser = new GoogleUser({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          });
          let savedGoogleUser = await newGoogleUser.save();
          return done(null, savedGoogleUser);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
// Serialize và deserialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  GoogleUser.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error, null);
    });
});

// Endpoint xác thực Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    if (req.user) {
      // Kiểm tra xem người dùng đã tồn tại trong hệ thống hay không
      let redirectScreen;
      // Chọn màn hình phù hợp với vai trò
      redirectScreen = "CustomerScreen";
      // Chuyển hướng đến trang tương ứng
      res.redirect(`/${redirectScreen}`);
    } else {
      // Xử lý khi không tìm thấy người dùng
      res.redirect("/");
    }
  }
);

// Middleware
app.use(express.json());

// Sử dụng các route đã được định nghĩa
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cartItem", cartItemRoutes);
app.use("/api/payment", paymentRoute);
app.use("/reviews", reviewRouter);

// Endpoint: Lấy tất cả danh sách các Store và danh sách các Product tương ứng với mỗi Store
app.get("/stores", async (req, res) => {
  try {
    const stores = await Store.find();
    const storesWithProducts = await Promise.all(
      stores.map(async (store) => {
        const products = await Product.find({ store_id: store._id });
        return { store, products };
      })
    );
    res.send(storesWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint: Lấy Store theo "_id" và Product tương ứng theo "_id" của nó để xem chi tiết Product đó có những gì
app.get("/stores/:storeId", async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).send("Store not found");

    const products = await Product.find({ store_id: store._id });
    res.send({ store, products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint: Lấy thông tin của cửa hàng theo "_id"
app.get("/store/:storeId", async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).send("Store not found");

    res.send(store);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint: Lấy Store theo "_id" và Product tương ứng theo "_id" của nó để xem chi tiết Product đó có những gì
app.get("/stores/:storeId/products/:productId", async (req, res) => {
  const { storeId, productId } = req.params;
  try {
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).send("Store not found");
    const product = await Product.findOne({
      _id: productId,
      store_id: store._id,
    });
    if (!product)
      return res.status(404).send("Product not found in this store");
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint: Lấy tất cả tin nhắn chat của một đơn hàng cụ thể
app.get("/api/chat/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const chats = await Chat.find({ order_id: orderId }).sort({ sent_at: 1 });
    res.send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Xử lý lỗi cho các route không tồn tại hoặc lỗi khác
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Khởi động server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${server.address().port}`);
});

// Khởi tạo và cấu hình Socket.IO server
initSocketServer(server);
