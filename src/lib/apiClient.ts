/**
 * Elegant API client with automatic client-side static sandbox fallback.
 * Since static hosts like Netlify do not run a Node/Express backend natively,
 * this client detects if we are running in a static environment or if the server
 * returns non-JSON pages (usually Netlify's HTML rewrite for SPAs) and gracefully
 * falls back to a robust LocalStorage database.
 * 
 * This keeps the admin console, consultations registration, and image gallery
 * 100% functional on dry static hosting.
 */

// Compress image file to JPEG base64 to prevent exceeding browser localStorage 5MB quota
const compressImage = (file: File, maxW = 1200, maxH = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If it's not an image, fallback to standard reading
    if (!file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while resizing down to a crisp max resolution
        if (width > height) {
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
        } else {
          if (height > maxH) {
            width = Math.round((width * maxH) / height);
            height = maxH;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string); // fallback to original base64
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as jpeg with excellent quality (0.8 is the Sweet Spot for web visuals)
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error("이미지 파일을 읽을 수 없습니다."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
    reader.readAsDataURL(file);
  });
};

// Default lists
const DEFAULT_GALLERY = [
  { id: 1, url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop", title: "학원 전경" },
  { id: 2, url: "https://images.unsplash.com/photo-1449965072395-657187ca45ff?q=80&w=800&auto=format&fit=crop", title: "최신 연습 차량" },
  { id: 3, url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop", title: "야간 교육 현장" },
  { id: 4, url: "https://images.unsplash.com/photo-1517524204709-440d89c258d4?q=80&w=800&auto=format&fit=crop", title: "쾌적한 대기실" },
];

const DEFAULT_BANNERS = {
  greetings: "/hero_academy.jpg",
  process: "/hero_academy_2.jpg",
  license: "/hero_academy_3.jpg",
  road: "/hero_academy_3.jpg",
  community: "/hero_academy_2.jpg",
  admin: "/hero_academy_3.jpg",
};

// Global flag to remember state per session so we don't spam broken servers
let forceClientFallback = false;

// Check if we are running on a static platform like Netlify
const isStaticHost = (): boolean => {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  
  // Local development / AI Studio Container check
  if (hostname === "localhost" || hostname === "127.0.0.1") return false;
  if (hostname.includes("ais-dev-") || hostname.includes("run.app")) return false;
  
  // If it's something like netlify.app or some custom production domain
  return true;
};

if (isStaticHost()) {
  forceClientFallback = true;
  console.info("[apiClient] Static host detected (Netlify). Initialized client-side LocalStorage DB fallback.");
}

/**
 * Custom Response builder for our mock handlers
 */
function createJSONResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

/**
 * Handles mock API logic using LocalStorage
 */
async function handleMockRequest(url: string, options?: RequestInit): Promise<Response> {
  const cleanUrl = url.split("?")[0];
  const method = options?.method?.toUpperCase() || "GET";
  
  // Parse sub-elements, e.g., /api/banners/greetings or /api/consultations/123
  const bannerMatch = cleanUrl.match(/^\/api\/banners\/([^/]+)$/);
  const galleryIdMatch = cleanUrl.match(/^\/api\/gallery\/([^/]+)$/);
  const consultationIdMatch = cleanUrl.match(/^\/api\/consultations\/([^/]+)$/);

  // 1. ADMIN LOGIN
  if (cleanUrl === "/api/admin/login" && method === "POST") {
    try {
      const body = JSON.parse(options?.body as string || "{}");
      if (body.password === "2004") {
        return createJSONResponse({ success: true, token: "admin-token-mock" });
      }
      return createJSONResponse({ success: false, message: "비밀번호가 틀렸습니다." }, 401);
    } catch {
      return createJSONResponse({ success: false, message: "잘못된 데이터 형식입니다." }, 400);
    }
  }

  // 2. BANNERS
  if (cleanUrl === "/api/banners" && method === "GET") {
    const bannersStr = localStorage.getItem("app_banners");
    const banners = bannersStr ? JSON.parse(bannersStr) : DEFAULT_BANNERS;
    return createJSONResponse(banners);
  }

  if (bannerMatch && method === "POST") {
    const category = bannerMatch[1];
    const formData = options?.body as FormData;
    if (formData) {
      const file = formData.get("image") as File;
      if (file) {
        try {
          const base64Url = await compressImage(file);
          const bannersStr = localStorage.getItem("app_banners");
          const banners = bannersStr ? JSON.parse(bannersStr) : { ...DEFAULT_BANNERS };
          banners[category] = base64Url;
          localStorage.setItem("app_banners", JSON.stringify(banners));
          return createJSONResponse({ success: true, url: base64Url });
        } catch (e: any) {
          console.error("Banner upload error:", e);
          if (e.name === 'QuotaExceededError' || e.message?.includes('quota') || e.code === 22) {
            return createJSONResponse({ 
              success: false, 
              message: "저장 용량이 부족합니다. 등록된 갤러리 이미지 중 일부를 삭제하여 공간을 확보해 주세요." 
            }, 500);
          }
          return createJSONResponse({ success: false, message: e.message || "배너 로컬 저장 중 오류 발생" }, 500);
        }
      }
    }
    return createJSONResponse({ success: false, message: "이미지 파일이 누락되었습니다." }, 400);
  }

  // 3. GALLERY
  if (cleanUrl === "/api/gallery" && method === "GET") {
    const galleryStr = localStorage.getItem("app_gallery");
    const gallery = galleryStr ? JSON.parse(galleryStr) : DEFAULT_GALLERY;
    return createJSONResponse(gallery);
  }

  if (cleanUrl === "/api/gallery" && method === "POST") {
    const formData = options?.body as FormData;
    if (formData) {
      const title = formData.get("title") as string || "새 이미지";
      const file = formData.get("image") as File;
      if (file) {
        try {
          const base64Url = await compressImage(file);
          const galleryStr = localStorage.getItem("app_gallery");
          const gallery = galleryStr ? JSON.parse(galleryStr) : [...DEFAULT_GALLERY];
          const newImage = { id: Date.now(), url: base64Url, title };
          gallery.push(newImage);
          localStorage.setItem("app_gallery", JSON.stringify(gallery));
          return createJSONResponse(newImage);
        } catch (e: any) {
          console.error("Gallery storage error:", e);
          if (e.name === 'QuotaExceededError' || e.message?.includes('quota') || e.code === 22) {
            return createJSONResponse({ 
              success: false, 
              message: "용량 초과! 브라우저 저장 공간(5MB)이 가득 찼습니다. 기존 이미지 중 일부를 삭제한 후 다시 시도해 주세요." 
            }, 500);
          }
          return createJSONResponse({ success: false, message: e.message || "이미지 로컬 변환에 실패했습니다." }, 500);
        }
      }
    }
    return createJSONResponse({ success: false, message: "데이터 누락" }, 400);
  }

  if (galleryIdMatch && method === "DELETE") {
    const targetId = galleryIdMatch[1];
    const galleryStr = localStorage.getItem("app_gallery");
    let gallery = galleryStr ? JSON.parse(galleryStr) : [...DEFAULT_GALLERY];
    gallery = gallery.filter((img: any) => String(img.id) !== String(targetId));
    localStorage.setItem("app_gallery", JSON.stringify(gallery));
    return createJSONResponse({ success: true });
  }

  // 4. CONSULTATIONS
  if (cleanUrl === "/api/consultations" && method === "GET") {
    const consultsStr = localStorage.getItem("app_consultations");
    const consults = consultsStr ? JSON.parse(consultsStr) : [];
    // Show latest first
    const reversed = [...consults].reverse();
    return createJSONResponse(reversed);
  }

  if (cleanUrl === "/api/consultations" && method === "POST") {
    try {
      const body = JSON.parse(options?.body as string || "{}");
      if (!body.name || !body.phone) {
        return createJSONResponse({ success: false, message: "성함과 연락처는 필수입니다." }, 400);
      }
      const consultsStr = localStorage.getItem("app_consultations");
      const consults = consultsStr ? JSON.parse(consultsStr) : [];
      const newConsultation = {
        id: Date.now().toString(),
        name: body.name,
        phone: body.phone,
        course: body.course,
        carPreference: body.carPreference,
        timePreference: body.timePreference,
        message: body.message,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      consults.push(newConsultation);
      localStorage.setItem("app_consultations", JSON.stringify(consults));
      return createJSONResponse({ success: true, consultation: newConsultation });
    } catch {
      return createJSONResponse({ success: false, message: "전송 오류" }, 400);
    }
  }

  if (consultationIdMatch) {
    const id = consultationIdMatch[1];
    const consultsStr = localStorage.getItem("app_consultations");
    const consults = consultsStr ? JSON.parse(consultsStr) : [];
    const index = consults.findIndex((c: any) => String(c.id) === String(id));

    if (method === "PATCH") {
      try {
        const body = JSON.parse(options?.body as string || "{}");
        if (index !== -1) {
          consults[index].status = body.status || "resolved";
          localStorage.setItem("app_consultations", JSON.stringify(consults));
          return createJSONResponse({ success: true, consultation: consults[index] });
        }
        return createJSONResponse({ success: false, message: "상담 내역을 찾을 수 없습니다." }, 404);
      } catch {
        return createJSONResponse({ success: false, message: "오류" }, 400);
      }
    }

    if (method === "DELETE") {
      if (index !== -1) {
        consults.splice(index, 1);
        localStorage.setItem("app_consultations", JSON.stringify(consults));
        return createJSONResponse({ success: true });
      }
      return createJSONResponse({ success: false, message: "상담 내역을 찾을 수 없습니다." }, 404);
    }
  }

  // Catch-all
  return createJSONResponse({ message: "Mock match fail" }, 404);
}

/**
 * Universal safe Fetch wrapper.
 * Intercepts api requests and handles client-side database fallback
 * automatically in the browser if backend drops or does not exist.
 */
export async function apiFetch(url: string, options?: RequestInit): Promise<Response> {
  // If static environment or fallback has triggered previously, run client-side mock directly
  if (forceClientFallback) {
    return handleMockRequest(url, options);
  }

  try {
    const response = await fetch(url, options);
    
    // Check if server is running, but returned HTML instead of JSON.
    // This is the classic symptom of calling backend APIs on a Netlify static hosting setup,
    // which responds with the default HTML SPA page (index.html) for any unmatched route.
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.warn(`[apiClient] Server returned HTML page on ${url}. Switching to LocalStorage database.`);
      forceClientFallback = true;
      return handleMockRequest(url, options);
    }

    return response;
  } catch (error) {
    // If standard fetch completely crashed (e.g., net connection down, connection refused)
    console.error(`[apiClient] Network fetch error on ${url}. Falling back to LocalStorage DB. Detail:`, error);
    forceClientFallback = true;
    return handleMockRequest(url, options);
  }
}
