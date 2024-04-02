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
const productRoutes = require("./routes/productRoutes");

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
        "277645049944-gqvrj3rtecikasg01dh6v6tnj6545364.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/redirect",
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
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Xác thực thành công, chuyển hướng hoặc phản hồi gì đó
    res.redirect("/");
  }
);

// Sử dụng các route đã được định nghĩa
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

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
