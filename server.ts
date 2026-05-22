import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";

// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const DATA_FILE = path.join(process.cwd(), "gallery.json");

function loadGallery() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch (e) {
      console.error("Error loading gallery data:", e);
    }
  }
  return [
    { id: 1, url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop", title: "학원 전경" },
    { id: 2, url: "https://images.unsplash.com/photo-1449965072395-657187ca45ff?q=80&w=800&auto=format&fit=crop", title: "최신 연습 차량" },
    { id: 3, url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop", title: "야간 교육 현장" },
    { id: 4, url: "https://images.unsplash.com/photo-1517524204709-440d89c258d4?q=80&w=800&auto=format&fit=crop", title: "쾌적한 대기실" },
  ];
}

function saveGallery(images: any[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(images, null, 2));
}

let galleryImages = loadGallery();

const CONSULT_DATA_FILE = path.join(process.cwd(), "consultations.json");

function loadConsultations() {
  if (fs.existsSync(CONSULT_DATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONSULT_DATA_FILE, "utf-8"));
    } catch (e) {
      console.error("Error loading consultations:", e);
    }
  }
  return [];
}

function saveConsultations(data: any[]) {
  fs.writeFileSync(CONSULT_DATA_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve uploaded files statically
  app.use("/uploads", express.static(uploadDir));

  // Banner Management Routes
  app.get("/api/banners", (req, res) => {
    const activeBanners = {
      greetings: fs.existsSync(path.join(uploadDir, "banner_greetings.jpg")) ? `/uploads/banner_greetings.jpg?t=${Date.now()}` : "/hero_academy.jpg",
      process: fs.existsSync(path.join(uploadDir, "banner_process.jpg")) ? `/uploads/banner_process.jpg?t=${Date.now()}` : "/hero_academy_2.jpg",
      license: fs.existsSync(path.join(uploadDir, "banner_license.jpg")) ? `/uploads/banner_license.jpg?t=${Date.now()}` : "/hero_academy_3.jpg",
      road: fs.existsSync(path.join(uploadDir, "banner_road.jpg")) ? `/uploads/banner_road.jpg?t=${Date.now()}` : "/hero_academy_3.jpg",
      community: fs.existsSync(path.join(uploadDir, "banner_community.jpg")) ? `/uploads/banner_community.jpg?t=${Date.now()}` : "/hero_academy_2.jpg",
      admin: fs.existsSync(path.join(uploadDir, "banner_admin.jpg")) ? `/uploads/banner_admin.jpg?t=${Date.now()}` : "/hero_academy_3.jpg",
    };
    res.json(activeBanners);
  });

  app.post("/api/banners/:category", upload.single("image"), (req, res) => {
    const { category } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "이미지를 업로드 해주세요." });
    }

    const targetFilename = `banner_${category}.jpg`;
    const targetPath = path.join(uploadDir, targetFilename);

    try {
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
      fs.renameSync(file.path, targetPath);
      res.json({ success: true, url: `/uploads/${targetFilename}?t=${Date.now()}` });
    } catch (error) {
      console.error("Banner upload error:", error);
      res.status(500).json({ success: false, message: "배너 등록 중 오류가 발생했습니다." });
    }
  });

  // API Routes
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "2004") {
      res.json({ success: true, token: "admin-token-mock" });
    } else {
      res.status(401).json({ success: false, message: "비밀번호가 틀렸습니다." });
    }
  });

  app.get("/api/gallery", (req, res) => {
    // Refresh from file to ensure sync
    galleryImages = loadGallery();
    res.json(galleryImages);
  });

  app.post("/api/gallery", upload.single("image"), (req, res) => {
    const title = req.body.title;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "이미지를 업로드 해주세요." });
    }

    const url = `/uploads/${file.filename}`;
    const newImage = { id: Date.now(), url, title };
    galleryImages.push(newImage);
    saveGallery(galleryImages);
    res.json(newImage);
  });

  app.delete("/api/gallery/:id", (req, res) => {
    try {
      const idParam = req.params.id;
      console.log(`Attempting to delete image with ID: ${idParam}`);
      
      const existing = galleryImages.find(img => String(img.id) === String(idParam));
      
      if (!existing) {
        console.log(`Image with ID ${idParam} not found`);
        return res.status(404).json({ success: false, message: "이미지를 찾을 수 없습니다." });
      }

      if (existing.url.startsWith("/uploads/")) {
        const relativePath = existing.url.startsWith("/") ? existing.url.substring(1) : existing.url;
        const filePath = path.join(process.cwd(), relativePath);
        
        console.log(`Deleting file: ${filePath}`);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          console.warn(`File not found on disk: ${filePath}`);
        }
      }
      
      galleryImages = galleryImages.filter(img => String(img.id) !== String(idParam));
      saveGallery(galleryImages);
      console.log(`Successfully deleted image with ID: ${idParam}. Remaining count: ${galleryImages.length}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ success: false, message: "Server error during deletion." });
    }
  });

  // Consultations API Routes
  app.get("/api/consultations", (req, res) => {
    const consultations = loadConsultations();
    res.json(consultations.reverse()); // Show latest first
  });

  app.post("/api/consultations", (req, res) => {
    const { name, phone, course, carPreference, timePreference, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "성함과 연락처는 필수입니다." });
    }
    const consultations = loadConsultations();
    const newConsultation = {
      id: Date.now().toString(),
      name,
      phone,
      course,
      carPreference,
      timePreference,
      message,
      createdAt: new Date().toISOString(),
      status: "pending" // pending, resolved
    };
    consultations.push(newConsultation);
    saveConsultations(consultations);
    res.json({ success: true, consultation: newConsultation });
  });

  app.patch("/api/consultations/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const consultations = loadConsultations();
    const index = consultations.findIndex((c: any) => c.id === id);
    if (index !== -1) {
      consultations[index].status = status || "resolved";
      saveConsultations(consultations);
      return res.json({ success: true, consultation: consultations[index] });
    }
    res.status(404).json({ success: false, message: "상담 신청 내역을 찾을 수 없습니다." });
  });

  app.delete("/api/consultations/:id", (req, res) => {
    const { id } = req.params;
    const consultations = loadConsultations();
    const filtered = consultations.filter((c: any) => c.id !== id);
    if (filtered.length === consultations.length) {
      return res.status(404).json({ success: false, message: "상담 신청 내역을 찾을 수 없습니다." });
    }
    saveConsultations(filtered);
    res.json({ success: true });
  });

  // Robust production check that works in CJS compiled file and doesn't crash ES Module in dev
  const isProd = process.env.NODE_ENV === "production" || (typeof __filename !== "undefined" && __filename.endsWith(".cjs"));

  // Vite middleware for development
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In compiled CJS output, server.cjs resides in 'dist/' directory, so __dirname is exactly 'dist'
    const distPath = __dirname;
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
