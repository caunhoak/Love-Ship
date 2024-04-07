const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dbConfig = require("./config/dbConfig");
const GoogleUser = require("./models/GoogleUser");
const session = require("express-session");

// Import các route và controllers
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const productRoutes = require("./routes/productRoutes");
const storeMenuRoutes = require("./routes/storeMenuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const paymentRoute = require("./routes/paymentRoute");
const reviewRouter = require("./routes/reviewRoute");

const app = express();

// Sử dụng express-session
app.use(
  session({
    secret: "your_secret_key", // Thay đổi "your_secret_key" bằng một chuỗi bất kỳ
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
        "347547472788-sm3agio2nj02qhka4m258v54ckjna2p5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://192.168.1.39:3000/auth/google/redirect",
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
    // Xác thực thành công, chuyển hướng hoặc phản hồi gì đó
    res.redirect("/");
  }
);

// Middleware
app.use(express.json());

// Sử dụng các route đã được định nghĩa
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/store-menu", storeMenuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/cart-items", cartItemRoutes);
app.use("/api/transactions", paymentRoute);
app.use("/reviews", reviewRouter);

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
