// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const dbConfig = require("./config/dbConfig");

// // Import các route và controllers
// const authRoutes = require("./routes/authRoutes");
// const storeRoutes = require("./routes/storeRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const productRoutes = require("./routes/productRoutes");

// const app = express();

// // Kết nối đến cơ sở dữ liệu MongoDB
// dbConfig.once("open", () => {
//   console.log("MongoDB connected");
// });
// dbConfig.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// // Sử dụng middleware để xử lý các yêu cầu JSON
// app.use(bodyParser.json());

// // Sử dụng các route đã được định nghĩa
// app.use("/api/auth", authRoutes);
// app.use("/api/stores", storeRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);

// // Xử lý lỗi cho các route không tồn tại hoặc lỗi khác
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// // Khởi động server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dbConfig = require("./config/dbConfig");
const GoogleUser = require("./models/GoogleUser"); // Import GoogleUser model

// Import các route và controllers
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Sử dụng middleware để xử lý các yêu cầu JSON
app.use(bodyParser.json());

// Kết nối đến cơ sở dữ liệu MongoDB từ dbConfig
dbConfig.once("open", () => {
  console.log("MongoDB connected");
});
dbConfig.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Thiết lập Passport.js cho xác thực Google
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "104607557430-tt28f2e11sdpcrhd90icr487uqmjjtk5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/redirect",
    },
    function (accessToken, refreshToken, profile, done) {
      // Lưu thông tin người dùng vào MongoDB hoặc làm bất kỳ điều gì bạn muốn với profile
      // Ví dụ:
      // GoogleUser.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      GoogleUser.findOne(
        { googleId: profile.id },
        function (err, existingUser) {
          if (err) {
            return done(err);
          }
          if (existingUser) {
            // Nếu đã tồn tại, trả về thông tin của user
            return done(null, existingUser);
          } else {
            // Nếu chưa tồn tại, tạo một bản ghi mới
            const newUser = new GoogleUser({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              // Thêm các trường khác nếu cần
            });
            // Lưu vào MongoDB
            newUser.save(function (err) {
              if (err) {
                return done(err);
              }
              return done(null, newUser);
            });
          }
          return done(null, profile);
        }
      );
    }
  )
);

// Middleware Passport.js
app.use(passport.initialize());

// Endpoint xác thực Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/api/auth/login" }),
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
